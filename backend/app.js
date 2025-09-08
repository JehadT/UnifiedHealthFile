require("dotenv").config();
require("express-async-errors");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

// Database
const connectDB = require("./db/connect");

// Authentication
const authenticateUser = require("./middleware/authentication");
const authenticateAdmin = require("./middleware/authenticateAdmin");

// routers
const authRouter = require("./routes/auth");
const adminAuthRouter = require("./routes/adminAuth")
const adminRouter = require("./routes/admin")
const patientRouter = require("./routes/patients");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);

// use packages
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminAuthRouter)
app.use("/api/admin/users", authenticateAdmin, adminRouter )
app.use("/api/patients", authenticateUser, patientRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
