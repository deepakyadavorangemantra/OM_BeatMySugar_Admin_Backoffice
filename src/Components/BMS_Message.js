import React from 'react';

import Notiflix from "notiflix";
import PostApiCall from '../Api'
import moment from 'moment';
import GetApiCall from '../GetApi'



class SMS extends React.Component {

    constructor(props){
        super(props)
        this.state={
           
            Message:'',
            Mobile:'',

            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            SMSData:[]

        }
    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });


          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetSmsLog").then(resultdes =>
              resultdes.json().then(obj => {
             
           
                this.setState({
                  SMSData : obj.data
                })

                // console.log(obj.data.fld_updatedon==moment(obj.data.fld_updatedon).isSame('ll')?obj.data.length:0)
                Notiflix.Loading.Remove();
              }))

       
        
      
         
          
    }

    onChangeMobile(mobile){
        this.setState({
            Mobile:mobile.target.value
        })
    }
    onChangeMessage(sms){
        this.setState({
            Message:sms.target.value
        })
    }
  
    
    Send(){
        if(this.state.Mobile!=''){
            var mb= this.state.Mobile.replace(/ /g,'').split(',')
            var vl = mb.filter(val => this.state.NumRegex.test(val) && val.length == 10)

            if(vl.length == mb.length)
            {
                if(this.state.Message!=''){
                    if(this.state.Message.length<=160){

                        var login=localStorage.getItem('LoginDetail');
                        var details=JSON.parse(login)

                        var cn = 0

                        Notiflix.Loading.Dots('');

                        for(var i =0; i< vl.length;i++)
                        {

                        PostApiCall.postRequest({
              
                            mobile : vl[i],
                            message : this.state.Message,
                            updatedby :  details[0].fld_staffid,
                            updatedon : moment().format('ll')
            
                          },"AddSmsLog").then((results) => 
                          
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(objstate => {
                      
                          
                            if(results.status == 200 || results.status==201){


                                fetch(
                                    "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
                                    vl[i] +
                                      "&msg=" + this.state.Message
                                  ).then((response) => response.json());


                                cn++
                                
                                if(cn == vl.length){

                                    Notiflix.Loading.Remove()
                                    Notiflix.Notify.Success('SMS successfully sent.')
                                    window.location.reload()
                                    
                                }

                            }
                        }))
                    }
                         
                    }
                    else{
                        Notiflix.Notify.Failure('SMS length should be less than 160 character.')
                    }
    
                
            }else
            {
                Notiflix.Notify.Failure('Please enter SMS for BMS.')
            }
        }
            else{
                Notiflix.Notify.Failure('Please enter valid mobile numbers, all numbers must be comma separated.')  
           
            }

        }
        else{
            Notiflix.Notify.Failure('Please enter mobile number.')
        }
    }

  
    render(){

        return(

            

            <div class="content-page">
                <div class="content">
                   
                <div class="container-fluid">
                        <div class="row page-title">
                            <div class="col-md-12">
                                <nav aria-label="breadcrumb" class="float-right mt-1">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">BMS SMS</a></li>
                                       
                                    </ol>
                                </nav>
                                <h4 class="mb-1 mt-0">BMS SMS</h4>
                            </div>
                        </div>

                        <div class="row">
                         

                            <div class="col-lg-12">
                               
                           <div className="row">
                             <div className="col-md-6">
                             <div className="card" >
                             <div className="card-body">
        <h4>Total SMS Send Today : <span>{this.state.SMSData.filter(val => moment(val.fld_updatedon).isSame(moment().format('ll'))).length}</span></h4>
                                 </div>
                                 </div>
                             </div>
                             <div className="col-md-6">
                             <div className="card" >
                             <div className="card-body">
                             <h4>Total SMS Send So Far : <span>{this.state.SMSData.length}</span></h4>
                                 </div>
                                 </div>
                             </div>
                           </div>

                                <div class="card">
                                    <div class="card-body">
                                       <div class="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">
                                                    <div class="toast-header">
                                                        <strong class="mr-auto">SMS</strong>
                                                      </div>
                                                    <div class="toast-body">
                                                        
                                        <form class="needs-validation" novalidate onSubmit={(e)=>{
                                            e.preventDefault()
                                        }}>
                                            <div class="row">
                                                <div class="col-md-12">
                                                     <div class="form-group mb-3">
                                                <label for="validationCustom01">Mobile No.<span className="mandatory">*</span></label>
                                                <input type="text" className="form-control" 
                                                value={this.state.Mobile}
                                              onChange={this.onChangeMobile.bind(this)}/>
                                            </div>
                                                </div>
                                                

                                                <div class="col-md-12">
                                                     <div class="form-group mb-3">
                                                <label for="validationCustom01">Message (160 characters)<span className="mandatory">*</span></label>
                                              <textarea className="form-control" rows="5" 
                                              value={this.state.Message}
                                              onChange={this.onChangeMessage.bind(this)} style={{resize:'none'}}>
                                              
                                              </textarea>
                                              
                                            </div>
                                                </div>

                                                
                                            </div>
                                            <div>
                                                    <button class="btn btn-primary" style={{float: 'right',marginBottom:'2%'}} 
                                                      onClick={this.Send.bind(this)}
                                                    > Send</button>
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
        );
    }
}


export default SMS;