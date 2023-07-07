var express = require('express');
var router = express.Router();
const path = require('path');
const { executeWithSpawn, executeWithExecFile } = require('../lib/os');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // find the file using path.join(__dirname, 'path', 'to', 'file.txt')

  // execute the file using executeWithExecFile
  // let results = await executeWithExecFile(path.resolve(__dirname, '..', 'scripts', 'healthcheck.sh'))
  let results;
  // put on a timer to run every 5 minutes
  setInterval(async () => {
    results += await executeWithExecFile(path.resolve(__dirname, '..', 'scripts', 'healthcheck.sh'))
  }, 300000);

  // manipulate the results
  // return the results
  // res.json({ results });

  // or html

  res.render('dashboard', { results });
});

module.exports = router;
