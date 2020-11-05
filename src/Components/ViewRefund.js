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

class ViewInsurance extends Component {
   constructor(props){
    super(props)
    this.state={
        PageTitle : '1',
        Page1 : 'Pending',
        imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
           
        ReturnData : [],
        ProductName : ''
       

    }
   }
   
   componentDidMount() {
    const script = document.createElement("script");
    script.src = "/assets/js/pages/form-wizard.init.js";
    script.async = true;
    document.body.appendChild(script);
   
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
        //  #507dc0'
      });

      var dt = JSON.parse(localStorage.getItem('ReturnDetail'))

      console.log(dt)
      this.setState({
          ReturnData : dt
      })

      if(dt.fld_category == 'Food'){

        PostApiCall.postRequest({

            orderid : dt.fld_orderid,
            productid : dt.fld_productid
     
     },"GetFoodOrderDetail").then((results2) => 
     
       results2.json().then(obj2 => {
    
     
       if(results2.status == 200 || results2.status==201){

 

this.setState({
    ProductName : obj2.data[0].fld_prodname
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

 
this.setState({
    ProductName : obj2.data[0].fld_prodname
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
            ProductName : obj2.data[0].fld_prodname
        })
        

       }
    }))

    }

    }


OnClickCancel(){
    Notiflix.Loading.Dots()

    PostApiCall.postRequest({

        returndid : this.state.ReturnData.fld_id,
        orderdetailid : this.state.ReturnData.fld_orderdetailid,
        orderid : this.state.ReturnData.fld_orderid,
        status : 'Cancel'
 
 },"UpdateReturnStatus").then((results2) => 
 
   results2.json().then(obj2 => {

 
   if(results2.status == 200 || results2.status==201){

    Notiflix.Loading.Remove()
    Notiflix.Notify.Success('Return request has been cancelled.')
    window.location.href = '/returnmanagementlist'
   }
}
   ))

}

OnClickRefund(){

    Notiflix.Loading.Dots()

    PostApiCall.postRequest({

        returndid : this.state.ReturnData.fld_id,
        orderdetailid : this.state.ReturnData.fld_orderdetailid,
        orderid : this.state.ReturnData.fld_orderid,
        status : 'Initiated'
 
 },"UpdateReturnStatus").then((results2) => 
 
   results2.json().then(obj2 => {

 
   if(results2.status == 200 || results2.status==201){

    Notiflix.Loading.Remove()
    Notiflix.Notify.Success('Return request has been initiated.')
    window.location.href = '/returnmanagementlist'
   }
}
   ))


}

OnClickReplace(){


    Notiflix.Loading.Dots()

    PostApiCall.postRequest({

        returndid : this.state.ReturnData.fld_id,
        orderdetailid : this.state.ReturnData.fld_orderdetailid,
        orderid : this.state.ReturnData.fld_orderid,
        status : 'Replace'
 
 },"UpdateReturnStatus").then((results2) => 
 
   results2.json().then(obj2 => {

 
   if(results2.status == 200 || results2.status==201){

    Notiflix.Loading.Remove()
    Notiflix.Notify.Success('Item has been initiated for replacement.')
    window.location.href = '/returnmanagementlist'
   }
}
   ))

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
                                    <li class="breadcrumb-item"><a href="#">Return Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">View Return Detail</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">View Return Detail</h4>
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
                                               <label for="validationCustom05">Total </label>
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
                                             
                                        
                                           <div class="toast-body">
                                               <div class="row">
                                                   <div class="col-md-12">
                                                       <div class="row">
                                                     
                                                   <div class="col-md-4">
                                                   
                                                    <button class="btn btn-primary" style={{marginBottom:'2%',width:'100%'}} 
                                                  onClick={this.OnClickReplace.bind(this)}
                                                    > Initiate Replacement</button>
                                             
                                               </div> 
                                               <div class="col-md-4">
                                               <div>
                                                    <button class="btn btn-primary" style={{float: 'right',width:'100%'}} 
                                                       onClick={this.OnClickRefund.bind(this)}
                                                    > Initiate Refund</button>
                                                </div>
                                           </div> 
                                           <div class="col-md-4">
                                           <div>
                                                    <button class="btn btn-primary" style={{float: 'right',width:'100%'}} 
                                                        onClick={this.OnClickCancel.bind(this)}
                                                    > No Refund, No Replacement</button>
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

  export default ViewInsurance;
