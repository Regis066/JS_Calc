const login = async (req,res) =>{
    res.send('Fake Login/Register/Signup')
}
const dashboard = async (req,res)=>{
    const luckynum = Math.floor(Math.random()*100)
    res.send(`User created with the luckynumber of ${luckynum}`)
}
module.exports ={login,dashboard} 