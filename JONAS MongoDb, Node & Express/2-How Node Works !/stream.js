const { error } = require('console');
const fs = require('fs');
const { listenerCount } = require('process');

const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  // if (err) console.log(err);
  // res.end(data);
  // });

  // Solution 2 Streams

  // this solution is pretty fast compared to the soution 1, now it can read upto 10k plus lines.

  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', chunk => {
  //   res.write(chunk)
  // });
  // readable.on('end', () => {
  //   res.end();
  // });

  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('file not found')
  // })

  // Solution 3
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);




})

server.listen(8000, '127.0.0.1', () => {
  console.log(`Listening`);

})
