/* eslint-disable no-loop-func */
import React from 'react';
import Menu from './Header'
import Footer from './Footer'
import PostApiCall from "../Api";
import Notiflix from "notiflix";
import GetApiCall from '../GetApi'
import moment from 'moment'
import Modal from 'react-responsive-modal';

var vend = [];
var selPro = []

class VerifyOrderView extends React.Component
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
      

            SelectedProduct : [],
            SelectedVendor : '',
            ShipAssignedTo : '',
            PlacedCount : 0,
            IsAlreadyShipAssigned : 0,

            OrderData : []

        }
    }




    componentDidMount(){

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

      

    var ordermain = JSON.parse(localStorage.getItem('OrderDetailsForVerify'))
   
    console.log(ordermain)

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

            // console.log(obj2.data[0].fld_shipvendorid != '' && obj2.data[0].fld_shipvendorid != null)
        
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

     
            // dt.push(obj2.data[0])
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


// GetApiCall.getRequest("GetVendorData").then(resultdes =>
//   resultdes.json().then(objcategory =>{

//       this.setState({
//           VendorData:objcategory.data,
//       })

//   }))

//   vend = new Array(this.state.CartData.length)
      
    }

 




  

OnVerifyOrder(){

  Notiflix.Loading.Dots()

  PostApiCall.postRequest({

    txnid : this.state.MainOrder.fld_txnid,

},"VerifyOrders").then((results2) => 

// const objs = JSON.parse(result._bodyText)
results2.json().then(obj2 => {


if(results2.status == 200 || results2.status==201){

  Notiflix.Loading.Remove()
  Notiflix.Notify.Success('Order Status Updated.')
  window.location.href = '/verifyorderlist'


}else
{
  Notiflix.Loading.Remove()
  Notiflix.Notify.Failure('Something went wrong, try again later.')
}
}))
  
}



OnVerifyOrderToCustomer(){

  Notiflix.Loading.Dots()

  PostApiCall.postRequest({

    txnid : this.state.MainOrder.fld_txnid,

},"VerifyOrders").then((results2) => 

// const objs = JSON.parse(result._bodyText)
results2.json().then(obj => {


if(results2.status == 200 || results2.status==201){


  if(obj.data[0].OrderDet != undefined){

  

  this.setState({
    OrderData : obj.data[0]
})

var infData = []
    var c = 0
    var c1 = 0

    // console.log(obj.data[0])



    for(var j=0;j<obj.data[0].OrderDet.split('#').length;j++){

        // console.log(obj.data[i].OrderDet.split('#')[j])

        if(obj.data[0].OrderDet.split('#')[j].split('^')[2] == 'Food'){



            PostApiCall.postRequest({

                orderid : obj.data[0].fld_orderid,
                productid : obj.data[0].OrderDet.split('#')[j].split('^')[3]
         
         },"GetFoodOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

            // console.log(obj2.data)
           
            infData.push(obj2.data[0])
            this.setState({
                ProdData : infData
            })
            c1 = c1 +1

            if(c1== obj.data[0].OrderDet.split('#').length){
                // Notiflix.Loading.Remove()
                // console.log('nidhi')
                this.SendMailers()
            }

           }

        }))


        }else if(obj.data[0].OrderDet.split('#')[j].split('^')[2] == 'Footwear'){

            PostApiCall.postRequest({

                orderid : obj.data[0].fld_orderid,
                productid : obj.data[0].OrderDet.split('#')[j].split('^')[3]
         
         },"GetFootwearOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

            // console.log(obj2.data)
           
            infData.push(obj2.data[0])
            this.setState({
                ProdData : infData
            })
            c1 = c1 +1

            if(c1== obj.data[0].OrderDet.split('#').length){
                // Notiflix.Loading.Remove()
                // console.log('nidhi')
                this.SendMailers()
            }
           }

        }))



        }else if(obj.data[0].OrderDet.split('#')[j].split('^')[2] == 'Socks'){

            PostApiCall.postRequest({

                orderid : obj.data[0].fld_orderid,
                productid : obj.data[0].OrderDet.split('#')[j].split('^')[3]
         
         },"GetSocksOrderDetail").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
        
         
           if(results2.status == 200 || results2.status==201){

            // console.log(obj2.data)
           
            infData.push(obj2.data[0])
            this.setState({
                ProdData : infData
            })
            c1 = c1 +1

            if(c1== obj.data[0].OrderDet.split('#').length){
                // Notiflix.Loading.Remove()
                // console.log('nidhi')
                this.SendMailers()
            }
           }

        }))

        }

      

    }  

  }else
  {
 Notiflix.Loading.Remove()
  Notiflix.Notify.Success('Order Status Updated.')
  window.location.href = '/verifyorderlist'
  }
 


}else
{
  Notiflix.Loading.Remove()
  Notiflix.Notify.Failure('Something went wrong, try again later.')
}
}))
  
}
 


