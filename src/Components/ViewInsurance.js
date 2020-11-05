import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';

import {setinsuredaddress,
    setinsuredname,
    setinsureddob,
    setinsuredemail,
    setinsuredmobile,
    setinsuredtype,
    setinsuredsum,
    setinsureddisease,
    setinsuredpolicy,
    setinsureddisclosure,
    setinsuredheight,
    setinsuredweight,
    setclearinsurance
} from './Actions/ActionType';


class ViewInsurance extends Component {
   constructor(props){
    super(props)
    this.state={
        PageTitle : '1',
        Page1 : 'Pending',
        NumRegex : /^0|[0-9]\d*$/,
            MobileRegex : /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            SpecialRegex : /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            Status:'Yes',
            Policy:'Yes',
            PolicyData: [
                { value: "Health.", label: "Health." },
                { value: "Life", label: "Life" },
               
               
              ],
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
      this.props.setclearinsurance()
      Notiflix.Loading.Dots('');

      var det = localStorage.getItem('InsuranceDetails')
      var InsuranceData = JSON.parse(det)
       
      this.setState({
         Status:InsuranceData.fld_currentdisease,
        Policy:InsuranceData.fld_insurancepolicy

         })

       console.log(InsuranceData )
      
    this.props.setinsuredaddress(InsuranceData.fld_address)
      this.props.setinsuredname(InsuranceData.fld_name)
      this.props.setinsureddob(InsuranceData.fld_dob)
      this.props.setinsuredemail(InsuranceData.fld_email)
      this.props.setinsuredmobile(InsuranceData.fld_mobile)
      this.props.setinsuredtype(InsuranceData.fld_type)
      this.props.setinsuredsum(InsuranceData.fld_sumassured)
      this.props.setinsureddisease(InsuranceData.fld_currentdiseasedescription)
      this.props.setinsuredpolicy(InsuranceData.fld_insurancepolicydescription)
     this.props.setinsureddisclosure(InsuranceData.fld_selfdisclousre)
     this.props.setinsuredheight(InsuranceData.fld_height)
     this.props.setinsuredweight(InsuranceData.fld_weight)


   }
  

onChangeName(name){
    this.props.setinsuredname(name.target.value)
}
onChangeDOB(dob){
    this.props.setinsureddob(dob.target.value)
}
onChangeAddress(address){
    this.props.setinsuredaddress(address.target.value)
}
onChangeEmail(email){
    this.props.setinsuredemail(email.target.value)
}
onChangeMobile(mobile){
    if((this.state.NumRegex.test(mobile.target.value)) && (mobile.target.value.length <= 10)){

    this.props.setinsuredmobile(mobile.target.value)
}
}
onChangeType(type){
    this.props.setinsuredtype(type.target.value)
}
onChangeSum(sum){
    this.props.setinsuredsum(sum.target.value)
}
onChangeDisease(disease){
    this.props.setinsureddisease(disease.target.value)
}
onChangePolicy(policy){
    this.props.setinsuredpolicy(policy.target.value)
}
onChangeDisclosure(disclosure){
    this.props.setinsureddisclosure(disclosure.target.value)
}

onChangeHeight(height){
    this.props.setinsuredheight(height.target.value)
}
onChangeWeight(weight){
    this.props.setinsuredweight(weight.target.value)
}

SaveInsurance(){
    
  if(this.props.InsuranceCredentials.InsuredName!=''){
      if(this.props.InsuranceCredentials.DOB!=''){
        if(this.props.InsuranceCredentials.Email!=''){
            if(this.state.EmailRegex.test(this.props.InsuranceCredentials.Email)){
                if(this.props.InsuranceCredentials.Mobile!=''){
                    if(this.props.InsuranceCredentials.Mobile.length==10){
                        if(this.props.InsuranceCredentials.TypeOfInsurance!=''){
                            if(this.props.InsuranceCredentials.SumAssured!=''){
                                 
                                 
                                Notiflix.Loading.Dots('');
                                                                  

                               
                            }
                            else{
                                Notiflix.Notify.Failure('Please enter sum assured.') 
                     
                            }

                        }
                        else{
                            Notiflix.Notify.Failure('Please select type of insurance.') 
                       
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
            Notiflix.Notify.Failure('Please enter email .') 
          }
      }
      else{
        Notiflix.Notify.Failure('Please select Data Of Birth.') 
      }
  }
  else{
    Notiflix.Notify.Failure('Please enter Name.') 
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
                                    <li class="breadcrumb-item"><a href="#">Insurance</a></li>
                                    <li class="breadcrumb-item"><a href="/">Insurance List</a></li>
                                   
                                   
                                    <li class="breadcrumb-item active" aria-current="page">Update Insurance</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Update Insurance</h4>
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
                                        }} class="wizardlist nav-link">Insurance</a></li>

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
                                                       <strong class="mr-auto">Insured Detail</strong>
                                                   </div>
                                                   <div class="toast-body">
                                                       <div class="row">
                                                           <div class="col-md-12">
                                                               <div class="row">
                                                               <div class="col-md-6">
                                                               <div class="form-group mb-2">
                                                                   <label for="validationCustom05">Name Of The Insured<span className="mandatory">*</span></label>
                                                                   <input type="text" class="form-control" id="validationCustom05"
                                                                   disabled={!this.state.IsVisible}
                                                                    value={this.props.InsuranceCredentials.InsuredName}
                                                                   onChange={this.onChangeName.bind(this)}
                                                                 />
                                                                   
                                                               </div>
                                                           </div> 
                                                           <div class="col-md-6">
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">Date Of Birth<span className="mandatory">*</span></label>
                                                               <input type="text" class="form-control" id="validationCustom05"
                                                               disabled={!this.state.IsVisible}
                                                               value={moment(this.props.InsuranceCredentials.DOB).format('DD/MM/YYYY')}
                                                             />
                                                               
                                                           </div>
                                                       </div> 
                                                       <div class="col-md-12">
                                                       <div class="form-group mb-2">
                                                       <label for="contact-message">Communication Address</label>
                                                       <textarea cols="30" rows="5" class="form-control" required=""
                                                       disabled={!this.state.IsVisible}
                                                       value={this.props.InsuranceCredentials.Address}
                                                 onChange={this.onChangeAddress.bind(this)}/>
                                                       </div>
                                                   </div> 
                                                   <div class="col-md-6">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Mobile<span className="mandatory">*</span></label>
                                                       <input type="text" class="form-control" id="validationCustom05"
                                                       disabled={!this.state.IsVisible}
                                                       value={this.props.InsuranceCredentials.Mobile}
                                                       onChange={this.onChangeEmail.bind(this)}
                                                     />
                                                       
                                                   </div>
                                               </div> 
                                                 
                                               <div class="col-md-6">
                                               <div class="form-group mb-2">
                                                   <label for="validationCustom05">Email Address<span className="mandatory">*</span></label>
                                                   <input type="text" class="form-control" id="validationCustom05"
                                                   disabled={!this.state.IsVisible}
                                                   value={this.props.InsuranceCredentials.Email}
                                                   onChange={this.onChangeMobile.bind(this)}
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
                                              
                                               <div class="toast-body">
                                                   <div class="row">
                                                       <div class="col-md-12">
                                                           <div class="row">
                                                           <div class="col-md-6">
                                                           <div class="form-group mb-2">
                                                               <label for="validationCustom05">Type Of Insurance Cover Required<span className="mandatory">*</span></label>
                                                               <select class="form-control custom-select" 
                                                               disabled={!this.state.IsVisible}
                                                                value={this.props.InsuranceCredentials.TypeOfInsurance}
                                                               onChange={this.onChangeType.bind(this)}>
                                                               {this.state.PolicyData.map(policy => (
                                                          
                                                                   <option key={policy.value} value={policy.value}>
                                                                     {policy.label}
                                                                </option>
                                                                ))}
                                                               </select>
                                                               
                                                           </div>
                                                       </div> 
                                                       <div class="col-md-6">
                                                       <div class="form-group mb-2">
                                                           <label for="validationCustom05">Sum Assured Required<span className="mandatory">*</span></label>
                                                          <input type="text" class="form-control"
                                                          disabled={!this.state.IsVisible}
                                                          value={this.props.InsuranceCredentials.SumAssured}
                                                          onChange={this.onChangeSum.bind(this)}/>
                                                           
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
                                                       <strong class="mr-auto">About Disease</strong>
                                                   </div>
                                                   <div class="toast-body">
                                                       <div class="row">
                                                           <div class="col-md-12">
                                                               <div class="row">
                                                               <div className="col-md-12">
                                                               <div class="form-group mb-2">
                                                               <label for="validationCustom05">Any Current Disease/Illness <span style={{color:'red'}}>*</span></label><br/>
                                                               <label class="radio-inline">
                                                               <input type="radio" name="optradio1"
                                                               disabled={!this.state.IsVisible}
                                                              checked={this.state.Status == 'Yes' ? true : false}
                                                               onChange={()=>{
                                                                   this.setState({
                                                                       Status : 'Yes'
                                                                   })
                                                               }}/> Yes
                                                            </label>
                                                           <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                               <input type="radio" name="optradio1" 
                                                               disabled={!this.state.IsVisible}
                                                               checked={this.state.Status == 'No' ? true : false}
                                                               onChange={()=>{
                                                                   this.setState({
                                                                       Status : 'No'
                                                                   })
                                                               }}/> No
                                                           </label> 
                                                        <textarea cols="30" rows="5" class="form-control" required="" style={{display:this.state.Status == 'No' ?'none':''}}
                                                        disabled={!this.state.IsVisible}
                                                          value={this.props.InsuranceCredentials.CurrentDisease}
                                                            onChange={this.onChangeDisease.bind(this)}
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
                                                   <strong class="mr-auto">About Other Policy</strong>
                                               </div>
                                               <div class="toast-body">
                                                   <div class="row">
                                                       <div class="col-md-12">
                                                           <div class="row">
                                                           <div className="col-md-12">
                                                           <div class="form-group mb-2">
                                                           <label for="validationCustom05">Any Other Insurance Policy <span style={{color:'red'}}>*</span></label><br/>
                                                           <label class="radio-inline">
                                                           <input type="radio" name="optradio"
                                                           disabled={!this.state.IsVisible}
                                                           checked={this.state.Policy == 'Yes' ? true : false}
                                                           onChange={()=>{
                                                               this.setState({
                                                                   Policy : 'Yes'
                                                               })
                                                           }}/> Yes
                                                        </label>
                                                       <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                           <input type="radio" name="optradio" 
                                                           disabled={!this.state.IsVisible}
                                                           checked={this.state.Policy == 'No' ? true : false}
                                                           onChange={()=>{
                                                               this.setState({
                                                                   Policy : 'No'
                                                               })
                                                           }}/> No
                                                       </label> <textarea cols="30" rows="5" class="form-control" required="" style={{display:this.state.Policy == 'No' ?'none':''}}
                                                       disabled={!this.state.IsVisible}
                                                       value={this.props.InsuranceCredentials.InsurancePolicy}
                                                               onChange={this.onChangePolicy.bind(this)}
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
                                                   <strong class="mr-auto">Self Disclosure</strong>
                                               </div>
                                               <div class="toast-body">
                                                   <div class="row">
                                                       <div class="col-md-12">
                                                           <div class="row">
                                                           <div className="col-md-12">
                                                           <div class="form-group mb-2">
                                                           <label for="validationCustom05">Any Self Disclosure </label><br/>
                                                         <textarea cols="30" rows="5" class="form-control" required=""
                                                         disabled={!this.state.IsVisible}
                                                          value={this.props.InsuranceCredentials.SelfDisclosure}
                                                            onChange={this.onChangeDisclosure.bind(this)}
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
                                          
                                           <div class="toast-body">
                                               <div class="row">
                                                   <div class="col-md-12">
                                                       <div class="row">
                                                       <div class="col-md-6">
                                                       <div class="form-group mb-2">
                                                           <label for="validationCustom05">Height Of Insured Member</label>
                                                           <input type="text" class="form-control"
                                                           disabled={!this.state.IsVisible}
                                                           value={this.props.InsuranceCredentials.Height}
                                                           onChange={this.onChangeHeight.bind(this)}
                                                           />
                                                           
                                                       </div>
                                                   </div> 
                                                   <div class="col-md-6">
                                                   <div class="form-group mb-2">
                                                       <label for="validationCustom05">Weight Of Insured Member</label>
                                                       <input type="text" class="form-control"
                                                       disabled={!this.state.IsVisible}
                                                       value={this.props.InsuranceCredentials.Weight}
                                                     onChange={this.onChangeWeight.bind(this)}
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

                                                   <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                       <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                       disabled={!this.state.IsVisible}
                                                       onClick={this.UpdateInsurance}
                                                   
                                                      >Update</button>
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
      InsuranceCredentials: state. ViewInsurance
    };
  }
  
  export default connect(
    mapStateToProps,
      {setinsuredaddress,
        setinsuredname,
        setinsureddob,
        setinsuredemail,
        setinsuredmobile,
        setinsuredtype,
        setinsuredsum,
        setinsureddisease,
        setinsuredpolicy,
        setinsureddisclosure,
        setinsuredheight,
        setinsuredweight,
        setclearinsurance
      
    }
  )(ViewInsurance);
