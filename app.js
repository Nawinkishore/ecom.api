import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes/index.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/status',(req,res)=>{
    return res.json({
        success: true,
        message:"server is up and running"
    });
});
app.use('/api',router);
app.listen(5000,()=>{
    console.log("server is up and running");
});