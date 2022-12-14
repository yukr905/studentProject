import  {router} from"./router/index"
import express from "express"
import WebSocket  from "ws"


const app= express()
app.use(express.json())
app.use("/api" , router)


app.listen(3000,()=>{
  console.log("Server started : 3000")
});

const ws = new WebSocket.Server({port:3001}) 

ws.on("connection",(ws)=>{
  console.log("new connection")
  ws.on("message",(message:string)=>{
    let data = (JSON.parse(message))
    if(data.message =="attack"){

      ws.send(`attack ${data.id}`)
    }
    if(data.message =="protected"){
      ws.send(`protected ${data.id}`)
    }
    if(data.message =="relive"){
      ws.send(`relive ${data.id}`)
    }
    if(data.message =="print"){
      ws.send(`print ${data.id} ${data.message}`)
    }
  })
})



