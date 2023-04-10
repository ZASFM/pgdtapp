import Modal from "./Modal";
import { useState } from "react";
import {useCookies} from 'react-cookie';

const ListHeader=({listName, getData})=>{
  const [showModal,setShowModal]=useState(null);
  const [cookies,setCookie,removeCookie]=useCookies(null);

  const signOut=()=>{
    removeCookie('email');
    removeCookie('token');
    window.location.reload();
  }

   return (
     <div className="list-header">
       {listName}
       <div className="button-container">
         <button className="create" onClick={()=>setShowModal(true)}>New</button>
         <button onClick={signOut} className="signout">SignOut</button>
       </div>
       {showModal && <Modal 
          mode={'create'}
          setShowModal={setShowModal}
          getData={getData}
        />}
     </div>
   )
 }
 
 export default ListHeader