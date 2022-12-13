
//import  {router} from"./router/index"

import express from "express"
import ws from "ws"


const app= express()
// app.use(express.json())
// app.use("/api" , router)
app.get("/api",(req,res)=>{
    res.send("Welcome our games")
})
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  console.log('wsServer start');
  socket.on('message', message => {
    console.log(message.toString())
    socket.send('hello from server');
  });

  socket.on('close', () => {
    console.log('wsServer close');
  })
});

const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});




