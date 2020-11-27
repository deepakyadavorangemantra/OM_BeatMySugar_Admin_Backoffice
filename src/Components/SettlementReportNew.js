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

var gross = 0
var marg = 0
var vm = 0
var sp = 0
var quan = 0




export default class Vendors extends Component {

    constructor(props){
super(props)
this.state={
    VendorsOrderData : [],
    VendorsData : [],
    VendorsOrderDataFinal : [],
    startDate : '',
    endDate : ''
}
    }


//  const   Dropdown=() =>{
        
//     return(
//         <div className="btn-group ">
       
//         <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//         &nbsp;Select&nbsp;Vendors&nbsp;Report&nbsp;
//           <i class="fa fa-chevron-down" aria-hidden="true"></i>
//           <span className="sr-only">Toggle Dropdown</span>
//         </button>
//         <ul className="dropdown-menu  scrollable-menu">
//          <li> <a  href="#" onClick={()=>{setState({...state,vendorStatus:"All Vendors",extractData:false})}} className="dropdown-item bg-white text-dark" >All Vendors</a></li>
  
//   {VendorsData.map(vendor=><li><a href="#" className="dropdown-item bg-white text-dark" onClick={()=>{setState({...state,vendorStatus:`${vendor.label}`,extractData:false})}}>{vendor.label}</a></li>)} 
 
          
//          </ul>
//       </div>
//     )
// }


DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={this.state.startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>{
            this.setState({
                startDate : date
            })
        }}
        selectsStart
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        maxDate={this.state.endDate?this.state.endDate:new Date()}
        isClearable
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold '  style={{display:'flex'}}>
     <span style={{marginTop:'9px',marginLeft:'3px'}}>To </span>
    <DatePicker
        selected={this.state.endDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>{
            this.setState({
                endDate : date
            })
        }}
        selectsEnd
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        minDate={this.state.startDate}
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


componentDidMount(){
    // Update the document title using the browser API
    Notiflix.Loading.Init({
        svgColor : '#507dc0',
      });


    Notiflix.Loading.Dots('Please wait...');
    

      
          GetApiCall.getRequest("GetSettlementReportOrderDetail").then(resultdes =>
            resultdes.json().then(obj => {
              
                // console.log(obj.data)

                var detOrder = []
                var ind = 0
                for(var i =0 ;i <Object.keys(obj.data).length;i++){
            
                    ind = i
                   detOrder.push(obj.data[i])
                   detOrder[i].VenDet = []
                             
        
            
                        if(obj.data[i].fld_category == 'Food'){
            
                            PostApiCall.postRequest({
                
                                ordervendordetailid : obj.data[i].fld_ordervendordetailid,
                                productid : obj.data[i].fld_productid
                         
                         },"Get_FoodProductByOrderVendorDetailID_NewBackoffice").then((results3) => 
                         
                           // const objs = JSON.parse(result._bodyText)
                           results3.json().then(obj3 => {
                        
                            // console.log(obj3.data)
                           if(results3.status == 200 || results3.status==201){
                
                      
                            // var ddtn = obj.data.filter(val => val.fld_verdorid == obj3.data[0].fld_vendorid)

                            // console.log(ddtn)

                            // if(ddtn.length > 0){
                            //     detOrder[obj.data.indexOf(ddtn)].VenDet.push(obj3.data[0])
                            //     this.setState({
                            //         VendorsOrderData : detOrder
                            //     })
                            // }


                          for(var k=0;k<Object.keys(obj.data).length;k++){
                           
                              if(obj.data[k].fld_ordervendordetailid == obj3.data[0].fld_ordervendordetailid){

                                // console.log(obj3.data[0])
            
                                detOrder[k].VenDet.push(obj3.data[0])
                           
                                // console.log(detOrder) 
                                this.setState({
                                    VendorsOrderData : detOrder
                                })
                                Notiflix.Loading.Remove()
                                // return setState({...state,extractData:true})
                    
                              }
                          }
                            
                           }
                        }))
                
                        }else if(obj.data[i].fld_category == 'Footwear'){
                
                
                            PostApiCall.postRequest({
                
                                ordervendordetailid : obj.data[i].fld_ordervendordetailid,
                                productid : obj.data[i].fld_productid
                         
                         },"Get_FootWearProductByOrderVendorDetailID_NewBackoffice").then((results3) => 
                         
                           // const objs = JSON.parse(result._bodyText)
                           results3.json().then(obj3 => {
                        
                         
                           if(results3.status == 200 || results3.status==201){
                
                       
                            for(var k=0;k<Object.keys(obj.data).length;k++){
                           
                                if(obj.data[k].fld_ordervendordetailid == obj3.data[0].fld_ordervendordetailid){
  
                                  // console.log(obj3.data[0])
              
                                  detOrder[k].VenDet.push(obj3.data[0])
                             
                                  // console.log(detOrder) 
                                  this.setState({
                                      VendorsOrderData : detOrder
                                  })
                                  Notiflix.Loading.Remove()
                                  // return setState({...state,extractData:true})
                      
                                }
                            }
                    
                           }
                        }))
                
                        }else if(obj.data[i].fld_category == 'Socks'){
                
                
                            PostApiCall.postRequest({
                
                                ordervendordetailid : obj.data[i].fld_ordervendordetailid,
                                productid : obj.data[i].fld_productid
                         
                         },"Get_SocksProductByOrderVendorDetailID_NewBackoffice").then((results3) => 
                         
                           // const objs = JSON.parse(result._bodyText)
                           results3.json().then(obj3 => {
                        
                         
                           if(results3.status == 200 || results3.status==201){
                
                         
                            for(var k=0;k<Object.keys(obj.data).length;k++){
                           
                                if(obj.data[k].fld_ordervendordetailid == obj3.data[0].fld_ordervendordetailid){
  
                                  // console.log(obj3.data[0])
              
                                  detOrder[k].VenDet.push(obj3.data[0])
                             
                                  // console.log(detOrder) 
                                  this.setState({
                                      VendorsOrderData : detOrder
                                  })
                                  Notiflix.Loading.Remove()
                                  // return setState({...state,extractData:true})
                      
                                }
                            }
                    
                           }
                        }))
                
                       
                    }
                
            
                }
               
       
                // console.log(obj.data)
            }))
      


        }

        

