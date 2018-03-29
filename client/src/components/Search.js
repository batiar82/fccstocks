import React, { Component } from 'react';

class Search extends Component {

    _handleSubmit(event) {
        event.preventDefault();
        let stock = this._stock;
        this.props.searchStock(stock.value);
    }


    render() {
        return (
            <div className="stock col-md-4">
                <h4>Search a stock by it's code:</h4>
                <form className="form-inline" onSubmit={this._handleSubmit.bind(this)}>
                    <input className="form-control mb-2 mr-sm-2 mb-sm-0" type="text" name="stock-search" placeholder="Type a stock code" ref={(input) => this._stock = input} required></input>
                    <button type="submit" className="btn btn-primary">Search</button>
                    <p>{this.props.message.description}</p>
                </form>
        </div>


                );
            }
        }
export default Search;