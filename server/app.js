const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');
const colors = require('colors');

require('dotenv').config();


//connect db
connectDB();


const loginRouter = require('./routes/loginRoutes');
const postRouter = require('./routes/postRoutes')


const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200,
  origin: true,
  credentials: true
}

// cors
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use('/api/users', loginRouter);
app.use('/post', postRouter)
app.use(errorHandler); //error handler middleware to override the default express error handler




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.cyan.underline.bold);
})