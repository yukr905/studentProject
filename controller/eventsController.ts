import {eventsService} from "../service/eventsService"

let client:any = [] // список активных юзеров
let id = 0 

export class eventController{
    static async connect(io:any){
        console.log("new connection", io.id)
        id++
        io.unicid = id // присваиваем уникальноу ID
        client.push(io)
    }
    static async disconnect(io:any){
        console.log("disconnection")
            client.forEach(function (value:any,i:number) {
                if(value.readyState !== 1) {
                    client.splice(i, 1)
                }
        })
    }
    static async attack(io:any , data:any){
        console.log("attack")
        //await attack(data)
        io.emit('attack',`вы атаковали ${data.id}`);
    }
    static async ability(io:any , data:any){
        console.log("ability")
        //await ability(data)
        io.emit(`protected`,"защита активирована")
    }
    static async relive(io:any , data:any){
        console.log("relive")
        //await relive(data)
        io.emit(`relive`,"вы возродились")
    }
    static async print(io:any,data:any){
        client.forEach(function (value:any) {
            value.to(data.id).emit("print",data.message)
        })
    }
    static async printAll(io:any,data:any){
        client.forEach(function (value:any) {
                return value.emit("printAll",data.message)
        })
    }
}