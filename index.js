const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); 

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://raghv:639336@cluster0.6dbfk.mongodb.net/regDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const regSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})
regSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ id: this._id.toString() }, "mynameisvinodbahadurthapayoutuber");
    console.log(token);

    this.tokens = this.tokens.concat({ token: token });
    await this.save();  

    return token;  
  } catch (error) {
    console.log("Error generating auth token:", error);
    throw new Error("Error generating auth token");
  }
};

const Register = mongoose.model("Register", regSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const exists = await Register.findOne({ email: email });
    if (!exists) {
      const regData = new Register({
        name,
        email,
        password,
      });
      
      const token = await regData.generateAuthToken();
      
      await regData.save();  
      res.redirect("/success");
    } else {
      console.log("User already exists");
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

// Success/Error routes
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/pages/success.html");
});

app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/pages/error.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});


const createToken = async () => {
  const token = await jwt.sign({ id: 123 }, "secretKey", { expiresIn: "5 seconds" });
  console.log(token);
  const verify = await jwt.verify(token, "secretKey");
  console.log(verify);
};

createToken();

// Start the server
app.listen(port, () => {
  console.log('Server running on port', port);
});
