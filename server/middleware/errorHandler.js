const {logEvents}=require('./logEvents')
const errorHandler=(err,req,res,next)=>{
    logEvents(`${err.name} :${err.message}`,'errorlog.txt')
    console.log("Error Raman")
    console.error(err.stack)
    res.status(500).send(err.message)
}
module.exports=errorHandler
