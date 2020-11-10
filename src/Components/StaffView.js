import React, { Component } from 'react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import moment from 'moment';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import {
    setemployeeid,
    setname,
    setemail,
    setmobile,
    setdob,
    setgender,

    setfathername,
    setmaritalstatus,
    setanniversary,
    setbloodgroup,
    setchronic,

    setdescription,
    setdepartment,
    setdesignation,
    setusertype,
    setjoiningdate,

    setaddress,
    setcountry,
    setstate,
     setcity,
    setpincode,
    setstatus ,
    setpermanentaddress,
    setpermanentcountry,
    setpermanentstate,
    setpermanentcity,
    setpermanentpincode,
    setaadharcard,
    setpancard,
    setdrivinglicenses,
    setvehiclenumber,
    setstaffpassword,
    setstaffconfirmpassword,
    setclearstaff 
} from './Actions/ActionType';

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
      id="photo-upload" type="file" onChange={onChange}/> 
    </label>

class StaffView extends Component {

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

          this.props.setclearstaff()

           
          Notiflix.Loading.Dots('Please wait...');

          this.props.setclearstaff()
  
          var det = localStorage.getItem('StaffDetails')
          var StaffData = JSON.parse(det)
            //    console.log(StaffData)
  
            // console.log(StaffData.fld_permanentaddress)
         
          // this.props.setuserphoto(UserData.fld_photo)
          this.setState({
                   Staffid:StaffData.fld_staffid,
                   Status:StaffData.fld_status,
                   imagePreviewUrl : StaffData.fld_photo

          })


          
          this.props.setemployeeid(StaffData.fld_empid)
          this.props.setname(StaffData.fld_name)
          this.props.setmobile(StaffData.fld_mobile)
          this.props.setemail(StaffData.fld_email)
          this.props.setdob(StaffData.fld_dateofbirth)
          this.props.setgender(StaffData.fld_gender)
          this.props.setfathername(StaffData.fld_fatherorspousename)
          this.props.setmaritalstatus(StaffData.fld_maritalstatus)
          this.props.setanniversary(StaffData.fld_dateofanniversary)
          this.props.setbloodgroup(StaffData.fld_bloodgroup)
          this.props.setchronic(StaffData.fld_chronicdisease)
          this.props.setdescription(StaffData.fld_medicalhistory)
          this.props.setdesignation(StaffData.fld_designation)
          this.props.setdepartment(StaffData.fld_department)
          this.props.setusertype(StaffData.fld_usertype)
          this.props.setjoiningdate(StaffData.fld_dateofjoining)
          this.props.setaddress(StaffData.fld_presentaddress)
          this.props.setcountry(StaffData.fld_presentcountry)
          this.props.setstate(StaffData.fld_presentstate)
          this.props.setcity(StaffData.fld_presentcity)
          this.props.setpincode(StaffData.fld_presentpincode)
          
          this.props.setpermanentaddress(StaffData.fld_permanentaddress)
          this.props.setpermanentcountry(StaffData.fld_permanentcountry)
          this.props.setpermanentstate(StaffData.fld_permanentstate)
          this.props.setpermanentcity(StaffData.fld_permanentcity)
          this.props.setpermanentpincode(StaffData.fld_permanentpincode)
        //   this.props.setstatus(StaffData.fld_status)
          this.props.setaadharcard(StaffData.fld_adhaar)
          this.props.setpancard(StaffData.fld_pan)
          this.props.setdrivinglicenses(StaffData.fld_drivinglicense)
          this.props.setvehiclenumber(StaffData.fld_vehiclenumber)
          this.props.setstaffpassword(StaffData.fld_password)

          if((StaffData.fld_presentaddress == StaffData.fld_permanentaddress) && (StaffData.fld_presentcountry == StaffData.fld_permanentcountry) && (StaffData.fld_presentstate == StaffData.fld_permanentstate) && (StaffData.fld_presentcity == StaffData.fld_permanentcity) && (StaffData.fld_presentpincode == StaffData.fld_permanentpincode)){

            this.setState({PermanentSame : true})

          }
         


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



          GetApiCall.getRequest("GetDesignation").then(resultdes =>
            resultdes.json().then(objdesignation => {
            //  this.props.setdesignation(objdesignation.data[0].value);
           
              this.setState({
                Designationdata : objdesignation.data,
                
              })
            }))

            GetApiCall.getRequest("GetDepartment").then(resultdes =>
                resultdes.json().then(objdepartment => {
                //  this.props.setdepartment(objdepartment.data[0].value);
                  this.setState({
                    Departmentdata : objdepartment.data,
                    
                  })
                }))

                GetApiCall.getRequest("GetUserType").then(resultdes =>
                    resultdes.json().then(objuser => {
                    //  this.props.setusertype(objuser.data[0].value);
                      this.setState({
                        Userdata : objuser.data,
                        
                      })
                    }))

