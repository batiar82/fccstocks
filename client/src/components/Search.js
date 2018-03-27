import React, {Component} from 'react';

class Search extends Component{

    _handleSubmit(event){
        event.preventDefault();
        let stock=this._stock;
        this.props.searchStock(stock.value);
    }


    render(){
        return(
        <div className="search">
            <form onSubmit={this._handleSubmit.bind(this)}>
            <input type="text" name="stock-search" placeholder="Type a stock code" ref={(input) => this._stock=input}></input>
            <button type="submit" className="btn btn-success">Search</button>
            </form>
        </div>
        );
    }
}
export default Search;