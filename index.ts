import  {router} from"./router/index"
import express from "express"
import WebSocket  from "ws"
import {controllerWS} from "./controller/eventsController"
import {handlerError} from "./middleware/handlerError"


const app= express()
app.use(express.json())
app.use("/api" , router)

app.use(handlerError)

app.listen(3000,()=>{
  console.log("Server started : 3000")
});

const ws = new WebSocket.Server({port:3001}) 
controllerWS(ws)


