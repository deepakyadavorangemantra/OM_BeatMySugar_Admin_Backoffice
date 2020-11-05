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
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from './Actions/ActionType';

class ArticleSubCategoryMaster extends Component {


    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
          this.props.setClearArticleSubCategory()
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetArticleSubCategoryMasterList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                ArticleSubCatData : obj.data
              })
               Notiflix.Loading.Remove()
               console.log(obj.data)
            }))
      
        }

        onPost(){
            Notiflix.Loading.Dots('Please wait...');
            var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)

                PostApiCall.postRequest ({
                    subcategory : this.props.ArticleCredential.SubCategoryName,
                    order : this.props.ArticleCredential.Order,
                    status : this.state.Status,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"AddArticleSubCategoryMaster").then((resultArticleSubCat) =>
                resultArticleSubCat.json().then(objArticleSub => {
                    if(resultArticleSubCat.status == 200 || resultArticleSubCat.status == 201){
                        this.props.setClearArticleSubCategory()
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Article sub category successfully added.')
                        window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Article sub category / order number already present.')
                    }
                })
            )
    
        }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            ArticleSubCatData : [],
            Numregex : /^[0-9]*$/,
            Status : 'Active',
            Id : '',
            openedit : false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
         
          handleSubCategoryChange = (subcategory) =>{
            this.props.setSubCategoryName(subcategory.target.value)
          }

          handleOrderChange = (order) =>{
              if(this.state.Numregex.test(order.target.value)){
              this.props.setSubOrder(order.target.value)
              }
          }

          handleSubmit = () =>{
              if(this.props.ArticleCredential.SubCategoryName !=''){
                if(this.props.ArticleCredential.Order !=''){
                  this.onPost()
                }else{
                    Notiflix.Notify.Failure('Please enter article sub category order.')
                }
              }else{
                Notiflix.Notify.Failure('Please enter article sub category.')
            }
          }
         

          UpdateSubmit(){
            if(this.props.ArticleCredential.SubCategoryName !=''){
                if(this.props.ArticleCredential.Order !=''){
                 
                    Notiflix.Loading.Dots('Please wait...');
                    var login=localStorage.getItem('LoginDetail');
                        var details=JSON.parse(login)
        
                        PostApiCall.postRequest ({
                            subid : this.state.Id,
                            subcategory : this.props.ArticleCredential.SubCategoryName,
                            order : this.props.ArticleCredential.Order,
                            status : this.state.Status,
                            updatedby : details[0].fld_staffid,
                            updatedon : moment().format('lll')
                        },"UpdateArticleSubCategoryMaster").then((resultArticleSubCat) =>
                        resultArticleSubCat.json().then(objArticleSub => {
                            if(resultArticleSubCat.status == 200 || resultArticleSubCat.status == 201){
                                this.props.setClearArticleSubCategory()
                                Notiflix.Loading.Remove();
                                Notiflix.Notify.Success('Article sub category successfully updated.')
                                window.location.reload()
                            }else
                            {
                              Notiflix.Loading.Remove();
                              Notiflix.Notify.Failure('Article sub category / order number already present.')
                            }
                        })
                    )

                }else{
                    Notiflix.Notify.Failure('Please enter article sub category order.')
                }
              }else{
                Notiflix.Notify.Failure('Please enter article sub category.')
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
        this.props.setClearArticleSubCategory()
      }}
   
     center>

    <div className="modal-content modelcontent2">
      <div className="modal-header">
        <h4 className="modal-title">Add New Article Sub Category</h4>
      </div>
      <div className="modal-body">
           <div className="row">
           <div className="col-md-6">
           <div className="form-group mb-3">
               <label for="validationCustom01">Sub Category Name<span className="mandatory">*</span></label>
               <input type="text" className="form-control"
               value = {this.props.ArticleCredential.SubCategoryName}
               onChange = {this.handleSubCategoryChange.bind(this)}
               />
                          
           </div>
       </div>
       <div className="col-md-6">
       <div className="form-group mb-3">
           <label for="validationCustom01">Order<span className="mandatory">*</span></label>
           <input type="text" className="form-control" value = {this.props.ArticleCredential.Order}
           onChange = {this.handleOrderChange.bind(this)}
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
      </div>
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setClearArticleSubCategory()
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}}
      onClick ={this.handleSubmit.bind(this)}
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
        this.props.setClearArticleSubCategory()
      }}
   
     center>

    <div className="modal-content modelcontent2">
      <div className="modal-header">
        <h4 className="modal-title">Update Article Sub Category</h4>
      </div>
      <div className="modal-body">
           <div className="row">
           <div className="col-md-6">
           <div className="form-group mb-3">
               <label for="validationCustom01">Sub Category Name<span className="mandatory">*</span></label>
               <input type="text" className="form-control"
               value = {this.props.ArticleCredential.SubCategoryName}
               onChange = {this.handleSubCategoryChange.bind(this)}
               />
                          
           </div>
       </div>
       <div className="col-md-6">
       <div className="form-group mb-3">
           <label for="validationCustom01">Order<span className="mandatory">*</span></label>
           <input type="text" className="form-control" value = {this.props.ArticleCredential.Order}
           onChange = {this.handleOrderChange.bind(this)}
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
      </div>
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
        this.props.setClearArticleSubCategory()
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}}
      onClick ={this.UpdateSubmit.bind(this)}
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
                                    <li className="breadcrumb-item active" aria-current="page">Article Sub Category Master</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Article Sub Category Master</h4>
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
                                                className="uil-plus mr-1"></i>Add New Sub Category</button>
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
                                        <th>Sub Category</th>
                                        <th>Order</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.ArticleSubCatData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Article Sub Category Available</td></tr> : 
                                 ''} 
                                {this.state.ArticleSubCatData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_subcategory}</td>
                                           <td>{data.fld_order}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete article sub category.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            artsubcatid : data.fld_id,
                                           
                                        
                                            },"DeleteArticleSubCategoryMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('article sub category successfully deleted.')
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

                                               this.props.setSubCategoryName(data.fld_subcategory)
                                               this.props.setSubOrder(data.fld_order)
                                          
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
       ArticleCredential : state.ArticleSubCategory
    }
  }

  export default connect(mapStateToProps,{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
  }) (ArticleSubCategoryMaster);