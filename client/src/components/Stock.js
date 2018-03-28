import React, {Component} from 'react';

class Stock extends Component{
     _handleDelete(event){
        event.preventDefault();
        this.props.deleteStock(this.props.stock); 
     }
     
     render(){
        const {stock} =this.props

        return(
         <div className="stock">
         
         <p>{stock}</p>
         <button type="submit" onClick={this._handleDelete.bind(this)} className="btn btn-danger">Delete</button>
         </div>   
        );
    }
}
export default Stock;