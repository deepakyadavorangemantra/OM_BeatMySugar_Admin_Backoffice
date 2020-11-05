import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';

class StaffList extends Component {
    constructor(props){
        super(props)
        this.state={
           StaffData:[],

           AddAccess : false,
           
        }

    }
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetStaff").then(resultdes =>
              resultdes.json().then(obj => {
             
              
                this.setState({
                  StaffData : obj.data
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
   
                    if(filteredRights[i].fld_menuname == 'Add Staff'){
        
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
                                    <li class="breadcrumb-item"><a href="#">Staff Managemnet</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Staff List</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Staff List</h4>
                        </div>
                    </div> 

                    
                <div class="row" style={{display : this.state.AddAccess ? '' : 'none'}}>
                <div class="col-12">
                     <div class="card">
                         <div class="card-body">
                             <div class="row align-items-center">
                                                                    <div class="col text-right">
                                    <a href='/addstaff'>
                                    <button 
                                    
                                    class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                            class="uil-plus mr-1"></i>Add New Staff</button>
                               
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
                                    <th>Employee Id</th>
                                       <th>Photo</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        
                                        <th>Status</th>
                                        <th>Assign Rights</th>
                                        <th>Action</th>
                                     
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.StaffData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                     <td>{data.fld_empid}</td>
                                    <td><img style={{width:'100px',height: '100px'}} src={data.fld_photo} /></td>
                                    <td>{data.fld_name}</td>
                                    <td>{data.fld_email}</td>
                                    <td>{data.fld_mobile}</td>
                                    <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                  

                                      <td>
                                     
                                    <button  style={{display : this.state.AddAccess ? '' : 'none'}}
                                     onClick={()=>{
                                        localStorage.setItem('AssignUserRightsData',JSON.stringify(data))
                                        this.props.history.push('/assignstaffrights')
                                    }}
                                    class="btn btn-primary" id="btn-new-event" data-toggle="modal">Assign Rights</button>
                               
                                   
                                          </td>                  

                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('StaffDetails',JSON.stringify(data))
                                        window.location.href = '/viewstaff'
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
export default StaffList;