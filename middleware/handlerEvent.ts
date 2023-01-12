import {eventController} from "../controller/eventsController"
import {auth} from "../middleware/checkAuth"


export async function checker(io:any){
    console.log(io.token)
    eventController.connect(io)
    io.on("close",eventController.disconnect)
    io.on("message",(message:string)=>{
        let data:any = message
        switch(data.event){
            case "attack":
                //валидация данных
                eventController.attack(io,data)
                break
            case "ability":
                //валидация данных
                eventController.ability(io,data)
                break
            case "relive":
                //валидация данных
                eventController.relive(io,data)
                break
            case "print":
                //валидация данных
                eventController.print(io,data)
                break
            case "printAll":
                //валидация данных
                eventController.printAll(io,data)
                break
            }
        })
}