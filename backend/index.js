import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port 4000!');
});