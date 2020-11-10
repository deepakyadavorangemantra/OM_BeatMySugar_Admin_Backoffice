import React, { Component, Fragment, useEffect, useState } from 'react'
import Notiflix from "notiflix";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductsGrids from './ProductsGrids'
import ProductsExtraGrids from './ProductsExtraGrids'
import GetApiCall from '../GetApi';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment'


export default function Products() {

    const [FootsData, setFootsData] = useState([])
    const [FoodData, setFoodData] = useState([])
    const [SocksData, setSockssData] = useState([])
    const [state, setState] = useState({
        status:"No Status Selected",
        statusValue:"No Status Selected",
        category:"No Category Selected",
        categoryValue:"No Category Selected",
      
        proData:[],
        startDate:null,
        endDate:null,
        extractData:false
    
      
    })


const  Dropdown=() =>{
        
    return(
        <div className="btn-group mt-2">
        
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Select&nbsp;Report&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"All Items",status:"All Items"})}} className="dropdown-item bg-white text-dark" >All Items</button>
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"Fast Moving Items",status:"Fast Moving Items"})}} className="dropdown-item bg-white text-dark" >Fast Moving Items</button>
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"Non Moving Items",status:"Non Moving Items"})}} className="dropdown-item bg-white text-dark" >Non Moving Items</button>
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"Slow Moving Items",status:"Slow Moving Items"})}} className="dropdown-item bg-white text-dark" >Slow Moving Items</button>
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"Items Active On Website",status:"Items Active On Website"})}} className="dropdown-item bg-white text-dark" >Items Active On Website</button>
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"Items Not Approved",status:"Items Not Approved"})}} className="dropdown-item bg-white text-dark" >Items Not Approved</button>
          <button onClick={()=>{setState({...state,extractData:false,statusValue:"Items Approved",status:"Items Approved"})}} className="dropdown-item bg-white text-dark" >Items Approved</button>
          
         </div>
      </div>
    )
}

const   Dropdown2=() =>{
        
    return(
        <div className="btn-group mt-2 mr-2">
        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select&nbsp;Product&nbsp;Category&nbsp;
          <i class="fa fa-chevron-down" aria-hidden="true"></i>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Food",category:"Food"})}} className="dropdown-item bg-white text-dark" >Food</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Footware",category:"Footware"})}} className="dropdown-item bg-white text-dark" >Footware</button>
          <button onClick={()=>{setState({...state,extractData:false,categoryValue:"Socks",category:"Socks"})}} className="dropdown-item bg-white text-dark" >Socks</button>
          
         </div>
      </div>
    )
}


const   DatePickers=()=> {
    
    return (
        <>
     <li className='nav-item text-dark font-weight-bold mt-2 mr-1' style={{display:'flex'}}>  
   <span style={{marginTop:'9px'}}>From </span><DatePicker
        selected={state.startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date =>setState({...state,startDate:date,extractData:false})}
        selectsStart
        startDate={state.startDate}
        endDate={state.endDate}
        maxDate={state.endDate?state.endDate:new Date()}
        popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            }}}
        isClearable
     className="form-date-picker"
      />

      </li>
     <li className='nav-item text-dark font-weight-bold mt-2 mr-1'  style={{display:'flex'}}>
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


