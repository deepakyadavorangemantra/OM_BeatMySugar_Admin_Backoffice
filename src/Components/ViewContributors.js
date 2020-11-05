import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import { connect } from 'react-redux';
import Notiflix from 'notiflix';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';
import moment from 'moment';
import {
    setTitle,
    setName,
    setDesignation,
    setAddress,
    setCountry,
    setStateAc,
    setCity,
    setPinCode,
    setPhone,
    setMobileNumber,
    setEmailAddress,
    setclearcontirbutor
} from './Actions/ActionType'

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input
      accept="image/*"
      id="photo-upload" type="file" onChange={onChange}/> 
    </label>

class ViewContributors extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            imagePreviewUrl: 'https://talentview.asia/wp-content/uploads/Wait-Staff-Icon-2.png',
            Show : 'Yes',
            Designationdata:[],
            TitleData: [
                { value: "Mr.", label: "Mr." },
                { value: "Ms.", label: "Ms." },
                { value: "Dr.", label: "Dr." },
               
              ],
              CountryData : [],
              CityData : [],
              StateData : [],
              CountryId: 0,
                StateId : 0,
                CityId : 0,
                ShortDescription:'',
                ProfileData:'',
                NumRegex: /^[0-9]*$/,
                MobileRegex : /^[0-9]*$/,
                EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                Contributorid : '',
                ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
                ImageData : []

               
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
      
          this.props.setclearcontirbutor()

          Notiflix.Loading.Dots('Please wait...');
          var det = localStorage.getItem('ContributorDetails')
          var ContributorData = JSON.parse(det)
                  
            this.setState({
                imagePreviewUrl : ContributorData.fld_photo
            })


            new Promise( ( resolve, reject ) => {
                setTimeout( resolve, 1000 );
              } ).then( () => {
                this.setState( { 
                    ShortDescription : ContributorData.fld_shortdescription,
                    ProfileData :ContributorData.fld_profile,
                    
    
                } );
              } );
    
        

          this.setState({
            Contributorid:ContributorData.fld_id,
            Show:ContributorData.fld_showonwebsite
          })


           this.props.setTitle(ContributorData.fld_title)
           this.props.setName(ContributorData.fld_name)
           this.props.setDesignation(ContributorData.fld_designation)
           this.props.setAddress(ContributorData.fld_address)
           this.props.setCountry(ContributorData.fld_country)
           this.props.setStateAc(ContributorData.fld_state)
           this.props.setCity(ContributorData.fld_city)
           this.props.setPinCode(ContributorData.fld_pincode)
           this.props.setPhone(ContributorData.fld_phone)
           this.props.setMobileNumber(ContributorData.fld_mobile)
           this.props.setEmailAddress(ContributorData.fld_email)
          
        GetApiCall.getRequest("GetDesignation").then(resultdes =>
            resultdes.json().then(objdesignation => {
            
              this.setState({
                Designationdata : objdesignation.data,
                
              })
            }))


            GetApiCall.getRequest("GetCountry").then(resultdes =>
                resultdes.json().then(obj => {
      
                      this.setState({
                        CountryData : obj.data ,
                       
                      })
      
                      if(obj.data.length != 0 ){
          
                        this.setState({
                            CountryId : obj.data.filter(value=>value.label == ContributorData.fld_country)[0].value,
                  
                        })
                      }

                  PostApiCall.postRequest({
      
                    countryid :obj.data.filter(value=>value.label == ContributorData.fld_country)[0].value,
    
                  },"GetState").then((results) => 
                  
                    results.json().then(objstate => {
              
                  
                    if(results.status == 200 || results.status==201){
    
    
                        if(objstate.data.length != 0 ){
                                
                            this.setState({
                                StateId : objstate.data.filter(value=>value.label == ContributorData.fld_state)[0].value,
                           
                                StateData : objstate.data,
                               
                            })
                          }
    
    
                          PostApiCall.postRequest({
      
                            stateid : objstate.data.filter(value=>value.label == ContributorData.fld_state)[0].value,
            
                          },"GetCity").then((resultscity) => 
                          
                            resultscity.json().then(objcity => {
                      
                          
                            if(resultscity.status == 200 || resultscity.status==201){
            
            
                                if(objcity.data.length != 0 ){
                                        
                                    this.setState({
                                        CityId : objcity.data.filter(value=>value.label == ContributorData.fld_city)[0].value,
                                   
                                        CityData : objcity.data,
                                        
                                    })
                                  }
            
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

    onChangeShort(short){
      this.setState({ShortDescription: short.editor.getData()})
    }
    onChangeProfile(profile){
        this.setState({ProfileData: profile.editor.getData()})  
    }
    handleTitleChange = event =>{
        this.props.setTitle(event.target.value)
    }

    handleNameChange = event =>{
        this.props.setName(event.target.value)
    }

    handleDesignationChange = event =>{
        this.props.setDesignation(event.target.value)
    }

    handleNameChange = event =>{
        this.props.setName(event.target.value)
    }

    handleAddressChange = event =>{
        this.props.setAddress(event.target.value)
    }

    handleCountryChange = event =>{
        this.setState({
            CountryId : event.target.value
          })
         this.props.setCountry(this.state.CountryData[event.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: event.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setStateAc(obj.data[0].label)

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
                                            this.props.setCity(objcity.data[0].label)
                                     
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
        this.setState({
            StateId: event.target.value
          })

          Notiflix.Loading.Dots('Please wait...');
      
          for(var i = 0;i<Object.keys(this.state.StateData).length;i++){
        
            if(this.state.StateData[i].value == event.target.value){
          
              this.props.setStateAc(this.state.StateData[i].label);
            }
          }
      
          PostApiCall.postRequest(
            {
              stateid: event.target.value
            },
            "GetCity"
          ).then(results =>
            results.json().then(obj => {
              if (results.status == 200 || results.status == 201) {

                if(obj.data.length > 0){
                this.props.setCity(obj.data[0].label)
            this.setState({
              CityData : obj.data,
                CityId : obj.data[0].value
            })
        }
        Notiflix.Loading.Remove()        
                
              }
            })
          );
    }

    handleCityChange = event =>{
        this.setState({
            CityId : event.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityData).length;i++){
        
            if(this.state.CityData[i].value == event.target.value){
          
              this.props.setCity(this.state.CityData[i].label);
            }
          }
    }

    handlePinCodeChange = event =>{
        if((this.state.NumRegex.test(event.target.value)) && (event.target.value.length <= 6)){
 
        this.props.setPinCode(event.target.value)
    }
}

    handlePhoneChange = event =>{
        if((this.state.MobileRegex.test(event.target.value)) && (event.target.value.length <= 20)){
   
        this.props.setPhone(event.target.value)
    }
}

    handleMobileNumberChange = event =>{
        if((this.state.MobileRegex.test(event.target.value)) && (event.target.value.length <= 10)){
   
        this.props.setMobileNumber(event.target.value)
    }
}

    handleEmailAddressChange = event =>{
        this.props.setEmailAddress(event.target.value)
    }
   
    handleBasicInfo = ()=>{    
            if (this.props.Contri.Name != '') {
                    if(this.state.ShortDescription!=''){
                        if(((this.state.ShortDescription.replace( /(<([^>]+)>)/ig, '').trim()).length) <= 350) {
                        if(this.state.ProfileData!=''){
                            if(((this.state.ShortDescription.replace( /(<([^>]+)>)/ig, '').trim()).length) <= 2500) {
                          
                        this.setState({
                            PageTitle: '2',
                            Page1: 'Done'
                        })

                    } 
                    else{
                        Notiflix.Notify.Failure('Please specify contributor'+"'"+'s profile with less then 2500 characters.')
                      }
                    } 
                    else{
                        Notiflix.Notify.Failure('Please specify contributor'+"'"+'s profile.')
                      }
                    }
                    else{
                        Notiflix.Notify.Failure('Please enter contributor'+"'"+'s short description with less then 350 characters.')
                      }
                    }
                    else{
                        Notiflix.Notify.Failure('Please enter contributor'+"'"+'s short description.')
                      }
                    }
            else{
                Notiflix.Notify.Failure('Please enter contributor'+"'"+'s name.')
            }
       
    }

    SkipContactPage(){
        this.setState({
            PageTitle : '3',
            Page2: 'Done'
        }) 
    }

    OnCheckEmail(){
        if(this.props.Contri.EmailAddress != ''){
            if(this.state.EmailRegex.test(this.props.Contri.EmailAddress)){
                this.SkipContactPage()
        }else
        {
            Notiflix.Notify.Failure('Please enter valid email address.')
        }
    }
        else
        {
            this.SkipContactPage()
        }
    }

    OnCheckMobile(){
        if(this.props.Contri.MobileNumber != ''){
            if(this.props.Contri.MobileNumber.length == 10){
                this.OnCheckEmail()
            }else
            {
                Notiflix.Notify.Failure('Please enter valid mobile number.')
            }
        }
        else
        {
            this.OnCheckEmail()
        }
    }
    
    handleContactChange = () =>{  
        
      
                        if(this.props.Contri.PinCode != ''){
                            if(this.props.Contri.PinCode.length == 6){

                                this.OnCheckMobile()
                            }
                            else
                            {
                                Notiflix.Notify.Failure('Please enter valid pincode.')
                            }
                        }
                        else
                        {
                            this.OnCheckMobile()
                        }

    }

    handleSubmitChange = () =>{
        
        if(this.state.Show != ''){
            this.setState({
                PageTitle: '3',
                Page3: 'Done'
            })
             
            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
              
   
            Notiflix.Loading.Dots('');
                
                PostApiCall.postRequest({
                    contributorid:this.state.Contributorid,
                     title :this.props.Contri.Title,
                     name : this.props.Contri.Name,
                     designation :this.props.Contri.Designation,
                     shortdescription : this.state.ShortDescription,
                     profile : this.state.ProfileData,
                     address : this.props.Contri.Address,
                     country: this.props.Contri.Country,
                     state :   this.props.Contri.State,
                     city : this.props.Contri.City,
                     pincode : this.props.Contri.PinCode,
                     phone : this.props.Contri.Phone,
                     mobile : this.props.Contri.MobileNumber,
                     email :this.props.Contri.EmailAddress, 
                     showonwebsite :this.state.Show,
                     updatedby : details[0].fld_staffid,
                     updatedon : moment().format('lll'),
                          },"UpdateContributor").then((results) => 
                 
                    results.json().then(obj => {
             
                 
                    if(results.status == 200 || results.status==201){
                      
                        if(JSON.stringify(this.state.ImageData) != '[]'){

                        const form = new FormData();
                             
                        form.append('file', this.state.ImageData);
                        form.append('foldername' , 'Contributor')
                        form.append('filename' , this.props.Contri.Name.trim().replace(/\s/g,'-')+'-'+this.state.Contributorid)
                        
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
                  
                                id : this.state.Contributorid,
                                photo : 'https://images.beatmysugar.com/images/Contributor/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                                updatedby : details[0].fld_staffid,
                                updatedon : moment().format('lll')
                                
                             
                           },"UpdateContributorPhoto").then((results1) => 
                     
                             results1.json().then(obj1 => {  
                             if(results1.status == 200 || results1.status==201){
                  
                              
                                this.setState({
                                    PageTitle: '3',
                                    Page3: 'Done'
                                })
                                this.props.setclearcontirbutor()
                                Notiflix.Loading.Remove()
                                Notiflix.Notify.Success('Contributor successfully updated.')
                                window.location.href = '/contributorlist'
                             }
                            }))
                  
                  
                        })
                    })
                          
                }else
                {
                    this.props.setclearcontirbutor()
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Success('Contributor successfully updated.')
                    window.location.href = '/contributorlist'
                }
                    }
   
                    else{
                       Notiflix.Loading.Remove()
                       Notiflix.Notify.Failure('Something went wrong, try again later.')
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
                                        <li class="breadcrumb-item"><a href="#">Health Knowledge</a></li>
                                        <li class="breadcrumb-item"><a href="/contributorlist">Contributor List</a></li>
                        
                                        <li class="breadcrumb-item active" aria-current="page">View Contributor</li>
                                    </ol>
                                </nav>
                                <h4 class="mb-1 mt-0">View Contributor</h4>
                            
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
                                                            class="wizardlist nav-link">Show On Website</a></li>
                                                
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
                                                                         <div className="col-md-4">
                                                                         <div class="form-group">
                                                                         <label for="sw-arrows-first-name" >Photo ( Size &lt; 100kb, 500*500)<span className="mandatory">*</span></label>
                                                                         <div class="div1">
                                                                         <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
                                                                       
                                                                                  </div>
                                                                          </div>
                                                                         </div>
                                                                          <div className="col-md-8">
                                                                             <div className="row">
                                                                               <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                    <label for="sw-arrows-first-name" >Title<span className="mandatory">*</span></label>
                                                                                    <select type="text" class="form-control" 
                                                                                    value = {this.props.Contri.Title}
                                                                                    onChange={this.handleTitleChange.bind(this)}>
                                                                                    {this.state.TitleData.map(title => (
                           
                                                                                        <option key={title.value} value={title.value}>
                                                                                          {title.label}
                                                                                     </option>
                                                                                     ))}
                                                                                    </select>
                                                                                </div>
                                                                                </div>
                                                                                  <div class="col-md-6">
                                                                                    <div class="form-group">
                                                                                    <label for="sw-arrows-first-name" >Name<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control"
                                                                                    value = {this.props.Contri.Name}
                                                                                    onChange={this.handleNameChange.bind(this)}
                                                                                    ></input>
                                                                                    
                                                                            
                                                                                    </div>
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                    <div class="form-group">
                                                                                    <label for="sw-arrows-first-name" >Designation</label>
                                                                                    <input type="text" class="form-control"
                                                                                   value = {this.props.Contri.Designation}
                                                                                   onChange={this.handleDesignationChange.bind(this)}
                                                                                    ></input>
                                                                            
                                                                                    </div>
                                                                                    </div>
                                                                             </div>
                                                                          </div>

                                                                        </div>
                                                                        
                                                                        
                                                                    </div>
                                                                </div>

                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    <div class="col-md-12">
                                                                    <div class="form-group">
                                                                    <label for="sw-arrows-first-name" >Short Description(350 Characters)<span className="mandatory">*</span></label>
                                                                    
                                                                    <div class="niceeditors">
                                                                    <CKEditor
                                                                    config={{
                                                                        extraPlugins: "justify,font,colorbutton",
                                                                     }}
                                                                    data={this.state.ShortDescription}
                                                                    onChange={this.onChangeShort.bind(this)}
                                                                    
                                                                />
                                                                    </div>
                                                                </div>
                                                                    </div>
                                                                    
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>

                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                        aria-atomic="true" data-toggle="toast">
                                                        
                                                        <div class="toast-body">
                                                            <div class="row">
                                                           
                                                            <div class="col-md-12">
                                                            <div class="form-group">
                                                            <label for="sw-arrows-first-name" >Profile (2500 Characters)<span className="mandatory">*</span></label>
                                                            
                                                            <div class="niceeditors">
                                                            <CKEditor
                                                            config={{
                                                                extraPlugins: "justify,font,colorbutton",
                                                             }}
                                                                    data={this.state.ProfileData}
                                                                    onChange={this.onChangeProfile.bind(this)}
                                                                    
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
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleBasicInfo.bind(this)}>Next</button>
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
                                                                                <label for="validationCustom01">Address</label>
                                                                                <textarea type="text" class="form-control" id="validationCustom05"
                                                                                rows="4" cols="10"
                                                                                value = {this.props.Contri.Address}
                                                                                    onChange={this.handleAddressChange}
                                                                                   >
                                                                                </textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Country</label>
                                                                                <select type="text" class="form-control" 
                                                                                value = {this.state.CountryId}
                                                                                onChange={this.handleCountryChange}
                                                                                >
                                                                                     <option></option>
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
                                                                                <label for="validationCustom01">State</label>
                                                                                <select type="text" class="form-control" 
                                                                                value = {this.state.StateId}
                                                                                onChange={this.handleStateChange}
                                                                                >
                                                                                     <option></option>
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
                                                                                <label for="validationCustom01">City</label>
                                                                                <select type="text" class="form-control" 
                                                                                value = {this.state.CityId}
                                                                                onChange={this.handleCityChange}
                                                                                >
                                                                                     <option></option>
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
                                                                            <label for="validationCustom01">Pincode</label>
                                                                            <input type="text" class="form-control" 
                                                                            value = {this.props.Contri.PinCode}
                                                                            onChange={this.handlePinCodeChange}
                                                                            ></input>
                                                                           
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Phone</label>
                                                                        <input type="text" class="form-control"
                                                                        value = {this.props.Contri.Phone}
                                                                        onChange={this.handlePhoneChange}
                                                                        ></input>
                                                                       
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Mobile Number</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Contri.MobileNumber}
                                                                    onChange={this.handleMobileNumberChange}
                                                                    ></input>
                                                                   
                                                                </div>
                                                            </div>
                                                                <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Email Address</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Contri.EmailAddress}
                                                                    onChange={this.handleEmailAddressChange}
                                                                    ></input>
                                                                   
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
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleContactChange.bind(this)}>Next</button>
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
                                                                    <strong class="mr-auto">Show On Website</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                <div class="row">
                                                                   <div className="col-md-12">
                                                                   <label for="sw-arrows-first-name" >Show On Website<span className="mandatory">*</span></label>
                                                                   <br/>
                                                                   <label class="radio-inline">
                                                                       <input type="radio" name="optradio" checked = {this.state.Show == 'Yes' ? true : false} onChange= {()=>{
                                                                                            this.setState({
                                                                                                Show : 'Yes'
                                                                                                    })
                                                                                                 }}  /> Yes
                                                                    </label>
                                                                   <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                                       <input type="radio" name="optradio" checked = {this.state.Show == 'No' ? true : false} onChange= {()=>{
                                                                                            this.setState({
                                                                                                Show : 'No'
                                                                                                    })
                                                                                                 }}/> No
                                                                   </label> 
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
                                                                            onClick={this.handleSubmitChange.bind(this)}>Update</button>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        Contri : state.AddContributer
    }
}


export default connect(mapStateToProps,{
    setTitle,
    setName,
    setDesignation,
    setAddress,
    setCountry,
    setStateAc,
    setCity,
    setPinCode,
    setPhone,
    setMobileNumber,
    setEmailAddress,
    setclearcontirbutor
}) (ViewContributors);
