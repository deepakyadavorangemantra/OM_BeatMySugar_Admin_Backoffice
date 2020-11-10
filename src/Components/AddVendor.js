import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import moment from 'moment';
import PostApiCall from '../Api'
import GetApiCall from '../GetApi';
import{
    setvendorname,
    setgstin,setvendorpan,
    setvendortan,
    setvendoremail,setvendoraddress,
    setvendorcountry,setvendorstate,
    setvendorcity,setvendorpincode,
    setvendoraccount,setvendorbank,
    setvendorbranch,setvendorifsccode,
    setvendorcontactpersonname,
    setvendordesignation,
    setvendordepartment,
    setvendorphonenumber,setvendormobilenumber,
    setvendoremailaddress,setvendorlandmark,
    setvendorwebsite,
    setvendorclear
       }from './Actions/ActionType';
import {XSquare} from 'react-feather';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import {Edit3,Trash2,Monitor} from 'react-feather';

       const ImgUpload =({
        onChange,
        onCancel,
        src
      })=>
      
        <label htmlFor="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload" >
            <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
          
          </div>


       
          <input id="photo-upload" type="file" accept="image/*" onChange={onChange}/> 
    
          <XSquare className='product-img'
           onClick={onCancel}
           ></XSquare>
        </label>


const ImgUploadCheque =({
    onChange1,
    onCancel1,
    src1
  })=>
    <label htmlFor="photo-upload1" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload1" src={src1} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      
      </div>
    
     
   
      <input id="photo-upload1" type="file" accept="image/*" onChange={onChange1}/> 

      <XSquare className='product-img'
       onClick={onCancel1}
       ></XSquare>
    </label>
    
    
var arr = []
var arr2 = []
var arr3 = []
class AddVendor extends Component {


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
            Page7 : 'Pending',
            Page8 : 'Pending',
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            imagePreviewUrlCheque: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',

            PositionData:[{'label':'Medicine','value' : 'madicine'},{'label':'Food','value' : 'Food'},{'label':'Footcare','value' : 'Footcare'},{'label':'Devices','value' : 'Devices'},{'label':'Food Delivery','value' : 'Food Delivery'}
            ],
            ImageData : [],
            ImageDataCheque : [],
            time: '10:00',
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            Designationdata:[],
             CountryData : [],
            CityData : [],
            StateData : [],
            CountryId: 0,
            StateId : 0,
            CityId : 0,
            Departmentdata:[],
            LicenseInfo:[],
            AccreditionInfo:[],

            LicenseNo:'',
            LicensesType:'',
            LicenseTypeName : '', 

            AccreditionName:'',
            ContactPersonData:[],
            ContactPersonName:'',
            Designation:'',
            Department:'',
            PhoneNumber:'',
            MobileNumber:'',
            EmailAddress:'',

            FacilityData : [],
            Facility : [],
            LicenseData : [],
            AboutData : [],
            AccData : [],
            Accreditation : [],



            TimingData : [
                {day : 'Monday',edit : false},
                {day : 'Tuesday',edit : false},
                {day : 'Wednesday',edit : false},
                {day : 'Thrusday',edit : false},
                {day : 'Friday',edit : false},
                {day : 'Saturday',edit : false},
                {day : 'Sunday',edit : false},
            ],

            TimingInfo : [

                {day : '',check : false, open : undefined, close : undefined, open1 : undefined, close1 : undefined},
                {day : '',check : false,open : undefined, close : undefined, open1 : undefined, close1 : undefined},
                {day : '',check : false,open : undefined, close : undefined, open1 : undefined, close1 : undefined},
                {day : '',check : false,open : undefined, close : undefined, open1 : undefined, close1 : undefined},
                {day : '',check: false,open : undefined, close : undefined, open1 : undefined, close1 : undefined},
                {day : '',check : false,open : undefined, close : undefined, open1 : undefined, close1 : undefined},
                {day : '',check : false,open : undefined, close : undefined, open1 : undefined, close1 : undefined},
            ],


            AddAccess : false,

            Status : 'Active',
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',


