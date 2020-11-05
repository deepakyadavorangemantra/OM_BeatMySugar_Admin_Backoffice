import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';


class Insurance extends Component {
     constructor(props){
         super(props)
         this.state={
            InsuranceData:[],
  
             
          }
          
         }
         componentDidMount(){
             Notiflix.Loading.Init({
                 svgColor : '#507dc0'
                
               });
            
               Notiflix.Loading.Dots('');
     
               GetApiCall.getRequest("GetInsurance").then(resultdes =>
                   resultdes.json().then(obj => {
                  
                   
                     this.setState({
                        InsuranceData : obj.data
                     })
       
       
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
                                    <li class="breadcrumb-item"><a href="#">Insurance</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Insurance List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Insurance List
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
                                        <th>Name of the Insured</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>DOB</th>
                                        <th>Type Of Insurance</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                       
                                       
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.InsuranceData.map((data,index)=>(
                                           
                                           
                                       
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
                                    <td>{moment(data.fld_dob).format('ll')}</td>
                                    <td>{data.fld_type}</td>
                                    <td>{data.fld_address}</td>
                              
                               
                                  
                                   <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                        onClick={()=>{
                                        localStorage.setItem('InsuranceDetails',JSON.stringify(data))
                                        window.location.href ='/viewinsurance'
                                       }}
                                        >
                                <span  >
                                <Edit3/>
                                    </span>
                                    </div> &nbsp;&nbsp;
                                    </td>
                                        
                                       
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
export default Insurance;