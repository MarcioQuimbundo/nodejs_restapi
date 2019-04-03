// fazendo loading da app utilizando express...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(express.static('./public'))

app.use(morgan('dev'))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_api',
    password: 'ANGO_covdb157016'
})

app.get("/users/:id", (req, res) => {

    var userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"

    connection.query(queryString, [userId], (err, rows, fields) => {
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

    connection.query(queryStringAllUsers, (err, rows, fields) => {
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