require('dotenv').config(); // read .env files
const express = require('express');
const stripe = require('stripe')('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');


const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Listen for HTTP requests
app.listen(port, () => {
  console.log('listening on %d', port);





  //const getProjects = ()=>{
  //  const products = await stripe.products.list({});
  //  return products
  //}

});

// respond with "hello world" when a GET request is made to the homepage
app.get('/test', function (req, res) {
  res.send('hello world')
})

app.get('/test2', function (req, res) {
  res.send('hello world 2')
})


app.get('/test3', function (req, res) {
  res.send('hello world 3')
})


app.get('/products', async function(req,res){

  const products = await stripe.products.list({})
  res.send(products)
})