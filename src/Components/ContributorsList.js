import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,Monitor} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';

class ContributorList extends Component {
     constructor(props){
         super(props)
            this.state={
                ContributorData:[]
             }
     
         }
         componentDidMount(){
             Notiflix.Loading.Init({
                 svgColor : '#507dc0'
                
               });
            
               Notiflix.Loading.Dots('');
     
               GetApiCall.getRequest("GetContributors").then(resultdes =>
                   resultdes.json().then(obj => {
                  
                   // console.log(obj.data)
                   
                     this.setState({
                        ContributorData : obj.data
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
                                    <li class="breadcrumb-item"><a href="#">Health Knowledge</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Contributor List</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Contributor's List</h4>
                        </div>
                    </div> 

                    
                <div class="row">
                <div class="col-12">
                     <div class="card">
                         <div class="card-body">
                             <div class="row align-items-center">
                                                                    <div class="col text-right">
                                    <a href='/addcontributors'>
                                    <button 
                                    
                                    class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                            class="uil-plus mr-1"></i>Add New Contributor</button>
                               
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
                                        <th>Name</th>
                                       <th>Photo</th>
                                        <th>Designation</th>
                                        <th>Show on Website</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.ContributorData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Contributor Available</td></tr> : 
                                 ''} 
                                {this.state.ContributorData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                     <td>{data.fld_title+' '+data.fld_name}</td>
                                    <td><img style={{width:'100px',height: '100px'}} src={data.fld_photo} /></td>
                                    <td>{data.fld_designation}</td>
                                    <td> <Monitor style={{color : data.fld_showonwebsite == 'Yes' ? 'green' : 'red'}} /></td> 

                                  
                                  
                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('ContributorDetails',JSON.stringify(data))
                                        window.location.href = '/viewcontributor'
                                    }}
                                    >
                                <span  >
                                <Edit3/>
                                    </span>
                                    {/* &nbsp;&nbsp;<Trash2/> */}
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
export default ContributorList;