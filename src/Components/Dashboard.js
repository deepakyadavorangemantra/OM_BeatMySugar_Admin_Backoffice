import React from 'react';
import moment from 'moment';
import { Users,Lock, Image, ShoppingBag, CheckSquare, ShoppingCart, CreditCard, Monitor, User} from 'react-feather';
import  ReactApexChart from 'react-apexcharts';
import Notiflix from "notiflix";
import PostApiCall from '../Api';
import GetApiCall from '../GetApi';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
   
       this.state = {
         series: [{
            name: 'Month Wise Order Count',
            data: []
            }],
          optionsbar: {
            chart: {
              height: 45,
              width:90,
              type: 'basic-bar',
              toolbar: {
                show: false
              },
            
            },
            colors: ['#008FFB'],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
             
            },
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                  return "" + Number(val).toLocaleString();
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#304758"]
                }
              },
         stroke: {
              curve: 'smooth'
            },
     
            yaxis: {
    
                labels:  {
                    show: true,
                    formatter: function(val) {
                      return "" + Number(val).toLocaleString() ;
                    }
                  }
                },
                
         tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        
        seriesBarChart: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }],
        options: {
            chart: {
              type: 'donut',
              height: 350
            },
            colors: ['#507dc0', '#507dc0', '#507dc0'],

        plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
        dataLabels: {
              enabled: false
            },
        stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
        xaxis: {
              categories: [],
            },
        
        fill: {
              opacity: 1
            },
        
          },
        

          
        saleSseries1: [],
        saleSoptions1: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Food', 'Footwear', 'Socks'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },



        Salesseries: [{
            name: 'Sales By Month',
            type: 'column',
            data: []
          }, ],
          Salesoptions: {
            chart: {
              height: 350,
              type: 'line',
            },
            stroke: {
              width: [0, 4]
            },
         
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                  return "₹" + Number(val).toLocaleString();
                },
                offsetY: -20,
                style: {
                  fontSize: "12px",
                  colors: ["#304758"]
                }
              },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
             
            },
            yaxis: [{
              title: {
                text: 'Sales By Month',
              },
              labels:  {
                show: true,
                formatter: function(val) {
                  return "₹" + Number(val).toLocaleString() ;
                }
              }
            
            }, ]
          },
        
      
      
      
        
          TotalCustomers:'',
          CustomerMonth:'',
          CustomersToday:'',
          VerifiedCustomers:'',
          TotalSaleAmount:'',
          TodaySaleAmount:'',
          SalesWeek:'',
          TotalSalesMonth:'',
          TotalOrders:'',
          TodaysOrder:'',
          OrdersWeek:'',
          OrdersMonth:'',
          OpenOrders:'',
          AssignedOrder:'',
          OrdersTransit:'',
          DeliveredOrder:'',
                    TotalFoodItem:'',
                    FoodActive:'',
                    ActiveVariants:'',
                    TotalFootwearItem:'',
                    FootwearActive:'',
                    FootwearActiveVariant:'',

                    TotalSocksItem:'',
                    SocksActive:'',
                    SocksActiveVariant:'',
                    TotalProductItem:'',
                    TotalActiveProduct:'',
                    TotalVariant:'',
                    TotalActivVariant:'',
                    TotalVendors:'',
                    TotalBrands:'',
                    ActiveVendors:'',
                    InactiveVendor:'',
                    NewOrderData:[],
                    NewCustomerData:[],
                    ReturnData:[],

                    MonthWiseSales:[],
        
        };
      }
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
           



          PostApiCall.postRequest(
            {
                todayDate : moment().format('ll'),
             },
           
            "Get_BackOfficeDashboardCount_ByDate_NewBackoffice"
          ).then((results) =>
            results.json().then((obj) => {
                 const categories=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec']
                 
                
              if (results.status == 200 || results.status == 201) {
                 this.setState({
                    DashboardData : obj.data,
                   
                  })
                    const saleSseries=[]
                  for(let i=0;i<=11;i++){
                    if(i===categories.indexOf(moment().format('MMM'))){

                    }
                    else{
                    }
                    if(i===0){
                        saleSseries[i]=obj.data[0].TotalFoodItem
                    }
                    else if(i==1){
                        saleSseries[i]=obj.data[0].TotalFootwearItem

                    } 
                    else if(i==2){
                        saleSseries[i]=obj.data[0].TotalSocksItem

                    }                   
                
                   }
                
   this.setState({...this.state.saleSseries1,saleSseries1:saleSseries})

                
   console.log(obj.data)
                this.setState({
                   TotalCustomers: obj.data[0].TotalCustomers,
                   CustomerMonth:obj.data[0].TotalCustomersThisMonth,
                   CustomersToday:obj.data[0].TotalCustomersToday,
                   VerifiedCustomers:obj.data[0].TotalVerifiedCustomers,
                   TotalSaleAmount:obj.data[0].TotalSalesAmount,
                   SalesWeek:obj.data[0].TotalSalesAmountThisWeek,
                   TotalSalesMonth:obj.data[0].TotalSalesAmountThisMonth,
                   TotalOrders:obj.data[0].TotalOrder,
                   TodaysOrder:obj.data[0].TodayOrder,
                   OrdersWeek:obj.data[0].OrderThisWeek,
                   OrdersMonth:obj.data[0].OrderThisMonth,
                   OpenOrders:obj.data[0].OpenOrder,
                   AssignedOrder:obj.data[0].AssignedOrder,
                   OrdersTransit:obj.data[0].TransitOrder,
                   DeliveredOrder:obj.data[0].DeliveredOrder,
                   TodaySaleAmount:obj.data[0].TodaySalesAmount,


              
        //    ------------Products==================

                    TotalFoodItem:obj.data[0].TotalFoodItem,
                    FoodActive:obj.data[0].TotalFoodActiveProduct,
                    ActiveVariants:obj.data[0].TotalFoodVariantActiveProduct,
                    TotalFootwearItem:obj.data[0].TotalFootwearItem,
                    FootwearActive:obj.data[0].TotalFootwearActiveProduct,
                    FootwearActiveVariant:obj.data[0].TotalFootwearVariantActiveProduct,

                    TotalSocksItem:obj.data[0].TotalSocksItem,
                    SocksActive:obj.data[0].TotalSocksActiveProduct,
                    SocksActiveVariant:obj.data[0].TotalSocksVariantActiveProduct,


                TotalProductItem:parseFloat(obj.data[0].TotalFoodItem+obj.data[0].TotalFootwearItem+obj.data[0].TotalSocksItem),
                TotalActiveProduct:parseFloat(obj.data[0].TotalFoodActiveProduct+obj.data[0].TotalFootwearActiveProduct+obj.data[0].TotalSocksActiveProduct),
                TotalVariant:parseFloat(obj.data[0].TotalFoodVaritantItem+obj.data[0].TotalFootwearVaritantItem+obj.data[0].TotalSocksVaritantItem),
                TotalActivVariant:parseFloat(obj.data[0].TotalFoodVariantActiveProduct+obj.data[0].TotalFootwearVariantActiveProduct+obj.data[0].TotalSocksVariantActiveProduct),


                //  =====================Vendors===========
                TotalVendors:obj.data[0].TotalVendor,
                TotalBrands:obj.data[0].TotalBrands,
                ActiveVendors:obj.data[0].TotalActiveVendor,
                InactiveVendor:obj.data[0].TotalInactiveVendor
                })
               
         }
        

     }
       ))


     
       GetApiCall.getRequest("Get_BackOfficeDashboardTop5Order_NewBackoffice").then(resultdes =>
           resultdes.json().then(obj => {
         this.setState({
                 NewOrderData: obj.data
             })
            
           
           }))



           GetApiCall.getRequest("GetDashboarshMonthWiseOrdersSales").then(resultdes =>
            resultdes.json().then(obj => {
          this.setState({
                 MonthWiseSales: obj.data
              })
             
              const categories=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']

              const saleScategories=['Food', 'Footwear', 'Socks']

              this.setState({
                categories:categories
               
              })

              const data= new Array(12).fill(0)
              const data2= new Array(12).fill(0)
              
                for(var j = 0 ; j<categories.length;j++){
                    for(var i = 0 ; i<obj.data.length;i++){
                   
                    if(moment(obj.data[i].fld_orderdate).format('MMM YYYY') == categories[j]+' '+moment().format('YYYY')){
                        data[j] = data[j]+1
                        data2[j] = data2[j] + obj.data[i].fld_netcost
                    }
                
                }
              }
              this.setState({series:[...this.state.series,{name : 'Order Count',data:data}]})
              this.setState({Salesseries:[...this.state.Salesseries,{name : 'Sales',data:data2}]})
            }))

