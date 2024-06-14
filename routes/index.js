var express = require('express');
var router = express.Router();
var db = require('../db/config');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App Health'});
});


router.get('/api/reviews', function(req, res, next) {
  db.getReviews("antennapod").then(reviews => {
    res.send(reviews);
  });
});

router.get('/api/issuesPerVersion', function(req, res, next) {
  db.getReviews("antennapod").then(reviews => {
    let issuesPerVersion = {};

    reviews.forEach(review => {
        if(review.label && review.label.length > 0){
            review.label.forEach(issue => {
              let issue_name = issue[2];
              if(issuesPerVersion[review.reviewCreatedVersion]){
                  if(issuesPerVersion[review.reviewCreatedVersion][issue_name]){
                      issuesPerVersion[review.reviewCreatedVersion][issue_name]++;
                  } else {
                      issuesPerVersion[review.reviewCreatedVersion][issue_name] = 1;
                  }
              } else {
                  issuesPerVersion[review.reviewCreatedVersion] = {};
                  issuesPerVersion[review.reviewCreatedVersion][issue_name] = 1;
              }
            });
        }
    });

    res.send(issuesPerVersion);
  });
});

router.get('/api/artifactsPerVersion', function(req, res, next) {
  db.getArtifacts("antennapod").then(artifacts => {
    res.send(artifacts);
  });
});

router.get('/api/smells', function(req, res, next) {
  db.getSmells("antennapod").then(smells => {
    res.send(smells);
  });
});

router.get('/api/releases', function(req, res, next) {
  db.getReleases("antennapod").then(releases => {
    res.send(releases);
  });
});

module.exports = router;
