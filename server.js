require('dotenv').config(); // read .env files
const express = require('express');
const stripe = require('stripe')('pk_live_51JFQjwCqJa3fxh3yY169fh4ovwtZ93xhPOPz6w3tE35UBJTfXAbzR3SZmwm4WF0BMCwCZzBhF4h2IQo0BJJlLeHf001BSjMQF4');


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

