const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'../.env'});

const connect=async()=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://sugamf7:%40Safal12345@cluster0.acytgle.mongodb.net/pizzahub');
        console.log("connected to db"+conn.connection.host)
        console.log(process.env.EMAIL)

    }catch(error){
        console.log("error connecting to db")
        console.log(error)
        process.exit(1)
    }
}

module.exports=connect


