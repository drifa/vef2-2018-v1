const express = require('express');
const sd = require('showdown');
const articles = require('./articles');

const app = express();
// til að gera skjölin í public möppunni aðgengileg
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
  articles.markdown(res, (frontMatterArr) => {
    res.render('index', {
      title: 'Greinasafnið',
      title1: 'Greinasafnið',
      articles: frontMatterArr,
    });
  });
});

app.get('/articles/:article', (req, res) => {
  articles.markdown(res, (frontMatterArr) => {
    const foundArticle = frontMatterArr.find(article => article.attributes.slug === req.params.article); // eslint-disable-line max-len
    const converter = new sd.Converter();
    const text = foundArticle.body;
    const html = converter.makeHtml(text);

    res.render('article', {
      title: foundArticle.attributes.title,
      title1: foundArticle.attributes.title,
      body: html,
    });
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404);
  res.render('notFound', {
    title1: 404,
    title: 'Fannst ekki',
    text: 'Ó nei, efnið finnst ekki!',
  });
});

// Handle 500

app.use('*', (err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500);
  res.render('notFound', {
    title1: 500,
    title: 'Villa kom upp',
    text: '',
  });
});

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
