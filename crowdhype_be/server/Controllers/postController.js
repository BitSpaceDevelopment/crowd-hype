const dateformat = require('../Utils/dateFormat');
const db = require('../config/database');

exports.addNewEndlessScore = function(req, res) {
  const { name, points } = req.query;
  const formattedDate = dateformat.formatDate();
  console.log(name, points);
  try{
    db.query(
    `INSERT INTO EndlessHighScores (name, points, date)
    VALUES ("${name}", ${points}, "${formattedDate}" )`,
    (err, rows, fields) => {
    if (err) throw err
    res.status(200).json({ rows });
    });
  }
  catch(err){
    console.log(err);

  }
};

exports.addNewSessionScore = function(req, res) {
  const { name, points } = req.query;
  const formattedDate = dateformat.formatDate();
  console.log(name, points);
  try{
    db.query(
    `INSERT INTO SessionHighScores (name, points, date)
    VALUES ("${name}", ${points}, "${formattedDate}" )`,
    (err, rows, fields) => {
    if (err) throw err
    res.status(200).json({ rows });
    });
  }
  catch(err){
    console.log(err);

  }
};