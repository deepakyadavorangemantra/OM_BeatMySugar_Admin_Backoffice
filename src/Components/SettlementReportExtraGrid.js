import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class SettlementReportExtraGrid extends Component {
 
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
          <td> &#8377;{this.props.BMSSplit}</td>
          <td> &#8377;{this.props.vendorSplit}</td>
        </tr>
        )
    }
}
export default SettlementReportExtraGrid