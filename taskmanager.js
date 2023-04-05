const express = require('express');
const controllers = require('./controllers')
const app = express();  
const tasks = require('./tasks')
const connectDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middlewares/notfound')
const errorHandler = require('./middlewares/error_handler')

const swaggerui = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerdoc =yaml.load('./swagger.yaml')
// middle ware
app.use(express.static('./projects'))
app.use(express.json())

//routes
app.get('/' , (req,res)=>{
    res.send('<h1>Tasks</h1><a href="/api-tasks">Documentation</a>')
})
app.use('api-tasks',swaggerui.serve,swaggerui.setup(swaggerdoc))
app.get('/hello', (req,res) =>{
    res.send('Task Manager App')
})
app.use('/api/v1/tasks', tasks)
app.use( notFound)
app.use(errorHandler)


//app.get('api/v1/tasks')           - get all tasks
// app.post('/api/v1/tasks/:id')    - create a new task
// app.get('/api/v1/tasks/:id')     -get a single task
// app.patch('/api/v1/tasks/:id')   -update task
// app.delete('/api/v1/tasks/:id')  -delete task


const port = process.env.PORT;
const start = async () =>{
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port , ()=>{
            console.log(`Server running on ${port}...`);
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
start()
