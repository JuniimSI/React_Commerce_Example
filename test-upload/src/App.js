import './App.css';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      filez: '',
      cod: 0,
      pro_name: '',
      desc: '',
      price: 0
    };
  }

  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await this.convertBase64(file)
    this.setState({ filez: base64 });
    console.log(this.state.filez)
  }

  handleCod = async (event) => {
    this.setState({ cod: event.target.value });
  }

  handleName = async (event) => {
    this.setState({ pro_name: event.target.value });
  }

  handleDesc = async (event) => {
    this.setState({ desc: event.target.value });
  }

  handlePrice = async (event) => {
    this.setState({ price: event.target.value });
  }

  sent = () => {

    var data = {
      id: this.state.cod,
      product_name: this.state.pro_name,
      description: this.state.desc,
      price: this.state.price,
      img: this.state.filez
    }

    var config = {
      method: "post",
      url: "https://commerce-model.herokuapp.com/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
            console.log(error);
        });
  }


  render() {
    return (
      <>
        <div className="form-group">
          <label className="form-label">Código do Produto</label>
          <input type="text" className="form-control" name="id" id="id" onChange={e => this.handleCod(e)} />
        </div>
        <div className="form-group">
          <label className="form-label">Nome do Produto</label>
          <input type="text" className="form-control" name="product_name" id="product_name" onChange={e => this.handleName(e)} />
        </div>
        <div className="form-group">
          <label className="form-label">Descrição</label>
          <input type="text" className="form-control" name="description" id="description" onChange={e => this.handleDesc(e)} />
        </div>
        <div className="form-group">
          <label className="form-label">Price</label>
          <input type="number" step="0.01" name="price" id="price" className="form-control" onChange={e => this.handlePrice(e)} />
        </div>

        <button onClick={this.sent} >Submit</button>
        <input
          id="originalFileName"
          type="file"
          required
          label="Document"
          name="originalFileName"
          onChange={e => this.handleFileRead(e)}
          size="small"
          variant="standard"
        />
      </>
    );
  }
}
export default App;
