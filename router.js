// Cargar los módulos
const express = require('express')
const mysql = require('mysql')
const path = require('path')

// Iniciar las rutas
const router = express.Router()

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'cars'
})
let tipos = []

const selectTipos = "SELECT DISTINCT(tipo) FROM modelos GROUP BY tipo"
connection.query(selectTipos, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        tipos = result
    }
})



// Ruta raíz
router.get('/', (req, res) => {
    console.log("tipos", tipos);
    const selectAll = "SELECT * FROM modelos"
    connection.query(selectAll, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(result);
            res.render("index", {h2 : "Our wonderful cars", result, tipos})
        }
    })
})

router.get('/tipo/:tipo', (req, res) => {
    const tipo = req.params.tipo
    const selectTipo = `SELECT * FROM modelos WHERE tipo = '${tipo}'`
    connection.query(selectTipo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                res.render("error", {h2 : "Our wonderful cars", tipos})
            }
            // console.log(result);
            const titulo = tipo[0].toLocaleUpperCase()+tipo.slice(1)+"s"
            res.render("index", {h2 : titulo, result, tipos})
        }
    })
})


module.exports = {router, tipos}