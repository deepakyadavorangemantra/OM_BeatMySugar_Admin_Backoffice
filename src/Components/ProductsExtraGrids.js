import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class ProductsExtraGrids extends Component {
 
    render() {
        return (
          <tr>
          <td>{this.props.itemSku?this.props.itemSku:0}</td>
          <td>{this.props.itemName?this.props.itemName:0}</td>
          <td>{this.props.vendorName?this.props.vendorName:''}</td>
        <td>{this.props.MRP?this.props.MRP:0}</td>
        <td>{this.props.discountedPrice?this.props.discountedPrice:0}</td>
        <td>{this.props.discountedPersent?this.props.discountedPersent:0}</td>
          
        <td>{this.props.NoofItemsOrdered?this.props.NoofItemsOrdered:0}</td>
        <td>{this.props.totalSalesDone?this.props.totalSalesDone:0}</td>
        </tr>
        )
    }
}
export default ProductsExtraGrids