// const express=require("express");
// const app=express();
// const dbConnection=require("./db");
// app.listen(5000,()=>{
//     console.log("server started on port 5000");
// });
const express=require("express");
const app=express();
const multer=require("multer");
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const cors=require("cors");
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
const jwt=require("jsonwebtoken");
const JWT_SECRET="whfiugfdhfe4f5d716455()*&^%$#@!hdgfsd697825"
const bcrypt=require("bcryptjs");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Kavya:Mydatabase@cluster0.ikviqqi.mongodb.net/BikesDB",{useUnifiedTopology:true,useNewUrlPArser:true}).then(()=>{
    console.log("mongodb connected");
})
.catch((error)=>{
    console.log(error);
})
require("./db");
const Details=mongoose.model("Userdetails");
app.use("/images",express.static(__dirname+"/uploads"));
app.post("/register",async(req,res)=>{
    const {name,email,pwd,no,add,city,pincode,aadhar,license}=req.body;
    var encpwd=await bcrypt.hash(pwd,10);
    try{
        const oldUser=await Details.findOne({email});
        if(oldUser){
            return res.json({error:"User exists"});
        }
       await Details.create({
        name,
        email,
        pwd:encpwd,
        no,
        add,
        city,
        pincode,
        aadhar,
        license
 });
       res.send({status:"ok"})
    }catch{
       res.send({status:"error"})
    }
});
app.post("/login",async(req,res)=>{
    const {email,pwd}=req.body;
    const user= await Details.findOne({email})
    if(!user){
       return res.json({error:"User not found"});
    }
    if(await bcrypt.compare(pwd,user.pwd)){
        const token=jwt.sign({email:user.email},JWT_SECRET);
        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }
        else{
            return res.json({error:"error"});
        }
    }
    res.json({status:"error",error:"Invalid Password"});
});
const Bike=require("./bikesdb");
// const upload=require("./middleware/multer")
/*
  1.create a unique id with Date.now()
  2.save the image with the unique id as name
  3.save the unique id in database as "picture"
  4.in front end,the card img url will be `http://localhost:5000/images/${picture}`
*/ 
const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
app.post('/addbike',upload.single('bikeImg'),async (req, res) => {
    console.log(JSON.parse(req.body.formData))
    const {brand,model,price}=JSON.parse(req.body.formData);
    try {
         const bike=await Bike.create({
             brand,
             model,
             price,
             picture:req.file.filename
         })
          res.send({ status: 'ok', bike });
      }catch (error) {
          res.send({ status: 'error' });
          console.log(error);
      }
    })  
app.listen(5000,()=>{
    console.log("server started");
})

app.get('/getbikes', async(req, res) => {
    try {
        const bikes = await Bike.find();
        res.send({ status: 'ok', bikes });
    } catch (error) {
        res.send({ status: 'error' });
        console.log(error);
    }
});
