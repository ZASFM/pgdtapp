require('dotenv').config();
const express=require('express');
const cors=require('cors');

const app=express();
const PORT=process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const start=()=>{
   try{
     app.listen(PORT,()=>{
      console.log(`App on port ${PORT}`);
     })
   }catch(err){
      console.log(err);
   }
}
start();