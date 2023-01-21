
import { eventController } from "../controller/eventsController"
import { ApiError } from "../middleware/apiError"
import { Classes, Users, UserWs } from "../models/models"


// Error

export class eventsService{
    static async connectionDB(io:any){
        let candidate:any = await Users.findOne({attributes:["username"],where: {id:io.user_id},
            include: [
              {
                model: Classes,
                as: 'classes',
                required: true,
                attributes:["health"]
              }
          ]})
        candidate = JSON.stringify(candidate)
        candidate = JSON.parse(candidate)
        let candidate1 = await UserWs.findById({_id:io.user_id})
        if(!candidate1){
            const user:any = new UserWs({
                _id:io.user_id,
                username:candidate.username,
                hp:candidate.classes.health,
                statuses: [] // ПОЧЕМУ NUMBER
            })
            await user.save()
            const users:any = await UserWs.find()
            return users
        }
        const users:any = await UserWs.find()
        return users
        // отправляем кеш последних 10 сообщений из Redis   
    }
    static async  disconnectionDB(io:any){
        await UserWs.findByIdAndRemove({_id:io.user_id})
    }
    static async  attack(io:any,data:any) {
        let attacking:any = await Users.findOne({attributes:['id'],where: {id:io.user_id},
              include: [
                {
                  model: Classes,
                  as: 'classes',
                  required: true,
                  attributes:["damage"]
                }
            ]})
        attacking = JSON.stringify(attacking)
        attacking = JSON.parse(attacking)
        const self:any = await UserWs.findById({_id:attacking.id})
        const enemy:any = await UserWs.findById({_id:data.id})
        if(self.hp <= 0){
            return io.emit("error","You need relive")
        }
        if(enemy.hp <= 0){
            return io.emit("error","Someone has already defeated the enemy")
        }
        if(enemy._id == self._id){
            return io.emit("error","You cannot attack")
        }
        if((enemy.statuses[0] ==1 || enemy.statuses[0] == 2) || (enemy.statuses[1] ==1 || enemy.statuses[1] == 2)){
            return io.emit("error","You cannot attack")
        }
        enemy.hp -= attacking.classes.damage
        await enemy.save()
        let users:any = await UserWs.find()
        return users
    }
    static async  ability(io:any,data:any) {
        let ability:any = await Users.findOne({attributes:["id","username"],where: {id:io.user_id},
              include: [
                {
                  model: Classes,
                  as: 'classes',
                  required: true,
                  attributes:["ability","id","name"]
                }
            ]})
        ability = JSON.stringify(ability)
        ability = JSON.parse(ability)
        const self:any = await UserWs.findById({_id:ability.id})
        const enemy:any = await UserWs.findById({_id:data.id})
        if(enemy.hp <= 0 && enemy.hp <= 0){
            return io.emit("error","You cannot use the ability")
        }
        if(enemy._id == self._id && ability.classes.name == "Mage"){
            return io.emit("error","You cannot use the ability to myself")
        }
        if(self._id == enemy._id && (ability.classes.name ==="Thief" || ability.classes.name ==="Warrior") && (self.statuses[0] ==3 && self.statuses[0] ==3) || (self.statuses[1] ==3 && self.statuses[1] ==3)){
            return io.emit("error","You cannot use the ability to myself")
        }
        if(self._id == enemy._id && (ability.classes.name ==="Thief" || ability.classes.name ==="Warrior")){
            self.statuses.unshift(ability.classes.id)
            await self.save()
            setTimeout(async()=>{
                self.statuses.pop(ability.classes.id)
                await self.save()
                let users:any = await UserWs.find()
                return eventController.updateInfo(users)
            },30000)
            let users:any = await UserWs.find()
            return  users
        }
        if(enemy._id !== self._id  && ability.classes.name === "Mage"){
            enemy.statuses.unshift(ability.classes.id)
            await enemy.save()
            setTimeout(async()=>{
                enemy.statuses.pop(ability.classes.id)
                await enemy.save()
                let users:any = await UserWs.find()
                return eventController.updateInfo(users)
            },30000)
            let users:any = await UserWs.find()
            return  users
        }
        if(enemy._id !== self._id || enemy.hp <= 0 && ability.classes.name !== "Mage"){
            return io.emit("error","You cannot use the ability")
        }
    }
    static async  messageUser(io:any,data:any) {
        const user:any = await UserWs.findById({_id:io.user_id})
        if(user.hp<=0){
            return io.emit("error", "You died, be reborn")
        }
        return data.msg
    }
    static async  relive(io:any) {
        const user:any = await UserWs.findById({_id:io.user_id})
        if(user.hp > 0){
            return io.emit("error","You cannot be reborn")
        }else{
            let candidate:any = await Users.findOne({attributes:["id","username"],where: {id:io.user_id},
            include: [
              {
                model: Classes,
                as: 'classes',
                required: true,
                attributes:["health"]
              }
            ]})
            candidate = JSON.stringify(candidate)
            candidate = JSON.parse(candidate)
          if(!candidate){
            return io.emit("error","что-то пошло не так")
          } 
        let user:any = await UserWs.findByIdAndUpdate({_id:io.user_id},{hp:candidate.classes.health,statuses:[]})
        await user.save()
        let users:any = await UserWs.find()
        return users
        }
    }
}
