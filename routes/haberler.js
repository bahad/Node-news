const express = require('express');
const router = express.Router();
const cors = require('cors');
const scraper = require('../CheerioScraping/scraper');
//GET
router.get('/', (req, res, next) => {
  res.json({
    message: 'Scraping is Fun!'
  });
});

router.get('/haberlercom', (req, res) => {
  return res.status(200).json({
    result: scraper.haberlercom
  })
});

router.get('/haberlercomEkonomi', (req, res) => {
  res.json({ result: scraper.haberlercomEkonomi });
});

router.get('/haberlercomDunya', (req, res) => {
  res.json({ result: scraper.haberlercomDunya });
});

router.get('/haberdetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  console.log(formattedurl);
  scraper.searchHaber(formattedurl)
    .then(haber => {
      res.json({ result: haber })

    })
});

router.get('/sozcu', (req, res) => {
  res.json({ result: scraper.sozcu });
});


router.get('/sozcuEkonomi', (req, res) => {
  res.json({ result: scraper.sozcuEkonomi });
});

router.get('/sozcuDunya', (req, res) => {
  res.json({ result: scraper.sozcuDunya });
});

router.get('/sozcudetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchSozcu(formattedurl)
    .then(haber => {
      res.json({ result: haber });

    })
});

router.get('/milliyet', (req, res) => {
  res.json({ result: scraper.milliyet });
});

router.get('/milliyetSondakika', (req, res) => {
  res.json({ result: scraper.milliyetSonDakika });
});

router.get('/milliyetEkonomi', (req, res) => {
  res.json({ result: scraper.milliyetEkonomi });
});

router.get('/milliyetDunya', (req, res) => {
  res.json({ result: scraper.milliyetDunya });
});

router.get('/milliyetDetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchMilliyet(formattedurl)
    .then(haber => {
      res.json({ result: haber });
    })
});

router.get('/cnn', (req, res) => {
  res.json({ result: scraper.cnn });
});

router.get('/cnnDetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchCnn(formattedurl)
    .then(haber => {
      res.json({ result: haber });

    })
});

router.get('/t24', (req, res) => {
  res.json({ result: scraper.t24 });
});

router.get('/t24Sondakika', (req, res) => {
  res.json({ result: scraper.t24sonDakika });
});

router.get('/t24Ekonomi', (req, res) => {
  res.json({ result: scraper.t24Ekonomi });
});

router.get('/t24Dunya', (req, res) => {
  res.json({ result: scraper.t24Dunya });
});

router.get('/t24Detay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searcht24(formattedurl)
    .then(haber => {
      res.json({ result: haber });

    })
});

router.get('/haberGlobal', (req, res) => {
  res.json({ result: scraper.haberGlobal });
});

router.get('/haberGlobalEkonomi', (req, res) => {
  res.json({ result: scraper.haberGlobalEkonomi });
});

router.get('/haberGlobalDunya', (req, res) => {
  res.json({ result: scraper.haberGlobalDunya });
});

router.get('/haberGlobalDetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchGlobalHaber(formattedurl)
    .then(haber => {
      res.status(200).json({ result: haber })

    })
});

router.get('/sondakikacomEkonomi', (req, res) => {
  res.json({ result: scraper.sonDakikaComEkonomi });
});

router.get('/sondakikacomDunya', (req, res) => {
  res.json({ result: scraper.sonDakikaComDunya });
});

router.get('/tele1sondakika', (req, res) => {
  res.json({ result: scraper.tele1sondakika });
});

router.get('/tele1Detay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchTele1(formattedurl)
    .then(haber => {
      res.json({ result: haber });
    })
});

router.get('/sondakikacomDetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchSonDakika(formattedurl)
    .then(haber => {
      res.json({ result: haber });
    })
});

router.get('/mynetSondakika', (req, res) => {
  res.json({ result: scraper.mynetSondakika });
});


router.get('/mynetDetay/:search', (req, res) => {
  const searchUrl = req.params.search;
  const formattedurl = searchUrl.split("^").join("/");
  scraper.searchMynet(formattedurl)
    .then(haber => {
      res.json({ result: haber });
    })
});

router.get('/getallsondakika', (req, res) => {
  var newArr = [];
  var haberler = scraper.allSondakika[0]
  var milliyet = scraper.allSondakika[1]
  var t24 = scraper.allSondakika[2]
  var haberGlobal = scraper.allSondakika[3]
  var tele1 = scraper.allSondakika[4]
  var myNet = scraper.allSondakika[5]
  newArr = newArr.concat(haberler, milliyet, t24, haberGlobal, tele1, myNet)
  shuffle(newArr)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const result = newArr.slice(startIndex, endIndex)

  if (endIndex < newArr.length) {
    var next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    var previous = {
      page: page - 1,
      limit: limit
    }
  }

  res.status(200).json({
    count: newArr.length,
    previous: previous,
    next: next,
    result: result
  })

});

router.get('/getallgundem', (req, res) => {
  var newArr = [];
  var sozcu = scraper.allGundem[0]
  var milliyet = scraper.allGundem[1]
  var t24 = scraper.allGundem[2]
  newArr = newArr.concat(sozcu, milliyet, t24)
  shuffle(newArr)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const result = newArr.slice(startIndex, endIndex)

  if (endIndex < newArr.length) {
    var next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    var previous = {
      page: page - 1,
      limit: limit
    }
  }

  res.status(200).json({
    count: newArr.length,
    previous: previous,
    next: next,
    result: result
  })

});

router.get('/getallekonomi', (req, res) => {
  var newArr = [];
  var sozcu = scraper.allEkonomi[0]
  var haberler = scraper.allEkonomi[1]
  var haberGlobal = scraper.allEkonomi[2]
  var t24 = scraper.allEkonomi[3]
  var milliyet = scraper.allEkonomi[4]
  var sondakika = scraper.allEkonomi[5]

  newArr = newArr.concat(sozcu, haberler, haberGlobal, t24, milliyet, sondakika)
  shuffle(newArr)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const result = newArr.slice(startIndex, endIndex)

  if (endIndex < newArr.length) {
    var next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    var previous = {
      page: page - 1,
      limit: limit
    }
  }

  res.status(200).json({
    count: newArr.length,
    previous: previous,
    next: next,
    result: result
  })

});

router.get('/getalldunya', (req, res) => {
  var newArr = [];
  var haberler = scraper.allDunya[0]
  var sozcu = scraper.allDunya[1]
  var haberGlobal = scraper.allDunya[2]
  var t24 = scraper.allDunya[3]
  var milliyet = scraper.allDunya[4]
  var sondakika = scraper.allDunya[5]

  newArr = newArr.concat(haberler, sozcu, haberGlobal, t24, milliyet, sondakika)
  shuffle(newArr)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const result = newArr.slice(startIndex, endIndex)

  if (endIndex < newArr.length) {
    var next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    var previous = {
      page: page - 1,
      limit: limit
    }
  }

  res.status(200).json({
    count: newArr.length,
    previous: previous,
    next: next,
    result: result
  })

});


function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

module.exports = router;