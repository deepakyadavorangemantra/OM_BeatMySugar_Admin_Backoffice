import React, { Component, Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { MDBDataTableV5 } from 'mdbreact';
import Notiflix from "notiflix";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import OrdersGrids from './OrdersGrids';
import OrdersExtraGrids from './OrdersExtraGrids';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GetApiCall from '../GetApi';



export default function Orders(props) {
    const [OrderedData, setOrderedData] = useState([])
const [state, setState] = useState({
    status:'No Status Selected',
    statusValue:"No Status Selected",
    initialStatus:'No Status Selected',
    initialStatusValue:'No Status Selected',
    bannerShow:false,
    startDate:null,
    endDate:null,
    extractData:false

})
const {status,statusValue,startDate,endDate,extractData}=state

const Dropdown=() =>{
        
      
    //   console.log(totalItem)

    return(
        <div className="btn-group">
       
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        &nbsp;Select&nbsp;Report&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <button onClick={()=>{setState({...state,extractData:false,status:"All Orders",statusValue:"All Orders"})}} className="dropdown-item bg-white text-dark" >All Orders</button>
          <button onClick={()=>{setState({...state,extractData:false,status:"Orders Placed",statusValue:"Placed"})}} className="dropdown-item bg-white text-dark" >Orders Placed</button>
          <button onClick={()=>{setState({...state,extractData:false,status:"Orders Assigned",statusValue:"Assigned"})}} className="dropdown-item bg-white text-dark" >Orders Assigned</button>
          <button onClick={()=>{setState({...state,extractData:false,status:"Orders Failed",statusValue:"Failed"})}} className="dropdown-item bg-white text-dark" >Orders Failed</button>
          <button onClick={()=>{setState({...state,extractData:false,status:"Orders Successful",statusValue:"Successfull"})}} className="dropdown-item bg-white text-dark" >Orders Successful</button>
          
         </div>
      </div>
    )
}

const   DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={state.startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setState({...state,startDate:date,extractData:false})}
        selectsStart
        startDate={state.startDate}
        endDate={state.endDate}
        maxDate={state.endDate?state.endDate:new Date()}

        isClearable
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold ml-2'  style={{display:'flex'}}>
     <span style={{marginTop:'9px'}}>To </span>
    <DatePicker
        selected={state.endDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setState({...state,endDate:date,extractData:false})}
        selectsEnd
        startDate={state.startDate}
        endDate={state.endDate}
        minDate={state.startDate}
        maxDate={new Date()}
        popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            }}}
        isClearable
        className="form-date-picker"
      />  
      
     
     </li>
        </>
    )
}




