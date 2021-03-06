import React, { Component } from 'react';
class Stock extends Component {
    _handleDelete(event) {
        event.preventDefault();
        console.log("Me hacen click " + this.props.stock);
        this.props.deleteStock(this.props.stock.code.toLowerCase());
    }

    render() {
        const { stock } = this.props

        return (
            <div className="stock col-md-4">
                <span onClick={this._handleDelete.bind(this)}>
                    <i className="far fa-trash-alt"></i>
                </span>
                <h2>{stock.code}</h2>
                <h4>{stock.name}</h4>
                <p>{stock.description}</p>

            </div>
        );
    }
}
export default Stock;