                    GetApiCall.getRequest("GetCountry").then(resultdes =>
                        resultdes.json().then(obj => {
              
                              this.setState({
                                CountryData : obj.data ,
                                CountryPermanentData : obj.data
                              })
              
                       
            
                          if(obj.data.length != 0 ){
          
                            this.setState({
                                CountryId : obj.data.filter(value=>value.label == StaffData.fld_presentcountry)[0].value,
                                CountryPermanentId : obj.data.filter(value=>value.label == StaffData.fld_permanentcountry)[0].value
                            })
                          }

                          PostApiCall.postRequest({
              
                            countryid : obj.data.filter(value=>value.label == StaffData.fld_presentcountry)[0].value,
            
                          },"GetState").then((results) => 
                          
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(objstate => {
                      
                          
                            if(results.status == 200 || results.status==201){
            
            
                                if(objstate.data.length != 0 ){
                                
                                    this.setState({
                                        StateId : objstate.data.filter(value=>value.label == StaffData.fld_presentstate)[0].value,
                                        // StatePermanentId : objstate.data[0].value,
                                        StateData : objstate.data,
                                        // StatePermanentData : objstate.data
                                    })
                                  }
            
                                  PostApiCall.postRequest({
              
                                    countryid : obj.data.filter(value=>value.label == StaffData.fld_permanentcountry)[0].value,
                    
                                  },"GetState").then((resultsper) => 
                                  
                                    // const objs = JSON.parse(result._bodyText)
                                    resultsper.json().then(objstateper => {
                              
                                  
                                    if(resultsper.status == 200 || resultsper.status==201){

                                        if(objstateper.data.length != 0 ){
                                
                                            this.setState({
                                                StatePermanentId : objstateper.data.filter(value=>value.label == StaffData.fld_permanentstate)[0].value,
                                                // StateData : objstate.data,
                                                StatePermanentData : objstateper.data
                                            })
                                          }

            
                                  PostApiCall.postRequest({
              
                                    stateid : objstate.data.filter(value=>value.label == StaffData.fld_presentstate)[0].value,
                    
                                  },"GetCity").then((resultscity) => 
                                  
                                    // const objs = JSON.parse(result._bodyText)
                                    resultscity.json().then(objcity => {
                              
                                  
                                    if(resultscity.status == 200 || resultscity.status==201){
                    
                    
                                        if(objcity.data.length != 0 ){
                                        
                                            this.setState({
                                                CityId : objcity.data.filter(value=>value.label == StaffData.fld_presentcity)[0].value,
                                                // CityPermanentId : objcity.data[0].value,
                                                CityData : objcity.data,
                                                // CityPermanentData : objcity.data
                                            })
                                          }

                                          PostApiCall.postRequest({
              
                                            stateid : objstateper.data.filter(value=>value.label == StaffData.fld_permanentstate)[0].value,
                            
                                          },"GetCity").then((resultscityper) => 
                                          
                                            // const objs = JSON.parse(result._bodyText)
                                            resultscityper.json().then(objcityper => {
                                      
                                          
                                            if(resultscityper.status == 200 || resultscityper.status==201){

                                                if(objcityper.data.length != 0 ){
                                        
                                                    this.setState({
                                                        // CityId : objcity.data[0].value,
                                                        CityPermanentId : objcityper.data.filter(value=>value.label == StaffData.fld_permanentcity)[0].value,
                                                        // CityData : objcity.data,
                                                        CityPermanentData : objcityper.data
                                                    })
                                                  }

                                            }
                                        }))
                    
                                    }
                                }))
                            }
                        }))
                                
                            }
                        }))
                         
                    
                        Notiflix.Loading.Remove()
                    
                    }) 
                    );
            
            
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

      onChangeEmployee(employee){
        if(this.state.NumRegex.test(employee.target.value)){
           this.props.setemployeeid(employee.target.value)
        }
      }
      onChangeName(name){
         this.props.setname(name.target.value)
      }
      onChangeMobile(mobile){
        if((this.state.NumRegex.test(mobile.target.value)) && (mobile.target.value.length <= 10)){
  
           this.props.setmobile(mobile.target.value)
      }
    }
      onChangeDOB(dob){
          this.props.setdob(dob.target.value)
      }
      onChangeGender(gender){
       
        this.props.setgender(gender.target.value)
      }
      onChangeAnniversary(anniversary){
        if(anniversary.target.value > this.props.staffcredentials.DOB){
            this.props.setanniversary(anniversary.target.value)
          }else
          {
            Notiflix.Notify.Failure('Please select select valid date of anniversary, must not be smaller then your date of birth.')
          }
      }
      onChangeFathername(fathername){
          this.props.setfathername(fathername.target.value)
      }
      onChangeMarital(marital){
          this.props.setmaritalstatus(marital.target.value)
      }
      onChangeEmail(email){
          this.props.setemail(email.target.value)
      }
      
