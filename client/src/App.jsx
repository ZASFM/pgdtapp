import { useState, useEffect } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';

const App=()=>{
  const [tasks,setTasks]=useState(null);
  const userEmail='shafi.bahrami.2015@gmail.com';

  const fetchData=async()=>{
    try{
       const resp=await fetch(`http://localhost:8000/todos/${userEmail}`);
       const json=await resp.json();
       setTasks(json);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  const sortedTasks=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date));
  console.log(sortedTasks);

  return (
    <div className='app'>
      <ListHeader
         listName={'hi'}
      />
      {sortedTasks?.map(task=>{
        return (
          <ListItem
             key={task.id}
             task={task}
          />
        )
      })}
    </div>
  )
}

export default App
