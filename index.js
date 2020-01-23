const express = require('express');
// for take data from html file
const path = require('path');
// json data link
const members = require('./Members');
// middleware linkup
const logger = require('./middleware/logger');

const app = express();



// // static data send
// app.get('/', (req, res) => {

//   // // direct data show
//   // res.send('<h1>Hello World!</h1>');

//   // data from html file
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));

// });

// // middleware start
// // init middleware
// app.use(logger);
// // middleware end

// get all json array members
app.get('/api/members', (req, res) => res.json(members));

// get single member start
app.get('/api/members/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${ req.params.id }` });
  }
});
// get single member end

// static data show by express (set static folder)
app.use(express.static(path.join(__dirname, 'public')));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));