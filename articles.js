/* útfæra greina virkni */
const fs = require('fs');
const fm = require('front-matter');
const async = require('async');

function markdown(response, onFinish) {
  const frontMatterArr = [];

  async.eachSeries(
    ['articles/batman-ipsum.md', 'articles/corporate-ipsum.md', 'articles/deloren-ipsum.md', 'articles/lorem-ipsum.md'],
    (filename, cb) => {
      fs.readFile(filename, 'utf-8', (err, content) => {
        if (!err) {
          const frontMatter = fm(content);
          frontMatterArr.push(frontMatter);
        }
        cb(err);
      });
    },
    (err) => {
      if (!err) {
        onFinish(frontMatterArr);
      } else {
        console.error(err);
      }
    },
  );
}

module.exports = {
  markdown,
};
