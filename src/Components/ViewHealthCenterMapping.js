import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
// import TimePicker from 'react-time-picker';
import Notiflix from 'notiflix';
import moment from 'moment'

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';

const format = 'h:mm a';


class ViewHealthCenterMapping extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            time: '10:00',

            Data : '',



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

            CenterData : [],
            CenterName :'',


            IsVisible : false,
            EditAccessGranted : false,
            ApproveAccessGranted : false
        
         
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

          Notiflix.Loading.Dots('');

        var det = localStorage.getItem('MapDetails')
        var DocData = JSON.parse(det)

        // console.log(DocData)
        this.setState({
            Data : DocData
        })


        var det1 = localStorage.getItem('TimingMapDetails')
        var DocData1 = JSON.parse(det1)

        this.setState({
            CenterName : DocData1.fld_healthcenterid
        })



        var day = []
                if(DocData1.Day != null){
                    for(var i = 0; i < DocData1.Day.split(',').length ; i++){
                        

                        day.push(DocData1.Day.split(',')[i])

                    }
                 

                    var artm = [...this.state.TimingInfo]
                    var artm1 = [...this.state.TimingData]
                   
                    for(var i = 0; i < this.state.TimingData.length ; i++){

                        for(var j = 0; j < day.length ; j++){

                

                            if(this.state.TimingData[i].day == day[j].split('#')[0]){

                                artm[i].day = day[j].split('#')[0]
                                artm[i].check = true
                                artm[i].open = moment(day[j].split('#')[1]).format()
                                artm[i].close = moment(day[j].split('#')[2]).format()
                                artm[i].open1 = day[j].split('#')[3] == '' ? undefined :  moment(day[j].split('#')[3]).format()
                                artm[i].close1 = day[j].split('#')[4] == '' ? undefined :  moment(day[j].split('#')[4]).format()

                                artm1[i].edit = true

                                this.setState({
                                    TimingInfo : artm
                                })
                                // console.log(artm)
                            }


                        }

                    }
                  
                }


        



        GetApiCall.getRequest("GetHealthCenterData").then(resultdes =>
            resultdes.json().then(obj => {
           
            // console.log(obj.data)
            
              this.setState({
                  CenterData : obj.data
              })

            //   Notiflix.Loading.Remove();
            }))



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
       
                        if(filteredRights[i].fld_menuname == 'Edit Health Center Mapping'){
            
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
  
    }
   
    onChange = time => this.setState({ time })
 


    handleTimings = () =>{   
        
        if(this.state.CenterName != ''){
        
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
                Notiflix.Notify.Failure('Please select opening & closing timings for health center for seleted days.')
            }else
            {
        //       this.setState({
        //           FinalTime : time,
        //     PageTitle : '5',
        //     Page4 : 'Done'
        // })
          
        this.setState({
            PageTitle : '2',
            Page2 : 'Done'
        })

     

        var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)

                    if(this.state.Data.fld_medicalregistrationid == null){

                        Notiflix.Loading.Dots('');

                        PostApiCall.postRequest({
                
                            dietitianid : this.state.Data.fld_id,
                            healthcenterid : this.state.CenterName,
                                  },"DeleteHealthCenterDietitianMapping").then((results1) => 
                         
                            // const objs = JSON.parse(result._bodyText)
                            results1.json().then(objs => {
                     
                         
                            if(results1.status == 200 || results1.status==201){
                        


                    

                        var count = 0
                        for(var i = 0;i<time.length;i++){

                            PostApiCall.postRequest({
                
                                dietitianid : this.state.Data.fld_id,
                                healthcenterid : this.state.CenterName,
                                day : time[i].day,
                                openingtime : moment(time[i].open).format(),
                                closingtime : moment(time[i].close).format(),
                                openingtime2 :time[i].open1 == undefined ? '' : moment(time[i].open1).format(),
                                closingtime2 : time[i].close1 == undefined ? '' : moment(time[i].close1).format(),
                                updatedby : details[0].fld_staffid,
                                updatedon : moment().format('lll'),
                                      },"AddHealthCenterDietitianMapping").then((results) => 
                             
                                // const objs = JSON.parse(result._bodyText)
                                results.json().then(objs => {
                         
                             
                                if(results.status == 200 || results.status==201){
                
                                    count = count + 1
                                    if(count == time.length){
                
                                       
                                        Notiflix.Loading.Remove()
                                        Notiflix.Notify.Success('Health Center successfully mapped.')
                                        window.location.href = '/healthcentermappinglist'
                
                                    }
                
                                }
                            }))
                        }
                        
                    }
                }))
                    }else
                    {

                       
                        // console.log(this.state.time)
                        Notiflix.Loading.Dots('');


                        PostApiCall.postRequest({
                
                            doctorid : this.state.Data.fld_id,
                            healthcenterid : this.state.CenterName,
                                  },"DeleteHealthCenterDoctorMapping").then((results1) => 
                         
                            // const objs = JSON.parse(result._bodyText)
                            results1.json().then(objs => {
                     
                         
                            if(results1.status == 200 || results1.status==201){

                        var count2 = 0
                        for(var i = 0;i<time.length;i++){
                        
                        

                            PostApiCall.postRequest({
                
                                doctorid : this.state.Data.fld_id,
                                healthcenterid : this.state.CenterName,
                                day : time[i].day,
                                openingtime : moment(time[i].open).format(),
                                closingtime : moment(time[i].close).format(),
                                openingtime2 : time[i].open1 == undefined ? '' : moment(time[i].open1).format(),
                                closingtime2 :time[i].close1 == undefined ? '' :   moment(time[i].close1).format(),
                                updatedby : details[0].fld_staffid,
                                updatedon : moment().format('lll'),
                                      },"AddHealthCenterDoctorMapping").then((results) => 
                             
                                // const objs = JSON.parse(result._bodyText)
                                results.json().then(objs => {
                         
                             
                                if(results.status == 200 || results.status==201){
                
                                    count2 = count2 + 1
                                    if(count2 == time.length){
                
                                       
                                        Notiflix.Loading.Remove()
                                        Notiflix.Notify.Success('Health Center successfully mapped.')
                                        window.location.href = '/healthcentermappinglist'
                
                                    }
                
                                }
                            }))
                
                        }
                    }
                }))
                    }

      

            }

        }
    
     else{Notiflix.Notify.Failure('Please select timings of doctor for health center.')}  
        
    }
    else{Notiflix.Notify.Failure('Please select health center name.')}  
      
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
                                                <li class="breadcrumb-item"><a href="#">Service & Listing</a></li>
                                                <li class="breadcrumb-item"><a href="/healthcentermapping">Health Center Mapping List</a></li>
                                                
                                                <li class="breadcrumb-item active" aria-current="page">View Health Center Mapping</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Health Center Mapping</h4>
                                    </div>
                                </div>


                                <div class="row" style={{display : this.state.EditAccessGranted ? '' : 'none'}}>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center col-lg-3" style={{float : 'right'}}>
                                       <div class="col text-right row " >

                                    

                                        <div style={{display : this.state.EditAccessGranted ? '' : 'none'}}>
                                        <button  
                                      onClick={()=>{
                                          this.setState({IsVisible : true})
                                      
                                      }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-edit mr-1"></i>Edit Mapping Details</button>
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
                                                        }} class="wizardlist nav-link">Doctor/Dietitian Information</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Health Center List</a></li>
                                                
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
                                                                        <strong class="mr-auto">Doctor Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                    <div class="col-md-6">
                                                                                    <div class="form-group mb-2">
                                                        <label for="validationCustom05">{this.state.Data.fld_medicalregistrationid == null ? 'Dietitian Name': 'Doctor Name' }<span className="mandatory">*</span></label>
                                                                                        <input 
                                                                                        disabled={true}
                                                                                        value={this.state.Data.fld_title+' '+this.state.Data.fld_name}
                                                                                        type="text" class="form-control" id="validationCustom05"
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
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={() => {

                                                                            this.setState({
                                                                                PageTitle: '2',
                                                                                Page1: 'Done'
                                                                            })
                                                                        }}>Next</button>
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
                                                                    <strong class="mr-auto">Health Center List</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Health Center Name<span className="mandatory">*</span></label>
                                                                                <select 
                                                                                value={this.state.CenterName}
                                                                                disabled={!this.state.IsVisible}
                                                                                onChange={(text)=>[
                                                                                    this.setState({
                                                                                        CenterName : text.target.value
                                                                                    })
                                                                                ]}
                                                                                class="form-control custom-select">
                                                                                <option></option>
                                                                                {this.state.CenterData.map(title => (
                           
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
                                                         disabled={!this.state.IsVisible}
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
                                                    
                                                    var arr = [...this.state.TimingInfo]

                                                    if(arr[index].open != null && value != null &&   value <= arr[index].open){
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

                                                    if(arr[index].open1 != null && value != null &&  value <= arr[index].open1){
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
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '1',
                                                                              Page2 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                          disabled={!this.state.IsVisible}
                                                                       onClick={this.handleTimings.bind(this)}>Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 2*/}
                                                    
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



export default ViewHealthCenterMapping;
