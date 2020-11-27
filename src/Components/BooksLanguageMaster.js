import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import{
    setbooklang,
    setclearlanguage
}
from './Actions/ActionType';

class BooksLanguageMaster extends Component {

    componentDidMount (){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

          this.props.setclearlanguage()
      
          Notiflix.Loading.Dots('Please wait...');
      
          GetApiCall.getRequest("GetBookLanguageList").then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                BookLanguageData : obj.data
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
            language : this.props.bookcredential.BookLanguage,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddBookLanguageMaster").then((resultBook) =>
        resultBook.json().then(objBook => {
            if(resultBook.status == 200 || resultBook.status == 201){
                this.props.setclearlanguage()
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Language for book successfully added.')
            window.location.reload()
            }else
            {
                Notiflix.Loading.Remove();
                Notiflix.Notify.Failure('Language for book already present.')
            }
        })
        )
    }


     constructor(props){
         super(props)
         this.state = {
            open:false,
            BookLanguageData : [],
            Status : 'Active',
            Id : '',
            openedit : false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
          onChangelang(language){
              this.props.setbooklang(language.target.value)
          }
          Savelang(){
              if(this.props.bookcredential.BookLanguage!=''){
                this.onPost();
              }
              else{
                Notiflix.Notify.Failure('Please enter language for books.')
             }
          }

          Updatelang(){
            if(this.props.bookcredential.BookLanguage!=''){
                Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            bookid : this.state.Id,
            language : this.props.bookcredential.BookLanguage,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"UpdateBookLanguageMaster").then((resultBook) =>
        resultBook.json().then(objBook => {
            if(resultBook.status == 200 || resultBook.status == 201){
                this.props.setclearlanguage()
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Language for book successfully updated.')
            window.location.reload()
            }else
            {
                Notiflix.Loading.Remove();
                Notiflix.Notify.Failure('Language for book already present.')
            }
        })
        )
              }
              else{
                Notiflix.Notify.Failure('Please enter language for books.')
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
      this.props.setclearlanguage()
      this.setState({open : false})
    }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add Book Language</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Language<spna class="mandatory">*</spna></label>
                <input type="text" class="form-control"  value={this.props.bookcredential.BookLanguage}
                onChange={this.onChangelang.bind(this)}
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
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setclearlanguage()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Savelang.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
             

    <Modal class="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
      this.props.setclearlanguage()
      this.setState({openedit : false})
    }}
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Update Book Language</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Language<spna class="mandatory">*</spna></label>
                <input type="text" class="form-control"  value={this.props.bookcredential.BookLanguage}
                onChange={this.onChangelang.bind(this)}
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
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
        })
        this.props.setclearlanguage()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Updatelang.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Book Language Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Book Language Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Language</button>
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
                                        <th>Language</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>


                                {this.state.BookLanguageData.length == 0 ? 
                                 <tr><td colSpan={4} style={{textAlign:'center'}}>No Language for Books Available</td></tr> : 
                                 ''}

                                {this.state.BookLanguageData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_language}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete book language.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            booklangid : data.fld_id,
                                           
                                        
                                            },"DeleteBookLanguageMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Book language successfully deleted.')
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

                                               this.props.setbooklang(data.fld_language)
                                          
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
        bookcredential: state.BookLang
    }
  }
  export default connect(mapStateToProps, {
      setbooklang,
      setclearlanguage
  })
(BooksLanguageMaster);