import React, { Component } from 'react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import moment from 'moment';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'

var visible = false;

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" style={{height:'183px'}}>
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input
      accept="image/*"
      disabled
      id="photo-upload" type="file" onChange={onChange}/> 
    </label>

class CustomerView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            Page4 : 'Pending',
            Page5 : 'Pending',
            Page6 : 'Pending',
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

            GenderData: [
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Others", label: "Others" }
              ],
              MaritalStatusData: [
                { value: "Married", label: "Married" },
                { value: "Single", label: "Single" },
                { value: "Divorced", label: "Divorced" },
                { value: "Widowed", label: "Widowed" },
                { value: "Separated", label: "Separated" },
                { value: "Not Disclosed", label: "Not Disclosed" }
              ],
              BloodGroupData: [
                { value: "AB-", label: "AB-" },
                { value: "AB+", label: "AB+" },
                { value: "A-", label: "A-" },
                { value: "A+", label: "A+" },
                { label: "B-", value: "B-" },
                { label: "B+", value: "B+" },
                { label: "O-", value: "O-" },
                { label: "O+", value: "O+" }
              ],
              Designationdata:[],
              Departmentdata :[],
              Userdata:[],
              CountryData : [],
                CityData : [],
                StateData : [],
                CountryPermanentData : [],
                CityPermanentData : [],
                StatePermanentData : [],
                CountryId: 0,
                StateId : 0,
                CityId : 0,
                CountryPermanentId: 0,
                StatePermanentId : 0,
                CityPermanentId : 0,
                NumRegex: /^[0-9]*$/,
                PermanentSame : false,
                Status : 'Active',
                StaffId : '',
                ImageData : [],


                IsVisible : false,
                EditAccessGranted : false,

                Name:'',
                EmployeeId:'',
                Address:'',
                Country:'',
                State:'',
                City:'',
                Pincode:'',
                BillingAddress:'',
                BillingCountry:'',
                BillingState:'',
                BillingCity:'',
                BillingPincode:'',
                DOB:'',
                Email:'',
                Gender:'',
                Landmark:'',
                Occupation:'',
                Source:'',
                Mobile:'',
                SugarCubes:'',
                AreYouDiabetic:'',
                Diagnosed:'',
                LoginType:'',
                Age:'',
                MaritalStatus:'',
                TypeOfDiabetic:'',
                AddressData:[],
                FamilyProfileData:[]

    
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

    
           
          Notiflix.Loading.Dots('Please wait...');

        
  
          var det = localStorage.getItem('CustomersDetails')
          var StaffData = JSON.parse(det)
            //    console.log(StaffData)
  
          
          this.setState({
                   Staffid:StaffData.fld_userid,
                   Status:StaffData.fld_status,
                   imagePreviewUrl : StaffData.fld_profileimage,
                   Name:StaffData.fld_name,
                   EmployeeId:StaffData.fld_userid,
                   Address:StaffData.fld_address,
                   Country:StaffData.fld_country,
                   State:StaffData.fld_state,
                   City:StaffData.fld_city,
                   Pincode:StaffData.fld_pincode,
                   BillingAddress:StaffData.fld_billingaddress,
                   BillingCountry:StaffData.fld_billingcountry,
                   BillingState:StaffData.fld_billingstate,
                   BillingCity:StaffData.fld_billingcity,
                   BillingPincode:StaffData.fld_billingaddress,
                   DOB:StaffData.fld_dob,
                   Email:StaffData.fld_email,
                   Gender:StaffData.fld_gender,
                   Landmark:StaffData.fld_landmark,
                   Occupation:StaffData.fld_occupation,
                   Source:StaffData.fld_source,
                   Mobile:StaffData.fld_mobile,
                   SugarCubes:StaffData.fld_totalsugarkubes,
                   AreYouDiabetic:StaffData.fld_areyoudiabetic,
                   Diagnosed:StaffData.fld_diagnosed,
                   LoginType:StaffData.fld_logintype,
                   Age:StaffData.fld_age,
                   MaritalStatus:StaffData.fld_maritalstatus,
                   TypeOfDiabetic:StaffData.fld_typeofdiabetic
   


          })


          
       
         


          var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        PostApiCall.postRequest({
  
            staffid : details[0].fld_staffid,
        
          },"GetUserSubMenuAccessRights").then((resultssub) => 
          
            // const objs = JSON.parse(result._bodyText)
            resultssub.json().then(objsub => {  
            if(resultssub.status == 200 || resultssub.status==201){

           var filteredRights = objsub.data;
                // console.log(filteredRights)
        
                var con = 0
                for(var i = 0 ; i< filteredRights.length ;i++){
   
                    if(filteredRights[i].fld_menuname == 'Edit Staff'){
        
                      if(filteredRights[i].fld_access == 1){
                       this.setState({
                         EditAccessGranted : true
                       })
                      }
                    }
                   
                  con = con + 1
                  if(con == filteredRights.length){
                      Notiflix.Loading.Remove();
                  }
                }
        

            }

        }))


        PostApiCall.postRequest({
         customer_id : StaffData.fld_userid,
            // customer_id : 13,
      },"GetAddressCustomer").then((results) => 
        
          // const objs = JSON.parse(result._bodyText)
          results.json().then(obj => {

        
          if(results.status == 200 || results.status==201){

            this.setState({
                AddressData : obj.data
            })
            // console.log(obj.data)

          }
        }))

  
        
