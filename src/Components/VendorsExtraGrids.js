import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class VendorsExtraGrids extends Component {
 
    render() {
        return (<tr>
          <td>{this.props.customerOrderDate}</td>
          <td>{this.props.customerOrderNumber}</td>
          <td>{this.props.customerName}</td>
          <td>{this.props.vendorName}</td>
          <td>{this.props.vendorOrderDate}</td>
          <td>{this.props.vendorOrderNumber}</td>
          <td>{this.props.totalItems}</td>
          <td> &#8377;{this.props.totalAmount}</td>
         
        </tr>
        )
    }
}
export default VendorsExtraGrids