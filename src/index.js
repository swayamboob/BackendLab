require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const { UserRoutes } = require("./routes/UserRoutes");
const { ProjectRouter } = require("./routes/ProjectRoutes");
const authenticate = require("./Middleware/Authentication.Middleware");

const PORT = process.env.PORT || 8080;
const URL = process.env.URL;

const app = express();

// app.use(
//   cors({origin: true, credentials: true})
// );
app.use(cors({
  origin: '*', // Allow all origins (for development)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/project', ProjectRouter);

const mongoConnect = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    () => {
      console.log("Connected to MongoDB");
    }
  ).catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });
};

app.listen(PORT, async () => {
  await mongoConnect();
  console.log(`Server running at http://localhost:${PORT}`);
});
