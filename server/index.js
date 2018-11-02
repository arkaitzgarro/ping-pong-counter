const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const validatePlayer = (player, success, error) => {
  if (['blue', 'red'].includes(player)) {
    success();
  } else {
    console.error(`${player} is not a valid value!`);
    error();
  }
};

io.on('connection', (socket) => {
  console.log('A client connected: ', socket.id);
});

app.post('/score/:player', (req, res) => {
  const player = req.params.player;
  validatePlayer(player, () => {
    io.emit('score', req.params.player);
    res.send('OK');
  }, () => {
    res.send(400);
  });
});

app.post('/undo/:player', (req, res) => {
  const player = req.params.player;
  validatePlayer(player, () => {
    io.emit('undo', req.params.player);
    res.send('OK');
  }, () => {
    res.send(400);
  });
});

app.post('/reset', (req, res) => {
  io.emit('reset');
  res.send('OK');
});

const listener = http.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
