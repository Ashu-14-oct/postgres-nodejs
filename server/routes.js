const {Router} = require('express');
const client = require('./config');

const router = Router();

// get todos
router.get('/todo', async (req, res) => {
    try {
        const data = await client.query("SELECT * FROM todo");
        const rows = data.rows;
        
        return res.status(200).json({rows});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});

// update check box
router.post('/todo', async(req, res) => {
    try {
        const {id} = req.body;
        const update = await client.query('UPDATE todo SET completed = true WHERE id=$1',[id]);

        return res.status(200).json({message: "Updated successfully", update});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
});

// add todo
router.post('/add-todo', async (req, res) => {
    try {
        const {todo} = req.body;
        const data = await client.query('INSERT INTO todo (todo, completed) VALUES ($1, $2) RETURNING *;',[todo, false]);
        return res.status(200).json({data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
});


module.exports = router;