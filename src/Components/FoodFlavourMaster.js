import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import {setFoodFlavourM,
    setClearFoodFlavourM} from './Actions/ActionType'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';


class FoodFlavourMaster extends Component {


  componentDidMount(){
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
       
      });
  
      this.props.setClearFoodFlavourM()
      Notiflix.Loading.Dots('Please wait...');
  
      GetApiCall.getRequest("GetFlavourMaster").then(resultdes =>
        resultdes.json().then(obj => {
            this.setState({
                
            Flavourdata : obj.data
          })
          console.log(obj.data)
           Notiflix.Loading.Remove()
        }))
}
    

     constructor(props){
         super(props)
         this.state = {
            open:false,
            openedit : false,
            Status : 'Active',
            Flavourdata : [],
            FoodFId: ''
          };
        }


        onPost = () =>{
          Notiflix.Loading.Dots('Please wait...');
          var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
          PostApiCall.postRequest ({
            flavour : this.props.foodcred.FoodFlavour,
            status : this.state.Status,
              updatedby : details[0].fld_staffid,
              updatedon : moment().format('lll')
          },"AddFlavourMaster").then((resultFoodFlavour) =>
          resultFoodFlavour.json().then(objFoodF => {
              if(resultFoodFlavour.status == 200 || resultFoodFlavour.status == 201){
                  this.props.setClearFoodFlavourM()
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Success('Food flavour successfully added.')
                  window.location.reload()
              }else
              {
                Notiflix.Loading.Remove();
                Notiflix.Notify.Failure('Food flavour already present.')
              }
          })
          )


      }


    
        handleFlavourChange = event =>{
            this.props.setFoodFlavourM(event.target.value)
        }

        UpdatefoodFlavour = () =>{
          if(this.props.foodcred.FoodFlavour!=''){
            
            Notiflix.Loading.Dots('Please wait...');
  
            var login=localStorage.getItem('LoginDetail');
  
          var details=JSON.parse(login)
            PostApiCall.postRequest ({
  
                id : this.state.FoodFId,
                flavour : this.props.foodcred.FoodFlavour,
                status : this.state.Status,
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
            },"UpdateFlavourMaster").then((resultFoodF) =>
            resultFoodF.json().then(objfoodC => {
                if(resultFoodF.status == 200 || resultFoodF.status == 201){
                  this.props.setClearFoodFlavourM()
                Notiflix.Loading.Remove();
                Notiflix.Notify.Success('Food flavour successfully updated.')
                window.location.reload()
                }else{
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Failure('Food flavour already present.')
                }
            })
            )
          }
          else{
            Notiflix.Notify.Failure('Please enter food flavour name.')
         }
        }
        
        handleSubmitChange = () =>{
          if(this.props.foodcred.FoodFlavour !=''){
            this.onPost();
          }else{
            Notiflix.Notify.Failure('Please enter food flavour')
          }
            
        }
    
          onCloseModal = () => {
            this.setState({ open: false });
          };
        
     
    render(){
        return(
           <div>      
            <div class="content-page">
            <div class="content">
            <Modal class="modal-content"  
    open={this.state.open}
    
    onClose={()=>{
      this.setState({open : false})
    }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Food Flavour</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Flavour Name<span class="mandatory">*</span></label>
                <input type="text" class="form-control"
                 value = {this.props.foodcred.FoodFlavour}
                onChange = {this.handleFlavourChange.bind(this)}
                ></input>
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
        this.props.setClearFoodFlavourM()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick = {this.handleSubmitChange.bind(this)}
     >Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>

    <Modal class="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
      this.props.setclearfoodcategory()
      this.setState({openedit : false})
    }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Food Flavour</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Flavour Name<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.foodcred.FoodFlavour} 
                 onChange={this.handleFlavourChange.bind(this)}
                />
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
      <button class="btn btn-primary" type="submit" style={{float:'right'}} 
       onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
          })
          this.props.setClearFoodFlavourM()
    }}>Close</button>
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
       onClick={this.UpdatefoodFlavour.bind(this)}
      >Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Food Flavour Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Food Flavour Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Flavour</button>
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
                                        <th>Flavour</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.Flavourdata.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Food Category Available</td></tr> : 
                                 ''}

                                    {this.state.Flavourdata.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_flavour}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                           
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete food flavour.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            id : data.fld_id,
                                           
                                        
                                            },"DeleteFlavourMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Food flavour successfully deleted.')
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
                                                 FoodFId : data.fld_id
                                               })

                                               this.props.setFoodFlavourM(data.fld_flavour)
                                          
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
        foodcred: state.FoodFlavourMaster
    }
  }
  
  export default connect(mapStateToProps, {
    setFoodFlavourM,
    setClearFoodFlavourM
  }) (FoodFlavourMaster);