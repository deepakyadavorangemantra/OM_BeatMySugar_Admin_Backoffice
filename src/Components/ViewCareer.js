import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import TimePicker from 'react-time-picker';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import moment from 'moment';

import PostApiCall from '../Api'
import GetApiCall from '../GetApi';
import {
    setjobtitle,
    setcareercountry,
    setcareerstate,
    setcareercity,
    setemploymenttype,
    setcareertime,
    setclearcareer
 } from './Actions/ActionType';

 


class ViewCareer extends Component {

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

            CountryData : [],
            CityData : [],
            StateData : [],
            CountryId: 0,
            StateId : 0,
            CityId : 0,
            Employment:[],
            EmploymentType:[{'label':'Full Time','value' : 'Full Time'},
            {'label':'Part-Time', 'value' : 'Part-Time'},
            {'label':'Intern', 'value' : 'Intern'},
            {'label':'Contract,','value' : 'Contract,'},
            {'label':'Trainee','value' : 'Trainee'},
            {'label':'Temporary','value' : 'Temporary'},
            {'label':'Volunteer','value' : 'Volunteer'},
        ],
        Qualification:'',
        WorkExperience:'',
        JobDescription:'',
        Status:'Yes',
        Approval:'Yes',
        


           
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

          this.props.setclearcareer()
          Notiflix.Loading.Dots('Please wait...');

          var det = localStorage.getItem('CareerDetails')
          var CareerData = JSON.parse(det)
    
         var sp = []
        for(var i = 0 ; i < CareerData.fld_employmenttype.split(', ').length ; i++){

        sp.push({value : CareerData.fld_employmenttype.split(', ')[i], label : CareerData.fld_employmenttype.split(', ')[i]})

    }

          this.setState({
            Status:CareerData.fld_showonwebsite,
            Approval:CareerData.fld_approved,
              Careerid:CareerData.fld_id,
              Employment : sp


          })
     
          new Promise( ( resolve, reject ) => {
            setTimeout( resolve, 1000 );
          } ).then( () => {
            this.setState( { 
                Qualification : CareerData.fld_qualification,
                WorkExperience :CareerData.fld_workexperience,
                JobDescription:CareerData.fld_jobdescription,
               
            } );
        } );

        this.props.setjobtitle(CareerData.fld_title)
        this.props.setcareertime(CareerData.fld_joiningdate)
        this.props.setcareercountry(CareerData.fld_country)
        this.props.setcareerstate(CareerData.fld_state)
        this.props.setcareercity(CareerData.fld_city)


