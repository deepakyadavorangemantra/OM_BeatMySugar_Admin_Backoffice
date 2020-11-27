import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';
import Select from 'react-select';

import {setSellCompanyName,
    setSellabout,
    setSellAddress,
    setSellemail,
    setSelltitle,
    setSellmobile,
    setSellCity,
    setSellState,
    setSellCountry,
    setSellworking,
    setSelldesignation,
    setSellPincode,
    setSellname,
    setclearsell
} from './Actions/ActionType';


class Viewsellwithus extends Component {
   constructor(props){
    super(props)
    this.state={
        PageTitle : '1',
        Page1 : 'Pending',
        
        PositionData:[{'label':'Medicine','value' : 'medicine'},{'label':'Food','value' : 'Food'},{'label':'Footcare','value' : 'Footcare'},{'label':'Devices','value' : 'Devices'},{'label':'Food Delivery','value' : 'Food Delivery'}
       ],
       ProductService:[],


       TitleData: [
           { value: "Dr.", label: "Dr." },
           { value: "Mr.", label: "Mr." },
           { value: "Ms.", label: "Ms." },
      ],
         CountryData : [],
         CityData : [],
         StateData : [],
         CountryId: 0,
         StateId : 0,
         CityId : 0,
         IsVisible : false,

      

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
      this.props.setclearsell()
      Notiflix.Loading.Dots('');

      var det = localStorage.getItem('SellDetails')
      var SellData = JSON.parse(det)
      // console.log(SellData)
      var ps = []
      for(var i = 0 ; i < SellData.fld_services.split(', ').length ; i++){

      ps.push({value : SellData.fld_services.split(', ')[i], label : SellData.fld_services.split(', ')[i]})

  }

        this.setState({
            ProductService : ps


        })
   

      this.props.setSellCompanyName(SellData.fld_companyname)
      this.props.setSellAddress(SellData.fld_address)
      this.props.setSellCountry(SellData.fld_country)
      this.props.setSellCity(SellData.fld_city)
      this.props.setSellState(SellData.fld_state)
      this.props.setSellname(SellData.fld_personname)
      this.props.setSelldesignation(SellData.fld_persondesignation)
      this.props.setSellPincode(SellData.fld_pincode)
      this.props.setSellabout(SellData.fld_aboutbusiness)
      this.props.setSelltitle(SellData.fld_title)
      this.props.setSellworking(SellData.fld_workingwith)
      this.props.setSellmobile(SellData.fld_mobile)
      this.props.setSellemail(SellData.fld_email)




      GetApiCall.getRequest("GetCountry").then(resultdes =>
        resultdes.json().then(obj => {

            
              this.setState({
                CountryData : obj.data,
              })

          if(obj.data.length != 0 ){
      
           this.setState({
                CountryId : obj.data.filter(value=>value.label == SellData.fld_country)[0].value,
            })
          }

          PostApiCall.postRequest({

            countryid : obj.data.filter(value=>value.label == SellData.fld_country)[0].value,

          },"GetState").then((results) => 
          
            // const objs = JSON.parse(result._bodyText)
            results.json().then(objstate => {
      
          
            if(results.status == 200 || results.status==201){


                if(objstate.data.length != 0 ){
              
                    this.setState({
                      
                        StateId :   objstate.data.filter(value=>value.label == SellData.fld_state)[0].value,
                        StateData : objstate.data,
                    })
                  }


                  PostApiCall.postRequest({

                    stateid : objstate.data.filter(value=>value.label == SellData.fld_state)[0].value,
    
                  },"GetCity").then((resultscity) => 
                  
                    // const objs = JSON.parse(result._bodyText)
                    resultscity.json().then(objcity => {
              
                  
                    if(resultscity.status == 200 || resultscity.status==201){
    
    
                        if(objcity.data.length != 0 ){
                          
                            this.setState({
                                CityId : objcity.data.filter(value=>value.label == SellData.fld_city)[0].value,
                                CityData : objcity.data,
                            })
                          }
    
                    }
                    Notiflix.Loading.Remove()
                }))

            }
        }))
         
    

    }));



}

onChangeCompany(company){
    this.props.setSellCompanyName(company.target.value)
}
onChangeAddress(address){
    //  console.log(address.target.value)
 this.props.setSellAddress(address.target.value)
   
}

onChangeCountry(country){
    // this.props.setvendorcountry(country.target.value)
    this.setState({
        CountryId : country.target.value
      })
     this.props.setSellCountry(this.state.CountryData[country.target.value - 1].label);
     
     Notiflix.Loading.Dots('Please wait...');

     PostApiCall.postRequest(
       {
         countryid: country.target.value
       },
       "GetState"
     ).then(results =>

       results.json().then(obj => {
         if (results.status == 200 || results.status == 201) {
           
            this.props.setSellState(obj.data[0].label)

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
                                        this.props.setSellCity(objcity.data[0].label)
                                 
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
      
          this.props.setSellState(this.state.StateData[i].label);
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
            this.props.setSellCity(obj.data[0].label)
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
      
          this.props.setSellCity(this.state.CityData[i].label);
        }
      }
}

onChangePincode(pincode){
    if((this.state.NumRegex.test(pincode.target.value)) && (pincode.target.value.length <= 6)){

    this.props.setSellPincode(pincode.target.value)
}
}

onChangeTitle(title){
this.props.setSelltitle(title.target.value)
}
onChangeName(name){
this.props.setSellname(name.target.value)
}
onChangeDesignation(designation){
this.props.setSelldesignation(designation.target.value)
}
onChangeEmail(email){
    this.props.setSellemail(email.target.value)
}
onChangeMobile(mobile){
    if((this.state.NumRegex.test(mobile.target.value)) && (mobile.target.value.length <= 10)){

    this.props.setSellmobile(mobile.target.value)
}
}
onChangeAbout(about){
    this.props.setSellabout(about.target.value)
}
onChangeWorking(working){
    this.props.setSellworking(working.target.value)
}

   
   UpdateSellWithUS(){

    //  console.log(this.props.SellCredentials)
    if(this.props.SellCredentials.CompanyName!=''){
        if(this.props.SellCredentials.Address!=''){
            if(this.props.SellCredentials.Country!=''){
                if(this.props.SellCredentials.State!=''){
                    if(this.props.SellCredentials.City!=''){
                        if(this.props.SellCredentials.Pincode!=''){
                            if(this.props.SellCredentials.Pincode.length == 6){
                                if(this.props.SellCredentials.Title!=''){
                                 if(this.props.SellCredentials.Name!=''){
                                     if(this.props.SellCredentials.Designation!=''){
                                         if(this.props.SellCredentials.Email!=''){
                                             if(this.state.EmailRegex.test(this.props.SellCredentials.Email)){
                                               if(this.props.SellCredentials.Mobile!=''){
                                                   if(this.props.SellCredentials.Mobile.length==10){
                                                    if(this.state.ProductService.length > 0){
                                                       if(this.props.SellCredentials.CurrentlyWorking!=''){
                                                         if(this.props.SellCredentials.About!=''){
                                                            
                                                            // Notiflix.Loading.Dots('');
                                                            //   var producttype= ''

                                                            // for(var i =0 ;i<this.state.ProductService.length ;i++){
                                           
                                                            //    if(i == 0)
                                                            //    {
                                                            //        producttype = this.state.ProductService[i].value
                                                            //    }else{
                                                            //     producttype = producttype  + ', '+this.state.ProductService[i].value
                                                            //    }
                                           
                                                            // }
                                           

                                                            // PostApiCall.postRequest({
                                                            //      companyname :this.props.SellCredentials.CompanyName,
                                                            //      address :this.props.SellCredentials.Address,
                                                            //      country : this.props.SellCredentials.Country,
                                                            //      state : this.props.SellCredentials.State,
                                                            //      city : this.props.SellCredentials.City,
                                                            //      pincode : this.props.SellCredentials.Pincode,
                                                            //      title :this.props.SellCredentials.Title,
                                                            //      personname : this.props.SellCredentials.Name,
                                                            //      persondesignation : this.props.SellCredentials.Designation,
                                                            //      email : this.props.SellCredentials.Email,
                                                            //      mobile : this.props.SellCredentials.Mobile,
                                                            //      services : producttype,
                                                            //      workingwith : this.props.SellCredentials.CurrentlyWorking,
                                                            //      aboutbusiness : this.props.SellCredentials.About,
                                                            //      updatedby : 0,
                                                            //      updatedon : moment().format('lll'),
                                                                 
                                                           
                                                            //    },"AddSellWithUs").then((results) => 
                                                                   
                                                               
                                                            //   //    const objs = JSON.parse(result._bodyText)
                                                            //      results.json().then(obj => {
                                                           
                                                               
                                                            //      if(results.status == 200 || results.status==201){
                                                            //       this.props.setclearsell()
                                                       
                                                            //       Notiflix.Loading.Remove()
                                                       
                                                            //       Notiflix.Notify.Success('SellWithUS successfully added.')
                                                            //       window.location.href = '/sellwithus'
                                                                  
                                                       
                                                            //   }
                                                            //   else{
                                                            //       Notiflix.Loading.Remove()
                                                            //       Notiflix.Notify.Failure('Something went Wrong.')
                                                            //     } 
                                                            //   }
                                                            //      )
                                                            //    )
                                                       

                                                         }
                                                         else{
                                                            Notiflix.Notify.Failure('Please enter tell us about Your business .') 
                                                          }                                
                                                       }
                                                       else{
                                                        Notiflix.Notify.Failure('Please enter currently working with, listed On which portals.') 
                                                      }
                                                    }
                                                    else{
                                                        Notiflix.Notify.Failure('Please select product service .') 
                                                      }
                                                   }
                                                   else{
                                                    Notiflix.Notify.Failure('Please enter valid mobile number.') 
                                                  }
                                               }
                                               else{
                                                Notiflix.Notify.Failure('Please enter mobile number.') 
                                              }
                                             }
                                             else{
                                                Notiflix.Notify.Failure('Please enter valid email.') 
                                              }

                                         }
                                         else{
                                            Notiflix.Notify.Failure('Please enter email.') 
                                          }
                                     }
                           else{
                            Notiflix.Notify.Failure('Please enter contactperson designation.') 
                          }
                                 }
                                 else{
                                    Notiflix.Notify.Failure('Please enter contact person name.') 
                                  }
                                }
                            else{
                            Notiflix.Notify.Failure('Please select title.') 
                          }        
                            }
                            else{
                                Notiflix.Notify.Failure('Please enter valid pincode.') 
                              }
                        }
                        else{
                            Notiflix.Notify.Failure('Please enter pincode.') 
                          }
                    }
                    else{
                        Notiflix.Notify.Failure('Please selcet city.') 
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
            Notiflix.Notify.Failure('Please enter address.') 
          }

    }
    else{
        Notiflix.Notify.Failure('Please enter vendor company name.') 
      }
}

   render(){
       return(
        <div className="App">
        <div id="wrapper">
        <div className="content-page">
            <div class="content">
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="/">Sell With Us List</a></li>
                                   
                                   
                                    <li class="breadcrumb-item active" aria-current="page">Update Sell With Us</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Update Sell With Us</h4>
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
                                        }} class="wizardlist nav-link">Sell With Us Details</a></li>

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
                                                       <strong class="mr-auto">Vendor Detail</strong>
                                                   </div>
                                                   <div class="toast-body">
                                                       <div class="row">
                                                           <div class="col-md-12">
                                                               <div class="row">
                                                               <div class="col-md-12">
                                                               <div class="form-group mb-2">
                                                                   <label for="validationCustom05">Vendor Company Name<span className="mandatory">*</span></label>
                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                   value={this.props.SellCredentials.CompanyName}
                                                                   onChange={this.onChangeCompany.bind(this)}
                                                                   disabled={!this.state.IsVisible}
                                                                 />
                                                                   
                                                               </div>
                                                           </div> 
                                                         
                                                       <div class="col-md-12">
                                                       <div class="form-group mb-2">
                                                       <label for="contact-message">Address<span className="mandatory">*</span></label>
                                                       <textarea cols="30" rows="5" class="form-control"
                                                     type="text"
                                                     value={this.props.SellCredentials.Address}
                                                     onChange={this.onChangeAddress.bind(this)}
                                                     disabled={!this.state.IsVisible}/>
                                                       </div>
                                                   </div> 

                                                   <div class="col-md-3">
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">Country<span className="mandatory">*</span></label>
                                                               <select class="form-control custom-select"
                                                               disabled={!this.state.IsVisible}
                                                                value={this.state.CountryId}
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
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">State<span className="mandatory">*</span></label>
                                                               <select class="form-control custom-select"
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
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">City<span className="mandatory">*</span></label>
                                                               <select class="form-control custom-select"
                                                               disabled={!this.state.IsVisible}
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
                                                       <div class="col-md-3">
                                                       <div class="form-group mb-2">
                                                           <label for="validationCustom05">Pincode<span className="mandatory">*</span></label>
                                                           <input type="text" class="form-control" id="validationCustom05"
                                                           disabled={!this.state.IsVisible}
                                                            value={this.props.SellCredentials.Pincode}
                                                           onChange={this.onChangePincode.bind(this)}
                                                         />
                                                           
                                                       </div>
                                                   </div> 
                                                 </div>
                                                               

                                                               
                                                           </div> {/* end col-md-12 */}
                                                           
                                                       </div>
                                                    
                                                   </div>
                                               </div>

                                               <div className="toast fade show" role="alert" aria-live="assertive"
                                               aria-atomic="true" data-toggle="toast">
                                               <div class="toast-header">
                                                       <strong class="mr-auto">Contact Person Detail</strong>
                                                   </div>
                                                 <div class="toast-body">
                                                   <div class="row">
                                                       <div class="col-md-12">
                                                           <div class="row">
                                                           <div class="col-md-6">
                                                           <div className="row">
                                                           <div class="col-md-3">
                                                           <label for="contact-phone">Title<span className="mandatory">*</span></label>
                                                           <select className="form-control"
                                                           disabled={!this.state.IsVisible}
                                                           value={this.props.SellCredentials.Title}
                                                           onChange={this.onChangeTitle.bind(this)}>
                                                           {this.state.TitleData.map(title => (
                                                   
                                                            <option key={title.value} value={title.value}>
                                                              {title.label}
                                                         </option>
                                                         ))}
                                                           </select>
                                                       </div>
                                                       <div class="col-md-9">
                                                       <label for="contact-phone">Contact Person Name<span className="mandatory">*</span></label>
                                                       <input type="text" class="form-control"
                                                       disabled={!this.state.IsVisible}
                                                       value={this.props.SellCredentials.Name}
                                                        onChange={this.onChangeName.bind(this)}
                                                       required=""/>
                                                   </div>
                                                           </div>
                                                        </div>
                                                       <div class="col-md-6">
                                                       <div class="form-group mb-2">
                                                           <label for="validationCustom05">Contact Person Designation<span className="mandatory">*</span></label>
                                                           <input type="text" class="form-control" id="validationCustom05"
                                                           disabled={!this.state.IsVisible}
                                                           value={this.props.SellCredentials.Designation}
                                                           onChange={this.onChangeDesignation.bind(this)}
                                                         />
                                                           
                                                       </div>
                                                   </div> 

                                                           <div class="col-md-6">
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">Mobile<span className="mandatory">*</span></label>
                                                               <input type="text" class="form-control" id="validationCustom05"
                                                               disabled={!this.state.IsVisible}
                                                                value={this.props.SellCredentials.Mobile}
                                                                onChange={this.onChangeMobile.bind(this)}
                                                             />
                                                               
                                                           </div>
                                                       </div> 
                                                         
                                                       <div class="col-md-6">
                                                       <div class="form-group mb-2">
                                                           <label for="validationCustom05">Email Address<span className="mandatory">*</span></label>
                                                           <input type="text" class="form-control" id="validationCustom05"
                                                           disabled={!this.state.IsVisible}
                                                           value={this.props.SellCredentials.Email}
                                                          onChange={this.onChangeEmail.bind(this)}
                                                           
                                                         />
                                                           
                                                       </div>
                                                   </div> 
                                                 </div>
                                                           

                                                           
                                                       </div> {/* end col-md-12 */}
                                                       
                                                   </div>
                                                
                                               </div>
                                           </div>

                                           
                                           <div className="toast fade show" role="alert" aria-live="assertive"
                                           aria-atomic="true" data-toggle="toast">
                                           <div class="toast-header">
                                               <strong class="mr-auto">Product/Service</strong>
                                           </div>
                                           <div class="toast-body">
                                               <div class="row">
                                                   <div class="col-md-12">
                                                       <div class="row">
                                                       <div className="col-md-12">
                                                       <div class="form-group mb-2">
                                                       <label for="validationCustom05">Product/Service<span style={{color:'red'}}>*</span></label><br/>
                                                       <Select isMulti
                                                       disabled={!this.state.IsVisible}
                                                       options={this.state.ProductData}
                                                       value={this.state.ProductService}
                                                            onChange={(ps)=>{
                                                           this.setState({ProductService : ps})
                                                        }}
                                                      isMulti
                                                      />
                                                        </div>
                                                       </div>
                                                         
                                                       </div>
                                                       

                                                       
                                                   </div> {/* end col-md-12 */}
                                                   
                                               </div>
                                            
                                           </div>
                                       </div>
                                               
                                               <div className="toast fade show" role="alert" aria-live="assertive"
                                                   aria-atomic="true" data-toggle="toast">
                                                   <div class="toast-header">
                                                       <strong class="mr-auto">Portal Detail</strong>
                                                   </div>
                                                   <div class="toast-body">
                                                       <div class="row">
                                                           <div class="col-md-12">
                                                               <div class="row">
                                                               <div className="col-md-12">
                                                               <div class="form-group mb-2">
                                                               <label for="validationCustom05">Currently Working With, Listed On Which Portals ?<span style={{color:'red'}}>*</span></label><br/>
                                                              
                                                                <textarea cols="30" rows="5" class="form-control" required=""
                                                                type="text"
                                                                disabled={!this.state.IsVisible}
                                                                value={this.props.SellCredentials.CurrentlyWorking}
                                                                onChange={this.onChangeWorking.bind(this)}
                                                                ></textarea>
                                                                </div>
                                                               </div>
                                                                 
                                                               </div>
                                                               

                                                               
                                                           </div> {/* end col-md-12 */}
                                                           
                                                       </div>
                                                    
                                                   </div>
                                               </div>
                                                  
                                               <div className="toast fade show" role="alert" aria-live="assertive"
                                               aria-atomic="true" data-toggle="toast">
                                               <div class="toast-header">
                                                   <strong class="mr-auto">About Business</strong>
                                               </div>
                                               <div class="toast-body">
                                                   <div class="row">
                                                       <div class="col-md-12">
                                                           <div class="row">
                                                           <div className="col-md-12">
                                                           <div class="form-group mb-2">
                                                           <label for="validationCustom05">Tell Us More About Your Business<span style={{color:'red'}}>*</span></label><br/>
                                                           
                                                            <textarea cols="30" rows="5" class="form-control" required="" type="text"
                                                            disabled={!this.state.IsVisible}
                                                             value={this.props.SellCredentials.About}
                                                                  onChange={this.onChangeAbout.bind(this)}
                                                            ></textarea>
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
                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                       disabled={!this.state.IsVisible}
                                                       onClick={this.UpdateSellWithUS.bind(this)}
                                                    //    {() => {

                                                    //        this.setState({
                                                    //            PageTitle: '1',
                                                    //            Page1: 'Done'
                                                    //        })
                                                    //    }}
                                                      >Submit</button>
                                                   </div>
                                               </div>
                                           </form>
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

        </div>

       )
   }
}
function mapStateToProps(state) {
    return {
      SellCredentials: state.ViewSell
    };
  }
  
  export default connect(
    mapStateToProps,
    {
        setSellCompanyName,
    setSellabout,
    setSellAddress,
    setSellemail,
    setSelltitle,
    setSellmobile,
    setSellCity,
    setSellState,
    setSellCountry,
    setSellworking,
    setSelldesignation,
    setSellPincode,
    setSellname,
    setclearsell
      
    }
  )(Viewsellwithus);