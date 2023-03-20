import React, { Component } from 'react';
import {w3cwebsocket as W3CWebSocket } from "websocket"

const client = new W3CWebSocket('ws://localhost:8000');

class App extends Component {

  state = { artistQuery:'' };
  ws = new WebSocket("ws://localhost:8000");

  updateArtistQueery = event =>{
    console.log('event.target.value',event.target.value);
    this.setState ({artistQuery: event.target.value});
  }

  handleKey = event =>{
    if (event.key === "Enter"){
      this.searchArtist();
    }
  }

  searchArtist = (value) => {
    //console.log("this.state", this.state);
    client.send(JSON.stringify({
      type:'message',
      msg: value
    }));
  }
  
  componentDidMount() {
    client.onopen = () => {
      console.log("Web Socket Client Connected")
    };
    client.onmessage = (message) =>{
      const dataFromServer = JSON.parse(message.data);
      const {type, id, date} = dataFromServer
      if (id === 4){
        console.log("Json data parse from server", dataFromServer)
        this.setState({artistQuery : type})
        console.log("State", this.state)
      }
      console.log("ID", id)

    };
    
  }
  
/*    
    this.ws.onopen = () => {
      console.log("opened");
      this.ws.send("test"); // message to send on Websocket ready
    };

    this.ws.onclose = () => {
      console.log("closed");
    };

    this.ws.onmessage = (event) => {
      console.log("got message", event.data);
      this.setState({ val: event.data });
    };
    
  }

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });
*/
  render() {
    return (
      <div>
        <h2>Music Master</h2>
        <input 
          onChange={this.updateArtistQueery}
          onKeyPress ={this.handleKey} 
          placeholder= {this.state.artistQuery} 
        />
        <button onClick={() => this.searchArtist("Hello")}>Search</button>
        <p>{this.state.artistQuery}</p>
      </div>
    );
  }
}

export default App;
