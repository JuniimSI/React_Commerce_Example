import React, { Component } from 'react';
import './App.css';
import Header from "./components/header";
import MainContent from "./components/mainContent";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    response: '',
    
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    
  }

  callApi = async () => {
    const response = await fetch('/api/mensagem');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <>
        <div className="container">
          <Header />
          <p className="App-intro">{this.state.response}</p>
          <MainContent />
          <Footer />
        </div>
        
          
      </>
    );
  }
}

export default App;