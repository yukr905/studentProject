import { convertCompilerOptionsFromJson } from "typescript"
import {attack,ability,messageUser,relive,connectionDB,disconnectionDB} from "../service/eventsService"


let client:any = [] // список активных юзеров
let id = 0 

export class eventController{
    static async connect(ws:any){
        console.log("new connection")
        id++
        ws.unicid = id // присваиваем уникальноу ID
        client.push(ws)
        console.log(client)
    }
    static async disconnect(ws:any){
        console.log("disconnection")
            client.forEach(function (value:any,i:number) {
                if(value.readyState !== 1) {
                    client.splice(i, 1)
                }
            });
    }
    static async attack(ws:any , data:any){
        console.log("attack")
        //await attack(data)
        ws.send(`attack ${data.id}`)
    }
    static async ability(ws:any , data:any){
        console.log("ability")
        //await ability(data)
        ws.send(`protected ${data.id}`)
    }
    static async relive(ws:any , data:any){
        console.log("relive")
        //await relive(data)
        ws.send(`relive ${data.id}`)
    }
    static async print(ws:any,data:any){
        console.log("tuta")
        client.forEach(function (value:any) {
            if(value.readyState == 1 && value.unicid == data.id) {
                console.log("tut")
                value.send(data.message)
            }
        })
    }
    static async printAll(ws:any,data:any){
        client.forEach(function (value:any) {
            if(value.readyState == 1 ) {
                return value.send(data.message)
            }
        })
    }
}