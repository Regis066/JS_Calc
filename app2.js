const express = require('express')
const mainroutes = require('./starter/main')
const app = express()
app.use('/api/v1', mainroutes)
const port = 5000

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`)
})