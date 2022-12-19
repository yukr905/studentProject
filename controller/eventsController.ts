import { convertCompilerOptionsFromJson } from "typescript"
import {attack,ability,messageUser,relive,connectionDB,disconnectionDB} from "../service/eventsService"


let client:any = [] // список активных юзеров
let id = 0 
function controllerWS(ws:any){
    ws.on("connection",(ws:any)=>{
        console.log("new connection")
        id++
        ws.unicid = id // присваиваем уникальноу ID
        client.push(ws)
        ws.on("close",()=>{
            console.log("disconnection")
            client.forEach(function (value:any,i:number) {
                if(value.readyState !== 1) {
                    client.splice(i, 1)
                }
            });
        })
        ws.on("message",async (message:string)=>{
            let data = JSON.parse(message)
            if(data.event =="attack"){
                console.log("attack")
                //await attack(data)
                ws.send(`attack ${data.id}`)
            }
            else if(data.event =="ability"){
                console.log("ability")
                //await ability(data)
                ws.send(`protected ${data.id}`)
            }
            else if(data.event =="relive"){
                console.log("relive")
                //await relive(data)
                ws.send(`relive ${data.id}`)
            }
            else if(data.event =="print"){
                console.log("print")
                //await messageUser(data)
                if(!data.id){
                    client.forEach(function (value:any) {
                        if(value.readyState == 1 ) {
                            return value.send(data.message)
                        }
                    })
                }else{
                    client.forEach(function (value:any) {
                        if(value.readyState == 1 && value.unicid == data.id) {
                            value.send(data.message)
                        }
                    })
                }
            }else{
                ws.send("Неизвестное событие")
            }
        })
    })
}


export {controllerWS}