import { updateObjectBindingPattern } from "typescript"
import { UserWs } from "../models/models"
import {eventsService} from "../service/eventsService"

let client:any = [] // список активных юзеров

export class eventController{     
    static async connect(io:any){
        client.push(io)
        console.log("new connection", io.id)
        const users:any = await eventsService.connectionDB(io)
        client.forEach(function (value:any) {
            value.emit("connection", `${users}`)
    })
    }
    static async disconnect(io:any){
        console.log("disconnection")
        await eventsService.disconnectionDB(io)
        client.forEach(function (value:any,i:number) {
            if(value.readyState !== 1) {
                client.splice(i, 1)
            }
        })
    }
    static async attack(io:any , data:any){
        console.log("attack")
        const users = await eventsService.attack(io,data)
        client.forEach(function (value:any) {
            value.emit("attack", `${users}`)
        })
    }
    static async ability(io:any , data:any){
        console.log("ability")
        const users = await eventsService.ability(io,data)
        client.forEach(function (value:any) {
            value.emit("ability", `${users}`)
        })
    }
    static async relive(io:any){
        console.log("relive")
        const users:any = await eventsService.relive(io)
         // Возвращаем обновленную сессию целевого юзера всем подписчикам
         client.forEach(function (value:any) {
            value.emit("relive", `${users}`)
        })
    }
    static async printAll(io:any,data:any){
        const msg:any = await eventsService.messageUser(io,data)
        client.forEach(function (value:any) {
                return value.emit("printAll",msg)
        })
    }
    static async updateInfo(data:any){
        client.forEach(function (value:any) {
            return value.emit("printUpdate",data)
    })
    }
}