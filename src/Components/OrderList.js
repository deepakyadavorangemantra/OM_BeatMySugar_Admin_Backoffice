import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,View} from 'react-feather';


class OrderList extends Component {
     constructor(props){
         super(props)
         
        }
    
         
         
         
     
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
              <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Order Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Order List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Order List
                            </h4>
                        </div>
                    </div> 

                    <div class="row">
                   
                
                </div>
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive">  
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Customer Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Registered On</th>
                                        <th>Action</th>
                                                                          
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                    <tr>
                                        <td>C-2-2020/100024</td>
                                        <td>KANCHAN KUSHWAHA</td>
                                        <td>kanak.kush08@gmail.com</td>
                                        <td>9821651323</td>
                                        <td>March 27, 2020</td>
                                        <td><Edit3 class="tableact"/></td>
                                      
                                       
                                    </tr>
                                   
                                    </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                 </div>
            </div>
         </div>  

           </div>
        )
    }
}
export default OrderList;