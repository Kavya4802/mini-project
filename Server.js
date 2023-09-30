// const express=require("express");
// const app=express();
// const dbConnection=require("./db");
// app.listen(5000,()=>{
//     console.log("server started on port 5000");
// });
const express=require("express");
const Razorpay=require('razorpay');
const app=express();
const shortid=require('shortid');
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
const razorpay = new Razorpay({ 
    key_id:"rzp_test_6YWgCz8B9XBA7M" , 
    key_secret: "OC5PdOulwyIg6WtWY1tLARGe" 
})
app.post("/razorpay",async(req,res)=>{
    const payment_capture=1
    var options = {
        amount: 1000*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt:shortid.generate(),
        payment_capture
      };
     try{
        const response=await razorpay.orders.create(options)
        console.log(response);
        res.json({
            id:response.id,
            currency:response.currency,
            amount:response.amount
        })
     }catch(error){
        console.log(error)
     }
})
const Details=mongoose.model("Userdetails");
app.use("/images",express.static(__dirname+"/uploads"));
app.post("/register",async(req,res)=>{
    const {name,email,pwd,no,add,city,pincode}=req.body;
    var encpwd=await bcrypt.hash(pwd,10);
    try{
        const oldUser=await Details.findOne({email});
        if(oldUser){
            window.alert("User exists");
            return res.json({error:"User exists"});
        }
       await Details.create({
        name,
        email,
        pwd:encpwd,
        no,
        add,
        city,
        pincode
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
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
app.post('/addbike',upload.single('bikeImg'),async (req, res) => {
    console.log(JSON.parse(req.body.formData))
    const {brand,model,price,status}=JSON.parse(req.body.formData);
    try {
         const bike=await Bike.create({
             brand,
             model,
             price,
             status,
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
app.get('/bikes/:id', async (req, res) => {
    const  id  = req.params.id;
    try {
      const bikeData = await Bike.findById(id);
      res.send(bikeData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving bike data');
    }
  });
app.put("/bikesinfo/:id",(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update cannot be empty"})
    }
    console.log(req.body);
    const id=req.params.id;
    Bike.findByIdAndUpdate(id,req.body,{new:true})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot update user with ${id}.Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error update user information"});
    })
    
    })
    app.delete('/bikesinfo/:id', (req, res) => {
        const id = req.params.id;
        Bike.findByIdAndDelete(id)
        .then(data => {
          if (!data) {
            res.status(404).send({message:`Cannot delete bike with ${id}. Maybe bike not found`});
          } else {
            res.send({status: 'ok', message: 'Bike deleted successfully'});
          }
        })
        .catch(err => {
          res.status(500).send({message:"Error deleting bike"});
        })
      })
      
// app.delete("/bikesinfo/:id",(req,res)=>{
//     const id=req.params.id;
//     Bike.findByIdAndDelete(id)
//     .then(data=>{
//         if(!data){
//             res.status(404).send({message:`cannot delete with id ${id}.Mayebe id is wrong`})
//         }else{
//             res.send({
//                 message:"User was deleted succesfully!"
//             })
//         }
//     })
//     .catch(err=>{
//         res.status(500).send({
//             message:"Could not delete user with id ="+id
//         });
//     });
// })