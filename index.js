const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

// Servir a archivos estaticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, ()=> {
    console.log(`Servidor escuchando en puerto ${port}`)
})