import  {router} from"./router/index"
import express from "express"
import {Server}  from "socket.io"

import {handlerError} from "./middleware/handlerError"
import { checker } from "./middleware/handlerEvent"
import {auth} from "./middleware/checkAuth"
import {db} from "./models/db"
import {Users,Classes} from "./models/models"

const app= express()
app.use(express.json())
app.use("/api" , router)

app.use(handlerError)

async function start() {
  try {
    app.listen(3000, async()=>{
      console.log("Server started : 3000")
    });
    await db.authenticate()
    await Classes.sync()
    await Users.sync()
    console.log("database connection")
  } catch (error) {
    console.log(error)
  }
}
start()

const io = new Server(3001)
io.use(auth.checkWs).on("connection", checker)




