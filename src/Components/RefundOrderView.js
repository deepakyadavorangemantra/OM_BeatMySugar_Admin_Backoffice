import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';


const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input
      accept="image/*"
      disabled
      id="photo-upload" type="file" onChange={onChange}/> 
    </label>

class RefundOrderView extends Component {
   constructor(props){
    super(props)
    this.state={
        PageTitle : '1',
        Page1 : 'Pending',
        imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
           

           
        DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
        NumRegex: /^[0-9]*$/,
        AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
        EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,


        ReturnData : [],
        ProductName : '',

        TotalAmount : 0,
        BMSRefund : 0,
        VendorRefund : 0,



        PaymentData : [],
        ProdData : []
       

    }
   }
   
   componentDidMount() {
    const script = document.createElement("script");
    script.src = "/assets/js/pages/form-wizard.init.js";
    script.async = true;
    document.body.appendChild(script);
   
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
      });

      var dt = JSON.parse(localStorage.getItem('RefundSettle'))

      console.log(dt)
      this.setState({
          ReturnData : dt
      })


      PostApiCall.postRequest({

        orderid : dt.fld_orderid,
 
 },"GetPaymentSplitFromOrder").then((results2) => 
 
   results2.json().then(obj2 => {

 
   if(results2.status == 200 || results2.status==201){

    for(var i = 0 ;i<Object.keys(obj2.data).length;i++){
        if(dt.fld_merchantid == obj2.data[i].fld_merchantid){
            this.setState({
                PaymentData : obj2.data[i]
            })
        }
    }
  
   }
}))


      if(dt.fld_category == 'Food'){

        PostApiCall.postRequest({

            orderid : dt.fld_orderid,
            productid : dt.fld_productid
     
     },"GetFoodOrderDetail").then((results2) => 
     
       results2.json().then(obj2 => {
    
     
       if(results2.status == 200 || results2.status==201){

 

this.setState({
    ProductName : obj2.data[0].fld_prodname,
    ProdData : obj2.data[0]
})

       }
    }))

    }else if(dt.fld_category == 'Footwear'){


        PostApiCall.postRequest({

            orderid : dt.fld_orderid,
            productid : dt.fld_productid
     
     },"GetFootwearOrderDetail").then((results2) => 
     
       results2.json().then(obj2 => {
    
     
       if(results2.status == 200 || results2.status==201){

        console.log(obj2.data[0])
 
this.setState({
    ProductName : obj2.data[0].fld_prodname,
    ProdData : obj2.data[0]
})


       }
    }))

    }else if(dt.fld_category == 'Socks'){


        PostApiCall.postRequest({

            orderid : dt.fld_orderid,
            productid : dt.fld_productid
     
     },"GetSocksOrderDetail").then((results2) => 
     
       results2.json().then(obj2 => {
    
     
       if(results2.status == 200 || results2.status==201){


        this.setState({
            ProductName : obj2.data[0].fld_prodname,
            ProdData : obj2.data[0]
        })
        

       }
    }))

    }

    }




