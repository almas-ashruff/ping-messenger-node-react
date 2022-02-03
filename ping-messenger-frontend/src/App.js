import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import Login from './Login/Login';
import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link 
} from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {


  const [{user}, dispatch] = useStateValue();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('c7ed33c4fe1f89673d3a', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages'); // listening to changes in messages collection using pusher
    channel.bind('inserted', (newMessages) => {
      setMessages([...messages, newMessages]); // keep all the previous messages, but also include the new ones -> using spread operator
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]); // include messages as a dependency in useEffect

  console.log(messages);


// rooms update

const [rooms, setRooms] = useState([]);

useEffect(() => {
  axios.get('/rooms/sync').then(response => {
    setRooms(response.data);
  })
}, []);


useEffect(() => {
  const pusher = new Pusher('c7ed33c4fe1f89673d3a', {
    cluster: 'ap2'
  });

  var channel = pusher.subscribe('rooms'); 
  // listening to changes in rooms collection using pusher

  channel.bind('inserted', (newRooms) => {
    setRooms([...rooms, newRooms]); 
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  }

}, [rooms]); // include rooms as a dependency in useEffect


  return (
    


    <div className="app">
      <h1 style={{fontFamily: "Marker Felt, fantasy", color: "#006400", fontWeight: "bold", fontSize: "55px",marginTop: "15px", marginBottom: "35px", letterSpacing: "10px"}} >
        ping
      </h1>
      {!user ? (
        <Login />
      ) : (
        <Router>
        <Switch>
          <div className="app_body">
            <Sidebar rooms={rooms}/>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} rooms={rooms}/>
            </Route>
          </div>    
        </Switch>
      </Router>
      )
      }
      
    </div>
  );
}

export default App;
