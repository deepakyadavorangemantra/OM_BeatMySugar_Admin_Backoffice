import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';



class FoodwearGrid extends Component {
    constructor(props){
        super(props)

        this.state={
          FootwearData:[],
          AddAccess : false
       }
        
       }
      
       componentDidMount(){
           Notiflix.Loading.Init({
               svgColor : '#507dc0'
              
             });
          
             Notiflix.Loading.Dots('');
   
             GetApiCall.getRequest("GetFootwearItemMaster").then(resultdes =>
                 resultdes.json().then(obj => {
                
                 // console.log(obj.data)
                 
                   this.setState({
                     FootwearData : obj.data
                   })
     
     
                //    Notiflix.Loading.Remove();
                 }))

                 var login=localStorage.getItem('LoginDetail');
                 var details=JSON.parse(login)
         
                 PostApiCall.postRequest({
           
                     staffid : details[0].fld_staffid,
                 
                   },"GetUserSubMenuAccessRights").then((resultssub) => 
                   
                     // const objs = JSON.parse(result._bodyText)
                     resultssub.json().then(objsub => {  
                     if(resultssub.status == 200 || resultssub.status==201){
         
                    var filteredRights = objsub.data;
                         // console.log(filteredRights)
                 
                         var con = 0
                         for(var i = 0 ; i< filteredRights.length ;i++){
            
                             if(filteredRights[i].fld_menuname == 'Add Footwear'){
                 
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
                                    <li class="breadcrumb-item"><a href="#">Product Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Footwear List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Footwear List
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
                                      <option>Brand</option>
                                      <option>Pharma Company</option>
                                     
                                  </select>
                             
                                  </div>
                                  <div class="col-md-4">
                                 
                                  <select type="text" class="form-control"  required >
                                      <option>D-Alive</option>
                                     
                                  </select>
                           
                                  </div>

                                 </div>
                           </div>
                               <div class="col-md-6 text-right" style={{display : this.state.AddAccess ? '' : 'none'}}>
                                       <a href='/addfootwearitemmaster'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                               class="uil-plus mr-1"></i>Add New Footwear Item</button>
                                  
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
                                    <th>Item Code</th>
                                        <th>Item Name</th>
                                        <th>Brand</th>
                                        <th>Comapny</th>
                                        <th>HSN Code</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                {this.state.FootwearData.length == 0 ? 
                                <tr><td colSpan={7} style={{textAlign:'center'}}>No Footwear Item Master Available</td></tr> : 
                                ''} 

                                {this.state.FootwearData.map((data,index)=>(
                                           
                                           
                                           <tr key={index}>
                                           { index == 0 ?
                                    <Helmet>
                                
                          <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                          <script src="/assets/js/pages/datatables.init.js"></script>
                          <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                     
                          </Helmet> : ''}
                          <td>{data.fld_code}</td>
                               <td>{data.fld_name} 
                                <br/><a class="variant-list"
                                onClick={()=>{
                                 
                                  localStorage.setItem('FootParentIdDetails',JSON.stringify(data))
                                  window.location.href = "/footwearvariantlist"
                              }}
                          >{data.VariantCount} Variant{data.VariantCount == 1 ? '' : 's'} Available ( <span style={{color:'red'}}>{data.NotApproved} Pending</span>, <span style={{color:'green'}}>{data.Approved} Approved</span> )</a>
                               </td>
                              <td>{data.fld_brand}</td>
                              <td>{data.fld_company}</td>
                              <td>{data.fld_hsncode}</td>
                              <td style={{color:data.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{data.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                              <td> <div class="align-self-center tableact" style={{ textAlign: 'center'}}
                              onClick={()=>{
                                 
                                localStorage.setItem('FootwearDetails',JSON.stringify(data))
                                window.location.href = '/viewfootwear'
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
export default FoodwearGrid;