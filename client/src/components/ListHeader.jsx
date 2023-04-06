import Modal from "./Modal";
import { useState } from "react";

const ListHeader=({listName, getData})=>{
  const [showModal,setShowModal]=useState(null);

  const signOut=()=>{
    console.log('signOut');
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