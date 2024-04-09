const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/database")
.then(()=>{
    console.log("connected to the database");
})
.catch(()=>{
    console.log("failed to connect");
})

const logInSchema= new mongoose.Schema({
    name: { 
        type : String , required : true },
    password : {
        type :String,required:true} 

})

const collection= new mongoose.model("server",logInSchema)

module.exports =collection;

