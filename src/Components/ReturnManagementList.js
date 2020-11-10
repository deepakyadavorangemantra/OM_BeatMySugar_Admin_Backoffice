import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2, Eye} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';

class ReturnManagementList extends Component {
    constructor(props){
        super(props)
        this.state={
           OrderData:[],
           
        }

    }
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("Get_ReturnMaster_NewBackoffice").then(resultdes =>
              resultdes.json().then(obj => {
             
            //   console.log(obj.data)
              
                this.setState({
                  OrderData : obj.data
                })
  
  
                // Notiflix.Loading.Remove();
              }))



     
    }
        
     
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
         
                <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                           
                            <h4 class="mb-1 mt-0">Return Management List</h4>
                        </div>
                    </div> 

                    
                <div class="row" >
               
             
             </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                      
                                <div class="table-responsive">
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                    <th>Order No.</th>
                                       <th>Customer Name</th>
                                        {/* <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Amount</th> */}
                                        <th>Reason for Returning</th>
                                        {/* <th>Comments</th> */}
                                        {/* <th>View Product Image</th> */}
                                         <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.OrderData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                                 <td>{data.fld_ordernumber} <br/> {data.fld_orderdate}</td>
                                                 <td>{data.fld_name} <br/> {data.fld_email} <br/> {data.fld_mobile}</td>
                                 {/* <td>Footwear</td>
                                 <td>1</td>
                                 <td>500</td> */}
                                 <td>{data.fld_reasonforreturn}</td>
                                 {/* <td></td>  */}
                                 {/* <td>
                                 <button  class="btn btn-primary">View Image</button></td> */}
                                 <td 
                                 onClick={()=>{
                                     localStorage.setItem('ReturnDetail',JSON.stringify(data))
                                     window.location.href = '/viewreturndetail'
                                 }}
                                 ><Eye/></td>
                                   </tr>
                                       ))} 

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
export default ReturnManagementList;