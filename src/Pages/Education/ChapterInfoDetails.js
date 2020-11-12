import React, { Component } from 'react';
import ChapterForm from '../../Components/Education_Components/ChapterForm';
import TopicListView from '../../Components/Education_Components/TopicList';
import Notiflix from "notiflix";
import moment from 'moment';
import GetApiCall from '../../GetApi';
import PostApiCall from '../../Api';
import TopicForm from '../../Components/Education_Components/TopicEditor';
import QuestionListView from '../../Components/Education_Components/QuestionList';
import QuestionForm from '../../Components/Education_Components/QuestionForm';
import OptionForm from '../../Components/Education_Components/OptionForm';

class ChapterInfoDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
            chapterEditData : this.props.location.state ? this.props.location.state.chapterEditData ? this.props.location.state.chapterEditData : '':'',
            TopicsList : [],
            show_add_topic : false,
            topicEditData : '',
            QuestionList : [],
            show_add_question : false,
            questionEditData : '',
            show_Topic_and_questions: false,
            show_add_option : false,
        }
    }

    componentDidMount(){
        if(this.props.location.state && this.props.location.state.chapterEditData){
            this.setState({ show_Topic_and_questions: true});
            this.handleGetTopicData(this.props.location.state.chapterEditData.fld_chapterid);
            this.handleGetQuestionsData(this.props.location.state.chapterEditData.fld_chapterid);
        }
    }

    handleGetQuestionsData=( fld_chapterid)=>{
        GetApiCall.getRequest("ListQuestion?chapterid="+ fld_chapterid).then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    QuestionList : obj.data
              })
               Notiflix.Loading.Remove();
            }))
    }

    handleGetTopicData=( fld_chapterid)=>{
        GetApiCall.getRequest("ListTopic?chapterid="+ fld_chapterid).then(resultdes =>
            resultdes.json().then(obj => {
                this.setState({
                    
                TopicsList : obj.data
              })
               Notiflix.Loading.Remove();
            }))
    }

    saveChapterData = ( chapter_data) =>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
    
        PostApiCall.postRequest ({
            bgimage : '',
            title: chapter_data.title,
            description: chapter_data.description,
            duration: chapter_data.duration,
            orderno : chapter_data.orderno,
            status: chapter_data.status,
            createdby : details[0].fld_staffid,
            createdon : moment().format('lll')
        },"AddChapterMaster").then((resultAccr) =>
        resultAccr.json().then(obj => {
            if(resultAccr.status == 200 || resultAccr.status == 201){
            const form = new FormData();
                      
            form.append('file', chapter_data.ImageData);
            form.append('foldername' , 'Accreditations')
            form.append('filename' , chapter_data.title.trim().replace(/\s/g,'-')+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).ChapterId)
            
            fetch(this.state.ImageApiUrl, {
            method: 'POST',
            body: form
            }).then((image) => {
            
            image.json().then(data => ({
            data: data,
            status: image.status
            })
            ).then(res => {
                let bgimage = 'https://images.beatmysugar.com/images/Accreditations/'+res.data.Message.split(',')[2].split('=')[1].trim();
                PostApiCall.postRequest({
    
                    id : (JSON.parse(JSON.stringify(obj.data[0]))).ChapterId,
                    bgimage : bgimage,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                    
                
              },"UpdateChapterMasterBgImage").then((results1) => 
                results1.json().then(obj1 => {  
                if(results1.status == 200 || results1.status==201){
                    chapter_data.fld_chapterid=  (JSON.parse(JSON.stringify(obj.data[0]))).ChapterId;
                    chapter_data.fld_bgimage = bgimage;
                    chapter_data.fld_title = chapter_data.title;
                    chapter_data.fld_duration = chapter_data.duration;
                    chapter_data.fld_description = chapter_data.description;
                    chapter_data.fld_status = chapter_data.status;
                    this.setState({ show_Topic_and_questions : true,  chapterEditData : chapter_data});
                    this.props.history.push({pathname:'/edu-chapterInfo', state: {  chapterEditData : chapter_data} })
                  // this.props.dispatch(setclearNameAccred())
                  Notiflix.Loading.Remove();
                  Notiflix.Notify.Success('Chapter successfully added.')
                //   window.location.reload()
        
                }
                }))
            })
        })
          
            }else
              {
                Notiflix.Loading.Remove();
                Notiflix.Notify.Failure(resultAccr.data)
                // Notiflix.Notify.Failure('Chapter already present.')
              }
        })
        )
    }

    updateChapterData =( chapter_data )=>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

          PostApiCall.postRequest ({
            id : chapter_data.id,
            title: chapter_data.title,
            description: chapter_data.description,
            duration: chapter_data.duration,
            orderno : chapter_data.orderno,
            status: chapter_data.status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')

          },"UpdateChapterMaster").then((resultBrand) =>
          resultBrand.json().then(obj => {
              if(resultBrand.status == 200 || resultBrand.status == 201){
                if(JSON.stringify(chapter_data.ImageData) != '[]' && chapter_data.isImageChange === true)
                {
                  const form = new FormData();
              
                  form.append('file', chapter_data.ImageData);
                  form.append('foldername' , 'Accreditations')
                  form.append('filename' , chapter_data.title.trim().replace(/\s/g,'-')+'-'+ chapter_data.id + Math.floor(1000 + Math.random() * 9000))
                  fetch(this.state.ImageApiUrl, {
                  method: 'POST',
                  body: form
                  }).then((image) => {
                  
                  image.json().then(data => ({
                  data: data,
                  status: image.status
                  })
                  ).then(res => {
        
        
                PostApiCall.postRequest({

                  id : chapter_data.id,
                  bgimage : 'https://images.beatmysugar.com/images/Accreditations/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                  updatedby : details[0].fld_staffid,
                  updatedon : moment().format('lll')
                  
                
              },"UpdateChapterMasterBgImage").then((results1) => 
        
                results1.json().then(obj1 => {  
                    if(results1.status == 200 || results1.status==201){
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Chapter successfully updated.')
                    // window.location.reload()
                    }
                }))
            })
        })
      
        }
        else {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Chapter successfully updated.')
            // window.location.reload()
        }
                
        }else
            {
            Notiflix.Loading.Remove();
            Notiflix.Notify.Failure('Chapter already present.')
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

                    let TopicsList = this.state.TopicsList;
                    let findIndex = this.state.TopicsList.findIndex(item => item.fld_id == objArticleSub.data[0].fld_id);
                    TopicsList[findIndex] = objArticleSub.data[0];
                    this.setState( { TopicsList : TopicsList, topicEditData: '', show_add_topic: false } );
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Topic successfully updated.')
                    
                }else
                {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Failure('Topic already present.')
                }
            })
        )
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
                    let TopicsList = this.state.TopicsList;
                    TopicsList.push( objArticleSub.data[0]);
                    // let findIndex = this.state.TopicsList.findIndex(item => item.fld_id == questionEditData.fld_id);
                    // TopicsList[findIndex] = questionEditData;
                    this.setState( { TopicsList : TopicsList, show_add_topic : false } );
                    
                }else
                {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Failure('Topic already present.')
                }
            })
        )
    }

    removeTopicData=(fld_id)=>{
        Notiflix.Loading.Dots('');

        PostApiCall.postRequest({

        topicid :fld_id,
        

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

    saveQuestionData=( question_data )=>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
        PostApiCall.postRequest ({ question : {
            chapterid : this.state.chapterEditData.fld_chapterid,
            questiontext : question_data.Question,
            orderno : question_data.orderno,
            createdon  : moment().format('lll'),
            createdby : details[0].fld_staffid,
            status : question_data.status,
            },
            options : question_data.options,
            },"AddQuestionWithOption").then((resultTopic) =>
            resultTopic.json().then(objArticleSub => {
                if(resultTopic.status == 200 || resultTopic.status == 201){
                    // this.props.setClearArticleSubCategory()
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Question successfully added.')
                    let questionEditData = objArticleSub.data.question;
                        questionEditData.options = objArticleSub.data.options;
                        this.setState({ show_add_question : false, questionEditData:'' });
                        this.addQuestionListOptions(questionEditData);
                }else
                {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Failure('Question already present.')
                }
            })
        )
    }

    updateQuestionData=(question_data)=>{
        Notiflix.Loading.Dots('Please wait...');
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
        PostApiCall.postRequest ({ question : {
            questionid: question_data.id,      
            chapterid : this.state.chapterEditData.fld_chapterid,
            questiontext : question_data.Question,
            orderno : question_data.orderno,
            createdon  : moment().format('lll'),
            createdby : details[0].fld_staffid,
            status : question_data.status
        },
        options : question_data.options,
            
            },"UpdateQuestionWithOption").then((resultTopic) =>
            resultTopic.json().then(objArticleSub => {
                if(resultTopic.status == 200 || resultTopic.status == 201){
                    // this.props.setClearArticleSubCategory()
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Success('Question successfully update.')
                    let questionEditData = objArticleSub.data.question[0];
                        questionEditData.options = objArticleSub.data.options;
                        this.setState({ show_add_question : false , questionEditData:''});
                    this.updateQuestionListOptions(questionEditData);
                }else
                {
                    Notiflix.Loading.Remove();
                    Notiflix.Notify.Failure('Question already present.')
                }
            })
        )
    }

    removeQuestionData =(ques_id)=>{

        Notiflix.Loading.Dots('');

        PostApiCall.postRequest({

            questionid :ques_id,
        

        },"DeleteQuestion").then((results) => 
        
            results.json().then(obj => {

            if(results.status == 200 || results.status==201){
                let QuestionList =this.state.QuestionList
                    QuestionList.map((Question, index)=>{
                    if(ques_id === Question.fld_id){
                        QuestionList.splice(index,1);
                    }
                });

                this.setState({ QuestionList : QuestionList});

                Notiflix.Loading.Remove()
                Notiflix.Notify.Success('Question successfully deleted.')
                
            }else
            {
                Notiflix.Loading.Remove()
                Notiflix.Notify.Failure('Something went wrong, try again later.')
            }
        }))
    }

    updateQuestionListOptions=( questionEditData)=>{
        let QuestionList = this.state.QuestionList;
        let findIndex = this.state.QuestionList.findIndex(item => item.fld_id == questionEditData.fld_id);
        QuestionList[findIndex] = questionEditData;
        this.setState( { QuestionList : QuestionList } );
    }

    addQuestionListOptions=(questionEditData)=>{
        let QuestionList = this.state.QuestionList;
        QuestionList.push(questionEditData);
        this.setState( { QuestionList : QuestionList } );
    }

    render(){
        return(
            <div className="content-page">
            
                <div className="content">
                    <div className="container-fluid">
                        <div className="row page-title">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb" className="float-right mt-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Chapter Module</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Chapter Info</li>
                                    </ol>
                                </nav>
                                <h4 className="mb-1 mt-0">Chapters Infomation</h4>
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <ChapterForm 
                                            chapterEditData={this.state.chapterEditData}
                                            saveChapterData={this.saveChapterData}
                                            updateChapterData={this.updateChapterData}
                                        />
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className="row">
                        { this.state.show_Topic_and_questions === true ? 
                        <div className="col-12">       
                            <div className="card">
                                <div className="card-body"> 
                                { this.state.show_add_topic  === true ? 
                                    <div className="row align-items-center">
                                        <TopicForm  
                                            topicEditData = {this.state.topicEditData} 
                                            chapterEditData={this.state.chapterEditData} 
                                            cancleTopicBlock = {()=>{ this.setState({ show_add_topic : false, topicEditData: '' })}}
                                            updateTopicData={this.updateTopicData}
                                            saveTopicData={this.saveTopicData}
                                            
                                            /><br/>
                                    </div>
                                    
                                    :
                                    <div className="col text-right">
                                        <button onClick={()=>{  this.setState({ show_add_topic : true })  }} className="btn btn-primary" id="btn-new-event" >
                                            <i className="uil-plus mr-1"></i>Add New Topic
                                        </button><br/>
                                    </div>  
                                }
                                    <TopicListView 
                                        TopicsList ={this.state.TopicsList} 
                                        editTopic = { (data)=>{ this.setState({ topicEditData : data, show_add_topic : true}) }}
                                        removeTopicData={this.removeTopicData}
                                        /> 
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                    <div className="row">
                        { this.state.show_Topic_and_questions === true ? 
                        <div className="col-12">       
                            <div className="card">
                                <div className="card-body"> 
                                { this.state.show_add_question  === true ? 
                                    <div className="row align-items-center">
                                        <QuestionForm  
                                            questionEditData = {this.state.questionEditData} 
                                            chapterEditData={this.state.chapterEditData} 
                                            cancleQuestionBlock = {()=>{ this.setState({ show_add_question : false, questionEditData: '' })}}
                                            saveQuestionData={this.saveQuestionData}
                                            updateQuestionData={this.updateQuestionData}
                                            updateQuestionListOptions = { this.updateQuestionListOptions }
                                            /><br/>
                                    </div>
                                    :  this.state.show_add_option === true ?
                                        <OptionForm  
                                            questionEditData = {this.state.questionEditData} 
                                            chapterEditData={this.state.chapterEditData} 
                                        />
                                    :
                                    <div className="col text-right">
                                        <button onClick={()=>{  this.setState({ show_add_question : true })  }} className="btn btn-primary" id="btn-new-event" >
                                            <i className="uil-plus mr-1"></i>Add New Question
                                        </button><br/>
                                    </div>  
                                }
                                    <QuestionListView 
                                        QuestionList ={this.state.QuestionList} 
                                        editQuestion = { (data)=>{ this.setState({ questionEditData : data, show_add_question : true}) }}
                                        editOption = { (data)=> { this.setState({ questionEditData : data, show_add_option : true}) }}
                                        removeQuestionData = { this.removeQuestionData }
                                        /> 
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                </div>
            </div> 
        )
    }
}
export default ChapterInfoDetails;