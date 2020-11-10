import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
// import TimePicker from 'react-time-picker';
import TimePicker from 'react-times';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import moment from 'moment';

import { connect } from 'react-redux';
import Notiflix from 'notiflix';
import {
    setHealthCenterCodeHc,
    setHealthCenterTypeHc,
    setHealthCenterNameHc,
    setAddressHc,
    setAreaHc,
    setLandmarkHc,
    setCountryHc,
    setStateHc,
    setCityHc,
    setPincodeHc,
    setPhoneHc,
    setMobileNumberHc,
    setEmailAddressHc,
    setWebsiteAddressHc,
    setLatitudeHc,
    setLongitudeHc,
    setFacilitiesHc,
    setServicesHc,
    setShowonWebsiteHc,
    setApprovalHc,
    setClearHc
} from './Actions/ActionType'
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>

class HealthCenterView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            Page4 : 'Pending',
            Page5 : 'Pending',
            time: '10:00',

            DecimalRegex : /^(\d*\.?\d{0,4}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            MobileRegex : /^[0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            PositionData:[{'label':'Medicine','value' : 'madicine'},{'label':'Food','value' : 'Food'},{'label':'Footcare','value' : 'Footcare'},{'label':'Devices','value' : 'Devices'},{'label':'Food Delivery','value' : 'Food Delivery'}
            ],

            TypeData : [
                {label : 'Hospital' ,value : 'Hospital'},
                {label : 'Clinic' ,value : 'Clinic'},
                {label : 'Nursing Home' ,value : 'Nursing Home'},
                {label : 'Wellness Center' ,value : 'Wellness Center'},
                {label : 'Others' ,value : 'Others'}
            ],
            CountryData : [],
              CityData : [],
              StateData : [],
              CountryId: 0,
                StateId : 0,
                CityId : 0,

                ServicesData: [],
                FacilitiesData : [],
                Services: [],
                Facilities : [],

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

                    {day : '',check : false, open : '', close : ''},
                    {day : '',check : false,open : '', close : ''},
                    {day : '',check : false,open : '', close : ''},
                    {day : '',check : false,open : '', close : ''},
                    {day : '',check: false,open : '', close : ''},
                    {day : '',check : false,open : '', close : ''},
                    {day : '',check : false,open : '', close : ''},
                ],
                FlagData: [
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },               
                  ],
                  FinalTime : [],
                  HealthCenterId : '',


                  IsVisible : false,
                  EditAccessGranted : false,
                  ApproveAccessGranted : false
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

        this.props.setClearHc()


        var det = localStorage.getItem('HealthCenterDetails')
        var DocData = JSON.parse(det)

        Notiflix.Loading.Dots('');

