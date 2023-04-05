const Task = require('../models/Task')
const Tasks = require('../models/Task')
const {createCustomError} = require('../errors/customer_error')
const asyncWrapper = require('../middlewares/async')
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const express = require('express')
const app = express()

const options = {
    definition: {
            openapi: '3.0.0',
            info : {
                title: 'Node JS Project',
                version: '6.0.0'

            },
            servers: [
                {
                    api: 'http://localhost:3000'

            }
        ]
    },
    apis: ['./controllers.js']
}
const swaggerspec = swaggerjsdoc(options)
app.use('api/v1/docs', swaggerui.serve , swaggerui.setup(swaggerspec))

const getalltasks = asyncWrapper( async (req,res) =>{
    // const search = 'r'
    const {name} = req.query
    const queryObject = {}
    if(name){
        queryObject.name =  {$regex:name , $options:'i'}
    }
        const task = await Task.find(queryObject)
        res.status(200).json({task , nbhits: task.length})
})
const createtasks = asyncWrapper(async (req,res) =>{
    let newtask = req.body.newtask;
        const task = await Tasks.create(newtask);
    res.status(201).json({task})
})

const gettask =asyncWrapper(
    async (req,res,next) =>{
 
        const {id:taskID} = req.params;
       const task1 = await Tasks.findOne({_id:taskID})
        if(!task1){
            return next(createCustomError(`No task with : ${taskID}` , 404))  
        }
        res.status(200).json({ task1 })   
    }
) 

    const deletetask = asyncWrapper(async (req,res) =>{
    
            const {id: taskID} = req.params;
            const task = await Task.findOneAndDelete({_id:taskID});
            res.json("Deleted Successfully")
            if(!task){
                return next(createCustomError(`No task with : ${taskID}` , 404))  
            }
     
        })
    
    const updatetask =asyncWrapper(
        async(req,res) =>{
        
            const {id:taskID} = req.params  
            const  task = await Task.findOneAndUpdate({_id:taskID},req.body,{
                new:true,
                runValidators:true,
            })
           
            if(!task){
                return next(createCustomError(`No task with : ${taskID}` , 404))  
            }
            res.status(200).json({task}) 
        }  

    )


    module.exports = {
        getalltasks,
        createtasks,
        gettask,
        updatetask,
        deletetask
    }