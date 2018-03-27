import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search.js';
import Chart from './components/Chart.js';
import Stock from './components/Stock.js';
import {Line} from 'react-chartjs-2'; //pruebo desde aca
class App extends Component {
  constructor(){
    super();
    var connection;
      this.state={
        chartData:{},
        response: '',
        messages: [],
        searchResult:'',
        stocks:[]
      }
    }
  componentWillMount(){
    //this.getChartData();
  }

  
  _searchStocks(stock){
    console.log("Voy a ir a la api a buscar codigo de stock: "+stock);
    this.makeSearch(stock).then(res=> this.setState({stock: res.express}))
  }
  makeSearch = async(stock)=>{
    console.log(`Stock ${stock}`);
    this.connection.send(stock);
    const response = await fetch(`/api/addStock?stock=${stock}`);
    const body=await response.json();
    if(response.status!==200)throw Error(body.message);
    console.log("Resultado de la busqueda "+body);
    this.setState({searchResult: body.message});
    if(body.chartData!=undefined){
      this.setState({chartData:body.chartData,
        stocks: body.stocks});  
      
    }
  };


  componentDidMount(){
    this.connection= new WebSocket('ws://localhost:40510');
    this.connection.onmessage=evt => {
      console.log("Me llego: "+JSON.parse(evt.data).chartData.datasets.length);
    this.setState({
      chartData: JSON.parse(evt.data).chartData,
      stocks: JSON.parse(evt.data).stocks  
    })
      //messages : this.state.messages.concat([evt.data])        })
    };
    //this.callApi().then(res => this.setState({response: res.express}))
  }
  /*callApi = async()=>{
    const response= await fetch('/api/hello');
    const body =await response.json();
    if(response.status!==200)throw Error(body.message);
    return body;
  };*/
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React nuevo</h1>
        </header>
        <Search searchStock={this._searchStocks.bind(this)} /> <p>{this.state.searchResult}</p>
        {this.state.stocks.map((stock)=> <Stock stock={stock} key={stock}/>)}
        <Line data={this.state.chartData}
          options={{
            title: {
                display: this.props.displayTitle,
                text: "This are the selected stocks",
                fontSize: 25
            },
            legend:{
                display: this.props.displayLegend,
                position: this.props.legendPosition
            }
        }

        }
        
        
        />
        <p className="App-intro">
          {this.state.response}
        </p>
          </div>
    );
  }
}

export default App;
