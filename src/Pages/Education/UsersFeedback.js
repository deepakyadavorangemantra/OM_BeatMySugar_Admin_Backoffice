import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../../Api'
import GetApiCall from '../../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // 
import FeedbackForm from '../../Components/Education_Components/UsersFeedback';
import{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from '../../Components/Actions/ActionType';

class EduUsersFeedback extends Component {

    constructor(props){
        super(props)
        this.state = {
           showFeedback:false,
           FeedbacksEditData :'',
           FeedbacksData :[],
           Numregex : /^[0-9]*$/,
           Status : 'Active',
           Id : '',
         };
       }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'    
          });

          Notiflix.Loading.Dots('Please wait...');
          GetApiCall.getRequest("ListCustomerEducationFeedbackAll").then(resultdes =>
            resultdes.json().then(obj => {
                if(obj.data.length>0){
                    Notiflix.Loading.Dots('Please wait...');
                    let default_chapter = obj.data[0];
                    this.setState({ FeedbacksData : obj.data })
                    
                   
                }else{
                    this.setState({    
                        FeedbacksData : obj.data })
                }
               Notiflix.Loading.Remove()
            }))

        //   this.props.setClearArticleSubCategory()
       
      
        }

  

        saveFeedback=( FeedbackData)=>{
            Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)
                    PostApiCall.postRequest ({
                        title : FeedbackData.title,
                        content : FeedbackData.description,
                        createdon  : moment().format('lll'),
                        updatedon : moment().format('lll'),
                        createdby : details[0].fld_staffid,
                        status : FeedbackData.status
                    },"AddFeedback").then((resultfeedback) =>
                    resultfeedback.json().then(objArticleSub => {
                        if(resultfeedback.status == 200 || resultfeedback.status == 201){
                            // this.props.setClearArticleSubCategory()
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success('Feedback successfully added.')
                            window.location.reload()
                        }else
                        {
                          Notiflix.Loading.Remove();
                          Notiflix.Notify.Failure('Feedback already present.')
                        }
                    })
                )
        }

        updateFeedbackData=(FeedbackData)=>{
            Notiflix.Loading.Dots('Please wait...');
            var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)

                PostApiCall.postRequest ({

                    title : FeedbackData.title,
                    content : FeedbackData.description,
                    status : FeedbackData.status,
                    Feedbackid : FeedbackData.id,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"UpdateFeedback").then((resultfeedback) =>
                resultfeedback.json().then(objArticleSub => {
                    if(resultfeedback.status == 200 || resultfeedback.status == 201){
                        // this.props.setClearArticleSubCategory()
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Feedback successfully updated.')
                        window.location.reload()
                    }else
                    {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure('Feedback already present.')
                    }
                })
            )
    
        }
         
    render(){
        
        return(
           <div>
                    
            <div className="content-page">
            
            <div className="content">  
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="float-right mt-1">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Education Module</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Feedbacks</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Feedbacks Master</h4>
                        </div>
                    </div> 

                    <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                { this.state.showFeedback === true ? 
                                    <FeedbackForm
                                        FeedbacksEditData = {this.state.FeedbacksEditData}
                                        closeModel={()=>{ this.setState({ showFeedback : false, FeedbacksEditData:''})}}
                                        saveFeedback={this.saveFeedback}
                                        updateFeedbackData={this.updateFeedbackData}
                                    />:
                                    <div className="col-md-12 text-right">
                                        <button onClick={()=>{ this.setState({ showFeedback : true }); }}
                                        className="btn btn-primary" id="btn-new-event" data-toggle="modal"><i className="uil-plus mr-1"></i>Add Feedbacks</button>
                                    </div>
                                    }
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
                                        <th>Sr No.</th>
                                        <th>Title</th>
                                        {/* <th>Description</th> */}
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.FeedbacksData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No feedbacks Available this chapter</td></tr> : 
                                 ''} 
                                {this.state.FeedbacksData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                            <td>{index+1}</td>
                                           <td>{data.fld_title}</td>
                                           {/* <td>{data.fld_content}</td> */}
                                           <td style={{color:data.fld_status == '1' ? 'green' : 'red'}}><b>{data.fld_status == 1 ? 'Active' : 'InActive'}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           >
                                               {/* <Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete feedback.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            Feedbackid : data.fld_id,
                                           
                                        
                                            },"DeleteFeedback").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Congratuation successfully deleted.')
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
                                           /> */}
                                           <span>
                                             <Edit3 style={{marginLeft: '10px'}}
                                             onClick={()=>{ this.setState({ showFeedback : true, FeedbacksEditData : data }) }}
                                             
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

const mapStateToProps = state => ({
    
  })


  export default connect(mapStateToProps) (EduUsersFeedback);