SendMailers(){
  //   console.log(this.state.OrderData)
  //   console.log(this.state.ProdData)

  fetch(
      "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=RIGHTC&dest=" +
      this.state.OrderData.fld_mobile +
        "&msg=Hi " +
        this.state.OrderData.fld_name +
        ", Your Order - " +
        this.state.OrderData.fld_ordernumber +
        " has been successfully placed. Team BeatMySugar"
    ).then((response) => response.json());

    PostApiCall.postRequest(
          {
            ordernumber: this.state.OrderData.fld_ordernumber,
            offeramount: this.state.OrderData.fld_offeramount,
            offerpercent: this.state.OrderData.fld_offerpercent,
            shippingcharges: this.state.OrderData.fld_shippingcharges,
            coddeliverycharges: this.state.OrderData.fld_coddeliverycharges,
            orderdate: moment().format("ll"),
            ordervalue: this.state.OrderData.fld_ordervalue,
            netcost: this.state.OrderData.fld_netcost,
            paymentmode:this.state.OrderData.fld_paymentmode,
            numofitems: this.state.OrderData.fld_numofitems,
            customeremail: this.state.OrderData.fld_email,
            customername: this.state.OrderData.fld_name,
            customermobile: this.state.OrderData.fld_mobile,
            billingaddress: this.state.OrderData.fld_billingaddress,
            deliveryaddress: this.state.OrderData.fld_deliveryaddress,
            shippingname: this.state.OrderData.fld_shippingname,
            shippingstreet:this.state.OrderData.fld_shippingstreet,
            shippinglandmark: this.state.OrderData.fld_shippinglandmark,
            shippingcountry: this.state.OrderData.fld_shippingcountry,
            shippingstate: this.state.OrderData.fld_shippingstate,
            shippingcity: this.state.OrderData.fld_shippingcity,
            shippingpincode: this.state.OrderData.fld_shippingpincode,
            shippingmobile: this.state.OrderData.fld_shippingmobile,
            billingname: this.state.OrderData.fld_billingname,
            billingstreet: this.state.OrderData.fld_billingstreet,
            billinglandmark: this.state.OrderData.fld_billinglandmark,
            billingcountry: this.state.OrderData.fld_billingcountry,
            billingstate: this.state.OrderData.fld_billingstate,
            billingcity: this.state.OrderData.fld_billingcity,
            billingpincode: this.state.OrderData.fld_billingpincode,
            billingmobile: this.state.OrderData.fld_billingmobile,
            offercode : this.state.OrderData.fld_offercode,
            orderdata: this.state.ProdData,
            yousave : this.state.OrderData.fld_yousave
          },
          "CustomerOrderMailer"
        ).then((results2) => 
                   
        // const objs = JSON.parse(result._bodyText)
        results2.json().then(obj2 => {
     
      
        if(results2.status == 200 || results2.status==201){

           Notiflix.Loading.Remove()
  Notiflix.Notify.Success('Order Status Updated.')
  window.location.href = '/verifyorderlist'
        }
      }))


       


     

}

    render()
    {
        return (
            <div>
                <Menu></Menu>
                <div className="content-page">
            
            <div className="content">
              <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                           
                            <h4 className="mb-1 mt-0">View Verify Order
                            </h4>
                        </div>
                    </div> 

                              <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">   
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
                                   <tr rowspan="8" className="success" style={{display:'table',width:'100%',  backgroundColor: '#f7f7f7'}}>
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
         
         
                        <tr className="success" style={{backgroundColor: '#f7f7f7'}}>
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
                        
                   
              <tr className="success" style={{backgroundColor: '#f7f7f7'}}>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}> 
              S.No</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>HSN Code</span></td>

              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold',width:'20%'}}> 
              Product</span></td>
              {/* <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}> 
              Brand</span></td> */}
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Quantity</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Base Value</span></td>
              <td style={{padding: '1%',textAlign:'center'}}><span style={{fontWeight: 'bold'}}>Offer Discount*</span></td>
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
    <td style={{width:'8%',padding: '5px'}}> &#8377;{this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : parseFloat(((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100).toFixed(2)}</td>
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
Total Discount on Order {this.state.MainOrder.fld_offercode == '' ? '('+this.state.MainOrder.fld_offercode+')' : ''} <br/>
 &#8377; {this.state.CartData.length > 0 ? parseFloat(this.state.CartData.map(info => (this.state.MainOrder.fld_offerpercent == '' || this.state.MainOrder.fld_offerpercent == null ? 0 : parseFloat(((info.fld_price*info.fld_quantity)/(1+(info.fld_taxpercent/100)))*this.state.MainOrder.fld_offerpercent/100).toFixed(2))).reduce((prev, next) => parseFloat(prev) + parseFloat(next))).toFixed(2) : 0}
</span></td>
                              
                                
                              </tr>

                            
                              {/* <tr style={{width:'100%',display:'table'}}>
                              <td  style={{textAlign: 'right', padding: '1%'}}><span style={{fontWeight: 'bold'}}>
                              Select Vendor to assign Shipping & COD Charges</span></td><td style={{textAlign: 'right', paddingRight: '1%',width:'50%'}}>

                              <select type="text" className="form-control" 
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
                        <tr className="success" style={{width:'100%',display:'table'}}>
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
          className="success"
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
              >&nbsp;www.beatmysugar.com</a>
          </td>
        </tr>
    </tbody>
</table>
            
         
            <button class="btn btn-primary" type="submit" style={{float:'right',margin: '20px'}}
       onClick={this.OnVerifyOrder.bind(this)}
       >Verify Order</button>

             <button class="btn btn-primary" type="submit" style={{float:'right',margin: '20px'}}
       onClick={this.OnVerifyOrderToCustomer.bind(this)}
       >Verify & Send Order Form To Customer</button>
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

export default VerifyOrderView;