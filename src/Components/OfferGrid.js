import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';

class OfferGrid extends Component {
     constructor(props){
         super(props)
         this.state = {
            
            OfferData : [],
           
  
          }
        }
    
        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetOffer").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  console.log(obj.data)
                  
                    this.setState({
                      OfferData : obj.data
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
                                    <li class="breadcrumb-item"><a href="#">Offer Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Offer List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Offer List
                            </h4>
                        </div>
                    </div> 

                    <div class="row">
                 <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                       <a href='/addoffer'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Offer</button>
                                  
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
                                        <th>Offer Name</th>
                                        <th>Code</th>
                                        <th>Price(%)</th>
                                        <th>Max Discount(Rs.)</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Update On</th>
                                        <th>Action</th>
                                       
                                       
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                   

                            {this.state.OfferData.map((data,index)=>(
                                           <tr key={index}>
                                                        { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                            <td>{data.fld_name}</td>
                                           <td>{data.fld_code}</td>
                                           <td>{data.fld_pricepercent}</td>
                                           <td>{data.fld_maximumdiscountprice}</td>
                                           <td>{data.fld_startdate}</td>
                                           <td>{data.fld_enddate}</td>
                                           <td>{data.fld_updatedon}</td>               
       
                                           <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                           onClick={()=>{
                                            localStorage.setItem('OfferDetails',JSON.stringify(data))
                                            window.location.href = '/offerView'
                                   
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
export default OfferGrid;