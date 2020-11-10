import React, { Component } from 'react';
import Helmet from 'react-helmet'
import { Edit3, Trash2 } from 'react-feather';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import {
    sethealthservice,
    setclearhealthservice
}
    from './Actions/ActionType';

class HealthService extends Component {

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
          this.props.setclearhealthservice()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetHealthCenterServicesMaster").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                HealthServiceData : obj.data
              })
            //   console.log(obj.data)
               Notiflix.Loading.Remove()
            }))
    }



    constructor(props) {
        super(props)
        this.state = {
            open: false,
            Status : 'Active',
            HealthServiceData : [],
            openedit : false,
        };
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        PostApiCall.postRequest ({
            service : this.props.servicecredentails.Service,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddHealthCenterServicesMaster").then((resultHealthCenterS) =>
        resultHealthCenterS.json().then(objHealthC => {
            if(resultHealthCenterS.status == 200 || resultHealthCenterS.status == 201){
             
                this.props.setclearhealthservice()

                Notiflix.Loading.Remove();
                Notiflix.Notify.Success('Health center service successfully added.')
                window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Health center service already present.')
            }
        })
        )
    }

    UpdateService(){
        if(this.props.servicecredentails.Service!=''){
           
            Notiflix.Loading.Dots('Please wait...');

            var login=localStorage.getItem('LoginDetail');
             var details=JSON.parse(login)

    PostApiCall.postRequest ({
        id : this.state.Id,
        service : this.props.servicecredentails.Service,
        status : this.state.Status,
        updatedby : details[0].fld_staffid,
        updatedon : moment().format('lll')
    },"UpdateHealthCenterServicesMaster").then((resultHealthCenterS) =>
    
    resultHealthCenterS.json().then(objHealthC => {
        if(resultHealthCenterS.status == 200 || resultHealthCenterS.status == 201){
            this.props.setclearhealthservice()

            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Service is successfully updated.')
            window.location.reload()
        }else
        {
          Notiflix.Loading.Remove();
          Notiflix.Notify.Failure('Service is already present.')
        }
    })
    )
        }
        else{
          Notiflix.Notify.Failure('Please enter Health Service.')
       }
    }


    onCloseModal = () => {
        this.setState({ open: false });
    };

    onChangeService(service) {
        this.props.sethealthservice(service.target.value)
    }
    SaveService() {
        if (this.props.servicecredentails.Service != '') {
            this.onPost();
        }
        else {
            Notiflix.Notify.Failure('Please enter Health Service.')
        }
    }

    render() {
        return (
            <div>
                <div class="content-page">
                    <div class="content">
                    <Modal class="modal-content"
                            open={this.state.open}
                            onClose={()=>{
                                this.setState({open : false})
                                this.props.setclearhealthservice()
                              }}
                            center>
                            <div class="modal-content modelcontent2">
                                <div class="modal-header">
                                    <h4 class="modal-title">Add New Service</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="col-md-12">
                                        <div class="form-group mb-3">
                                            <label for="validationCustom01">Service<span class="mandatory">*</span></label>
                                            <input type="text" class="form-control"
                                                value={this.props.servicecredentails.Service}
                                                onChange={this.onChangeService.bind(this)} />
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
                                    <button class="btn btn-primary" type="submit" style={{ float: 'right' }} onClick={() => {
                                        this.setState({
                                            open: false
                                        })

                                    }}>Close</button>
                                    <button class="btn btn-primary" type="submit" style={{ float: 'right' }}
                                        onClick={this.SaveService.bind(this)}>Save</button>
                                    <span>
                                    </span>
                                </div>
                            </div>
                        </Modal>

                        <Modal class="modal-content"
                            open={this.state.openedit}
                            onClose={()=>{
                                this.setState({openedit : false})
                                this.props.setclearhealthservice()
                              }}
                            center>
                            <div class="modal-content modelcontent2">
                                <div class="modal-header">
                                    <h4 class="modal-title">Add New Service</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="col-md-12">
                                        <div class="form-group mb-3">
                                            <label for="validationCustom01">Service<span class="mandatory">*</span></label>
                                            <input type="text" class="form-control"
                                                value={this.props.servicecredentails.Service}
                                                onChange={this.onChangeService.bind(this)} />
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
                                    <button class="btn btn-primary" type="submit" style={{ float: 'right' }} onClick={() => {
                                        this.setState({
                                            openedit : false,
                                            Status : 'Active'
                                        })
                                        this.props.setclearhealthservice()
                                    }}>Close</button>
                                    <button class="btn btn-primary" type="submit" style={{ float: 'right' }}
                                        onClick={this.UpdateService.bind(this)}>Save</button>
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
                                            <li class="breadcrumb-item active" aria-current="page">Health Center Service </li>
                                        </ol>
                                    </nav>
                                    <h4 class="mb-1 mt-0">Health Center Service</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row align-items-center">
                                                <div class="col text-right">
                                                    <button
                                                        onClick={() => {
                                                            this.setState({
                                                                open: true
                                                            })
                                                        }}
                                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                            class="uil-plus mr-1"></i>Add New Service</button>
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
                                                        <th>Service</th>
                                                        <th>Status</th>
                                                        <th>Updated On</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.HealthServiceData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Service Available</td></tr> : 
                                 ''} 
                                {this.state.HealthServiceData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_service}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                    
                                           ><Trash2
                                           
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete Service.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            id : data.fld_id,
                                           
                                        
                                            },"DeleteHealthCenterServicesMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Service successfully deleted.')
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

                                               this.props.sethealthservice(data.fld_service)
                                          
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


function mapStateToProps(state) {
    return {
        servicecredentails: state.HealthService
    }
}

export default connect(mapStateToProps, {
    sethealthservice,
    setclearhealthservice
})(HealthService);