const  getReportHandler=()=>{
console.log();
if(state.statusValue==="No Status Selected"){
      console.log("Hi..."); 
        return  Notiflix.Notify.Failure('Select Report Type');
       }
    if(state.startDate!==null&&state.endDate===null){
         return  Notiflix.Notify.Failure('Enter "To" Date');
       }
    if(state.startDate===null&&state.endDate!==null){
        return   Notiflix.Notify.Failure('Enter "Start" Date');
       }
  
       else{

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
    
      
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetOrderDataReports").then(resultdes =>
            resultdes.json().then(obj => {
              setOrderedData(obj.data)
              
    
               Notiflix.Loading.Remove()
                // console.log(obj.data)
            }))
         

      return  setState({...state,extractData:true})
       }
 
    
   
   }


   const DataTable=()=>{


    let groupOrderByStatus;
    groupOrderByStatus=OrderedData.reduce((r, a) => {
        // console.log("a", a);
        // console.log('r', r);

        if(state.startDate!==null&&state.endDate!==null){
            if(moment(moment(a.fld_orderdate).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
                r[a.fld_status] = [...r[a.fld_status] || [], a];
           
            }}
       
       
       else
         {   r[a.fld_status] = [...r[a.fld_status] || [], a];
           }
        return r;
       }, {});

       let totalItem=0;
       let totalOrders=0;
       let totalOrderValue=0;
       let    OrderData=[]

       if(state.statusValue==="All Orders"){
       
        if(state.startDate!==null&&state.endDate!==null){
         OrderData=OrderedData.filter(order=>{
            if(moment(moment(order.fld_orderdate).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){

            
                 return order
             }
                

             }
             
             )
          
         totalOrders= OrderData.length
       
       
         OrderData.map(order=>{
                          totalItem+=order.fld_numofitems
                      })
          OrderData.map(order=>{
                      totalOrderValue+=order.fld_netcost
                      }) 
        
        }

            else if(state.startDate===null&&state.endDate===null){
               
           OrderData=OrderedData     

       totalOrders=OrderedData.length
       
       
      OrderedData.map(order=>{
                        totalItem+=order.fld_numofitems
                    })
       OrderedData.map(order=>{
                    totalOrderValue+=order.fld_netcost
                    })

            }




       }
       else   if(groupOrderByStatus.hasOwnProperty(`${state.statusValue}`)){
                 totalOrders=groupOrderByStatus[state.statusValue].length
                
                    groupOrderByStatus[state.statusValue].map(order=>{
                                    totalItem+=order.fld_numofitems
                                })

                    
                  groupOrderByStatus[state.statusValue].map(order=>{
                totalOrderValue+=order.fld_netcost 
                        }) 

      }
    
    if(state.extractData===true&&totalOrders!==0){

    return     <table id="table-to-xls"  className="table table-hover table-nowrap mb-0  table-responsive">
                            <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                        
                    <OrdersGrids orderStatus={state.status} totalOrderValue={totalOrderValue} totalItems={totalItem} totalOrders={totalOrders} 
                    fromDate={state.startDate!==null?moment(state.startDate).format('ll') :"Date is not Selected"}  endDate={state.endDate!==null?moment(state.endDate).format('ll'):"Date is not Selected"} 
                    />

                            </div>
                            </div>
                            </div>
                            </div>
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                            <table class="table">

                                    <thead>
                                            <tr>
                        <th>Order Date</th>
                        <th>Order Number</th>
                        <th>Coustomer Name</th>
                        <th>Mobile Number</th>
                        <th>Email Id</th>
                        <th>Total Items</th>
                        <th>Order Value</th>
                        <th>Order Status</th>
                        </tr>
                        {/* &#8377; */}
                        </thead>
                        <tbody>
                            {state.status==='All Orders'?OrderData.map(order=>{

                            return  <OrdersExtraGrids key={order.fld_orderid} orderDate={order.fld_orderdate} orderNumber={order.fld_ordernumber} 
                                coustomerName={order.fld_name} mobileNumber={order.fld_mobile} email={order.fld_email}
                                totalItem={order.fld_numofitems} orderValue={order.fld_netcost} orderStatus={order.fld_status} />
                                
                            }): groupOrderByStatus[state.statusValue].map(order=>{

                            return   <OrdersExtraGrids key={order.fld_orderid} orderDate={order.fld_orderdate} orderNumber={order.fld_ordernumber} 
                            coustomerName={order.fld_name} mobileNumber={order.fld_mobile} email={order.fld_email}
                            totalItem={order.fld_numofitems} orderValue={order.fld_netcost} orderStatus={order.fld_status}
                        />
                            
                            })
                    }   
                        </tbody>
                    
                        </table>   
                    

                            </div>
                            </div>
                            </div>
                            </div>

                    </table>

    }


    else if(state.extractData===true&&totalOrders===0){
        return (
            <div class="row">
            <div class="col  col-12">
                <div class="card visually-view">
                    <div class="card-body">
                    <div class="jumbotron bg-light">
                     <h2 class="display-4">No Order Reports Present</h2>
    
                   </div>
                 
                  </div>
                  </div>
                  </div>
                  </div>
        )
    
    }

else if(state.extractData===false){
return (
    <div class="row">
        <div class="col  col-12">
            
              </div>
              </div>
)


}

}





    return (
      
        <div>
        <div class="content-page">
    
    <div class="content">
      <div class="container-fluid">
        
          

            <div class="row page-title">
                <div class="col-md-12">
                    <nav aria-label="breadcrumb" class="float-right mt-2">
                    <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Reports</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Orders
                            </li>
                        </ol>
                    </nav>
                </div>
                </div>
                <div class="row page-title" style={{paddingTop:'0'}}>
                <div class="col-sm-4 col-xl-6">
                <h4  class="col-12 mb-1 mt-0">Order Reports</h4>
</div>

                <div class="col-sm-8 col-xl-6 d-flex justify-content-end">

                <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className={"btn btn-primary"}
                        table="table-to-xls"
                        filename={"tablexls_student_reports"}
                        sheet="tablexls"
                        buttonText="Download as XLS"
                        style={{background: '#060a4a !important',
                            color: 'white'
                            
                        }}/>

                
            </div>

            </div> 
           
            <div className="card card-body  " role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast"  >

            <div className="row align-items-center">

                <div className="col col-xl-6 col-sm-12">
                        <div className="btn-toolbar  sw-toolbar sw-toolbar-top justify-content-left">
                            {Dropdown()}                        
                            <input disabled={true} className="form-control-date ml-2" type='text' value={state.status} />
                        </div>
                 </div>

                <div className="col col-xl-6  col-sm-12">                    
                    <div className="btn-toolbar  sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>
                        {DatePickers()}
                    </div>
                </div>


            </div>
                                                         
                                                        </div>




                    <div class="row pb-2" >
                    <div  class="col-12">
                    <div className="toast fade show    " role="alert" aria-live="assertive"
                            aria-atomic="true" data-toggle="toast"  >

                    <div className="btn-toolbar py-1 pr-2   sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>
                    <button  onClick={()=>getReportHandler()} className='btn btn-secondary sw-btn-next my-1'>Get Report</button>  


                    </div>
                    </div>
                            
                            
                    </div>
                        
                    </div>
    

                            

      
     {DataTable()}
                                        </div>
                                                </div>

                                </div>
                                        </div>
                                 
    )
}


