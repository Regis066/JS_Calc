const mongoose = require('mongoose')
const connectDB = (url)=>{
    return mongoose.connect(url).then(()=>console.log('CONNECTED TO DB')).catch((error)=>console.log(error))
}
module.exports = connectDB
//     useNewUrlParser: true,
//     useCreatedIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }