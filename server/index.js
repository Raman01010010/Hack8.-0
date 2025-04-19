const express=require('express')
const app=express()
const path=require('path')
const {logger}=require('./middleware/logEvents')
const errorHandler=require('./middleware/errorHandler')
const cors=require('cors')
const corsOption=require('./config/corsOptions')
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser')
const credentials = require('./middleware/credential')
const proxy = require('express-http-proxy');
const fs = require('fs');

const PORT=process.env.PORT||3500
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
//const twilio=require('./config/twillioConfig')
connectDB();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads directory');
}

app.use(logger)

// Apply CORS middleware
app.use(cors(corsOption))

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Set a higher limit for JSON payloads but don't use this for file upload routes
app.use(express.urlencoded({extended:false}))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

app.use('/user',require('./routes/user'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/chat',require('./routes/chat'))
//
app.use('/img',require('./routes/img'))
app.use('/investor_auth',require('./routes/investor_auth'))
app.use('/startups',require('./routes/startup_Routes')); // Use startup_Routes for file uploads
app.use('/startup',require('./routes/start'))
app.use('/investor',require('./routes/start'))

app.use(verifyJWT)

app.use('/service1', proxy('http://localhost:3501'));

app.all('/*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.send('404 PAGE NOT FOUND')
    }
    else if(req.accepts('json')){
        res.json({error:'404 page not found'})
    }else{
        res.type('txt').send('404 page not found')
    }
   
})

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
