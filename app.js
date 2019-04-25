const morgan = require('morgan');
const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: false }));
console.log(__dirname);

app.use('/wiki', wikiRouter);
// app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;

const init = async () => {
  await models.User.sync();
  await models.Page.sync();
  await models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Server is listening in ${PORT}`);
  });
};

init();
