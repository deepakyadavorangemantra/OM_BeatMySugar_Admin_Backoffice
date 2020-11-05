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
            DocRef : [],
            DietRef : [],
            SearchText : '',

            AddAccess : false
          };
        }
    
         
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');


              GetApiCall.getRequest("GetDietitianList").then(resultdes =>
                resultdes.json().then(obj => {
               
                
                  this.setState({
                      DietData : obj.data,
                      DietRef : obj.data
                  })

                }))
      

    
              GetApiCall.getRequest("GetDoctorList").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  
                    this.setState({
                        DocData : obj.data,
                        DocRef : obj.data
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
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Health Center Mapping</h4>
                        </div>
                    </div> 

                    
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                 <div class="col-md-8 text-left">
                                 <label for="validationCustom01">Select if :</label>
                                   <div class="col-md-3">
                                   
                                   <label class="radio-inline">
                                   <input type="radio" onChange={()=>{
                                       this.setState({
                                           type : 'Doctor'
                                       })
                                   }} name="optradio" checked={this.state.type == 'Doctor' ? true : false} /> Doctor
                                </label>
                               <label class="radio-inline" style={{marginLeft:'10px'}}>
                                   <input
                                   onChange={()=>{
                                    this.setState({
                                       
                                        type : 'Dietitian',
                                        num : 1
                                    })
                                }}
                                   type="radio" name="optradio" checked={this.state.type == 'Dietitian' ? true : false} /> Dietitian
                               </label> 
                              
                                   </div>
                                    </div>
                                    <div className="col-md-4 text-right">
                                    <div class="app-search">
                                            <form>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Search..."
                                                    value={this.state.SearchText}
                                                    onChange={(text)=>{
                                                        this.setState({
                                                            SearchText :text.target.value 
                                                        })

                                                        if(this.state.type == 'Doctor')
                                                        {
                                                        this.setState({
                
                                                            DocData : text.target.value == '' ? this.state.DocRef :this.state.DocRef.filter(item  => 
                                                           {
                                                       
                                                       
                                                       
                                                           if ( item.fld_name.toLowerCase().includes(text.target.value.toLowerCase())  ){
                                                             return true
                                                           }
                                                   
                                                           }
                                                           ) })

                                                        }
                                                        else
                                                        {
                                                            this.setState({
                
                                                                DietData : text.target.value == '' ? this.state.DietRef :this.state.DietRef.filter(item  => 
                                                               {
                                                           
                                                           
                                                           
                                                               if ( item.fld_name.toLowerCase().includes(text.target.value.toLowerCase())  ){
                                                                 return true
                                                               }
                                                       
                                                               }
                                                               ) })
     
                                                        }
                                                       
                                                            

                                                    }}
                                                    
                                                    />
                                                    <span data-feather="search"></span>
                                                </div>
                                            </form>
                                        </div>
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
                                   
                                        {this.state.type == 'Doctor' ?
                                        <tr>
                                        <th>Doctor Photo</th>
                                        <th>Doctor ID</th>
                                        <th>Doctor Name</th>
                                        <th>Action</th>
                                        </tr>
                                        :
                                        <tr>
                                        <th>Dietitian Photo</th>
                                        <th>Dietitian Name</th>
                                        <th>Action</th>
                                        </tr>
                                        }
                                       
                                       
                                        
                                 
                                </thead>
                            
                               
                              {this.state.type == 'Doctor' ?
                            <tbody>

                            {this.state.DocData.length == 0 ? 
                            <tr><td colSpan={6} style={{textAlign:'center'}}>No Doctors Available</td></tr> : 
                            ''} 
                            {this.state.DocData.map((data,index)=>(
                                    
                                    
                                
                                <tr key={index}>
                                          
                                <td>{data.fld_title+' '+data.fld_name}</td>
                                <td><img style={{width:'100px',height: '100px'}} src={data.fld_photo} /></td>
                                <td>{data.fld_medicalregistrationid}</td>
                             
                                <td>  <button 
                                       style={{display : this.state.AddAccess ? '' : 'none'}}
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"
                                onClick={()=>{
                                
                                    localStorage.setItem('MapDetails',JSON.stringify(data))
                                    window.location.href = '/healthcentermappinglist'
                                }}
                                >
                            Assign Health Center 
                                </button> &nbsp;&nbsp;
                                </td>

                                </tr>


                            ))} 

                                </tbody>  
                            :



                            <tbody>

                            {this.state.DietData.length == 0 ? 
                            <tr><td colSpan={5} style={{textAlign:'center'}}>No Nutritionist & Dietitian Available</td></tr> : 
                            ''} 
                            {this.state.DietData.map((data,index)=>(
                                    
                                    
                                
                                <tr key={index}>
                                          
                                          
                                <td>{data.fld_title+' '+data.fld_name}</td>
                                <td><img style={{width:'100px',height: '100px'}} src={data.fld_photo} /></td>
                               

                                <td>  <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"
                                onClick={()=>{
                                
                                    localStorage.setItem('MapDetails',JSON.stringify(data))
                                    window.location.href = '/healthcentermappinglist'
                                }}
                                >
                                    Assign Health Center 
                                </button> &nbsp;&nbsp;
                                </td>

                                </tr>


                            ))} 

                                </tbody>


                            }

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