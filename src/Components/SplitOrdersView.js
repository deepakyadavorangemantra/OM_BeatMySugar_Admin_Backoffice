/* eslint-disable no-loop-func */
import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "../Api";
import Notiflix from "notiflix";
import GetApiCall from '../GetApi'
import moment from 'moment'

var vend = [];
var selPro = []

class SplitOrdersView extends React.Component
{

    constructor(props){
        super(props)
        this.state={
           
          ShippingAddress : [],
          BillingAddress : [],
          CartData : [],
          CartDataVendor : [],
          SummaryData : [],
          OfferData : [],


          MainOrder : [],
          VendorData : [],
          VendorSelectedData : [],
          ExtraChargeVendor : '',


            NumRegex: /^0|[0-9]\d*$/,
            MobileRegex: /^[0-9]*$/,
            AlphaNumericRegex: /^[a-zA-Z0-9]*$/,
            SpecialRegex: /[-!$%^&*()_+|~=`"{}\[\]:\/;<>?,.@#]/,
            EmailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      


            VendorOrders : [],
            VendorOrderDetail : []

        }
    }




    componentDidMount(){

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

      

    var ordermain = JSON.parse(localStorage.getItem('OrderToBeSplitData'))
   
    // console.log(ordermain)

    this.setState({
        MainOrder : ordermain
    })


    PostApiCall.postRequest({

        orderid : ordermain.fld_orderid,
 
 },"GetOrderDetail").then((results1) => 
 
   // const objs = JSON.parse(result._bodyText)
   results1.json().then(obj1 => {

 
   if(results1.status == 200 || results1.status==201){


    var dt = []
    for(var i =0 ;i<Object.keys(obj1.data).length;i++){

        // console.log(obj1.data[i].fld_productid)
        if(obj1.data[i].fld_category == 'Food'){

            PostApiCall.postRequest({

                orderid : ordermain.fld_orderid,
                productid : obj1.data[i].fld_productid
         
         },"GetFoodOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

        
            dt.push(obj2.data[0])
              this.setState({
        CartData : dt
    })
    
           }
        }))

        }else if(obj1.data[i].fld_category == 'Footwear'){


            PostApiCall.postRequest({

                orderid : ordermain.fld_orderid,
                productid : obj1.data[i].fld_productid
         
         },"GetFootwearOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

       
            dt.push(obj2.data[0])
              this.setState({
        CartData : dt
    })
    
           }
        }))

        }else if(obj1.data[i].fld_category == 'Socks'){


            PostApiCall.postRequest({

                orderid : ordermain.fld_orderid,
                productid : obj1.data[i].fld_productid
         
         },"GetSocksOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

         
            dt.push(obj2.data[0])
              this.setState({
        CartData : dt
    })
    
           }
        }))

        }
 

    }

   }
}))


PostApiCall.postRequest({

    orderid : ordermain.fld_orderid,

},"Get_OrderVendorByOrderID").then((results1) => 

// const objs = JSON.parse(result._bodyText)
results1.json().then(obj1 => {


if(results1.status == 200 || results1.status==201){

    console.log(obj1.data)
    this.setState({
        VendorOrders : obj1.data
    })

    var detOrder = []
    var ind = 0
    for(var i =0 ;i <Object.keys(obj1.data).length;i++){

        ind = i
       detOrder.push(obj1.data[i])
       detOrder[i].VenDet = []

        PostApiCall.postRequest({

            vendororderid : obj1.data[i].fld_ordervendorid
        
        },"Get_OrderVendorDetailByOrderVendorID_NewBackoffice").then((results2) => 
        
        // const objs = JSON.parse(result._bodyText)
        results2.json().then(obj2 => {
        
        
        if(results2.status == 200 || results2.status==201){

            // console.log(obj2.data)

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
              for(var k=0;k<Object.keys(obj1.data).length;k++){
               
                  if(obj1.data[k].fld_verdorid == obj3.data[0].fld_vendorid){

                    detOrder[k].VenDet.push(obj3.data[0])
               
                    // console.log(detOrder)
                  this.setState({
                    VendorOrders : detOrder
        })
        
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
    
           
                for(var k=0;k<Object.keys(obj1.data).length;k++){
                    if(obj1.data[k].fld_verdorid == obj3.data[0].fld_vendorid){
  
                      detOrder[k].VenDet.push(obj3.data[0])
                      
                    this.setState({
                      VendorOrders : detOrder
          })
          
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
    
             
                for(var k=0;k<Object.keys(obj1.data).length;k++){
                    if(obj1.data[k].fld_verdorid == obj3.data[0].fld_vendorid){
  
                      detOrder[k].VenDet.push(obj3.data[0])
                    this.setState({
                      VendorOrders : detOrder
          })
          
                    }
                }
        
               }
            }))
    
            }
        }
    }))

    }
}


}))



      
    }

 




    render()
    {
        return (
            <div>
                <Menu></Menu>
                <div class="content-page">
            
            <div class="content">
              <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Settlement Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">View Order To Split
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">View Order To Split
                            </h4>
                        </div>
                    </div> 

                              <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">   
            <table style={{width:"1000px", textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', bottom: '0px', borderRightColor:
                 "#000", borderCollapse: 'collapse',marginBottom:'0px'}} border="1" cellspacing="0" cellpadding="0">
              <tbody>
                        <tr>
                            <td colspan="2" style={{width:'20%',verticalAlign:'middle'}}><img src="http://www.beatmysugar.com/assets/images/bms-logo.png" style={{width: '50%',marginRight:'auto',marginLeft:'auto', verticalAlign: "middle"}}/> </td>
                            <td colspan="8" style={{width:'80%'}}> <h2 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bold'}}>
                             BeatMySugar</h2><p style={{textAlign: 'center'}}>Rx Health Management India Pvt Ltd<br/>
         
         12th Floor, Puri 81 Business Hub,
         
         <br/>Sec-81, Faridabad,
         
         Haryana - 121 001. INDIA.</p>
                                   <tr rowspan="8" class="success" style={{display:'table',width:'100%',  backgroundColor: '#f7f7f7'}}>
                                <td colspan="8" style={{textAlign: 'right', paddingRight: '1%', fontWeight: 'bold', fontSize: '20px',}}>
                                   Customer Order Form</td></tr></td>
                        </tr>
         
                              
                        <tr style={{textAlign:"center"}}> 
                          <td colspan="1" style={{textAlign: 'left', paddingLeft: '1%', paddingTop: '1%', paddingBottom: '1%'}}>
                                <span style={{fontWeight: 'bold', fontSize: '16px'}}>Order Date</span></td>
                          <td colspan="3" style={{textAlign: 'left', paddingLeft: '1%', paddingTop: '1%', paddingBottom: '1%'}}>
                            {this.state.MainOrder.fld_orderdate}</td>
                          <td colspan="3" style={{textAlign: 'left', paddingLeft: '1%', paddingTop: '1%', paddingBottom: '1%'}}>
                                <span style={{fontWeight: 'bold', fontSize: '16px'}}>Customer PO No.</span>
                                </td>
        <td colspan="4" style={{textAlign: 'left', paddingLeft: '1%', paddingTop: '1%', paddingBottom: '1%'}}>{this.state.MainOrder.fld_ordernumber}</td>
         
                        </tr>                  
         
         
                        <tr class="success" style={{backgroundColor: '#f7f7f7'}}>
                            <td colspan="4" style={{paddingTop: '1%', paddingLeft: '1%',paddingBottom: '1%', fontWeight: 'bold', fontSize: '15px',textAlign:'center'}}>Billing 
                            Address</td>
                          <td colspan="4" style={{paddingTop: '1%', paddingLeft: '1%',paddingBottom: '1%', fontWeight: 'bold', fontSize: '15px',textAlign:'center'}}>Shipping Address</td>
                       </tr>
                        <tr>
                          <td colspan="4" style={{textAlign: 'left', paddingLeft: '1%', paddingTop: '1%', paddingBottom: '1%'}}>
                         <span style={{fontWeight: 'bold', fontSize: '18px'}}>{this.state.MainOrder.fld_billingname}</span><p>{this.state.MainOrder.fld_billingaddress}
                                <br/>{this.state.MainOrder.fld_billingstreet}<br/>{this.state.MainOrder.fld_billingcity} {this.state.MainOrder.fld_billingpincode}, {this.state.MainOrder.fld_billingstate}, {this.state.MainOrder.fld_billingcountry}.<br/>Landmark: {this.state.MainOrder.fld_billinglandmark}
                               <br/>Mobile Number: ( +91 {this.state.MainOrder.fld_billingmobile})</p></td>
         
                               <td colspan="4" style={{textAlign: 'left', paddingLeft: '1%', paddingTop: '1%', paddingBottom: '1%'}}>
                               <span style={{fontWeight: 'bold', fontSize: '18px'}}>{this.state.MainOrder.fld_shippingname}</span><p>{this.state.MainOrder.fld_deliveryaddress}
                               <br/>{this.state.MainOrder.fld_shippingstreet}<br/>{this.state.MainOrder.fld_shippingcity} {this.state.MainOrder.fld_shippingpincode}, {this.state.MainOrder.fld_shippingstate}, {this.state.MainOrder.fld_shippingcountry}.<br/>Landmark: {this.state.MainOrder.fld_shippinglandmark}
                              <br/>Mobile Number: ( +91 {this.state.MainOrder.fld_shippingmobile})</p></td>
                        </tr>
         
                    </tbody>
                </table>
                    <table style={{width:'1000px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', borderRightColor:
                         '#000', borderTop: 'hidden',marginBottom:'0px'}} border="1" cellspacing="0" cellpadding="0">
              <tbody>
                        
                   
              <tr class="success" style={{backgroundColor: '#f7f7f7'}}>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}> 
              S.No</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>HSN Code</span></td>

              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold',width:'20%'}}> 
              Product</span></td>
              {/* <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}> 
              Brand</span></td> */}
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Quantity</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Base Value</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Offer Discount</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Net Value</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>GST Rate</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>GST Amount</span></td>
              {/* <td style={{paddingTop: '1%', paddingBottom: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>GST Amount</span></td> */}
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Total Amount(INR)</span></td>
              </tr>
        
    {this.state.CartData.map((info,index)=>(

<tr>

    <td style={{width:'6%',padding: '5px'}}>{index+1}.</td>
    <td style={{width:'8%',padding: '5px'}}>{info.fld_hsncode}</td>
    <td style={{width:'30%',padding: '5px'}}>{info.fld_prodname}  <br/><b>{info.fld_brand}</b></td>
    <td style={{width:'7%',padding: '5px'}}>{info.fld_quantity}</td>
    <td style={{width:'9%',padding: '5px'}}>&#8377;{parseFloat((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))).toFixed(2)}</td>
    <td style={{width:'8%',padding: '5px'}}> {this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? '-' : '₹ '+parseFloat(((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100).toFixed(2)}</td>
    <td style={{width:'8%',padding: '5px',whiteSpace:'nowrap'}}>&#8377; {parseFloat((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))).toFixed(2)}</td>
    <td style={{width:'8%',padding: '5px',whiteSpace:'nowrap'}}>{info.fld_taxpercent}%</td>
     {/* <td></td> */}
    <td style={{padding: '5px',whiteSpace:'nowrap'}}> &#8377; {parseFloat((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(info.fld_taxpercent/100)).toFixed(2)}</td>
    <td style={{padding: '5px',whiteSpace:'nowrap'}}> &#8377; {parseFloat((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(info.fld_taxpercent/100))).toFixed(2)}</td>
    
   
  </tr>
    
    ))}
            
         
                    </tbody>
                </table>
         
                <table style={{width:'1000px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', borderRightColor:
                         '#000', borderTop: 'hidden'}} border="1" 
                         cellspacing="1" cellpadding="0"
                         >
              <tbody>
         
                        <tr style={{width:'100%'}}>
                          <td  style={{textAlign: 'left', paddingLeft: '1%',width:'40%'}}><span style={{fontWeight: 'bold'}}> 
                            Disclaimer:</span>
                            <ul style={{textAlign: 'left',fontSize:'14px'}}>
                              
                            
                              <li>BMS is only providing a platform between seller and you</li>
                              <li>Warranties, If any, on Products are provided by seller</li>
                              <li>Disputes are subjected to exclusive jurisdiction of the courts in Delhi only</li>
                              <li>Please revisit <a href="https://www.beatmysugar.com/" style={{fontWeight:'600'}}>www.beatmysugar.com</a> for detailed terms and conditions</li>
                            </ul>
                            
                          
                                           
                          </td>
                          <td>
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                               Sub total</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {this.state.CartData.length > 0 ? parseFloat(this.state.CartData.map(info => ((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(info.fld_taxpercent/100)))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2) : 0}
                                </td>
                                
                              </tr>
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                               Offer Discount</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {this.state.CartData.length > 0 ? parseFloat(this.state.CartData.map(info => (this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : parseFloat(((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100).toFixed(2))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2) : 0}
                                </td>
                                
                              </tr>
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                               Shipping Charge</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_shippingcharges).toFixed(2)}
                                </td>
                                
                              </tr>
                              
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                               COD Service Charge</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_coddeliverycharges).toFixed(2)}
                                </td>
                                
                              </tr>
                             
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                               Total (Inclusive of all Taxes)</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_netcost).toFixed(2)}
                                </td>
                                
                              </tr>
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                              Payment Mode</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}>{this.state.MainOrder.fld_paymentmode}
                                </td>
                                
                              </tr>

                            
                              {/* <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                              Select Vendor to assign Shipping & COD Charges</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}>

                              <select type="text" class="form-control" 
                onChange={(text)=>{

                  this.setState({
                    ExtraChargeVendor : text.target.value
                  })
                 
                }}
                 >
                   <option value={0}>Select Vendor</option>
                {this.state.VendorSelectedData.map(
                  company => (
                    <option
                    key={company.label}
                    value={company.value}>
                      {company.label}
                    </option>
                  )
                )}
               
            </select>
                                </td>
                                
                              </tr>
                               */}
                              {/* <tr style={{width:'100%',display:'table'}}>
                          <td  style={{paddingTop: '1%', paddingBottom: '1%', textAlign: 'center'}}>Have a Question? Call us on 
                          +91 90244 22444 or Email us at wecare@beatmysugar.com</td>
                        </tr>
                        <tr class="success" style={{width:'100%',display:'table'}}>
                        <td style={{paddingTop: '1%', paddingBottom: '1%', textAlign: 'center',background : '#f7f7f7'}}>Visit
                             us at <a href="https://www.beatmysugar.com/" style={{fontWeight:'600'}}>www.beatmysugar.com</a></td>
                        </tr> */}
                          </td>
                        </tr>
         
                    </tbody>
            </table>

            <table style={{
width: '1000px',
textAlign: 'center',
marginLeft: 'auto',
marginRight: 'auto',
borderRightColor: '#000',
borderTop: 'hidden',
fontFamily: 'Lato, sans-serif',
borderCollapse: 'collapse'}}
border="1"
cellspacing="1"
cellpadding="0">
    <tbody>
        <tr>
            <td colspan="4"></td>
          <td colspan="6"
           
           style={{
            paddingTop: '1%',
            paddingBottom: '1%',
            textAlign: 'center',
            background: '#f7f7f7'}}
          >
            Have a Question?<br /> Call us on 91 90244 22444 or Email us
            at wecare@beatmysugar.com
          </td>
        </tr>
     
        <tr
          class="success"
          style={{backgroundColor: '#f7f7f7'}}
        >
        <td  colspan="4"></td>
          <td colspan="6"
           
            style={{
              paddingTop: '1%',
              paddingBottom: '1%',
              textAlign: 'center',
              background: '#f7f7f7'}}
          >
            Visit us at
            <a href="https://beatmysugar.com/"
              >www.beatmysugar.com</a>
          </td>
        </tr>
    </tbody>
</table>
            
         
         
                                <div class="mb-4"></div>
                                </div>
                                </div></div>
                                </div></div>
                           
                           {this.state.VendorOrders.map((ord, index)=>(
  <div class="col-12">
  <div class="card">
      <div class="card-body"> 
                           <label><b>Vendor Name </b> {ord.vendorname}</label><br/>
                           <label><b> Vendor Order Number </b>{ord.fld_ordernumber}</label><br/>
                           <label><b> Vendor Order Date </b>{moment(ord.fld_orderdate).format('ll')}</label><br/>
      <table  class="table dt-responsive nowrap"  >
      <thead>
          <tr>
          <th>S.No.</th>
              <th>HSN Code</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Base Value</th>
              <th>Offer Discount</th>
              <th>Net Value</th>
              <th>GST Rate</th>
              <th>GST Amount</th>
              <th>Total Amount</th>
              <th>Vendor Split Amount</th>
              <th>BMS Split Amount</th>
  

          </tr>
      </thead>
  
  
      <tbody>
      {ord.VenDet != undefined ?  ord.VenDet.map((data,index)=>(
                 

          <tr key={index} >
                   
      <td>{(index+1)}.</td>
          <td>{data.fld_hsncode}</td>
         <td>{data.fld_name}</td> 
          <td>{data.fld_quantity}</td>
          <td> &#8377;{parseFloat((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))).toFixed(2)}</td>
          <td> &#8377;{this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : parseFloat(((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100).toFixed(2)}</td>
      <td>&#8377;{parseFloat((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))).toFixed(2)}</td>
          <td> {data.fld_taxpercent}%</td>
          <td> &#8377;{parseFloat((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(data.fld_taxpercent/100)).toFixed(2)}</td>
          <td> &#8377;{parseFloat((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(data.fld_taxpercent/100))).toFixed(2)}</td>
      {/* <td>&#8377;{parseFloat((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100)))).toFixed(2)}</td> */}
      <td>&#8377;{parseFloat((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_quantity*data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100)))).toFixed(2)}</td>
      
      <td>&#8377;{parseFloat(((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(data.fld_taxpercent/100)))-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_quantity*data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100))))).toFixed(2)}</td>
                          

         
        
          </tr>

    
  )) : ''} 
          
         
          </tbody>
       
          </table>

          {/* <table style={{width:'500px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', borderRightColor:
'#000', float:'right'}} border="1" 
cellspacing="1" cellpadding="0"
>
<tbody>

<tr style={{width:'50%'}}>

<td>
    <tr style={{width:'100%',display:'table'}}>
    <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
     Sub total</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {this.state.CartData.length > 0 ? parseFloat(this.state.CartData.map(info => ((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(info.fld_taxpercent/100)))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2) : 0}
      </td>
      
    </tr>
    <tr style={{width:'100%',display:'table'}}>
    <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
     Offer Discount</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {this.state.CartData.length > 0 ? parseFloat(this.state.CartData.map(info => (this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : parseFloat(((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100).toFixed(2))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2) : 0}
      </td>
      
    </tr>
    <tr style={{width:'100%',display:'table'}}>
    <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
     Shipping Charge</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_shippingcharges).toFixed(2)}
      </td>
      
    </tr>
    
    <tr style={{width:'100%',display:'table'}}>
    <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
     COD Service Charge</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_coddeliverycharges).toFixed(2)}
      </td>
      
    </tr>
   
    <tr style={{width:'100%',display:'table'}}>
    <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
     Total (Inclusive of all Taxes)</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_netcost).toFixed(2)}
      </td>
      
    </tr>
   

  
  
</td>
</tr>

</tbody>
</table> */}

        
      </div>
      </div></div>  
   
                           ))}

                              

                                    
                      
  <div class="col-12">
  <div class="card">
      <div class="card-body"> 
                           <label><b>Split Details </b></label><br/>
                  
      <table  class="table dt-responsive nowrap"  >
      <thead>
          <tr>
          <th>Vendor Name</th>
              <th>Merchant Id</th>
              <th>Vendor Split Amount </th>
              <th>BMS Split Amount + Shipping Charges</th>
             

          </tr>
      </thead>
  
  
      <tbody>
      {this.state.VendorOrders.map((ord, index)=>(
                 
                 
             
          <tr key={index} >
                   <td>{ord.vendorname}</td>
                   <td>{ord.MerchantId}</td>
    
                   <td>{ ord.VenDet != undefined && ord.VenDet.length > 0  ?  parseFloat(((ord.VenDet.map(data => (((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_quantity*data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))))).toFixed(2) : 0}</td>
                   <td>{ord.VenDet != undefined && ord.VenDet.length > 0  ?  parseFloat(ord.VenDet.map(data => (((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(data.fld_taxpercent/100)))-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_quantity*data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next)) + parseFloat(ord.fld_shippingcharges) + parseFloat(ord.fld_coddeliverycharges)).toFixed(2) : 0}</td>

         
        
          </tr>

    
  ))}
          
         
          </tbody>
       
          </table>

        

        
      </div>
      </div></div>  
   
             

                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">  
                                <button class="btn btn-primary" type="submit" style={{float:'right'}}
       onClick={this.OnSplitOrder.bind(this)}
       >Confirm Split Order</button>
                                </div>
                                </div></div>
                                </div>
                 
                    </div>

 
                    <Footer></Footer>
            </div>
        );
    }

    OnSplitOrder(){

      Notiflix.Loading.Dots()

         var merchantdet = []
        var ord = []
        var cn =0 

        for(var i=0; i<this.state.VendorOrders.length;i++){
            ord = this.state.VendorOrders[i]
            merchantdet.push(
                {"merchantId":ord.MerchantId,"splitAmount":ord.fld_netcost,"aggregatorSubTransactionId":ord.fld_ordernumber,
                "aggregatorCharges":parseFloat(ord.VenDet.map(data => (((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))+((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100)))*(data.fld_taxpercent/100)))-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_quantity*data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next)) + parseFloat(ord.fld_shippingcharges) + parseFloat(ord.fld_coddeliverycharges)).toFixed(2)
                ,"aggregatorDiscount":"0","sellerDiscount":"0","CODAmount":"0",
                "splitDetails":"Payment-Split" ,
                "amountToBeSettled":parseFloat(((ord.VenDet.map(data => (((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_quantity*data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_quantity*data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_quantity*data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tcs/100))) - ((((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100))))*(ord.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))))).toFixed(2)
            }
            )

            cn = cn +1 

            if(cn == this.state.VendorOrders.length){

              // console.log('yes done')

              PostApiCall.postRequest({

                merchantTransactionId : this.state.MainOrder.fld_txnid,
                totalAmount : this.state.MainOrder.fld_netcost,
                totalDiscount : 0,
                jsonSplits : merchantdet,
                orderid : this.state.MainOrder.fld_orderid
            
            },"AddSplitOrders").then((results1) => 
            
            // const objs = JSON.parse(result._bodyText)
            results1.json().then(obj1 => {
            
            
            if(results1.status == 200 || results1.status==201){
        
              // console.log(obj1.data)
              Notiflix.Loading.Remove()
              Notiflix.Notify.Success('Split Successfully Created')
        
              window.location.href = '/splitorders'
        
            }
          }))
            }
        }


    

        // var merchantdet = []
        // var ord = []

        // for(var i=0; i<this.state.VendorOrders.length;i++){
        //     ord = this.state.VendorOrders[i]
        //     merchantdet.push(
        //         {"merchantId":"393437","splitAmount":ord.fld_netcost,"aggregatorSubTransactionId":ord.fld_ordernumber,
        //         "aggregatorCharges":parseFloat(ord.VenDet.map(data => (((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(ord.fld_offerpercent == '' || ord.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*ord.fld_offerpercent/100)))+((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100))-(ord.fld_offerpercent == '' || ord.fld_offerpercent == null ? 0 : ((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*ord.fld_offerpercent/100)))*(data.fld_taxpercent/100)))-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*(ord.fld_tcs/100))) - ((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*(ord.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2)
        //         ,"aggregatorDiscount":"0","sellerDiscount":"0","CODAmount":"0","CODMode":"0","splitDetails":"TEST_SPLIT" ,
        //         "amountToBeSettled":parseFloat(((ord.VenDet.map(data => (((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100))))) : (data.fld_mrp-((data.fld_marginon == 'Vendor Selling Price' ? (data.fld_vendorsellingprice[0]*(data.fld_marginpercent/100)) : (data.fld_mrp*(data.fld_marginpercent/100)))))) - ((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*(ord.fld_tcs/100))) - ((((data.fld_price[0]*data.fld_quantity)/(1+(data.fld_taxpercent/100)))*(ord.fld_tds/100)))))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))))+ parseFloat(ord.fld_shippingcharges)).toFixed(2)
        //     }
        //     )
        // }


        // console.log(merchantdet)

    //     axios.post(`https://test.payumoney.com/payment/payment/addPaymentSplit?merchantKey'=tXjTgO&merchantTransactionId=`+this.state.MainOrder.fld_txnid+`&totalAmount=`+this.state.MainOrder.fld_netcost+`&totalDiscount=0&jsonSplits=`+
    //     merchantdet)
    //   .then(res => {
    //  console.log(res.data)
    //   })


  //   fetch(`https://test.payumoney.com/payment/payment/addPaymentSplit?merchantKey'=tXjTgO&merchantTransactionId=`+this.state.MainOrder.fld_txnid+`&totalAmount=`+this.state.MainOrder.fld_netcost+`&totalDiscount=0&jsonSplits=`+merchantdet, {
  // method: "POST",
  // headers: {Authorization : 'QmetgiU8HibANxwgv/8GwF02GElmNG5gRoRM/sVAyWI='},   
// })
//       const usr ={
//         merchantKey : 'tXjTgO',
//         merchantTransactionId : this.state.MainOrder.fld_txnid,
//         totalAmount : this.state.MainOrder.fld_netcost,
//         totalDiscount : 0,
//         jsonSplits : merchantdet

//     }
//     axios.post('https://test.payumoney.com/payment/payment/addPaymentSplit?merchantKey=jrjx0g &merchantTransactionId=testjaprefundap12345678&totalAmount=5100&totalDiscount =0&jsonSplits=[{"merchantId":"393437","splitAmount":"2550","aggregatorSubTran sactionId":"dsadad123","aggregatorCharges":"50","aggregatorDiscount":"0","sel lerDiscount":"0","CODAmount":"3000","CODMode":"1","splitDetails":"SOME_SPLIT" ,"amountToBeSettled":"4000"}]')
//   .then(res => {
//  console.log(res.data)
//   })
    }
}



export default SplitOrdersView;