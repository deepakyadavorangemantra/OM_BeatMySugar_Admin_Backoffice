import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Dashboard from './Dashboard';
import AddStaff from './AddStaff'
import ChangePassword from './ChangePassword';
import FoodCategory from './FoodCategory'
import FoodFilterMaster from './FoodFilterMaster';
import FoodFlavourMaster from './FoodFlavourMaster'
import BooksLanguageMaster from './BooksLanguageMaster';
import BooksCategoryMaster from './BooksCategoryMaster';
import DeviceCategoryMaster from './DeviceCategoryMaster';
import DeviceFilterMaster from './DeviceFilterMaster';
import FootwearTypeMaster from './FootwearTypeMaster';
import FootwearColorMaster from './FootwearColorMaster';
import FootwearSizeMaster from './FootwearSizeMaster';
import SocksSizeMaster from './SocksSizeMaster';
import PackagingTypeMaster from './PackagingTypeMaster';
import PackagingSizeMaster from './PackagingSizeMaster';
import DosageFormMaster from './DosageFormMaster';
import ProductCategoryMaster from './ProductCategoryMaster';
import SaltMaster from './SaltMaster';
import BrandMaster from './BrandMaster';
import CompanyName from './CompanyName';
import AddBlog from './AddBlog';
import AddContributors from './AddContributors';
import FoodGrid from './FoodGrid';
import Food from './Food';
import Socks from './Socks';
import SocksGrid from './SocksGrid'
import FootwearGrid from './FootwearGrid';

import Footwear from './Footwear';
import BooksGrid from './BooksGrid'
import Books from './Books';
import AddVendor from './AddVendor'
import Doctors  from './Doctors'
import Dieticians from './Dietician'
import HealthCenterList from './HealthCenterList'
import HealthCenter from './HealthCenter';
import HealthCenterMapping from './HealthCenterMapping';
import AddHealthCenterMapping from './AddHealthCenterMapping';
import CustomerList from './CustomerList'
import OrderList from './OrderList'
import VendorList from './VendorList'
import DoctorList from './DoctorList'
import DietitianList from './DietitianList'
import { BrowserRouter as Router, Route, Switch, Link, a } from 'react-router-dom'
import {FileText, Home,Briefcase, User,Layout,Users,Grid,Lock,Gift,BookOpen,PlusCircle,Clipboard,File,LogOut,Archive,LifeBuoy, Bookmark, Eye, CheckCircle,RotateCcw,X,PieChart, Mail} from 'react-feather';
// import { Route,BrowserRouter as Router,Switch,a} from "react-router-dom";
// import {Home,Briefcase, User,Layout,Users,Grid,Lock,Gift,BookOpen,PlusCircle,Clipboard,File,LogOut,Archive,LifeBuoy, Bookmark, } from 'react-feather';
import Routes from './Routes';
import ArticleList from './ArticleList'
import ContributorList from './ContributorsList'
import StaffList from './StaffList'
import VariantsList from './VariantGrid';
import FootwearVariants from './FootVariant'
import BookVariants from './BookVariant';
import SocksVariants from './SocksVariant';
import HealthService from './HealthService';
import HealthFacility from './HealthFacility';
import StaffView from './StaffView';
import ContributorView from './ViewContributors';
import Blogview from './BlogView';
import ArticleTag from './ArticleTag';
import ArticleCategory from './ArticleCategory';
import ArticleSubCategory from './ArticleSubCategory';
import AddNewVariant from './AddVarient';
import AddNewBookVariant from './AddBookVariant';
import AddFootwearVariant from './AddFootwearVariant'
import DoctorView from './DoctorView';
import HealthCenterView from './HealthCenterView';
import DietitianView from './DietitianView';
import AddSocksVariant from './AddSocksVariant';
import ViewFood from './ViewFoodItem';
import ViewBook from './ViewBook';
import FootwearView from './ViewFootwear';
import SocksView from './ViewSocks';
import SocksType from './SocksTypeMaster';

