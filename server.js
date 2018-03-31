const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')

app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method}${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append to sever.log');
    }
  })
  next();
});

app.use((req,res,next)=>{
  res.render('mantenance.hbs');
})

hbs.registerHelper('getCurrentYear',()=>{
  return  new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

console.log(__dirname);
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'this is the home page'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
  });
})

app.get('/bad',(req,res)=>{
  res.send({
    status:'Unable to handel request'
  })
})

app.listen(3000,()=>{
  console.log('server is up on port 300');
});
