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
    setsockstype,
    setclearsockstype
}
from './Actions/ActionType';

class SocksTypeMaster extends Component {
  constructor(props){
    super(props)
    this.state = {
       open:false,
       SocksData : [],
       Status : 'Active',
       Id : '',
       openedit : false,
     };
   }


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
            this.props.setclearsockstype()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetSocksTypeMasterGrid").then(resultdes =>
            resultdes.json().then(obj => {

                this.setState({
                SocksData : obj.data
              })
            console.log(obj.data)
               Notiflix.Loading.Remove()
            }))
    }

    


   
          onCloseModal = () => {
            this.setState({ open: false });
          };

          onChangetype(sockstype){
            this.props.setsockstype(sockstype.target.value)
        }

        SaveType(){
            if(this.props.sockstypecredentails.SocksType!=''){
              
              Notiflix.Loading.Dots('Please wait...');

                  var login=localStorage.getItem('LoginDetail');
                  var details=JSON.parse(login)

                  PostApiCall.postRequest ({
                      type : this.props.sockstypecredentails.SocksType,
                      status : this.state.Status,
                      updatedby : details[0].fld_staffid,
                      updatedon : moment().format('lll')
                  },"AddSocksTypeMaster").then((result) =>

                      result.json().then(obj => {

                      if(result.status == 200 || result.status == 201){
                            this.props.setclearsockstype()
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success('Socks type successfully added.')
                            window.location.reload()
                      }else
                      {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure('Socks Type already present.')
                      }
                  })
                  )
            }
            else{
              Notiflix.Notify.Failure('Please enter Socks type.')
           }
        }



        UpdateType(){
            if(this.props.sockstypecredentails.SocksType!=''){
              Notiflix.Loading.Dots('Please wait...');

                      var login=localStorage.getItem('LoginDetail');
                      var details=JSON.parse(login)

                      PostApiCall.postRequest ({
                          id : this.state.Id,
                          type : this.props.sockstypecredentails.SocksType,
                          status : this.state.Status,
                          updatedby : details[0].fld_staffid,
                          updatedon : moment().format('lll')
                      },"UpdateSocksTypeMaster").then((result) =>

                      result.json().then(obj => {
                          if(result.status == 200 || result.status == 201){
                                this.props.setclearsockstype()
                                Notiflix.Loading.Remove();
                                Notiflix.Notify.Success('Socks successfully updated.')
                                window.location.reload()
                          }else
                          {
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Failure('Socks Type already present.')
                          }
                      })
                      )
            }
            else{
                      Notiflix.Notify.Failure('Please enter Socks type.')
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
      this.props.setclearsockstype()
        this.setState({open : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Socks Type</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Type<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.sockstypecredentails.SocksType}
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
        this.props.setclearsockstype()
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
      this.props.setclearsockstype()
        this.setState({openedit : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Socks Type</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Type<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.sockstypecredentails.SocksType}
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
        this.props.setclearsockstype()
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
                                    <li class="breadcrumb-item active" aria-current="page">Socks Type Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Socks Type Master</h4>
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

                                 {this.state.SocksData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Socks Type Available</td></tr> : 
                                 ''}

                                {this.state.SocksData.map((data,index)=>(
                                           
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
                                              message: 'Are you sure you want to delete socks type.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            socksid : data.fld_id,
                                           
                                        
                                            },"DeleteSocksTypeMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Socks type successfully deleted.')
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
                                               console.log(data);
                                               this.setState({
                                                 Status : data.fld_status,
                                                 openedit : true,
                                                 Id : data.fld_id
                                               })
                                               
                                               this.props.setsockstype(data.fld_type)
                                          
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
        sockstypecredentails: state.SocksType
    }
  }
  
  export default connect(mapStateToProps, {
    setsockstype,
    setclearsockstype
    })(SocksTypeMaster);