const    getReportHandler=()=>{
    if(state.statusValue==="No Status Selected"&&state.categoryValue==='No Category Selected'){
       setState({...state,extractData:false})
         
      return  Notiflix.Notify.Failure('Select Report And Select Category');
         
        }
   
    if(state.statusValue==="No Status Selected"&&state.categoryValue!=='No Category Selected'){
        setState({...state,extractData:false})
       
     return   Notiflix.Notify.Failure('Select Report');
         }
    if(state.statusValue!=="No Status Selected"&&state.categoryValue==='No Category Selected'){
        setState({...state,extractData:false})
       
     return   Notiflix.Notify.Failure('Select Category');
         }

    if(state.startDate===null&&state.endDate===null){
    setState({...state,extractData:true})
        
      
          
        }
     if(state.startDate!==null&&state.endDate!==null){
       setState({...state,extractData:true})

      
          
        }
    if(state.startDate!==null&&state.endDate===null){
       setState({...state,extractData:false})

        return   Notiflix.Notify.Failure('Enter "To" Date ');
        }
    if(state.startDate===null&&state.endDate!==null){
 setState({...state,extractData:false})

       return  Notiflix.Notify.Failure('Enter "Start" Date ');
      
          
        }

        else{
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
        
          
              Notiflix.Loading.Dots('Please wait...');
          
           
              GetApiCall.getRequest("GetSocksProductDataReports").then(resultdes =>
                resultdes.json().then(obj => {
                    setSockssData(obj.data)
                   
                   Notiflix.Loading.Remove()
                    // console.log(obj.data)
                }))
              GetApiCall.getRequest("GetFootwearProductDataReports").then(resultdes =>
                resultdes.json().then(obj => {
                    setFootsData(obj.data)
    
                   Notiflix.Loading.Remove()
                    // console.log(obj.data)
                }))
              GetApiCall.getRequest("GetFoodProductDataReports").then(resultdes =>
                resultdes.json().then(obj => {
                    setFoodData(obj.data)
    
                   Notiflix.Loading.Remove()
                    // console.log(obj.data)
                }))
            return    setState({...state,extractData:true})
        
        }
  
 
        
   }

 
  
   const DataTable=()=>{


    let ProductData=[]
    if(state.categoryValue==="Food"){
    if(state.statusValue==="All Items"){
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
             console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
    
            
                 return product
             }
                
    
             }
             
             )
          
        }
        else{
            ProductData=FoodData
        }
    
    }  
    else if(state.statusValue==="Fast Moving Items"){
         
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
            //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount>=5){
              
                return product
             }
                
    
             }
             
             )
          
        }   
        else{
            ProductData=FoodData.filter(product=>{
                if(product.fld_itemordercount>=5){
                    return product
                }
            })
        }
    
    
    
    }
    else if(state.statusValue==="Non Moving Items"){
         
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
            //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount<=0){
              
                return product
             }
                
    
             }
             
             )
          
        }   
        else{
            ProductData=FoodData.filter(product=>{
                if(product.fld_itemordercount<=0){
                    return product
                }
            })
        }
    
    
    
    }
    else if(state.statusValue==="Slow Moving Items"){
         
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
            //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount>0&&product.fld_itemordercount<5){
              
                return product
             }
                
    
             }
             
             )
          
        }   
        else{
            ProductData=FoodData.filter(product=>{
                if(product.fld_itemordercount>0&&product.fld_itemordercount<5){
                    return product
                }
            })
        }
    
    
    
    }
    else if(state.statusValue==="Items Active On Website"){
         
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
            //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_showonwebsite==='Yes'){
              
                return product
             }
                
    
             }
             
             )
          
        }   
        else{
            ProductData=FoodData.filter(product=>{
                if(product.fld_showonwebsite==='Yes'){
                    return product
                }
            })
        }
    
    
    
    }
    else if(state.statusValue==="Items Not Approved"){
         
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
            //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_approved==='No'){
              
                return product
             }
                
    
             }
             
             )
          
        }   
        else{
            ProductData=FoodData.filter(product=>{
                if(product.fld_approved==='No'){
                    return product
                }
            })
        }
    
    
    
    }
    else if(state.statusValue==="Items Approved"){
         
        if(state.startDate!==null&&state.endDate!==null){
            ProductData=FoodData.filter(product=>{
            //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
            if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_approved==='Yes'){
              
                return product
             }
                
    
             }
             
             )
          
        }   
        else{
            ProductData=FoodData.filter(product=>{
                if(product.fld_approved==='Yes'){
                    return product
                }
            })
        }
    
    
    
    }
    
    }
    
    
    if(state.categoryValue==="Footware"){
        if(state.statusValue==="All Items"){
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
        
                
                     return product
                 }
                    
        
                 }
                 
                 )
              
            }
            else{
                ProductData=FootsData
            }
        
        }  
        else if(state.statusValue==="Fast Moving Items"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount>=5){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else{
                ProductData=FootsData.filter(product=>{
                    if(product.fld_itemordercount>=5){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Non Moving Items"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount<=0){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else{
                ProductData=FootsData.filter(product=>{
                    if(product.fld_itemordercount<=0){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Slow Moving Items"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount>0&&product.fld_itemordercount<5){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else{
                ProductData=FootsData.filter(product=>{
                    if(product.fld_itemordercount>0&&product.fld_itemordercount<5){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Items Active On Website"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_showonwebsite==='Yes'){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else{
                ProductData=FootsData.filter(product=>{
                    if(product.fld_showonwebsite==='Yes'){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Items Not Approved"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_approved==='No'){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else{
                ProductData=FootsData.filter(product=>{
                    if(product.fld_approved==='No'){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Items Approved"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=FootsData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_approved==='Yes'){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else{
                ProductData=FootsData.filter(product=>{
                    if(product.fld_approved==='Yes'){
                        return product
                    }
                })
            }
        
        
        
        }
        
        }
    if(state.categoryValue==="Socks"){
        if(state.statusValue==="All Items"){
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))){
        
                
                     return product
                 }
                    
        
                 }
                 
                 )
              
            }
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData
            }
        
        }  
        else if(state.statusValue==="Fast Moving Items"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount>=5){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData.filter(product=>{
                    if(product.fld_itemordercount>=5){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Non Moving Items"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount<=0){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData.filter(product=>{
                    if(product.fld_itemordercount<=0){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Slow Moving Items"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_itemordercount>0&&product.fld_itemordercount<5){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData.filter(product=>{
                    if(product.fld_itemordercount>0&&product.fld_itemordercount<5){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Items Active On Website"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_showonwebsite==='Yes'){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData.filter(product=>{
                    if(product.fld_showonwebsite==='Yes'){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Items Not Approved"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_approved==='No'){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData.filter(product=>{
                    if(product.fld_approved==='No'){
                        return product
                    }
                })
            }
        
        
        
        }
        else if(state.statusValue==="Items Approved"){
             
            if(state.startDate!==null&&state.endDate!==null){
                ProductData=SocksData.filter(product=>{
                //  console.log(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll')));
                if(moment(moment(product.fld_updatedon).format('ll')).isBetween(moment(state.startDate).format('ll'),moment(state.endDate).format('ll'))&&product.fld_approved==='Yes'){
                  
                    return product
                 }
                    
        
                 }
                 
                 )
              
            }   
            else if(state.startDate===null&&state.endDate===null){
                ProductData=SocksData.filter(product=>{
                    if(product.fld_approved==='Yes'){
                        return product
                    }
                })
            }
        
        
        
        }
        
        }

  
   if(state.extractData===false){

    return(
         <div class="row">
        <div class="col  col-12">
           
            
              </div>
              </div>
    )

   }

    return(
        <table id="table-to-xls" className="table table-hover table-nowrap mb-0  table-responsive">
       {state.extractData===true&&ProductData.length===0?  <div class="row">
        <div class="col  col-12">
            <div class="card visually-view">
                <div class="card-body">
                <div class="jumbotron bg-light">
                 <h2 class="display-4">No Product Reports Present </h2>
         
   
               </div>
             
              </div>
              </div>
              </div>
              </div>:<Fragment>
           
        <div class="row">
            <div class="col-12">
                <div class="card visually-view">
                    <div class="card-body">
                  
             <ProductsGrids  fromDate={state.startDate!==null?moment(state.startDate).format('ll') :"Date is not Selected"}  endDate={state.endDate!==null?moment(state.endDate).format('ll'):"Date is not Selected"} 
                     />

                    </div>
                    </div>
                    </div>
                    </div>
                    <br/>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                  

                    <table class="table">

                        <thead>
                                <tr>
            <th>Item SKU</th>
            <th>Item Name</th>
            
            <th>Vendor</th>
            <th>MRP</th>
            <th>Discounted Price</th>
            <th>Discount %</th>
            <th>No. of Items Ordered</th>
            <th>Total Sales Done</th>
            </tr>
            </thead>
            <tbody> 
                {ProductData.map(product=>{
                   return <ProductsExtraGrids itemSku={product.fld_sku} itemName={product.fld_name}   NoofItemsOrdered={product.fld_itemordercount} 
                   MRP={product.fld_price} discountedPrice={product.fld_discountprice}
                   discountedPersent={product.fld_discountpercent} totalSalesDone={product.fld_itemsales}
                   vendorName={product.fld_vendorname}
                   />
                })}
           
             </tbody>
            </table>





                    </div>
                    </div>
                    </div>
                    </div>

           </Fragment>}
                    </table>
    )
}


    return (
       
        <div>
        <div class="content-page">
    
    <div class="content">
      <div class="container-fluid">
        
            <div class="row page-title">
                <div class="col-md-12 col-xl-12">
                    <nav aria-label="breadcrumb" class="float-right mt-2">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Reports</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Products
                            </li>
                        </ol>
                    </nav>


                 
                </div>
            </div> 



            <div class="row page-title align-items-center pt-0">
            <div class="col-sm-4 col-xl-6">
            <h4  class="col-12 mb-1 mt-0">Product Reports</h4>
      </div>
        <div class="col-sm-8 col-xl-6 d-flex justify-content-end">

                <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className={"btn btn-primary"}
                // className={banner===false&&startDate!==null&&endDate!==null?"bg-dark text-white py-2 rounded":"bg-dark text-white py-2 rounded d-none"}
                table="table-to-xls"
                filename={"ProductReports"}
                sheet="tablexls"
                buttonText="Download as XLS"
                style={{background: '#060a4a !important',
                    color: 'white'
                    
                }}/>

               
        </div>
        </div>

         



        <div className="card card-body" role="alert" aria-live="assertive" aria-atomic="true" data-toggle="toast"  >

            <div className="row w-100">
                <div className="">
                    <div className="btn-toolbar d-inline-flex
                    sw-toolbar sw-toolbar-top" >
                        {Dropdown()}   
                        <input disabled={true} style={{marginTop:"9px", width:"8rem"}} className="form-control-daters mx-2" type='text' value={state.status} />             
                    </div>                    
                </div>

                <div className="">
                    <div className="btn-toolbar sw-toolbar sw-toolbar-top" >
                    {Dropdown2()}  
                    <input disabled={true} style={{marginTop:"9px"}} className="form-control-daters mr-2" type='text' value={state.category} />                                                  
                    </div>
                </div>

                <div className="ml-2">
                    
                    <div className="btn-toolbar sw-toolbar sw-toolbar-top " style={{ float: 'right'}}>
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

    )
}