        GetApiCall.getRequest("GetCountry").then(resultdes =>
            resultdes.json().then(obj => {
  
                
                  this.setState({
                    CountryData : obj.data,
                  })
  
              if(obj.data.length != 0 ){
          
               this.setState({
                    CountryId : obj.data.filter(value=>value.label == CareerData.fld_country)[0].value,
                })
              }

              PostApiCall.postRequest({
  
                countryid : obj.data.filter(value=>value.label == CareerData.fld_country)[0].value,

              },"GetState").then((results) => 
              
                results.json().then(objstate => {
          
              
                if(results.status == 200 || results.status==201){


                    if(objstate.data.length != 0 ){
                  
                        this.setState({
                          
                            StateId :   objstate.data.filter(value=>value.label == CareerData.fld_state)[0].value,
                            StateData : objstate.data,
                        })
                      }


                      PostApiCall.postRequest({
  
                        stateid : objstate.data.filter(value=>value.label == CareerData.fld_state)[0].value,
        
                      },"GetCity").then((resultscity) => 
                      
                        resultscity.json().then(objcity => {
                  
                      
                        if(resultscity.status == 200 || resultscity.status==201){
        
        
                            if(objcity.data.length != 0 ){
                              
                                this.setState({
                                    CityId : objcity.data.filter(value=>value.label == CareerData.fld_city)[0].value,
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
   
    OnChangeTitle(jobtitle){
        console.log(jobtitle.target.value)
        this.props.setjobtitle(jobtitle.target.value)
    }

    SaveJobtitle(){
        if(this.props.careercredential.JobTitle!=''){
             this.setState({
                            PageTitle : '2',
                            Page1 : 'Done'
                        }) 
        }
        else{  
            Notiflix.Notify.Failure('Please enter job title.') 
           }
    }

  onChangeCountry(country){
     
        this.setState({
            CountryId : country.target.value
          })
         this.props.setcareercountry(this.state.CountryData[country.target.value - 1].label);
         
         Notiflix.Loading.Dots('Please wait...');

         PostApiCall.postRequest(
           {
             countryid: country.target.value
           },
           "GetState"
         ).then(results =>
 
           results.json().then(obj => {
             if (results.status == 200 || results.status == 201) {
               
                this.props.setcareerstate(obj.data[0].label)

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
                                            this.props.setcareercity(objcity.data[0].label)
                                     
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
          
              this.props.setcareerstate(this.state.StateData[i].label);
            }
          }
      
          PostApiCall.postRequest(
            {
              stateid: state.target.value
            },
            "GetCity"
          ).then(results =>
            results.json().then(obj => {
              if (results.status == 200 || results.status == 201) {

                if(obj.data.length > 0){
                this.props.setcareercity(obj.data[0].label)
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
    onChangeCity(city){
        this.setState({
            CityId : city.target.value
          })
      
          for(var i = 0;i<Object.keys(this.state.CityData).length;i++){
        
            if(this.state.CityData[i].value == city.target.value){
          
              this.props.setcareercity(this.state.CityData[i].label);
            }
          }
    }

    SaveLocation(){
        if(this.props.careercredential.Country!=''){
            if(this.props.careercredential.State!=''){
                 if(this.props.careercredential.City!=''){
                    this.setState({
                                   PageTitle: '3',
                                    Page2: 'Done'
                              })
        
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

    SaveEmployment(){
        if(this.state.Employment.length > 0){
            this.setState({
                PageTitle: '4',
                 Page3: 'Done'
           })
        }
        else{
            Notiflix.Notify.Failure('Please select employment type.')  
    }
    }

    onChangeQualify(qualification){
        this.setState({Qualification:qualification.editor.getData()})
    }

    SaveQualification(){
        if(this.state.Qualification!=''){
            this.setState({
                PageTitle: '5',
                 Page4: 'Done'
           })
        }
        else{
            Notiflix.Notify.Failure('Please enter qualification.')  
    }
    }

    onChangeWork(workexperience){
        this.setState({WorkExperience:workexperience.editor.getData()})
    }     
    
    SaveExperience(){
        if(this.state.WorkExperience!=''){
            this.setState({
                PageTitle: '6',
                 Page5: 'Done'
           })
        }
        else{
            Notiflix.Notify.Failure('Please enter work experience.')  
    } 
    }

    OnchangeTime(joiningtime){
        console.log(joiningtime.target.value)
    this.props.setcareertime(joiningtime.target.value)
    }

    SaveTime(){
        if(this.props.careercredential.Time!=''){
            this.setState({
                        PageTitle : '7',
                        Page6 : 'Done'
                    })
        }
        else{
            Notiflix.Notify.Failure('Please select joining month.')  
    } 
    }

    onChangeDescription(jobdescription){
        this.setState({JobDescription:jobdescription.editor.getData()})
    }
     
    SaveJobDescription(){
        if(this.state.JobDescription!=''){
            this.setState({
                PageTitle : '8',
                Page7 : 'Done'
            })
        }
        else{
            Notiflix.Notify.Failure('Please enter job description.')  
    } 
    }

    SaveCareer(){
      
                  

                var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)
                 Notiflix.Loading.Dots('');


                 var emptype= ''

                 for(var i =0 ;i<this.state.Employment.length ;i++){

                    if(i == 0)
                    {
                        emptype = this.state.Employment[i].value
                    }else{
                        emptype = emptype + ', '+this.state.Employment[i].value
                    }

                 }
                      
       PostApiCall.postRequest({
        
        id:this.state.Careerid,
         title : this.props.careercredential.JobTitle,
         employmenttype : emptype,
         qualification :this.state.Qualification,
         workexperience : this.state.WorkExperience,
         jobdescription : this.state.JobDescription,
         joiningdate  : this.props.careercredential.Time,
         city : this.props.careercredential.City,
         state : this.props.careercredential.State,
         country : this.props.careercredential.Country,
         approved : 'No',
         showonwebsite :this.state.Status,
           updatedon : moment().format('lll'),
           updatedby : details[0].fld_staffid
    
        },"UpdateCareer").then((results) => 
            
        
          results.json().then(obj => {
    
        
          if(results.status == 200 || results.status==201){
           this.props.setclearcareer()

           Notiflix.Loading.Remove()

           Notiflix.Notify.Success('Job opeining successfully Updated.')
           window.location.href = '/jobopeninglist'
           

       }
       else{
           Notiflix.Loading.Remove()
           Notiflix.Notify.Failure('Something went wrong, try again later')
         } 
       }
          )
        )


        

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
                                                <li class="breadcrumb-item"><a href="#">Career Management</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">View Job Opeining</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Job Opeining</h4>
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
                                                        }} class="wizardlist nav-link">Job Title</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Location </a></li>
                                                 <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">Employment Type</a></li>
                                                 <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Qualification </a></li>
                                                    <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page5 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '5',
                                                                            Page5: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    class="wizardlist nav-link"> Work Experience</a></li>
                                                         <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page6 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '6',
                                                                                Page6: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        class="wizardlist nav-link">Joining Time</a></li>
                                                                        <li className={this.state.PageTitle == '7' ? 'active nav-item' : this.state.Page7 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                            if (this.state.Page7 == 'Done') {
                                                                                this.setState({
                                                                                    PageTitle: '7',
                                                                                    Page7: 'Done',
                
                                                                                })
                                                                            }
                                                                        }}
                                                                            class="wizardlist nav-link">Job Description</a></li>
                                                                     <li className={this.state.PageTitle == '8' ? 'active nav-item' : this.state.Page8 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                                if (this.state.Page8 == 'Done') {
                                                                                    this.setState({
                                                                                        PageTitle: '8',
                                                                                        Page8: 'Done',
                    
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
                                                                        <strong class="mr-auto">Job Title</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Job Title<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                     value={this.props.careercredential.JobTitle}
                                                                                     onChange={this.OnChangeTitle.bind(this)}
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
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                      onClick={this.SaveJobtitle.bind(this)} >Next</button>
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
                                                                    <strong class="mr-auto">Location</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">

                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Country<span className="mandatory">*</span></label>
                                                                        <select type="text" class="form-control"  
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
                                                                <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">State<span className="mandatory">*</span></label>
                                                                    <select type="text" class="form-control"
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
                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">City<span className="mandatory">*</span></label>
                                                                        <select type="text" class="form-control"  
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
                                                                    onClick={this.SaveLocation.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 2*/}
                                                        <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive" style={{overflow: 'visible'}}
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Employment Type</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    
                                                                    <div class="col-md-12">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Employment Type<span className="mandatory">*</span></label>
                                                                        <Select 
                                                                                    options={this.state.EmploymentType}
                                                                                        value={this.state.Employment}
                                                                                        onChange={(et)=>{
                                                                                            this.setState({Employment : et})
                                                                                        }}
                                                                                        isMulti
                                                                             />
                                                                    </div>
                                                                </div>
                                                                       
                                                                    </div>
                                                                    
                                                                </div>
                                                           

                                                            <div className=" fade show col-12" role="alert" aria-live="assertive"
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
                                                                              onClick={this.SaveEmployment.bind(this)}
                                                                              >Next</button>
                                                                        </div>
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
                                                                    <strong class="mr-auto">Qualification</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="niceeditors">
                                                                    <CKEditor
                                                                    config={{
                                                                        extraPlugins: "justify,font,colorbutton",
                                                                     }}
                                                                    data={this.state.Qualification}
                                                                    onChange={this.onChangeQualify.bind(this)}
                                                                      />
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
                                                                             onClick={this.SaveQualification.bind(this)}
                                                                              >Next</button>
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
                                                                <strong class="mr-auto">Work Experience</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="niceeditors">
                                                                <CKEditor
                                                                config={{
                                                                    extraPlugins: "justify,font,colorbutton",
                                                                 }}
                                                                data={this.state.WorkExperience}
                                                                onChange={this.onChangeWork.bind(this)} 
                                                                  />
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
                                                                        onClick={this.SaveExperience.bind(this)}
                                                                          >Next</button>
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
                                                            <strong class="mr-auto">Joining Time</strong>
                                                        </div>
                                                        <div class="toast-body">
                                                            <div class="row">
                                                               
                                                                <div class="col-md-12">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Joining Time<span className="mandatory">*</span></label><br/>
                                                                    <input type="month" 
                                                                        min={moment().format('YYYY-MM')}
                                                                          onKeyDown={(e) => e.preventDefault()} 
                                                                           class="form-control" id="validationCustom05"
                                                                            value={this.props.careercredential.Time}
                                                                            onChange={this.OnchangeTime.bind(this)}
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
                                                                        onClick={() => {

                                                                            this.setState({
                                                                                PageTitle: '5',
                                                                                Page6: 'Done'
                                                                            })
                                                                        }}
                                                                    >Previous</button>
                                                                    <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                     onClick={this.SaveTime.bind(this)} 
                                                                     >Next</button>
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
                                                        <strong class="mr-auto">Job Description</strong>
                                                    </div>
                                                    <div class="toast-body">
                                                         <div class="niceeditors">
                                                        <CKEditor
                                                        config={{
                                                            extraPlugins: "justify,font,colorbutton",
                                                         }}
                                                        data={this.state.JobDescription}
                                                        onChange={this.onChangeDescription.bind(this)}    
                                                          />
                                                       
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
                                                                  onClick={this.SaveJobDescription.bind(this)}
                                                                  >Next </button>
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
                                                    <div class="toast-header">
                                                        <strong class="mr-auto">Show On Website</strong>
                                                    </div>
                                                    <div class="toast-body">
                                                    <div class="row">
                                                       <div class="col-md-6">
                                                       <div class="form-group mb-3">
                                                       <label for="validationCustom01">Show On Website<span className="mandatory">*</span></label><br/>
                                                   <label class="radio-inline">
                                                       <input type="radio" name="optradio"
                                                      checked={this.state.Status == 'Yes' ? true : false}
                                                       onChange={()=>{
                                                           this.setState({
                                                               Status : 'Yes'
                                                           })
                                                       }}/> Yes
                                                    </label>
                                                   <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                       <input type="radio" name="optradio" 
                                                       checked={this.state.Status == 'No' ? true : false}
                                                       onChange={()=>{
                                                           this.setState({
                                                               Status : 'No'
                                                           })
                                                       }}/> No
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
                                                                onClick={this.SaveCareer.bind(this)}
                                                                  >Update </button>
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
        careercredential: state.Career
    }
}

export default connect(mapStateToProps, {
    setjobtitle,
    setcareercountry,
    setcareerstate,
    setcareercity,
    setemploymenttype,
    setcareertime,
    setclearcareer
})( ViewCareer);