PostApiCall.postRequest(
    {
      userid:StaffData.fld_userid
    },
    "Get_UserFamilyInfoByIDWeb"
  ).then((results) =>
    results.json().then((obj) => {
      if (results.status == 200 || results.status == 201) {

        this.setState({
            FamilyProfileData:obj.data
        })
        console.log(this.state.FamilyProfileData)

        Notiflix.Loading.Remove()
      }
    }))

    }
   
   
    photoUpload = e =>{
        e.preventDefault();
        if (e.target.files[0].size < 100000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            ImageData : file
          });
        }
        reader.readAsDataURL(file);
     } else {
            Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
          }
      }

    



    render() {
        return (
            <div className="App">
                <div id="wrapper">
                    <div className="content-page">
                        <div class="content">
                            <div className="container-fluid">
                                <div className="row page-title">
                                    <div className="col-md-12">
                                        <nav aria-label="breadcrumb" class="float-right mt-1">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#">Customers Management</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">View Customers</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Customers</h4>
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
                                                        }} class="wizardlist nav-link">Personal Details</a></li>
                                                      
                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page3 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Health Background</a></li>
                                                  <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Address</a></li>
                                                    <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page4 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '4',
                                                                            Page4: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    class="wizardlist nav-link">Family Diabetic Profile</a></li>
                                                        
                                                    
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
                                                                        <strong class="mr-auto">Personal Details</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                  <div class="col-md-4">
                                                                                  <label for="validationCustom05">Upload Profile Photo (Size &lt; 100kb, 500*500)</label>
                                                                                  <div class="div1">
                                                                                               <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
                                                      
                                                                                     </div>
                                                                                  </div>
                                                                                  <div class="col-md-8">
                                                                                   <div class="row">
                                                                                 
                                                                                 
                                                                               <div class="col-md-12">
                                                                               <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Name</label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   disabled
                                                                                    value={this.state.Name}
                                                                                   
                                                                                 />
                                                                                   
                                                                               </div>
                                                                           </div>
                                                                                   </div> {/* end row */}
                                                                                
                                                                                   <div class="row">
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Mobile</label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   disabled
                                                                                    value={this.state.Mobile}
                                                                                  
                                                                                  />
                                                                                 
                                                                               </div>
                                                                             </div>
                                                                                   <div className="col-md-6">
                                                                                       <div class="form-group mb-2">
                                                                                           <label for="validationCustom05">Email</label>
                                                                                           <input type="text" class="form-control" id="validationCustom05"
                                                                                           disabled
                                                                                           value={this.state.Email}
                                                                                         
                                                                                           />
                                                                                          
                                                                                       </div>
                                                                                   </div>
                                                                               </div> {/* end row */}
                                                                               <div class="row">
                                                                                    <div class="col-md-6">
                                                                                    <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Date of Birth</label>
                                                                                    <input type="date" class="form-control" id="validationCustom05"
                                                                                    disabled
                                                                                    value={this.state.DOB}
                                                                                    max={moment().format('YYYY-MM-DD')}
                                                                                    onKeyDown={(e) => e.preventDefault()} 
                                                                                   
                                                                                    />
                                                                                   
                                                                                </div>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                    <label for="sw-arrows-first-name" >Gender</label>
                                                                                    <input value={this.state.Gender}
                                                                                    type="text" className="form-control"
                                                                                    disabled />
                                                                                   
                                                                                </div>
                                                                                    </div>
                                                                               </div>

                                                                            
                                                                                  
                                                                                  </div>
                                                                                    
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-3">
                                                                            <div class="form-group mb-2">
                                                                            <label for="validationCustom05">Age</label>
                                                                            <input type="text" class="form-control" id="validationCustom05"
                                                                            value={this.state.Age}
                                                                            disabled
                                                                            />
                                                                           
                                                                        </div>
                                                                            </div>

                                                                              <div class="col-md-3">
                                                                              <div class="form-group">
                                                                              <label for="sw-arrows-first-name" >Marital Status</label>
                                                                              
                                                                             <input type="text" class="form-control"
                                                                             value={this.state.MaritalStatus}
                                                                             disabled />
                                                                          </div>
                                                                              </div>
                                                                              <div class="col-md-3">
                                                                              <div class="form-group">
                                                                              <label for="sw-arrows-first-name" >Login Type</label>
                                                                            <input type="text" value={this.state.LoginType} class="form-control"
                                                                             disabled />
                                                                          </div>
                                                                              </div>
                                                                              <div class="col-md-3">
                                                                              <div class="form-group">
                                                                              <label for="sw-arrows-first-name" >Occupation</label>
                                                                            <input type="text" value={this.state.Occupation} class="form-control"
                                                                             disabled />
                                                                          </div>
                                                                              </div>
                                                                            
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                        
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                         onClick={() => {

                                                                            this.setState({
                                                                                PageTitle: '2',
                                                                                Page1: 'Done'
                                                                            })
                                                                        }}
                                                                        >Next</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                        <div id="sw-arrows-step-2"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '2' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Health Background</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Are You a Diabetic ?</label>
                                                                                <input type="text" 
                                                                                className="form-control" value={this.state.AreYouDiabetic} disabled/>
                                                                               
                                                                            </div>
                                                                        </div>
                                                                       <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Type Of Diabetic</label>
                                                                                <input type="text" class="form-control"  
                                                                                value={this.state.TypeOfDiabetic}
                                                                                disabled
                                                                              />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-12">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Diagnosed</label>
                                                                               <input type="text" value={moment(this.state.Diagnosed).format('ll')}
                                                                               className="form-control"
                                                                               disabled/>
                                                                            </div>
                                                                        </div>
 
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                  
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" 
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '1',
                                                                              Page2 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                         
                                                                         this.setState({
                                                                             PageTitle : '3',
                                                                             Page2 : 'Done'
                                                                         })
                                                                       }}
                                                                      >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 3*/}
                                                       

                                                        <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                         
                                                                {this.state.AddressData.map((dt,index)=>(
                                                                  <div className="toast fade show" role="alert" aria-live="assertive"
                                                                  aria-atomic="true" data-toggle="toast">
                                                                  <div class="toast-header">
                                                                      <strong class="mr-auto">Address</strong>
                                                                  </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Address</label>
                                                                                <textarea type="text" class="form-control" id="validationCustom05"
                                                                                rows="4" cols="10"
                                                                                value={dt.fld_address}
                                                                                disabled
                                                                               >
                                                                                </textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Street</label>
                                                                           
                                                                            <input className="form-control"
                                                                              value={dt.fld_street}
                                                                            disabled type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Landmark</label>
                                                                       
                                                                        <input className="form-control"
                                                                          value={dt.fld_landmark}
                                                                        disabled type="text" />
                                                                    </div>
                                                                </div>
                                                                        <div class="col-md-3">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Country</label>
                                                                           
                                                                            <input className="form-control"
                                                                              value={dt.fld_country}
                                                                            disabled type="text" />
                                                                        </div>
                                                                    </div>
                                                                        <div class="col-md-3">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">State</label>
                                                                                <input className="form-control" 
                                                                                 value={dt.fld_state}
                                                                                disabled type="text" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">City</label>
                                                                            <input className="form-control" 
                                                                             value={dt.fld_city}
                                                                            disabled type="text" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-3">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Pincode</label>
                                                                        <input className="form-control" 
                                                                         value={dt.fld_pincode}
                                                                            disabled type="text" />
                                                                    </div>
                                                                </div>
 
                                                                    </div>
                                                                   
                                                                </div>
                                                                </div>  
                                                                ))}
                                                         

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                   
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                            <button className="btn btn-secondary sw-btn-prev btn-radius-right"
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '2',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                            onClick={()=>{
                                                       
                                                                                this.setState({
                                                                                    PageTitle : '4',
                                                                                    Page3 : 'Done'
                                                                                })
                                                                              }}
                                                                             >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}

                                                        <div id="sw-arrows-step-4"
                                                        className="tab-pane step-content"
                                                        style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                      
                                                            {this.state.FamilyProfileData.map((info,index)=>(
                                                                  <div className="toast fade show" role="alert" aria-live="assertive"
                                                                  aria-atomic="true" data-toggle="toast">
                                                                  <div class="toast-header">
                                                                      <strong class="mr-auto">Family Diabetic Profile</strong>
                                                                  </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                 <div class="col-md-12">
                                                                 <div class="form-group mb-3">
                                                                     <label for="validationCustom01">Name</label>
                                                                     <input className="form-control" 
                                                                  value={info.fld_title + ' '+ info.fld_name}
                                                                 disabled type="text" />
                                                                 </div>
                                                             </div>
                                                             <div class="col-md-12">
                                                             <div class="form-group mb-3">
                                                                 <label for="validationCustom01">Date of Birth</label>
                                                                 <input className="form-control" 
                                                                  value={info.fld_dob}
                                                                 disabled type="text" />
                                                             </div>
                                                         </div>
                                                             <div class="col-md-3">
                                                             <div class="form-group mb-3">
                                                                 <label for="validationCustom01">Relationship</label>
                                                                 <input className="form-control" 
                                                                  value={info.fld_relation}
                                                                 disabled type="text" />
                                                             </div>
                                                         </div>
                                                             <div class="col-md-3">
                                                                 <div class="form-group mb-3">
                                                                     <label for="validationCustom01">Mobile</label>
                                                                     <input className="form-control" 
                                                                      value={info.fld_mobile}
                                                                     disabled type="text" />
                                                                 </div>
                                                             </div>
                                                             <div class="col-md-3">
                                                             <div class="form-group mb-3">
                                                                 <label for="validationCustom01">Email</label>
                                                                 <input className="form-control" 
                                                                  value={info.fld_email}
                                                                 disabled type="text" />
                                                             </div>
                                                         </div>
                                                         <div class="col-md-3">
                                                         <div class="form-group mb-3">
                                                             <label for="validationCustom01">Occupation</label>
                                                             <input type="text" class="form-control"  
                                                             disabled
                                                             value={info.fld_occupation}
                                                          ></input>
                                                         </div>
                                                     </div>
                                                     <div class="col-md-3">
                                                     <div class="form-group mb-3">
                                                         <label for="validationCustom01">Type of Diabetes</label>
                                                         <input type="text" class="form-control"  
                                                         disabled
                                                         value={info.fld_type}
                                                      ></input>
                                                     </div>
                                                 </div>
                                                 <div class="col-md-3">
                                                 <div class="form-group mb-3">
                                                     <label for="validationCustom01">Diagnosed Date</label>
                                                     <input type="text" class="form-control"  
                                                     disabled
                                                     value={moment(info.fld_diagnosedate).format('ll')}
                                                  ></input>
                                                 </div>
                                             </div>
                                                    
                                                                </div>
                                                                
                                                            </div>
                                                            </div> 
                                                            ))}
                                                       

                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast">
                                                            <div className='row'>
                                                               
                                                                <div className="col-md-12">
                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right"
                                                                            onClick={() => {

                                                                                this.setState({
                                                                                    PageTitle: '3',
                                                                                    Page4: 'Done'
                                                                                })
                                                                            }}
                                                                        >Previous</button>
                                                                     
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/*---end 4 row-- */}

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
        );
    }
}




export default CustomerView;