      nextlabel(){
        if(this.props.staffcredentials.EmployeeId!=''){
            if(this.props.staffcredentials.Name!=''){
             if(this.props.staffcredentials.Mobile!=''){
               if(this.props.staffcredentials.Mobile.length == 10){
                if(this.props.staffcredentials.Email!=''){
                   if(this.state.EmailRegex.test(this.props.staffcredentials.Email)){
                 if(this.props.staffcredentials.DOB!=''){
                     if(this.props.staffcredentials.Gender!=''){
                         if(this.props.staffcredentials.FatherName!=''){
                             if(this.props.staffcredentials.MaritalStatus!=''){
                                   this.setState({
                                               PageTitle: '2',
                                               Page1: 'Done'
                                 })
                             }
                             else{
                               Notiflix.Notify.Failure('Please select marital status.')
                            }

                         }
                         else{
                           Notiflix.Notify.Failure('Please enter father or spouse name.')
                        }

                     }
                     else{
                       Notiflix.Notify.Failure('Please select gender.')
                    }

                 }
                 else{
                   Notiflix.Notify.Failure('Please select date of birth.')
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
             else
                           {
                               Notiflix.Notify.Failure('Please enter valid mobile number.'); 
                           }

           }

             else{
               Notiflix.Notify.Failure('Please enter mobile number.')
               }
          }
            else{
               Notiflix.Notify.Failure('Please enter full name.')
            }
        }
        else{
           Notiflix.Notify.Failure('Please enter employee id.')
        }
     }


      onChangeAadharCard(aadharcard){
        if((this.state.NumRegex.test(aadharcard.target.value) && aadharcard.target.value.length <= 12)){
          this.props.setaadharcard(aadharcard.target.value)
        }
      }
      onChangePanCard(pancard){
        if((this.state.AlphaNumericRegex.test(pancard.target.value) && pancard.target.value.length <= 10)){
          this.props.setpancard(pancard.target.value)
        }
      }
      onChangeDrivingLicenses(drivinglicenses){
        if((this.state.AlphaNumericRegex.test(drivinglicenses.target.value) && drivinglicenses.target.value.length <= 13)){
          this.props.setdrivinglicenses(drivinglicenses.target.value)
        }
      }
      onChangeVehicle(vehiclenumber){
        if((this.state.AlphaNumericRegex.test(vehiclenumber.target.value))){
          this.props.setvehiclenumber(vehiclenumber.target.value)
        }
      }
     
      nextlabel2(){
        if(this.props.staffcredentials.AadharCard!=''){
            if(this.props.staffcredentials.AadharCard.length == 12){
           if(this.props.staffcredentials.PANCard!=''){
              if(this.props.staffcredentials.PANCard.length == 10){
                  if(this.props.staffcredentials.DrivingLicenses == ''){
                      this.setState({
                          PageTitle : '3',
                          Page2 : 'Done'
                      })   
                  }else
                  {
                      if(this.props.staffcredentials.DrivingLicenses.length == 13){
                          this.setState({
                              PageTitle : '3',
                              Page2 : 'Done'
                          })   
                      }
                      else
                      {
                          Notiflix.Notify.Failure('Please enter valid driving license number.')  
                      }
                  }

           }
           else{
              Notiflix.Notify.Failure('Please enter valid PAN number.') 
            }
          }
           else{
              Notiflix.Notify.Failure('Please enter PAN number.') 
            }
          }
          else{
              Notiflix.Notify.Failure('Please enter valid aadhar card number.') 
            }
        }
        else{
          Notiflix.Notify.Failure('Plese enter  adhaar card number.') 
        }
    }


      onChangeBlood(bloodgroup){
        // console.log(bloodgroup.target.value)
         this.props.setbloodgroup(bloodgroup.target.value)
     }
     onChangeChronic(chronicdisease){
         this.props.setchronic(chronicdisease.target.value)
     }
     onChangeDescription(description){
         this.props.setdescription(description.target.value)
     }

     nextlabel3(){
        if(this.props.staffcredentials.BloodGroup!=''){
                  this.setState({
                                PageTitle : '4',
                                Page3 : 'Done'
                            })
                }
      
        else{
           Notiflix.Notify.Failure('Bloodgroup Cannot be empty ')
        }
    }
     onChangeDesignation(designation){
           this.props.setdesignation(designation.target.value)
     }
     onChangeDepartment(department)
     {
          this.props.setdepartment(department.target.value)
     }
     onChangeUser(usertype){
          this.props.setusertype(usertype.target.value)
     }
     onChangeJoining(joiningdate){
      
        if(joiningdate.target.value > this.props.staffcredentials.DOB){
            this.props.setjoiningdate(joiningdate.target.value)
          }else
          {
            Notiflix.Notify.Failure('Please select select valid date of joining, must not be smaller then your date of birth.')
          }
     }

     nextlabel4(){
        if(this.props.staffcredentials.Designation!=''){
          if(this.props.staffcredentials.Department!=''){
              if(this.props.staffcredentials.UserType!=''){
                 if(this.props.staffcredentials.JoiningDate!=''){
                   this.setState({
                               PageTitle : '5',
                               Page4 : 'Done'
                           })
                 }
                 else{
                   Notiflix.Notify.Failure('Please select date of joining.')
                }
              }
              else{
               Notiflix.Notify.Failure('Please select user type.')
            }

          }else{
           Notiflix.Notify.Failure('Please select department.')
        }
        }
        else{
           Notiflix.Notify.Failure('Please select designation.')
        }
    }
  
     onChangeAddress(address){
         this.props.setaddress(address.target.value)
     }

     onChangeCountry(country){
        // console.log(this.state.CountryData[country.target.value - 1].label)
        this.setState({
            CountryId : country.target.value
          })
         this.props.setcountry(this.state.CountryData[country.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: country.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setstate(obj.data[0].label)

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
                                            this.props.setcity(objcity.data[0].label)
                                     
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
        //  this.props.setstate(state.target.value)
         this.setState({
            StateId: state.target.value
          })

          Notiflix.Loading.Dots('Please wait...');
      
          for(var i = 0;i<Object.keys(this.state.StateData).length;i++){
        
            if(this.state.StateData[i].value == state.target.value){
          
              this.props.setstate(this.state.StateData[i].label);
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
                this.props.setcity(obj.data[0].label)
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
        // this.props.setcity(city.target.value)
        this.setState({
            CityId : city.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityData).length;i++){
        
            if(this.state.CityData[i].value == city.target.value){
          
              this.props.setcity(this.state.CityData[i].label);
            }
          }
      }


     onChangePin(pincode){
        if((this.state.NumRegex.test(pincode.target.value)) && (pincode.target.value.length <= 6)){
 
      this.props.setpincode(pincode.target.value)
     }
    }

    nextlabel5(){

        if(this.props.staffcredentials.Address!=''){
           if(this.props.staffcredentials.Country!=''){
               if(this.props.staffcredentials.State!=''){
               if(this.props.staffcredentials.City!=''){
                       if(this.props.staffcredentials.Pincode!=''){
                           if(this.props.staffcredentials.Pincode.length == 6){

                           
                           this.setState({
                               PageTitle : '6',
                               Page5 : 'Done'
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

     onChangePermanentAddress(permanentaddress){
        //  console.log(permanentaddress.target.value)
        this.props.setpermanentaddress(permanentaddress.target.value)
     }

     
     onChangePermanentCountry(country){

        this.setState({
            CountryPermanentId : country.target.value
          })
         this.props.setpermanentcountry(this.state.CountryPermanentData[country.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: country.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setpermanentstate(obj.data[0].label)

                this.setState({
                    StatePermanentId : obj.data[0].value
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
                                      CityPermanentData : objcity.data,
                                      StatePermanentData : obj.data
                                     })
                                        if(objcity.data.length >  0){
                                            this.props.setpermanentcity(objcity.data[0].label)
                                     
                                            this.setState({
                                       
                                              CityPermanentId : objcity.data[0].value
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
     onChangePermanentState(state){
         //  this.props.setstate(state.target.value)
         this.setState({
            StatePermanentId: state.target.value
          })

          Notiflix.Loading.Dots('Please wait...');
      
          for(var i = 0;i<Object.keys(this.state.StatePermanentData).length;i++){
        
            if(this.state.StatePermanentData[i].value == state.target.value){
          
              this.props.setpermanentstate(this.state.StatePermanentData[i].label);
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
                this.props.setpermanentcity(obj.data[0].label)
            this.setState({
              CityPermanentData : obj.data,
                CityPermanentId : obj.data[0].value
            })
        }
        Notiflix.Loading.Remove()        
        // this.props.cityData(obj.data)
                
              }
            })
          );
     }
     onChangePermanentCity(city){
        this.setState({
            CityPermanentId : city.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityPermanentData).length;i++){
        
            if(this.state.CityPermanentData[i].value == city.target.value){
          
              this.props.setpermanentcity(this.state.CityPermanentData[i].label);
            }
          }
     }
     onChangePermanentPincode(permanentpincode){
        if((this.state.NumRegex.test(permanentpincode.target.value)) && (permanentpincode.target.value.length <= 6)){
      this.props.setpermanentpincode(permanentpincode.target.value)
     }
    }


    nextlabel6(){
        
        if(this.props.staffcredentials.ParmanentAddress!=''){
           if(this.props.staffcredentials.ParmanentCountry!=''){
            if(this.props.staffcredentials.ParmanentState!=''){ 
               if(this.props.staffcredentials.ParmanentCity!=''){
                       if(this.props.staffcredentials.ParmanentPincode!=''){
                           if(this.props.staffcredentials.ParmanentPincode.length == 6){

                           
                            this.setState({
                               PageTitle : '7',
                               Page6 : 'Done'
                           })
                        }
                        else
                            {
                                Notiflix.Notify.Failure('Please enter valid pincode.'); 
                            }
                       }
                       else{
                           Notiflix.Notify.Failure('Please entr pincode.')
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
           Notiflix.Notify.Failure('Please enter complete permanent address.')
        }
    }


  onChangePassword(password){
      this.props.setstaffpassword(password.target.value)
  }
  onChangeConfirmPassword(confirmpassword){
      this.props.setstaffconfirmpassword(confirmpassword.target.value)
  }

    savestaff(){
        if(this.state.Status!=''){
                    // console.log(this.props.staffcredentials)
                   
               this.setState({
                        PageTitle : '7',
                        Page7 : 'Done'
                    })

             var login=localStorage.getItem('LoginDetail');
         var details=JSON.parse(login)
           

         Notiflix.Loading.Dots('');
             
             PostApiCall.postRequest({
                
     staffid: this.state.Staffid,         
     empid: this.props.staffcredentials.EmployeeId,
     name : this.props.staffcredentials.Name,
     email: this.props.staffcredentials.Email,
     mobile: this.props.staffcredentials.Mobile,
     usertype : this.props.staffcredentials.UserType,
     designation : this.props.staffcredentials.Designation,
     department : this.props.staffcredentials.Department,
     gender : this.props.staffcredentials.Gender,
     dob : this.props.staffcredentials.DOB,
     doj : this.props.staffcredentials.JoiningDate,
     maritalstatus : this.props.staffcredentials.MaritalStatus,
     doa : this.props.staffcredentials.AnniversaryDate,
     adhaar : this.props.staffcredentials.AadharCard,
     pan : this.props.staffcredentials.PANCard,
     dl : this.props.staffcredentials.DrivingLicenses,
     vehiclenumber : this.props.staffcredentials.VehicleNumber,
     fatherorspousename : this.props.staffcredentials.FatherName,
     bloodgroup : this.props.staffcredentials.BloodGroup,
     chronicdisease : this.props.staffcredentials.ChronicDisease,
     medicalhistory: this.props.staffcredentials.Description,
     permanentaddress : this.props.staffcredentials.ParmanentAddress,
     permanentcountry : this.props.staffcredentials.ParmanentCountry,
     permanentcity : this.props.staffcredentials.ParmanentCity,
     permanentstate : this.props.staffcredentials.ParmanentState,
     permanentpincode : this.props.staffcredentials.ParmanentPincode,
     presentaddress : this.props.staffcredentials.Address,
     presentcountry: this.props.staffcredentials.Country,
     presentcity : this.props.staffcredentials.City,
     presentstate : this.props.staffcredentials.State,
     presentpincode : this.props.staffcredentials.Pincode,
     status : this.state.Status,
     updatedon : moment().format('lll'),
     updatedby : details[0].fld_staffid,
    //  password : this.props.staffcredentials.Password,
               },"UpdateStaff").then((results) => 
              
                 // const objs = JSON.parse(result._bodyText)
                 results.json().then(obj => {
          
              
                 if(results.status == 200 || results.status==201){


                    if(JSON.stringify(this.state.ImageData) != '[]'){

                        const form = new FormData();
                                 
            form.append('file', this.state.ImageData);
            form.append('foldername' , 'Staff')
            form.append('filename' , this.props.staffcredentials.EmployeeId.trim()+'-'+this.state.Staffid)
            
            fetch(this.state.ImageApiUrl, {
            method: 'POST',
            body: form
            }).then((image) => {
            
            image.json().then(data => ({
            data: data,
            status: image.status
            })
            ).then(res => {
      
      
                PostApiCall.postRequest({
      
                    id : this.state.Staffid,
                    photo : 'https://images.beatmysugar.com/images/Staff/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                    
                 
               },"UpdateStaffPhoto").then((results1) => 
         
                 results1.json().then(obj1 => {  
                 if(results1.status == 200 || results1.status==201){
    
                    this.props.setclearstaff()
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Success('Staff successfully updated.')
                    window.location.href = '/stafflist'
                  
                   
                 }
                }))
      
      
            })
        })
    
    }
    else
    {
        this.props.setclearstaff()
        Notiflix.Loading.Remove()
        Notiflix.Notify.Success('Staff successfully updated.')
        window.location.href = '/stafflist'
    }

    
               
                 }

                 else{
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Failure('Something went wrong. try again later.')
                  }
             }
                 )
               )

       }

        else{
            Notiflix.Notify.Failure('Status Cannot be empty ')
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
                                                <li class="breadcrumb-item"><a href="#">Staff Management</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">View Staff</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Staff</h4>
                                    </div>
                                </div>

                                <div class="row" style={{display : this.state.EditAccessGranted ? '' : 'none'}}>
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                   <div class="col text-right">
                                                    <button 
                                                  onClick={()=>{
                                                      this.setState({IsVisible : true})
                                                      visible = true
                                                  }}
                                                    class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                            class="uil-edit mr-1"></i>Edit Staff Details</button>
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
                                                        }} class="wizardlist nav-link">Personal Details</a></li>
                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Identification Details</a></li>

                                                        <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page3 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '3',
                                                                    Page3: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Health Background</a></li>
                                                 <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">Office Details</a></li>
                                                 <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page5 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '5',
                                                                        Page5: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Present Address</a></li>
                                                    <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page6 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '6',
                                                                            Page6: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    class="wizardlist nav-link">Permanent Address</a></li>
                                                         <li className={this.state.PageTitle == '7' ? 'active nav-item' : this.state.Page7 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page7 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '7',
                                                                                Page7: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        class="wizardlist nav-link">Status</a></li>
                                                    
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
                                                                                  <label for="validationCustom05">Upload Profile Photo (Size &lt; 100kb, 500*500)<span className="mandatory">*</span></label>
                                                                                  <div class="div1">
                                                                                               <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
                                                      
                                                                                     </div>
                                                                                  </div>
                                                                                  <div class="col-md-8">
                                                                                   <div class="row">
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                       <label for="validationCustom05">Employee ID<span className="mandatory">*</span></label>
                                                                                       <input type="text" class="form-control" id="validationCustom05"
                                                                                       disabled={true}
                                                                                         value={this.props.staffcredentials.EmployeeId}
                                                                                         onChange={this.onChangeEmployee.bind(this)}/>
                                                                                       
                                                                                   </div>
                                                                               </div>  
                                                                                 
                                                                               <div class="col-md-6">
                                                                               <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Name<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   disabled={!this.state.IsVisible}
                                                                                    value={this.props.staffcredentials.Name}
                                                                                    onChange={this.onChangeName.bind(this)}
                                                                                 />
                                                                                   
                                                                               </div>
                                                                           </div>
                                                                                   </div> {/* end row */}
                                                                                
                                                                                   <div class="row">
                                                                                   <div class="col-md-6">
                                                                                   <div class="form-group mb-2">
                                                                                   <label for="validationCustom05">Mobile<span className="mandatory">*</span></label>
                                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                                   disabled={!this.state.IsVisible}
                                                                                    value={this.props.staffcredentials.Mobile}
                                                                                    onChange={this.onChangeMobile.bind(this)}
                                                                                  />
                                                                                   <div class="invalid-feedback">
                                                                                       Please provide a valid Company Name.
                                                                                    </div>
                                                                               </div>
                                                                             </div>
                                                                                   <div className="col-md-6">
                                                                                       <div class="form-group mb-2">
                                                                                           <label for="validationCustom05">Email<span className="mandatory">*</span></label>
                                                                                           <input type="text" class="form-control" id="validationCustom05"
                                                                                           disabled={!this.state.IsVisible}
                                                                                           value={this.props.staffcredentials.Email}
                                                                                           onChange={this.onChangeEmail.bind(this)}
                                                                                           />
                                                                                          
                                                                                       </div>
                                                                                   </div>
                                                                               </div> {/* end row */}
                                                                               <div class="row">
                                                                                    <div class="col-md-6">
                                                                                    <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Date Of Birth<span className="mandatory">*</span></label>
                                                                                    <input type="date" class="form-control" id="validationCustom05"
                                                                                    disabled={!this.state.IsVisible}
                                                                                    value={this.props.staffcredentials.DOB}
                                                                                    max={moment().format('YYYY-MM-DD')}
                                                                                    onKeyDown={(e) => e.preventDefault()} 
                                                                                    onChange={this.onChangeDOB.bind(this)}
                                                                                    />
                                                                                   
                                                                                </div>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                    <label for="sw-arrows-first-name" >Gender<span className="mandatory">*</span></label>
                                                                                    
                                                                                    <select class="form-control custom-select" 
                                                                                    value={this.props.staffcredentials.Gender}
                                                                                    disabled={!this.state.IsVisible}
                                                                                    onChange={this.onChangeGender.bind(this)}>
                                                                                    {this.state.GenderData.map(gender => (
                           
                                                                                            <option key={gender.value} value={gender.value}>
                                                                                              {gender.label}
                                                                                         </option>
                                                                                         ))}
                                                                                    </select>
                                                                                </div>
                                                                                    </div>
                                                                               </div>

                                                                            
                                                                                  
                                                                                  </div>
                                                                                    
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-4">
                                                                            <div class="form-group mb-2">
                                                                            <label for="validationCustom05">Father/Spouse Name<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control" id="validationCustom05"
                                                                            value={this.props.staffcredentials.FatherName}
                                                                            disabled={!this.state.IsVisible}
                                                                            onChange={this.onChangeFathername.bind(this)}
                                                                            />
                                                                           
                                                                        </div>
                                                                            </div>

                                                                              <div class="col-md-4">
                                                                              <div class="form-group">
                                                                              <label for="sw-arrows-first-name" >Marital Status<span className="mandatory">*</span></label>
                                                                              
                                                                              <select class="form-control custom-select"
                                                                              value={this.props.staffcredentials.MaritalStatus}
                                                                              disabled={!this.state.IsVisible}
                                                                              onChange={this.onChangeMarital.bind(this)}>
                                                                              {this.state.MaritalStatusData.map(maritalstatusdata => (
                           
                                                                                <option key={maritalstatusdata.value} value={maritalstatusdata.value}>
                                                                                  {maritalstatusdata.label}
                                                                             </option>
                                                                             ))}
                                                                                  
                                                                              </select>
                                                                          </div>
                                                                              </div>
                                                                              <div class="col-md-4">
                                                                              <div class="form-group mb-2">
                                                                              <label for="validationCustom05">Marriage Anniversary Date</label>
                                                                              <input type="date" class="form-control" id="validationCustom05"
                                                                              value={this.props.staffcredentials.AnniversaryDate}
                                                                              disabled={!this.state.IsVisible}
                                                                              max={moment().format('YYYY-MM-DD')}
                                                                              onKeyDown={(e) => e.preventDefault()} 
                                                                              onChange={this.onChangeAnniversary.bind(this)}
                                                                              />
                                                                             
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
                                                                        //  onClick={() => {

                                                                        //     this.setState({
                                                                        //         PageTitle: '2',
                                                                        //         Page1: 'Done'
                                                                        //     })
                                                                        onClick={this.nextlabel.bind(this)}>Next</button>
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
                                                                    <strong class="mr-auto">Identification Details</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Aadhar Card Number<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" 
                                                                                value={this.props.staffcredentials.AadharCard}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangeAadharCard.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                       <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">PAN Card Number<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" 
                                                                                value={this.props.staffcredentials.PANCard}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangePanCard.bind(this)} 
                                                                               />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Driving License</label>
                                                                                <input type="text" class="form-control"  
                                                                                value={this.props.staffcredentials.DrivingLicenses}
                                                                                disabled={!this.state.IsVisible}
                                                                               onChange={this.onChangeDrivingLicenses.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Vehicle Number</label>
                                                                                <input type="text" class="form-control" 
                                                                                value={this.props.staffcredentials.VehicleNumber} 
                                                                                disabled={!this.state.IsVisible}
                                                                               onChange={this.onChangeVehicle.bind(this)} />
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
                                                                    //    onClick={()=>{
                                                                         
                                                                    //      this.setState({
                                                                    //          PageTitle : '3',
                                                                    //          Page2 : 'Done'
                                                                    //      })
                                                                    //    }}
                                                                    onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 2*/}
                                                        <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Health Background</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Blood Group<span className="mandatory">*</span></label>
                                                                                <select class="form-control custom-select" 
                                                                                    value={this.props.staffcredentials.BloodGroup}
                                                                                    disabled={!this.state.IsVisible}
                                                                                    onChange={this.onChangeBlood.bind(this)}>
                                                                                    {this.state.BloodGroupData.map(bloodgroup => (
                           
                                                                                            <option key={bloodgroup.value} value={bloodgroup.value}>
                                                                                              {bloodgroup.label}
                                                                                         </option>
                                                                                         ))}
                                                                                    </select>
                                                                            </div>
                                                                        </div>
                                                                       <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Chronic Disease</label>
                                                                                <input type="text" class="form-control"  
                                                                                value={this.props.staffcredentials.ChronicDisease}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangeChronic.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-12">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Medical History</label>
                                                                                <textarea type="text" class="form-control" id="validationCustom05"
                                                                                rows="4" cols="10" 
                                                                                value={this.props.staffcredentials.Description}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangeDescription.bind(this)}>
                                                                                </textarea>
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
                                                                              PageTitle : '2',
                                                                              Page3 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                    //    onClick={()=>{
                                                                         
                                                                    //      this.setState({
                                                                    //          PageTitle : '3',
                                                                    //          Page2 : 'Done'
                                                                    //      })
                                                                    //    }}
                                                                       onClick={this.nextlabel3.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 3*/}
                                                        <div id="sw-arrows-step-4"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Office Details</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Designation<span className="mandatory">*</span></label>
                                                                                <select type="text" class="form-control"  
                                                                                value={this.props.staffcredentials.Designation}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangeDesignation.bind(this)}>
                                                                                {this.state.Designationdata.map(designation => (
                           
                                                                                    <option key={designation.value} value={designation.value}>
                                                                                      {designation.label}
                                                                                 </option>
                                                                                 ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Department<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control"
                                                                            value={this.props.staffcredentials.Department}
                                                                            disabled={!this.state.IsVisible}
                                                                            onChange={this.onChangeDepartment.bind(this)}>
                                                                            {this.state.Departmentdata.map(department => (
                           
                                                                                <option key={department.value} value={department.value}>
                                                                                  {department.label}
                                                                             </option>
                                                                             ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">User Type<span className="mandatory">*</span></label>
                                                                                <select type="text" class="form-control"
                                                                                value={this.props.staffcredentials.UserType}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangeUser.bind(this)}>
                                                                                {this.state.Userdata.map(usertype => (
                           
                                                                                    <option key={usertype.value} value={usertype.value}>
                                                                                      {usertype.label}
                                                                                 </option>
                                                                                 ))}
                                                                                
                                                                            </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Date Of Joining<span className="mandatory">*</span></label>
                                                                            <input type="date" class="form-control" 
                                                                             max={moment().format('YYYY-MM-DD')}
                                                                             onKeyDown={(e) => e.preventDefault()} 
                                                                             disabled={!this.state.IsVisible}
                                                                            value={this.props.staffcredentials.JoiningDate} 
                                                                            onChange={this.onChangeJoining.bind(this)}/>
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
                                                                            //  onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '4',
                                                                            //         Page3 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.nextlabel4.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="sw-arrows-step-5"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '5' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Present Address</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Address<span className="mandatory">*</span></label>
                                                                                <textarea type="text" class="form-control" id="validationCustom05"
                                                                                rows="4" cols="10"
                                                                                value={this.props.staffcredentials.Address}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={this.onChangeAddress.bind(this)}>
                                                                                </textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Country<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control"
                                                                            value={this.state.CountryId}
                                                                            disabled={!this.state.IsVisible}
                                                                            onChange={this.onChangeCountry.bind(this)}>
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
                                                                        <div class="col-md-3">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">State<span className="mandatory">*</span></label>
                                                                                <select type="text" class="form-control"
                                                                            value={this.state.StateId}
                                                                            disabled={!this.state.IsVisible}
                                                                            onChange={this.onChangeState.bind(this)}>
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
                                                                        <div class="col-md-3">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">City<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control"
                                                                            value={this.state.CityId}
                                                                            disabled={!this.state.IsVisible}
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
                                                                    <div class="col-md-3">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Pincode<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control"  
                                                                        value={this.props.staffcredentials.Pincode}
                                                                        disabled={!this.state.IsVisible}
                                                                        onChange={this.onChangePin.bind(this)}></input>
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
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.nextlabel5.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}

                                                        <div id="sw-arrows-step-6"
                                                        className="tab-pane step-content"
                                                        style={{ display: this.state.PageTitle == '6' ? 'block' : 'none' }}>
                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast">
                                                            <div class="toast-header">
                                                                <strong class="mr-auto">Permanent Address</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                 <div class="col-md-12" style={{marginBottom:'5px'}}>
                                                                 <div class="checkbox">
                                                               
                                                                 <input type="checkbox" 
                                                                 disabled={!this.state.IsVisible}
                                                                 checked={this.state.PermanentSame}
                                                                 onChange={()=>{
                                                                     
                                                                    this.setState({PermanentSame : !this.state.PermanentSame},()=>{
                                                                       
                                                                      
                                                                        if(this.state.PermanentSame){
                                                                       
                                                                            this.props.setpermanentaddress(this.props.staffcredentials.Address)
                                                                            this.props.setpermanentcountry(this.props.staffcredentials.Country)
                                                                            this.props.setpermanentstate(this.props.staffcredentials.State)
                                                                            this.props.setpermanentcity(this.props.staffcredentials.City)
                                                                            this.props.setpermanentpincode(this.props.staffcredentials.Pincode)

                                                                            this.setState({
                                                                                CountryPermanentId : this.state.CountryId,
                                                                                StatePermanentId : this.state.StateId,
                                                                                CityPermanentId : this.state.CityId

                                                                            })

                                                                        }else
                                                                        {
                                                                            this.props.setpermanentaddress('')
                                                                            this.props.setpermanentcountry('')
                                                                            this.props.setpermanentstate('')
                                                                            this.props.setpermanentcity('')
                                                                            this.props.setpermanentpincode('')

                                                                            this.setState({
                                                                                CountryPermanentId : 0,
                                                                                StatePermanentId : 0,
                                                                                CityPermanentId : 0

                                                                            })
                                                                        }
                                                                    })
                                                                    
                                                                }}
                                                                 class="checkboxdesclaimer" style={{verticalAlign:'middle'}}/> 
                                                                 <span> Same As Present Address</span>
                                                                 </div>
                                                                 </div>
                                                                 <div class="row col-md-12" style={{display: this.state.PermanentSame ? 'none' : ''}}>
                                                                 <div class="col-md-12">
                                                                 <div class="form-group mb-3">
                                                                     <label for="validationCustom01">Address<span className="mandatory">*</span></label>
                                                                     <textarea type="text" class="form-control" id="validationCustom05"
                                                                     rows="4" cols="10"
                                                                     disabled={!this.state.IsVisible}
                                                                     value={this.props.staffcredentials.ParmanentAddress}
                                                                     onChange={this.onChangePermanentAddress.bind(this)}>
                                                                     </textarea>
                                                                 </div>
                                                             </div>
                                                             <div class="col-md-3">
                                                             <div class="form-group mb-3">
                                                                 <label for="validationCustom01">Country<span className="mandatory">*</span></label>
                                                                 <select type="text" class="form-control"
                                                                 disabled={!this.state.IsVisible}
                                                                 value={this.state.CountryPermanentId}
                                                                            onChange={this.onChangePermanentCountry.bind(this)}>
                                                                            {this.state.CountryPermanentData.map(
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
                                                             <div class="col-md-3">
                                                                 <div class="form-group mb-3">
                                                                     <label for="validationCustom01">State<span className="mandatory">*</span></label>
                                                                     <select type="text" class="form-control"
                                                                     disabled={!this.state.IsVisible}
                                                                 value={this.state.StatePermanentId}
                                                                 onChange={this.onChangePermanentState.bind(this)}>
                                                                 {this.state.StatePermanentData.map(
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
                                                             <div class="col-md-3">
                                                             <div class="form-group mb-3">
                                                                 <label for="validationCustom01">City<span className="mandatory">*</span></label>
                                                                 <select type="text" class="form-control"
                                                                 disabled={!this.state.IsVisible}
                                                                 value={this.state.CityPermanentId}
                                                                 onChange={this.onChangePermanentCity.bind(this)}>
                                                                 {this.state.CityPermanentData.map(
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
                                                         <div class="col-md-3">
                                                         <div class="form-group mb-3">
                                                             <label for="validationCustom01">Pincode<span className="mandatory">*</span></label>
                                                             <input type="text" class="form-control"  
                                                             disabled={!this.state.IsVisible}
                                                             value={this.props.staffcredentials.ParmanentPincode}
                                                             onChange={this.onChangePermanentPincode.bind(this)}></input>
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
                                                                                    PageTitle: '5',
                                                                                    Page6: 'Done'
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
                                                                          onClick={this.nextlabel6.bind(this)}>Next</button>
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
                                                        <div class="toast-header">
                                                            <strong class="mr-auto">Status</strong>
                                                        </div>
                                                        <div class="toast-body">
                                                            <div class="row">
                                                            
                                                        
                                                                <div class="col-md-12">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                                                                <label class="radio-inline">
                                                                    <input type="radio" name="optradio"
                                                                    disabled={!this.state.IsVisible}
                                                                   checked={this.state.Status == 'Active' ? true : false}
                                                                    onChange={()=>{
                                                                        this.setState({
                                                                            Status : 'Active'
                                                                        })
                                                                    }}/> Active
                                                                 </label>
                                                                <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                                    <input type="radio" name="optradio" 
                                                                    disabled={!this.state.IsVisible}
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
                                                                                PageTitle: '6',
                                                                                Page7: 'Done'
                                                                            })
                                                                        }}
                                                                    >Previous</button>
                                                                    <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                    disabled={!this.state.IsVisible}
                                                                    // onClick={()=>{
                                               
                                                                    //     this.setState({
                                                                    //         PageTitle : '6',
                                                                    //         Page6 : 'Done'
                                                                    //     })
                                                                    //   }}
                                                                     onClick={this.savestaff.bind(this)} >Update</button>
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
        staffcredentials: state.StaffReducers
    }
}

export default connect(mapStateToProps, {
   
    setemployeeid,
    setname,
    setemail,
    setmobile,
    setdob,
    setgender,
    setfathername,
    setmaritalstatus,
    setanniversary,
    setbloodgroup,
    setchronic,
    setdescription,
    setdepartment,
    setdesignation,
    setusertype,
    setjoiningdate,
    setaddress,
    setcountry,
    setstate,
     setcity,
    setpincode,
    setpermanentaddress,
    setpermanentcountry,
    setpermanentstate,
    setpermanentcity,
    setpermanentpincode,
    setstatus,
    setaadharcard,
    setpancard,
    setdrivinglicenses,
    setvehiclenumber,
    setstaffpassword,
    setstaffconfirmpassword,
    setclearstaff 

})(StaffView);
