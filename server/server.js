require('dotenv').config();
const express=require('express');
const cors=require('cors');
const pool=require('./db');

const app=express();
const PORT=process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
   origin:'http://localhost:5173'
}));
 
app.get('/todos/:userEmail',async(req,res)=>{
   const {userEmail}=req.params;
   try{
      const data=await pool.query('SELECT * FROM todos WHERE user_email=$1',[userEmail]);
      res.json(data.rows);
   }catch(err){
      console.log(err);
   }
})

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