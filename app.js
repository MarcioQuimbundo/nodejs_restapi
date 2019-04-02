// fazendo loading da app utilizando express...
const express = require('express')
const app = express()

//localhost 3003
app.listen(3003, ()=> {
    console.log("Servidor rodando e fazendo listening na porta 3003")
})