const mongoose=require("mongoose");
const BikesSchema=new mongoose.Schema({
    brand:{
        type:String,
    },
    model:{
        type:String
    },
    price:{
        type:Number
    },
    picture:{
        // data:Buffer,
        // contentType:String
        type:String
    }
});
module.exports=mongoose.model("Bike",BikesSchema);
// app.use(express.static(path.join(__dirname,'uploads')))
// const formData=new FormData()
//         formData.append('brand',brand)
//         formData.append('model',model)
//         formData.append('price',price)
//         formData.append('picture',picture)