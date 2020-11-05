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
    setArticalTag,
    setClearTag
}
from './Actions/ActionType';

class ArticleTagMaster extends Component {


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

          this.props.setClearTag()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetTagMasterList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                ArticleTagData : obj.data
              })
               Notiflix.Loading.Remove()
               console.log(obj.data)
            }))
            
        }

        onPost = () =>{
          Notiflix.Loading.Dots('Please wait...');
            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
            PostApiCall.postRequest ({
                tag : this.props.ArticleCredentail.ArticalTag,
                status : this.state.Status,
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
            },"AddTagMaster").then((resultArticel) =>
            resultArticel.json().then(objArtical => {
                if(resultArticel.status == 200 || resultArticel.status == 201){
                  this.props.setClearTag()
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Success('Article tag successfully added.')
                  window.location.reload()
                }else
                {
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Failure('Article tag already present.')
                }
            })
            )

        }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            ArticleTagData : [],
            Status : 'Active',
            Id : '',
            openedit : false,
          };
        }
    
          onCloseModal = () => {
            this.setState({ open: false });
          };

          handleArticalTagChange = (articaltag) =>{
            this.props.setArticalTag(articaltag.target.value)
          }

          SaveTag = () =>{
              if(this.props.ArticleCredentail.ArticalTag != ''){
                this.onPost();
              }
              else{
              Notiflix.Notify.Failure('Please enter article tag.')
           }
          }

        UpdateTag(){
          if(this.props.ArticleCredentail.ArticalTag != ''){
            Notiflix.Loading.Dots('Please wait...');
            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
            PostApiCall.postRequest ({
                id : this.state.Id, 
                tag : this.props.ArticleCredentail.ArticalTag,
                status : this.state.Status,
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
            },"UpdateTagMaster").then((resultArticel) =>
            resultArticel.json().then(objArtical => {
                if(resultArticel.status == 200 || resultArticel.status == 201){
                  this.props.setClearTag()
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Success('Article tag successfully updated.')
                  window.location.reload()
                }else
                {
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Failure('Article tag already present.')
                }
            })
            )
          }
          else{
          Notiflix.Notify.Failure('Please enter article tag.')
       }
        } 
         
         
    render(){
        return(
           <div>
          
                     
            <div className="content-page">
            
            <div className="content">
            <Modal className="modal-content"  
    open={this.state.open}
    onClose={()=>{
        this.setState({open : false})
        this.props.setClearTag()
      }}
     center>

    <div className="modal-content modelcontent2">
      <div className="modal-header">
        <h4 className="modal-title">Add New Article Tag</h4>
      </div>
      <div className="modal-body">
            <div className="col-md-12">
            <div className="form-group mb-3">
                <label for="validationCustom01">Tag<span className="mandatory">*</span></label>
                <input type="text" className="form-control"
                value = {this.props.ArticleCredentail.ArticalTag} 
                onChange = {this.handleArticalTagChange.bind(this)}
               />
            </div>
        </div>


        <div className="col-md-6">
              <div className="form-group mb-3">
                <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                <label className="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.Status == 'Active' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Active'
                  })
                }} /> Active
              </label>
               <label className="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.Status == 'Inactive' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Inactive'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
      </div>
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setClearTag()
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}} 
      onClick={this.SaveTag.bind(this)}
     >Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              

    <Modal className="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
        this.setState({openedit : false})
        this.props.setClearTag()
      }}
     center>

    <div className="modal-content modelcontent2">
      <div className="modal-header">
        <h4 className="modal-title">Update Article Tag</h4>
      </div>
      <div className="modal-body">
            <div className="col-md-12">
            <div className="form-group mb-3">
                <label for="validationCustom01">Tag<span className="mandatory">*</span></label>
                <input type="text" className="form-control"
                value = {this.props.ArticleCredentail.ArticalTag} 
                onChange = {this.handleArticalTagChange.bind(this)}
               />
            </div>
        </div>


        <div className="col-md-6">
              <div className="form-group mb-3">
                <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                <label className="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.Status == 'Active' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Active'
                  })
                }} /> Active
              </label>
               <label className="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.Status == 'Inactive' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Inactive'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
      </div>
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
        this.props.setClearTag()
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}} 
      onClick={this.UpdateTag.bind(this)}
     >Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
              
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="float-right mt-1">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Master Management</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Article Tag Master</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Article Tag Master</h4>
                        </div>
                    </div> 

                    <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                                                       <div className="col text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true
                                            })
                                        }}
                                        className="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                className="uil-plus mr-1"></i>Add New Tag</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                
                </div>
                    
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                <div className="table-responsive">  
                                <table id="basic-datatable" className="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Tag</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.ArticleTagData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Article Tag Available</td></tr> : 
                                 ''} 
                                       
                                {this.state.ArticleTagData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_tag}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                        
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete tag.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            tagid : data.fld_id,
                                           
                                        
                                            },"DeleteTagMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Tag successfully deleted.')
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

                                               this.props.setArticalTag(data.fld_tag)
                                          
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
        ArticleCredentail: state.ArticleTag
    }
  }

  export default connect(mapStateToProps,{
    setArticalTag,
    setClearTag
  }) (ArticleTagMaster);