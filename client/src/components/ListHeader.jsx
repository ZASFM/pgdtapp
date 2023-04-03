const ListHeader=({listName})=>{

  const signOut=()=>{
    console.log('signOut');
  }

   return (
     <div className="list-header">
       {listName}
       <div className="button-container">
         <button className="create">New</button>
         <button onClick={signOut} className="signout">SignOut</button>
       </div>
     </div>
   )
 }
 
 export default ListHeader