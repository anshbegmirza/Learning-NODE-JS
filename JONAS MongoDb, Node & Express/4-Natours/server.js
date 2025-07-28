const dotenv = require('dotenv')
console.log(process.env);

const app = require('./app');

dotenv.config({
  path: './config.env'
})

// 4). Start server.
const port = 3000;

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});


