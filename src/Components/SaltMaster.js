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
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import{
    setcomposition,
    setdivision,
    setclearsalt
     }from './Actions/ActionType';


class SaltMaster extends Component {

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
          this.props.setclearsalt()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetSaltList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                SaltData : obj.data
              })
              console.log(obj.data)
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            composition : this.props.saltcredentials.Composition,
            division : this.props.saltcredentials.Division,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddSaltMaster").then((resultSalt) =>
        resultSalt.json().then(objsalt => {
            if(resultSalt.status == 200 || resultSalt.status == 201){
                this.props.setclearsalt()
                Notiflix.Loading.Remove();
                Notiflix.Notify.Success('Salt successfully added.')
                window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Salt composition already present.')
            }
        })
        )
    }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            SaltData : [],
            Status : 'Active',
            Id : '',
            openedit : false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

          onChangeComposition(composition){
              this.props.setcomposition(composition.target.value)
          }
          onChangeDivision(division){
              this.props.setdivision(division.target.value)
          }
          SaveSalt(){
              if(this.props.saltcredentials.Composition!=''){
                 if(this.props.saltcredentials.Division!=''){
                    this.onPost();
                 }
                 else{
                    Notiflix.Notify.Failure('Please enter salt division.')
                 }
              }
              else{
                Notiflix.Notify.Failure('Please enter salt composition.')
             }
          }

          UpdateSalt(){
            if(this.props.saltcredentials.Composition!=''){
                if(this.props.saltcredentials.Division!=''){
                    Notiflix.Loading.Dots('Please wait...');
                    var login=localStorage.getItem('LoginDetail');
                  var details=JSON.parse(login)
                    PostApiCall.postRequest ({
                        id : this.state.Id,
                        composition : this.props.saltcredentials.Composition,
                        division : this.props.saltcredentials.Division,
                        status : this.state.Status,
                        updatedby : details[0].fld_staffid,
                        updatedon : moment().format('lll')
                    },"UpdateSaltMaster").then((resultSalt) =>
                    resultSalt.json().then(objsalt => {
                        if(resultSalt.status == 200 || resultSalt.status == 201){
                            this.props.setclearsalt()
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success('Salt successfully updated.')
                            window.location.reload()
                        }else
                        {
                          Notiflix.Loading.Remove();
                          Notiflix.Notify.Failure('Salt composition already present.')
                        }
                    })
                    )
                }
                else{
                   Notiflix.Notify.Failure('Please enter salt division.')
                }
             }
             else{
               Notiflix.Notify.Failure('Please enter salt composition.')
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
        this.props.setclearsalt()
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Salt</h4>
      </div>
      <div class="modal-body">
            <div className="row">
            <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Composition<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.saltcredentials.Composition}
                onChange={this.onChangeComposition.bind(this)}/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Divison<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.saltcredentials.Division}
                onChange={this.onChangeDivision.bind(this)}/>
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
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setclearsalt()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveSalt.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
            
            
    <Modal class="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
        this.setState({openedit : false})
        this.props.setclearsalt()
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Salt</h4>
      </div>
      <div class="modal-body">
            <div className="row">
            <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Composition<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.saltcredentials.Composition}
                onChange={this.onChangeComposition.bind(this)}/>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group mb-3">
                <label for="validationCustom01">Divison<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.saltcredentials.Division}
                onChange={this.onChangeDivision.bind(this)}/>
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
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
        this.props.setclearsalt()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateSalt.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Salt Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Salt Master</h4>
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
                                        }
                                      
                                      }
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-plus mr-1"></i>Add New Salt</button>
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
                                        <th>Composition</th>
                                        <th>Divison</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.SaltData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Salt Available</td></tr> : 
                                 ''} 
                                {this.state.SaltData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_composition}</td>
                                           <td>{data.fld_division}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete salt.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            saltid : data.fld_id,
                                           
                                        
                                            },"DeleteSaltMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Salt Master successfully deleted.')
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

                                               this.props.setcomposition(data.fld_composition)
                                               this.props.setdivision(data.fld_division)
                                          
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
        saltcredentials: state.SaltReducers
    }
  }
  
  export default connect(mapStateToProps, {
   setcomposition,
setdivision,
setclearsalt})(SaltMaster);