            MerchantId :''


        }
    }

    onChange = time => this.setState({ time })
 
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

          this.props.setvendorclear()

       
          Notiflix.Loading.Dots('')

          GetApiCall.getRequest("GetVendorFacilitiesData").then(resultdes =>
            resultdes.json().then(obj=> {

                // console.log(obj.data)

              this.setState({
               FacilityData: obj.data,
                
              })
            }))


            GetApiCall.getRequest("GetVendorAccreditationData").then(resultdes =>
                resultdes.json().then(obj=> {
    
                    // console.log(obj.data)
    
                  this.setState({
                   AccData: obj.data,
                    
                  })
                }))


            GetApiCall.getRequest("GetVendorLicenseData").then(resultdes =>
                resultdes.json().then(obj=> {
    
                    // console.log(obj.data)
    
                  this.setState({
                   LicenseData: obj.data,
                    
                  })
                }))

                
                GetApiCall.getRequest("GetCountry").then(resultdes =>
                    resultdes.json().then(obj => {
          
                          this.setState({
                            CountryData : obj.data ,
                            
                          })
          
                      if(obj.data.length != 0 ){
                        this.props.setvendorcountry(obj.data[100].label)
                         
                        this.setState({
                            CountryId : 101,
                            
                        })
                      }
        
                      PostApiCall.postRequest({
          
                        countryid : obj.data[100].value,
        
                      },"GetState").then((results) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        results.json().then(objstate => {
                  
                      
                        if(results.status == 200 || results.status==201){
        
        
                            if(objstate.data.length != 0 ){
                                this.props.setvendorstate(objstate.data[0].label)
                                this.setState({
                                    StateId : objstate.data[0].value,
                                     StateData : objstate.data,
                                   
                                })
                              }
        
        
                              PostApiCall.postRequest({
          
                                stateid : objstate.data[0].value,
                
                              },"GetCity").then((resultscity) => 
                              
                                // const objs = JSON.parse(result._bodyText)
                                resultscity.json().then(objcity => {
                          
                              
                                if(resultscity.status == 200 || resultscity.status==201){
                
                
                                    if(objcity.data.length != 0 ){
                                        this.props.setvendorcity(objcity.data[0].label)
                                        // this.props.setpermanentcity(objcity.data[0].label)
                                        this.setState({
                                            CityId : objcity.data[0].value,
                                            CityData : objcity.data,
                                                                                 })
                                      }
                
                                }
                            }))
        
                        }
                    }))
                     
                
                    // Notiflix.Loading.Remove()
                
                }) 
                );


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
           
                            if(filteredRights[i].fld_menuname == 'Add Vendors'){
                
                              if(filteredRights[i].fld_access == 1){
                      
                               this.setState({
                                 AddAccess : true
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
        
    }
   
   
    photoUpload = e =>{
        e.preventDefault();
        if(e.target.files[0] != undefined){
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
      }

      onCancelPressed  = e =>{
        e.preventDefault();
        this.setState({
          imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png'
        })
      }
  


      photoUploadCheque = e =>{
        e.preventDefault();
        if(e.target.files[0] != undefined){
        if (e.target.files[0].size < 100000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file1: file,
            imagePreviewUrlCheque: reader.result,
            ImageDataCheque : file
          });
        }
        reader.readAsDataURL(file);
    } else {
        Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
      }
    }
      }

      onCancelPressedCheque  = e =>{
        e.preventDefault();
        this.setState({
          imagePreviewUrlCheque: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png'
        })
      }
  

    onChangeName(vendorname){
        this.props.setvendorname(vendorname.target.value)
    }
    onChangeGst(gstin){
        this.props.setgstin(gstin.target.value)
    }
    onChangePan(pancard){
        if((this.state.AlphaNumericRegex.test(pancard.target.value) && pancard.target.value.length <= 10)){
       
        this.props.setvendorpan(pancard.target.value)
    }
    }
    onChangeTan(tan){
        if((this.state.AlphaNumericRegex.test(tan.target.value) && tan.target.value.length <= 10)){
       
        this.props.setvendortan(tan.target.value)
    }
   }

   onChangeAbout(p){
    this.setState({AboutData: p.editor.getData()})  
}

    SaveMasterinfo(){

      

        if(this.props.vendorcredential.VendorName!=''){
            if(this.props.vendorcredential.GSTIN!=''){
                if(this.props.vendorcredential.PAN!=''){
                    if(this.props.vendorcredential.PAN.length == 10){
                        // if(this.props.vendorcredential.TAN!=''){
                            if(this.state.MerchantId){
                                if(this.state.Facility.length > 0){
                                
                               
                        this.setState({
                            PageTitle : '2',
                            Page1 : 'Done'
                        }) 
                    }
                    else{
                        Notiflix.Notify.Failure('Please select facilities/services.') 
                      }
                    }
                    else{
                        Notiflix.Notify.Failure('Please enter vendor merchant id.') 
                      }
                    // }
                    // else{
                    //     Notiflix.Notify.Failure('Please enter TAN number.') 
                    //   }
                    }
                    else{
                        Notiflix.Notify.Failure('Please enter a valid PAN number.') 
                      }

                }
                else{
                    Notiflix.Notify.Failure('Please enter PAN Number.')
                  }

            }
            else{
                Notiflix.Notify.Failure('Please enter GST Number of vendor.')
              }

        }
        else{
            Notiflix.Notify.Failure('Please enter vendor name.')
          }
    }

    onChangeLicensetype(licensetype){
        this.props.setvendorlicense(licensetype.target.value)
    }
    onChangeLicenseno(licenseno){
        this.props.setvendorlicenseno(licenseno.target.value)
    }

    SaveLicense(){
        if(this.state.LicenseInfo.length > 0){

                this.setState({
                    PageTitle : '3',
                    Page2 : 'Done'
                }) 
             

            }
        else{
            Notiflix.Notify.Failure('Add atleast one license information.')
          }
    }

    OnAddLicenses(){
        if(this.state.LicensesType!=''){

            if(this.state.LicenseNo!=''){
               
                var dt = this.state.LicenseInfo.filter((value)=>value.LicensesType==this.state.LicensesType)

                if(dt=='')
                {
                    arr.push({
                        LicensesType:this.state.LicensesType,
                        LicenseNo:this.state.LicenseNo,
                        LicenseTypeName : this.state.LicenseTypeName
                    })

                    this.setState({
                        LicenseInfo:arr
                    })

                    this.setState({
                        LicensesType:'',
                        LicenseNo:'',
                        LicenseTypeName : ''
                    })
                   
                }
                else
                {
                    Notiflix.Notify.Failure('License already added.'); 
                }

            }
            else{
                Notiflix.Notify.Failure('Please enter license number.')
              } 
        }
        else{
            Notiflix.Notify.Failure('Please enter license type.')
          }
    

    }

    
    

    SaveAccredition(){
       
        if(this.state.Accreditation.length>0 ){
            this.setState({
                PageTitle : '4',
                Page3 : 'Done'
            }) 
        
        }
        else{
            Notiflix.Notify.Failure('Add atleast one accredition for vendor.')
          }
        }
       
    

    onChangeEmail(email){
        this.props.setvendoremail(email.target.value)
    }
    onchangeWebsite(website){
        this.props.setvendorwebsite(website.target.value)
    }
    onChangeAddress(address){
        this.props.setvendoraddress(address.target.value)
    }
    onChangeLandmark(landmark){
        this.props.setvendorlandmark(landmark.target.value)
    }
    onChangeCountry(country){
        // this.props.setvendorcountry(country.target.value)
        this.setState({
            CountryId : country.target.value
          })
         this.props.setvendorcountry(this.state.CountryData[country.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: country.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setvendorstate(obj.data[0].label)

                this.setState({
                    StateId : obj.data[0].value
                  })
         
                               PostApiCall.postRequest(
                                 {
                                   stateid: obj.data[0].value
                                 },
                                 "GetCity"
                               ).then(resultscity =>
                               
                                 resultscity.json().then(objcity => {
                                   if (resultscity.status == 200 || resultscity.status == 201) {
                               
                                     this.setState({
                                      CityData : objcity.data,
                                      StateData : obj.data
                                     })
                                        if(objcity.data.length >  0){
                                            this.props.setvendorcity(objcity.data[0].label)
                                     
                                            this.setState({
                                       
                                              CityId : objcity.data[0].value
                                            })
                                        }
                                     Notiflix.Loading.Remove()
                                     
         
                                   }
                                 })
                               );
              
             }
           })
         );
    }
    onChangeState(state){
        this.setState({
            StateId: state.target.value
          })

          Notiflix.Loading.Dots('Please wait...');
      
          for(var i = 0;i<Object.keys(this.state.StateData).length;i++){
        
            if(this.state.StateData[i].value == state.target.value){
          
              this.props.setvendorstate(this.state.StateData[i].label);
            }
          }
      
          PostApiCall.postRequest(
            {
              stateid: state.target.value
            },
            "GetCity"
          ).then(results =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then(obj => {
              if (results.status == 200 || results.status == 201) {

                if(obj.data.length > 0){
                this.props.setvendorcity(obj.data[0].label)
            this.setState({
              CityData : obj.data,
                CityId : obj.data[0].value
            })
        }
        Notiflix.Loading.Remove()        
        // this.props.cityData(obj.data)
                
              }
            })
          );

    }
    onChangeCity(city){
        this.setState({
            CityId : city.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityData).length;i++){
        
            if(this.state.CityData[i].value == city.target.value){
          
              this.props.setvendorcity(this.state.CityData[i].label);
            }
          }
    }

    onChangePincode(pincode){
        if((this.state.NumRegex.test(pincode.target.value)) && (pincode.target.value.length <= 6)){
 
        this.props.setvendorpincode(pincode.target.value)
    }
}
     
    SaveContactinfo(){
        if(this.props.vendorcredential.Email!=''){
            if(this.state.EmailRegex.test(this.props.vendorcredential.Email)){
                    if(this.props.vendorcredential.Address!=''){
                        if(this.props.vendorcredential.Country!=''){
                            if(this.props.vendorcredential.State!=''){
                                if(this.props.vendorcredential.City!=''){
                                    if(this.props.vendorcredential.Pincode!=''){
                                        if(this.props.vendorcredential.Pincode.length == 6){
                                            this.setState({
                                                PageTitle: '5',
                                                Page4: 'Done'
                                  })
                                        }
                                        else
                                        {
                                            Notiflix.Notify.Failure('Please enter valid pincode.'); 
                                        }
                                    }
                                    else{
                                        Notiflix.Notify.Failure('Please enter pincode.')
                                     }  
                                }
                                else{
                                    Notiflix.Notify.Failure('Please select city.')  
                                }
                            }
                            else{
                                Notiflix.Notify.Failure('Please select state.')  
                            }
                        }
                        else{
                            Notiflix.Notify.Failure('Please select country.')  
                        }

                    }
                    else{
                        Notiflix.Notify.Failure('Please enter complete address.') 
                     
                    }
            
            }
            else
            {
                Notiflix.Notify.Failure('Please enter valid email address.'); 
            }   
        }
        else{
            Notiflix.Notify.Failure('Please enter email address.')
           }
    }

    onChangeAccount(accountnumber){
        this.props.setvendoraccount(accountnumber.target.value)
    }
    onchangeBank(bankname){
        this.props.setvendorbank(bankname.target.value)
    }
    onChangeBranch(branch){
        this.props.setvendorbranch(branch.target.value)
    }
    onChangeIfsc(ifsccode){
        this.props.setvendorifsccode(ifsccode.target.value)
    }

    SaveBankdetail(){
        if(this.props.vendorcredential.AccountNumber!=''){
            if(this.props.vendorcredential.BankName!=''){
                if(this.props.vendorcredential.Branch!=''){
                    if(this.props.vendorcredential.IFSCCode!=''){
                        if(JSON.stringify(this.state.ImageDataCheque) != '[]'){
                        this.setState({
                                    PageTitle : '6',
                                    Page5 : 'Done'
                                })

                            }
                            else{
                                Notiflix.Notify.Failure('Please upload a cancelled cheque photo.')
                               }
                    }
                    else{
                        Notiflix.Notify.Failure('Please enter IFSC code.')
                       }
                }
                else{
                    Notiflix.Notify.Failure('Please enter branch.')
                   }
            }
            else{
                Notiflix.Notify.Failure('Please enter bank name.')
               }
        }
        else{
            Notiflix.Notify.Failure('Please enter account number.')
           }
    }

    SaveTime(){
        var time = this.state.TimingInfo.filter(value => value.check)

    

        var cn = 0

        if(time.length > 0){
            for(var i =0 ; i<time.length;i++){
                if(time[i].open == undefined || time[i].close == undefined){

                    // Notiflix.Notify.Failure('Please select opening & closing timings for health center.')
                    cn = 1
                }

            }
            if(cn == 1){
                Notiflix.Notify.Failure('Please select opening & closing timings for vendor for seleted days.')
            }else
            {
        this.setState({
                    PageTitle : '7',
                    Page6 : 'Done'
                })
    }
}else{Notiflix.Notify.Failure('Please select timings for vendor.')}  
}


