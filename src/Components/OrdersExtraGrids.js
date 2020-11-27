import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class OrdersExtraGrids extends Component {
 
    render() {
        return (         
<tr>
        <td>{this.props.orderDate}</td>
        <td>{this.props.orderNumber}</td>
        <td>{this.props.coustomerName}</td>
        <td>{this.props.mobileNumber}</td>
        <td>{this.props.email}</td>
       
        <td>{this.props.totalItem}</td>
        <td> &#8377;{this.props.orderValue}</td>
        <td>{this.props.orderStatus}</td>
  
</tr>    
   
        )
    }
}
export default OrdersExtraGrids