// ====================Customer List=================

           Notiflix.Loading.Dots('');
    
           GetApiCall.getRequest("Get_BackOfficeDashboardTop5Customer_NewBackoffice").then(resultdes =>
               resultdes.json().then(obj => {
               this.setState({
                     NewCustomerData: obj.data
                 })
    
                 Notiflix.Loading.Remove();
               }))

            //    ===================Refund Return============
            GetApiCall.getRequest("Get_ReturnMaster_NewBackoffice").then(resultdes =>
                resultdes.json().then(obj => {
                this.setState({
                      ReturnData: (obj.data).slice(0,5)
                  })
             
                  Notiflix.Loading.Remove();
                }))
        }
    
        
  render(){
      return(
          <div>
            <div className="content-page dashboard">
                <div className="content">
                    <div className="container-fluid">
                       

                        <div className="row">
                        <div className="col-sm-4 col-xl-12">
                        <div className="page-title align-items-center">
                        <div class="col-sm-4 col-xl-6">
                                <h4 class="mb-1 mt-0">Dashboard</h4>
                            </div>
                               
                            </div>
                        </div>

                            <div class="col-xl-3">
                            <span className="bg-box zoom-in"></span>
                            <div class="card zoom-in">
                                <div class="card-body p-0 ">
                                    <h5 class="card-title header-title border-bottom p-3 mb-0"><Users class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Customers</span></h5>
                                  
                                    <div class="media dashcard border-bottom" >
                                        <div class="media-body">
                                            <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalCustomers}</h4>
                                            <span class="text-muted">Total Customers</span>
                                        </div>
                                      
                                    </div>

                                    <div class="media dashcard border-bottom">
                                        <div class="media-body">
                                            <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.CustomerMonth}</h4>
                                            <span class="text-muted">Customers this Month</span>
                                        </div>
                                       
                                    </div>

                                    <div class="media dashcard border-bottom">
                                        <div class="media-body">
                                            <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.CustomersToday}</h4>
                                            <span class="text-muted">Customers Today</span>
                                        </div>
                                       
                                    </div>
                                    <div class="media dashcard">
                                    <div class="media-body">
                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.VerifiedCustomers}</h4>
                                        <span class="text-muted">Customers with Email Verified</span>
                                    </div>
                                    
                                   </div>
                                </div>
                            </div>
                        </div>

                        
                        <div class="col-xl-3">
                        <span className="bg-box zoom-in"></span>
                        <div class="card zoom-in">
                            <div class="card-body p-0">
                                <h5 class="card-title header-title border-bottom p-3 mb-0"><ShoppingCart class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Sales</span></h5>
                              
                                <div class="media dashcard border-bottom" >
                                    <div class="media-body">
                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalSaleAmount}</h4>
                                        <span class="text-muted">Total Sales Amount</span>
                                    </div>
                                  
                                </div>

                                <div class="media dashcard border-bottom">
                                    <div class="media-body">
                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TodaySaleAmount == null ? '0' : this.state.TodaySaleAmount}</h4>
                                        <span class="text-muted">Today's Sales Amount</span>
                                    </div>
                                   
                                </div>

                                {/* <div class="media dashcard border-bottom">
                                    <div class="media-body">
                                        <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.SalesWeek}</h4>
                                        <span class="text-muted">Sales this Week</span>
                                    </div>
                                   
                                </div> */}
                                <div class="media dashcard">
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalSalesMonth}</h4>
                                    <span class="text-muted">Total Sales this Month</span>
                                </div>
                                
                               </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="col-xl-3">
                    
                    <div class="card zoom-in">
                        <div class="card-body p-0">
                            <h5 class="card-title header-title border-bottom p-3 mb-0"><CreditCard class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Orders</span></h5>
                          
                            <div class="media dashcard border-bottom" >
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalOrders}</h4>
                                    <span class="text-muted">Total Orders</span>
                                </div>
                              
                            </div>

                            <div class="media dashcard border-bottom">
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TodaysOrder}</h4>
                                    <span class="text-muted">Today's Orders</span>
                                </div>
                               
                            </div>

                            {/* <div class="media dashcard border-bottom">
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.OrdersWeek}</h4>
                                    <span class="text-muted">Orders this Week</span>
                                </div>
                               
                            </div> */}
                            <div class="media dashcard">
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.OrdersMonth}</h4>
                                <span class="text-muted">Orders this Month</span>
                            </div>
                            
                           </div>
                        </div>
                    </div>
                </div>


                
                <div class="col-xl-3">
                <div class="card zoom-in">
                    <div class="card-body p-0">
                        <h5 class="card-title header-title border-bottom p-3 mb-0"><CreditCard class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Order Status</span></h5>
                      
                        <div class="media dashcard border-bottom" >
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.OpenOrders}</h4>
                                <span class="text-muted">Open Orders</span>
                            </div>
                          
                        </div>

                        <div class="media dashcard border-bottom">
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.AssignedOrder}</h4>
                                <span class="text-muted">Assigned Orders</span>
                            </div>
                           
                        </div>

                        <div class="media dashcard border-bottom">
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.OrdersTransit}</h4>
                                <span class="text-muted">Orders in Transit</span>
                            </div>
                           
                        </div>
                        <div class="media dashcard">
                        <div class="media-body">
                            <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.DeliveredOrder}</h4>
                            <span class="text-muted">Delivered Orders</span>
                        </div>
                        
                       </div>
                    </div>
                </div>
            </div>

           

            <div class="col-xl-3">
                    
                    <div class="card zoom-in">
                        <div class="card-body p-0">
                            <h5 class="card-title header-title border-bottom p-3 mb-0"><Monitor class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Products</span></h5>
                          
                            <div class="media dashcard border-bottom" >
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalProductItem}</h4>
                                    <span class="text-muted">Total Products</span>
                                </div>
                              
                            </div>

                            <div class="media dashcard border-bottom">
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalActiveProduct}</h4>
                                    <span class="text-muted">Total Active Products</span>
                                </div>
                               
                            </div>

                            <div class="media dashcard border-bottom">
                                <div class="media-body">
                                    <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalVariant}</h4>
                                    <span class="text-muted">Total Variants</span>
                                </div>
                               
                            </div>
                            <div class="media dashcard">
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalActivVariant}</h4>
                                <span class="text-muted">Total Active Variants</span>
                            </div>
                            
                           </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                <div className="card zoom-in">
                    <div className="card-body">
                    <h5 className="card-title mt-0 mb-0 header-title">Total Products</h5>
                    <div id="chart">
               <ReactApexChart options={this.state.saleSoptions1} series={this.state.saleSseries1} type="pie" width={420} style={{marginLeft:'24%'}} />
          </div>
                    </div>
                </div>
          
            </div>

                <div class="col-xl-3">
                    
                <div class="card zoom-in">
                    <div class="card-body p-0">
                        <h5 class="card-title header-title border-bottom p-3 mb-0"><User class="align-self-center icon-dual icon-lg" style={{color:'#507dc0'}}/><span className="cardtitle">Vendors</span></h5>
                      
                        <div class="media dashcard border-bottom" >
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalVendors}</h4>
                                <span class="text-muted">Total Vendors</span>
                            </div>
                          
                        </div>

                        <div class="media dashcard border-bottom">
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalBrands}</h4>
                                <span class="text-muted">Total Brands</span>
                            </div>
                           
                        </div>

                        <div class="media dashcard border-bottom">
                            <div class="media-body">
                                <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.ActiveVendors}</h4>
                                <span class="text-muted">Active Vendors</span>
                            </div>
                           
                        </div>
                        <div class="media dashcard">
                        <div class="media-body">
                            <h4 class="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.InactiveVendor}</h4>
                            <span class="text-muted">Inactive Vendors</span>
                        </div>
                        
                       </div>
                    </div>
                </div>
            </div>
                        
           
                        </div>

                        <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                <h5 className="card-title mt-0 mb-0 header-title">Sales</h5>
                                <div id="chart">
                           <ReactApexChart options={this.state.Salesoptions} series={this.state.Salesseries} type="line" height={350} />
                      </div>
                                </div>
                            </div>
                      
                        </div>
                        <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title mt-0 mb-0 header-title">Orders</h5>
                            <div id="chart">
                       <ReactApexChart options={this.state.optionsbar} series={this.state.series} type="bar" height={350} />
                  </div>
                            </div>
                        </div>
                  
                    </div>
                       
                    </div>
                      

                      
                     

                     

                      <div className="row">
                          <div className="col-md-12">
                              <div className="row">
                          <div className="col-sm-4 col-xl-12">
                        <div className="page-title align-items-center">
                        
                                <h4 className="mb-1 mt-0">Products</h4>
                            </div>
                            </div>
                        </div>
                          </div>
                      <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <h5 className="card-title header-title border-bottom p-3 mb-0">Food</h5>
                                       
                                        <div className="media px-3 py-4 border-bottom">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalFoodItem}</h4>
                                                <span className="text-muted">Total Items</span>
                                            </div>
                                            <i data-feather="users" className="align-self-center icon-dual icon-lg"></i>
                                        </div>

                                      
                                        <div className="media px-3 py-4 border-bottom">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.FoodActive}</h4>
                                                <span className="text-muted">Active Products</span>
                                            </div>
                                            <i data-feather="image" className="align-self-center icon-dual icon-lg"></i>
                                        </div>

                                       
                                        <div className="media px-3 py-4">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.ActiveVariants}</h4>
                                                <span className="text-muted">Active Variants</span>
                                            </div>
                                            <i data-feather="shopping-bag" className="align-self-center icon-dual icon-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <h5 className="card-title header-title border-bottom p-3 mb-0">Footwear</h5>
                                       
                                        <div className="media px-3 py-4 border-bottom">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalFootwearItem}</h4>
                                                <span className="text-muted">Total Items</span>
                                            </div>
                                            <i data-feather="users" className="align-self-center icon-dual icon-lg"></i>
                                        </div>

                                      
                                        <div className="media px-3 py-4 border-bottom">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.FootwearActive}</h4>
                                                <span className="text-muted">Active Products</span>
                                            </div>
                                            <i data-feather="image" className="align-self-center icon-dual icon-lg"></i>
                                        </div>

                                       
                                        <div className="media px-3 py-4">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.FootwearActiveVariant}</h4>
                                                <span className="text-muted">Active Variants</span>
                                            </div>
                                            <i data-feather="shopping-bag" className="align-self-center icon-dual icon-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <h5 className="card-title header-title border-bottom p-3 mb-0">Socks</h5>
                                       
                                        <div className="media px-3 py-4 border-bottom">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.TotalSocksItem}</h4>
                                                <span className="text-muted">Total Items</span>
                                            </div>
                                            <i data-feather="users" className="align-self-center icon-dual icon-lg"></i>
                                        </div>

                                      
                                        <div className="media px-3 py-4 border-bottom">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.SocksActive}</h4>
                                                <span className="text-muted">Active Products</span>
                                            </div>
                                            <i data-feather="image" className="align-self-center icon-dual icon-lg"></i>
                                        </div>

                                       
                                        <div className="media px-3 py-4">
                                            <div className="media-body">
                                                <h4 className="mt-0 mb-1 font-size-22 font-weight-normal">{this.state.SocksActiveVariant}</h4>
                                                <span className="text-muted">Active Variants</span>
                                            </div>
                                            <i data-feather="shopping-bag" className="align-self-center icon-dual icon-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                 
                      </div>

                      

                                
                    <div className="row">
                    <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="" className="btn btn-primary btn-sm float-right" style={{display:'none'}}>
                                            <i className="uil uil-export ml-1"></i> Export
                                        </a>
                                        <h5 className="card-title mt-0 mb-0 header-title">New Orders</h5>

                                        <div className="table-responsive mt-4">
                                            <table className="table table-hover table-nowrap mb-0">
                                                <thead>
                                                <tr>
                                                <th scope="col">Order Number</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Order Date</th>
                                                <th scope="col">Order Value</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.NewOrderData.length == 0 ? 
                                            <tr><td colSpan={5} style={{textAlign:'center'}}>No Order List Available</td></tr> : 
                                            ''} 
                                        {this.state.NewOrderData.map((data,index)=>(
                                                   
                                              <tr key={index}>
                                                    <td>{data.fld_ordernumber}</td>
                                                    <td>{data.fld_name}</td>
                                                    <td>{moment(data.fld_orderdate).format('ll')}</td>
                                                    <td>{data.fld_ordervalue}</td>
                                                    <td>{data.fld_status}</td>
                                                </tr>
                                                ))
                                                }
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div> 
                                </div> 
                            </div>
                    </div>
                     

                    <div className="row">
                    <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="" className="btn btn-primary btn-sm float-right" style={{display:'none'}}>
                                            <i className="uil uil-export ml-1"></i> Export
                                        </a>
                                        <h5 className="card-title mt-0 mb-0 header-title">Refund Requests</h5>

                                        <div className="table-responsive mt-4">
                                            <table className="table table-hover table-nowrap mb-0">
                                            <thead>
                                            <tr>
                                                <th scope="col">Order Id</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.ReturnData.length == 0 ? 
                                            <tr><td colSpan={5} style={{textAlign:'center'}}>No Refund List Available</td></tr> : 
                                            ''} 
                                        {this.state.ReturnData.map((data,index)=>(
                                                   
                                              <tr key={index}>
                                                    <td>{data.fld_orderid}</td>
                                                    <td>{data.fld_productid}</td>
                                                    <td>{data.fld_name}</td>
                                                    <td>{data.fld_price}</td>
                                                    <td>{data.fld_status}</td>
                                                  
                                                </tr>
                                        ))
                                        }
                                        </tbody>
                                            </table>
                                        </div> 
                                    </div> 
                                </div> 
                            </div>
                    </div>
                     
                    <div className="row">
                    <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="" className="btn btn-primary btn-sm float-right" style={{display:'none'}}>
                                            <i className="uil uil-export ml-1"></i> Export
                                        </a>
                                        <h5 className="card-title mt-0 mb-0 header-title">New Customers</h5>

                                        <div className="table-responsive mt-4">
                                            <table className="table table-hover table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Email Verified</th>
                                                        <th scope="col">Mobile</th>
                                                        <th scope="col">Mobile Verified</th>
                                                        <th scope="col">Source</th>
                                                        <th scope="col">Registered On</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.NewCustomerData.length == 0 ? 
                                                    <tr><td colSpan={6} style={{textAlign:'center'}}>No Customer List Available</td></tr> : 
                                                    ''} 
                                                {this.state.NewCustomerData.map((data,index)=>(
                                                           
                                                      <tr key={index}>
                                                            <td>{data.fld_name}</td>
                                                            <td>{data.fld_email}</td>
                                                            <td>{data.fld_emailverified}</td>
                                                            <td>{data.fld_mobile}</td>
                                                            <td>{data.fld_mobileverified}</td>
                                                            <td>{data.fld_source}</td>
                                                            <td>{moment(data.fld_updatedon).format('lll')}</td>
                                                        </tr>
                                                ))
                                                }
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
      )
  }
   

}

export default Dashboard;
