import React, { Component, Fragment,useState } from 'react'
import PropTypes from 'prop-types'
import Notiflix from "notiflix";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import CustomersGrids from './CustomersGrids'
import CustomersExtraGrids from './CustomersExtraGrids'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GetApiCall from '../GetApi';


export default function Customers(props) {
    const [CustomeredData, setCustomeredData] = useState([])
const [state, setState] = useState({
    category:"No Category Selected",
    categoryValue:"No Category Selected",
   
    bannerShow:false,
    startDate:null,
    endDate:null,
    extractData:false


})
const {status,categoryValue,startDate,endDate,extractData}=state

const Dropdown=() =>{
        
      
    return(
        <div className="btn-group ">
        
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Select&nbsp;Customers&nbsp;Category&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"All Customers",category:"All Customers"})}} className="dropdown-item bg-white text-dark" >All Customers</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Products Ordered",category:"Products Ordered"})}} className="dropdown-item bg-white text-dark" >Product Ordered</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Products Not Orderd",category:"Products Not Ordered"})}} className="dropdown-item bg-white text-dark" >Product Not Ordered</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Items On Cart",category:"Items On Cart"})}} className="dropdown-item bg-white text-dark" >Items On Cart</button>

         </div>
      </div>
    )
}

const   DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold ' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={state.startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setState({...state,startDate:date,extractData:false})}
        selectsStart
        startDate={state.startDate}
        endDate={state.endDate}
        maxDate={state.endDate}
        isClearable
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold'  style={{display:'flex',marginLeft:'4px'}}>
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
if(state.categoryValue==="No Category Selected"){
    return   Notiflix.Notify.Failure('Select Report Type');
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
      
          GetApiCall.getRequest("GetCustomerDataReports").then(resultdes =>
            resultdes.json().then(obj => {
              setCustomeredData(obj.data)
              
    
               Notiflix.Loading.Remove()
                // console.log(obj.data)
            }))
         

      return  setState({...state,extractData:true})
       }
 
    
   
   }


   const DataTable=()=>{


    let totalOrdersPlaced=0;
    
   
        let    CustomerData=[]

        if(state.categoryValue==="All Customers"){
           
            if(state.startDate!==null&&state.endDate!==null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                 console.log(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
                          totalOrdersPlaced+=customer.fld_ordercount
                
                     return customer
                 }
                    

                 }
                 
                 )
              
            }
            else if(state.startDate===null&&state.endDate===null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                   
                        totalOrdersPlaced+=customer.fld_ordercount

                        return customer
                    
                })

            }





           }
        if(state.categoryValue==="Products Ordered"){
           
            if(state.startDate!==null&&state.endDate!==null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                 console.log(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
                  if(customer.fld_ordercount>0){
                    totalOrdersPlaced+=customer.fld_ordercount

                  return customer
                  }
                
             
                 }
                    

                 }
                 
                 )
              
            }
            else if(state.startDate===null&&state.endDate===null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                    if(customer.fld_ordercount>0){
                        totalOrdersPlaced+=customer.fld_ordercount

                        return customer
                        }
                })

            }




           }
        if(state.categoryValue==="Products Not Orderd"){
           
            if(state.startDate!==null&&state.endDate!==null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                 console.log(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
                    if(customer.fld_ordercount<=0){
                        totalOrdersPlaced+=customer.fld_ordercount

                        return customer
                        }
                 }
                    

                 }
                 
                 )
              
            }
            else if(state.startDate===null&&state.endDate===null) {
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                    if(customer.fld_ordercount<=0){
                        totalOrdersPlaced+=customer.fld_ordercount

                        return customer
                        }
                })

            }




           }
        if(state.categoryValue==="Items On Cart"){
           
            if(state.startDate!==null&&state.endDate!==null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                 console.log(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(customer.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){

                    if(customer.fld_cartcount>0){
                        totalOrdersPlaced+=customer.fld_ordercount

                        return customer
                        }
                 }
                    

                 }
                 
                 )
              
            }
            else if(state.startDate===null&&state.endDate===null){
                CustomerData=CustomeredData&&CustomeredData.filter(customer=>{
                    if(customer.fld_cartcount>0){
                        totalOrdersPlaced+=customer.fld_ordercount

                        return customer
                        }
                })

            }




           }

    if(state.extractData===true&&totalOrdersPlaced!==0){

    return     <table id="table-to-xls"  className="table table-hover table-nowrap mb-0  table-responsive">
                            <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                        
      <CustomersGrids  fromDate={state.startDate!==null?moment(state.startDate).format('ll') :"Date is not Selected"}  endDate={state.endDate!==null?moment(state.endDate).format('ll'):"Date is not Selected"} />


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
                <th>Customer Name</th>
                <th>Registration Date</th>
                <th>Mobile Number</th>
                <th>Email ID</th>
                <th>Date of Birth</th>
                <th>Ordered Placed</th>
                <th>Items on Cart</th>
                <th>Total Sales Done</th>

                </tr>
                </thead>
                        <tbody>
                            {CustomerData.map(customer=>{

                            return  <CustomersExtraGrids customerName={customer.fld_name} registrationDate={customer.fld_updatedon} mobileNum={customer.fld_mobile} 
                            email={customer.fld_mobile} dob={customer.fld_dob} orderedPlaced={customer.fld_ordercount} itemOnCart={customer.fld_ordercount} totalSales={customer.fld_orderamount}
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


    else if(state.extractData===true&&totalOrdersPlaced===0){
        return (
            <div class="row">
            <div class="col  col-12">
                <div class="card visually-view">
                    <div class="card-body">
                    <div class="jumbotron bg-light">
                     <h2 class="display-4">No Customer Reports Available</h2>
    
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
                                    <li class="breadcrumb-item active" aria-current="page">Customers
                                    </li>
                                </ol>
                            </nav>
                            </div>
                            </div>
                <div class="row page-title pt-0">
                <div class="col-sm-4 col-xl-6">
                <h4  class="col-12 mb-1 mt-0">Customers Reports</h4>
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

            <div className="row">
                <div className="col col-xl-6 col-sm-12">
                <div className="btn-toolbar py-1 pr-4 sw-toolbar sw-toolbar-top justify-content-left" style={{ float: 'right' }}>
                {Dropdown()}
                <input disabled={true} className="form-control-date ml-2" type='text' value={state.categoryValue} />
                                                                                </div>
                </div>
      
                <div className="col col-xl-6 col-sm-12">
                    
                    <div className="btn-toolbar py-1 pr-4 sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>
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
                    <button onClick={()=>getReportHandler()} className='btn btn-secondary sw-btn-next  btn-radius my-1'>Get Report</button>  


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


