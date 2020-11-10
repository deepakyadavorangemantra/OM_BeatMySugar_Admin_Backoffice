import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import GetApiCall from '../GetApi'
import {Edit3,Trash2} from 'react-feather';

const FestiveOffers=(props)=> {
    const [state, setState] = useState({
        FestiveOffers:[]
    })
    useEffect(() => {
        GetApiCall.getRequest("GetFestiveOfferMaster").then(resultdes =>
            resultdes.json().then(objfilter =>{
            
                setState({...state,
                    FestiveOffers:objfilter.data,
                })
            }))
    }, [])
 
    return (
      <div>
          
                     
      <div class="content-page">
      
      <div class="content">
   
          <div class="container-fluid">
              <div class="row page-title">
                  <div class="col-md-12">
                      <nav aria-label="breadcrumb" class="float-right mt-1">
                          <ol class="breadcrumb">
                              <li class="breadcrumb-item"><a href="#">Festive Offers</a></li>
                              <li class="breadcrumb-item active" aria-current="page">Offers List</li>
                          </ol>
                      </nav>
                      <h4 class="mb-1 mt-0">Festive Offers</h4>
                  </div>
              </div> 

              
          <div class="row" style={{display : true ? '' : 'none'}}>
          <div class="col-12">
               <div class="card">
                   <div class="card-body">
                       <div class="row align-items-center">
                                                              <div class="col text-right">
                              <a href='/addfestiveoffer'>
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
                                    <th>S.no.</th>
                                    <th>Offer Title</th>
                                       <th>Show on Website</th>
                                       <th>Action</th>
                                        
                                     
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                               
                                {state.FestiveOffers&&state.FestiveOffers.map((data,index)=>{

                                  return  <tr key={index}>
                                        {index===0? <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet>:""
                                        }
                                   <td> {index+1}</td>
                                   <td> {data.fld_title}</td>
                                    <td style={{color:data.fld_showonwebsite==='yes'||data.fld_showonwebsite==='Yes'?'green':'red'}}><b>{data.fld_showonwebsite}</b></td>
                                
                                   <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('FestiveOffersDetails',JSON.stringify(data))
                                        window.location.href = '/viewfestiveoffers'
                                    }}
                                    >
                                <span  >
                                <Edit3/>
                                    </span>
                                    {/* &nbsp;&nbsp;<Trash2/> */}
                                    </div> &nbsp;&nbsp;
                                     </td>
                                  
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
export default FestiveOffers