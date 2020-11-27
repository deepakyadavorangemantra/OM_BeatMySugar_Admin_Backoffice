import React from 'react';
import moment from 'moment';
import { User,Lock,Eye } from 'react-feather';
import {connect} from 'react-redux';
import{setusername,setpassword} from './Actions/ActionType';
import Notiflix from "notiflix";
import PostApiCall from '../Api'

class Login extends React.Component {

    constructor(props){
        super(props)
        this.state={
            isPasswordVisible : false,
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|httpss:\/\/www\.|https:\/\/|httpss:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

        }
    }
 
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
        if(details!=null){
            this.props.history.push('./dashboard')
        }  
          
    }

    onChangeuser(username){
 
         
        this.props.setusername(username.target.value);
    
        
    }
    onChangepassword(password){
        this.props.setpassword(password.target.value);
    }

    onClickLogin(){
        if(this.props.loginCredentials.Username!=''){
            if(this.state.EmailRegex.test(this.props.loginCredentials.Username)){
            if(this.props.loginCredentials.Password!=''){
                Notiflix.Loading.Dots('');

                PostApiCall.postRequest({
  
                    email : this.props.loginCredentials.Username,
                    password : this.props.loginCredentials.Password,
                    action :'Login',
                     actiondate :moment().format('lll')
                  },"AuthenticateStaff").then((results) => 
                  
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(obj => {
              
                  
                    if(results.status == 200 || results.status==201){
                        localStorage.setItem('OldPassword',JSON.stringify(this.props.loginCredentials.Password))
                        localStorage.setItem('LoginDetail',JSON.stringify(obj.data))
                      
                         Notiflix.Loading.Remove()
                        window.location.href='/dashboard'
                    }
                    else{
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Failure(obj.data)
                    }
                }
                    )
                  )
                  
            }
            else{
                Notiflix.Notify.Failure('Please enter password.');
            }
        }
        else{
            Notiflix.Notify.Failure('Please enter valid email address.');
        }
        }
       
      

    }


    ForgotPasswordClicked(){
console.log('clicked')
        if(this.props.loginCredentials.Username!=''){
            if(this.state.EmailRegex.test(this.props.loginCredentials.Username)){
                Notiflix.Loading.Dots('');

                PostApiCall.postRequest({
  
                    email : this.props.loginCredentials.Username,
                    updatedby :1,
                    updatedon :moment().format('lll')
                  },"ForgotPasswordStaff").then((results) => 
                  
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(obj => {
              
                  
                    if(results.status == 200 || results.status==201){
                        
                      
                         Notiflix.Loading.Remove()
                        Notiflix.Report.Info('Password Sent','Your new password has been sent to your email address, Kindly login via new password.','Ok')
                    }
                    else{
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Failure(obj.data)
                    }
                }
                    )
                  )
                  
        
        }
        else{
            Notiflix.Notify.Failure('Please enter valid email address.');
        }
        }else
        {
            Notiflix.Notify.Failure('Please enter your email address.');
        }

    }
    render(){
        return(
            <div className="App">
                       
        <div class="account-pages my-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-8">
                    <div class="card logincard">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-md-7 p-5">
                                    <div class="mx-auto mb-5">
                                        <a href="">
                                            <img src="bmslogo.png" alt="BMSlogo" style={{width: '19%'}} />
                                            
                                        </a>
                                    </div>

                                    <h6 class="h5 mb-0 mt-4">Welcome!</h6>
                                    <p class="text-muted mt-1 mb-4">Enter your Email Address & Password to
                                    Sign In</p>

                                   <form class="authentication-form" onSubmit={(e)=>{
                                    e.preventDefault()
                                }}>
                                        <div class="form-group">
                                            <label class="form-control-label">Email Address </label>
                                            <div class="input-group input-group-merge">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                                                                                  
                                                    <User className="icon-dual"/>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control"
                                                value={this.props.loginCredentials.Username}
                                                onChange={this.onChangeuser.bind(this)}/>
                                            </div>
                                        </div>

                                        <div class="form-group mt-4">
                                            <label class="form-control-label">Password</label>

                                            <a 
                                            style={{cursor : 'pointer'}}
                                            onClick={this.ForgotPasswordClicked.bind(this)}

                                            class="float-right text-muted text-unline-dashed ml-1">Forgot your password?</a>
                                            <div class="input-group input-group-merge">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                    <Lock className="icon-dual"/>
                                                    </span>
                                                    
                                                </div>
                                               
                                                <input type={this.state.isPasswordVisible ? 'text' : "password"} class="form-control" id="password"
                                                    value={this.props.loginCredentials.Password}
                                                    onChange={this.onChangepassword.bind(this)}/> 

                                                        <span class="input-group-text-password login-icon">
                                                           
                                                           <i 
                                                           style={{color : this.state.isPasswordVisible ? '#507dc0' : ''}} 
                                                          dangerouslySetInnerHTML={{__html:window.feather.icons.eye.toSvg()}} 
                                                           onClick={()=>{
                                                               this.setState({
                                                                   isPasswordVisible : !this.state.isPasswordVisible
                                                               })
                                                           }}

                                                          
                                                           /> 
                                                      </span>
                                                 
                                            </div>
                                        
                                        </div>


                                        <div class="form-group mb-0 text-center loginbtn">
                                           <button class="btn btn-primary btn-block" onClick={this.onClickLogin.bind(this)}> Log In
                                            </button>
                                        </div>
                                    </form>
                                   
                                </div>
                                <div class="col-lg-5 d-none d-md-inline-block">
                                    <div class="auth-page-sidebar">
                                      
                                    </div>
                                </div>
                            </div>
                            
                        </div> 
                    </div>

                     <div class="cardes">
                                
                                <img src="assets/images/praveen.png" class="classed" />
                                
                                </div>
                    
                    
                   
                </div> 
            </div>

            
            
        </div>
        
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                           <p style={{textAlign: 'center'}}> Copyright &copy; {moment().format('YYYY')} 
                            <a href="https://rxhealthmanagement.in/" target="_blank"><b> Rx Health Management India Pvt Ltd.</b></a>. All Right Reserved. 
                            <br/><a href="https://www.beatmysugar.com/" target="_blank">www.beatmysugar.com</a>
                        </p>
                           </div>
                    </div>
                </div>
       
        
    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        loginCredentials : state.LoginReducers
    }
}
 
export default connect(mapStateToProps, {setusername,setpassword})(Login);