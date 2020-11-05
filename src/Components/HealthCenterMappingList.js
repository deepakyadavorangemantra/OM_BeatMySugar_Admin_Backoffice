import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import GetApiCall from '../GetApi';
import Notiflix from "notiflix";
import moment from 'moment';
import PostApiCall from '../Api';

class HealthCenterMapping extends Component {
     constructor(props){
         super(props)
         this.state = {
            open:false,
            DocData:[],
            DietData : [],
            type : 'Doctor',
            num : 0,

            AddAccess : false
          };
        }
    
         
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');


              var det = localStorage.getItem('MapDetails')
              var DocData1 = JSON.parse(det)
      
          
              this.setState({
                  Data : DocData1
              })
        
              if(DocData1.fld_medicalregistrationid == undefined){

                PostApiCall.postRequest({
          
                    id : DocData1.fld_id,
    
                  },"GetHealthCenterDietitianMappingList").then((results) => 
                  
                    results.json().then(obj => {
              
                  
                    if(results.status == 200 || results.status==201){

                        this.setState({
                            DocData : obj.data
                        })


                    }
                }))
              }else
              {
                PostApiCall.postRequest({
          
                    id : DocData1.fld_id,
    
                  },"GetHealthCenterDoctorMappingList").then((results) => 
                  
                    results.json().then(obj => {
              
                  
                    if(results.status == 200 || results.status==201){
                    

                        this.setState({
                            DocData : obj.data
                        })

                    }
                }))
              }


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
             
                              if(filteredRights[i].fld_menuname == 'Add Health Center Mapping'){
                  
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
                                    <li class="breadcrumb-item"><a href="#">Services & Listing</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Health Center Mapping</li>
                                    <li class="breadcrumb-item active" aria-current="page">Health Center Mapping List</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Health Center Mapping List</h4>
                        </div>
                    </div> 

                    <div class="row" style={{display : this.state.AddAccess ? '' : 'none'}}>
                   <div class="col-12">
                        <div class="card">
                            <div class="card-body">

                                <div class="row align-items-center">
                                    
                            
                               
                                <div class="col-md-12 text-right">
                                       <a href='/addhealthcentermapping'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Map Health Center </button>
                                  
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
                                        <th>Health Center Name</th>
                                      
                                        <th>Action</th>
                                        </tr>
                                    
                                       
                                       
                                        
                                 
                                </thead>
                            
                            
                            
                            <tbody>

                            {this.state.DocData.length == 0 ? 
                            <tr><td colSpan={7} style={{textAlign:'center'}}>No Mapping Available</td></tr> : 
                            ''} 
                            {this.state.DocData.map((data,index)=>(
                                    
                                    
                                
                                <tr key={index}>
                                            { index == 0  ?
                                    <Helmet>
                                
                            <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                            <script src="assets/js/pages/datatables.init.js"></script>
                            <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>

                            </Helmet> : ''}
                                <td>{data.fld_name}</td>
                                
                                <td>  <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                        
                                onClick={()=>{
                                
                                    localStorage.setItem('TimingMapDetails',JSON.stringify(data))
                                    window.location.href = '/viewhealthcentermapping'
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
export default HealthCenterMapping;