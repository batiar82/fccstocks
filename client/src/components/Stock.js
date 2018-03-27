import React, {Component} from 'react';

class Stock extends Component{
     render(){
        const {stock} =this.props

        return(
         <div className="stock">
         
         <p>{stock}</p>
         </div>   
        );
    }
}
export default Stock;