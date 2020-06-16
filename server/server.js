const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const config = require("config");

const items = require("./routes/items");
const users = require("./routes/User");
const auth = require("./routes/auth");

//BodyParser Middleware
app.use(bodyParser.json());
app.use(express.json());

db = config.get("mongoURI");

//Connect to Mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "my-app", "build", "index.html"));
  });
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log("Server is UP and Running..."));
