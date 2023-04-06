require('dotenv').config();
const express=require('express');
const cors=require('cors');
const pool=require('./db');
const {v4:uuidv4}=require('uuid');

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
});

app.post('/todos',async(req,res)=>{
   const {user_email,title,progress,data}=req.body;
   const id=uuidv4();
   try{
      const newTd=pool.query(
         'INSERT INTO todos(id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)',
         [id,user_email,title,progress,data]
      ); 
      res.json(newTd);
   }catch(err){
      console.log(err);
   }
});


app.put('/todos/:id',async(req,res)=>{
   const {params:{id},body:{user_email,title,progress,date}}=req;
   try{
      const editTd=await pool.query(
         'UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5',
         [user_email,title,progress,date,id]
      );
      res.json(editTd);
   }catch(err){
      console.log(err);
   }
});

app.delete('/todos/:id',async(req,res)=>{
   try{
     const deleteTd=await pool.query(
      'DELETE FROM todos WHERE id=$1',
      [req.params.id]
     );
     res.json(deleteTd);
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