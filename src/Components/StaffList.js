import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import moment from 'moment';
import PostApiCall from '../Api';
import Modal from 'react-responsive-modal';

class StaffList extends Component {
    constructor(props){
        super(props)
        this.state={
           StaffData:[],

           AddAccess : false,
           open:false,

           isNewPasswordVisible : false,
           isConPasswordVisible : false,


           NewPassword : '',
           ConfirmPassword : '',

           EmpDetails : []
           
        }

    }
    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetStaff").then(resultdes =>
              resultdes.json().then(obj => {
             
              // console.log(obj.data)
              
                this.setState({
                  StaffData : obj.data
                })
  
  
                // Notiflix.Loading.Remove();
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
   
                    if(filteredRights[i].fld_menuname == 'Add Staff'){
        
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
        

    UpdatePasswordClicked(){
        if(this.state.NewPassword != ''){
            if(this.state.ConfirmPassword != ''){
                if(this.state.ConfirmPassword == this.state.NewPassword){

                    Notiflix.Loading.Dots('');

                    PostApiCall.postRequest({
  
                        email : this.state.EmpDetails.fld_email,
                        updatedon : moment().format('lll'),
                        updatedby : 0,
                        password : this.state.NewPassword
                    
                      },"ChangePasswordByAdmin").then((resultssub) => 
                      
                        // const objs = JSON.parse(result._bodyText)
                        resultssub.json().then(objsub => {  
                        if(resultssub.status == 200 || resultssub.status==201){

                            Notiflix.Loading.Remove();

                            window.location.reload()

                        }
                    }))

                }    else{
                    Notiflix.Notify.Failure('New password & confirm password donot match.')
                }
            }    else{
                Notiflix.Notify.Failure('Please re-type new password.')
            }
        } else{
                Notiflix.Notify.Failure('Please enter new password.'); 
            }
    }
     
    render(){
        return(
           <div>
          

          <Modal class="modal-content"  
    open={this.state.open}
    
    onClose={()=>{
      this.setState({open : false})
    }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Reset Password</h4>
      </div>
      <div class="modal-body">

<div class="row" style={{margin : '0px'}}>
<div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Employee Id<span class="mandatory">*</span></label>
                <input  class="form-control"
                disabled
                 value = {this.state.EmpDetails.fld_empid}
             
                ></input>
      
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Name<span class="mandatory">*</span></label>
                <input  class="form-control"
                disabled
                 value = {this.state.EmpDetails.fld_name}
             
                ></input>
      
            </div>
        </div>
</div>
   
     
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">New Password<span class="mandatory">*</span></label>
                <input type={this.state.isNewPasswordVisible ? 'text' : "password"} class="form-control"
                 value = {this.state.NewPassword}
                onChange = {(text)=>{
                    this.setState({
                        NewPassword : text.target.value
                    })
                }}
                ></input>
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
     
        <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Confirm Password<span class="mandatory">*</span></label>
                <input type={this.state.isConPasswordVisible ? 'text' : "password"} class="form-control"
                 value = {this.state.ConfirmPassword}
                 onChange = {(text)=>{
                    this.setState({
                       ConfirmPassword: text.target.value
                    })
                }}
                ></input>
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
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false
        })
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick = {this.UpdatePasswordClicked.bind(this)}
     >Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>

                     
            <div class="content-page">
            
            <div class="content">
         
                <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Staff Managemnet</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Staff List</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Staff List</h4>
                        </div>
                    </div> 

                    
                <div class="row" style={{display : this.state.AddAccess ? '' : 'none'}}>
                <div class="col-12">
                     <div class="card">
                         <div class="card-body">
                             <div class="row align-items-center">
                                                                    <div class="col text-right">
                                    <a href='/addstaff'>
                                    <button 
                                    
                                    class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                            class="uil-plus mr-1"></i>Add New Staff</button>
                               
                                    </a>
                                                                    </div>
                             </div>
                         </div>
                     </div> 
                  </div>
             
             </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                      
                                <div class="table-responsive">
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                    <th>Employee Id</th>
                                       <th>Photo</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        {/* <th>User Type</th> */}
                                        
                                        <th>Status</th>
                                        <th>Assign Rights</th>
                                        <th>Reset Password</th>
                                        <th>Action</th>
                                     
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.StaffData.map((data,index)=>(
                                           
                                           
                                       
                                    <tr key={index}>
                                                 { index == 0 ?
                                          <Helmet>
                                      
                                <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                <script src="/assets/js/pages/datatables.init.js"></script>
                                <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                           
                                </Helmet> : ''}
                                     <td>{data.fld_empid}</td>
                                    <td><img style={{width:'100px',height: '100px'}} src={data.fld_photo} /></td>
                                    <td>{data.fld_name}</td>
                                    <td>{data.fld_email}</td>
                                    <td>{data.fld_mobile}</td>
                                    {/* <td>{data.fld_usertype}</td> */}
                                    <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                  

                                      <td>
                                     
                                    <button  style={{display : this.state.AddAccess ? '' : 'none'}}
                                     onClick={()=>{
                                        localStorage.setItem('AssignUserRightsData',JSON.stringify(data))
                                        this.props.history.push('/assignstaffrights')
                                    }}
                                    class="btn btn-primary" id="btn-new-event" data-toggle="modal">Assign Rights</button>
                               
                                   
                                          </td>        


                                          <td>
                                     
                                     <button  style={{display : this.state.AddAccess ? '' : 'none'}}
                                      onClick={()=>{
                                        this.setState({
                                            EmpDetails : data,
                                            open : true
                                        })
                                     }}
                                     class="btn btn-primary" id="btn-new-event" data-toggle="modal">Reset Password</button>
                                
                                    
                                           </td> 


                                    <td> <div class="align-self-center tableact" style={{    textAlign: 'center'}}
                                    onClick={()=>{
                                       
                                        localStorage.setItem('StaffDetails',JSON.stringify(data))
                                        window.location.href = '/viewstaff'
                                    }}
                                    >
                                <span  >
                                <Edit3/>
                                    </span>
                                    {/* &nbsp;&nbsp;<Trash2/> */}
                                    </div> &nbsp;&nbsp;
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


                 </div>
            </div>
         </div>  

           </div>
        )
    }
}
export default StaffList;