import HealthCenterMappingList from './HealthCenterMappingList';
import ViewHealthCenterMapping from './ViewHealthCenterMapping';
import CareerList from './CareerList';
import Career from './Career';
import ViewCareer from './ViewCareer';
import SellWithUs from './SellWithUs';
import ViewSell from './ViewSellWithUs';
import Insurance from './Insurance';
import ViewInsurance from './ViewInsurance';
import SocksColor from './SocksColor';
import QualificationMaster from './QualificationMaster';
import SpecializationMaster from './SpecializationMaster';
import VenderLicense from './VenderLicense'
import VenderFacilitiesMaster from './VenderFacilitiesMaster'
import AccreditationsMaster from './AccreditationsMaster'
import VendorView from './VendorView';
import ViewFoodVariant from './ViewFoodVariant';
import ViewBooksVariant from './ViewBooksVariant';
import ViewFootwearVariant from './ViewFootwearVariant';
import ViewSocksVariant from './ViewSocksVariant';


import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import Helmet from 'react-helmet'
import AssignStaffRights from './AssignStaffRights';
import OfferGrid from './OfferGrid';
import AddOffer from './AddOffer';
import OfferView from './OfferView';
import NewOrderList from './NewOrderList';
import NewOrderView from './NewOrderView';
import VendorOrderList from './VendorOrders';
import VendorOrderView from './VendorOrderView';
 import SplitPayment from './SplitPayment';
 import ViewSplit from './ViewSplitPayment';
 import ReliefPayment from './ReliefPAyement';
 import ViewReliefPayment from './ViewReliefPayment'
import SplitOrdersList from './SplitOrdersList';
import TCSMaster from './TCSMaster';
import TDSMaster from './TDSMaster';
import SplitOrdersView from './SplitOrdersView';
import SettleOrdersView from './SettleOrdersView';
import SettleOrdersList from './SettleOrdersList';
import VerifyOrderList from './VerifyOrderList';
import verifyOrderView from './ViewVerifyOrder';
import ReturnManagement from './ReturnManagementList';
import RefundOrdersList from './RefundOrdersList';
import ViewRefundForm  from './ViewRefund'
import RefundOrderView from './RefundOrderView';
import CancelOrdersList from './CancelOrderList';
import ViewCancelOrders from './ViewCancelOrders';
import Orders from './Orders';
import Products from './Products';

import Customers from './Customers';
import ItemComparision from './ItemComparision';
import Vendors from './Vendors';
import SettlementReport from './SettlementReportNew';

import CODMaster from './CODMaster';
import ViewCustomer from './ViewCustomers';
import BMSMessage from './BMS_Message';
import BMSMessageGrid from './BMS_MessageList'
import FestiveOffers from './FestiveOffers';
import AddFestiveOffer from './AddFestiveOffer';
import UpdateFestiveOffers from './UpdateFestiveOffers';

import EduChapter from '../Pages/Education/Chapter';
import EduCongratulations from '../Pages/Education/Congratulations';
import EduDashboard from '../Pages/Education/Dashboard';
import EduQuestion from '../Pages/Education/Question';
import EduTopics from '../Pages/Education/Topics';
import EduReminders from '../Pages/Education/Reminders';
import ChapterInfoDetails from '../Pages/Education/ChapterInfoDetails';
import EduUsersFeedback from '../Pages/Education/UsersFeedback';
import GiftHamperDelivery from '../Pages/Education/GiftHamperDelivery';
import SetAlert from '../Pages/Education/SetAlert';

class Sidenav extends React.Component {

    constructor(props){
        super(props)
        this.state={
            UserData : [],
            Menu : [],
            SubMenu : [],
            LoginDetails : [],
            expandEducation: false,
            IconArr:[
                <Home/>,
                <User/>,
                <PlusCircle/> ,
                <Users/>,
                <BookOpen/>,
                <Grid/> ,
                <Users/>,
                <Archive />, 
                <User />,
                <Gift/>,
                <File />,
                <File />,
                <PieChart />,
                <RotateCcw/>,
                <X/>,
                <Bookmark />,
                <LifeBuoy/>,
                <CheckCircle />,
                <Gift/>
                
            ]
        }
    }
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "assets/js/app.min.js";
        script.async = true;
        document.body.appendChild(script);