OnAddContactPerson(){

    if(this.state.ContactPersonName!=''){
        if(this.state.Designation!=''){
            if(this.state.Department!=''){
                    if(this.state.MobileNumber!=''){
                        if(this.state.MobileNumber.length == 10){
                            if(this.state.EmailAddress !=''){
                             if(this.state.EmailRegex.test(this.state.EmailAddress)){
                                var dt = this.state.ContactPersonData.filter((value)=>value.MobileNumber==this.state.MobileNumber)
                                  if(dt==''){
                                      arr3.push({
                                          ContactPersonName:this.state.ContactPersonName,
                                          Designation:this.state.Designation,
                                          Department:this.state.Department,
                                          MobileNumber:this.state.MobileNumber,
                                          EmailAddress:this.state.EmailAddress,
                                          PhoneNumber:this.state.PhoneNumber,
                                           
                                      })
                                      this.setState({
                                          ContactPersonData:arr3
                                      })
                                      this.setState({
                                      
                                        ContactPersonName:'',
                                        Designation:'',
                                        Department:'',
                                        MobileNumber:'',
                                        EmailAddress:'', 
                                        PhoneNumber:'',
                                      })
                                  }
                                  else{
                                    Notiflix.Notify.Failure('Contact person already present.'); 
                                  }
                                
                                }
                                else{
                                    Notiflix.Notify.Failure('Please enter valid email address.')
                                   }
                            }
                            else{
                                Notiflix.Notify.Failure('Please enter contact person email address.')
                               }
                        }
                        else{
                            Notiflix.Notify.Failure('Please enter valid mobile number.')
                           }
                    }
                    else{
                        Notiflix.Notify.Failure('Please enter contact person mobile number.')
                       }

            }
            else{
                Notiflix.Notify.Failure('Please enter contact person department.')
               }
        }
        else{
            Notiflix.Notify.Failure('Please enter contact person designation.')
           }
    }
    else{
        Notiflix.Notify.Failure('Please enter contact person name.')
       }

}
    SaveContactPerson(){
                   if(this.state.ContactPersonData.length>0){
                            this.setState({
                                                PageTitle : '8',
                                                Page7 : 'Done'
                                            })
                                    }
                                   
        else{
            Notiflix.Notify.Failure('Add atleast one contact person information.')
           }
    }


    OnAddVendorFacilities(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        var count = 0
          
        if(this.state.Facility.length > 0){

            for(var i =0 ; i <this.state.Facility.length;i++){


                PostApiCall.postRequest({

                    vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
                    facilityid : this.state.Facility[i].value,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll'),
                         },"AddVendorFacilitiesMapping").then((results) => 
                
                   // const objs = JSON.parse(result._bodyText)
                   results.json().then(obj1 => {
            
                
                   if(results.status == 200 || results.status==201){

                    count = count +1

                    if(count == this.state.Facility.length){

                        this.OnAddVendorLicense(obj)

                    }

                   }
                }))

            }


        }else
        {
        this.OnAddVendorLicense(obj)
        }
    }


    OnAddVendorLicense(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        var count = 0
          
        if(this.state.LicenseInfo.length > 0){

            for(var i =0 ; i <this.state.LicenseInfo.length;i++){


                PostApiCall.postRequest({

                    vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
                    licenseid : this.state.LicenseInfo[i].LicensesType,
                    number : this.state.LicenseInfo[i].LicenseNo,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll'),
                         },"AddVendorLicenseMapping").then((results) => 
                
                   // const objs = JSON.parse(result._bodyText)
                   results.json().then(obj1 => {
            
                
                   if(results.status == 200 || results.status==201){

                    count = count +1

                    if(count == this.state.LicenseInfo.length){

                        this.OnAddVendorAccreditation(obj)

                    }

                   }
                }))

            }

        }else
        {

            this.OnAddVendorAccreditation(obj)
        }

    }


    OnAddVendorAccreditation(obj){


        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        var count = 0
          
        if(this.state.Accreditation.length > 0){

            for(var i =0 ; i <this.state.Accreditation.length;i++){


                PostApiCall.postRequest({

                    vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
                    accreditationid : this.state.Accreditation[i].value,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll'),
                         },"AddVendorAccreditationmapping").then((results) => 
                
                   // const objs = JSON.parse(result._bodyText)
                   results.json().then(obj1 => {
            
                
                   if(results.status == 200 || results.status==201){

                    count = count +1

                    if(count == this.state.Accreditation.length){

                        this.OnAddVendorContactPerson(obj)

                    }

                   }
                }))

            }

        }else
        {

            this.OnAddVendorContactPerson(obj)
        }

    }



    OnAddVendorContactPerson(obj){
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        var count = 0
          
        if(this.state.ContactPersonData.length > 0){

            for(var i =0 ; i <this.state.ContactPersonData.length;i++){


                PostApiCall.postRequest({

                    vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
                    name : this.state.ContactPersonData[i].ContactPersonName,
                    designation : this.state.ContactPersonData[i].Designation,
                    department : this.state.ContactPersonData[i].Department,
                    phone : this.state.ContactPersonData[i].PhoneNumber,
                    mobile : this.state.ContactPersonData[i].MobileNumber,
                    email : this.state.ContactPersonData[i].EmailAddress,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll'),
                         },"AddVendorContactPersonMapping").then((results) => 
                
                   // const objs = JSON.parse(result._bodyText)
                   results.json().then(obj1 => {
            
                
                   if(results.status == 200 || results.status==201){

                    count = count +1

                    if(count == this.state.ContactPersonData.length){

                        this.OnAddVendorTimings(obj)

                    }

                   }
                }))

            }

        }else
        {

            this.OnAddVendorTimings(obj)
        }
    }

    OnAddVendorTimings(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        var count = 0

        var time = this.state.TimingInfo.filter(value => value.check)

        if(time.length > 0){
            for(var i = 0;i<time.length;i++){

                PostApiCall.postRequest({
    
                    vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
                    day : time[i].day,
                    openingtime : moment(time[i].open).format(),
                    closingtime : moment(time[i].close).format(),
                    openingtime1 :time[i].open1 == undefined ? '' : moment(time[i].open1).format(),
                    closingtime1 : time[i].close1 == undefined ? '' : moment(time[i].close1).format(),
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll'),
                          },"AddVendorTimingMapping").then((results) => 
                 
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(objs => {
             
                 
                    if(results.status == 200 || results.status==201){
    
                        count = count + 1
                        if(count == time.length){
    
                            this.OnAddVendorLogo(obj)
    
                        }
                    }
                }))
            }


        }
        else
        {
            this.OnAddVendorLogo(obj)
        }

    }



    OnAddVendorLogo(obj)
    {

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
      
        // console.log(this.state.imagedata != '')
        if(JSON.stringify(this.state.ImageData)  != '[]'){
      
          const form = new FormData();
           
          form.append('file', this.state.ImageData);
          form.append('foldername' , 'Vendor')
          form.append('filename' , 'Logo-'+(JSON.parse(JSON.stringify(obj.data[0]))).VendorId)
          
        fetch(this.state.ImageApiUrl, {
          method: 'POST',
          body: form
          }).then((image) => {
          
          image.json().then(data => ({
          data: data,
          status: image.status
          })
          ).then(res => {
         
            // console.log(obj.data[0])
      
            PostApiCall.postRequest({
      
                vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
              logo : 'https://images.beatmysugar.com/images/Vendor/'+res.data.Message.split(',')[2].split('=')[1].trim(),
              updatedon : moment().format('lll'),
              updatedby : details[0].fld_staffid
      
       
           },"UpdateVendorLogo").then((results1) => 
           
             // const objs = JSON.parse(result._bodyText)
             results1.json().then(obj1 => {
       
           
             if(results1.status == 200 || results1.status==201){
      
              this.OnAddVendorCheque(obj)
      
             }
            }))
          })
         
        })
      
      }else
      {
        // console.log('in no cover')
        this.OnAddVendorCheque(obj)
      }

    }


    OnAddVendorCheque(obj){


        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
      
        // console.log(this.state.imagedata != '')
        if(JSON.stringify(this.state.ImageDataCheque)  != '[]'){
      
          const form = new FormData();
           
          form.append('file', this.state.ImageDataCheque);
          form.append('foldername' , 'Vendor')
          form.append('filename' , 'Cheque-'+(JSON.parse(JSON.stringify(obj.data[0]))).VendorId)
          
        fetch(this.state.ImageApiUrl, {
          method: 'POST',
          body: form
          }).then((image) => {
          
          image.json().then(data => ({
          data: data,
          status: image.status
          })
          ).then(res => {
         
            // console.log(obj.data[0])
      
            PostApiCall.postRequest({
      
                vendorid : (JSON.parse(JSON.stringify(obj.data[0]))).VendorId,
                cheque : 'https://images.beatmysugar.com/images/Vendor/'+res.data.Message.split(',')[2].split('=')[1].trim(),
              updatedon : moment().format('lll'),
              updatedby : details[0].fld_staffid
      
       
           },"UpdateVendorCheque").then((results1) => 
           
             // const objs = JSON.parse(result._bodyText)
             results1.json().then(obj1 => {
       
           
             if(results1.status == 200 || results1.status==201){
      
                Notiflix.Loading.Remove()
                this.props.setvendorclear()
                Notiflix.Notify.Success('Vendor added successfully.')
                window.location.href = '/vendorlist'
      
             }
            }))
          })
         
        })
      
      }else
      {
        Notiflix.Loading.Remove()
        this.props.setvendorclear()
        Notiflix.Notify.Success('Vendor added successfully.')
        window.location.href = '/vendorlist'
     
      }
    }


    AddVendorFinalSubmit(){

        if(this.state.AddAccess){
            
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
          

        Notiflix.Loading.Dots('');
            
            PostApiCall.postRequest({

                 name : this.props.vendorcredential.VendorName,
                 gst : this.props.vendorcredential.GSTIN,
                 pan : this.props.vendorcredential.PAN,
                 tan : this.props.vendorcredential.TAN,
                 about : this.state.AboutData,
                 email : this.props.vendorcredential.Email,
                 website : this.props.vendorcredential.Website,
                 address : this.props.vendorcredential.Address,
                 landmark : this.props.vendorcredential.Landmark,
                 city : this.props.vendorcredential.City,
                 state : this.props.vendorcredential.State,
                 country : this.props.vendorcredential.Country,
                 pincode : this.props.vendorcredential.Pincode,
                 accountnumber : this.props.vendorcredential.AccountNumber,
                 bankname : this.props.vendorcredential.BankName,
                 branch : this.props.vendorcredential.Branch,
                 ifsc : this.props.vendorcredential.IFSCCode,
                 status : this.state.Status,
                 approved : 'No',
                 updatedby : details[0].fld_staffid,
                 updatedon : moment().format('lll'),
                 merchantid : this.state.MerchantId
                      },"AddVendor").then((results) => 
             
                // const objs = JSON.parse(result._bodyText)
                results.json().then(obj => {
         
             
                if(results.status == 200 || results.status==201){

                    this.setState({
                        PageTitle : '8',
                        Page8 : 'Done'
                    })
                    this.OnAddVendorFacilities(obj)


                }

            }))

        }
        else{
            Notiflix.Notify.Failure('You are not authorised to continue.'); 
         }
       
    }



    render() {
        return (
            <div className="App">
                <div id="wrapper">
                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row page-title">
                                    <div className="col-md-12">
                                        <nav aria-label="breadcrumb" className="float-right mt-1">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Vendor Management</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Add New Vendor</li>
                                            </ol>
                                        </nav>
                                        <h4 className="mb-1 mt-0">Add New Vendor</h4>
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
                                                        }} className="wizardlist nav-link">Master Info</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            className="wizardlist nav-link">Licences</a></li>
                                                 <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            className="wizardlist nav-link">Accreditions</a></li>
                                                 <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                className="wizardlist nav-link">Contact Information</a></li>
                                                    <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page5 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '5',
                                                                            Page5: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    className="wizardlist nav-link">Bank Details</a></li>
                                                         <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page6 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '6',
                                                                                Page6: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        className="wizardlist nav-link">Timings</a></li>
                                                                        <li className={this.state.PageTitle == '7' ? 'active nav-item' : this.state.Page7 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                            if (this.state.Page7 == 'Done') {
                                                                                this.setState({
                                                                                    PageTitle: '7',
                                                                                    Page7: 'Done',
                
                                                                                })
                                                                            }
                                                                        }}
                                                                            className="wizardlist nav-link">Contact Persons</a></li>
                                                                            <li className={this.state.PageTitle == '8' ? 'active nav-item' : this.state.Page8 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                                if (this.state.Page8 == 'Done') {
                                                                                    this.setState({
                                                                                        PageTitle: '8',
                                                                                        Page6: 'Done',
                    
                                                                                    })
                                                                                }
                                                                            }}
                                                                                className="wizardlist nav-link">Vendor Status</a></li>
                                                    
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
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Master Info</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="row">
                                                                                  <div className="col-md-4">
                                                                                  <label for="validationCustom05">Vendor Logo (Size &lt; 100kb, 500*500)</label>
                                                                                  <div className="form-group">
                                                                                  <div className="div1">
                                                                                  <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
                                                                                
                                                                                           </div>
                                                                                   </div>
                                                                                  </div>
                                                                                  <div className="col-md-8">
                                                                                   <div className="row">
                                                                                   
                                                                               <div className="col-md-12">
                                                                               <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Vendor Name<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                   value={this.props.vendorcredential.VendorName}
                                                                                   onChange={this.onChangeName.bind(this)}
                                                                                  ></input>
                                                                                   
                                                                               </div>
                                                                           </div> 
                                                                                   </div> {/* end row */}
                                                                                
                                                                                   <div className="row">
                                                                                   <div className="col-md-6">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">GSTIN<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                   value={this.props.vendorcredential.GSTIN}
                                                                                   onChange={this.onChangeGst.bind(this)} ></input>
                                                                                  
                                                                               </div>
                                                                             </div>
                                                                                   <div className="col-md-6">
                                                                                       <div className="form-group mb-2">
                                                                                           <label for="validationCustom05">PAN<span className="mandatory">*</span></label>
                                                                                           <input type="text" className="form-control" id="validationCustom05"
                                                                                           value={this.props.vendorcredential.PAN}
                                                                                           onChange={this.onChangePan.bind(this)}></input>
                                                                                          
                                                                                       </div>
                                                                                   </div>
                                                                               </div> {/* end row */}
                                                                               <div className="row">
                                                                                    <div className="col-md-6">
                                                                                    <div className="form-group mb-2">
                                                                                    <label for="validationCustom05">TAN</label>
                                                                                    <input type="text" className="form-control" id="validationCustom05"
                                                                                         value={this.props.vendorcredential.TAN}
                                                                                         onChange={this.onChangeTan.bind(this)}></input>
                                                                                   
                                                                                </div>
                                                                                    </div>

                                                                                    <div className="col-md-6">
                                                                                    <div className="form-group mb-2">
                                                                                    <label for="validationCustom05">Merchant Id<span className="mandatory">*</span></label>
                                                                                    <input type="text" className="form-control" id="validationCustom05"
                                                                                         value={this.state.MerchantId}
                                                                                         onChange={(text)=>{
                                                                                             if(this.state.NumRegex.test(text.target.value))
                                                                                             {
                                                                                             this.setState({
                                                                                                 MerchantId : text.target.value
                                                                                             })
                                                                                            }
                                                                                         }}></input>
                                                                                   
                                                                                </div>
                                                                                    </div>
                                                                                  
                                                                               </div>

                                                                            
                                                                                  
                                                                                  </div>
                                                                                    
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast" style={{overflow : 'visible'}}>
                                                                
                                                                <div className="toast-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="row">
                                                                            <div className="col-md-12">
                                                                            <div className="form-group">
                                                                            <label for="sw-arrows-first-name" >Type Of Products/Services (Select one or more facilities/services)<span className="mandatory">*</span></label>
                                                                            
                                                                            <Select  isMulti
                                                                                options={this.state.FacilityData}
                                                                                onChange={(fac)=>{
                                                                                    this.setState({
                                                                                        Facility : fac
                                                                                    })

                                                                                }}
                                                                            />
                                                                        </div>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </div>

                                                                  
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                
                                                                <div className="toast-body">
                                                                    <div className="row">
                                                                    <div className="col-md-12">
                                                                    <div className="form-group">
                                                                    <label for="sw-arrows-first-name" >About The Vendor</label>
                                                                    
                                                                    <div className="niceeditors">
                                                                    <CKEditor
                                                                    config={{
                                                                        extraPlugins: "justify,font,colorbutton",
                                                                     }}
                                                                            data={this.state.AboutData}
                                                                            onChange={this.onChangeAbout.bind(this)}   
                                                                      />
                                                                    </div>
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
                                                                        // onClick={() => {

                                                                        //     this.setState({
                                                                        //         PageTitle: '2',
                                                                        //         Page1: 'Done'
                                                                        //     })
                                                                        // }}
                                                                        onClick={this.SaveMasterinfo.bind(this)}>Next</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div id="sw-arrows-step-2"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '2' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className="toast-header">
                                                                    <strong className="mr-auto">Licences</strong>
                                                                </div>
                                                                <div className="toast-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group mb-3">
                                                                                <label for="validationCustom01">License Type<span className="mandatory">*</span></label>
                                                                                <select type="text" className="form-control" 
                                                                                value={this.state.LicensesType}
                                                                                onChange = {(text)=>{
                                                                                    this.setState({
                                                                                        LicensesType : text.target.value
                                                                                    })
                                                                                    for(var i = 0 ;i<this.state.LicenseData.length ;i++){
                                                                                        if(this.state.LicenseData[i].value == text.target.value){
                                                                                            this.setState({
                                                                                                LicenseTypeName : this.state.LicenseData[i].label
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }}
                                                                               >
                                                                               <option>Select License Type</option>
                                                                               {this.state.LicenseData.map(title => (
                           
                                                                                    <option key={title.value} value={title.value}>
                                                                                        {title.label}
                                                                                    </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                       <div className="col-md-6">
                                                                            <div className="form-group mb-3">
                                                                                <label for="validationCustom01">License Number<span className="mandatory">*</span></label>
                                                                                <input type="text" className="form-control" 
                                                                                value={this.state.LicenseNo} 
                                                                                onChange = {(text)=>{
                                                                                    this.setState({
                                                                                        LicenseNo : text.target.value
                                                                                    })
                                                                                }}
                                                                                 />
                                                                            </div>
                                                                        </div>
                                                                      
                                                                    </div>

                                                                    <div>
                                                                    <button className="btn btn-primary" style={{float: 'right',marginBottom: '9px'}}
                                                               onClick={this.OnAddLicenses.bind(this)}
                                                                    > Add Licences</button>
                                                                </div>
                                                                    
                                                                </div>
                                                                </div>

                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
            
                                           <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body">
                                                <div className="table-responsive">    
                                                <table id="selection-datatable" className="table table-striped dt-responsive nowrap" style={{textAlign:'center'}}>
                                                        <thead style={{
                                                              background: '#2e4a9a',
                                                              color: '#fff'
                                                        }}>
                                                            <tr>
                                                                <th style={{borderRight : '1px solid #fff'}}>Licences Type</th>
                                                                <th style={{borderRight : '1px solid #fff'}}>Licences No.</th>
                                                                <th>Action</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                    
                                                 
                                                       
                                                       
                                                <tbody >
                                                {this.state.LicenseInfo.length == 0 ? 
                                                    <tr><td colSpan={3} style={{textAlign:'center'}}>No Licences Available</td></tr> : 
                                                    ''}

                                                    {this.state.LicenseInfo.map((data,index)=>(
                                        
                                                       
                                                   
                                                        <tr key={index}>
                                                                  
                                                            <td>{data.LicenseTypeName}</td>
                                                            <td>{data.LicenseNo}</td>
                                                            
                                                            
                                                            <td> <div className="align-self-center" style={{    textAlign: 'center'}}>
                                                        <span  >
                                                        <Edit3 className="tableact" style={{marginRight : '10px'}}
                                                        onClick={()=>{
                                                          var data = [...this.state.LicenseInfo]
            
                                                          this.setState({
                                                             LicensesType:data[index].LicensesType,
                                                             LicensesTypeName:data[index].LicensesTypeName,
                                                             LicenseNo : data[index].LicenseNo,
                                                            
                                                          },()=>{
                                                            data.splice(index,1)
                                                            arr.splice(index,1)
                                                            this.setState({
                                                              LicenseInfo : data
                                                            })
                                                          })
                                                         
                                                        }}
                                                        ></Edit3>

                                                          <Trash2 className="tableact"
                                                           onClick={()=>{
                                                            var data = [...this.state.LicenseInfo ]
                                                            data.splice(index,1)
                                                            arr.splice(index,1)
                                                            this.setState({
                                                                LicenseInfo  : data
                                                            })
                                                          }}
                                                          ></Trash2>
                                                        </span>
                                                    </div></td>
                                                          
                                                          
                                                            </tr>
                                            
                                                            ))}
                                                      
                                                   
                   
                                                        
                   
                                                          </tbody>   
                                                 
                                                    </table>
                                                    </div> 
                                                    
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
                                                                    //     onClick={()=>{
                                                                         
                                                                    //      this.setState({
                                                                    //          PageTitle : '3',
                                                                    //          Page2 : 'Done'
                                                                    //      })
                                                                    //    }}
                                                                       onClick={this.SaveLicense.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 2*/}
                                                        <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>

                                            
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast" style={{overflow : 'visible'}}>
                                                                
                                                                <div className="toast-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="row">
                                                                            <div className="col-md-12">
                                                                            <div className="form-group">
                                                                            <label for="sw-arrows-first-name" >Accreditions (Select one or more accreditions)<span className="mandatory">*</span></label>
                                                                            
                                                                            <Select  isMulti
                                                                                options={this.state.AccData}
                                                                                onChange={(fac)=>{
                                                                                    this.setState({
                                                                                        Accreditation : fac
                                                                                    })

                                                                                }}
                                                                            />
                                                                        </div>
                                                                            </div>
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
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '2',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                            //  onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '4',
                                                                            //         Page3 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.SaveAccredition.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="sw-arrows-step-4"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className="toast-header">
                                                                    <strong className="mr-auto">Contact Informations</strong>
                                                                </div>
                                                                <div className="toast-body">
                                                                    <div className="row">
                                                                    <div className="col-md-6">
                                                                            <div className="form-group mb-3">
                                                                                <label for="validationCustom01">Email Address<span className="mandatory">*</span></label>
                                                                                <input type="text" className="form-control" 
                                                                                value={this.props.vendorcredential.Email}
                                                                                onChange={this.onChangeEmail.bind(this)} ></input>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group mb-3">
                                                                                <label for="validationCustom01">Website</label>
                                                                                <input type="text" className="form-control" 
                                                                                value={this.props.vendorcredential.Website}
                                                                                onChange={this.onchangeWebsite.bind(this)} ></input>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="form-group mb-3">
                                                                                <label for="validationCustom01">Address<span className="mandatory">*</span></label>
                                                                                <textarea type="text" className="form-control" id="validationCustom05"
                                                                                rows="4" cols="10"
                                                                                value={this.props.vendorcredential.Address}
                                                                                onChange={this.onChangeAddress.bind(this)}>
                                                                                </textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                <div className="form-group mb-3">
                                                                    <label for="validationCustom01">Landmark</label>
                                                                    <input type="text" className="form-control" 
                                                                    value={this.props.vendorcredential.Landmark}
                                                                    onChange={this.onChangeLandmark.bind(this)} ></input>
                                                                </div>
                                                            </div>
                                                                        <div className="col-md-3">
                                                                        <div className="form-group mb-3">
                                                                            <label for="validationCustom01">Country<span className="mandatory">*</span></label>
                                                                            <select type="text" className="form-control"  
                                                                            value={this.state.CountryId}
                                                                            onChange={this.onChangeCountry.bind(this)} >
                                                                                 {this.state.CountryData.map(
                                                                                schedule => (
                                                                                    <option
                                                                                    key={schedule.label}
                                                                                    value={schedule.value}
                                                                                    >
                                                                                    {schedule.label}
                                                                                    </option>
                                                                                )
                                                                                )}
                                                                               
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                        <div className="col-md-3">
                                                                            <div className="form-group mb-3">
                                                                                <label for="validationCustom01">State<span className="mandatory">*</span></label>
                                                                                <select type="text" className="form-control"  
                                                                                value={this.state.StateId}
                                                                                onChange={this.onChangeState.bind(this)} >
                                                                                { this.state.StateData.map(
                                                                                    schedule => (
                                                                                        <option
                                                                                        key={schedule.label}
                                                                                        value={schedule.value}
                                                                                        >
                                                                                        {schedule.label}
                                                                                        </option>
                                                                                    )
                                                                                    )}
                                                                                
                                                                            </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                        <div className="form-group mb-3">
                                                                            <label for="validationCustom01">City<span className="mandatory">*</span></label>
                                                                            <select type="text" className="form-control"  
                                                                            value={this.state.CityId}
                                                                            onChange={this.onChangeCity.bind(this)}>
                                                                            { this.state.CityData.map(
                                                                                schedule => (
                                                                                    <option
                                                                                    key={schedule.label}
                                                                                    value={schedule.value}
                                                                                    >
                                                                                    {schedule.label}
                                                                                    </option>
                                                                                )
                                                                                )} 
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                    <div className="form-group mb-3">
                                                                        <label for="validationCustom01">Pincode<span className="mandatory">*</span></label>
                                                                        <input type="text" className="form-control"
                                                                        value={this.props.vendorcredential.Pincode}
                                                                        onChange={this.onChangePincode.bind(this)} ></input>
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
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '3',
                                                                                        Page4: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                            // onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                             onClick={this.SaveContactinfo.bind(this)} >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}

                                                        <div id="sw-arrows-step-5"
                                                        className="tab-pane step-content"
                                                        style={{ display: this.state.PageTitle == '5' ? 'block' : 'none' }}>
                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast">
                                                            <div className="toast-header">
                                                                <strong className="mr-auto">Bank Details</strong>
                                                            </div>
                                                            <div className="toast-body">
                                                                <div className="row">
                                                                <div className="row col-md-8">
                                                                 <div className="col-md-12">
                                                                    <div className="form-group mb-3">
                                                                            <label for="validationCustom01">Account Number<span className="mandatory">*</span></label>
                                                                            <input type="text" className="form-control"
                                                                            value={this.props.vendorcredential.AccountNumber}
                                                                            onChange={this.onChangeAccount.bind(this)}></input>
                                                                    
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                    <div className="form-group mb-3">
                                                                            <label for="validationCustom01">Bank Name<span className="mandatory">*</span></label>
                                                                            <input type="text" className="form-control" 
                                                                            value={this.props.vendorcredential.BankName}
                                                                            onChange={this.onchangeBank.bind(this)} ></input>
                                                                    
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                    <div className="form-group mb-3">
                                                                            <label for="validationCustom01">Branch<span className="mandatory">*</span></label>
                                                                            <input type="text" className="form-control"
                                                                            value={this.props.vendorcredential.Branch}
                                                                            onChange={this.onChangeBranch.bind(this)} />
                                                                    
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                    <div className="form-group mb-3">
                                                                            <label for="validationCustom01">IFSC Code<span className="mandatory">*</span></label>
                                                                            <input type="text" className="form-control" 
                                                                            value={this.props.vendorcredential.IFSCCode}
                                                                            onChange={this.onChangeIfsc.bind(this)}
                                                                            />
                                                                    
                                                                        </div>
                                                                    </div>
                                                                   
                                                                 
                                                            

                                                                </div>
                                                                <div className="col-md-4">
                                                                  
                                                                  <label for="validationCustom05">Cancelled Cheque (Size &lt; 100kb, 500*500) <span className="mandatory">*</span></label>
                                                                  <div className="form-group">
                                                                  <div className="div1">
                                                                  <ImgUploadCheque onChange1={this.photoUploadCheque} src1={this.state.imagePreviewUrlCheque}/>
                                                                
                                                                           </div>
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
                                                                            onClick={() => {

                                                                                this.setState({
                                                                                    PageTitle: '4',
                                                                                    Page5: 'Done'
                                                                                })
                                                                            }}
                                                                        >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                        // onClick={()=>{
                                                   
                                                                        //     this.setState({
                                                                        //         PageTitle : '6',
                                                                        //         Page5 : 'Done'
                                                                        //     })
                                                                        //   }}
                                                                          onClick={this.SaveBankdetail.bind(this)}>Next</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/*---end 4 row-- */}

                                                    <div id="sw-arrows-step-6"
                                                    className="tab-pane step-content"
                                                    style={{ display: this.state.PageTitle == '6' ? 'block' : 'none' }}>

                                      <div className="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast" style={{overflow: 'visible'}}>

                               <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">


                                        <table id="selection-datatable" className="table table-striped dt-responsive nowrap">
                                            <thead style={{
                                                  background: '#2e4a9a',
                                                  color: '#fff'
                                            }}>
                                                <tr>
                                                <th style={{borderRight : '1px solid #fff'}}>Select Timing</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Day</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Opening Time<span className="mandatory">*</span></th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Closing Time<span className="mandatory">*</span></th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Opening Time</th>
                                                    <th >Closing Time</th>
                                                   
                                                   
                                                </tr>
                                            </thead>
                                        
                                     
                                           
                                           
                                    <tbody >
                                 
                                
                                        
                                         {this.state.TimingData.map((data,index)=>(
                                           
                                           
                                       
                                                <tr key={index}>
                                                      <td> <input type="checkbox"
                                                      onChange={()=>{
                                                          var arr = [...this.state.TimingInfo]
                                                          var arr2 = [...this.state.TimingData]
                                                        if(arr[index].check){

                                                            arr[index].check = false
                                                            arr2[index].edit = false

                                                            arr[index].day = ''
                                                            arr[index].open = undefined
                                                            arr[index].close = undefined
                                                            arr[index].open1 = undefined
                                                            arr[index].close1 = undefined
                                                            
                                                            this.setState({
                                                                TimingInfo : arr,
                                                                TimingData : arr2
                                                            })
                                                            
                                                        }else
                                                        {
                                                            arr[index].check = true
                                                            arr[index].day = data.day
                                                            arr[index].open = undefined
                                                            arr[index].close = undefined
                                                            arr[index].open1 = undefined
                                                            arr[index].close1 = undefined
                                                           
                                                            arr2[index].edit = true

                                                            this.setState({
                                                                TimingInfo : arr,
                                                                TimingData : arr2
                                                            })
                                                        }
                                                          
                                                      }}
                                                      checked={this.state.TimingInfo[index].check ? true : false}
                                                      style={{verticalAlign:'middle'}}/></td>
                                                <td>{data.day}</td>
                                                <td> <TimePicker
                                                disabled={!data.edit}
                                                // value={this.state.TimingInfo[index].open}
                                                value={this.state.TimingInfo[index].open == undefined ? '' : moment(this.state.TimingInfo[index].open)}
                                                        showSecond={false}
                                                        // format={format}
                                                        use12Hours
                                                        inputReadOnly
                                                        onChange ={(value)=>{
                                                            
                                                       
                                                            var arr = [...this.state.TimingInfo]

                                                            // console.log(arr[index].day)
                                                            arr[index].open = value 
                                                      
                                                            this.setState({
                                                                TimingInfo : arr,
                                                               
                                                            })
                                                        }}
                                                      
                                                    /></td>
                                                <td> 
                                                     <TimePicker
                                                 disabled={!data.edit}
                                                 value={this.state.TimingInfo[index].close == undefined ? '' : moment(this.state.TimingInfo[index].close)}
                                                showSecond={false}
                                                // format={format}
                                                use12Hours
                                                inputReadOnly
                                                onChange ={(value)=>{
                                                    
                                                    console.log(value)
                                                    var arr = [...this.state.TimingInfo]

                                                    if(arr[index].open != null && value != null && value <= arr[index].open){
                                                        Notiflix.Notify.Failure('Closing time cannot be earlier than opening time.')
                                                    }else
                                                    {
                                                    arr[index].close = value 
                                              
                                                    this.setState({
                                                        TimingInfo : arr,
                                                       
                                                    })
                                                }
                                                }}
                                                   
                                                    />
                                                    </td>


                                                    <td> 
                                            
                                                        <TimePicker
                                                         disabled={!data.edit}
                                                        value={this.state.TimingInfo[index].open1 == undefined ? '' : moment(this.state.TimingInfo[index].open1)}
                                                     showSecond={false}
                                                    //  format={format}
                                                     use12Hours
                                                    //  inputReadOnly
                                                     onChange ={(value)=>{
                                                       
                                                        var arr = [...this.state.TimingInfo]

                                                        // console.log(value >= arr[index].open)

                                                        if(value >= arr[index].open && value <= arr[index].close){
                                                            Notiflix.Notify.Failure('Time slot already booked for the day.')
                                                        }else
                                                        {
                                                            // console.log(value && value.format(format))
                                                            // console.log(arr[index].open1)
                                                            arr[index].open1 = value 
                                                   
                                                            this.setState({
                                                                TimingInfo : arr,
                                                               
                                                            })
                                                        }
                                                       
                                                         
                                                     }}
                                                   
                                                    />
                                                    </td>
                                                <td>  
                                                    <TimePicker
                                                        value={this.state.TimingInfo[index].close1 == undefined ? '' : moment(this.state.TimingInfo[index].close1)}
                                
                                                     disabled={!data.edit}
                                                  showSecond={false}
                                                //   format={format}
                                                  use12Hours
                                                  inputReadOnly
                                                  onChange ={(value)=>{
                                                      
                                                      var arr = [...this.state.TimingInfo]

                                                      if(value >= arr[index].open && value <= arr[index].close){
                                                        Notiflix.Notify.Failure('Time slot already booked for the day.')
                                                    }else

                                                    if(arr[index].open1 != null && value != null && value <= arr[index].open1){
                                                        Notiflix.Notify.Failure('Closing time cannot be earlier than opening time.')
                                                    }else
                                                    {
                                                      arr[index].close1 = value 
                                                
                                                      this.setState({
                                                          TimingInfo : arr,
                                                         
                                                      })
                                                  }}}
                                                   
                                                    />
                                                    </td>
                        
                                              
                                                </tr>
                                
                                          
                                        ))} 
       
                                            
       
                                              </tbody>   
                                     
                                        </table>
                                        
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
                                                                        onClick={() => {

                                                                            this.setState({
                                                                                PageTitle: '5',
                                                                                Page6: 'Done'
                                                                            })
                                                                        }}
                                                                    >Previous</button>
                                                                    <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                    // onClick={()=>{
                                               
                                                                    //     this.setState({
                                                                    //         PageTitle : '7',
                                                                    //         Page6 : 'Done'
                                                                    //     })
                                                                    //   }}
                                                                     onClick={this.SaveTime.bind(this)} >Next</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{/*---end 4 row-- */}
                                                <div id="sw-arrows-step-7"
                                                className="tab-pane step-content"
                                                style={{ display: this.state.PageTitle == '7' ? 'block' : 'none' }}>
                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">
                                                    <div className="toast-header">
                                                        <strong className="mr-auto">Contact Person</strong>
                                                    </div>
                                                    <div className="toast-body">
                                                        <div className="row">
                                                        <div className="col-md-6">
                                                        <div className="form-group mb-3">
                                                            <label for="validationCustom01">Name<span className="mandatory">*</span></label><br/>
                                                            <input type="text" className="form-control" 
                                                            value={this.state.ContactPersonName}
                                                            onChange={(text)=>{this.setState({ContactPersonName : text.target.value})}}
                                                            />
                                                            </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label for="validationCustom01">Designation<span className="mandatory">*</span></label><br/>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.Designation} 
                                                        onChange={(text)=>{this.setState({Designation : text.target.value})}} />
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label for="validationCustom01">Department<span className="mandatory">*</span></label><br/>
                                                    <input type="text" className="form-control" 
                                                    value={this.state.Department}
                                                    onChange={(text)=>{this.setState({Department : text.target.value})}} />
                                                    
                                                    </div>
                                            </div>
                                                        <div className="col-md-6">
                                                        <div className="form-group mb-3">
                                                            <label for="validationCustom01">Phone Number</label><br/>
                                                            <input type="text" className="form-control" 
                                                            value={this.state.PhoneNumber}
                                                            onChange={(text)=>{
                                                                if(this.state.NumRegex.test(text.target.value) && text.target.value.length <= 20){ 
                                                                this.setState({PhoneNumber : text.target.value})
                                                                }
                                                              }}/>
                                                            </div>
                                                    </div> 
                                                    <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label for="validationCustom01">Mobile Number<span className="mandatory">*</span></label><br/>
                                                        <input type="text" className="form-control"  
                                                        value={this.state.MobileNumber} 
                                                        onChange={(text)=>{
                                                            if(this.state.NumRegex.test(text.target.value) && text.target.value.length <= 10){ 
                                                            this.setState({MobileNumber : text.target.value})
                                                            }
                                                          }}
                                                        ></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label for="validationCustom01">Email Address<span className="mandatory">*</span></label><br/>
                                                        <input type="text" className="form-control" 
                                                        value={this.state.EmailAddress}
                                                        onChange={(text)=>{this.setState({EmailAddress : text.target.value})}}></input>
                                                        </div>
                                                    </div>
                                                        </div>

                                                        <div>
                                                        <button className="btn btn-primary" style={{float: 'right',marginBottom: '9px'}}
                                                         onClick={this.OnAddContactPerson.bind(this)}
                                                          > Add Contact Person</button>
                                                    </div>
                                                        
                                                    </div>
                                                </div>  

                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                aria-atomic="true" data-toggle="toast">

                           <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">


                                    <table id="selection-datatable" className="table table-striped dt-responsive nowrap">
                                        <thead style={{
                                              background: '#2e4a9a',
                                              color: '#fff'
                                        }}>
                                            <tr>
                                                <th style={{borderRight : '1px solid #fff'}}>Name</th>
                                                <th style={{borderRight : '1px solid #fff'}}>Department</th>
                                                <th style={{borderRight : '1px solid #fff'}}>Designation</th>
                                                <th style={{borderRight : '1px solid #fff'}}>Email</th>
                                                <th style={{borderRight : '1px solid #fff'}}>Mobile</th>
                                                <th style={{borderRight : '1px solid #fff'}}>Phone</th>
                                                <th>Action</th>
                                               
                                            </tr>
                                        </thead>
                                    
                                 
                                       
                                       
                                <tbody >
                             
                             {this.state.ContactPersonData.length == 0 ? 
                             <tr><td colSpan={7} style={{textAlign:'center'}}>No Contact Perosn Available</td></tr> : 
                             ''}
                                     {this.state.ContactPersonData.map((data,index)=>(
                                       
                                       
                                   
                                            <tr key={index}>
                                                 

                                            <td>{data.ContactPersonName}</td>
                                            <td>{data.Department}</td>
                                            <td>{data.Designation}</td>
                                            <td>{data.EmailAddress}</td>
                                            <td>{data.MobileNumber}</td>
                                            <td>{data.PhoneNumber}</td>
                                            <td> <div className="align-self-center" style={{    textAlign: 'center'}}>
                                        <span  >
                                        <Edit3 className="tableact"
                                        onClick={()=>{
                                          var data = [...this.state.ContactPersonData]

                                          this.setState({
                                            ContactPersonName : data[index].ContactPersonName,
                                            Department:data[index].Department,
                                            Designation : data[index].Designation,
                                            EmailAddress : data[index].EmailAddress,
                                            MobileNumber : data[index].MobileNumber,
                                            PhoneNumber : data[index].PhoneNumber,
                                           
                                          },()=>{
                                            data.splice(index,1)
                                            arr3.splice(index,1)
                                            this.setState({
                                              ContactPersonData : data
                                            })
                                          })
                                         
                                        }}
                                        ></Edit3>
                                          <Trash2 className="tableact"
                                           onClick={()=>{
                                            var data = [...this.state.ContactPersonData]
                                            data.splice(index,1)
                                            arr3.splice(index,1)
                                            this.setState({
                                              ContactPersonData : data
                                            })
                                          }}
                                          ></Trash2>
                                        </span>
                                    </div></td>
                                          
                                          
                                            </tr>
                            
                                      
                                    ))} 
   
                                        
   
                                          </tbody>   
                                 
                                    </table>
                                    
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
                                                                    onClick={() => {

                                                                        this.setState({
                                                                            PageTitle: '6',
                                                                            Page7: 'Done'
                                                                        })
                                                                    }}
                                                                >Previous</button>
                                                                <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                //  onClick={()=>{
                                           
                                                                //     this.setState({
                                                                //         PageTitle : '8',
                                                                //         Page7 : 'Done'
                                                                //     })
                                                                //   }}
                                                                 onClick={this.SaveContactPerson.bind(this)} >Next</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>{/*---end 4 row-- */}

                                            <div id="sw-arrows-step-8"
                                            className="tab-pane step-content"
                                            style={{ display: this.state.PageTitle == '8' ? 'block' : 'none' }}>
                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                aria-atomic="true" data-toggle="toast">
                                                <div className="toast-header">
                                                    <strong className="mr-auto">Vendor Status</strong>
                                                </div>
                                                <div className="toast-body">
                                                    <div className="row">
                                                    <div className="col-md-12">
                                                    <div className="form-group mb-3">
                                                        <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                                                        <label className="radio-inline">
                                                        <input type="radio" name="optradio"
                                                                   checked={this.state.Status == 'Active' ? true : false}
                                                                    onChange={()=>{
                                                                        this.setState({
                                                                            Status : 'Active'
                                                                        })
                                                                    }}/> Active
                                                                 </label>
                                                                <label className="radio-inline" style={{marginLeft:'10px'}}>
                                                                    <input type="radio" name="optradio" 
                                                                    checked={this.state.Status == 'Inactive' ? true : false}
                                                                    onChange={()=>{
                                                                        this.setState({
                                                                            Status : 'Inactive'
                                                                        })
                                                                    }}/> Inactive
                                                            </label>
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
                                                                onClick={() => {

                                                                    this.setState({
                                                                        PageTitle: '7',
                                                                        Page8: 'Done'
                                                                    })
                                                                }}
                                                            >Previous</button>
                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.AddVendorFinalSubmit.bind(this)}
                                       >Add Vendor</button>
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


function mapStateToProps(state){
    return{
        vendorcredential: state.VendorReducer
    }
}

export default connect(mapStateToProps, {
    setvendorname,
    setgstin,setvendorpan,
    setvendortan,
    setvendoremail,setvendoraddress,
    setvendorcountry,setvendorstate,
    setvendorcity,setvendorpincode,
    setvendoraccount,setvendorbank,
    setvendorbranch,setvendorifsccode,
    setvendorcontactpersonname,
    setvendordesignation,
    setvendordepartment,
    setvendorphonenumber,setvendormobilenumber,
    setvendoremailaddress,
    setvendorlandmark,
    setvendorwebsite,
    setvendorclear
})( AddVendor);

