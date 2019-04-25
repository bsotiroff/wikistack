const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.send('go to GET /wiki/');
});

// router.post('/', (req, res, next) => {
//   res.send('go to POST /wiki/');
// });

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    console.log('###########################', page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
