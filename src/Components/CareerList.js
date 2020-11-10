import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,Monitor} from 'react-feather';
import GetApiCall from '../GetApi';
import Notiflix from "notiflix";
import moment from 'moment';

class CareerList extends Component {
    constructor(props){
        super(props)
           this.state={
            CareerData:[]
            }
    
        }
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetCareer").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                //   console.log(obj.data)
                  
                    this.setState({
                        CareerData: obj.data
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
                                    <li class="breadcrumb-item"><a href="#">Career Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Job Opening List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Job Opening List
                            </h4>
                        </div>
                    </div> 

                    <div class="row">
                   <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                
                                    <div class="col-md-12 text-right">
                                       <a href='/addjobopening'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Job Opening</button>
                                  
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
                                    <th> Job Title</th>
                                        <th>Joining Date</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Show on Website</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    
                                        </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.CareerData.length == 0 ? 
                                <tr><td colSpan={7} style={{textAlign:'center'}}>No Job Openings Available</td></tr> : 
                                ''} 
                                {this.state.CareerData.map((data,index)=>(
                                        
                                        
                                    
                                    <tr key={index}>
                                                { index == 0 ?
                                        <Helmet>
                                    
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>

                                </Helmet> : ''}
                                    <td>{data.fld_title}</td>
                                   <td>{moment(data.fld_joiningdate).format('ll')}</td>
                                   <td>{data.fld_city}</td>
                                   <td>{data.fld_state}</td>
                                  <td> <Monitor style={{color : data.fld_showonwebsite == 'Yes' ? 'green' : 'red'}} /></td> 

                                  <td style={{color:data.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{data.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                                      

                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                    
                                        localStorage.setItem('CareerDetails',JSON.stringify(data))
                                        window.location.href ='/viewjobopening'
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
export default CareerList;