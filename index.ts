import  {router} from"./router/index"
import express from "express"
import {Server}  from "socket.io"
import {handlerError} from "./middleware/handlerError"
import { checker } from "./middleware/handlerEvent"
import {auth} from "./middleware/checkAuth"

const app= express()
app.use(express.json())
app.use("/api" , router)

app.use(handlerError)

app.listen(3000,()=>{
  console.log("Server started : 3000")
});

export const io = new Server(3001)

io.use(auth.checkWs).on("connection", checker)



