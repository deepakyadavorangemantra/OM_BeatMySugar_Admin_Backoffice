import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2, ThumbsDown} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import{
    setfootwearsize,
    setclearfootsize
}
from './Actions/ActionType';

class FootwearSizeMaster extends Component {

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
          this.props.setclearfootsize()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetFootwareSizeList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                FootwareSData : obj.data
              })
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            size : this.props.footsizecredentails.FootwearSize,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddFootwearSizeMaster").then((resultFootwareS) =>
        resultFootwareS.json().then(objBookC => {
            if(resultFootwareS.status == 200 || resultFootwareS.status == 201){
                this.props.setclearfootsize()
                Notiflix.Loading.Remove();
                Notiflix.Notify.Success('Footwear size successfully added.')
                window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Footwear size already present.')
            }
        })
        )
    }


     constructor(props){
         super(props)
         this.state = {
            open:false,
            FootwareSData : [],
            Status : 'Active',
            Id : '',
            openedit : false,


            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|httpss:\/\/www\.|https:\/\/|httpss:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

          onChangesize(footwearsize){
              if(this.state.NumRegex.test(footwearsize.target.value)){
            this.props.setfootwearsize(footwearsize.target.value)
              }
        }
        SaveSize(){
            if(this.props.footsizecredentails.FootwearSize!=''){
                this.onPost();
            }
            else{
              Notiflix.Notify.Failure('Please enter footwear size.')
           }
        }
  
        UpdateSize(){
            if(this.props.footsizecredentails.FootwearSize!=''){
               
                Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            id : this.state.Id,
            size : this.props.footsizecredentails.FootwearSize,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"UpdateFootwearSizeMaster").then((resultFootwareS) =>
        resultFootwareS.json().then(objBookC => {
            if(resultFootwareS.status == 200 || resultFootwareS.status == 201){
                this.props.setclearfootsize()
                Notiflix.Loading.Remove();
                Notiflix.Notify.Success('Footwear size successfully updated.')
                window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Footwear size already present.')
            }
        })
        )
            }
            else{
              Notiflix.Notify.Failure('Please enter footwear size.')
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
        this.setState({open : false})
        this.props.setclearfootsize()
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Footwear Size</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Size<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.footsizecredentails.FootwearSize} 
                onChange={this.onChangesize.bind(this)}></input>
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
        this.props.setclearfootsize()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveSize.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
             

    <Modal class="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
        this.setState({openedit : false})
        this.props.setclearfootsize()
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Footwear Size</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Size<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.footsizecredentails.FootwearSize} 
                onChange={this.onChangesize.bind(this)}></input>
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
        this.props.setclearfootsize()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateSize.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Footwear Size Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Footwear Size</h4>
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
                                                class="uil-plus mr-1"></i>Add New Size</button>
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
                                        <th>Size</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.FootwareSData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Footwear Size Available</td></tr> : 
                                 ''} 
                                {this.state.FootwareSData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_size}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                    
                                           ><Trash2
                                           
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete footwear size.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            footwearsizeid : data.fld_id,
                                           
                                        
                                            },"DeleteFootwareSizeMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Footwear Size successfully deleted.')
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

                                               this.props.setfootwearsize(data.fld_size)
                                          
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
        footsizecredentails: state.FootSize
    }
  }
  
  export default connect(mapStateToProps, {
    setfootwearsize,
    setclearfootsize
    })(FootwearSizeMaster);