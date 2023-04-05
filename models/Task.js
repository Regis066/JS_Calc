const { boolean } = require('joi')
const Joi = require('joi')
const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide a name'],
        trim:true,
        maxlength: [20, 'name cannot be more than 20 characters'],
        
    },
    completed:{
        type: Boolean,
        default: false
    }

})

TaskSchema.validate = (task) => {
    const schema = Joi.object({
        name: Joi.string().required().trim().max(20),
        completed: Joi.boolean()
    })
    return schema.validate(task)

}

module.exports = mongoose.model('Task',TaskSchema)