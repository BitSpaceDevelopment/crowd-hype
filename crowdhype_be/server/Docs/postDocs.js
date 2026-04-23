/*
  Do not delete!
  This is Not commented out code, it is for swagger
*/

//swagger documentation for posting endless scores
/**
 * @swagger
 * /endlessScores:
 *   post:
 *     summary: Add a new score to EndlessHighScores
 *     description: Adds a new high score for the "endless" game mode to the EndlessHighScores table.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the player
 *       - in: query
 *         name: points
 *         required: true
 *         schema:
 *           type: integer
 *         description: The score points achieved by the player
 *     responses:
 *       200:
 *         description: Score successfully added
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
 *                         description: The unique ID of the score entry
 *                       name:
 *                         type: string
 *                         description: The name of the player
 *                       points:
 *                         type: integer
 *                         description: The points achieved by the player
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date when the score was recorded
 *       500:
 *         description: An error occurred while adding the score
 */

//swagger documentation for posting session scores
/**
 * @swagger
 * /sessionScores:
 *   post:
 *     summary: Add a new score to SessionHighScores
 *     description: Adds a new high score for the "session" game mode to the SessionHighScores table.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the player
 *       - in: query
 *         name: points
 *         required: true
 *         schema:
 *           type: integer
 *         description: The score points achieved by the player
 *     responses:
 *       200:
 *         description: Score successfully added
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
 *                         description: The unique ID of the score entry
 *                       name:
 *                         type: string
 *                         description: The name of the player
 *                       points:
 *                         type: integer
 *                         description: The points achieved by the player
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date when the score was recorded
 *       500:
 *         description: An error occurred while adding the score
 */
