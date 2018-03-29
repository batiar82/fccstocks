import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Stock from './components/Stock.js';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

class App extends Component {
  constructor() {
    super();
    var conection;
    this.state = {
      chartData: {},
      response: '',
      messages: [],
      searchResult: '',
      stocks: [],
      config: {}
    }
  }

  _searchStocks(stock) {
    console.log("Voy a ir a la api a buscar codigo de stock: " + stock);
    //this.makeSearch(stock).then(res=> this.setState({stock: res.express}))
    this.setState({ messages: [] });
    this.connection.send(JSON.stringify({ action: "add", code: stock }));
  }
  _deleteStock(stock) {
    console.log("Voy a ir a la api a buscar codigo de stock: " + stock);
    this.setState({ messages: [] });
    this.connection.send(JSON.stringify({ action: "delete", code: stock }));
  }

  componentDidMount() {
    //var HOST = location.origin.replace(/^http/, 'ws');
    //this.connection = new WebSocket('wss://boiling-caverns-37208.herokuapp.com');
    this.connection = new WebSocket('ws://localhost:5000');
    this.connection.onmessage = evt => {
      //console.log("Me llego: "+JSON.parse(evt.data).chartData.datasets.length);
      if (evt.data !== "") {
        var db = JSON.parse(evt.data);
        console.log(db.config);
        if (db.config.message) {
          this.setState({ messages: db.config.message });
          this.setState({ config: db.config, stocks: db.stocks });

        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <ReactHighstock config={this.state.config} />
          <div className="row stocks">
          <Search searchStock={this._searchStocks.bind(this)} message={this.state.messages} />          
          {this.state.stocks.map((stock) => <Stock stock={stock} key={stock.code} deleteStock={this._deleteStock.bind(this)} />)}
          
          </div>

        </div>
        <footer>
          <p>Designed for FreeCodeCamp</p>
        </footer>
      </div>
    );
  }
}

export default App;
