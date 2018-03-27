import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search.js';
import Chart from './components/Chart.js';
class App extends Component {
  constructor(){
    super();
      this.state={
        chartData:{},
        response: '',
        messages: [],
        searchResult:''
      }
    }
  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    //Ajax aca//
    this.setState({
      chartData:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,                        backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
           pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
            ]
          }
    });
  }

  _searchStocks(stock){
    console.log("Voy a ir a la api a buscar codigo de stock: "+stock);
    this.makeSearch(stock).then(res=> this.setState({stock: res.express}))
  }

  mockData(){
    let chartDataCopy= Object.assign({},this.state.chartData);
    let newData=[
      {
        label: 'dfdsfsMy First dataset',
        fill: false,
        lineTension: 0.1,                        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
       pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 54, 10, 81, 56, 55, 40]
      },{
        label: 'second',
        fill: false,
        lineTension: 0.1,                        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
       pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [25,89, 40, 21, 96, 25, 10]
      }
        ];

        if(chartDataCopy.datasets!==newData)
        {
         // console.log("Distintos, actualizar");
          chartDataCopy.datasets=newData;
        this.setState({
          chartData:chartDataCopy
        });
        //changeHandler();
      }
  }

  makeSearch = async(stock)=>{
    console.log(`Stock ${stock}`);
    const response = await fetch(`/api/addStock?stock=${stock}`);
    const body=await response.json();
    if(response.status!==200)throw Error(body.message);
    console.log("Resultado de la busqueda "+body);
    this.setState({searchResult: body.message});
  };


  componentDidMount(){
    this.connection= new WebSocket('ws://localhost:40510');
    this.connection.onmessage=evt => {
      //console.log("Largo "+this.state.chartData.datasets.length);
      //var chartCopy=Object.assign({},this.state.chartData);
      //chartCopy.datasets=this.mockData();
      //console.log("Mock data "+chartCopy.datasets.length);
      this.mockData();
      this.setState({
        messages : this.state.messages.concat([evt.data]),
        //chartData: chartCopy
        //chartData.datasets : evt.data
      })
      //console.log("Nuevo state: "+this.state.chartData.datasets[1].label);
    };
    this.callApi().then(res => this.setState({response: res.express}))
  }
  callApi = async()=>{
    const response= await fetch('/api/hello');
    const body =await response.json();
    if(response.status!==200)throw Error(body.message);
    return body;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React nuevo</h1>
        </header>
        <Search searchStock={this._searchStocks.bind(this)} /> <p>{this.state.searchResult}</p>
        <Chart chartData={this.state.chartData} legendPosition='bottom'/>
        <p className="App-intro">
          {this.state.response}
        </p>
          <ul>
          {this.state.messages.slice(-5).map((msg,idx)=> <li key={'msg-'+idx}>{msg}</li>
        )}
        </ul>
       </div>
    );
  }
}

export default App;