OnClickRefund(){

    if(this.state.TotalAmount != 0){
        if(this.state.BMSRefund != 0){
            if(this.state.VendorRefund != 0){
        
           var ttl = (parseFloat(this.state.BMSRefund)+parseFloat(this.state.VendorRefund))
           var prc = (parseFloat(this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity).toFixed(2))

    if(this.state.TotalAmount <= prc)
    {
        if( ttl<= (this.state.TotalAmount))
{
    Notiflix.Loading.Dots()


    PostApiCall.postRequest({

      paymentid : this.state.PaymentData.fld_paymentid,
      refundAmount : this.state.TotalAmount,
      refundType : 1,
      merchantId : this.state.ReturnData.fld_merchantid,
      merchantAmount : this.state.VendorRefund,
      aggregatorAmount : this.state.BMSRefund
      
 
 },"AddPaymentRefund").then((results2) => 
 
   results2.json().then(obj2 => {

 
   if(results2.status == 200 || results2.status==201){

    PostApiCall.postRequest({

        returndid : this.state.ReturnData.fld_id,
        orderdetailid : this.state.ReturnData.fld_orderdetailid,
        orderid : this.state.ReturnData.fld_orderid,
        status : 'Refunded'
 
 },"UpdateReturnStatus").then((results) => 
 
   results.json().then(obj => {

 
   if(results.status == 200 || results.status==201){

    Notiflix.Loading.Remove()
    Notiflix.Notify.Success('Refund has been initiated.')
    window.location.href = '/refundorders'
   }
}
   ))
   }
}
   ))

}else{
    Notiflix.Notify.Failure('Refund of BMS & vendor exceeds total refund amount.')
}

}else
{
    Notiflix.Notify.Failure('Refund Amount cannot be greater than total product price.')
}

}else
{
Notiflix.Notify.Failure('Please enter Vendor Refund Amount.')
}
}else
{
    Notiflix.Notify.Failure('Please enter BMS Refund Amount.')
}
}else
{
    Notiflix.Notify.Failure('Please enter Total Refund Amount.')
}

}



   render(){
       return(
        <div className="App">
        <div id="wrapper">
        <div className="content-page">
            <div class="content">
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Settlement Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Order To Be Refund</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Order To Be Refund</h4>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div id="smartwizard-arrows">
                                    <ul>
                                        <li className={this.state.PageTitle == '1' ? 'active nav-item' : this.state.Page1 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {
                                            this.setState({
                                                PageTitle: '1',
                                                Page1: 'Done'
                                            })
                                        }} class="wizardlist nav-link">Return Details</a></li>

                                       </ul>
                                       <div className="p-3" style={{ minHeight: '0px' }}>
                                       <div id="sw-arrows-step-1"
                                           className="tab-pane step-content"
                                           style={{ display: this.state.PageTitle == '1' ? 'block' : 'none' }}
                                       >
                                           <form className="needs-validation" novalidate onSubmit={(e) => {
                                               e.preventDefault()
                                           }}>
                                      
                                           <div className="toast fade show" role="alert" aria-live="assertive"
                                                   aria-atomic="true" data-toggle="toast">
                                                   <div class="toast-header">
                                                       <strong class="mr-auto">Order Detail</strong>
                                                   </div>
                                                   <div class="toast-body">
                                                       <div class="row">
                                                           <div class="col-md-12">
                                                               <div class="row">
                                                               <div class="col-md-6">
                                                               <div class="form-group mb-2">
                                                                   <label for="validationCustom05">Order Number</label>
                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                   disabled
                                                                   value={this.state.ReturnData.fld_ordernumber}
                                                                   />
                                                                   
                                                               </div>
                                                           </div> 
                                                           <div class="col-md-6">
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">Order Date</label>
                                                               <input type="text" class="form-control" id="validationCustom05"
                                                                  disabled
                                                                  value={this.state.ReturnData.fld_orderdate}
                                                              />
                                                               
                                                           </div>
                                                       </div> 
                                                      
                                                 
                                                  </div>
                                                               

                                                               
                                                           </div> {/* end col-md-12 */}
                                                           
                                                       </div>
                                                    
                                                   </div>
                                               </div>

                                               <div className="toast fade show" role="alert" aria-live="assertive"
                                               aria-atomic="true" data-toggle="toast">
                                                 
                                               <div class="toast-header">
                                               <strong class="mr-auto">Customer Detail</strong>
                                           </div>
                                               <div class="toast-body">
                                                   <div class="row">
                                                       <div class="col-md-12">
                                                           <div class="row">
                                                         
                                                       <div class="col-md-4">
                                                       <div class="form-group mb-2">
                                                           <label for="validationCustom05">Name</label>
                                                          <input type="text" class="form-control"
                                                             disabled
                                                             value={this.state.ReturnData.fld_name}
                                                         />
                                                           
                                                       </div>
                                                   </div> 
                                                   <div class="col-md-4">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Mobile</label>
                                                      <input type="text" class="form-control"
                                                         disabled
                                                         value={this.state.ReturnData.fld_mobile}
                                                     />
                                                       
                                                   </div>
                                               </div> 
                                               <div class="col-md-4">
                                               <div class="form-group mb-2">
                                                   <label for="validationCustom05">Email</label>
                                                  <input type="text" class="form-control"
                                                     disabled
                                                     value={this.state.ReturnData.fld_email}
                                                 />
                                                   
                                               </div>
                                           </div> 
                                                            
                                                           </div>
                                                           

                                                           
                                                       </div> {/* end col-md-12 */}
                                                       
                                                   </div>
                                                
                                               </div>
                                           </div>

                                           <div className="toast fade show" role="alert" aria-live="assertive"
                                           aria-atomic="true" data-toggle="toast">
                                             
                                           <div class="toast-header">
                                           <strong class="mr-auto">Product Detail</strong>
                                       </div>
                                           <div class="toast-body">
                                               <div class="row">
                                                   <div class="col-md-12">
                                                       <div class="row">
                                                     
                                                   <div class="col-md-4">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Item Name</label>
                                                      <input type="text" class="form-control"
                                                       disabled
                                                       value={this.state.ProductName}
                                                     />
                                                       
                                                   </div>
                                               </div> 
                                               <div class="col-md-2">
                                               <div class="form-group mb-2">
                                                   <label for="validationCustom05">Price</label>
                                                  <input type="text" class="form-control"
                                                   disabled
                                                   value={this.state.ReturnData.fld_price}
                                                 />
                                                   
                                               </div>
                                           </div> 
                                           <div class="col-md-2">
                                           <div class="form-group mb-2">
                                               <label for="validationCustom05">Quantity</label>
                                              <input type="text" class="form-control"
                                               disabled
                                               value={this.state.ReturnData.fld_quantity}
                                             />
                                               
                                           </div>
                                       </div> 

                                       <div class="col-md-2">
                                           <div class="form-group mb-2">
                                               <label for="validationCustom05">Offer Amount</label>
                                              <input type="text" class="form-control"
                                               disabled
                                               value={parseFloat((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)*(this.state.ReturnData.fld_offerpercent/100)).toFixed(2)}
                                             />
                                               
                                           </div>
                                       </div> 

                                                     <div class="col-md-2">
                                           <div class="form-group mb-2">
                                               <label for="validationCustom05">Total</label>
                                              <input type="text" class="form-control"
                                               disabled
                                               value={parseFloat((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)-((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)*(this.state.ReturnData.fld_offerpercent/100))).toFixed(2)}
                                               />
                                               
                                           </div>
                                       </div>       
                                                       </div>
                                                       

                                                       
                                                   </div> {/* end col-md-12 */}
                                                   
                                               </div>
                                            
                                           </div>
                                       </div>
                                           
                                       <div className="toast fade show" role="alert" aria-live="assertive"
                                       aria-atomic="true" data-toggle="toast">
                                         
                                       <div class="toast-header">
                                       <strong class="mr-auto">Return Detail</strong>
                                   </div>
                                       <div class="toast-body">
                                           <div class="row">
                                               <div class="col-md-12">
                                                   <div class="row">
                                                   <div class="col-md-4">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Product Image</label>
                                                       <div class="div1">
                                                       <ImgUpload onChange={this.photoUpload} src={this.state.ReturnData.fld_productphoto}/>
                                                      </div>
                                                       
                                                   </div>
                                               </div> 
                                                <div className="col-md-8"> 
                                             <div className="row">
                                             <div class="col-md-12">
                                             <div class="form-group mb-2">
                                                 <label for="validationCustom05">Reason</label>
                                                <input type="text" class="form-control"
                                                   disabled
                                                   value={this.state.ReturnData.fld_reasonforreturn}
                                               />
                                                 
                                             </div>
                                         </div> 
                                         <div class="col-md-12">
                                         <div class="form-group mb-2">
                                             <label for="validationCustom05">Comment</label>
                                            <textarea type="text" class="form-control" row="4"
                                               disabled
                                               value={this.state.ReturnData.fld_comment}
                                           />
                                             
                                         </div></div>
                                       </div> 
                                       </div>
                                        </div>
                                                   

                                                   
                                               </div> {/* end col-md-12 */}
                                               
                                           </div>
                                        
                                       </div>
                                   </div>
                                       


                                   <div className="toast fade show" role="alert" aria-live="assertive"
                                           aria-atomic="true" data-toggle="toast">
                                             
                                           <div class="toast-header">
                                           <strong class="mr-auto">Refund Amount Details</strong>
                                       </div>
                                           <div class="toast-body">
                                               <div class="row">
                                                   <div class="col-md-12">
                                                       <div class="row">

                                                       <div class="col-md-6">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">BMS Margin Amount</label>
                                                      <input type="text" class="form-control"
                                                       disabled
                                                       value={parseFloat(((((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100))-(this.state.ReturnData.fld_offerpercent == '' || this.state.ReturnData.fld_offerpercent == null ? 0 : ((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100)))*this.state.ReturnData.fld_offerpercent/100)))+((((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100))-(this.state.ReturnData.fld_offerpercent == '' || this.state.ReturnData.fld_offerpercent == null ? 0 : ((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100)))*this.state.ReturnData.fld_offerpercent/100)))*(this.state.ReturnData.fld_taxpercent/100)))-((this.state.ProdData.fld_marginon == 'Vendor Selling Price' ? (this.state.ReturnData.fld_vendorsellingprice-((this.state.ProdData.fld_marginon == 'Vendor Selling Price' ? (this.state.ReturnData.fld_vendorsellingprice*(this.state.ProdData.fld_marginpercent/100)) : (this.state.ReturnData.fld_mrp*(this.state.ProdData.fld_marginpercent/100))))) : (this.state.ReturnData.fld_mrp-((this.state.ProdData.fld_marginon == 'Vendor Selling Price' ? (this.state.ReturnData.fld_vendorsellingprice*(this.state.ProdData.fld_marginpercent/100)) : (this.state.ReturnData.fld_mrp*(this.state.ProdData.fld_marginpercent/100)))))) - ((((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100)))*(this.state.ProdData.fld_tcs/100))) - ((((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100)))*(this.state.ProdData.fld_tds/100))))).toFixed(2)}
                                                       
                                                     />
                                                       
                                                   </div>
                                               </div> 

                                                <div class="col-md-6">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Vendor Margin Amount</label>
                                                      <input type="text" class="form-control"
                                                       disabled
                                                       value={parseFloat((this.state.ProdData.fld_marginon == 'Vendor Selling Price' ? (this.state.ReturnData.fld_vendorsellingprice-((this.state.ProdData.fld_marginon == 'Vendor Selling Price' ? (this.state.ReturnData.fld_vendorsellingprice*(this.state.ProdData.fld_marginpercent/100)) : (this.state.ReturnData.fld_mrp*(this.state.ProdData.fld_marginpercent/100))))) : (this.state.ReturnData.fld_mrp-((this.state.ProdData.fld_marginon == 'Vendor Selling Price' ? (this.state.ReturnData.fld_vendorsellingprice*(this.state.ProdData.fld_marginpercent/100)) : (this.state.ReturnData.fld_mrp*(this.state.ProdData.fld_marginpercent/100)))))) - ((((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100)))*(this.state.ProdData.fld_tcs/100))) - ((((this.state.ReturnData.fld_price*this.state.ReturnData.fld_quantity)/(1+(this.state.ReturnData.fld_taxpercent/100)))*(this.state.ProdData.fld_tds/100)))).toFixed(2)}
                                                       
                                                     />
                                                       
                                                   </div>
                                               </div> 
                                                     
                                                   <div class="col-md-4">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Total Refund Amount</label>
                                                      <input type="text" class="form-control"
                                                       
                                                       value={this.state.TotalAmount}
                                                       onChange={(text)=>{

                                                        if(this.state.DecimalRegex.test(text.target.value))
                                                        {
                                                        this.setState({
                                                            TotalAmount : text.target.value
                                                        })
                                                        }

                                                       }}
                                                     />
                                                       
                                                   </div>
                                               </div>  
                                               <div class="col-md-4">
                                               <div class="form-group mb-2">
                                                   <label for="validationCustom05">Refund Amount from BMS Margin</label>
                                                  <input type="text" class="form-control"
                                                 value={this.state.BMSRefund}
                                                 onChange={(text)=>{

                                                    if(this.state.DecimalRegex.test(text.target.value))
                                                    {
                                                  this.setState({
                                                      BMSRefund : text.target.value
                                                  })
                                                }

                                                 }}
                                                 />
                                                   
                                               </div>
                                           </div> 
                                           <div class="col-md-4">
                                           <div class="form-group mb-2">
                                               <label for="validationCustom05">Refund Amount from Vendor Margin</label>
                                              <input type="text" class="form-control"
                                               value={this.state.VendorRefund}
                                               onChange={(text)=>{

                                                if(this.state.DecimalRegex.test(text.target.value))
                                                {
                                                this.setState({
                                                    VendorRefund : text.target.value
                                                })
                                               }

                                               }}
                                             />
                                               
                                           </div>
                                       </div> 

                                                
                                                       </div>
                                                       

                                                       
                                                   </div> {/* end col-md-12 */}
                                                   
                                               </div>
                                            
                                           </div>
                                       </div>
                                           
                                              
                                     

                                          <div className="toast fade show" role="alert" aria-live="assertive"
                                           aria-atomic="true" data-toggle="toast">
                                             
                                        
                                           <div class="toast-body">
                                               <div class="row">
                                                   <div class="col-md-12">
                                                       <div class="row">
                                               
                                           <div class="col-md-12">
                                           <div>
                                                    <button class="btn btn-primary" style={{float: 'right'}} 
                                                        onClick={this.OnClickRefund.bind(this)}
                                                    >Release Refund</button>
                                                </div>
                                       </div> 
                                                        
                                                       </div>
                                                       

                                                       
                                                   </div> {/* end col-md-12 */}
                                                   
                                               </div>
                                            
                                           </div>
                                       </div>
                                                 
                                            
                                         
                                           </form>
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

       )
   }
}

  export default RefundOrderView;
