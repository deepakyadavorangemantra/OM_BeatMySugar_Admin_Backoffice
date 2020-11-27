import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class CustomersExtraGrids extends Component {
 
    render() {
        return (
<tr>
        <td>{this.props.customerName}</td>
        <td>{this.props.registrationDate}</td>
        <td>{this.props.mobileNum}</td>
        <td>{this.props.email}</td>
        <td>{this.props.dob}</td>
        <td>{this.props.orderedPlaced}</td>
        <td>{this.props.itemOnCart}</td>
        <td>{this.props.totalSales?this.props.totalSales:0}</td>
 
</tr>
          
        )
    }
}
export default CustomersExtraGrids