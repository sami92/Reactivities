import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header,List ,Button} from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Activities").then(response => {
      console.log(response.data)
      setActivities(response.data)
    })
  }, [])
  return (
    <div>
      <Header  as='h2' icon='users' content='Reactivities' />
        <List>
          {
            activities.map((a:any)=>{
              return <li key={a.id}>{a.title}</li>
            })
          }
        </List>
  </div>
  );
}

export default App;
