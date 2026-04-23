/*
  Do not delete!
  This is Not commented out code, it is for swagger
*/

//swagger documentation for deleting endless scores
/**
 * @swagger
 * /endlessScores:
 *   delete:
 *     summary: Delete low scores from EndlessHighScores
 *     description: Deletes all scores from the EndlessHighScores table that are ranked lower than the top 10 scores.
 *     responses:
 *       200:
 *         description: Scores below the top 10 were successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the deleted score
 *                       name:
 *                         type: string
 *                         description: The name of the player
 *                       points:
 *                         type: integer
 *                         description: The score points that were deleted
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date when the score was recorded
 *       500:
 *         description: An error occurred while deleting scores
 */

//swagger documentation for deleting session scores
/**
 * @swagger
 * /sessionScores:
 *   delete:
 *     summary: Delete low scores from SessionHighScores
 *     description: Deletes all scores from the SessionHighScores table that are ranked lower than the top 10 scores.
 *     responses:
 *       200:
 *         description: Scores below the top 10 were successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the deleted score
 *                       name:
 *                         type: string
 *                         description: The name of the player
 *                       points:
 *                         type: integer
 *                         description: The score points that were deleted
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date when the score was recorded
 *       500:
 *         description: An error occurred while deleting scores
 */