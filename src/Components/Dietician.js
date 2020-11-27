/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Notiflix from 'notiflix';
import {
    setTitleDo,
    setDoctorName,
    setMedicalRegistrationId,
    setSpecialization,
    setStartDateOfPractice,
    setStartDateOfDiabetesPractice,
    setOverallExperience,
    setDiabetesExperience,
    setQualification,
    setInstitute,
    setCompletionYear,
    setMobileNumberDo,
    setEmailAddressDo,
    setWebsiteDo,
    setFacebookDo,
    setTwitterDo,
    setLinkedinDo,
    setYoutubeDo,
    setInstagramDo,
    setHomeVisitDo,
    setTeleOnlineConsultation,
    setShowonWebsiteDo,
    setApprovalDo,
    setcleardoctor
} from './Actions/ActionType'
import moment from 'moment';
import GetApiCall from '../GetApi';
import {Edit3,Trash2,Monitor} from 'react-feather';
import PostApiCall from '../Api';

var arr = []
var arr2 = []
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

    

class Dietitian extends Component {

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

            NumRegex: /^[0-9]*$/,
            MobileRegex : /^[0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
        
            imagePreviewUrl: 'https://talentview.asia/wp-content/uploads/Wait-Staff-Icon-2.png',
            ImageData : [],
            TitleData: [
                { value: "Dr.", label: "Dr." },
                { value: "Mr.", label: "Mr." },
                { value: "Ms.", label: "Ms." },
           
               
              ],
              FlagData: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },               
              ],
              SpecializationData: [],
              Specialization : [],
              ProfileData : '',
              AssicoationData : '',
              RecognitionData : '',
              CompletionYearData : [],
              QualificationData : [],

              Qualification : '',
              Institute : '',
              CompletionYear : '',

              QualificationInfo : [],
              CertificateData : [],
              Certificate : '',
              Certdata : [],
              ConsentData : [],

              AddAccess : false
            
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
      
          this.props.setcleardoctor()
           Notiflix.Loading.Dots('');

      
           var arr =[]
           const date2 = new Date();
               // console.log(Math.abs(date2.getUTCFullYear() - 1930))
               arr.push({label : 'Select Year',value:'Select Year'})
           for(var i = 0 ; i <= Math.abs(date2.getUTCFullYear() - 1950) ;i++){
      
           
           arr.push({label : date2.getUTCFullYear()-i ,value:date2.getUTCFullYear()-i})
           
           }
           this.setState({
            CompletionYearData  : arr
           })
        GetApiCall.getRequest("GetQualification").then(resultdes =>
            resultdes.json().then(objdesignation => {
              this.setState({
                QualificationData: objdesignation.data,
                
              })
            }))

           

        // Notiflix.Loading.Remove()

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
   
                    if(filteredRights[i].fld_menuname == 'Add Nutritionist & Dietitians'){
        
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

      monthDiff(d2, d1) {
        var m = moment(d1);
        var years = m.diff(d2, 'years');
        m.add(-years, 'years');
        var months = m.diff(d2, 'months');
        m.add(-months, 'months');
        var days = m.diff(d2, 'days');
      
        return years+" years "+months+" months"
       }

      handleTitleChange = event =>{
          this.props.setTitleDo(event.target.value)
      }

      handleDoctorNameChange = event =>{
        this.props.setDoctorName(event.target.value)
    }

    handleMedicalRegistrationIdChange = event =>{
        this.props.setMedicalRegistrationId(event.target.value)
    }

    handleSpecializationChange = event =>{
        this.props.setSpecialization(event.target.value)
    }

    StartDateOfPractice = event =>{
        this.props.setStartDateOfPractice(event.target.value)
  
        // this.props.setOverallExperience(this.monthDiff(new Date(),new Date(event.target.value)))
    }

    handleStartDateOfPracticeChange = event =>{
        this.props.setStartDateOfPractice(event.target.value)
        this.props.setOverallExperience(this.monthDiff(new Date(event.target.value),new Date()))
    }

    handleStartDateOfDiabetesPracticeChange = event =>{
        this.props.setStartDateOfDiabetesPractice(event.target.value)
        this.props.setDiabetesExperience(this.monthDiff(new Date(event.target.value),new Date()))
    }

    handleOverallExperienceChange = event =>{
        this.props.setOverallExperience(event.target.value)
    }

    handleDiabetesExperienceChange = event =>{
        this.props.setDiabetesExperience(event.target.value)
    }

    handleQualificationChange = event =>{
        this.props.setQualification(event.target.value)
    }

    handleInstituteChage = event =>{
        this.props.setInstitute(event.target.value)
    }

    handleCompletionYearChange = event =>{
        this.props.setCompletionYear(event.target.value)
    }

    handleMobileNumberChange = event =>{
        if(this.state.NumRegex.test(event.target.value) && event.target.value.length <= 10)
        {
        this.props.setMobileNumberDo(event.target.value)
        }
    }

    handleEmailAddressChange = event =>{
        this.props.setEmailAddressDo(event.target.value)
    }

    handleWebsiteChange = event =>{
        this.props.setWebsiteDo(event.target.value)
    }

    handleFacebookChange = event =>{
        this.props.setFacebookDo(event.target.value)
    }

    handleTwitterChange = event =>{
        this.props.setTwitterDo(event.target.value)
    }

    handleLinkedinChange = event =>{
        this.props.setLinkedinDo(event.target.value)
    }

    handleYoutubeChange = event =>{
        this.props.setYoutubeDo(event.target.value)
    }

    handleTitleChange = event =>{
        this.props.setTitleDo(event.target.value)
    }

    handleInstagramChange = event =>{
        this.props.setInstagramDo(event.target.value)
    }

    handleHomeVisitChange = event =>{
        this.props.setHomeVisitDo(event.target.value)
    }

    handleTeleOnlineConsultationChange = event =>{
        this.props.setTeleOnlineConsultation(event.target.value)
    }

    handleShowonWebsiteChange = event =>{
        this.props.setShowonWebsiteDo(event.target.value)
    }

    handleApprovalChange = event =>{
        this.props.setApprovalDo(event.target.value)
    }


    onChangeProfile(profile){
        this.setState({ProfileData: profile.editor.getData()})  
    }

    onChangeRecognition(profile){
        this.setState({RecognitionData: profile.editor.getData()})  
    }

    onChangeAssociation(profile){
        this.setState({AssicoationData: profile.editor.getData()})  
    }

    handleDoctorProfile = () =>{
        if(JSON.stringify(this.state.ImageData) != '[]'){
          if(this.props.Doc.DoctorName != ''){
   
                      if(this.props.Doc.StartDateOfPractice != ''){
                       
                            this.setState({
                                PageTitle: '2',
                                Page1: 'Done'
                            })
               
                      }else{Notiflix.Notify.Failure('Please select start date of practice')}
          }else{Notiflix.Notify.Failure('Please enter nutritionist & dietitian name.')}
        }else{Notiflix.Notify.Failure('Please upload nutritionist & dietitian profile photo.')}
           
    }



    handleExperienceChange = () =>{
                                    
        // if(this.props.Doc.OverallExperience != ''){
            if(this.state.QualificationInfo.length >0 ){       
                                this.setState({
                                PageTitle : '3',
                                Page2 : 'Done'
                                })
    
            }else{Notiflix.Notify.Failure('Add atleast one qualification.')}
        // }else{Notiflix.Notify.Failure('Please enter Title.')}
            
          
    }

    handleQualification = () =>{

            // if(this.state.CertificateData.length >0 ){   
                    this.setState({
                        PageTitle : '4',
                        Page3 : 'Done'
                    }) 

    
                // }else{Notiflix.Notify.Failure('Add atleast one medical certificate.')}
        //     }else{Notiflix.Notify.Failure('Please enter Institute.')}
        // } else{Notiflix.Notify.Failure('Please enter Qualification.')}                                             
    }


    OnCertificatePdfSubmit(data,obj){

        var count = 0
        var cert = []
        
        for(var i = 0 ;i < this.state.CertificateData.length;i++)
        {    
                                const form = new FormData();
                                         
                                form.append('file', this.state.CertificateData[i].CertData);
                                form.append('foldername' , 'DietitianCertificate')
                                form.append('filename' , this.state.CertificateData[i].Certificate.trim().replace(/\s/g,'-').replace(/\//g,'-')+'-'+data[i]+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).DietitianId)
                                
                                fetch(this.state.ImageApiUrl, {
                                method: 'POST',
                                body: form
                                }).then((image) => {
                                
                                image.json().then(data1 => ({
                                data: data1,
                                status: image.status
                                })
                                ).then(res => {
                          
                                //  console.log(i)

                                 cert.push(res.data.Message.split(',')[2].split('=')[1].trim())
                          
                                 count = count + 1
            
                                        if(count == this.state.CertificateData.length){
            
                                            this.UpdateCertificatePdf(cert,data,obj)

                                            // Notiflix.Loading.Remove()
                    
                                        }
                                   
                          
                          
                                })
                            })
                        }
    }


    UpdateCertificatePdf(cert,data,obj){


        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
          

        var count = 0

        for(var i = 0 ;i < cert.length;i++)
        {  


        PostApiCall.postRequest({
                          
            id : data[i],
            certificate : 'https://images.beatmysugar.com/images/DietitianCertificate/'+cert[i],
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
            
         
       },"UpdateDietitianPdf").then((results2) => 
 
         results2.json().then(obj2 => {  
         if(results2.status == 200 || results2.status==201){

            count = count + 1

            if(count == cert.length){

                this.OnConsentSubmit(obj)

                // Notiflix.Loading.Remove()

            }
         }
        }))
    }
    }

    handleAward = () =>{
                                               
            this.setState({
                PageTitle : '5',
                Page4 : 'Done'
            })
          
    }

    handleContactInfo = () =>{
        if(this.props.Doc.MobileNumber != ''){
            if(this.props.Doc.MobileNumber.length == 10){
            if(this.props.Doc.EmailAddress != ''){
                if(this.state.EmailRegex.test(this.props.Doc.EmailAddress)){
   
                                        this.setState({
                                            PageTitle : '6',
                                            Page5 : 'Done'
                                        })
            }else{Notiflix.Notify.Failure('Please enter valid email address.')} 
            }else{Notiflix.Notify.Failure('Please enter email address.')} 
        }else{Notiflix.Notify.Failure('Please enter valid mobile number.')}                                      
        }else{Notiflix.Notify.Failure('Please enter mobile number.')}                          
    }

    handleConsultationChange = () =>{
  
                this.setState({
                    PageTitle : '7',
                    Page6 : 'Done'
                })
                                 
    }

    OnQualificationSubmit(obj){

        var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)
                      
           
                    var count = 0

                    Notiflix.Loading.Dots('');

                    for(var i = 0 ;i < this.state.QualificationInfo.length;i++)
                     {                        
                        PostApiCall.postRequest({
                            dietitianid : (JSON.parse(JSON.stringify(obj.data[0]))).DietitianId,
                            qualification : this.state.QualificationInfo[i].Qualification,
                            institute : this.state.QualificationInfo[i].Institute,
                            completionyear : this.state.QualificationInfo[i].CompletionYear,
                            updatedby : details[0].fld_staffid,
                            updatedon : moment().format('lll'),
                                  },"AddDietitianQualificationMapping").then((results) => 
                         
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(objs => {
                     
                         
                            if(results.status == 200 || results.status==201){

                                count = count + 1
                                if(count == this.state.QualificationInfo.length){

                                    // this.OnSpecialisationSubmit(obj)
                                    this.OnCertificateSubmit(obj)

                                }

                            }
                        }))
                    }

    }

    OnSpecialisationSubmit(obj){
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
          

        var count = 0

        Notiflix.Loading.Dots('');

        for(var i = 0 ;i < this.state.SpecializationData.length;i++)
         {                        
            PostApiCall.postRequest({
                dietitianid : (JSON.parse(JSON.stringify(obj.data[0]))).DietitianId,
                specialisation : this.state.SpecializationData[i].value,
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll'),
                      },"AddDietitianSpecialisationMapping").then((results) => 
             
                // const objs = JSON.parse(result._bodyText)
                results.json().then(objs => {
         
             
                if(results.status == 200 || results.status==201){

                    count = count + 1
                    if(count == this.state.SpecializationData.length){

                        this.OnCertificateSubmit(obj)

                    }

                }
            }))
        }


    }


    OnCertificateSubmit(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
          

        var count = 0

        var data = []

        if(this.state.CertificateData.length> 0)
        {
            
        Notiflix.Loading.Dots('');

        for(var i = 0 ;i < this.state.CertificateData.length;i++)
         {              
                      
            PostApiCall.postRequest({
                dietitianid : (JSON.parse(JSON.stringify(obj.data[0]))).DietitianId,
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll'),
                      },"AddDietitianCertificateMapping").then((results) => 
             
                // const objs = JSON.parse(result._bodyText)
                results.json().then(obj1 => {
         
             
                if(results.status == 200 || results.status==201){


                    data.push((JSON.parse(JSON.stringify(obj1.data[0]))).CertificateId)

                           count = count + 1
            
                                        if(count == this.state.CertificateData.length){
            
                                            this.OnCertificatePdfSubmit(data,obj)

                                          
                    
                                        }
                   

                }
            }))
        }
    }
    else
    {
        this.OnConsentSubmit(obj)
    }

    }



    OnConsentSubmit(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login) 

        const form = new FormData();
                             
        form.append('file', this.state.ConsentData);
        form.append('foldername' , 'DietitianConsent')
        form.append('filename' , 'Consent-'+(JSON.parse(JSON.stringify(obj.data[0]))).DietitianId)
        
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
  
                id : (JSON.parse(JSON.stringify(obj.data[0]))).DietitianId,
                consent : 'https://images.beatmysugar.com/images/DietitianConsent/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
                
             
           },"UpdateDietitianConsent").then((results1) => 
     
             results1.json().then(obj1 => {  
             if(results1.status == 200 || results1.status==201){
  
              
                this.OnPhotosubmit(obj)
             }
            }))
  
  
        })
    })

    }

    OnPhotosubmit(obj){
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login) 

        const form = new FormData();
                             
        form.append('file', this.state.ImageData);
        form.append('foldername' , 'Dietitian')
        form.append('filename' , 'Photo-'+(JSON.parse(JSON.stringify(obj.data[0]))).DietitianId)
        
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
  
                id : (JSON.parse(JSON.stringify(obj.data[0]))).DietitianId,
                photo : 'https://images.beatmysugar.com/images/Dietitian/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
                
             
           },"UpdateDietitianPhoto").then((results1) => 
     
             results1.json().then(obj1 => {  
             if(results1.status == 200 || results1.status==201){
  
              
                this.setState({
                    PageTitle: '7',
                    Page3: 'Done'
                })
                this.props.setcleardoctor()
                Notiflix.Loading.Remove()
                Notiflix.Notify.Success('Dietitian successfully added.')
                window.location.href = '/dietitianlist'
             }
            }))
  
  
        })
    })
    }

    handleSubmit = () =>{
       
                if(JSON.stringify(this.state.ConsentData) != '[]'){
                    if(this.state.AddAccess){

                    var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)
                      
           
                    Notiflix.Loading.Dots('');
                        
                        PostApiCall.postRequest({
                             title : this.props.Doc.Title,
                             name : this.props.Doc.DoctorName,
                             practicestartdate : this.props.Doc.StartDateOfPractice,
                             overallexp : this.props.Doc.OverallExperience,
                             profile : this.state.ProfileData,
                             association : this.state.AssicoationData,
                             recognition : this.state.RecognitionData,
                             mobile : this.props.Doc.MobileNumber,
                             email : this.props.Doc.EmailAddress,
                             website : this.props.Doc.Website,
                             facebook : this.props.Doc.Facebook,
                             twitter : this.props.Doc.Twitter,
                             linkedin : this.props.Doc.Linkedin,
                             youtube : this.props.Doc.Youtube,
                             instagram : this.props.Doc.Instagram,
                             homevisit : this.props.Doc.HomeVisit,
                             tele : this.props.Doc.TeleOnlineConsultation,
                             showonweb : this.props.Doc.ShowonWebsite,
                             approved : 'No',
                             updatedby : details[0].fld_staffid,
                             updatedon : moment().format('lll'),
                                  },"AddDietitian").then((results) => 
                         
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(obj => {
                     
                         
                            if(results.status == 200 || results.status==201){


                                this.OnQualificationSubmit(obj)

                    this.setState({
                        PageTitle : '7',
                        Page7 : 'Done'
                    })

                }else{
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Failure('Something went wrong, try again later.')
                  }
            }))

        }
        else{
            Notiflix.Notify.Failure('You are not authorised to continue.'); 
         }
                 
                }else{Notiflix.Notify.Failure('Please upload censent letter.')}
                      
           
    }


    OnAddQualification(){
        if(this.state.Qualification != ''){
            if(this.state.Institute != ''){
              if(this.state.CompletionYear != ''){
               
                var dt = this.state.QualificationInfo.filter((value)=> value.Qualification == this.state.Qualification)

                if(dt == '')
                {
                    
                    arr.push({
                      Qualification : this.state.Qualification ,
                      Institute: this.state.Institute,
                      CompletionYear: this.state.CompletionYear,
                    
                    })
    
                 
    
                  this.setState({
                    QualificationInfo: arr
                  })
                     
                    this.setState({
                        Qualification : '',
                        Institute: '',
                        CompletionYear: '',
                    })
                }
                else
                {
                    Notiflix.Notify.Failure('Qualification already added.'); 
                } 
    
                    
    
                  
              }else
              {
                Notiflix.Notify.Failure('Please select completion year.');
              }
            }else
            {
              Notiflix.Notify.Failure('Please enter institute.');
            }
          }else
          {
            Notiflix.Notify.Failure('Please select qualification.');
          }
    }


    OnAddCertificate(){
        if(this.state.Certificate != ''){

            var dt = this.state.CertificateData.filter((value)=> value.Certificate == this.state.Certificate)

                if(dt == '')
                {
                    
                    arr2.push({
                      Certificate : this.state.Certificate,
                      CertData: this.state.CertData,
                     
                    
                    })
    
                 
    
                  this.setState({
                    CertificateData: arr2
                  })
                     
                    // this.setState({
                    //     Certificate : '',
                    //   CertData: '',
                    // })
                }
                else
                {
                    Notiflix.Notify.Failure('Certificate already added.'); 
                } 

        }else
        {
            Notiflix.Notify.Failure('Please upload certificate.');
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
                                                <li class="breadcrumb-item"><a href="#">Nutritionist & Dietitian List</a></li>
                                               
                                                <li class="breadcrumb-item active" aria-current="page">Add New Nutritionist & Dietitian</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Add New Nutritionist & Dietitian</h4>
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
                                                        }} class="wizardlist nav-link">Dietitian Profile</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Qualifications</a></li>
                                                 <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">Certificates</a></li>
                                                 <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Award & Memberships</a></li>
                                                    <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page5 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '5',
                                                                            Page5: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    class="wizardlist nav-link">Contact Informations</a></li>
                                                         <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page6 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '6',
                                                                                Page6: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        class="wizardlist nav-link">Consultation</a></li>
                                                                        <li className={this.state.PageTitle == '7' ? 'active nav-item' : this.state.Page7 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                            if (this.state.Page7 == 'Done') {
                                                                                this.setState({
                                                                                    PageTitle: '7',
                                                                                    Page7: 'Done',
                
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
                                                                    aria-atomic="true" data-toggle="toast" style={{overflow: 'visible'}}>
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Nutritionist & Dietitian Profile</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                  <div class="col-md-3">
                                                                                  <label for="validationCustom05">Profile Picture (Size &lt; 100kb, 500*500)<span className="mandatory">*</span></label>
                                                                                  <div class="form-group">
                                                                                  <div class="div1">
                                                                                  <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
                                                                                
                                                                                           </div>
                                                                                   </div>
                                                                                  </div>
                                                                                  <div class="col-md-9" style={{marginTop : '26px'}}>
                                                                                   <div class="row">
                                                                                   <div class="col-md-12">
                                                                                     <div class="row">
                                                                                       <div class="col-md-3">
                                                                                       <div class="form-group mb-2">
                                                                                       <label for="validationCustom05">Title<span className="mandatory">*</span></label>
                                                                                    
                                                                                      <select type="text" class="form-control" 
                                                                                        value = {this.props.Doc.Title}
                                                                                        onChange = {this.handleTitleChange}
                                                                                    >
                                                                                    {this.state.TitleData.map(title => (
                           
                                                                                        <option key={title.value} value={title.value}>
                                                                                          {title.label}
                                                                                     </option>
                                                                                     ))}
                                                                                    </select>
                                                                                       
                                                                                   </div>
                                                                                       </div>
                                                                                       <div class="col-md-9">
                                                                                       <div class="form-group mb-2">
                                                                                       <label for="validationCustom05">Nutritionist & Dietitian Name<span className="mandatory">*</span></label>
                                                                                       <input type="text" class="form-control" id="validationCustom05"
                                                                                        value = {this.props.Doc.DoctorName}
                                                                                        onChange = {this.handleDoctorNameChange}
                                                                                      ></input>
                                                                                       
                                                                                   </div>
                                                                                       </div>
                                                                                     </div>
                                                                               </div> 
                                       
                                                                                   </div> {/* end row */}
                                                                                
                                                                                 
                                                                               {/* end row */}
                                                                               <div class="row" style={{marginTop : '10px'}}>
                                                                               <div class="col-md-6">
                                                                               <div class="form-group mb-2">
                                                                               <label for="validationCustom05">Start Date Of Practice<span className="mandatory">*</span></label>
                                                                               <input type="month" 
                                                                                max={moment().format('YYYY-MM')}
                                                                                onKeyDown={(e) => e.preventDefault()} 
                                                                               class="form-control" id="validationCustom05"
                                                                               value = {this.props.Doc.StartDateOfPractice}
                                                                               onChange = {this.handleStartDateOfPracticeChange}
                                                                                      ></input>
                                                                              
                                                                           </div>
                                                                               </div>
                                                                               <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Overall Experience (eg : x year x months)</label>
                                                                                <input type="text" class="form-control"  required 
                                                                                value = {this.props.Doc.OverallExperience}
                                                                                disabled={true}
                                                                                onChange = {this.handleOverallExperienceChange}
                                                                                />
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
                                                                aria-atomic="true" data-toggle="toast">
                                                              
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    <div className="col-md-12">
                                                                    <div class="form-group mb-2">
                                                                        <label for="validationCustom05">Profile</label>
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
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleDoctorProfile.bind(this)}>Next</button>
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
                                                                    <strong class="mr-auto">Qualifications</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Qualification<span className="mandatory">*</span></label>
                                                                                        <select type="text" class="form-control" 
                                                                                        value = {this.state.Qualification}
                                                                                        onChange = {(text)=>{
                                                                                            this.setState({
                                                                                                Qualification : text.target.value
                                                                                            })
                                                                                        }}
                                                                                        required >
                                                                                            <option>Select Qualification</option>
                                                                                        {this.state.QualificationData.map(title => (
                           
                                                                                            <option key={title.value} value={title.value}>
                                                                                                {title.label}
                                                                                            </option>
                                                                                            ))}
                                                                                    </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-4">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Institute<span className="mandatory">*</span></label>
                                                                                  <input type="text" class="form-control" id="validationCustom05"
                                                                                 value = {this.state.Institute}
                                                                                 onChange = {(text)=>{
                                                                                     this.setState({
                                                                                         Institute : text.target.value
                                                                                     })
                                                                                 }}
                                                                                  />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Completion Year<span className="mandatory">*</span></label>
                                                                                    <select type="text" class="form-control" 
                                                                                  value = {this.state.CompletionYear}
                                                                                  onChange = {(text)=>{
                                                                                      this.setState({
                                                                                        CompletionYear : text.target.value
                                                                                      })
                                                                                  }}
                                                                                    required >
                                                                                   {this.state.CompletionYearData.map(title => (
                           
                                                                                <option key={title.value} value={title.value}>
                                                                                    {title.label}
                                                                                </option>
                                                                                ))}
                                                                                </select>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                       
                                                                    </div>

                                                                    <div>
                                                    <button class="btn btn-primary" style={{float: 'right',marginBottom: '9px'}}
                                              onClick={this.OnAddQualification.bind(this)}
                                                    > Add Nuitritionist & Dietitian Qualification</button>
                                                </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">

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
                                                    <th style={{borderRight : '1px solid #fff'}}>Qualification</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Institute</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Completion Year</th>
                                                    <th>Action</th>
                                                   
                                                </tr>
                                            </thead>
                                        
                                     
                                           
                                           
                                    <tbody >
                                 
                                 {this.state.QualificationInfo.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Qualification Available</td></tr> : 
                                 ''}
                                        
                                         {this.state.QualificationInfo.map((data,index)=>(
                                           
                                           
                                       
                                                <tr key={index}>
                                                      
                                                <td>{data.Qualification}</td>
                                                <td>{data.Institute}</td>
                                                <td>{data.CompletionYear}</td>
                                                
                                                <td> <div class="align-self-center" style={{    textAlign: 'center'}}>
                                            <span  >
                                            <Edit3 style={{marginRight : '10px'}}
                                            onClick={()=>{
                                              var data = [...this.state.QualificationInfo]

                                              this.setState({
                                                Qualification : data[index].Qualification,
                                                Institute : data[index].Institute,
                                                CompletionYear : data[index].CompletionYear,
                                               
                                              },()=>{
                                                data.splice(index,1)
                                                arr.splice(index,1)
                                                this.setState({
                                                  QualificationInfo : data
                                                })
                                              })
                                             
                                            }}
                                            ></Edit3>
                                              <Trash2
                                               onClick={()=>{
                                                var data = [...this.state.QualificationInfo ]
                                                data.splice(index,1)
                                                arr.splice(index,1)
                                                this.setState({
                                                    QualificationInfo  : data
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
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '1',
                                                                              Page2 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleExperienceChange.bind(this)}>Next</button>
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
                                                                    <strong class="mr-auto">Upload Medical Certificate</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Upload Medical Certificate<span className="mandatory">*</span></label>
                                                                                  <input type="file" accept="application/pdf" class="form-control consent" id="validationCustom05"
                                                                                  onChange={(e)=>{
                                                                                    if (e.target.files[0].size < 5000000) {
                                                                                        
                                                                                        const reader = new FileReader();
                                                                                        const file = e.target.files[0];
                                                                                        reader.onloadend = () => {
                                                                                          
                                                                                          this.setState({
                                                                                            // file: file,
                                                                                            // imagePreviewUrl: reader.result
                                                                                            CertData : file,
                                                                                            Certificate : file.name
                                                                                          });
                                                                                        }
                                                                                        reader.readAsDataURL(file);
                                                                                    } else {
                                                                                        Notiflix.Notify.Failure("File too large, upload file less than 5 Mb.");
                                                                                      } 
                                                                                  }}
                                                                                  />
                                                                            </div>
                                                                        </div>
                                                                       
                                                                    </div>
                                                                                     <div>
                                                    <button class="btn btn-primary" style={{float: 'right',marginBottom: '9px'}}
                                              onClick={this.OnAddCertificate.bind(this)}
                                                    > Add Certificate</button>
                                                </div>
                                                                </div>
                                                            </div> 


                                                            <div class="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">

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
                                                    <th style={{borderRight : '1px solid #fff'}}>Certificate Name</th>
                                                    {/* <th style={{borderRight : '1px solid #fff'}}>Institute</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Completion Year</th> */}
                                                    <th>Action</th>
                                                   
                                                </tr>
                                            </thead>
                                        
                                     
                                           
                                           
                                    <tbody >
                                 
                                 {this.state.CertificateData.length == 0 ? 
                                 <tr><td colSpan={2} style={{textAlign:'center'}}>No Certificates Available</td></tr> : 
                                 ''}
                                        
                                         {this.state.CertificateData.map((data,index)=>(
                                           
                                           
                                       
                                                <tr key={index}>
                                                      
                                                <td>{data.Certificate}</td>
                                              
                                                <td> <div class="align-self-center" style={{    textAlign: 'center'}}>
                                            <span  >
                                            
                                              <Trash2
                                               onClick={()=>{
                                                var data = [...this.state.CertificateData]
                                                data.splice(index,1)
                                                arr2.splice(index,1)
                                                this.setState({
                                                    CertificateData  : data
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
                                                                                        PageTitle: '2',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleQualification.bind(this)}>Next</button>
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
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Award & Membership</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Medical Association (500 Characters)</label>
                                                                                <div class="niceeditors">
                                                                                <CKEditor
                                                                                config={{
                                                                                    extraPlugins: "justify,font,colorbutton",
                                                                                 }}
                                                                                          data={this.state.AssicoationData}
                                                                                          onChange={this.onChangeAssociation.bind(this)}  
                                                                                  />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-12">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Rewards Recognition (500 Characters)</label>
                                                                            <div class="niceeditors">
                                                                            <CKEditor
                                                                            config={{
                                                                                extraPlugins: "justify,font,colorbutton",
                                                                             }}
                                                                                    data={this.state.RecognitionData}
                                                                                    onChange={this.onChangeRecognition.bind(this)}  
                                                                              />
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
                                                                                        PageTitle: '3',
                                                                                        Page4: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleAward.bind(this)}>Next</button>
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
                                                            <div class="toast-header">
                                                                <strong class="mr-auto">Contact Information</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                 <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Mobile Number<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control" maxlength="10"
                                                                            value = {this.props.Doc.MobileNumber}
                                                                            onChange = {this.handleMobileNumberChange}
                                                                            required ></input>
                                                                    
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Email Address<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control" 
                                                                            value = {this.props.Doc.EmailAddress}
                                                                            onChange = {this.handleEmailAddressChange}
                                                                            required ></input>
                                                                    
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Website</label>
                                                                            <input type="text" class="form-control" 
                                                                            value = {this.props.Doc.Website}
                                                                            onChange = {this.handleWebsiteChange}
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
                                                                    <label for="validationCustom01">Facebook</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Doc.Facebook}
                                                                    onChange = {this.handleFacebookChange}
                                                                    required ></input>
                                                            
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Twitter</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Doc.Twitter}
                                                                    onChange = {this.handleTwitterChange}
                                                                    required ></input>
                                                            
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Linkedin</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Doc.Linkedin}
                                                                    onChange = {this.handleLinkedinChange}
                                                                    required ></input>
                                                            
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Youtube</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Doc.Youtube}
                                                                    onChange = {this.handleYoutubeChange}
                                                                    required ></input>
                                                            
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Instagram</label>
                                                                    <input type="text" class="form-control" 
                                                                    value = {this.props.Doc.Instagram}
                                                                    onChange = {this.handleInstagramChange}
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
                                                                            onClick={() => {

                                                                                this.setState({
                                                                                    PageTitle: '4',
                                                                                    Page5: 'Done'
                                                                                })
                                                                            }}
                                                                        >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleContactInfo.bind(this)}>Next</button>
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
                                                            <strong class="mr-auto">Consultation</strong>
                                                        </div>
                                                        <div class="toast-body">
                                                            <div class="row">
                                                               
                                                                    <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Home Visit<span className="mandatory">*</span></label><br/>
                                                                            <select type="text" class="form-control"
                                                                            value = {this.props.Doc.HomeVisit}
                                                                            onChange = {this.handleHomeVisitChange}
                                                                            >
                                                                                {this.state.FlagData.map(title => (
                           
                                                                                    <option key={title.value} value={title.value}>
                                                                                        {title.label}
                                                                                    </option>
                                                                                    ))}
                                                                            
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Tele Online Consultation<span className="mandatory">*</span></label><br/>
                                                                            <select type="text" class="form-control"
                                                                            value = {this.props.Doc.TeleOnlineConsultation}
                                                                            onChange = {this.handleTeleOnlineConsultationChange}
                                                                            >
                                                                                {this.state.FlagData.map(title => (
                           
                                                                                <option key={title.value} value={title.value}>
                                                                                    {title.label}
                                                                                </option>
                                                                                ))}
                                                                            
                                                                            </select>
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
                                                                    <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleConsultationChange.bind(this)}>Next</button>
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
                                                        <strong class="mr-auto">Profile Status</strong>
                                                    </div>
                                                    <div class="toast-body">
                                                        <div class="row">
                                                        <div class="col-md-8">
                                                        <div class="form-group mb-3">
                                                            <label for="validationCustom01">Consent Form<span className="mandatory">*</span></label><br/>
                                                            <input 
                                                            accept="application/pdf"
                                                            onChange={(e)=>{
                                                                if (e.target.files[0].size < 5000000) {
                                                                    
                                                                    const reader = new FileReader();
                                                                    const file = e.target.files[0];
                                                                    reader.onloadend = () => {
                                                                      
                                                                      this.setState({
                                                                        // file: file,
                                                                        // imagePreviewUrl: reader.result
                                                                        ConsentData : file,
                                                                       
                                                                      });
                                                                    }
                                                                    reader.readAsDataURL(file);
                                                                } else {
                                                                    Notiflix.Notify.Failure("File too large, upload file less than 5 Mb.");
                                                                  } 
                                                              }}
                                                            type="file" class="form-control consent"></input>
                                                            </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                    <div class="form-group mb-3">
                                                        <label for="validationCustom01">Show on Website<span className="mandatory">*</span></label><br/>
                                                        <select type="text" class="form-control"
                                                        value = {this.props.Doc.ShowonWebsite}
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
                                                    <label for="validationCustom01">Approved<span className="mandatory">*</span></label><br/>
                                                    <select type="text" class="form-control" 
                                                    value = {this.props.Doc.Approval}
                                                    onChange = {this.handleApprovalChange}
                                                    required >
                                                   {this.state.FlagData.map(title => (
                           
                                                        <option key={title.value} value={title.value}>
                                                            {title.label}
                                                        </option>
                                                        ))}
                                                    
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
                                                                            PageTitle: '6',
                                                                            Page7: 'Done'
                                                                        })
                                                                    }}
                                                                >Previous</button>
                                                                <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleSubmit.bind(this)}>Submit</button>
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
        Doc: state.Doctor
    }
}


export default connect(mapStateToProps,{
    setTitleDo,
    setDoctorName,
    setMedicalRegistrationId,
    setSpecialization,
    setStartDateOfPractice,
    setStartDateOfDiabetesPractice,
    setOverallExperience,
    setDiabetesExperience,
    setQualification,
    setInstitute,
    setCompletionYear,
    setMobileNumberDo,
    setEmailAddressDo,
    setWebsiteDo,
    setFacebookDo,
    setTwitterDo,
    setLinkedinDo,
    setYoutubeDo,
    setInstagramDo,
    setHomeVisitDo,
    setTeleOnlineConsultation,
    setShowonWebsiteDo,
    setApprovalDo,
    setcleardoctor
}) (Dietitian);
