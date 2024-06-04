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

// Ruta raíz
router.get('/', (req, res) => {
    const selectAll = "SELECT * FROM modelos"
    connection.query(selectAll, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(result);
            res.render("index", {h2 : "Our wonderful cars", result})
        }
    })
    // res.render("index", {h2 : "Our wonderful cars"})
})



module.exports = router