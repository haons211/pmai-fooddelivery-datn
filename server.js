const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

//dot env configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API</h1><p>Visit <a href='/api-docs'>API Documentation</a></p>");
});

//PORT
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`.bgMagenta.white);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`.bgCyan.white);
});
