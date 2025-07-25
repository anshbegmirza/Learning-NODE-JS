const fs = require('fs');

const http = require('http'); // networking capabilities
const url = require('url');



///////////////////////////
// FILES

// Blocking, Synchronous Way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `this is what we know about the avocado 🥑 ${textIn} \n Created on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('FileWritten !');


// Non-blocking, Asynchronous Way
/*
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

  if (err) return console.log('Some Error Occured 💥️');

  console.log(data1);
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);

    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('file updated successfully !, Your file has been written 😉️😉️😉️');

      })

    })

  })
})
console.log('will read file');
*/

//////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);


  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
}

// this function will be called once and the data will be stored in a variable
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data); // this holds data in as js obj.


const server = http.createServer((req, res) => {

  const pathName = req.url;

  const { query, pathname } = url.parse(pathName, true);
  // console.log(query, pathname);



  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHTML = dataObj.map(el => {
      return replaceTemplate(tempCard, el)
    }).join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
    res.end(output);
  }

  // Product Page
  else if (pathname === '/product') {
    // res.writeHead(200, { 'Content-type': 'text/html' });
    // res.end(tempProduct);

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product)

    console.log(query);
    res.end(output);
    return;
  }

  // API
  else if (pathname === '/api') {
    // fs.readFile('./dev-data/data.json', 'utf-8', (err, data) => {
    //   // console.log(data);
    //   const productData = JSON.parse(data);
    //   console.log(productData);

    // })
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    //   // const productData = JSON.parse(data);
    //   // console.log(productData);
    //   console.log(JSON.parse(data));
    // })

    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data)
    return;
  }
  //NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    })
    res.end('<h1>Page not found !</h1>')
  }

})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000'); // http://localhost:8000/
  // http://127.0.0.1:8000/

})
