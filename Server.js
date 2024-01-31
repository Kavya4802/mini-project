// const express=require("express");
// const app=express();
// const dbConnection=require("./db");
// app.listen(5000,()=>{
//     console.log("server started on port 5000");
// });
const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const shortid = require("shortid");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const jwt = require("jsonwebtoken");
const JWT_SECRET = "whfiugfdhfe4f5d716455()*&^%$#@!hdgfsd697825";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Kavya:Mydatabase@cluster0.ikviqqi.mongodb.net/BikesDB",
    { useUnifiedTopology: true, useNewUrlPArser: true }
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });
require("./db");
const razorpay = new Razorpay({
  key_id: "rzp_test_6YWgCz8B9XBA7M",
  key_secret: "OC5PdOulwyIg6WtWY1tLARGe",
});
const fetchBikeDetails = async (bikeId) => {
  try {
    const bikeDetails = await Bike.findById(bikeId); // Assuming you are using mongoose

    // Handle the case where the bike is not found
    if (!bikeDetails) {
      return null;
    }

    // Return the bike details
    return {
      price: bikeDetails.price,
      // Add other bike details as needed
    };
  } catch (error) {
    console.error('Error fetching bike details:', error);
    throw error; // Throw the error to be caught in the calling function
  }
};
app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const bikeId = req.body.bikeId; // Assuming you receive bikeId from the frontend

  try {
    // Fetch bike details using bikeId
    const bikeDetails = await fetchBikeDetails(bikeId);

    if (!bikeDetails) {
      res.status(404).json({ error: "Bike not found" });
      return;
    }

    const options = {
      amount: req.body.totalPrice * 100, // Set the amount based on the bike price
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture,
    };

    const response = await razorpay.orders.create(options);
    console.log(response);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const TransactionDB = require('./transactiondb');
const moment = require('moment');
app.post('/save-transaction', async (req, res) => {
  console.log("hellooooooooooooo");
  try {
    const { orderId, paymentId, userName,userEmail,amount,phoneNumber,startDate,endDate,bikeId,bikeName } = req.body;
    // console.log(orderId);
    // console.log(paymentId);
    const transaction = new TransactionDB({
      orderId,
      paymentId,
      userName,
      userEmail,
      amount,
      phoneNumber,
      startDate: moment(startDate).format("DD/MM/YY LT"),
      endDate: moment(endDate).format("DD/MM/YY LT"),
      bikeId,
      bikeName
    });

    const savedTransaction = await transaction.save();
    // console.log('Transaction saved:', savedTransaction);

    res.json({ success: true, message: 'Transaction saved successfully.' });
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.get('/get-orders/:userEmail', async (req, res) => {
  try {
    
    const userEmail = req.params.userEmail; 
    const orders = await TransactionDB.find({ userEmail }).exec();
    res.status(200).json({ status: 'ok', orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await TransactionDB.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const Details = mongoose.model("Userdetails");
app.use("/images", express.static(__dirname + "/uploads"));

app.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  
  const { name, email, pwd, no, add, city, pincode } = req.body;
  var encpwd = await bcrypt.hash(pwd, 10);

  try {
      
      if (!name.match(/^[a-zA-Z]+$/)) {
          return res.status(400).json({ status: "error", message: "Name must contain only letters" });
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return res.status(400).json({ status: "error", field: "email", message: "Please enter a valid email address" });
      }

      if (!pwd.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/)) {
          console.log("Password validation failed");
          return res.status(400).json({ status: "error", message: "Please enter a valid password" });
      }

      if (pwd.length < 8) {
          console.log("Password length validation failed");
          return res.status(400).json({ status: "error", message: "Password must be at least 8 characters long" });
      }

      if (!no.match(/^[0-9\b]+$/)) {
          console.log("Phone number validation failed");
          return res.status(400).json({ status: "error", message: "Please enter a valid phone number" });
      }

      if (no.length !== 10) {
          console.log("Phone number length validation failed");
          return res.status(400).json({ status: "error", message: "Phone number must be 10 digits long" });
      }

      if (!city.match(/^[a-zA-Z]+$/)) {
          return res.status(400).json({ status: "error", message: "City must contain only letters" });
      }

      if (!pincode.match(/^\d{6}$/)) {
          return res.status(400).json({ status: "error", message: "Pin code must be 6 digits long" });
      }

      console.log("Validation successful. Registering user...");

      const oldUser = await Details.findOne({ email });
      if (oldUser) {
          return res.status(400).json({ status: "error", message: "User with this email already exists" });
      }

      await Details.create({
          name,
          email,
          pwd: encpwd,
          no,
          add,
          city,
          pincode,
      });

      console.log("User registered successfully.");

      res.json({ status: "ok" });
  } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.message || "Internal Server Error";
      res.status(500).json({ status: "error", message: errorMessage });
  }
});
app.post("/login", async (req, res) => {
  const { email, pwd } = req.body;
  const user = await Details.findOne({ email });

  if (!user) {
    return res.json({ error: "User not found" });
  }

  if (await bcrypt.compare(pwd, user.pwd)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    // Check if the user has admin privileges based on certain criteria
    const isAdmin = checkAdminCriteria(user);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token, role: isAdmin ? "admin" : "user" });
    } else {
      return res.json({ error: "error" });
    }
  }

  res.json({ status: "error", error: "Invalid Password" });
});


function checkAdminCriteria(user) {
  // Implement your criteria for identifying admin users
  // For example, you might check if the email is associated with an admin account
  return user.email === "satwikatyam@gmail.com";
}


const Bike = require("./bikesdb");
// const upload=require("./middleware/multer")
/*
  1.create a unique id with Date.now()
  2.save the image with the unique id as name
  3.save the unique id in database as "picture"
  4.in front end,the card img url will be `http://localhost:5000/images/${picture}`
*/
const DIR = "./uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
app.post("/addbike", upload.single("bikeImg"), async (req, res) => {
  console.log(JSON.parse(req.body.formData));
  const { brand, model, price, status } = JSON.parse(req.body.formData);
  try {
    const bike = await Bike.create({
      brand,
      model,
      price,
      status,
      picture: req.file.filename,
    });
    res.send({ status: "ok", bike });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});
app.listen(5000, () => {
  console.log("server started");
});
app.get("/getbikes", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.send({ status: "ok", bikes });
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});
app.get("/getusers", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Details.findOne({ email: decoded.email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.json({ status: "ok", user: { name: user.name, email: user.email, no: user.no, id: user._id} });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
    console.error(error);
  }
});
app.get("/bikes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bikeData = await Bike.findById(id);
    res.send(bikeData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving bike data");
  }
});
app.put("/bikesinfo/:id", upload.single('picture'), async (req, res) => {
  const id = req.params.id;
  try {
    // Find the existing bike
    const existingBike = await Bike.findById(id);

    // Construct the update object with only the fields that are provided in the request
    const updateFields = {};
    if (req.body.brand) {
      updateFields.brand = req.body.brand;
    }
    if (req.body.model) {
      updateFields.model = req.body.model;
    }
    if (req.body.price) {
      updateFields.price = req.body.price;
    }
    if (req.file) {
      updateFields.picture = req.file.buffer; // Update picture only if a new file is provided
    }

    // Merge the existing bike data with the updateFields
    const updatedBike = { ...existingBike._doc, ...updateFields };

    // Perform the update
    const updatedData = await Bike.findByIdAndUpdate(id, updatedBike, { new: true });

    if (!updatedData) {
      res.status(404).send({
        message: `Cannot update bike with id ${id}. Maybe bike not found`,
      });
    } else {
      res.send(updatedData);
    }
  } catch (error) {
    console.error("Error updating bike:", error);
    res.status(500).send({ message: "Error updating bike information" });
  }
});

app.delete("/bikesinfo/:id", (req, res) => {
  const id = req.params.id;
  Bike.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot delete bike with ${id}. Maybe bike not found`,
          });
      } else {
        res.send({ status: "ok", message: "Bike deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting bike" });
    });
});
// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ status: "error", message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Store the entire decoded user object in the request
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error.name, error.message);

//     if (error instanceof jwt.TokenExpiredError) {
//       return res.status(401).json({ status: "error", message: "Token expired" });
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ status: "error", message: "Invalid token" });
//     }

//     // Handle other errors
//     res.status(500).json({ status: "error", message: "Internal Server Error" });
//   }
// };
app.post("/addtocart/:bikeId/:userEmail", async (req, res) => {
  const bikeId = req.params.bikeId;
  const userEmail = req.params.userEmail;

  try {
    // Find the user by email
    const user = await Details.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Check if the bike is already in the cart
    const index = user.cart.findIndex(cartItem => cartItem.bikeId.toString() === bikeId);

    if (index !== -1) {
      // If the bike is already in the cart, update the quantity
      user.cart[index].quantity += 1;
      console.log(`Quantity of ${bikeId}: ${user.cart[index].quantity}`);
    } else {
      // If the bike is not in the cart, add it with quantity 1
      user.cart.push({ bikeId, quantity: 1 });
    }

    // Save the updated user document
    await user.save();

    // Send a success response
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});

app.get("/getcartcount/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail; // Assuming you have a user ID in the JWT payload

  try {
    // Find the user by ID
    const user = await Details.findOne({ email: userEmail });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    const cartCount = user.cart.length;
    res.status(200).json({ status: "ok", cartCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});

app.get("/get-cart-items/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    const user = await Details.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const cartItems = await Promise.all(
      user.cart.map(async (cartItem) => {
        try {
          // Fetch details for each bike
          const bikeDetails = await Bike.findById(cartItem.bikeId);

          if (!bikeDetails) {
            // Handle the case where the bike details are not found
            console.error(`Bike details not found for id: ${cartItem.bikeId}`);
            return null;
          }

          return {
            bikeId: bikeDetails._id,
            bikeName: bikeDetails.brand,
            bikePicture: bikeDetails.picture,
            bikePrice: bikeDetails.price,
            quantity: cartItem.quantity,
            // Add other properties as needed
          };
        } catch (error) {
          console.error(`Error fetching bike details for id ${cartItem.bikeId}: ${error}`);
          return null;
        }
      })
    );

    // Filter out any null values (where bike details were not found)
    const validCartItems = cartItems.filter((item) => item !== null);

    res.status(200).json({ status: "ok", cartItems: validCartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});
app.post("/handleadd/:bikeId/:userEmail", async (req, res) => {
  const bikeId = req.params.bikeId;
  const userEmail = req.params.userEmail;

  try {
    const user = await Details.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const index = user.cart.findIndex(cartItem => cartItem.bikeId.toString() === bikeId);
      // Increment the quantity
      if (index !== -1) {
        // If the bike is already in the cart, update the quantity
        user.cart[index].quantity += 1;
      }

    // Save the updated user document
    await user.save();

    // Send a success response
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});
app.post("/handlesubtract/:bikeId/:userEmail", async (req, res) => {
  const bikeId = req.params.bikeId;
  const userEmail = req.params.userEmail;

  try {
    const user = await Details.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isBikeInCartIndex = user.cart.findIndex(
      (cartItem) => cartItem.bikeId.toString() === bikeId.toString()
    );

    if (isBikeInCartIndex !== -1) {
      // Decrement the quantity if it's greater than 0
      if (user.cart[isBikeInCartIndex].quantity > 0) {
        user.cart[isBikeInCartIndex].quantity -= 1;

        // Remove the item from the cart if the quantity becomes 0
        if (user.cart[isBikeInCartIndex].quantity === 0) {
          user.cart.splice(isBikeInCartIndex, 1);
        }
      }
    }

    // Save the updated user document
    await user.save();

    // Send a success response
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});
// Assuming you have a route for handling item deletion, you can add it like this:

// Add a new route for item deletion
app.delete("/remove-item/:bikeId/:userEmail", async (req, res) => {
  const bikeId = req.params.bikeId;
  const userEmail = req.params.userEmail;

  try {
    // Update the user's cart by pulling the specified bikeId
    const result = await Details.updateOne(
      { email: userEmail },
      { $pull: { cart: { bikeId: bikeId } } }
    );

    // Check if the update was successful
    if (result.nModified === 0) {
      return res.status(404).json({ status: "error", message: "Bike not found in the cart" });
    }

    // Send a success response
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});
app.get("/getusers", async (req, res) => {
  try {
    const users = await Details.find({}, { name: 1, email: 1, no: 1, add: 1, city: 1, pincode: 1 });
    res.json({ status: 'ok', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error fetching user details' });
  }
});
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'satwikatyam@gmail.com',
    pass: 'tpetuiptgpjuqbkz'
  }
});

app.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body)
  const { email } = req.body;


  if (!email) {
    return res.status(401).json({ status: 401, message: "Enter your email" });
  }

  try {
    const userfind = await Details.findOne({ email: email });

    if (!userfind) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }
    const tokens = jwt.sign({ _id: userfind._id }, JWT_SECRET, {
      expiresIn: '120s'
    });
    const setusertoken = await Details.findByIdAndUpdate({_id:userfind._id},{verifytoken:tokens},{new:true});
    
    if(setusertoken){
      const mailOptions = {
          from:"satwikatyam@gmail.com",
          to:email,
          subject:"sending email for password reset",
          text:`This Link is valid for 2 minutes http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
      }
      transporter.sendMail(mailOptions,(error,info) => {
          if(error){
              console.log("error",error);
              res.status(401).json({status:401,message:'email not send'})
          }else{
              console.log("Email sent",info.response)
              res.status(201).json({status:201,message:'email sent '})

          }
      })
    }

      
  }catch(error){
      res.status(401).json({status:401,message:'email not send'})
  }
})

app.get("/forgotpassword/:id/:tokens", async(req,res)=>{
  const {id,tokens} = req.params;
      try{
          const validUser = await Details.findOne({_id:id,verifytoken:tokens})
          
          const verifyToken = jwt.verify(tokens,JWT_SECRET);

          

          if(validUser && verifyToken._id){
              res.status(201).json({status:201,validUser})
          }else{
              res.status(401).json({status:401,message:"user not exist"})
          }

      }catch(error){
          res.status(401).json({status:401,error})

      }
})
app.post("/resetpassword/:id/:tokens",async(req,res) =>{
  const {id,tokens} = req.params;

  const {password} = req.body;
  try{
      const validUser = await Details.findOne({_id:id,verifytoken:tokens})
          
          const verifyToken = jwt.verify(tokens,JWT_SECRET);

          if(validUser && verifyToken._id){
              const newpassword = await bcrypt.hash(password,12)

              const setnewuserpass = await Details.findByIdAndUpdate({_id:id},{pwd:newpassword});

              setnewuserpass.save();
              res.status(201).json({status:201,setnewuserpass})

          }else{
              res.status(401).json({status:401,message:"user not exist"})
          }



  }catch(error){
      res.status(401).json({status:401,error})

  }

})

