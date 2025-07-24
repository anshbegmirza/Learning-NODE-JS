const EventEmitter = require('events');

const http = require('http')

class Sales extends EventEmitter {
  constructor() {
    super();
  }


}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log(`there was a new sale`);

})

myEmitter.on('newSale', stock => {
  console.log(`There are now ${stock} items`);

})


myEmitter.on('newSale', () => {
  console.log(`Customer name : Mirza  `);
})

myEmitter.emit('newSale', 9);

//////////////////////////////////////////////////


const server = http.createServer();

server.on('request', (req, res) => {
  // console.log('Request received', req);
  res.end('Request received')
  return;
})

server.on('request', (req, res) => {
  console.log('Another request received 😉️');
  res.end('Another request received 😉️');
  return
})


server.on('close', () => console.log(`server closed`));

server.listen(8000, `127.0.0.1`, () => {
  console.log('Waiting for response');
});
