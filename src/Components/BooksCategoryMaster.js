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
    setbookcategory,
    setclearbookcategory
}
from './Actions/ActionType';

class BooksCategoryMaster extends Component {

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

          this.props.setclearbookcategory()
      
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetBookCategoryList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                BookCatData : obj.data
              })
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{
      Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            category : this.props.bookcredentials.BookCategoryName,
            abv : this.state.Abv,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddBookCategoryMaster").then((resultBookC) =>
        resultBookC.json().then(objBookC => {
            if(resultBookC.status == 200 || resultBookC.status == 201){
              this.props.setclearbookcategory()
            Notiflix.Loading.Remove();
              Notiflix.Notify.Success('Book category successfully added.')
            window.location.reload()
            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Book category already present.')
            }
        })
        )
    }

     constructor(props){
         super(props)
         this.state = {
            open:false,
            BookCatData : [],
            Status : 'Active',
            Id : '',
            openedit : false,
            Abv : ''
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
         
          onChangecat(category){
              this.props.setbookcategory(category.target.value)
          }
          Savebookcategory(){
              if(this.props.bookcredentials.BookCategoryName !=''){
                if(this.state.Abv!=''){
                 this.onPost();
                }
                else{
                  Notiflix.Notify.Failure('Please enter food category abbrevation.')
               }
              }
              else{
                Notiflix.Notify.Failure('Please enter book category.')
             }
          }
     

          Updatebookcategory(){
            if(this.props.bookcredentials.BookCategoryName !=''){
              if(this.state.Abv!=''){
              Notiflix.Loading.Dots('Please wait...');
              var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
              PostApiCall.postRequest ({
                bookcatid : this.state.Id,
                  category : this.props.bookcredentials.BookCategoryName,
                  status : this.state.Status,
                  abv : this.state.Abv,
                  updatedby : details[0].fld_staffid,
                  updatedon : moment().format('lll')
              },"UpdateBookCategoryMaster").then((resultBookC) =>
              resultBookC.json().then(objBookC => {
                  if(resultBookC.status == 200 || resultBookC.status == 201){
                    this.props.setclearbookcategory()
                  Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Book category successfully updated.')
                  window.location.reload()
                  }else
                  {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Failure('Book category already present.')
                  }
              })
              )
            }
            else{
              Notiflix.Notify.Failure('Please enter food category abbrevation.')
           }
           }
           else{
             Notiflix.Notify.Failure('Please enter book category.')
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
      this.props.setclearbookcategory()
      this.setState({open : false})
    }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Book Category</h4>
      </div>
      <div class="modal-body">
      <div class="row">
            <div class="col-md-8">
            <div class="form-group mb-3">
                <label for="validationCustom01">Category<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.bookcredentials.BookCategoryName}
                onChange={this.onChangecat.bind(this)}/>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Abbrevation<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.state.Abv} 
                onChange={(text)=>{
                  this.setState({
                    Abv : text.target.value
                  })

                }}/>
            </div>
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
        this.props.setclearbookcategory()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Savebookcategory.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
            
    <Modal class="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
      this.props.setclearbookcategory()
      this.setState({openedit : false})
    }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Book Category</h4>
      </div>
      <div class="modal-body">
      <div class="row">
            <div class="col-md-8">
            <div class="form-group mb-3">
                <label for="validationCustom01">Category<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.bookcredentials.BookCategoryName}
                onChange={this.onChangecat.bind(this)}/>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Abbrevation<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.state.Abv} 
                onChange={(text)=>{
                  this.setState({
                    Abv : text.target.value
                  })

                }}/>
            </div>
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
            openedit: false,
            Status : 'Active'
        })
        this.props.setclearbookcategory()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Updatebookcategory.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Books Category Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Books Category Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Category</button>
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
                                        <th>Category</th>
                                        <th>Abbrevation</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>

                                {this.state.BookCatData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Book Category Available</td></tr> : 
                                 ''}


                                {this.state.BookCatData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_category}</td>
                                           <td>{data.fld_abv}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete book category.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            bookid : data.fld_id,
                                           
                                        
                                            },"DeleteBookCategoryMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Book category successfully deleted.')
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
                                                 Id : data.fld_id,
                                                 Abv : data.fld_abv
                                               })

                                               this.props.setbookcategory(data.fld_category)
                                          
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
        bookcredentials: state.BookCat
    }
  }
  export default connect(mapStateToProps, {
    setbookcategory,
    setclearbookcategory
  })
( BooksCategoryMaster);
