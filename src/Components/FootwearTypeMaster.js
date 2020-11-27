import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import{
    setfootweartype,
    setclearfoottype
}
from './Actions/ActionType';

class FootwearTypeMaster extends Component {
  constructor(props){
    super(props)
    this.state = {
       open:false,
       FootwareTData : [],
       Status : 'Active',
       Id : '',
       openedit : false,
     };
   }


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
            this.props.setclearfoottype()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetFootwareTypeList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                FootwareTData : obj.data
              })
            //   console.log(obj.data)
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            type : this.props.foottypecredentails.FootwearType,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddFootwearTypeMaster").then((resultFootTC) =>
        resultFootTC.json().then(objFootTC => {
            if(resultFootTC.status == 200 || resultFootTC.status == 201){
                  this.props.setclearfoottype()
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Success('Footwear type successfully added.')
                  window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Footwear Type already present.')
            }
        })
        )
    }


    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

          onChangetype(footweartype){
            this.props.setfootweartype(footweartype.target.value)
        }
        SaveType(){
            if(this.props.foottypecredentails.FootwearType!=''){
                this.onPost()
            }
            else{
              Notiflix.Notify.Failure('Please enter footwear type.')
           }
        }


        UpdateType(){
            if(this.props.foottypecredentails.FootwearType!=''){
                Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
              var details=JSON.parse(login)
                PostApiCall.postRequest ({
                    id : this.state.Id,
                    type : this.props.foottypecredentails.FootwearType,
                    status : this.state.Status,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"UpdateFootwearTypeMaster").then((resultFootTC) =>
                resultFootTC.json().then(objFootTC => {
                    if(resultFootTC.status == 200 || resultFootTC.status == 201){
                          this.props.setclearfoottype()
                          Notiflix.Loading.Remove();
                          Notiflix.Notify.Success('Footwear type successfully updated.')
                          window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Footwear Type already present.')
                    }
                })
                )
            }
            else{
              Notiflix.Notify.Failure('Please enter footwear type.')
           }
        }
     
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
            <Modal class="modal-content"  
    open={this.state.open}
    
    onClose={()=>{
      this.props.setclearfoottype()
        this.setState({open : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Footwear Type</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Type<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.foottypecredentails.FootwearType}
                onChange={this.onChangetype.bind(this)}/>
            </div>
        </div>

         <div className="col-md-6">
              <div class="form-group mb-3">
                <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                <label class="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.Status == 'Active' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Active'
                  })
                }} /> Active
              </label>
               <label class="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.Status == 'Inactive' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Inactive'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setclearfoottype()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveType.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
              
    <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
      this.props.setclearfoottype()
        this.setState({openedit : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Footwear Type</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Type<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.foottypecredentails.FootwearType}
                onChange={this.onChangetype.bind(this)}/>
            </div>
        </div>

         <div className="col-md-6">
              <div class="form-group mb-3">
                <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                <label class="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.Status == 'Active' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Active'
                  })
                }} /> Active
              </label>
               <label class="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.Status == 'Inactive' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Inactive'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
        this.props.setclearfoottype()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateType.bind(this)}>Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
              
                <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Master Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Footwear Type Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Footwear Type Master</h4>
                        </div>
                    </div> 

                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true
                                            })
                                        }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-plus mr-1"></i>Add New Type</button>
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
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.FootwareTData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Footwear Type Available</td></tr> : 
                                 ''}

                                {this.state.FootwareTData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_type}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                         
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete footwear type.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            footweartypeid : data.fld_id,
                                           
                                        
                                            },"DeleteFootwareTypeMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Footwear type successfully deleted.')
                                                  window.location.reload()
                                              }else
                                              {
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Failure('Something went wrong, try again later.')
                                              }
                                          }))
                                                  }
                                                },
                                                {
                                                  label: 'No',
                                                  // onClick: () => alert('Click No')
                                                }
                                              ]
                                            });
                                           }}
                                           />
                                           <span>
                                             <Edit3 style={{marginLeft: '10px'}}
                                             onClick={()=>{
                                               this.setState({
                                                 Status : data.fld_status,
                                                 openedit : true,
                                                 Id : data.fld_id
                                               })

                                               this.props.setfootweartype(data.fld_type)
                                          
                                             }}
                                             
                                             ></Edit3>
                                           </span>
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


function mapStateToProps(state){
    return{
        foottypecredentails: state.FootType
    }
  }
  
  export default connect(mapStateToProps, {
    setfootweartype,
    setclearfoottype
    })(FootwearTypeMaster);