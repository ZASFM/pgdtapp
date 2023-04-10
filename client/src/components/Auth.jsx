import { useState } from "react";
import {useCookies} from 'react-cookie';

const Auth=()=>{
  const [error,setError]=useState()
  const [isLogin,setIsLogin]=useState(true);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [ConfirmPassword,setConfirmPassword]=useState(null);
  const [cookies,setCookie,removeCookie]=useCookies(null);
  console.log(cookies);

  const viewLogin=(status)=>{
    setError(null);
    setIsLogin(status)
  }

  const handleSubmit=async(e,endpoint)=>{
    e.preventDefault();
/*     if((!email && !password) || (!password!==ConfirmPassword)){
      setError('Valid credentials must be provided');
      return;
    } */
    try{
      const response=await fetch(`http://localhost:8000/${endpoint}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      });
      const json=await response.json();
      if(response.ok){
        setCookie('email',json.email);
        setCookie('token',json.token);
        window.location.reload();
      }
    }catch(err){
      console.log(err);
    }
  }

   return (
     <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin?'Please login':'please sign up'}</h2>
          <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          {!isLogin && <input type="password" placeholder="Confirm password" onChange={(e)=>setConfirmPassword(e.target.value)}/>}
          <input type="submit" value="Create" onClick={(e)=>handleSubmit(e,isLogin?'login':'signup')}/>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button 
             onClick={()=>setIsLogin(true)}
             style={{backgroundColor:isLogin?'rgb(255,255,255)':'rgb(188,188,188)'}}

          >Login</button>
          <button 
             onClick={()=>setIsLogin(false)}
             style={{backgroundColor:!isLogin?'rgb(255,255,255)':'rgb(188,188,188)'}}
          >Sign up</button>
        </div>
      </div>
     </div>
   )
 }
 
 export default Auth