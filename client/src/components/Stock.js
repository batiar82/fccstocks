import React, {Component} from 'react';
class Stock extends Component{
     _handleDelete(event){
        event.preventDefault();
        this.props.deleteStock(this.props.stock.code); 
     }
     
     render(){
        const {stock} =this.props

        return(
            <div className="stock col-md-4">
	            <i className="far fa-trash-alt" onClick={this._handleDelete.bind(this)}></i>
	            <h2>{stock.code}</h2>
				<h4>{stock.name}</h4>
                <p>{stock.description}</p>
            </div>
        );
    }
}
export default Stock;