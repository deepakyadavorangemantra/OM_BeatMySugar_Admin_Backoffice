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
    setSpecializationM,
    setclearSpecializationM
    
}
from './Actions/ActionType';

class SpecializationMaster extends Component {


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
           this.props.setclearSpecializationM()
          Notiflix.Loading.Dots('Please wait...');
          GetApiCall.getRequest("GetSpecializationMasterList").then(resultSpec =>
            resultSpec.json().then(obj => {
              this.setState({
                SpecializationData : obj.data
              })
              Notiflix.Loading.Remove()
              
            }))
         
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
          specialisation : this.props.SpecializationCred.Specialization,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddSpecializationMaster").then((resultSpec) =>
        resultSpec.json().then(objSpec => {
            if(resultSpec.status == 200 || resultSpec.status == 201){
                this.props.setclearSpecializationM()
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Specialization successfully added.')
            window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Specialization already present.')
            }
        })
        )
    }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            SpecializationData : [],
            Id : '',
            openedit : false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

          onChangeSpecialization(Specialization){
            this.props.setSpecializationM(Specialization.target.value)
        }
        SaveSpecialization(){
            if(this.props.SpecializationCred.Specialization!=''){
                this.onPost();
            }
            else{
              Notiflix.Notify.Failure('Please enter Specialisation.')
           }
        }

        UpdateSpecialization(){

             if(this.props.SpecializationCred.Specialization!=''){
                Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
              var details=JSON.parse(login)
                PostApiCall.postRequest ({
                    id : this.state.Id,
                    spec : this.props.SpecializationCred.Specialization,
                    status : this.state.Status,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"UpdateSpecializationMaster").then((resultSpec) =>
                resultSpec.json().then(objBookC => {
                    if(resultSpec.status == 200 || resultSpec.status == 201){
                        this.props.setclearSpecializationM()
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Specialization successfully updated.')
                    window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Specialization already present.')
                    }
                })
                )
             }
             else{
               Notiflix.Notify.Failure('Please enter Specialization.')
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
        this.props.setclearSpecializationM()
        this.setState({open : false})
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Specialization</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Specialization<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.SpecializationCred.Specialization}
                onChange={this.onChangeSpecialization.bind(this)}
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
        this.props.setclearSpecializationM()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveSpecialization.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
    <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
        this.props.setclearSpecializationM()
        this.setState({openedit : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Specialization</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Specialization<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.SpecializationCred.Specialization}
                onChange={this.onChangeSpecialization.bind(this)}
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
        this.props.setclearSpecializationM()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateSpecialization.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Specialization Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Specialization Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Specialization</button>
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
                                        <th>Specialization </th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.SpecializationData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Specialization Available</td></tr> : 
                                 ''}

                                {this.state.SpecializationData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_specialisation}</td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                         
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete Specialization.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            specid : data.fld_id,
                                           
                                        
                                            },"DeleteSpecializationMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Specizlization successfully deleted.')
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

                                               this.props.setSpecializationM(data.fld_specialisation)
                                          
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
        SpecializationCred: state.Specialization
    }
  }
  
  export default connect(mapStateToProps, {
    setSpecializationM,
    setclearSpecializationM
    })(SpecializationMaster);