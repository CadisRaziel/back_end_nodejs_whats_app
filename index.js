const express = require("express");
let http = require("http");
const app = express();
const port = 5000;
let server = http.createServer(app);
let io = require("socket.io")(server);

// let io = require('socket.io')(server, {
//     cors:{
//         origin:'*'
//     }
// })

//middleware
app.use(express.json());
let clients = {};
// app.use(cors);

//precisamos deixar tudo do cors comentando para poder abrir a connexão


io.on("connection", (socket) => {
    console.log("conectado");
    console.log(socket.id, "entrou");
    socket.on("entrar", (id) => {
      console.log(id);
      clients[id] = socket;
      console.log(clients);
    });
    socket.on("message", (msg) => {
      console.log(msg);
      let targetId = msg.targetId;
      if (clients[targetId]) clients[targetId].emit("message", msg);
    });
  });

  //*codigo json para o heroku
app.route("/check").get((req, res) => {
  return res.json('Seu app esta trabalhando bem');
})

server.listen(port, () => {
    console.log("server started");    
});

//oi


//se não houver nenhuma porta de acesso fornecida pelo ambiente local ele vai criar na porta 5000
//const port = process.env.PORT || 5000