const port = process.env.port || 5432
const db = require('./config/database')

// //http://localhost:3000/getUSers
App.get('./getActors', db.getActors)

App.get('/getFilmById/:id', db.getFilmById)

App.use(express.json())
App.use(express.urlencoded({extended:true}))

App.listen(port, ()=>{
    console.log('server is URLSearchParams, port:${port}');
})

let dbConfig = {
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false}
}