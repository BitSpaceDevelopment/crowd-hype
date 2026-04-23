/*
  Do not delete!
  This is Not commented out code, it is for swagger
*/

//swagger documentation for getting endless scores
/**
 * @swagger
 * /endlessScores:
 *   get:
 *     summary: Retrieve a list from EndlessHighScores
 *     description: Retrieve all high scores for the "endless" game mode, 
 *      ordered by points in descending order.
 *     responses:
 *       200:
 *         description: A list of endless high scores
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
 *                       playerName:
 *                         type: string
 *                         description: The name of the player
 *                       points:
 *                         type: integer
 *                         description: The score achieved by the player
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the score was recorded
 *       500:
 *         description: An error occurred while retrieving endless scores
 */

//swagger documentation for getting session scores
/**
 * @swagger
 * /sessionScores:
 *   get:
 *     summary: Retrieve a list from SessionHighScores
 *     description: Retrieve all high scores for the "session" game mode, ordered by points in descending order.
 *     responses:
 *       200:
 *         description: A list of session high scores
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
 *                       playerName:
 *                         type: string
 *                         description: The name of the player
 *                       points:
 *                         type: integer
 *                         description: The score achieved by the player
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the score was recorded
 *       500:
 *         description: An error occurred while retrieving session scores
 */