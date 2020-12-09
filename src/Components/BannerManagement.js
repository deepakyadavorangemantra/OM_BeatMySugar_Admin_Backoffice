import React, { Component } from 'react';
import Helmet from 'react-helmet'
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';
import {Edit3,Trash2,Monitor} from 'react-feather';



class BannerManagement extends Component {
     constructor(props){
         super(props)
         
         this.state={
             FoodData:[],
             AddAccess : false,
             ApiData:[]
         }
        }
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });

         
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetAdBannerMaster").then(result =>
                result.json().then(obj => {
               
                console.log(obj.data);
                this.setState({
                  ApiData: obj.data
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
                            <li class="breadcrumb-item"><a href="#">Banner Management</a></li>
                            
                        </ol>
                    </nav>
                    <h4 class="mb-1 mt-0">Banner Managment</h4>
                </div>
                    </div> 

                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col-md-6">
                                
                                
                           </div>
                                   <div class="col-md-6 text-right">
                                       <a href='/addbanner'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event"><i
                                               class="uil-plus mr-1"></i>Add New Banner</button>
                                  
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
                                    <th>Web Banner</th>
                                    <th>Mobile Banner</th>
                                    <th>Mobile App Banner</th>
                                    <th>Vertical</th>
                                        <th>Type</th>
                                        <th>Url</th>
                                        <th>Order</th>
                                        <th>Show on website</th>
                                       
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                {this.state.ApiData.length == 0 ? 
                                <tr><td colSpan={8} style={{textAlign:'center'}}>No Banners Available</td></tr> : 
                                ''} 

                                   {this.state.ApiData.map((data,index)=>{
                                   
                                    return <tr>
                                         { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                        <td><img src={data.fld_image} style={{ width:'10rem'}}/></td>
                                        <td><img src={data.fld_mobileimage} style={{ width:'4rem'}}/></td>
                                        <td><img src={data.fld_mobileappimage} style={{ width:'4rem'}}/></td>
                                      
                                        <td>{data.fld_verticle}</td>
                                        <td>{data.fld_type}</td>
                                        <td>{data.fld_url}</td>
                                        <td>{data.fld_order}</td>
                                    <td> <Monitor style={{color : data.fld_showonwebsite == 'Yes' ? 'green' : 'red'}} /></td> 
                                      
                                        <td onClick={()=>{
                                       
                                          localStorage.setItem('BannerDetails',JSON.stringify(data))
                                          window.location.href = '/editbanner'
                                      }}><Edit3/></td>
                                    </tr>
                                   })}
                                    
                                   
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
export default BannerManagement;



