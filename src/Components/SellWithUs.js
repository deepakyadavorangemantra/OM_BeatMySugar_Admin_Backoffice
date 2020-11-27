import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';


class SellWithUs extends Component {
     constructor(props){
         super(props)
         this.state={
           SellData:[],
 
            
         }
         
        }
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetSellWithUs").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  // console.log(obj.data)
                  
                    this.setState({
                      SellData : obj.data
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
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Sell With Us</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Sell With Us List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Sell With Us List
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
                                       
                                        <th>Company Name</th>
                                        <th>Contact Person Name</th>
                                        <th>Contact Person Designation</th>
                                        <th>Email</th>
                                        <th>Mobile</th>  
                                        <th>State</th> 
                                        <th>City</th> 
                                        <th>Action</th>
                                       
                                       
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.SellData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                     
                                <td>{data.fld_companyname}</td>
                                    <td>{data.fld_title+' '+data.fld_personname}</td>
                                    <td>{data.fld_persondesignation}</td>
                                    <td>{data.fld_email}</td>
                                    <td>{data.fld_mobile}</td>
                                    <td>{data.fld_state}</td>
                                    <td>{data.fld_city}</td>
                                   <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                        onClick={()=>{
                                        localStorage.setItem('SellDetails',JSON.stringify(data))
                                        window.location.href ='/viewsellwithus'
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
export default SellWithUs;