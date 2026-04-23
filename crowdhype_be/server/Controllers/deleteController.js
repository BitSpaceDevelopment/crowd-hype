const db = require("../config/database");

// Using a common table expression (CTE) it selects the
//10th highest score and deletes all values less than it

exports.deleteEndlessScore = function (req, res) {
  db.query(
    `
    WITH RankedScores AS (
      SELECT points
      FROM EndlessHighScores
      ORDER BY points DESC
      LIMIT 1 OFFSET 9
    )
    DELETE FROM EndlessHighScores
    WHERE points < (SELECT points FROM RankedScores);`,
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json({ rows });
    }
  );
};

exports.deleteSessionScore = function (req, res) {
  db.query(
    `
    WITH RankedScores AS (
      SELECT points
      FROM SessionHighScores
      ORDER BY points DESC
      LIMIT 1 OFFSET 9
    )
    DELETE FROM SessionHighScores
    WHERE points < (SELECT points FROM RankedScores);`,
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json({ rows });
    }
  );
};
