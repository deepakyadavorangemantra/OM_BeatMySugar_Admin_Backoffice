/* eslint-disable no-loop-func */
import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "../Api";
import Notiflix from "notiflix";
import GetApiCall from '../GetApi'
import moment from 'moment'


var vend = []

class NewOrderViewTest extends React.Component
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
            UrlRegex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      

        }
    }




    componentDidMount(){

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

      

    var ordermain = JSON.parse(localStorage.getItem('OrderDetailsForAssignData'))
   
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

    // console.log(obj1.data)
    // this.setState({
    //     CartData : obj1.data
    // })

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

            // console.log(obj2.data)
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

            // console.log(obj2.data)
            dt.push(obj2.data[0])
              this.setState({
        CartData : dt
    })
    
           }
        }))

        }if(obj1.data[i].fld_category == 'Socks'){


            PostApiCall.postRequest({

                orderid : ordermain.fld_orderid,
                productid : obj1.data[i].fld_productid
         
         },"GetSocksOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

            // console.log(obj2.data)
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


GetApiCall.getRequest("GetVendorData").then(resultdes =>
  resultdes.json().then(objcategory =>{

      this.setState({
          VendorData:objcategory.data,
      })

  }))

  vend = new Array(this.state.CartData.length)
      
    }

 



    OnAssignOrder(){


      var grouped = this.state.CartData.reduce((r, v, i, a) => {

       
        if (v.fld_vendorid === (a[i - 1] == undefined ? '' : a[i - 1].fld_vendorid )) {
          if(v.fld_vendorid != null)
          {
            r[r.length - 1].push([v]);
          }
            
        } else {
          if(v.fld_vendorid != null)
          {
            r.push(v.fld_vendorid === (a[i + 1] == undefined ? '' : a[i + 1].fld_vendorid) ? [v] : [v]);
          }
        }
      
        return r;
    }, []);
    

var cn = 0
var cn1 = 0
var Ids = []
var ln = 0

if(this.state.ExtraChargeVendor != '')
{


  Notiflix.Loading.Dots('');

  console.log(grouped)

for(var i = 0 ;i<grouped.length ;i++){

  var sum = 0
  var shipcharge = ((grouped[i][0].fld_vendorid == this.state.ExtraChargeVendor ? parseFloat(this.state.MainOrder.fld_shippingcharges).toFixed() : parseFloat(0).toFixed()))
  
  var codcharge = ((grouped[i][0].fld_vendorid == this.state.ExtraChargeVendor ? parseFloat(this.state.MainOrder.fld_coddeliverycharges).toFixed() : parseFloat(0).toFixed()))


  for(var k = 0 ;k<grouped[i].length ;k++)
  {

    sum = sum + grouped[i][k].fld_quantity*grouped[i][k].fld_price

  }

  var net = 0
  if(this.state.MainOrder.fld_offerpercent != null ) {
   net = parseInt(shipcharge)  +
    parseInt(codcharge) +
    sum -  sum*(parseFloat((this.state.MainOrder.fld_offerpercent)).toFixed())/100
  }else
  { 
   net = parseInt(shipcharge)  +
    parseInt(codcharge) +
    sum

  }



console.log(net)

// console.log(grouped[i])


var ship =  grouped[i][0].fld_vendorid == this.state.ExtraChargeVendor ? this.state.MainOrder.fld_shippingcharges : 0 
var cod = grouped[i][0].fld_vendorid == this.state.ExtraChargeVendor ? this.state.MainOrder.fld_coddeliverycharges : 0
var grp =grouped[i]

  PostApiCall.postRequest({

    offerid : this.state.MainOrder.fld_offerid,
    orderid : this.state.MainOrder.fld_orderid,

    offeramount :  sum*(parseFloat((this.state.MainOrder.fld_offerpercent)).toFixed())/100,
    shippingcharges : grouped[i][0].fld_vendorid == this.state.ExtraChargeVendor ? this.state.MainOrder.fld_shippingcharges : 0 ,
    coddeliverycharges : grouped[i][0].fld_vendorid == this.state.ExtraChargeVendor ? this.state.MainOrder.fld_coddeliverycharges : 0,
    orderdate : moment().format('ll'),
    ordervalue : sum,
    paymentmode : this.state.MainOrder.fld_paymentmode,
    netcost : net,
    numofitems : grouped[i].length,
    customerid : this.state.MainOrder.fld_customerid,
    billingaddress : this.state.MainOrder.fld_billingaddress,
    deliveryaddress : this.state.MainOrder.fld_deliveryaddress,
    ordersource :this.state.MainOrder.fld_ordersource,
    status : 'Assigned',
    updated_on : moment().format('ll'),
    updated_by : this.state.MainOrder.fld_customerid,
    staffid : this.state.MainOrder.fld_staffid,    
    vendorid : grouped[i][0].fld_vendorid,
    shippingname : this.state.MainOrder.fld_shippingname,
    shippingstreet : this.state.MainOrder.fld_shippingstreet,
    shippinglandmark : this.state.MainOrder.fld_shippinglandmark,
    shippingcountry : this.state.MainOrder.fld_shippingcountry,
    shippingstate : this.state.MainOrder.fld_shippingstate,
    shippingcity : this.state.MainOrder.fld_shippingcity,
    shippingpincode : this.state.MainOrder.fld_shippingpincode,
    shippingmobile : this.state.MainOrder.fld_shippingmobile,
    billingname : this.state.MainOrder.fld_billingname,
    billingstreet : this.state.MainOrder.fld_billingstreet,
    billinglandmark : this.state.MainOrder.fld_billinglandmark,
    billingcountry : this.state.MainOrder.fld_billingcountry,
    billingstate : this.state.MainOrder.fld_billingstate,
    billingcity : this.state.MainOrder.fld_billingcity,
    billingpincode : this.state.MainOrder.fld_billingpincode,
    billingmobile : this.state.MainOrder.fld_billingmobile
 
 },"AddVendorOrder").then((results) => 
 
 // const objs = JSON.parse(result._bodyText)
 results.json().then(obj => {
 
 
 if(results.status == 200 || results.status==201){


  PostApiCall.postRequest({
    ordernumber : (JSON.parse(JSON.stringify(obj.data[0]))).OrderNumber,
    cusordernumber : this.state.MainOrder.fld_ordernumber,
    offerid : this.state.MainOrder.fld_offerid,
    orderid : this.state.MainOrder.fld_orderid,
    offeramount : sum*(parseFloat((this.state.MainOrder.fld_offerpercent)).toFixed())/100,
    shippingcharges : ship,
    coddeliverycharges : cod,
    orderdate : moment().format('ll'),
    ordervalue : sum,
    paymentmode : this.state.MainOrder.fld_paymentmode,
    netcost : net,
    numofitems : grp.length,
    customerid : this.state.MainOrder.fld_customerid,
    billingaddress : this.state.MainOrder.fld_billingaddress,
    deliveryaddress : this.state.MainOrder.fld_deliveryaddress,
    ordersource :this.state.MainOrder.fld_ordersource,
    status : 'Assigned',
    updated_on : moment().format('ll'),
    updated_by : this.state.MainOrder.fld_customerid,
    staffid : this.state.MainOrder.fld_staffid,    
    vendoremail :  (JSON.parse(JSON.stringify(obj.data[0]))).VendorEmail,
    vendorname : (JSON.parse(JSON.stringify(obj.data[0]))).VendorName,
    vendoraddress : (JSON.parse(JSON.stringify(obj.data[0]))).VendorAddress,
    vendorlandmark : (JSON.parse(JSON.stringify(obj.data[0]))).VendorLandmark,
    vendorcountry :  (JSON.parse(JSON.stringify(obj.data[0]))).VendorCountry,
    vendorstate :  (JSON.parse(JSON.stringify(obj.data[0]))).VendorState,
    vendorcity :  (JSON.parse(JSON.stringify(obj.data[0]))).VendorCity,
    vendorpincode :  (JSON.parse(JSON.stringify(obj.data[0]))).VendorPincode,

    shippingname : this.state.MainOrder.fld_shippingname,
    shippingstreet : this.state.MainOrder.fld_shippingstreet,
    shippinglandmark : this.state.MainOrder.fld_shippinglandmark,
    shippingcountry : this.state.MainOrder.fld_shippingcountry,
    shippingstate : this.state.MainOrder.fld_shippingstate,
    shippingcity : this.state.MainOrder.fld_shippingcity,
    shippingpincode : this.state.MainOrder.fld_shippingpincode,
    shippingmobile : this.state.MainOrder.fld_shippingmobile,
    billingname : this.state.MainOrder.fld_billingname,
    billingstreet : this.state.MainOrder.fld_billingstreet,
    billinglandmark : this.state.MainOrder.fld_billinglandmark,
    billingcountry : this.state.MainOrder.fld_billingcountry,
    billingstate : this.state.MainOrder.fld_billingstate,
    billingcity : this.state.MainOrder.fld_billingcity,
    billingpincode : this.state.MainOrder.fld_billingpincode,
    billingmobile : this.state.MainOrder.fld_billingmobile,
   orderdata : grp
    
    },"VendorOrderMailer")



  cn = cn +1

  Ids.push((JSON.parse(JSON.stringify(obj.data[0]))).OrderId)

  if(cn == grouped.length){
    for(var s = 0 ;s<grouped.length ;s++){

      for(var j =0 ;j<grouped[s].length;j++){

        ln = ln +1

        PostApiCall.postRequest({
    
            vendororderid : Ids[s],
            category : grouped[s][j].fld_category,
            productid : grouped[s][j].fld_productid,
            price : grouped[s][j].fld_price,
            tax : grouped[s][j].fld_taxpercent,
            quantity : grouped[s][j].fld_quantity,
            updated_on : moment().format('lll'),
            updated_by : this.state.MainOrder.fld_customerid,
            status : 'Assigned',
            orderdetailid : grouped[s][j].fld_orderdetailid,
            orderid : grouped[s][j].fld_orderid
    
    },"AddVendorOrderDetail").then((results1) => 
    
      // const objs = JSON.parse(result._bodyText)
      results1.json().then(obj1 => {
    
    
      if(results1.status == 200 || results1.status==201){
    
        cn1 = cn1 +1
    
        if(cn1 ==  ln){
    
         
          Notiflix.Loading.Remove()
    
          Notiflix.Notify.Info('Order has been assigned to vendors.')
          // window.location.href = '/neworders' 
        
        }
    
      }else
      {
        cn1 = cn1 +1
      }
    }))
    
      }

    }
  }



 
 }else{
  cn = cn +1
 }
 }))

}


}
else
{
  Notiflix.Notify.Failure('Select Vendor or assign shipping and COD amount.')
}

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
                                    <li class="breadcrumb-item"><a href="#">Order Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">View Order
                                    </li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">View Order
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
                            {moment(this.state.MainOrder.fld_orderdate).format('ll')}</td>
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
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}> 
              Brand</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Quantity</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Net Weight</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Rate</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>GST %</span></td>
              {/* <td style={{paddingTop: '1%', paddingBottom: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>GST Amount</span></td> */}
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Total (INR)</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Select Vendor</span></td>
              </tr>
        
    {this.state.CartData.map((info,index)=>(

<tr>
    <td style={{width:'6%',padding: '5px'}}>{index+1}.</td>
    <td style={{width:'8%',padding: '5px'}}>{info.fld_hsncode}</td>
    <td style={{width:'30%',padding: '5px'}}>{info.fld_prodname}</td>
    <td style={{width:'7%',padding: '5px'}}>{info.fld_brand}</td>
    <td style={{width:'9%',padding: '5px'}}>{info.fld_quantity}</td>
    <td style={{width:'8%',padding: '5px'}}> {info.fld_productweight != undefined ? info.fld_productweight+" "+info.fld_productunit : '-'}</td>
    <td style={{width:'8%',padding: '5px',whiteSpace:'nowrap'}}>&#8377; {parseFloat(info.fld_price).toFixed(2)}</td>
    <td style={{width:'8%',padding: '5px',whiteSpace:'nowrap'}}>{info.fld_taxpercent}%</td>
     {/* <td></td> */}
    <td style={{padding: '5px',whiteSpace:'nowrap'}}> &#8377; {parseFloat(info.fld_quantity*info.fld_price).toFixed(2)}</td>
     <td style={{width:'30%',padding: '5px'}}>

     <select type="text" class="form-control" 
                // value={this.props.brandcredentials.CompanyName}
                onChange={(text)=>{
                  // console.log(info)
                  var dt = [...this.state.CartData]
                  dt[index].fld_vendorid = text.target.value

                  this.setState({
                    CartData : dt
                  })

                 
                 
                    for(var j =0 ;j<this.state.VendorData.length;j++){
                      if(this.state.VendorData[j].value == text.target.value){

                        if(vend.length > 0){
                          for(var k =0 ;k<vend.length;k++){
                            if(vend[k].value != text.target.value){
                              vend[index] = {label :this.state.VendorData[j].label, value: text.target.value}
             
                              this.setState({
                                VendorSelectedData : vend
                              })
                            }
                          }
                        }else
                        {
                          vend[index] = {label :this.state.VendorData[j].label, value: text.target.value}
             
                          this.setState({
                            VendorSelectedData : vend
                          })
                        }
                       
                        
                      }

                    }
                  
               
                 
                }}
                 >
                   <option value={0}>Select Vendor</option>
                {this.state.VendorData.map(
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
                               Sub total</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_ordervalue).toFixed(2)}
                                </td>
                                
                              </tr>
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                               Offer Discount</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}> &#8377; {parseFloat(this.state.MainOrder.fld_offeramount).toFixed(2)}
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

                            
                              <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                              Select Vendor to assign Shipping & COD Charges</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}>

                              <select type="text" class="form-control" 
                // value={this.props.brandcredentials.CompanyName}
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
              >www.beatmysugar.com</a
            >
          </td>
        </tr>
    </tbody>
</table>
            
         
            <button class="btn btn-primary" type="submit" style={{float:'right',margin: '20px'}}
       onClick={this.OnAssignOrder.bind(this)}>Assign Orrder</button>
                                <div class="mb-4"></div>
                                </div>
                                </div></div>
                                </div></div>
                            </div>
                    </div>
                    <Footer></Footer>
            </div>
        );
    }
}

export default NewOrderViewTest;