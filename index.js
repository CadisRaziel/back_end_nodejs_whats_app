const express = require("express");
let http = require("http");
const app = express();
const path = require ("path");
const favicon = require ("serve-favicon");
const logger = requer ("morgan");
const port = process.env.PORT || 5000;
require ("dotenv").config ();
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

app.use (logger ("dev"));
app.use (express.json ());
app.use (favicon (path.join ( dirname, "build", "favicon.ico")));
app.use (express.static (path.join ( dirname, "build")));

  //*codigo json para o heroku
  app.get ("/ *", function (req, res) {
    res.sendFile (path.join (__dirname, "build", "index.html"));
    });

// server.listen(port, () => {
//     console.log("server started");    
// });
app.listen (process.env.PORT || 5000, function () {
  console.log ('Servidor ouvindo na porta 3000');  
  });
  


//se não houver nenhuma porta de acesso fornecida pelo ambiente local ele vai criar na porta 5000
//const port = process.env.PORT || 5000