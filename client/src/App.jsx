import { useState, useEffect } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import {useCookies} from 'react-cookie'; 

const App = () => {
  const [tasks, setTasks] = useState(null);
  const [cookies,setCookie,removeCookie]=useCookies(null);
  const userEmail = cookies.email;
  const authToken=cookies.token;

  const getData = async () => {
    try {
      const resp = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await resp.json();
      setTasks(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(authToken) getData();
  }, [])

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log(sortedTasks);

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken &&
        <>
          <ListHeader
            listName={'hi'}
            getData={getData}
          />
          <p className='user-email'>Welcome back {`${cookies.email}`}</p>
          {sortedTasks?.map(task => {
            return (
              <ListItem
                key={task.id}
                task={task}
                getData={getData}
              />
            )
          })}
        </>
      }
    </div>
  )
}

export default App
