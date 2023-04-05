const getAllProductsStatic = async(req,res)=>{
    res.status(200).json({msg:'Products testing route'})
}
const getAllProducts = async () =>{
    res.status(200).json({msg:'Products route'})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}