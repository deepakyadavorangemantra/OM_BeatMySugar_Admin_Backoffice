import React from 'react';

import Notiflix from "notiflix";
import PostApiCall from '../Api'
import moment from 'moment';
import GetApiCall from '../GetApi'

import Select from 'react-select';

class SMS extends React.Component {

    constructor(props){
        super(props)
        this.state={
           
            Message:'',
            Mobile:'',
            AllNum:[],
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            SMSData:[],
            CoutomerPhoneNumberData:[]

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

              Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetUserInfoData").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  console.log(obj.data)
                  let AllNum=[]
                  let CoutomerPhoneNumberData=[];
                  obj.data.map(phone=>{
                    AllNum.push({value:`${phone.fld_mobile}`,label:`${phone.fld_mobile}`})
                  })
                  
                  
                  obj.data.map(phone=>{
                    CoutomerPhoneNumberData.push({value:`${phone.fld_mobile}`,label:`${phone.fld_mobile}`})

                  })
                  CoutomerPhoneNumberData.unshift({value:AllNum,label:'All Numbers'})
                 
                    this.setState({
                        CoutomerPhoneNumberData: CoutomerPhoneNumberData,
                        AllNum:AllNum
                    })
      
      
                    Notiflix.Loading.Remove();
                  }))

       
        
      
         
          
    }

    onChangeMobile(mobile){
        console.log(mobile.target.value)


        let AllNum=''
        // console.log(mobile.target.value)
        // console.log(this.state.AllNum)
        this.state.CoutomerPhoneNumberData&&this.state.CoutomerPhoneNumberData.map(data=>{

        })
        for(let i=0;i<this.state.CoutomerPhoneNumberData.length;i++){
  AllNum+=`${this.state.CoutomerPhoneNumberData[i].fld_mobile},`
        }
        if(mobile.target.value==='All Numbers'){
            // console.log(AllNum)
         this.setState({Mobile:AllNum})
        }
        else if(mobile.target.value!=='Select Number'){
             this.setState({
            Mobile:mobile.target.value
        })
        }
        else{
            this.setState({
                Mobile:''
            })  
        }
       
    }
    onChangeMessage(sms){
        this.setState({
            Message:sms.target.value
        })
    }
  
    
    Send(){

        var c = 0 

        if(this.state.Mobile!=''){
            var mb= this.state.Mobile
            var vl = mb.filter(val => this.state.NumRegex.test(val.value) && val.value.length == 10)

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
              
                            mobile : vl[i].value,
                            message : this.state.Message,
                            updatedby :  details[0].fld_staffid,
                            updatedon : moment().format('ll')
            
                          },"AddSmsLog").then((results) => 
                          
                            // const objs = JSON.parse(result._bodyText)
                            results.json().then(objstate => {
                      
                          
                            if(results.status == 200 || results.status==201){


                         


                                cn++
                                
                                if(cn == vl.length){


                                    for(var i =0; i< vl.length;i++)
                                    {

                                        fetch(
                                            "https://www.instaalerts.zone/SendSMS/sendmsg.php?uname=globaltrendz&pass=abc321&send=BMSIND&dest=" +
                                            vl[i].value +
                                              "&msg=" + this.state.Message
                                          ).then((response) => console.log(response.json()));

                                          c++

                                          if(c== vl.length){
                                            Notiflix.Loading.Remove()
                                            Notiflix.Notify.Success('SMS successfully sent.')
                                            // window.location.reload()
                                          }
                                    }
                               
                                    
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
                                            {/* {console.log(this.state.CoutomerPhoneNumberData,"HHIIII")} */}
                                            <div class="row">
                                                <div class="col-md-12">
                                                     <div class="form-group mb-3">
                                                <label for="validationCustom01">Mobile No.<span className="mandatory">*</span></label>

                                                <Select isMulti
                                options={this.state.CoutomerPhoneNumberData&&this.state.CoutomerPhoneNumberData.length>0?this.state.CoutomerPhoneNumberData:0}
                                          value={this.state.Mobile}
                                               onChange={(ps)=>{
                                                   console.log(ps);
                                                   if(ps.find(data=>data.label=='All Numbers')&&ps.length>0){
                                                        console.log(ps.find(data=>data.label=='All Numbers'))
                                                       return this.setState({Mobile:ps.find(data=>data.label=='All Numbers').value})
                                                   }
                                                   else{
                                                       this.setState({Mobile : ps}) 
                                                   }
                                             
                                           }}
                                         
                                         isMulti
                               />
                                               {/* <select   onChange={this.onChangeMobile.bind(this)} className='form-control'>
                                           <option key='Select Number' value='Select Number'>Select Number</option>
                                          <option key='All Numbers' value='All Numbers'>All Numbers</option>
                                               {this.state.CoutomerPhoneNumberData&&this.state.CoutomerPhoneNumberData.length>0?this.state.CoutomerPhoneNumberData.map(phone=>(
                                                   <option key={phone.fld_mobile} value={phone.fld_mobile}>{phone.fld_mobile}</option>
                                               )):null}
                                               </select> */}
                                               
                                                {/* <input type="text" className="form-control pt-1" 
                                                value={this.state.Mobile}
                                             disabled={true}/> */}
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
                                            <button class="btn btn-primary" style={{float: 'right',marginBottom:'2%',marginLeft:'3px'}} 
                                                      onClick={this.Send.bind(this)}
                                                    > Send</button>
                                                    <button class="btn btn-primary 0" style={{float:'right',marginBottom:'2%'}} 
                                                      onClick={()=>{
                                                          this.setState({...this.state,
                                                        Message:'',
                                                    Mobile:[]})
                                                      }}
                                                    > Clear All</button>
                                                    
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