import {redis_list} from "../middleware/redis"
import { eventController } from "../controller/eventsController"
import { Classes, Users} from "../models/models" 
import {UserWs} from "../models/usersWs"


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
        let candidate1:any = await UserWs.findById({_id:io.user_id})
        if(candidate1){
            let users:any = await UserWs.find()
            await redis_list(`User ${io.user_id} joined chat`)
            let list = await redis_list(`User ${io.user_id} joined chat`)
            users.push(list)
            return users
        }
        const user:any = new UserWs({
            _id:io.user_id,
            username:candidate.username,
            hp:candidate.classes.health,
            statuses: [] 
        })
        await user.save()
        let users:any = await UserWs.find()
        let list = await redis_list(`User ${io.user_id} joined chat`)
        users.push(list)
        return users  
    }
    static async  disconnectionDB(io:any){
        await UserWs.findByIdAndRemove({_id:io.user_id})
        await redis_list(`User ${io.user_id} disconnection`)
    }
    static async  attack(io:any,data:any) {
        let attacking:any = await Users.findOne({attributes:['id'],where: {id:io.user_id},
              include: [
                {
                  model: Classes,
                  as: 'classes',
                  required: true,
                  attributes:["damage","attack_type"]
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
        await redis_list(`User ${self._id} ${attacking.classes.attack_type} ${enemy._id}`)
        users.push(`User ${self._id} ${attacking.classes.attack_type} ${enemy._id}`)
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
            await redis_list(`User ${self._id} ${ability.classes.ability} to myself`)
            users.push(`User ${self._id} ${ability.classes.ability} to myself`)
            return  users
        }
        if(self.statuses[0] ==3){
            return io.emit("error","You cannot use the ability")
        }
        if(enemy._id !== self._id  && ability.classes.name === "Mage"){
            enemy.statuses.unshift(ability.classes.id)
            self.statuses.unshift(ability.classes.id)
            await enemy.save()
            await self.save()
            setTimeout(async()=>{
                enemy.statuses.pop(ability.classes.id)
                self.statuses.pop(ability.classes.id)
                await enemy.save()
                await self.save()
                let users:any = await UserWs.find()
                return eventController.updateInfo(users)
            },30000)
            let users:any = await UserWs.find()
            await redis_list(`User ${self._id} ${ability.classes.ability} to ${enemy._id}`)
            users.push(`User ${self._id} ${ability.classes.ability} to ${enemy._id}`)
            return  users
        }
        if(enemy._id !== self._id || enemy.hp <= 0 && ability.classes.name !== "Mage"){
            return io.emit("error","You cannot use the ability")
        }
    }
    static async  messageUser(io:any,data:any) {
        let user:any = await UserWs.findById({_id:io.user_id})
        if(user.hp<=0){
            return io.emit("error", "You died, be reborn")
        }
        await redis_list(`${io.user_id} ${data.msg}`)
        return `${io.user_id} ${data.msg}`
    }
    static async  relive(io:any) {
        const user:any = await UserWs.findById({_id:io.user_id})
        if(user.hp > 0){
            return io.emit("error","You cannot be reborn")
        }
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
        await UserWs.findByIdAndUpdate({_id:io.user_id},{hp:candidate.classes.health,statuses:[]})
        let users:any = await UserWs.find()
        await redis_list(`User ${io.user_id} relive`)
        users.push(`User ${io.user_id} relive`)
        return users
    }
}