 getReportHandler(){

    if(this.state.startDate != ''){
        if(this.state.endDate != '')
        {

            // console.log(this.state.startDate)
            var filtdt = this.state.VendorsOrderData.filter(vendor => moment(moment(vendor.fld_odate).format('ll')).isBetween(moment(this.state.startDate).format('ll'),moment(this.state.endDate).format('ll')))

            // console.log(filtdt)
            this.setState({
                VendorsOrderDataFinal : filtdt
            })
        }else
        {
            Notiflix.Notify.Failure('Please enter end date.')
        }
    }else
    {
        this.setState({
            VendorsOrderDataFinal : this.state.VendorsOrderData
        })
    }

   
  }

  render()
  {
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
                <h4  class="col-12 mb-1 mt-0">Settlement Reports</h4>
                </div>

                <div class="col-sm-12 col-xl-6 d-flex justify-content-end">

                <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className='btn btn-primary'
                        table="table-to-xls"
                        filename={"SettlementReports"}
                        sheet="tablexls"
                        buttonText="Download as XLS"
                        style={{background: '#060a4a !important',
                            color: 'white'
                            
                        }}/>

                
            </div>

            </div> 
           


            <div className="card card-body  " role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast"  >

            <div className="row align-items-center">
             
                  <div className="col col-xl-12    col-sm-12">
                    
                    <div className="btn-toolbar py-1 ml-1 pl-5  sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right'}}>
                                                                                {this.DatePickers()}

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
                                                               <button  style={{border:"0px"}} onClick={()=>this.getReportHandler()} className='btn btn-primary'>Get Report</button>  
                                    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                    
                                                    </div>            
                                            {/* { DataTable()} */}


                                            <div class="row" style={{display: this.state.VendorsOrderDataFinal.length > 0 ? '' : 'none'}}>
            <div class="col-12">
                <div class="card visually-view" style={{overflow: 'auto'}}>
                    <div class="card-body">
                  
                    <div class="row">
            <div style={{marginBottom:"-11px"}} class="col-12">
                <div class="card">
                    <div class="card-body">
                   <div className="row" style={{marginBottom:'11px'}}>
                  
                         <div className="col-md-10">
                       
                         <div class="input-group">
                         <span style={{marginTop:'9px'}}>Search : </span>
                         &nbsp; &nbsp;<input type="text" class="form-control" placeholder="Search"
                         onChange={(text)=>{

                            var flt =  this.state.VendorsOrderData.filter(vendor => 
                                vendor.fld_customerordernumber.toLowerCase().includes(text.target.value.toLowerCase())
                                || vendor.fld_ordernumber.toLowerCase().includes(text.target.value.toLowerCase())
                                || vendor.fld_vendorname.toLowerCase().includes(text.target.value.toLowerCase())
                                || vendor.fld_name.toLowerCase().includes(text.target.value.toLowerCase())
                                || (vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_name.toLowerCase().includes(text.target.value.toLowerCase()) : '')
                                )

                                this.setState({
                                    VendorsOrderDataFinal : flt
                                })
                                


                         }}
                         />
                      
                       </div>
                         
                         </div>
                   </div>
                   
                    <table class="table" id="table-to-xls" >

                            <thead>
                                    <tr>
                <th>Customer Order Number</th>
                <th>Vendor Order Number</th>
                <th>Customer Order Date</th>
                <th>Vendor Name</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>MRP/Selling Price</th>
                <th>Product Total Cost</th>
                <th>Product Selling Price</th>
                <th>Total Selling Price</th>
                <th>Offer Discount</th>
                <th>Customer Price</th>
                <th>GST</th>
                <th>Gross Price</th>
                <th>GST Value</th>
                <th>Sale Invoice Amount</th>
                <th>TCS Amount</th>
                <th>TDS Amount</th>
                <th>Vendor GST Number</th>
                <th>State</th>
                <th>BMS Margin %</th>
                <th>Payment Mode</th>
                <th>BMS Margin Amount</th>
                <th>Vendor Split Amount</th>
                <th>BMS Split Amount</th>
                <th>Shipping Charges</th>
                <th>COD</th>
            
                
         
                </tr>
                </thead><tbody>
                    
                        {this.state.VendorsOrderDataFinal.map((vendor)=>(
        
                            <tr>
                                 {/* <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_name : ''}</td> */}
                                 <td>{vendor.fld_customerordernumber}</td>
                                 <td>{vendor.fld_ordernumber}</td>
                                <td>{moment(vendor.fld_odate).format('ll')}</td>
                                <td>{vendor.fld_vendorname}</td>
                                <td>{vendor.fld_name}</td>
                                <td>{vendor.fld_email}</td>
                                <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_name : ''}</td>
                                <td>{quan = vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''}</td>
                                <td>₹{sp = vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? vendor.fld_vendorsellingprice :vendor.fld_mrp :''}</td>
                                <td>₹{sp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')}</td>
                                <td>₹{vendor.fld_price}</td>
                                <td>₹{vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')}</td>
                                <td>{vendor.fld_offerpercent != null ? vendor.fld_offerpercent : 0}%</td>
                                <td>₹{parseFloat(vendor.fld_price-(vendor.fld_price*(vendor.fld_offerpercent/100))).toFixed(2)}</td>
                                <td>{vendor.fld_taxpercent}%</td>
                                
                                <td>₹{gross = parseFloat((((vendor.fld_price*quan)-(quan*vendor.fld_price*(vendor.fld_offerpercent/100)))/(100+vendor.fld_taxpercent))*100).toFixed(2)}</td>
                                <td>₹{(parseFloat((((vendor.fld_price*quan)-(quan*vendor.fld_price*(vendor.fld_offerpercent/100)))/(100+vendor.fld_taxpercent))*100)*(vendor.fld_taxpercent/100)).toFixed(2)}</td>
                                <td>₹{((parseFloat((((vendor.fld_price*quan)-(quan*vendor.fld_price*(vendor.fld_offerpercent/100)))/(100+vendor.fld_taxpercent))*100)*(vendor.fld_taxpercent/100))+((((vendor.fld_price*quan)-(quan*vendor.fld_price*(vendor.fld_offerpercent/100)))/(100+vendor.fld_taxpercent))*100)).toFixed(2)}</td>
                                <td>₹{parseFloat(gross*(vendor.fld_tcs/100)).toFixed(2)}</td>
                                <td>₹{parseFloat(gross*(vendor.fld_tds/100)).toFixed(2)}</td>
                                <td>{vendor.fld_vendorgstnum}</td>
                                <td>{vendor.fld_vendorgststate}</td>
                                <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent : ''}%</td>
                                <td>{vendor.fld_paymentmode}</td>
                                <td>₹{marg = parseFloat((sp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))*(vendor.VenDet[0] != undefined ? (vendor.VenDet[0].fld_marginpercent/100) : '')).toFixed(2)}</td>
                                <td>₹{vm = parseFloat((sp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))- marg - (gross*(vendor.fld_tcs/100)) - (gross*(vendor.fld_tds/100))).toFixed(2)}</td>
                                <td>₹{parseFloat(((vendor.fld_price*quan)-(quan*vendor.fld_price*(vendor.fld_offerpercent/100)))- vm).toFixed(2)}</td>
                                <td>{vendor.fld_shippingcharges}</td>
                                <td>{vendor.fld_coddeliverycharges}</td>
{/*                        
                 
                        <td>{vendor.fld_vendorgstnum}</td>
                        <td>{vendor.fld_vendorgststate}</td>
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_name : ''}</td>
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_sku[0] : ''}</td>
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''}</td>
                        <td>{vendor.fld_taxpercent}%</td>
                        <td>₹{vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')}</td>
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon : ''}</td>
                        <td>₹{vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')}</td>
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent : ''}%</td>
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent : ''}%</td>
                        <td>₹{vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')}</td>
                        <td>₹{parseFloat((vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))/(1+(vendor.fld_taxpercent/100))).toFixed(2)}</td>
                        <td>₹{parseFloat((vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))-((vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))/(1+(vendor.fld_taxpercent/100)))).toFixed(2)}</td>
                        <td>₹{parseFloat(((vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tcs/100)).toFixed(2)}</td>
                        <td>₹{parseFloat(((vendor.fld_price*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : ''))/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tds/100)).toFixed(2)}</td>
                        <td>₹{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) ).toFixed(2) : parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - ((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))).toFixed(2) : ''}</td>
                        <td>₹{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_vendorsellingprice-(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price).toFixed(2) : parseFloat(vendor.fld_mrp-vendor.fld_price).toFixed(2) : ''}</td>
                        <td>{vendor.fld_offerpercent != null ? vendor.fld_offerpercent : 0}%</td>
                        <td>₹{parseFloat(vendor.fld_price - (vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat((vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - (vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))).toFixed(2) : parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - ((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))).toFixed(2) : '')).toFixed(2)}</td>
                       
                        <td>{vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat((vendor.fld_vendorsellingprice*vendor.VenDet[0].fld_quantity)-(parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price - (vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) ).toFixed(2) : parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - ((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))) : '')) - ((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tcs/100)) - ((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tds/100))))).toFixed(2) :
                         parseFloat((vendor.fld_mrp*vendor.VenDet[0].fld_quantity)-(parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price - (vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) ).toFixed(2) : parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - ((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))) : '')) - ((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tcs/100)) - ((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tds/100))))).toFixed(2)
                        :''
                        }</td>
                        <td>₹{parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price - (vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) ).toFixed(2) : parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - ((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))) : '')) - ((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tcs/100)) - ((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tds/100))).toFixed(2)}</td>
    
                    */}
                    {/* <td>₹{parseFloat(((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tds/100))+((((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_price)/(1+(vendor.fld_taxpercent/100)))*(vendor.fld_tcs/100))+(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginon == 'Vendor Selling Price' ? parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_vendorsellingprice*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) ) : parseFloat(((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_marginpercent/100 : '')) - ((vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_quantity : '')*vendor.fld_mrp*(vendor.VenDet[0] != undefined ? vendor.VenDet[0].fld_discountpercent/100 : ''))) : '')).toFixed(2)}</td> */}
                        {/* <td>{vendor.VenDet != undefined && vendor.VenDet.length > 0  ?  parseFloat(((vendor.VenDet.map(data => (((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(vendor.fld_offerpercent == '' || vendor.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*vendor.fld_offerpercent/100))))*(vendor.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(vendor.fld_offerpercent == '' || vendor.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*vendor.fld_offerpercent/100))))*(vendor.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))))).toFixed(2) : 0}</td> */}

                    </tr>
                    
                        ))}
                   
       
               {/* BMSSplit={vendor.VenDet != undefined && vendor.VenDet.length > 0  ?  parseFloat(((vendor.VenDet.map(data => (((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(vendor.fld_offerpercent == '' || vendor.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*vendor.fld_offerpercent/100))))*(vendor.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(vendor.fld_offerpercent == '' || vendor.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*vendor.fld_offerpercent/100))))*(vendor.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))))).toFixed(2) : 0} */}
          
                
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
            </div>

</div>
    </div>
);
}
}




