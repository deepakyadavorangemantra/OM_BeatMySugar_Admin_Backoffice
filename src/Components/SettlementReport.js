import React, { Component, Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Notiflix from "notiflix";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'


import VendorsGrids from './SettlementGrids';
import VendorsExtraGrids from './SettlementReportExtraGrid';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GetApiCall from '../GetApi';
import PostApiCall from "../Api";


export default function Vendors() {
 const [state, setState] = useState({
      vendorStatus:"No Status Selected",
   
     startDate:null,
     endDate:null,
     extractData:false
 })


 const [VendorsData, setVendorsData] = useState([])

 const [VendorsOrderData, setVendorsOrderData] = useState([])
 


 const   Dropdown=() =>{
        
    return(
        <div className="btn-group ">
       
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        &nbsp;Select&nbsp;Vendors&nbsp;Report&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu  scrollable-menu">
         <li> <a  href="#" onClick={()=>{setState({...state,vendorStatus:"All Vendors",extractData:false})}} className="dropdown-item bg-white text-dark" >All Vendors</a></li>
  
  {VendorsData.map(vendor=><li><a href="#" className="dropdown-item bg-white text-dark" onClick={()=>{setState({...state,vendorStatus:`${vendor.label}`,extractData:false})}}>{vendor.label}</a></li>)} 
 
          
         </ul>
      </div>
    )
}


const    DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold  ' style={{display:'flex'}}>  
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
     <li className='nav-item text-dark font-weight-bold '  style={{display:'flex'}}>
     <span style={{marginTop:'9px',marginLeft:'3px'}}>To </span>
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


useEffect(() => {
    // Update the document title using the browser API

    Notiflix.Loading.Dots('Please wait...');
    
    GetApiCall.getRequest("GetVendorData").then(resultdes =>
        resultdes.json().then(obj => {
            setVendorsData(obj.data)
          
           Notiflix.Loading.Remove()
            // console.log(obj.data)
        }))
  },[]);


const  getReportHandler=()=>{

    if(state.vendorStatus==="No Status Selected"){
        setState({...state,extractData:false})

          return   Notiflix.Notify.Failure('Select Report Type');
         }
      if(state.startDate!==null&&state.endDate===null){
        setState({...state,extractData:false})
          return   Notiflix.Notify.Failure('Enter "To" Date');
         }
      if(state.startDate===null&&state.endDate!==null){
        setState({...state,extractData:false})
          return   Notiflix.Notify.Failure('Enter "Start" Date');
         }
    
         else{
            Notiflix.Loading.Init({
                svgColor : '#507dc0',
              });
        
          
              Notiflix.Loading.Dots('Please wait...');
          
              GetApiCall.getRequest("GetVendorDataReports").then(resultdes =>
                resultdes.json().then(obj => {
                    setVendorsOrderData(obj.data)

                    console.log(obj.data)

                    var detOrder = []
                    var ind = 0
                    for(var i =0 ;i <Object.keys(obj.data).length;i++){
                
                        ind = i
                       detOrder.push(obj.data[i])
                       detOrder[i].VenDet = []
                
                        PostApiCall.postRequest({
                
                            vendororderid : obj.data[i].fld_ordervendorid
                        
                        },"Get_OrderVendorDetailByOrderVendorID_NewBackoffice").then((results2) => 
                        
                        // const objs = JSON.parse(result._bodyText)
                        results2.json().then(obj2 => {

                            // console.log(obj2.data)
                        
                        if(results2.status == 200 || results2.status==201){
                
                            
                
                            for(var j =0 ;j <Object.keys(obj2.data).length;j++)
                
                            if(obj2.data[j].fld_category == 'Food'){
                
                                PostApiCall.postRequest({
                    
                                    ordervendordetailid : obj2.data[j].fld_ordervendordetailid,
                                    productid : obj2.data[j].fld_productid
                             
                             },"Get_FoodProductByOrderVendorDetailID_NewBackoffice").then((results3) => 
                             
                               // const objs = JSON.parse(result._bodyText)
                               results3.json().then(obj3 => {
                            
                             
                               if(results3.status == 200 || results3.status==201){
                    
                            // console.log(obj3.data)
                              for(var k=0;k<Object.keys(obj.data).length;k++){
                               
                                  if(obj.data[k].fld_verdorid == obj3.data[0].fld_vendorid){

                                    // console.log(obj3.data[0])
                
                                    detOrder[k].VenDet.push(obj3.data[0])
                               
                                    // console.log(detOrder[k])
                                    setVendorsOrderData(detOrder)
                                    // return setState({...state,extractData:true})
                        
                                  }
                              }
                                
                               }
                            }))
                    
                            }else if(obj2.data[j].fld_category == 'Footwear'){
                    
                    
                                PostApiCall.postRequest({
                    
                                    ordervendordetailid : obj2.data[j].fld_ordervendordetailid,
                                    productid : obj2.data[j].fld_productid
                             
                             },"Get_FootWearProductByOrderVendorDetailID_NewBackoffice").then((results3) => 
                             
                               // const objs = JSON.parse(result._bodyText)
                               results3.json().then(obj3 => {
                            
                             
                               if(results3.status == 200 || results3.status==201){
                    
                           
                                for(var k=0;k<Object.keys(obj.data).length;k++){
                                    if(obj.data[k].fld_verdorid == obj3.data[0].fld_vendorid){
                  
                                      detOrder[k].VenDet.push(obj3.data[0])
                                      
                                      setVendorsOrderData(detOrder)
                                    //   return setState({...state,extractData:true})
                                    }
                                }
                        
                               }
                            }))
                    
                            }else if(obj2.data[j].fld_category == 'Socks'){
                    
                    
                                PostApiCall.postRequest({
                    
                                    ordervendordetailid : obj2.data[j].fld_ordervendordetailid,
                                    productid : obj2.data[j].fld_productid
                             
                             },"Get_SocksProductByOrderVendorDetailID_NewBackoffice").then((results3) => 
                             
                               // const objs = JSON.parse(result._bodyText)
                               results3.json().then(obj3 => {
                            
                             
                               if(results3.status == 200 || results3.status==201){
                    
                             
                                for(var k=0;k<Object.keys(obj.data).length;k++){
                                    if(obj.data[k].fld_verdorid == obj3.data[0].fld_vendorid){
                  
                                      detOrder[k].VenDet.push(obj3.data[0])
                                      setVendorsOrderData(detOrder)
                                    //   return setState({...state,extractData:true})
                          
                                    }
                                }
                        
                               }
                            }))
                    
                            }
                        }
                    }))
                
                    }
                   
                   Notiflix.Loading.Remove()
                    // console.log(obj.data)
                }))
          
        
        
         }
       
   }
   
  
   
   
   const DataTable=()=>{
    let filteredVenderData=[]
    let totalItem=0;
    let totalOrders=0;
    let totalOrderValue=0;
    
   
    if(state.startDate!==null&&state.endDate!==null){
        filteredVenderData=VendorsOrderData.filter(vendor=>{
        //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
        if(moment(moment(vendor.fld_orderdate).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
               if(state.vendorStatus==='All Vendors'){
                totalItem+=vendor.fld_numofitems;
                totalOrders+=1;
                totalOrderValue+=vendor.fld_ordervalue
                 return vendor
               }
             if(vendor.fld_vendorname===state.vendorStatus){
                 totalItem+=vendor.fld_numofitems;
                 totalOrders+=1;
                 totalOrderValue+=vendor.fld_ordervalue
                  return vendor
              } 
         }
            

         }
         
         )
      
    } 

    else{
         filteredVenderData=VendorsOrderData.filter(vendor=>{
            if(state.vendorStatus==='All Vendors'){
                totalItem+=vendor.fld_numofitems;
                totalOrders+=1;
                totalOrderValue+=vendor.fld_ordervalue
                 return vendor
               }
        if(vendor.fld_vendorname===state.vendorStatus){
            totalItem+=vendor.fld_numofitems;
            totalOrders+=1;
            totalOrderValue+=vendor.fld_ordervalue
            return vendor
        }  
      }) 
    }

   if(state.extractData===false){
       return(
        <div class="row">
        <div class="col  col-12">
            
              </div>
              </div>  
       )
   }

   if(state.extractData===true&&totalOrders===0){
       return(
        <div class="row">
        <div class="col  col-12">
        <div class="card visually-view">
                    <div class="card-body">
                    <div class="jumbotron bg-light">
                     <h2 class="display-4">No Vendor Reports Available</h2>
                    
       
                   </div>
                 
                  </div>
                  </div>
              </div>
              </div>  
       )
   }
   else if(state.extractData===true&&totalOrders!==0){
    return(
        
        <table id="table-to-xls"  className="table table-hover table-nowrap mb-0  table-responsive">
         <Fragment>
                        <div class="row">
            <div class="col-12">
                <div class="card visually-view">
                    <div class="card-body">
                  
             <VendorsGrids  totalOrderValue={totalOrderValue} totalItems={totalItem} totalOrders={totalOrders} 
              fromDate={state.startDate!==null?moment(state.startDate).format('ll') :"Date is not Selected"}  endDate={state.endDate!==null?moment(state.endDate).format('ll'):"Date is not Selected"}  />

                    </div>
                    </div>
                    </div>
                    </div>
        <div class="row">
            <div style={{marginBottom:"-11px"}} class="col-12">
                <div class="card">
                    <div class="card-body">
                    <table class="table">

                            <thead>
                                    <tr>
                <th>Customer Order Date</th>
                <th>Customer Order Number</th>
                <th>Customer Name</th>
                <th>Vendor Name</th>
                <th>Vendor Order Date</th>
                <th>Vendor Order Number</th>
                <th>Total Items</th>
                <th>Total Amount</th>
                <th>Vendor Split</th>
                <th>BMS Split</th>

                <tr>
                    <td>
         
                    </td>
                </tr>
                </tr>
                </thead><tbody>
                {filteredVenderData&&  
             filteredVenderData.map(vendor=>{
               return  <VendorsExtraGrids customerOrderDate={vendor.fld_orderdate}  
               customerOrderNumber={vendor.fld_customerordernumber}
               customerName={vendor.fld_name} vendorName={vendor.fld_vendorname} vendorOrderDate={moment(vendor.fld_orderdate).format('ll')} vendorOrderNumber={vendor.fld_ordernumber}
               totalItems={vendor.fld_numofitems} totalAmount={vendor.fld_netcost}
               BMSSplit={vendor.VenDet != undefined && vendor.VenDet.length > 0  ?  parseFloat(((vendor.VenDet.map(data => (((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(vendor.fld_offerpercent == '' || vendor.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*vendor.fld_offerpercent/100))))*(vendor.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(vendor.fld_offerpercent == '' || vendor.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*vendor.fld_offerpercent/100))))*(vendor.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))))).toFixed(2) : 0}
               />
             })
                }
                
                </tbody>
                        </table>




                    </div>
                    </div>
                    </div>
                    </div>

            
                  </Fragment>
              </table>
       
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
                            <li class="breadcrumb-item active" aria-current="page">Vendors
                            </li>
                        </ol>
                    </nav>
                    </div>
                    </div>
                    
                    <div class="row page-title pt-0">
                <div class="col-sm-12 col-xl-6">
                <h4  class="col-12 mb-1 mt-0">Vendor Reports</h4>
                </div>

                <div class="col-sm-12 col-xl-6 d-flex justify-content-end">

                <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className='btn btn-primary'
                        table="table-to-xls"
                        filename={"VendorReports"}
                        sheet="tablexls"
                        buttonText="Download as XLS"
                        style={{background: '#060a4a !important',
                            color: 'white'
                            
                        }}/>

                
            </div>

            </div> 
           


            <div className="card card-body  " role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast"  >

            <div className="row align-items-center">
                <div className="col col-xl-6 col-sm-12">
                <div className="btn-toolbar py-1  sw-toolbar sw-toolbar-top justify-content-left" >
                {Dropdown()}   
                <input disabled={true} className="form-control-date" type='text' value={state.vendorStatus} style={{marginLeft:'5px'}} />                                                              </div>
                </div>
                  <div className="col col-xl-6    col-sm-12">
                    
                    <div className="btn-toolbar py-1 ml-1 pl-5  sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right'}}>
                                                                                {DatePickers()}

                                                                                </div>
                </div>
            </div>
                                                         
                                                        </div>
         




             

   






                                                        <div class="row">
                                                        <div class="col-12">
                                                        <div class="card">
                                                            <div class="card-body getreport-card">
                                                                <div class="row align-items-center">
                                                                <div class="col ">
                                                              
                                                                                                </div>
                                                                
                                                               <div class="col text-right">
                                                               <button  style={{border:"0px"}} onClick={()=>getReportHandler()} className='btn btn-primary'>Get Reports</button>  
                                    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    
                                                    </div>            
                                            { DataTable()}
                                                       
                                                
                                                </div>
            </div>

</div>
    </div>
);
}




