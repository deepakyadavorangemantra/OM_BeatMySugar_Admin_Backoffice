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
    setQualificationM,
setclearQualificationM
    
}
from './Actions/ActionType';

class QualificationMaster extends Component {


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
          this.props.setclearQualificationM()
          Notiflix.Loading.Dots('Please wait...');
          GetApiCall.getRequest("GetQualificationMasterList").then(resultQuali =>
            resultQuali.json().then(obj => {
              this.setState({
                QualificationData : obj.data
              })
              Notiflix.Loading.Remove()
              
            }))
         
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
          qual : this.props.QualificationCred.Qualification,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddQualificationMaster").then((resultQuali) =>
        resultQuali.json().then(objBookC => {
            if(resultQuali.status == 200 || resultQuali.status == 201){
                this.props.setclearQualificationM()
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Qualification successfully added.')
            window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Qualification already present.')
            }
        })
        )
    }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            QualificationData : [],
            Id : '',
            openedit : false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

          onChangeQualification(Qualification){
            this.props.setQualificationM(Qualification.target.value)
        }
        SaveQualification(){
            if(this.props.QualificationCred.Qualification!=''){
                
                this.onPost();
            }
            else{
              Notiflix.Notify.Failure('Please enter Qualification.')
           }
        }

        UpdateQualification(){

             if(this.props.QualificationCred.Qualification!=''){
                Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
              var details=JSON.parse(login)
                PostApiCall.postRequest ({
                    id : this.state.Id,
                    qual : this.props.QualificationCred.Qualification,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"UpdateQualificationMaster").then((resultQuali) =>
                resultQuali.json().then(objQuali => {
                    if(resultQuali.status == 200 || resultQuali.status == 201){
                      this.props.setclearQualificationM()
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Qualification successfully updated.')
                    window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Qualification already present.')
                    }
                })
                )
             }
             else{
               Notiflix.Notify.Failure('Please enter Qualification.')
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
        this.props.setclearQualificationM()
        this.setState({open : false})
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Qualification</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Qualification<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.QualificationCred.Qualification}
                onChange={this.onChangeQualification.bind(this)}
                ></input>
            </div>
        </div>

        
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setclearQualificationM()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveQualification.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
    <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
        this.props.setclearQualificationM()
        this.setState({openedit : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Qualification</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Qualification<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.QualificationCred.Qualification}
                onChange={this.onChangeQualification.bind(this)}
                ></input>
            </div>
        </div>

        
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
        this.props.setclearQualificationM()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateQualification.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Qualification Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Qualification Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Qualification</button>
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
                                        <th>Qualifications</th>
                                        
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.QualificationData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Socks Color Available</td></tr> : 
                                 ''}

                                {this.state.QualificationData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_qualification}</td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                         
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete Qualification.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            qualid : data.fld_id,
                                           
                                        
                                            },"DeleteQualificationMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Qualification successfully deleted.')
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
                                                 openedit : true,
                                                 Id : data.fld_id
                                               })

                                               this.props.setQualificationM(data.fld_qualification)
                                          
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
        QualificationCred: state.Qualification
    }
  }
  
  export default connect(mapStateToProps, {
     setQualificationM,
     setclearQualificationM
    })(QualificationMaster);