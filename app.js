require('dotenv').config()
// sync errors



const express = require('express')
const app = express();
const connectDB = require('./db/connect')


const notFoundMidd = require('./middlewares/notfound')
const errorMidd = require('./middlewares/error_handler')

//middleware

app.use(express.json())

//routes

app.get('/', (req,res) =>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})
app.use('/api/v1/producs', )

// products routes

app.use(notFoundMidd)
app.use(errorMidd)

const port = 5000

const start = async() =>{
try {
    //connectDB
    await connectDB(process.env.MONGODB_URI)
    app.listen(port ,()=>{
        console.log(`Server is listening port ${port}`)
    })
} catch (error) {
    console.log(error);  
}
}
start()