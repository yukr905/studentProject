import  {router} from"./router/index"
import express from "express"
import {Server}  from "socket.io"
import mongoose from "mongoose"
import {handlerError} from "./middleware/handlerError"
import { checker } from "./middleware/handlerEvent"
import {auth} from "./middleware/checkAuth"
import {db} from "./models/db"
import {Users,Classes} from "./models/models"
import { conf } from "./config"
import {createClient} from "redis"


const app= express()
app.use(express.json())
app.use("/api" , router)

app.use(handlerError)

const url = conf.url
export let client = createClient({
    url
})
async function start() {
  try {
    app.listen(3000, async()=>{
      console.log("Server started : 3000")
    });
    await mongoose.connect(conf.mongo)
    await db.authenticate()
    await Classes.sync()
    await Users.sync()
    await client.connect()
    client.on('error', (err) => console.log('Redis Client Error', err))
    console.log("database connection")
  } catch (error) {
    console.log(error)
  }
}
start()


const io = new Server(3001)
io.use(auth.checkWs).on("connection", checker)




