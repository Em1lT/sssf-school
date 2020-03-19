const express = require('express')
const pug = require('pug');
const app = express()
const port = 3000
const compiledFunction = pug.compileFile('./views/template.pug');

app.use(express.static('public'))

app.get('/catinfo', (req, res) => {
  res.send(compiledFunction({
    name: 'Frank',
    age: 6,
    weight: 5,
  
  }));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