      var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)

    //   console.log(details)

    if(details == null){
        window.location.href = '/'
    }

      this.setState({
          UserData : details[0]
      })


      Notiflix.Loading.Dots('');


      PostApiCall.postRequest({
      
        staffid : details[0].fld_staffid,
    
      },"GetUserMenu").then((results) => 
      
        // const objs = JSON.parse(result._bodyText)
        results.json().then(obj => {  
        if(results.status == 200 || results.status==201){
    
            // console.log(obj.data)
            this.setState({
                Menu : obj.data
            })
          
    
            PostApiCall.postRequest({
      
                staffid : details[0].fld_staffid,
            
              },"GetUserSubMenu").then((resultssub) => 
              
                // const objs = JSON.parse(result._bodyText)
                resultssub.json().then(objsub => {  
                if(resultssub.status == 200 || resultssub.status==201){
            
                  
                    var data = []
                    var arr = new Array(Object.keys(obj.data).length).fill([])
                    
    
                    if(obj.data.length == 0){
                        Notiflix.Loading.Remove()
                    }
                    for(var i = 0 ; i< Object.keys(obj.data).length;i++){
    
                    
                        data = []
                        for(var j = 0 ; j< Object.keys(objsub.data).length;j++){
    
                            if(obj.data[i].fld_menuid == objsub.data[j].fld_parentid){
    
                                data.push(objsub.data[j])
                                arr[i] = data
                                // console.log(arr)
                                this.setState({
                                    SubMenu : arr
                                })
    
                                
    
                            }
    
                        }
                        if(i == Object.keys(obj.data).length - 1){
                            localStorage.setItem('SubMenuRights',JSON.stringify(arr))
                            Notiflix.Loading.Remove()
                        }
    
    
                    }
                   
                }else{
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Failure('Something went wrong, try again later.')
                }
            }))
        }else
        {
            Notiflix.Loading.Remove()
            Notiflix.Notify.Failure('Something went wrong, try again later.')
        }
    }))


    }
    render(){   

        return(
            <div className="App">
            <Header></Header>
            <Router>
            <div className="left-side-menu">
            <div className="media user-profile mt-2 mb-2">
                <img src={this.state.UserData.fld_photo == null || this.state.UserData.fld_photo == '' ? 'assets/images/ic_avtar.png' :  this.state.UserData.fld_photo} className="avatar-sm rounded-circle mr-2" alt="BeatMySugar" />
                <img src={this.state.UserData.fld_photo == null || this.state.UserData.fld_photo == '' ? 'assets/images/ic_avtar.png' :  this.state.UserData.fld_photo} className="avatar-xs rounded-circle mr-2" alt="BeatMySugar" />

                <div className="media-body">
        <h6 className="pro-user-name mt-0 mb-0">{this.state.UserData.fld_name}</h6>
                    <span className="pro-user-desc">{this.state.UserData.fld_designation}</span>
                </div>
                
            </div>
            
            <div className="sidebar-content">
                {/*<!--- Sidemenu -->*/}
                <div id="sidebar-menu" className="slimscroll-menu">
                    <ul className="metismenu  mm-active" id="menu-bar">
                    
                    {this.state.Menu.map((menu,index)=>(
                                    
                                    <li key={index}>
                                         {/* <Helmet>
                                        <script src="assets/js/app.min.js"></script>
                                    </Helmet> */}

                               
                                    <a href={menu.fld_pagename}  >
                                   
                                       {this.state.IconArr[menu.fld_iconurl-1]}
                                <span> {menu.fld_menuname}</span>
                              {this.state.SubMenu[index] == undefined ? <span></span>  : this.state.SubMenu[index].length > 0 || menu.fld_menuname == 'Master Management' || menu.fld_menuname == 'Reports' ? <span className="menu-arrow"></span> : <span></span>}  
                                    </a>

                                    {menu.fld_menuname == 'Master Management' ? 
                                    
                                    <ul className="nav-second-level" aria-expanded="false">
                               

                                    <li> <a href='/accreditationsmaster'>Accreditations Master</a></li>
                                    <li><a href='/articlecategory'>Article Category Master</a></li>
                                    <li><a href='/articlesubcategory'>Article Sub Category Master</a></li>
                                    <li><a href='/articletag'>Article Tag Master</a></li>
                                
                                        
                                    <li> <a href='/bookscategorymaster'> Books Categories</a></li>
                                        <li> <a href='/brandmaster'>Brand</a> </li>
                                       
                                     
                                        <li> <a href='/codservicecharge'>COD Service Charge</a></li>
                                       <li><a href='/companymaster'>Company</a> </li>
                                       
        
                                       <li> <a href='/devicecategorymaster'> Device Categories  </a></li>
                                        <li> <a href='/devicefiltermaster'> Device Filters</a></li>
                                        <li> <a href='/dosageformmaster'>Dosage Forms</a></li>
                                       
                                        <li><a href='/foodcategory'>Food Categories</a> </li>
                                        <li><a href='/foodfiltermaster'>Food Filters</a></li>
                                        <li> <a href='/foodflavourmaster'> Food Flavour</a></li>
                                        <li> <a href='/footwearcolormaster'>Footwear Colors</a></li>
                                        <li> <a href='/footwearsizemaster'>Footwear Size</a></li>
                                        <li> <a href='/footweartypemaster'> Footwear Types</a></li>
        
                                        <li> <a href='/healthfacilitymaster'>Health Center Facility Master</a></li>
                                        <li> <a href='/healthservicemaster'>Health Center Service Master</a></li>
        
                                        <li> <a href='/bookslanguagemaster'> Language for Books</a> </li>
                                       
        
                                        <li> <a href='/packagingtypemaster'>Packaging Types</a></li>
                               
                                        <li> <a href='/saltmaster'>Salts</a></li>
                                        <li> <a href='/sockscolormaster'>Socks Color</a></li>
                                        <li> <a href='/sockssizemaster'>Socks Size</a></li>
                                        <li> <a href='/sockstypemaster'>Socks Type</a></li>
                                        <li> <a href='/specializationmaster'>Specialization</a></li>
                                       
                                        {/* <li> <a href='/qualificationmaster'>Qualification</a></li> */}
                                        {/* <li> <a href='/specializationmaster'>Specialization</a></li> */}
                                        <li> <a href='/venderlicenseonmaster'>Vendor License Master</a></li>
                                        {/* <li> <a href='/venderfacilitiesonmaster'>Vender Facilities Master</a></li> */}
                                        
                                        {/* <li> <a href='/productcategorymaster'>Medicine Categories</a></li> */}
                                        {/* <li> <a href='/healthservice'>Health Center Services</a></li> */}
                                     

                                        <li> <a href='/qualificationmaster'>Qualification Master</a></li>

                                        <li> <a href='/tcsmaster'>TCS Master</a></li>
                                <li> <a href='/tdsmaster'>TDS Master</a></li>
                             
                                        <li> <a href='/venderfacilitiesonmaster'>Vender Facilities Master</a></li>
                                <li> <a href='/venderlicenseonmaster'>Vendor License Master</a></li>
                            
        
        
                                        
                                    
                                    </ul>
                    
                    
                                    :


                                    menu.fld_menuname == 'Reports' ?


                                       
                                    <ul className="nav-second-level" aria-expanded="false">
                               

                                    <li> <a href='/orders'>Orders</a></li>
                                    <li> <a href='/customers'>Customers</a></li>
                                    <li><a href='/products'>Products</a></li>
                                    {/* <li><a href='/itemcomparision'>Item Comparision of Sales by Month</a></li> */}
                                    <li><a href='/vendors'>Vendors</a></li>
                                    <li><a href='/ordersettlement'>Settlement Report</a></li>
                                    </ul>

                                    :


                              this.state.SubMenu[index] == undefined ? <span></span>  : this.state.SubMenu[index].length > 0 ? 

                                    <ul className="nav-second-level" aria-expanded="false">
                                    {this.state.SubMenu[index] == undefined ? <span></span> :
                                    this.state.SubMenu[index].map((submenu,i)=>(
                                        submenu.fld_show == 1 && submenu.fld_access == 1 ? 
                                    <li key={i}>
                                     <Helmet>
                                        <script src="assets/js/app.min.js"></script>
                                    </Helmet>
                                        <a
                                        href={submenu.fld_pagename}
                                        >{submenu.fld_menuname}</a>
                                    </li>
                                  :
                                   '' 
                                    ))
                                    }
                                    </ul>
                                    : <span></span>}  
                                </li>
                                
                                ))}

                                 

                        
                                
                        
                                {/* <li>
                                <a href='/offerlist'>
                                     <Gift/>
                                     <span style={{paddingLeft:'3px'}}>Offer Managemnent </span>
                                 </a>
                             </li> */}


                             {/* <li>
                                <a href='/neworders'>
                                     <File/>
                                     <span style={{paddingLeft:'3px'}}>Order Managemnet </span>
                                 </a>
                             </li>

                             <li>
                                <a href='/vendororders'>
                                     <File/>
                                     <span style={{paddingLeft:'3px'}}>Vendor Orders </span>
                                 </a>
                             </li> */}
{/* 
<li>
                                <a href='/returnmanagementlist'>
                                     <RotateCcw/>
                                     <span style={{paddingLeft:'3px'}}>Return Management </span>
                                 </a>
                             </li>



                             <li>
                                <a href='/cancelorderlist'>
                                     <X/>
                                     <span style={{paddingLeft:'3px'}}>Cancel Order Management </span>
                                 </a>
                             </li>


                             <li>
                                <a href='/sellwithus'>
                                     <Bookmark/>
                                     <span style={{paddingLeft:'3px'}}>Sell With US </span>
                                 </a>
                             </li>
                             <li>
                             <a href='/insurance'>
                                  <LifeBuoy/>
                                  <span style={{paddingLeft:'3px'}}>Insurance </span>
                              </a>
                          </li>
                          <li>
                          <a href='/verifyorderlist'>
                               <CheckCircle/>
                               <span style={{paddingLeft:'3px'}}>Verify Order </span>
                           </a>
                       </li> */}


                        <li>
                            <a onClick={()=>{ this.setState({ expandEducation : !this.state.expandEducation}) } } aria-expanded="true" class=" mm-active" >
                                <Users/>
                                <span> Education Module </span>
                                <span class="menu-arrow"></span>
                            </a>
                            <ul class="nav-second-level mm-active " style={{ height : this.state.expandEducation=== true ?'131px !important':'140px', display: this.state.expandEducation=== true ? 'block':'none'}} >
                                <li>
                                    <Link to='/edu-dashboard'>  Dashboard </Link>
                                </li>
                                <li>
                                    <Link to='/edu-chapter'>  Chapters </Link>
                                </li>
                                <li>
                                    <Link to='/edu-congratulations'>Congratulations</Link>
                                </li>
                                <li>
                                    <Link to='/edu-feedback'>Feedback</Link>
                                </li>
                                <li>
                                    <Link to='/edu-gifthamperdelivery'>Gift Hamper</Link>
                                </li>               
                                <li>
                                    <Link to='/edu-setalert'>SetAlert</Link>
                                </li>        
                            </ul>
                        </li>                        

                       <li>
                       <a href='/bmssms'>
                            <Mail/>
                            <span style={{paddingLeft:'3px'}}>SMS </span>
                        </a>
                    </li>

                   

{/* <li>
                           <a href='/festiveoffers'>
                                <Gift/>
                                <span style={{paddingLeft:'3px'}}>Festive Offers</span>
                            </a>
                        </li> */}

                    <li>
                           <a href='/changepassword'>
                                <Lock/>
                                <span style={{paddingLeft:'3px'}}>Change Password </span>
                            </a>
                        </li>
                        
                         <li>
                         <a onClick={()=>{
                            localStorage.removeItem('LoginDetail')
                            window.location.href='/'}} aria-expanded="false">
                       <LogOut/>
                            <span> Logout </span>
                        </a>
                        </li>

                        
                    </ul>
                </div>
           
                {/*<!-- End Sidebar -->*/}

                <div className="clearfix"></div>
            </div>
           
            {/*<!-- Sidebar -left -->*/}

        </div>
        <Switch>
        <Route exact path='/dashboard' component={Dashboard}></Route>
        <Route exact path='/addstaff' component={AddStaff}></Route>
        <Route exact path='/changepassword' component={ChangePassword}></Route>
        <Route exact path='/foodcategory' component={FoodCategory}></Route>
        <Route exact path='/foodfiltermaster' component={FoodFilterMaster}></Route>
        <Route exact path='/foodflavourmaster' component={FoodFlavourMaster}></Route>
        <Route exact path='/bookslanguagemaster' component={BooksLanguageMaster}></Route>
        <Route exact path='/bookscategorymaster' component={BooksCategoryMaster}></Route>
        <Route exact path='/devicecategorymaster' component={DeviceCategoryMaster}></Route>
        <Route exact path='/devicefiltermaster' component={DeviceFilterMaster}></Route>
        <Route exact path='/footweartypemaster' component={FootwearTypeMaster}></Route>
        <Route exact path='/footwearcolormaster' component={FootwearColorMaster}></Route>
        <Route exact path='/footwearsizemaster' component={FootwearSizeMaster}></Route>
        <Route exact path='/sockssizemaster'     component={SocksSizeMaster}></Route>
        <Route exact path='/packagingtypemaster' component={PackagingTypeMaster}></Route>
        <Route exact path='/packagingsizemaster' component={PackagingSizeMaster}></Route>
        <Route exact path='/dosageformmaster' component={DosageFormMaster}></Route>
        <Route exact path='/productcategorymaster' component={ProductCategoryMaster}></Route>
        <Route exact path='/saltmaster' component={SaltMaster}></Route>
        <Route exact path='/brandmaster' component={BrandMaster}></Route>
        <Route exact path='/companymaster' component={CompanyName}></Route>
        <Route exact path='/addarticle' component={AddBlog}></Route>
        <Route exact path='/addcontributors' component={AddContributors}></Route>
        
        

        <Route exact path='/fooditemmasterlist' component={FoodGrid}></Route>
        <Route exact path='/addfooditemmaster' component={Food}></Route>
        
        <Route exact path='/socksitemmasterlist' component={SocksGrid}></Route>
        <Route exact path='/addsocksitemmaster' component={Socks}></Route>

        <Route exact path='/bookitemmasterlist' component={BooksGrid}></Route>
        <Route exact path='/addbookitemmaster' component={Books}></Route>

        <Route exact path='/footwearitemmasterlist' component={FootwearGrid}></Route>
        <Route exact path='/addfootwearitemmaster' component={Footwear}></Route>
        <Route exact path='/vendorlist' component={VendorList}></Route>
        <Route exact path='/addvendor' component={AddVendor}></Route>
        <Route exact path='/adddoctor' component={Doctors}></Route>
        <Route exact path='/adddietitians' component={Dieticians}></Route>

        <Route exact path='/healthcenterlist' component={HealthCenterList}></Route>
        <Route exact path='/addhealthcenter' component={HealthCenter}></Route>
        <Route exact path='/healthcentermapping' component={HealthCenterMapping}></Route>
        <Route exact path='/addhealthcentermapping' component={AddHealthCenterMapping}></Route>
        <Route exact path='/customerlist' component={CustomerList}></Route>
        <Route exact path='/orderlist' component={OrderList}></Route>
        <Route exact path='/doctorlist' component={DoctorList}></Route>
        <Route exact path='/dietitianlist' component={DietitianList}></Route>
        <Route exact path='/articlelist' component={ArticleList}></Route>
        <Route exact path='/contributorlist' component={ContributorList}></Route>
        <Route exact path='/stafflist' component={StaffList}></Route>
        <Route exact path='/foodvariantlist' component={VariantsList}></Route>
        <Route exact path='/footwearvariantlist' component={FootwearVariants}></Route>
        <Route exact path='/bookvariantlist' component={BookVariants}></Route>
        <Route exact path='/socksvariantlist' component={SocksVariants}></Route>
        <Route exact path='/healthservicemaster' component={HealthService}></Route>
        <Route exact path='/healthfacilitymaster' component={HealthFacility}></Route>
        <Route exact path='/viewstaff' component={StaffView}></Route>
        <Route exact path='/viewcontributor' component={ContributorView}></Route>
        <Route exact path='/articletag' component={ArticleTag}></Route>
        <Route exact path='/articlecategory' component={ArticleCategory}></Route>
        <Route exact path='/articlesubcategory' component={ArticleSubCategory}></Route>
        <Route exact path='/addfoodvariant' component={AddNewVariant}></Route>
        <Route exact path='/addbookvariant' component={AddNewBookVariant}></Route>
        <Route exact path='/addnewfootwearvariant' component={AddFootwearVariant}></Route>
        <Route exact path='/addsocksvariant' component={AddSocksVariant}></Route>

         <Route exact path='/viewarticle' component={Blogview}></Route>
        <Route exact path='/viewdoctor' component={DoctorView}></Route>
        <Route exact path='/viewhealthcenter' component={HealthCenterView}></Route>
        <Route exact path='/viewdietitian' component={DietitianView}></Route>
        <Route exact path='/viewfooditemmaster' component={ViewFood}></Route>
        <Route exact path='/viewbookitemmaster' component={ViewBook}></Route>
        <Route exact path='/viewfootwear' component={FootwearView}></Route>
        <Route exact path='/viewsocks' component={SocksView}></Route>
        <Route exact path='/sockstypemaster' component={SocksType}></Route>
        <Route exact path='/sockscolormaster' component={SocksColor}></Route>
        <Route exact path='/qualificationmaster' component={QualificationMaster}></Route>
        <Route exact path='/specializationmaster' component={SpecializationMaster}></Route>
        <Route exact path='/venderlicenseonmaster' component={VenderLicense}></Route>
        <Route exact path='/venderfacilitiesonmaster' component={VenderFacilitiesMaster}></Route>
        <Route exact path='/accreditationsmaster' component={AccreditationsMaster}></Route>                                
        <Route exact path='/healthcentermappinglist' component={HealthCenterMappingList}></Route>
        <Route exact path='/viewhealthcentermapping' component={ViewHealthCenterMapping}></Route>
        
        <Route exact path='/jobopeninglist' component={CareerList}></Route>
        <Route exact path='/addjobopening' component={Career}></Route>
        <Route exact path='/viewjobopening' component={ViewCareer}></Route>

        <Route exact path='/viewvendor' component={VendorView}></Route>
        
        <Route exact path='/sellwithus' component={SellWithUs}></Route>
        <Route exact path='/viewsellwithus' component={ViewSell}></Route>
        <Route exact path='/insurance' component={Insurance}></Route>
       <Route exact path='/viewinsurance' component={ViewInsurance}></Route>
                    
       


        <Route exact path='/viewfoodvariant' component={ViewFoodVariant}></Route>
        <Route exact path='/viewbookvariant' component={ViewBooksVariant}></Route>

        <Route exact path='/viewfootwearvariant' component={ViewFootwearVariant}></Route>

        <Route exact path='/viewsocksvariant' component={ViewSocksVariant}></Route>


        <Route exact path='/assignstaffrights' component={AssignStaffRights}></Route>

        <Route exact path='/offerlist' component={OfferGrid}></Route>
        <Route exact path='/addoffer' component={AddOffer}></Route>
        <Route exact path='/offerView' component={OfferView}></Route>
        
        <Route exact path='/neworders' component={NewOrderList}></Route>
        <Route exact path='/vieworder' component={NewOrderView}></Route>

        <Route exact path='/vendororders' component={VendorOrderList}></Route>
        <Route exact path='/viewvendororder' component={VendorOrderView}></Route>


        <Route exact path='/splitpayments' component={SplitPayment}></Route>
        <Route exact path='/view-split-payment' component={ViewSplit}></Route>
        <Route exact path='/releasepayments' component={ReliefPayment}></Route>
        <Route exact path='/view-relief-payment' component={ViewReliefPayment}></Route>
       
        <Route exact path='/splitorders' component={SplitOrdersList}></Route>
        <Route exact path='/tcsmaster' component={TCSMaster}></Route>
        <Route exact path='/tdsmaster' component={TDSMaster}></Route>
       
        <Route exact path='/viewsplitorder' component={SplitOrdersView}></Route>
        <Route exact path='/settleorders' component={SettleOrdersList}></Route>
        <Route exact path='/viewsettleorder' component={SettleOrdersView}></Route>
        <Route exact path='/verifyorderlist' component={VerifyOrderList}></Route>
        <Route exact path='/viewverifyorder' component={verifyOrderView}></Route>
       


        <Route exact path='/returnmanagementlist' component={ReturnManagement}></Route>
        <Route exact path='/viewreturndetail' component={ViewRefundForm}></Route>
        

        <Route exact path='/refundorders' component={RefundOrdersList}></Route>
        <Route exact path='/viewrefundorder' component={RefundOrderView}></Route>


        <Route exact path='/cancelorderlist' component={CancelOrdersList}></Route>

        <Route exact path='/viewcancelorder' component={ViewCancelOrders}></Route>
        <Route exact path='/orders' component={Orders}></Route>
        <Route exact path='/products' component={Products}></Route>
        <Route exact path='/customers' component={Customers}></Route>
        <Route exact path='/itemcomparision' component={ItemComparision }></Route>
        <Route exact path='/vendors' component={Vendors }></Route>
        <Route exact path='/ordersettlement' component={SettlementReport }></Route>
        
        <Route exact path='/codservicecharge' component={CODMaster}></Route>
        <Route exact path='/viewcustomers' component={ViewCustomer}></Route>
        <Route exact path='/bmssms' component={BMSMessage}></Route>
       

        <Route exact path='/festiveoffers' component={FestiveOffers}></Route>
        <Route exact path='/addfestiveoffer' component={AddFestiveOffer}></Route>
        <Route exact path='/viewfestiveoffers' component={UpdateFestiveOffers}></Route>

        {/* Education Module */}

        <Route exact path='/edu-chapter' component={EduChapter}></Route>
        <Route exact path='/edu-congratulations' component={EduCongratulations}></Route>
        <Route exact path='/edu-dashboard' component={EduDashboard}></Route>
        <Route exact path='/edu-question' component={EduQuestion}></Route>
        <Route exact path='/edu-topics' component={EduTopics}></Route>
        <Route exact path='/edu-chapterInfo' component={ChapterInfoDetails}></Route>
        <Route exact path='/edu-feedback' component={EduUsersFeedback}></Route>
        <Route exact path='/edu-gifthamperdelivery' component={GiftHamperDelivery}></Route>
        <Route exact path='/edu-setalert' component={SetAlert}></Route>

        
           
       </Switch>
      
        </Router>
        <Footer/>
            
            </div>
        )
    }
}
export default Sidenav;