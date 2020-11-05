import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,Monitor} from 'react-feather';
import GetApiCall from '../GetApi';
import Notiflix from "notiflix";
import moment from 'moment';
import PostApiCall from '../Api';

class DietitianList extends Component {
    constructor(props){
        super(props)
           this.state={
               DocData:[],
               AddAccess : false
            }
    
        }
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetDietitianList").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  
                    this.setState({
                        DocData : obj.data
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
             
                              if(filteredRights[i].fld_menuname == 'Add Nutritionist & Dietitians'){
                  
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
                                    <li class="breadcrumb-item active" aria-current="page">Nutritionist & Dietitians List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Nutritionist & Dietitians List
                            </h4>
                        </div>
                    </div> 

                    <div class="row">
                   <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col-md-6">
                                
                                <div class="row align-items-center">
                                <div class="col-md-2">
                                <label for="validationCustom01">Filter By:</label>
                                </div>
                                 <div class="col-md-4" style={{marginLeft:'-23px'}}>
                                
                                  <select type="text" class="form-control"  required >
                                     <option>Location</option>
                                     <option>Specialization</option>
                                    
                                 </select>
                            
                                 </div>
                                 <div class="col-md-4">
                                
                                 <select type="text" class="form-control"  required >
                                     <option>Delhi</option>
                                     <option>Faridabad</option>
                                    
                                 </select>
                          
                                 </div>

                                </div>
                          </div>
                                    <div class="col-md-6 text-right" style={{display : this.state.AddAccess ? '' : 'none'}}>
                                       <a href='/adddietitians'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Nutritionist & Dietitian</button>
                                  
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
                                    <th> Name</th>
                                        <th>Photo</th>
                          
                                        <th>Profile Status</th>
                                        <th>Show on Website</th>
                                        <th>Action</th>
                                       
                                       
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.DocData.length == 0 ? 
                                <tr><td colSpan={5} style={{textAlign:'center'}}>No Nutritionist & Dietitian Available</td></tr> : 
                                ''} 
                                {this.state.DocData.map((data,index)=>(
                                        
                                        
                                    
                                    <tr key={index}>
                                                { index == 0 ?
                                        <Helmet>
                                    
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>

                                </Helmet> : ''}
                                    <td>{data.fld_title+' '+data.fld_name}</td>
                                    <td><img style={{width:'100px',height: '100px'}} src={data.fld_photo} /></td>
                                    <td style={{color:data.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{data.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                                
                                    <td> <Monitor style={{color : data.fld_showonwebsite == 'Yes' ? 'green' : 'red'}} /></td> 



                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                    
                                        localStorage.setItem('NutritionistDetails',JSON.stringify(data))
                                        window.location.href = '/viewdietitian'
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
export default DietitianList;