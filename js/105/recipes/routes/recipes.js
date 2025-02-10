import express from 'express';
const router = express.Router();
import pool from '../pool.js';

/* GET home page. */
router.route('/')
    .get(async (req, res, next) => {
        try {
            const [results] = await pool.execute(`
        SELECT 
          r.id, 
          r.name, 
          r.description, 
          r.image, 
          r.imageDesc, 
          GROUP_CONCAT(DISTINCT CONCAT(instruc.step_number, ' ', instruc.instruction) 
                       ORDER BY instruc.step_number ASC SEPARATOR '|') AS instructions, 
          GROUP_CONCAT(DISTINCT CONCAT(ingred.quantity, ' ', ingred.ingredient) 
                       SEPARATOR '| ') AS ingredients
        FROM recipes r
        LEFT JOIN instructions instruc ON r.id = instruc.id
        LEFT JOIN ingredients ingred ON r.id = ingred.id
        GROUP BY r.id
      `);

            if (!results.length) {
                res.statusCode = 404;
            }
            res.send(results);

        } catch (err) {
            next(err);
        }
    })
    .post(async (req, res, next) => {   //create one
        try {
            let mystatus = 200; 
            const [recipesResults] = await pool.execute(`
                INSERT INTO recipes (name, description, image, imageDesc)
                VALUES (?,?,?,?)`, [req.body.name, req.body.description, req.body.image, req.body.imageDesc]);

            const insertedId = recipesResults.insertId;
            const recipeRowsAffected = recipesResults.affectedRows;

            if (recipeRowsAffected < 1) {
                res.status(404).json({ message: "Recipe insertion failed." });
                return;
            }

            let instructionsInserted = 0;
            for (let i = 0; i < req.body.instructions.length; i++) {
                const [instructionsResults] = await pool.execute(`
                    INSERT INTO instructions (id, step_number, instruction)
                    VALUES (?,?,?)`, [insertedId, i + 1, req.body.instructions[i].instruction]);

                instructionsInserted += instructionsResults.affectedRows;
            }

            if (instructionsInserted < req.body.instructions.length) {
                mystatus = 207; // Partial completion
            }

            let ingredientsInserted = 0;
            for (let i = 0; i < req.body.ingredients.length; i++) {
                const [ingredientsResults] = await pool.execute(`
                    INSERT INTO ingredients (id, quantity, ingredient)
                    VALUES (?,?,?)`, [insertedId, req.body.ingredients[i].quantity, req.body.ingredients[i].ingredient]);

                ingredientsInserted += ingredientsResults.affectedRows;
            }

            if (ingredientsInserted < req.body.ingredients.length) {
                mystatus = 207; // Partial completion
            }
            const fullInsert = await fetch(`http://localhost:3000/recipes/${insertedId}`)
            const recipeData = await fullInsert.json();

            res.status(mystatus).json(recipeData);

        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {  // update one  
        try {
            let mystatus = 200;
            if (!req.body.id) {
                return res.status(400).json({ message: "Recipe ID is required." });
            }
             const Id = req.body.id;
            const [recipesResults] = await pool.execute(`
                UPDATE recipes 
                SET name = ?, description = ?, image = ?, imageDesc = ?
                WHERE id = ?`, 
                [req.body.name, req.body.description, req.body.image, req.body.imageDesc, Id]);

            const recipeRowsAffected = recipesResults.affectedRows;

            if (recipeRowsAffected < 1) {
                res.status(404).json({ message: "Recipe insertion failed." });
                return;
            }

            let instructionsInserted = 0;
            for (let i = 0; i < req.body.instructions.length; i++) {
                const [instructionsResults] = await pool.execute(`
                    UPDATE instructions
                    SET instruction = ?
                    WHERE id = ? AND step_number = ?`,
                     [req.body.instructions[i].new_instruction,
                     Id, req.body.instructions[i].step_number]);

                instructionsInserted += instructionsResults.affectedRows;
            }

            if (instructionsInserted < req.body.instructions.length) {
                mystatus = 207; // Partial completion
            }

            let ingredientsInserted = 0;
            for (let i = 0; i < req.body.ingredients.length; i++) {
                const [ingredientsResults] = await pool.execute(`
                    UPDATE ingredients
                    SET quantity = ?, ingredient = ?
                    WHERE id = ? AND quantity = ? AND ingredient = ?`,
                    [req.body.ingredients[i].new_quantity, req.body.ingredients[i].new_ingredient,
                    Id, req.body.ingredients[i].quantity, req.body.ingredients[i].ingredient]);

                ingredientsInserted += ingredientsResults.affectedRows;
            }

            if (ingredientsInserted < req.body.ingredients.length) {
                mystatus = 207; // Partial completion
            }
            const fullInsert = await fetch(`http://localhost:3000/recipes/${Id}`)
            const recipeData = await fullInsert.json();

            res.status(mystatus).json(recipeData);

        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {  // DELETE one 
        try {
            if (!req.body.id) {
                return res.status(400).json({ message: "Recipe ID is required." });
            }
            const [results] = await pool.execute(`
           DELETE FROM recipes WHERE id = ?`, [req.body.id]);

            const rowsAffected = results.affectedRows;
            if (rowsAffected < 1) {
                res.status(404);
                return;
            }
            res.status(200).send("Deletion Compleate");
        } catch (err) {
            next(err);
        }
    });

router.get('/:id', async (req, res, next) => {
    const [recipeData] = await pool.execute(`
            SELECT 
                r.id, 
                r.name, 
                r.description, 
                r.image, 
                r.imageDesc, 
                GROUP_CONCAT(DISTINCT CONCAT(instruc.step_number, '. ', instruc.instruction) 
                             ORDER BY instruc.step_number ASC SEPARATOR ' | ') AS instructions, 
                GROUP_CONCAT(DISTINCT CONCAT(ingred.quantity, ' ', ingred.ingredient) 
                             SEPARATOR ' | ') AS ingredients
            FROM recipes r
            LEFT JOIN instructions instruc ON r.id = instruc.id
            LEFT JOIN ingredients ingred ON r.id = ingred.id
            WHERE r.id = ?
            GROUP BY r.id
        `, [req.params.id]);

    if (!recipeData.length) {
        res.statusCode = 404;
    }
    res.send(recipeData);
});

export default router;
