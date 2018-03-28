import React, { Component } from 'react';
import './App.css';
import Search from './components/Search.js';
import Stock from './components/Stock.js';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

class App extends Component {
  constructor(){
    super();
      var conection;
      this.state={
        chartData:{},
        response: '',
        messages: [],
        searchResult:'',
        stocks:[],
        config:{}  
      }
    }
  
  _searchStocks(stock){
    console.log("Voy a ir a la api a buscar codigo de stock: "+stock);
    //this.makeSearch(stock).then(res=> this.setState({stock: res.express}))
    this.connection.send(JSON.stringify({action:"add",code:stock}));
  }
  _deleteStock(stock){
    console.log("Voy a ir a la api a buscar codigo de stock: "+stock);
    this.connection.send(JSON.stringify({action:"delete",code:stock}));
  }
  
  componentDidMount(){
    this.connection= new WebSocket('ws://localhost:40510');
    this.connection.onmessage=evt => {
      //console.log("Me llego: "+JSON.parse(evt.data).chartData.datasets.length);
      if(evt.data!==""){
        var db=JSON.parse(evt.data);
        console.log(db.config);
      this.setState({config: db.config, stocks: db.stocks});
      }
    
    }
   }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React nuevo</h1>
        </header>
        <Search searchStock={this._searchStocks.bind(this)} /> 
        
        <ReactHighstock config={this.state.config}/>
        <p>{this.state.searchResult}</p>
        {this.state.stocks.map((stock)=> <Stock stock={stock} key={stock} deleteStock={this._deleteStock.bind(this)}/>)}
        </div>
    );
  }
}

export default App;
