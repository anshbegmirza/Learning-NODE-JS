const fs = require('fs');
const slugify = require('slugify')
const http = require('http');
const url = require('url');



const replaceTemplate = require('./modules/replaceTemplate')


//////////////////////////////
// SERVER

// this function will be called once and the data will be stored in a variable
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data); // this holds data in as js obj.

const slugs = dataObj.map(el => {
  return slugify(el.productName, { lower: true })
})

console.log(slugs);


console.log(slugify('Fresh AVAcados', { lower: true }));


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
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product)

    res.end(output);
    return;
  }

  // API
  else if (pathname === '/api') {
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
  console.log('listening to requests on port 8000');
})
