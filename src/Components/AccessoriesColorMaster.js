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
    setfootwearcolor,
    setclearfootcolor
}
from './Actions/ActionType';

class FootwearColorMaster extends Component {


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
        //   this.props.setclearfootcolor()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("Get_AccessoriesColorList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                ColorData : obj.data

              })
              
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            color : this.state.Color,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddAccessoriesColorMaster").then((resultFootC) =>
        resultFootC.json().then(objBookC => {
            if(resultFootC.status == 200 || resultFootC.status == 201){
                
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Accessories color successfully added.')
            window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Accessories color already present.')
            }
        })
        )
    }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            ColorData : [],
            Status : 'Active',
            Id : '',
            openedit : false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };

        //   onChangecolor(footwearcolor){
        //     this.props.setfootwearcolor(footwearcolor.target.value)
        // }
        SaveColor(){
            if(this.state.Color!=''){
                this.onPost();
            }
            else{
              Notiflix.Notify.Failure('Please enter accessories color.')
           }
        }

        UpdateColor(){

            if(this.state.Color!=''){
                Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
              var details=JSON.parse(login)
                PostApiCall.postRequest ({
                    id : this.state.Id,
                    color : this.state.Color,
                    status : this.state.Status,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"UpdateAccessoriesColorMaster").then((resultFootC) =>
                resultFootC.json().then(objBookC => {
                    if(resultFootC.status == 200 || resultFootC.status == 201){
                      
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Accessories color successfully updated.')
                    window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Accessories color already present.')
                    }
                })
                )
            }
            else{
              Notiflix.Notify.Failure('Please enter accessories color.')
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
      }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Accessories Color</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Color<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.state.Color}
                onChange={(text)=>{
                    this.setState({
                        Color:text.target.value
                    })
                }}
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
      
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveColor.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
    <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
        
        this.setState({openedit : false})
      }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Accessories Color</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Color<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.state.Color}
                onChange={(text)=>{
                    this.setState({
                        Color:text.target.value
                    })
                }}
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
            openedit : false,
            Status : 'Active'
        })
        
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.UpdateColor.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Footwear Color Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Footwear Color Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Color</button>
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
                                        <th>Color</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.ColorData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Accessories Color Available</td></tr> : 
                                 ''}

                                {this.state.ColorData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_color}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                         
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete accessories color.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            accessoriescolorid : data.fld_id,
                                           
                                        
                                            },"DeleteAccessoriesColorMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Accessories color successfully deleted.')
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
                                                 Id : data.fld_id,
                                                 Color:data.fld_color
                                               })

                                             
                                          
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
        footcolorcredentails: state.FootColor
    }
  }
  
  export default connect(mapStateToProps, {
    setfootwearcolor,
    setclearfootcolor
    })(FootwearColorMaster);