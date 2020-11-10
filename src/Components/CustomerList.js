import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,Monitor, Eye} from 'react-feather';
import GetApiCall from '../GetApi';
import Notiflix from "notiflix";
import moment from 'moment';


class CustomerList extends Component {
    constructor(props){
        super(props)
           this.state={
            CustomerData:[]
            }
    
        }
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetUserInfoData").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                //   console.log(obj.data)
                    this.setState({
                        CustomerData: obj.data
                    })
      
      
                    Notiflix.Loading.Remove();
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
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Customer Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Customer List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Customer List
                            </h4>
                        </div>
                    </div> 

                    <div class="row">
                   {/* <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                       <a href='/addfootwear'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Footwear Item</button>
                                  
                                       </a>
                                                                       </div>
                                </div>
                            </div>
                        </div> 
                     </div>*/}
                
                </div>
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive">
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Gender</th>
                                        <th>Date of Birth</th>
                                        <th style={{display:'block!important'}}>Registered On</th>
                                        <th>Action</th> 
                                       
                                       
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                        {this.state.CustomerData.length == 0 ? 
                                        <tr><td colSpan={6} style={{textAlign:'center'}}>No Customers Available</td></tr> : 
                                        ''} 
                                        {this.state.CustomerData.map((data,index)=>(
                                                
                                                
                                            
                                            <tr key={index}>
                                                        { index == 0 ?
                                                <Helmet>
                                            
                                        <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                        <script src="/assets/js/pages/datatables.init.js"></script>
                                        <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>

                                        </Helmet> : ''}
                                            <td>{data.fld_name}</td>
                                            <td>{data.fld_email}</td>
                                            <td>{data.fld_mobile}</td>
                                            <td>{data.fld_gender}</td>
                                        <td>{moment(data.fld_dob).format('ll')}</td>
                                        <td>{moment(data.fld_updatedon).format('ll')}</td>
                                        <td><Eye
                                        onClick={()=>{
                                    
                                            localStorage.setItem('CustomersDetails',JSON.stringify(data))
                                            window.location.href ='/viewcustomers'
                                        }}
                                        /></td>

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
export default CustomerList;