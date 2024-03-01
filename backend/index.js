import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { UserRouter } from './routes/UserAuth.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use('/auth',UserRouter)

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('mongodb connected')
  app.listen(process.env.PORT, () => {
    console.log(' app listening on port 4000!');
  });
}).catch((err)=>{
  console.log(err);
})

