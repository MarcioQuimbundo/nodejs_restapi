// fazendo loading da app utilizando express...
const express = require('express')
const app = express()

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
})

app.get("/users", (req, res) => {
    var user1 = {firstname: "Marcio", lastname: "Quimbundo"}
    const user2 = {firstname: "Erikson", lastname: "Melgarejo"}
    res.json([user1, user2])
    //res.send("Hello from users")
})

//localhost 3003
app.listen(3003, ()=> {
    console.log("Servidor rodando e fazendo listening na porta 3003")
})