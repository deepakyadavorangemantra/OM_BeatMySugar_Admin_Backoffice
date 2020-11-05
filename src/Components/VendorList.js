import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';


class VendorList extends Component {
    constructor(props){
        super(props)
        this.state={
           VendorData:[],
           AddAccess : false
        }

    }
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetVendorList").then(resultdes =>
              resultdes.json().then(obj => {
             
              
                this.setState({
                  VendorData : obj.data
                })
  
  
              }))

              var login=localStorage.getItem('LoginDetail');
              var details=JSON.parse(login)
      
              PostApiCall.postRequest({
        
                  staffid : details[0].fld_staffid,
              
                },"GetUserSubMenuAccessRights").then((resultssub) => 
                
                  resultssub.json().then(objsub => {  
                  if(resultssub.status == 200 || resultssub.status==201){
      
                 var filteredRights = objsub.data;
              
                      var con = 0
                      for(var i = 0 ; i< filteredRights.length ;i++){
         
                          if(filteredRights[i].fld_menuname == 'Add Vendors'){
              
                            if(filteredRights[i].fld_access == 1){
                    
                             this.setState({
                               AddAccess : true
                             })
                            }
                          }
                         
                        con = con + 1
                        if(con == filteredRights.length){
                            Notiflix.Loading.Remove();
                        }
                      }
              
      
                  }
      
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
                                    <li class="breadcrumb-item"><a href="#">Vendor Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Vendor List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Vendor List
                            </h4>
                        </div>
                    </div> 

                    <div class="row" style={{display : this.state.AddAccess ? '' : 'none'}}>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                       <a href='/addvendor'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Vendor</button>
                                  
                                       </a>
                                                                       </div>
                                </div>
                            </div>
                        </div> 
                     </div>
                
                </div>
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive">     
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                       
                                        <th>Company/Vendor Name</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Status</th>
                                        <th>Profile Status</th>
                                        <th>Action</th>
                                       
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.VendorData.length == 0 ? 
                                <tr><td colSpan={7} style={{textAlign:'center'}}>No Vendors Available</td></tr> : 
                                ''} 

                                {this.state.VendorData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                     <td>{data.fld_name}</td>
                                    <td>{data.fld_email}</td>
                                    <td>{data.fld_city}</td>
                                    <td>{data.fld_state}</td>
                                    <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                    <td style={{color:data.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{data.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                                   
                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('VendorDetails',JSON.stringify(data))
                                        window.location.href = '/viewvendor'
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
export default VendorList;