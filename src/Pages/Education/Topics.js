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
import TopicModel from '../../Components/Education_Components/TopicModel';
import{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from '../../Components/Actions/ActionType';

class EduTopics extends Component {

    constructor(props){
        super(props)
        this.state = {
           open:false,
           select_chapter_id: '',
           topicEditData :'',
           TopicsList : [],
           ChapterData :[],
           Numregex : /^[0-9]*$/,
           Status : 'Active',
           Id : '',
           openedit : false,
         };
       }

    componentDidMount(){
        Notiflix.Loading.Init({
            svgColor : '#507dc0'    
          });

          Notiflix.Loading.Dots('Please wait...');
          GetApiCall.getRequest("GetChapterMasterList").then(resultdes =>
            resultdes.json().then(obj => {
                if(obj.data.length>0){
                    Notiflix.Loading.Dots('Please wait...');
                    let default_chapter = obj.data[0];
                    this.setState({ ChapterData : obj.data , select_chapter_id : default_chapter.fld_chapterid})
                    this.handleGetTopicData(default_chapter.fld_chapterid);
                   
                }else{
                    this.setState({    
                        ChapterData : obj.data })
                }
               Notiflix.Loading.Remove()
            }))

        //   this.props.setClearArticleSubCategory()
       
      
        }

        handleGetTopicData=( fld_chapterid)=>{
            GetApiCall.getRequest("ListTopic?chapterid="+ fld_chapterid).then(resultdes =>
                resultdes.json().then(obj => {
                    this.setState({
                        
                    TopicsList : obj.data
                  })
                   Notiflix.Loading.Remove()
                   console.log(obj.data)
                }))
        }
        

        handleChapterChange=(e)=>{
            this.setState({[e.target.name] : e.target.value});
            this.handleGetTopicData( e.target.value);
        }  
  

        handleOrderChange = (order) =>{
            if(this.state.Numregex.test(order.target.value)){
            this.props.setSubOrder(order.target.value)
            }
        }

        saveTopicData=( topicData)=>{
            Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
                    var details=JSON.parse(login)
                    PostApiCall.postRequest ({

                        chapterid : topicData.chapterid,
                        title : topicData.title,
                        content : topicData.description,
                        orderno : topicData.orderno,
                        img_url : '',
                        type : '',
                        createdon  : moment().format('lll'),
                        createdby : details[0].fld_staffid,
                        status : topicData.status
                    },"AddTopic").then((resultTopic) =>
                    resultTopic.json().then(objArticleSub => {
                        if(resultTopic.status == 200 || resultTopic.status == 201){
                            // this.props.setClearArticleSubCategory()
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Success('Topic successfully added.')
                            window.location.reload()
                        }else
                        {
                          Notiflix.Loading.Remove();
                          Notiflix.Notify.Failure('Topic already present.')
                        }
                    })
                )
        }

        updateTopicData=(topicData)=>{
            Notiflix.Loading.Dots('Please wait...');
            var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)

                PostApiCall.postRequest ({

                     title : topicData.title,
                     content: topicData.description,
                     orderno: topicData.orderno,
                     img_url :'',
                     type :'',
                     status : topicData.status,
                     topicid : topicData.id,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"UpdateTopic").then((resultTopic) =>
                resultTopic.json().then(objArticleSub => {
                    if(resultTopic.status == 200 || resultTopic.status == 201){
                        // this.props.setClearArticleSubCategory()
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Topic successfully updated.')
                        window.location.reload()
                    }else
                    {
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Failure('Topic already present.')
                    }
                })
            )
    
        }
         
    render(){
        const { ChapterData, select_chapter_id }= this.state
        return(
           <div>
                    
            <div className="content-page">
            
            <div className="content">   
            { this.state.open === true?
                <TopicModel
                open={this.state.open} 
                topicEditData = {this.state.topicEditData}
                ChapterData= {this.state.ChapterData}
                select_chapter_id={this.state.select_chapter_id}
                closeModel={()=>{ this.setState({ open : false, chapterEditData:''})}}
                saveTopicData={this.saveTopicData}
                updateTopicData={this.updateTopicData}
                />:''} 

                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="float-right mt-1">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Education Module</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Chapter's Topics</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Topic Master</h4>
                        </div>
                    </div> 

                    <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8 text-left">
                                        {/* chapter list */}
                                        <div className="field chapter required">
                                            <label className="label"><span>Chapter</span></label>
                                            <div className="control">
                                                <select id="region_id" name="select_chapter_id"  onChange={this.handleChapterChange} value={select_chapter_id} className="validate-select required-entry" defaultvalue="41" aria-required="true">
                                                    { ChapterData.map( ( chapter, index) => {
                                                        return <option value = {chapter.fld_chapterid}>{chapter.fld_title}</option>
                                                    })}
                                                </select>
                                                {/* {errors.country_id ?  <div  className = "error">{errors.country_id}</div> : '' } */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true
                                            })
                                        }}
                                        className="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                className="uil-plus mr-1"></i>Add New Topic</button>
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
                                        <th>Title</th>
                                        <th>Order</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.TopicsList.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Article Sub Category Available</td></tr> : 
                                 ''} 
                                {this.state.TopicsList.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_title}</td>
                                           <td>{data.fld_orderno}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete topic.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            topicid : data.fld_id,
                                           
                                        
                                            },"DeleteTopic").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('topic successfully deleted.')
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
                                                 open : true,
                                                 topicEditData : data
                                               })

                                            //    this.props.setSubCategoryName(data.fld_subcategory)
                                            //    this.props.setSubOrder(data.fld_order)
                                          
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

const mapStateToProps = state => ({
    ArticleCredential : state.ArticleSubCategory
  })


  export default connect(mapStateToProps) (EduTopics);
