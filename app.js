const morgan = require('morgan');
const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const {addPage} = require('./views');
const router = express.Router();

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

router.use('/user', userRouter);
router.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
    res.send('Hello world!');
 });
 

 router.get('/', (req, res, next) => {
     res.send('go to GET /wiki/');
 });

 router.post('/', (req, res, next) => {
    res.send('go to POST /wiki/');
 });

 router.get('/add', (req, res, next) =>{
     res.send(addPage());
 });


 models.db.authenticate().
 then(() => {
   console.log('connected to the database');
 })
 
const PORT = 3000;

const init = async () => {
    await models.User.sync()
    await models.Page.sync()
    await models.db.sync({force: true})
    app.listen(PORT, () => {
        console.log(`Server is listening in ${PORT}`);
    
    });

}

init();

module.exports = router;