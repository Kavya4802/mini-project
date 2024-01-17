
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
    verifytoken:String,
    cart: [
      {
        bikeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bike", // assuming you have a Bike model
          required: true,
        },
        quantity: {
          type: Number,
          default: 1, // default quantity is 1
        },
      },
    ],
  });
const Details=mongoose.model("Userdetails",UserSchema); 
