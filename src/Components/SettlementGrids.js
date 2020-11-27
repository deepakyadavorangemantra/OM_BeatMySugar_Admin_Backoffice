import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class SettlementGrids extends Component {
 
    render() {
        return (
          <div>
  <table class="table">
            <thead>
              <tr>
                  <td></td>
                  <td></td>  
                  <td style={{textAlign:'center'}} colspan="4"> <h3 className='d-flex justify-content-center bg-light '> Vendor Reports</h3></td>
                  
                  <td></td>
                  <td></td>
                  
              
              </tr>
            </thead>
            <tbody>
              <tr>
              <th scope="row"><b>Total Orders</b></th>
                <td>{this.props.totalOrders}</td>

                <td></td>
                <th scope="row"><b>Total Items</b></th>
        <td>{this.props.totalItems}</td>
                <td></td> 
                <th scope="row"><b>Total Order Value</b></th>
        <td> &#8377;{this.props.totalOrderValue.toFixed(2)}</td>
               
                 
               
                 
              </tr>
              <tr>
                <th scope="row"><b>Report Data From </b></th>
                <td>{this.props.fromDate}</td>
                <td></td>
                <th scope="row"><b>To</b></th>
                <td>{this.props.endDate}</td>
               <td></td>
                <th scope="row"><b>Order Status</b></th>
                <td>Placed</td>
                
                 
              </tr>
            
            </tbody>
          </table>
      
 <br />
 <table>
   <tbody>
  

   </tbody>

 </table>
          </div>
          
          
        )
    }
}
export default SettlementGrids