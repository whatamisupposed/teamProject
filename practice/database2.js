const {Pool} = require('pg');

let dbConfig = {
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:'
}
const pool = new Pool(dbConfig)

exports.getActors = (req, res) =>{
    pool.query('SELECT * FROM actor limit 5', (err, result) =>{
        if(err) throw err;
       console.log(result);
        console.log('getActors');
        for (const row of result.rows) {
            console.log(row);
        }
        res.status(200).json(result.rows)
    })
}

exports.getFilmById = async (req, res) =>{
    const id = req.params.idconst
    const sqlConfig ={
        text: 'select * from film where film_id = $1',
        values: [id]
    }
    try {
        const result = await pool.query(sqlConfig)
        if(result.rowCount <= 0){
            res.status(200).json({'message' : 'empty'})
        } else {
            for (const row of result.rows) {
                console.log(JSON.stringify(row));
            }
            res.status(200).json(result.rows)
        }
    } catch (error) {
        
    }
}