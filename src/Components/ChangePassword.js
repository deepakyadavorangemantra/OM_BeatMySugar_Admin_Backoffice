import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {connect} from 'react-redux';
import {setchangeoldpassword,setchangenewpassword,setchangeconfirmpassword} from './Actions/ActionType';
import { ThumbsDown } from 'react-feather';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import moment from 'moment';



class ChangePassword extends React.Component {

    constructor(props){
        super(props)
        this.state={
           
            OldPassword:'',
            LoginDetail:[],

            isOldPasswordVisible : false,
            isNewPasswordVisible : false,
            isConPasswordVisible : false

        }
    }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          var Oldpassword=localStorage.getItem('OldPassword');
          var passdetails=JSON.parse(Oldpassword) 

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
        // console.log(passdetails)
        if(details!=null){
            this.setState({
                OldPassword:passdetails,
                LoginDetail:details[0]
            })

                 
            
        }
      
         
          
    }
    
    changeoldpassword(changeold){
        this.props.setchangeoldpassword(changeold.target.value)
    }
    changenewpassword(changenew){
        this.props.setchangenewpassword(changenew.target.value)
    }
    changeconfirmpassword(changeconfirm){
        this.props.setchangeconfirmpassword(changeconfirm.target.value)
    }
    

    onClickchangepassword(){

     

          if(this.props.changepasswordCredentials.ChangeoldPassword!=''){
              if(this.props.changepasswordCredentials.ChangeoldPassword==this.state.OldPassword){
            if(this.props.changepasswordCredentials.ChangenewPassword!=''){
                      
               if(this.props.changepasswordCredentials.ChangeconfirmPassword!=''){
                   if(this.props.changepasswordCredentials.ChangenewPassword==this.props.changepasswordCredentials.ChangeconfirmPassword){
                     
                    Notiflix.Loading.Dots('');

                    PostApiCall.postRequest({
  
                         staffid : this.state.LoginDetail.fld_staffid,
                         password : this.props.changepasswordCredentials.ChangeconfirmPassword,
                         salt :this.state.LoginDetail.fld_salt,
                         updatedon : moment().format('lll'),
                         updatedby : this.state.LoginDetail.fld_staffid
                  
                      },"ChangePassword").then((results) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        results.json().then(obj => {
                  
                      
                        if(results.status == 200 || results.status==201){
                            Notiflix.Loading.Remove()
                            Notiflix.Notify.Success('Password Successfully updated')
                            localStorage.removeItem('LoginDetail')
                                window.location.href='/'
                         
                        } 
                        else{
                            Notiflix.Loading.Remove()
                            Notiflix.Notify.Failure('something went wrong, try again later')
                        }
                    }
                        )
                      )
                   }

                   else{
                    Notiflix.Notify.Failure('New Password and Confirm Password do not match ')
                   }

               }
               else{
                   Notiflix.Notify.Failure('Confirm Password Cannot be empty ')
               }
            }
            
            else{
                Notiflix.Notify.Failure('New Password Cannot be empty'); 
            }
          }
        
        else{
            Notiflix.Notify.Failure('Incorrect Old Password'); 
        }
    }
          else{
            Notiflix.Notify.Failure('old Password Cannot be empty');
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
                                        <li class="breadcrumb-item"><a href="#">Change Password</a></li>
                                       
                                    </ol>
                                </nav>
                                <h4 class="mb-1 mt-0">Change Password</h4>
                            </div>
                        </div>

                        <div class="row">
                         

                            <div class="col-lg-12">


                                <div class="card">
                                    <div class="card-body">
                                       <div class="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">
                                                    <div class="toast-header">
                                                        <strong class="mr-auto">Reset Password</strong>
                                                      </div>
                                                    <div class="toast-body">
                                                        
                                        <form class="needs-validation" novalidate onSubmit={(e)=>{
                                            e.preventDefault()
                                        }}>
                                            <div class="row">
                                                <div class="col-md-6">
                                                     <div class="form-group mb-3">
                                                <label for="validationCustom01">Old Password<span className="mandatory">*</span></label>
                                                <input type={this.state.isOldPasswordVisible ? 'text' : "password"} class="form-control" 
                                                   value={this.props.changepasswordCredentials.ChangeoldPassword}
                                                   onChange={this.changeoldpassword.bind(this)}
                                                 
                                                />

                                                    <span class="login-icon-change-pass">
                                                            {/* <i class="icon-dual" data-feather="lock"></i>*/}
                                                             <i style={{color : this.state.isOldPasswordVisible ? '#060a4a' : ''}} dangerouslySetInnerHTML={{__html:window.feather.icons.eye.toSvg()}} 
                                                             onClick={()=>{
                                                                 this.setState({
                                                                     isOldPasswordVisible : !this.state.isOldPasswordVisible
                                                                 })
                                                             }}

                                                            
                                                             /> 
                                                        </span>
                                            </div>
                                                </div>
                                                 <div class="col-md-6">
                                                     <div class="form-group mb-3">
                                                <label for="validationCustom01">New Password<span className="mandatory">*</span></label>
                                                <input type={this.state.isNewPasswordVisible ? 'text' : "password"} class="form-control"
                                                 value={this.props.changepasswordCredentials.ChangenewPassword}
                                                 onChange={this.changenewpassword.bind(this)} 
                                               
                                                />

                                            <span class="login-icon-change-pass">                       
                                                            {/* <i class="icon-dual" data-feather="lock"></i>*/}
                                                             <i style={{color : this.state.isNewPasswordVisible ? '#060a4a' : ''}} dangerouslySetInnerHTML={{__html:window.feather.icons.eye.toSvg()}} 
                                                             onClick={()=>{
                                                                 this.setState({
                                                                     isNewPasswordVisible : !this.state.isNewPasswordVisible
                                                                 })
                                                             }}

                                                            
                                                             /> 
                                                        </span>
                                            </div>
                                                </div>

                                                <div class="col-md-6">
                                                     <div class="form-group mb-3">
                                                <label for="validationCustom01">Confirm New Password<span className="mandatory">*</span></label>
                                                <input type={this.state.isConPasswordVisible ? 'text' : "password"} class="form-control" 
                                                   value={this.props.changepasswordCredentials.ChangeconfirmPassword}
                                                   onChange={this.changeconfirmpassword.bind(this)}
                                              
                                                />
                                                     <span class="login-icon-change-pass">
                                                            {/* <i class="icon-dual" data-feather="lock"></i>*/}
                                                             <i style={{color : this.state.isConPasswordVisible ? '#507dc0' : ''}} dangerouslySetInnerHTML={{__html:window.feather.icons.eye.toSvg()}} 
                                                             onClick={()=>{
                                                                 this.setState({
                                                                     isConPasswordVisible : !this.state.isConPasswordVisible
                                                                 })
                                                             }}

                                                            
                                                             /> 
                                                        </span>
                                              
                                            </div>
                                                </div>

                                                
                                            </div>
                                            <div>
                                                    <button class="btn btn-primary" style={{float: 'right',marginBottom:'2%'}} 
                                                       onClick={this.onClickchangepassword.bind(this)}
                                                    > Submit</button>
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
function mapStateToProps(state){
    return{
        changepasswordCredentials : state.ChangePasswordReducer
    }
}

export default connect(mapStateToProps, {setchangeoldpassword,setchangenewpassword,setchangeconfirmpassword})(ChangePassword);