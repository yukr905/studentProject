import {eventController} from "../controller/eventsController"


export function checker(ws:any){
    eventController.connect(ws)
    ws.on("close",eventController.disconnect)
    ws.on("message",(message:string)=>{
        let data = JSON.parse(message) 
        switch(data.event){
            case "attack":
                //валидация данных
                eventController.attack(ws,data)
                break
            case "ability":
                //валидация данных
                eventController.ability(ws,data)
                break
            case "relive":
                //валидация данных
                eventController.relive(ws,data)
                break
            case "print":
                //валидация данных
                eventController.print(ws,data)
                break
            case "printAll":
                //валидация данных
                eventController.printAll(ws,data)
                break
            }
        })
}