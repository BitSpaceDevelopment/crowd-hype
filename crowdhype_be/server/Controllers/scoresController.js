const db = require('../config/database');

exports.getEndlessScores = function(req, res) {
  try{
    db.query(`
    SELECT *
    FROM EndlessHighScores
    ORDER BY points DESC`,
    (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ rows });
  });
  }
  catch(err){
    console.log(err);
  }
};

exports.getSessionScores = function(req, res) {
  try{
    db.query(`
    SELECT *
    FROM SessionHighScores
    ORDER BY points DESC`,
    (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ rows });
  });
  }
  catch(err){
    console.log(err);
  }
};