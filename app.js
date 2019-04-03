// fazendo loading da app utilizando express...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('dev'))



function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodejs_api',
        password: 'ANGO_covdb157016'
    })
}


app.post('/users/create',(req, res) => {

    const primeiro_nome = req.body.first_name
    const ultimo_nome = req.body.last_name

    const queryInsertUser = "INSERT INTO users (first_name, last_name) VALUES(?, ?)"

    getConnection().query(queryInsertUser, [primeiro_nome, ultimo_nome], (err, results, fields) => {
        if (err) {
            console.log("Erro ao inserir novo utilizador, Erro: " + err)
            res.sendStatus(500)
            return
        }
    })
    res.end()
})


app.get("/users/:id", (req, res) => {

    var userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"

    getConnection().query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Erro ao buscar utilizador, Erro: " + err)
            res.sendStatus(500)
            res.end()
        }
        const users = rows.map((row) => {
            return {id: row.id, firstName: row.first_name, lastName: row.last_name}
        })
        res.json(users)
    })
})

app.get("/", (req, res) => {
    console.log("root")
    res.send("<h1 style='text-align: center;margin-top: 20%;'>NodeJs API</h2>")
})

app.get("/users", (req, res) => {
    const queryStringAllUsers = "SELECT * FROM users"

    getConnection().query(queryStringAllUsers, (err, rows, fields) => {
        if (err) {
            console.log("Erro ao buscar todos os utilizadores, Erro: " + err)
            res.sendStatus(500)
            res.end()
        }
        res.json(rows)
    })
})

//localhost 3003
app.listen(3003, ()=> {
    console.log("Servidor rodando e fazendo listening na porta 3003")
})