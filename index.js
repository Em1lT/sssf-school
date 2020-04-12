let express = require('express'),
  http = require('http');
let app = express();
let i = 0;

http.createServer(app)

let server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

var io = require('socket.io').listen(server);


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.join("Room1")
  socket.on('chat message', (msg) => {
    io.sockets.in(msg.room).emit('chat message', msg.message)    
    console.log(i++ + ': ' + msg.message + " To room: " + msg.room);
  });

  socket.on('join', room => {
    socket.join(room)
    io.sockets.in(room).emit('chat message', "Someone joined the room!")    
  })

  socket.on('leave', room => {
    socket.leave(room)
    io.sockets.in(room).emit('chat message', "Someone leaved the room!")    
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})