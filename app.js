// Import modules
//import thing from 'thing'
import express from 'express';
import morgan from 'morgan';

// runs the server
const app = express();
const port = 4000;

//imported functions from animals.js

// Middleware
app.use(express.json());
app.use(morgan('tiny')); // logs status

// Listener
app.listen(port, function (){
    console.log(`Server is now listening on ${port}`)
});

// I'm alive console log for confirmation the server is running
app.get("/", function(req, res) {
    res.send("Hello world, I like pengiuns")
});