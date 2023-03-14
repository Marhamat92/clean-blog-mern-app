const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');  //we will use this to store user session
const MongoDBStore = require('connect-mongodb-session')(session); //this is used to store session in mongodb
const config = require('config');
const db = config.get('mongoURI');

const EXP_TIME = 1000 * 60 * 60 * 3; //this is the expiration time for the session in milliseconds (3 hours)

const mongoDBstore = new MongoDBStore({
  uri: db,
  collection: 'mySessions'
})

//setting up session middleware
app.use(session({
  secret: 'BtTu5fE8fr0E6EL9CGvMFMhovqtDtvI9',
  name: 'session-id',
  store: mongoDBstore,
  cookie: {
    originalMaxAge: EXP_TIME,
    sameSite: false,
    secure: false
  },
  resave: true,
  saveUninitialized: false,
}))


const loginRouter = require('./routes/api/loginRouter', { mergeParams: true });
//pass session to postRouter
const postRouter = require('./routes/api/postRouter', { mergeParams: true }, { session: session })


const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200,
  origin: true,
  credentials: true
}

// cors
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use('/api', loginRouter);
app.use('/post', postRouter);







connectDB();



const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
})