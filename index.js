const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const PORT = 3000;
const app = express();

app.listen(PORT, () => console.log(`server running o PORT ${PORT}`));

const url = "https://www.nefisyemektarifleri.com/kategori/tarifler/aperatifler-tarifler/";

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.col-md-4.col-sm-6.col-xs-12', html).each(function () {
      const image = $(this).find('.wp-post-image').attr('data-lazy-src');
      const title = $(this).find('.recipe-info .title').text();
      const url = $(this).find('a').attr('href');
      const description = $(this).find('.recipe-elements').text();
      const author = $(this).find('.recipe-owner').attr('title') || "";

      articles.push({
        image,
        title,
        description,
        url,
        author
      });
    });
    app.get('/', (req, res) => {
      res.send(articles);
    });
  }).catch(err => console.log(err));
