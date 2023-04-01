// const mongoose=require("mongoose");
// mongoose.connect("mongodb+srv://Kavya:Mydatabase@cluster0.ikviqqi.mongodb.net/BikesDB",{useUnifiedTopology:true,useNewUrlPArser:true}).then(()=>{
//     console.log("mongodb connected");
//     })
// .catch(()=>{
//     console.log("error connecting mongodb");
//     })
// module.exports=mongoose;
const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    no:Number,
    pwd:String,
    add:String,
    city:String,
    pincode:Number,
    aadhar:Buffer,
    license:Buffer
});
const Details=mongoose.model("Userdetails",UserSchema);
