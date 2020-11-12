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
import { Route,BrowserRouter as Router,Switch,a} from "react-router-dom";
import {Home,Briefcase, User,Layout,Users,Grid,Lock,Gift,BookOpen,PlusCircle,Clipboard,File,LogOut,Archive} from 'react-feather';
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
import Insurance from './Insurance';
import SocksColor from './SocksColor';
import Qualification from './Qualification';
import Specialization from './Specialization';
import VenderLicense from './VenderLicense'
import VenderFacilities from './VenderFacilities'
import AccreditationsMaster from './AccreditationsMaster'
import VendorView from './VendorView';
import ViewFoodVariant from './ViewFoodVariant';
import ViewBooksVariant from './ViewBooksVariant';
import ViewFootwearVariant from './ViewFootwearVariant';
import ViewSocksVariant from './ViewSocksVariant';


import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'

class Sidenav extends React.Component {

    constructor(props){
        super(props)
        this.state={
            UserData : [],
            Menu : [],
            SubMenu : [],
            LoginDetails : [],
            IconArr:[
                <Home/>,
                <User/>,
                <PlusCircle/> ,
                <Users/>,
                <BookOpen/>,
                <Grid/> ,
                <Users/>,
                <Archive />, 
                
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
            <div class="left-side-menu">
            <div class="media user-profile mt-2 mb-2">
                <img src={this.state.UserData.fld_photo == null || this.state.UserData.fld_photo == '' ? 'assets/images/ic_avtar.png' :  this.state.UserData.fld_photo} class="avatar-sm rounded-circle mr-2" alt="BeatMySugar" />
                <img src={this.state.UserData.fld_photo == null || this.state.UserData.fld_photo == '' ? 'assets/images/ic_avtar.png' :  this.state.UserData.fld_photo} class="avatar-xs rounded-circle mr-2" alt="BeatMySugar" />

                <div class="media-body">
        <h6 class="pro-user-name mt-0 mb-0">{this.state.UserData.fld_name}</h6>
                    <span class="pro-user-desc">{this.state.UserData.fld_designation}</span>
                </div>
                
            </div>
            
            <div class="sidebar-content">
                {/*<!--- Sidemenu -->*/}
                <div id="sidebar-menu" class="slimscroll-menu">
                    <ul class="metismenu" id="menu-bar">
                        <li>
                          <a href='/dashboard'>
                               <Home/>
                                <span> Dashboard </span>
                                </a>
                        </li>
                     {/* <li>
                          <a href='/customerlist'>
                               <User/>
                                <span>Customer Management
                                </span>
                                </a>
                        </li> */}
                        {/* <li>
                          <a href='/orderlist'>
                               <Clipboard/>
                                <span>Order Management
                                </span>
                                </a>
                        </li>  */}
                       <li>
                    <a aria-expanded="false" >
                        <User/>
                        <span> Vendor Management </span>
                        <span class="menu-arrow"></span>
                    </a>

                    <ul class="nav-second-level" aria-expanded="false">
                        <li>
                             <a href='/vendorlist'>
                             Vendors
                             </a>
                       
                        </li>
                        
                      
                        
                    </ul>
                </li>   
                             
                   
                        
                       <li>
                    
                        <a aria-expanded="false" >
                            <PlusCircle/>
                            <span> Product Management </span>
                            <span class="menu-arrow"></span>
                        </a>

                        <ul class="nav-second-level" aria-expanded="false">
                        <li>
                        <a href='/bookitemmasterlist'>Books</a>
                        </li> 
                            <li>
                                 <a href='/fooditemmasterlist'>
                                  Food Products
                                 </a>
                           
                            </li>
                            <li>
                                <a href='/footwearitemmasterlist'>Footwear</a>
                            </li>
                            <li>
                            <a href='/socksitemmasterlist'>Socks</a>
                        </li>
                       
                          
                            
                        </ul>
                    </li>  
                   
               
                
                      
                    <li>
                    <a aria-expanded="false" >
                        <Users/>
                        <span> Services & Listing education module </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="nav-second-level" aria-expanded="false">
                        <li>
                            <a href='/doctorlist'>
                              Doctors
                            </a>
                        </li>
                        <li>
                            <a href='/dietitianlist'>Nutritionist & Dietitians</a>
                        </li>
                        <li>
                            <a href='/healthcenterlist'>Health Center</a>
                        </li>
                    <li>
                            <a href='/healthcentermapping'>Health Center Mapping</a>
                        </li> 
                    
                        
                    </ul>
                </li>
                        
                     
                        <li>
                        <a href="javascript: void(0);" aria-expanded="false">
                            <BookOpen/>
                            <span> Health Knowledge </span>
                            <span class="menu-arrow"></span>
                        </a>

                        <ul class="nav-second-level" aria-expanded="false">
                            <li>
                                <a href='/articlelist'>
                                Articles
                                </a>
                        
                            </li>
                            <li>
                            <a href='/contributorlist'>Contributors</a>
                            </li>
                            
                        
                            
                        </ul>
                    </li>
                             
                            <li>
                            <a aria-expanded="false" >
                       
                            <Grid/>
                                <span> Master Management </span>
                                <span class="menu-arrow"></span>
                         </a>
                            <ul class="nav-second-level" aria-expanded="false">
                               

                            <li> <a href='/accreditationsmaster'>Accreditations Master</a></li>
                            <li><a href='/articlecategory'>Article Category Master</a></li>
                            <li><a href='/articlesubcategory'>Article Sub Category Master</a></li>
                            <li><a href='/articletag'>Article Tag Master</a></li>
                        
                                
                            <li> <a href='/bookscategorymaster'> Books Categories</a></li>
                                <li> <a href='/brandmaster'>Brand</a> </li>
                               
                             

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
                               
                                {/* <li> <a href='/qualificationmaster'>Qualification</a></li> */}
                                {/* <li> <a href='/specializationmaster'>Specialization</a></li> */}
                                <li> <a href='/venderlicenseonmaster'>Vendor License Master</a></li>
                                {/* <li> <a href='/venderfacilitiesonmaster'>Vender Facilities Master</a></li> */}
                                
                                {/* <li> <a href='/productcategorymaster'>Medicine Categories</a></li> */}
                                {/* <li> <a href='/healthservice'>Health Center Services</a></li> */}
                             


                                
                            
                            </ul>
                    
                    
                        </li>
                            

                      
                    <li>
                    <a href='/stafflist'>
                         <Users/>
                         <span style={{paddingLeft:'3px'}}>Staff Management </span>
                     </a>
                 </li>
               <li>
                 <a href='/jobopeninglist'>
                      <Archive/>
                      <span style={{paddingLeft:'3px'}}>Career Management</span>
                  </a>
              </li>
              {/* <li>
              <a href='/sellwithus'>
                   <Briefcase/>
                   <span style={{paddingLeft:'3px'}}>Sell With Us</span>
               </a>
           </li>
           <li>
              <a href='/insurance'>
                   <Briefcase/>
                   <span style={{paddingLeft:'3px'}}>Insurance</span>
               </a>
           </li> */}
             
                      
                    {/* <li>
                    <a href=''>
                         <File/>
                         <span style={{paddingLeft:'3px'}}>Reports </span>
                     </a>
                 </li> */}
                    
                    <li>
                           <a href='ChangePassword'>
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

                <div class="clearfix"></div>
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
        <Route exact path='/qualificationmaster' component={Qualification}></Route>
        <Route exact path='/specializationmaster' component={Specialization}></Route>
        <Route exact path='/venderlicenseonmaster' component={VenderLicense}></Route>
        <Route exact path='/venderfacilitiesonmaster' component={VenderFacilities}></Route>
        <Route exact path='/accreditationsmaster' component={AccreditationsMaster}></Route>                                
        <Route exact path='/healthcentermappinglist' component={HealthCenterMappingList}></Route>
        <Route exact path='/viewhealthcentermapping' component={ViewHealthCenterMapping}></Route>
        
        <Route exact path='/jobopeninglist' component={CareerList}></Route>
        <Route exact path='/addjobopening' component={Career}></Route>
        <Route exact path='/viewjobopening' component={ViewCareer}></Route>

        <Route exact path='/viewvendor' component={VendorView}></Route>
        
        <Route exact path='/sellwithus' component={SellWithUs}></Route>
        <Route exact path='/insurance' component={Insurance}></Route>


        <Route exact path='/viewfoodvariant' component={ViewFoodVariant}></Route>
        <Route exact path='/viewbookvariant' component={ViewBooksVariant}></Route>

        <Route exact path='/viewfootwearvariant' component={ViewFootwearVariant}></Route>

        <Route exact path='/viewsocksvariant' component={ViewSocksVariant}></Route>
        
        
       </Switch>
      
        </Router>
        <Footer/>
            
            </div>
        )
    }
}
export default Sidenav;