const express = require('express');
const app = express();
const port = 5000;

app.get('/addition', (req,res)=>{
    const numbers = req.query.numbers; 
    if(!numbers || !numbers.length){
        return res.sendStatus(400).send({error: "the query numbers requred"});
    }
    const numbersarray = numbers.split(',').map(num => parseInt(num));
    const sum = numbersarray.reduce((acc,cur) => acc + cur ,0);
    res.send({sum});
});
app.get('/multiplication', (req,res)=>{
    const numbers = req.query.numbers; 
    if(!numbers || !numbers.length){
        res.status(400).send({error: "the query numbers requred"});
    }
    const numbersarray = numbers.split(',').map(num => parseInt(num));
    const multiplication = numbersarray.reduce((acc,cur) => acc * cur ,0);
    res.send({multiplication});
})
app.listen(port , () =>{
    console.log(`calc app is runnning on port ${port}`);
})
