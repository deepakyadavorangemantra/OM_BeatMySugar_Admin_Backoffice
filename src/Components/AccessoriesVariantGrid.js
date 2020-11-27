import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,Monitor} from 'react-feather';
import Notiflix from "notiflix";
import PostApiCall from '../Api';

class AccessoriesVariantGrid extends Component {
     constructor(props){
         super(props)
         this.state={
            MasterId : '',
            VariantData : [],
            MasterData : [],

            AddAccess : false
         }
         
        }

        componentDidMount() {
          
    
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });

        Notiflix.Loading.Dots('');
    
        var det = localStorage.getItem('AccessoriesParentIdDetails')
        var MasterData = JSON.parse(det)

        this.setState({
            MasterId : MasterData.fld_id,
            MasterData : MasterData 
        })
        console.log(MasterData)

        PostApiCall.postRequest({

            id : MasterData.fld_id,

     
         },"Get_AccessoriesVarientList").then((results1) => 
         
           // const objs = JSON.parse(result._bodyText)
           results1.json().then(obj => {
     
         
           if(results1.status == 200 || results1.status==201){

            this.setState({
                VariantData : obj.data
            })

            // console.log(obj.data)

            Notiflix.Loading.Remove()

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
                        <li class="breadcrumb-item"><a href="/accessoriesitemmasterlist">Accessories List</a></li>
                        
                        <li class="breadcrumb-item active" aria-current="page">Accessories Variants List
                        </li>
                    </ol>
                </nav>
                <h4 class="mb-1 mt-0">Accessories Variants List
                    </h4>
                </div>
                    </div> 

                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col ">
                                <a href='/accessoriesitemmasterlist'>
                                <button 
                                
                                class="btn btn-primary" id="btn-new-event"><i
                                        class="uil-arrow-left mr-1"></i>Back To Accessories List</button>
                           
                                </a>
                                                                </div>
                                
                               <div class="col text-right" style={{display : this.state.AddAccess ? '' : ''}}>
                                       <a href='/addaccessoriesvariant'>
                                       <button 
                                       
                                       class="btn btn-primary" id="btn-new-event"><i
                                       class="uil-plus mr-1"></i>Add New Accessories Variant</button>
                                  
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
                                <h5 class="mb-1 mt-0">Accesories Item Master Details
                    </h5>
                                <div class="table-responsive">
                               
                                <table  class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                    <th>Item Code</th>
                                        <th>Item Name</th>
                                        <th>Brand</th>
                                        <th>Comapny</th>
                                        <th>HSN Code</th>
                                        <th>Status</th>
                                    
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                       
                                <tr >
                                               
                                <td>{this.state.MasterData.fld_code}</td>
                                     <td>{this.state.MasterData.fld_name} 
                                      
                                     </td>
                                    <td>{this.state.MasterData.fld_brand}</td>
                                    <td>{this.state.MasterData.fld_company}</td>
                                    <td>{this.state.MasterData.fld_hsncode}</td>
                                    <td style={{color:this.state.MasterData.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{this.state.MasterData.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                                  
                                  
                                    </tr>
                    
                           
                                    
                                   
                                    </tbody>
                                  
                            
                            
                              
                                    </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <h5 class="mb-1 mt-0">Accessories Variant List
                    </h5>
                                <div class="table-responsive">
                                <table id="basic-datatable"  class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Item SKU</th>
                                        <th>Accessories Name</th>
                                        <th>Price</th>
                                       
                                        <th>Accessories Approval Status</th>
                                        <th>Availability</th>
                                        <th>Show on Website</th>
                                        <th>Action</th>
                                        
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                
                                <tbody>
                                {this.state.VariantData.length == 0 ? 
                                <tr><td colSpan={7} style={{textAlign:'center'}}>No Variant Available</td></tr> : 
                                ''} 

                                {this.state.VariantData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                <td>{data.fld_sku}</td>
                                     <td>{data.fld_name} </td>
                                                 <td><strike><i class="fa fa-inr" aria-hidden="true"></i><span> &#8377; </span>{data.fld_price}</strike> &nbsp;<i class="fa fa-inr" aria-hidden="true"></i><span> &#8377; </span>{data.fld_discountprice} ({data.fld_discountpercent}%)</td>
                                    
                                 <td style={{color:data.fld_approved == 'Yes' ? 'green' : 'red'}}><b>{data.fld_approved== 'Yes' ? 'Approved' : 'Pending'}</b></td>
                        
                                    <td style={{color:data.fld_availability == 'In stock' ? 'green' : 'red'}}><b>{data.fld_availability}</b></td>
                                   
                                    <td> <Monitor style={{color : data.fld_showonwebsite == 'Yes' ? 'green' : 'red'}} /></td> 


                                    <td> <div class="align-self-center tableact" style={{ textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('AccessoriesVariantDetails',JSON.stringify(data))
                                        window.location.href = '/viewaccessoriesvariant'
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
export default AccessoriesVariantGrid;