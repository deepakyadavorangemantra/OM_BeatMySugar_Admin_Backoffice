import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class CustomersGrids extends Component {
 
    render() {
        return (
            <table class="table">
            <thead>
              <tr>
               <td></td>
               
               <td style={{textAlign:'center'}} colspan="3"> <h3 className='d-flex justify-content-center bg-light '> Customer Reports</h3></td>

              
              <td></td>
              <td></td>
              </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row"><b>Report Data From </b></th>
        <td>{this.props.fromDate}</td>
               
                
                <th colSpan='3' scope="row"><b>To</b></th>
                <td>{this.props.endDate}</td>
                
                
                
                
                 
              </tr>
            </tbody>
          </table>
        )
    }
}
export default CustomersGrids