import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';


class ReliefPaymentList extends Component {
   
    

    constructor(props){
        super(props)
        this.state={
           OrderData:[],

           AddAccess : false,
           
        }

    }
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetNewOrders").then(resultdes =>
              resultdes.json().then(obj => {
             
            //   console.log(obj.data)
              
                this.setState({
                  OrderData : obj.data
                })
  
  
                Notiflix.Loading.Remove();
              }))



        // var login=localStorage.getItem('LoginDetail');
        // var details=JSON.parse(login)

        // PostApiCall.postRequest({
  
        //     staffid : details[0].fld_staffid,
        
        //   },"GetUserSubMenuAccessRights").then((resultssub) => 
          
        //     // const objs = JSON.parse(result._bodyText)
        //     resultssub.json().then(objsub => {  
        //     if(resultssub.status == 200 || resultssub.status==201){

        //    var filteredRights = objsub.data;
        //         // console.log(filteredRights)
        
        //         var con = 0
        //         for(var i = 0 ; i< filteredRights.length ;i++){
   
        //             if(filteredRights[i].fld_menuname == 'Add Staff'){
        
        //               if(filteredRights[i].fld_access == 1){
        //                this.setState({
        //                  AddAccess : true
        //                })
        //               }
        //             }
                   
        //           con = con + 1
        //           if(con == filteredRights.length){
        //               Notiflix.Loading.Remove();
        //           }
        //         }
        

        //     }

        // }))

    
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
                                    <li class="breadcrumb-item"><a href="#">Settlement Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Relief Payment List
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Relief Payment List
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
                                    <th>S.No.</th>
                                        <th>Order Number</th>
                                        <th>Customer Name</th>
                                        <th>Number of Items</th>
                                        <th>Order Value</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Order Status</th>
                                        <th>Action</th>
                                                                          
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.OrderData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                <td>{(index+1)}.</td>
                                    <td>{data.fld_ordernumber}<br/><br/>{data.fld_orderdate}</td>
                                   <td>{data.fld_name}<br />{data.fld_email}<br/>{data.fld_mobile}</td>
                                               
                                    <td>{data.fld_numofitems}</td>
                                    <td> &#8377; {data.fld_netcost}</td>
                                    <td> {data.fld_paymentmode}</td>
                                    <td> {data.paystatus == null ? 'Success' : data.paystatus}</td>
                                    <td> {data.fld_status}</td>
                                                    

                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        
                                        localStorage.setItem('ReliefDetails',JSON.stringify(data))
                                        window.location.href = '/view-relief-payment'
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
export default ReliefPaymentList;