// console.log(DocData)
                    this.setState({
                        HealthCenterId : DocData.fld_id
                    })
                this.props.setHealthCenterTypeHc(DocData.fld_type)
                this.props.setHealthCenterNameHc(DocData.fld_name)
                this.props.setAddressHc(DocData.fld_address)
                this.props.setAreaHc(DocData.fld_area)
                this.props.setLandmarkHc(DocData.fld_landmark)
                this.props.setCountryHc(DocData.fld_country)
                this.props.setStateHc(DocData.fld_state)
                this.props.setCityHc(DocData.fld_city)
                this.props.setPincodeHc(DocData.fld_pincode)
                this.props.setPhoneHc(DocData.fld_phone)
                this.props.setMobileNumberHc(DocData.fld_mobile)
                this.props.setEmailAddressHc(DocData.fld_email)
                this.props.setWebsiteAddressHc(DocData.fld_website)
                this.props.setLatitudeHc(DocData.fld_latitude)
                this.props.setLongitudeHc(DocData.fld_longitude)
                this.props.setShowonWebsiteHc(DocData.fld_showonwebsite)


                var sp = []
                if(DocData.Services != null){
                    for(var i = 0; i < DocData.Services.split(',').length ; i++){
                        

                        sp.push({label : DocData.Services.split(',')[i].split('#')[1],value : DocData.Services.split(',')[i].split('#')[0]})
                    }
                    this.setState({
                        Services : sp
                    })
                }


                var fc = []
                if(DocData.Facilities != null){
                    for(var i = 0; i < DocData.Facilities.split(',').length ; i++){
                        

                        fc.push({label : DocData.Facilities.split(',')[i].split('#')[1],value : DocData.Facilities.split(',')[i].split('#')[0]})
                    }
                    this.setState({
                        Facilities : fc
                    })
                }


                // var tm = []
                // if(DocData.Timing != null){
                //     for(var i = 0; i < DocData.Timing.split(',').length ; i++){
                        

                //         tm.push(DocData.Timing.split(',')[i])

                //     }

                //     var artm = [...this.state.TimingInfo]
                   
                //     for(var i = 0; i < this.state.TimingData.length ; i++){

                //         for(var j = 0; j < tm.length ; j++){

                        
                //             if(this.state.TimingData[i].day == tm[j].split('#')[0]){

                //                 artm[i].day = tm[j].split('#')[0]
                //                 artm[i].check = true
                //                 artm[i].open = tm[j].split('#')[1]
                //                 artm[i].close = tm[j].split('#')[2]

                //                 this.setState({
                //                     TimingInfo : artm
                //                 })
                //                 // console.log(artm)
                //             }


                //         }

                //     }
                  
                // }




        GetApiCall.getRequest("GetHealthCenterFacilities").then(resultdes =>
            resultdes.json().then(objdesignation => {
             
            
              this.setState({
                FacilitiesData : objdesignation.data,
                
              })
            }))


            GetApiCall.getRequest("GetHealthCenterServices").then(resultdes =>
                resultdes.json().then(objdesignation => {
                
                  this.setState({
                    ServicesData : objdesignation.data,
                    
                  })
                }))
    

                GetApiCall.getRequest("GetCountry").then(resultdes =>
                    resultdes.json().then(obj => {
          
                          this.setState({
                            CountryData : obj.data ,
                           
                          })
          
                          if(obj.data.length != 0 ){
              
                            this.setState({
                                CountryId : obj.data.filter(value=>value.label == DocData.fld_country)[0].value,
                      
                            })
                          }
    
                      PostApiCall.postRequest({
          
                        countryid :obj.data.filter(value=>value.label == DocData.fld_country)[0].value,
        
                      },"GetState").then((results) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        results.json().then(objstate => {
                  
                      
                        if(results.status == 200 || results.status==201){
        
        
                            if(objstate.data.length != 0 ){
                                    
                                this.setState({
                                    StateId : objstate.data.filter(value=>value.label == DocData.fld_state)[0].value,
                               
                                    StateData : objstate.data,
                                   
                                })
                              }
        
        
                              PostApiCall.postRequest({
          
                                stateid : objstate.data.filter(value=>value.label == DocData.fld_state)[0].value,
                
                              },"GetCity").then((resultscity) => 
                              
                                // const objs = JSON.parse(result._bodyText)
                                resultscity.json().then(objcity => {
                          
                              
                                if(resultscity.status == 200 || resultscity.status==201){
                
                
                                    if(objcity.data.length != 0 ){
                                            
                                        this.setState({
                                            CityId : objcity.data.filter(value=>value.label == DocData.fld_city)[0].value,
                                       
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
           
                            if(filteredRights[i].fld_menuname == 'Edit Health Center'){
                
                              if(filteredRights[i].fld_access == 1){
                               this.setState({
                                 EditAccessGranted : true
                               })
                              }
                            }else if(filteredRights[i].fld_menuname == 'Approve Health Center'){
                
                                if(filteredRights[i].fld_access == 1){
                                 this.setState({
                                   ApproveAccessGranted : true
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
   
    handleHealthCenterCodeChange = event =>{
        this.props.setHealthCenterCodeHc(event.target.value)
    }


    handleHealthCenterTypeChange = event =>{
        this.props.setHealthCenterTypeHc(event.target.value)
    }


    handleHealthCenterNameChange = event =>{
        this.props.setHealthCenterNameHc(event.target.value)
    }

    handleAddressChange = event =>{
        this.props.setAddressHc(event.target.value)
    }

    handleAreaChange = event =>{
        this.props.setAreaHc(event.target.value)
    }

    handleLandmarkChange = event =>{
        this.props.setLandmarkHc(event.target.value)
    }

    handleCountryChange = event =>{
        // this.props.setCountry(event.target.value)
        this.setState({
            CountryId : event.target.value
          })
         this.props.setCountryHc(this.state.CountryData[event.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: event.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setStateHc(obj.data[0].label)

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
                                            this.props.setCityHc(objcity.data[0].label)
                                     
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

    handleStateChange = event =>{
        // this.props.setStateAc(event.target.value)
        this.setState({
            StateId: event.target.value
          })

          Notiflix.Loading.Dots('Please wait...');
      
          for(var i = 0;i<Object.keys(this.state.StateData).length;i++){
        
            if(this.state.StateData[i].value == event.target.value){
          
              this.props.setStateHc(this.state.StateData[i].label);
            }
          }
      
          PostApiCall.postRequest(
            {
              stateid: event.target.value
            },
            "GetCity"
          ).then(results =>
            // const objs = JSON.parse(result._bodyText)
            results.json().then(obj => {
              if (results.status == 200 || results.status == 201) {

                if(obj.data.length > 0){
                this.props.setCityHc(obj.data[0].label)
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

    handleCityChange = event =>{
        // this.props.setCity(event.target.value)
        this.setState({
            CityId : event.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityData).length;i++){
        
            if(this.state.CityData[i].value == event.target.value){
          
              this.props.setCityHc(this.state.CityData[i].label);
            }
          }
    }

    handlePincodeChange = event =>{
        if(this.state.NumRegex.test(event.target.value) && event.target.value.length <= 6)
        {
        this.props.setPincodeHc(event.target.value)
        }
    }

    handlePhoneChange = event =>{
        if(this.state.NumRegex.test(event.target.value) && event.target.value.length <= 20)
        {
        this.props.setPhoneHc(event.target.value)
        }
    }

    handleMobileNumberChange = event =>{
        if(this.state.NumRegex.test(event.target.value) && event.target.value.length <= 10)
        {
        this.props.setMobileNumberHc(event.target.value)
        }
    }

    handleEmailAddressChange = event =>{
        this.props.setEmailAddressHc(event.target.value)
    }

    handleWebsiteAddressChange = event =>{
        this.props.setWebsiteAddressHc(event.target.value)
    }

    handleLatitudeChange = event =>{
        if(this.state.DecimalRegex.test(event.target.value))
        {
        this.props.setLatitudeHc(event.target.value)
        }
    }

    handleLongitudeChange = event =>{
        if(this.state.DecimalRegex.test(event.target.value))
        {
        this.props.setLongitudeHc(event.target.value)
    }}


    handleFacilitiesChange = event =>{
        this.props.setFacilitiesHc(event.target.value)
    }

    handleServicesChange = event =>{
        this.props.setServicesHc(event.target.value)
    }

    handleShowonWebsiteChange = event =>{
        this.props.setShowonWebsiteHc(event.target.value)
    }

    handleApprovalChange = event =>{
        this.props.setApprovalHc(event.target.value)
    }

    handleBasicInformation = () => {
       
    
                if (this.props.Health.HealthCenterName != '') {
                    this.setState({
                        PageTitle: '2',
                        Page1: 'Done'
                    })
                }else{Notiflix.Notify.Failure('Please enter health center name.')}

    } 


    OnCheckEmail(){

        if(this.props.Health.EmailAddress!='' && this.props.Health.EmailAddress!=null){
            if(this.state.EmailRegex.test(this.props.Health.EmailAddress)){
                this.setState({
                    PageTitle : '3',
                   Page2 : 'Done'
                    }) 
            }else
            {
                Notiflix.Notify.Failure('Please enter valid email address.') 
            }

        }else
        {
             this.setState({
                  PageTitle : '3',
                 Page2 : 'Done'
                  }) 
        }

    }

    handleContactInfo = () =>{
       console.log(this.props.Health.MobileNumber)
        if(this.props.Health.Address !=''){
            // if(this.props.Health.Area !=''){
                                if(this.props.Health.Pincode !=''){
                                    if(this.props.Health.Pincode.length == 6){

                                        if(this.props.Health.MobileNumber!='' && this.props.Health.MobileNumber!=null){
                                            if(this.props.Health.MobileNumber.length == 10){
                                                this.OnCheckEmail()
                                            }else
                                            {
                                                Notiflix.Notify.Failure('Please enter valid mobile number.') 
                                            }

                                        }else
                                        {
                                            this.OnCheckEmail()
                                        }
 
                                    }else{Notiflix.Notify.Failure('Please enter valid pincode.')}
                                }else{Notiflix.Notify.Failure('Please enter pincode.')}
            // }else{Notiflix.Notify.Failure('Please enter the locality / area.')}
        }else{Notiflix.Notify.Failure('Please enter health center address.')}
    }

    handleFacilitiesServiceChange = () =>{
    //    if(this.state.Facilities.length > 0){
    //     if(this.state.Services.length > 0){
            this.setState({
                PageTitle : '4',
                Page3 : 'Done'
            })
    //     }else{Notiflix.Notify.Failure('Please select health center services.')}      
    // }else{Notiflix.Notify.Failure('Please select health center facilities.')}    
    }

    handleTimings = () =>{    
        // console.log(this.state.TimingInfo)                                     
        
            var time = this.state.TimingInfo.filter(value => value.check)

        

            var cn = 0

            if(time.length > 0){
                for(var i =0 ; i<time.length;i++){
                    if(time[i].open == '' || time[i].close == ''){

                        // Notiflix.Notify.Failure('Please select opening & closing timings for health center.')
                        cn = 1
                    }

                }
                if(cn == 1){
                    Notiflix.Notify.Failure('Please select opening & closing timings for health center for seleted days.')
                }else
                {
                  this.setState({
                      FinalTime : time,
                PageTitle : '5',
                Page4 : 'Done'
            })
                }

            }
        
         else{Notiflix.Notify.Failure('Please select timings for health center.')}  
            
          
    }

    OnFacilitiesSubmit(obj){

        var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)
                      
           
                    var count = 0
                    if(this.state.Facilities.length > 0){

                    Notiflix.Loading.Dots('');

                    for(var i = 0 ;i < this.state.Facilities.length;i++)
                     {                        
                        PostApiCall.postRequest({
                            healthcenterid : this.state.HealthCenterId,
                            facilityid : this.state.Facilities[i].value,
                            updatedby : details[0].fld_staffid,
                            updatedon : moment().format('lll'),
                                  },"AddHealthCenterFacilitiesMappings").then((results) => 
                         
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(objs => {
                     
                         
                            if(results.status == 200 || results.status==201){

                                count = count + 1
                                if(count == this.state.Facilities.length){

                                    this.OnServicesSubmit(obj)

                                }

                            }
                        }))
                    }
                }else
                {
                    this.OnServicesSubmit(obj)
                }
    }


    OnServicesSubmit(obj){

        var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)
                      
           
                    var count = 0
                    if(this.state.Services.length > 0){
                    Notiflix.Loading.Dots('');

                    for(var i = 0 ;i < this.state.Services.length;i++)
                     {                        
                        PostApiCall.postRequest({
                            healthcenterid : this.state.HealthCenterId,
                            serviceid : this.state.Services[i].value,
                            updatedby : details[0].fld_staffid,
                            updatedon : moment().format('lll'),
                                  },"AddHealthCenterServicesMapping").then((results) => 
                         
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(objs => {
                     
                         
                            if(results.status == 200 || results.status==201){

                                count = count + 1
                                if(count == this.state.Services.length){

                                    // this.OnTimingSubmit(obj)
                                    this.props.setClearHc()
                                    Notiflix.Loading.Remove()
                                    Notiflix.Notify.Success('Health Center successfully updated.')
                                    window.location.href = '/healthcenterlist'

                                }

                            }
                        }))
                    }
                }else{
                    this.props.setClearHc()
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Success('Health Center successfully added.')
                    window.location.href = '/healthcenterlist'
                }

    }

    // OnTimingSubmit(obj){


    //     var login=localStorage.getItem('LoginDetail');
    //                 var details=JSON.parse(login)
                      
           
    //                 var count = 0

    //                 Notiflix.Loading.Dots('');

    //                 for(var i = 0 ;i < this.state.FinalTime.length;i++)
    //                  {                        
    //                     PostApiCall.postRequest({
    //                         healthcenterid : this.state.HealthCenterId,
    //                         day : this.state.FinalTime[i].day,
    //                         openingtime : this.state.FinalTime[i].open,
    //                         closingtime : this.state.FinalTime[i].close,
    //                         updatedby : details[0].fld_staffid,
    //                         updatedon : moment().format('lll'),
    //                               },"AddHealthCenterTimingsMapping").then((results) => 
                         
    //                         // const objs = JSON.parse(result._bodyText)
    //                         results.json().then(objs => {
                     
                         
    //                         if(results.status == 200 || results.status==201){

    //                             count = count + 1
    //                             if(count == this.state.FinalTime.length){

    //                                 this.props.setClearHc()
    //                                 Notiflix.Loading.Remove()
    //                                 Notiflix.Notify.Success('Health Center successfully updated.')
    //                                 window.location.href = '/healthcenterlist'

    //                             }

    //                         }
    //                     }))
    //                 }

    // }


    handleSubmit = () =>{
    
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
          

        Notiflix.Loading.Dots('');
            
            PostApiCall.postRequest({
                id : this.state.HealthCenterId,
                 type : this.props.Health.HealthCenterType,
                 name : this.props.Health.HealthCenterName,
                 address : this.props.Health.Address,
                 city : this.props.Health.City,
                 state : this.props.Health.State,
                 country : this.props.Health.Country,
                 pincode : this.props.Health.Pincode,
                 landmark : this.props.Health.Landmark,
                 area : this.props.Health.Area,
                 phone : this.props.Health.Phone,
                 mobile : this.props.Health.MobileNumber,
                 email : this.props.Health.EmailAddress,
                 website : this.props.Health.WebsiteAddress,
                 latitude : this.props.Health.Latitude == '' ? 0 : this.props.Health.Latitude,
                 longitude : this.props.Health.Longitude == '' ? 0 : this.props.Health.Longitude,
                 showonwebsite : this.props.Health.ShowOnWebsite,
                 approved : 'No',
                 updatedby : details[0].fld_staffid,
                 updatedon : moment().format('lll'),
                      },"UpdateHealthCenter").then((results) => 
             
                // const objs = JSON.parse(result._bodyText)
                results.json().then(obj => {
         
             
                if(results.status == 200 || results.status==201){

                this.setState({
                    PageTitle : '4',
                    Page4 : 'Done'
                })
                this.OnFacilitiesSubmit(obj)

            }
            else{
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure('Health center with name already present.')
              }
        }))
            }
     
                                                   
        
            ApproveHealthCenter(){
                if(this.state.ApproveAccessGranted){
        
                    confirmAlert({
                        title: 'Confirm to Approve',
                        message: 'Are you sure you want to approve health center.',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () => {
                                Notiflix.Loading.Dots('');
            
                                var login=localStorage.getItem('LoginDetail');
                                var details=JSON.parse(login)
            
            
                    PostApiCall.postRequest({
                  
                        id : this.state.HealthCenterId,
                         approved : 'Yes',
                         updatedby : details[0].fld_staffid,
                         updatedon : moment().format('lll'),
            
                  
                      },"UpdateHealthCenterApprovalStatus").then((results) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        results.json().then(obj => {
            
                        if(results.status == 200 || results.status==201){
            
                            Notiflix.Loading.Remove()
                            Notiflix.Notify.Success('Health Center successfully approved.')
                            window.location.href = '/healthcenterlist'
                        }else
                        {
                            Notiflix.Loading.Remove()
                            Notiflix.Notify.Failure('Something went wrong, try again later.')
                        }
                    }))
                            }
                          },
                          {
                            label: 'No',
                            // onClick: () => alert('Click No')
                          }
                        ]
                      });
                    }else{
                        Notiflix.Notify.Failure('You are not authorised to continue.'); 
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
                                                <li class="breadcrumb-item"><a href="#">Services & Listing</a></li>
                                                <li class="breadcrumb-item"><a href="/healthcenterlist">Health Center List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">View New Health Center</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View New Health Center</h4>
                                    </div>
                                </div>


                                <div class="row" style={{display : this.state.EditAccessGranted ||  this.state.ApproveAccessGranted ? '' : 'none'}}>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center col-lg-6" style={{float : 'right'}}>
                                       <div class="col text-right row " >

                                        <div style={{display : this.state.ApproveAccessGranted ? '' : 'none'}}>
                                       <button 
                                       style={{marginRight : '10px'}}
                                      onClick={this.ApproveHealthCenter.bind(this)}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-check mr-1"></i>Approve Health Center </button>
                                                </div>

                                        <div style={{display : this.state.EditAccessGranted ? '' : 'none'}}>
                                        <button  
                                      onClick={()=>{
                                          this.setState({IsVisible : true})
                                      
                                      }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-edit mr-1"></i>Edit Health Center Details</button>
                                                </div>
                                    {/* </div>
                                    <div class="col text-right" style={{display : this.state.ApproveAccessGranted ? '' : 'none'}}> */}
                  
                                    </div>
                                </div>
                            </div>
                        </div> 
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
                                                        }} class="wizardlist nav-link">Basic Information</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Contact Information</a></li>
                                                 <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">Facilities & Services</a></li>
                                                 {/* <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Timings </a></li> */}
                                                    <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page4 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '4',
                                                                            Page4: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    class="wizardlist nav-link">Profile Status</a></li>
                                                                                                                                                                
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
                                                                        <strong class="mr-auto">Basic Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                {/* <div class="col-md-6">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Health Center Code<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                    value = {this.props.Health.HealthCenterCode}
                                                                                    onChange = {this.handleHealthCenterCodeChange}
                                                                                   ></input>
                                                                                    
                                                                                </div>
                                                                            </div>  */}
                                                                            <div class="col-md-6">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Health Center Type<span className="mandatory">*</span></label>
                                                                                    <select type="text" class="form-control" 
                                                                                       disabled={!this.state.IsVisible}
                                                                                    value = {this.props.Health.HealthCenterType}
                                                                                    onChange = {this.handleHealthCenterTypeChange}
                                                                                     >
                                                                                        {this.state.TypeData.map(title => (
                           
                                                                                                <option key={title.value} value={title.value}>
                                                                                                    {title.label}
                                                                                                </option>
                                                                                                ))}
                                                                                    </select>
                                                                                
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Health Center Name<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                    value = {this.props.Health.HealthCenterName}
                                                                                    disabled={!this.state.IsVisible}
                                                                                    onChange = {this.handleHealthCenterNameChange}
                                                                                   ></input>
                                                                                    
                                                                                </div>
                                                                            </div> 
                                                                    
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </div>

                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleBasicInformation.bind(this)}>Next</button>
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
                                                                <strong class="mr-auto">Contact Information</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Address<span className="mandatory">*</span></label>
                                                                            <textarea type="text" class="form-control" id="validationCustom05"
                                                                            value = {this.props.Health.Address}
                                                                            disabled={!this.state.IsVisible}
                                                                            onChange = {this.handleAddressChange}
                                                                            rows="4" cols="10">
                                                                            </textarea>
                                                                        </div>
                                                                    </div>
                                                                 
                                                            <div class="col-md-12">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Landmark</label>
                                                                <input type="text" class="form-control" 
                                                                   disabled={!this.state.IsVisible}
                                                                value = {this.props.Health.Landmark}
                                                                onChange = {this.handleLandmarkChange}
                                                                required ></input>
                                                            </div>
                                                        </div>
                                                                 
                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Country<span className="mandatory">*</span></label>
                                                                        <select type="text" class="form-control" 
                                                                           disabled={!this.state.IsVisible}
                                                                       value = {this.state.CountryId}
                                                                        onChange = {this.handleCountryChange}
                                                                         >
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
                                                                    <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">State<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control" 
                                                                               disabled={!this.state.IsVisible}
                                                                            value = {this.state.StateId}
                                                                            onChange = {this.handleStateChange}
                                                                             >
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
                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">City<span className="mandatory">*</span></label>
                                                                        <select type="text" class="form-control" 
                                                                           disabled={!this.state.IsVisible}
                                                                       value = {this.state.CityId}
                                                                        onChange = {this.handleCityChange}
                                                                         >
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
                                                               
                                                                <div class="col-md-8">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Area</label>
                                                                <input type="text" class="form-control" 
                                                                   disabled={!this.state.IsVisible}
                                                                value = {this.props.Health.Area}
                                                                onChange = {this.handleAreaChange}
                                                                required ></input>
                                                            </div>
                                                        </div>
                                                                <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Pincode<span className="mandatory">*</span></label>
                                                                    <input type="text" class="form-control" 
                                                                       disabled={!this.state.IsVisible}
                                                                    value = {this.props.Health.Pincode}
                                                                    onChange = {this.handlePincodeChange}
                                                                    required ></input>
                                                                </div>
                                                            </div>
                                                              
                                                                </div>
                                                                
                                                            </div>
                                                        </div>  
                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        
                                                                       <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Phone</label>
                                                                                <input type="text" class="form-control" 
                                                                                   disabled={!this.state.IsVisible}
                                                                                value = {this.props.Health.Phone}
                                                                                onChange = {this.handlePhoneChange}
                                                                                required ></input>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Mobile Number</label>
                                                                            <input type="text" class="form-control" 
                                                                               disabled={!this.state.IsVisible}
                                                                            value = {this.props.Health.MobileNumber}
                                                                            onChange = {this.handleMobileNumberChange}
                                                                            required ></input>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Email Address</label>
                                                                        <input type="text" class="form-control" 
                                                                           disabled={!this.state.IsVisible}
                                                                        value = {this.props.Health.EmailAddress}
                                                                        onChange = {this.handleEmailAddressChange}
                                                                        required ></input>
                                                                    </div>
                                                                </div>
                                                                    <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Website Address</label>
                                                                        <input type="text" class="form-control" 
                                                                           disabled={!this.state.IsVisible}
                                                                        value = {this.props.Health.WebsiteAddress}
                                                                        onChange = {this.handleWebsiteAddressChange}
                                                                        required ></input>
                                                                    </div>
                                                                </div>
                                                               
                                                                <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Latitude</label>
                                                                    <input type="text" class="form-control" 
                                                                       disabled={!this.state.IsVisible}
                                                                    value = {this.props.Health.Latitude}
                                                                    onChange = {this.handleLatitudeChange}
                                                                    required ></input>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Longitude</label>
                                                                <input type="text" class="form-control" 
                                                                   disabled={!this.state.IsVisible}
                                                                value = {this.props.Health.Longitude}
                                                                onChange = {this.handleLongitudeChange}
                                                                required ></input>
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
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleContactInfo.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 
                                                       <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast" style={{overflow: 'visible'}}>
                                                            <div class="toast-header">
                                                                <strong class="mr-auto">Facilities & Services</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                <div class="col-md-12">
                                                                <div class="form-group mb-2">
                                                                <label for="validationCustom05">Facilities (Select one or more facilities) </label>
                                                                <Select 
                                                                isDisabled={!this.state.IsVisible}
                                                                                    options={this.state.FacilitiesData}
                                                                                        value={this.state.Facilities}
                                                                                        onChange={(sp)=>{
                                                                                            this.setState({Facilities : sp})
                                                                                        }}
                                                                                        isMulti
                                                                                    
                                                                                        />
                                                               
                                                            </div>
                                                                </div>
                                                                <div class="col-md-12">
                                                                <div class="form-group mb-2">
                                                                    <label for="validationCustom05">Services (Select one or more services) </label>
                                                                    <Select 
                                                                    isDisabled={!this.state.IsVisible}
                                                                                    options={this.state.ServicesData}
                                                                                        value={this.state.Services}
                                                                                        onChange={(sp)=>{
                                                                                            this.setState({Services : sp})
                                                                                        }}
                                                                                        isMulti
                                                                                    
                                                                                        />
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
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleFacilitiesServiceChange.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        {/* <div id="sw-arrows-step-4"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                           

                                                            <div class="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast" style={{overflow: 'visible'}}>

                               <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">


                                        <table id="selection-datatable" class="table table-striped dt-responsive nowrap">
                                            <thead style={{
                                                  background: '#2e4a9a',
                                                  color: '#fff'
                                            }}>
                                                <tr>
                                                <th style={{borderRight : '1px solid #fff'}}>Select Timing</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Day</th>
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
                                                        
                                                            arr[index].day = ''
                                                            arr[index].open = ''
                                                            arr[index].close = ''

                                                            arr2[index].edit = false
                                                            this.setState({
                                                                TimingInfo : arr,
                                                                TimingData : arr2
                                                            })
                                                            
                                                        }else
                                                        {
                                                            arr[index].check = true
                                                            arr[index].day = data.day
                                                            arr[index].open = ''
                                                            arr[index].close = ''
                                                           
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
                                                        onTimeChange ={(time)=>{
                                                           
                                                            
                                                            var arr = [...this.state.TimingInfo]
                                                            arr[index].open = time.hour+':'+time.minute+' '+time.meridiem
                                                      
                                                            this.setState({
                                                                TimingInfo : arr,
                                                               
                                                            })
                                                        }}
                                                            theme="basic"
                                                            disabled={this.state.TimingInfo[index].check ? false : true}
                                                        time={this.state.TimingInfo[index].open} // initial time, default current time
                                                        timeMode="12" // use 24 or 12 hours mode, default 24
                                                   
                                                    /></td>
                                                <td>  <TimePicker
                                                onTimeChange ={(time)=>{
                                                   
                                                    
                                                    var arr = [...this.state.TimingInfo]
                                                    arr[index].close = time.hour+':'+time.minute+' '+time.meridiem
                                              
                                                    this.setState({
                                                        TimingInfo : arr,
                                                       
                                                    })
                                                }}
                                                            theme="basic"
                                                            disabled={this.state.TimingInfo[index].check ? false : true}
                                                            time={this.state.TimingInfo[index].close}// initial time, default current time
                                                        timeMode="12" // use 24 or 12 hours mode, default 24
                                                   
                                                    /></td>
                        
                                              
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
                                                                                        PageTitle: '3',
                                                                                        Page4: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleTimings.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>---end 4 row-- */}

                                                        <div id="sw-arrows-step-4"
                                                        className="tab-pane step-content"
                                                        style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>

                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                        aria-atomic="true" data-toggle="toast">
                                                        <div class="toast-header">
                                                            <strong class="mr-auto">Profile Status</strong>
                                                        </div>
                                                        <div class="toast-body">
                                                        <div class="row">
                                                       
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Show On Website<span className="mandatory">*</span></label><br/>
                                                                <select type="text" class="form-control"
                                                                   disabled={!this.state.IsVisible}
                                                                value = {this.props.Health.ShowOnWebsite}
                                                                onChange = {this.handleShowonWebsiteChange}
                                                                >
                                                                {this.state.FlagData.map(title => (
                           
                                                                <option key={title.value} value={title.value}>
                                                                    {title.label}
                                                                </option>
                                                                ))}
                                                                </select> 
                                                            </div>
                                                        </div>
                                                        {/* <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="validationCustom01">Approval<span className="mandatory">*</span></label><br/>
                                                            <select type="text" class="form-control" 
                                                             value = {this.props.Health.Approval}
                                                             onChange = {this.handleApprovalChange}
                                                            required >
                                                            <option>Yes</option>
                                                            <option>No</option>
                                                            
                                                        </select>
                                                            </div>
                                                    </div> */}
                                                    
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
                                                                           disabled={!this.state.IsVisible}
                                                                        onClick={this.handleSubmit.bind(this)}>Update</button>
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

function mapStateToProps(state) {
    return {
        Health: state.HealthCenter
    }
}


export default connect(mapStateToProps,{
    setHealthCenterCodeHc,
    setHealthCenterTypeHc,
    setHealthCenterNameHc,
    setAddressHc,
    setAreaHc,
    setLandmarkHc,
    setCountryHc,
    setStateHc,
    setCityHc,
    setPincodeHc,
    setPhoneHc,
    setMobileNumberHc,
    setEmailAddressHc,
    setWebsiteAddressHc,
    setLatitudeHc,
    setLongitudeHc,
    setFacilitiesHc,
    setServicesHc,
    setShowonWebsiteHc,
    setApprovalHc,
    setClearHc
}) (HealthCenterView);
