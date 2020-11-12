import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";
import { Edit,Edit3,Trash2} from 'react-feather';
import { confirmAlert } from 'react-confirm-alert';
import PostApiCall from '../../Api';
import moment from 'moment';

const QuestionForm =(props)=>{
    const [  pageTitle, SetPageTitle ] = useState('Add Question Chapter');
    const [  questionid, SetQuestionid ] = useState('');
    const [ orderno, SetOrderno ] = useState(0);
    const [ Question, SetQuestion ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');
    const [ option, SetOption ] = useState({ fld_optiontext:'', fld_iscorrect:false });
    const [ optionList, SetOptionList ] = useState([]);

    useEffect( ()=>{
        if(props.questionEditData !== ''){
            SetPageTitle("Update Chapter's Question")
            SetQuestionid( props.questionEditData ? props.questionEditData.fld_id : '');            
            SetQuestion(props.questionEditData ? props.questionEditData.fld_questiontext : '');
            SetIsActive(props.questionEditData ? props.questionEditData.fld_status == 1? 'Yes':'No' : '');
            SetOrderno(props.questionEditData ? props.questionEditData.fld_orderno : 0);
            SetOptionList(props.questionEditData ? props.questionEditData.options : []);
        }
     },[props.questionEditData ])


      function isValidate(){
        let flag= true;
   
        if(Question == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter chapter Question.')
        }

        if(optionList.length==0){
            flag = false;
            Notiflix.Notify.Failure('Please add option first!.')
        }
            
        return flag;
      }

      function saveQuestion(){
          if(isValidate()){
            let data ={}
            data.Question = Question;
            data.orderno = orderno;
            data.status = isActive == 'Yes' ? 1 : 0;
            data.options = optionList;
            if(questionid !=''){
                data.id = questionid;
                props.updateQuestionData(data);
            }else{
                props.saveQuestionData(data);
            }
          }
      }

      function AddOptions(){
        if( option && option.fld_optiontext!==''){
            let option_index = optionList.findIndex( item=> item.fld_optiontext === option.fld_optiontext );
            if(option_index === -1){
                if(questionid != ''){
                    Notiflix.Loading.Dots('Please wait...');
                    var login=localStorage.getItem('LoginDetail');
                        var details=JSON.parse(login)
                        PostApiCall.postRequest ({

                            questionid : questionid,
                            optiontext : option.fld_optiontext,
                            iscorrect : 0,
                            orderno : 0,
                            createdon  : moment().format('lll'),
                            updatedon : moment().format('lll'),
                            status : 1
                        },"AddOption").then((resultTopic) =>
                        resultTopic.json().then(objArticleSub => {
                            if(resultTopic.status == 200 || resultTopic.status == 201){
                                debugger
                                console.log(objArticleSub.data[0]);
                                // this.props.setClearArticleSubCategory()
                                Notiflix.Loading.Remove();
                                Notiflix.Notify.Success('Option successfully added.')
                                optionList.push(objArticleSub.data[0]);
                                let questionEditData = props.questionEditData;
                                questionEditData.options = optionList;
                                props.updateQuestionListOptions( questionEditData);
                                SetOption({ fld_optiontext:'', fld_iscorrect:false });
                                SetOptionList(optionList);
                                

                            }else
                            {
                            Notiflix.Loading.Remove();
                            Notiflix.Notify.Failure('Option already present.')
                            }
                        })
                    )

                }else{
                    option.orderno = 0;
                    option.createdon = moment().format('lll');
                    option.updatedon = moment().format('lll');
                    option.status = 1;
                    optionList.push(option);
                    SetOption({ fld_optiontext:'', fld_iscorrect:false });
                    SetOptionList(optionList);
                }
                
            }else{
                SetOption({ fld_optiontext:'', fld_iscorrect:false });
                Notiflix.Notify.Failure('Option already exists!');
            }
            }else{
                Notiflix.Notify.Failure('Please enter Option first!');
            }
        }

        function handleCheckChange( option_data){
        //    let option_index = optionList.findIndex( item=> item.fld_optiontext === option_data.fld_optiontext );
           for(let i=0; i<optionList.length; i++){
               if( optionList[i].fld_optiontext ===  option_data.fld_optiontext){
                optionList[i].fld_iscorrect = true;
               }else{
                optionList[i].fld_iscorrect = false;}
           }

        //    optionList[option_index].fld_iscorrect = true;
            SetOption({ fld_optiontext:'', fld_iscorrect:false });
            SetOptionList(optionList);
        }

        function removeOption( option_id){
            if(option_id){
            Notiflix.Loading.Dots('');

            PostApiCall.postRequest({

                optionid :option_id,
            

            },"DeleteOption").then((results) => 
            
                results.json().then(obj => {

                if(results.status == 200 || results.status==201){
                        optionList.map((option, index)=>{
                        if(option_id === option.fld_id){
                            optionList.splice(index,1);
                        }
                    });

                    let questionEditData = props.questionEditData;
                        questionEditData.options = optionList;
                        props.updateQuestionListOptions( questionEditData);
                        SetOption({ fld_optiontext:'', fld_iscorrect:false });
                        SetOptionList(optionList);

                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Success('Option successfully deleted.')
                    
                }else
                {
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Failure('Something went wrong, try again later.')
                }
            }))
        }else{
            let option_index = optionList.findIndex( item=> item.fld_optiontext === option.fld_optiontext );

            optionList.splice(option_index, 1);
            SetOption({ fld_optiontext:'', fld_iscorrect:false });
            SetOptionList(optionList);
            }
        }

        function updateOption(){
            if( option && option.fld_optiontext!==''){
                let option_index = optionList.findIndex( item=> item.fld_optiontext === option.fld_optiontext );
                if(option_index === -1){
                        Notiflix.Loading.Dots('Please wait...');
                        var login=localStorage.getItem('LoginDetail');
                            var details=JSON.parse(login)
                            PostApiCall.postRequest ({
                                optionid : option.fld_id,
                                questionid : questionid,
                                optiontext : option.fld_optiontext,
                                iscorrect : 0,
                                orderno : 0,
                                createdon  : moment().format('lll'),
                                updatedon : moment().format('lll'),
                                status : 1
                            },"UpdateOption").then((resultTopic) =>
                            resultTopic.json().then(objArticleSub => {
                                if(resultTopic.status == 200 || resultTopic.status == 201){
                                    Notiflix.Loading.Remove();
                                    Notiflix.Notify.Success('Option successfully update.')
                                    let option_index = optionList.findIndex( item=> item.fld_id === objArticleSub.data[0].fld_id );
                                    optionList[option_index] = (objArticleSub.data[0]);
                                    let questionEditData = props.questionEditData;
                                    questionEditData.options = optionList;
                                    props.updateQuestionListOptions( questionEditData);
                                    SetOption({ fld_optiontext:'', fld_iscorrect:false });
                                    SetOptionList(optionList);
                                }else
                                {
                                Notiflix.Loading.Remove();
                                Notiflix.Notify.Failure('Option already present.')
                                }
                            })
                        )
                    
                }else{
                    SetOption({ fld_optiontext:'', fld_iscorrect:false });
                    Notiflix.Notify.Failure('Option already exists!');
                }
                }else{
                    Notiflix.Notify.Failure('Please enter Option first!');
                }
        }

        function handleOptionChange( value){
            if(option.fld_id){
                SetOption({ fld_id :  option.fld_id, fld_optiontext: value, fld_iscorrect: option.fld_iscorrect == 1? true : false });
            }else{
                SetOption({ fld_optiontext: value, fld_iscorrect: false });
            }
        }

        return(
            <React.Fragment>
                 <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{pageTitle}</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12" >

                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Question<span className="mandatory">*</span></label>
                                     <textarea type="text" class="form-control" 
                                        rows="4" cols="10"
                                        value={Question}
                                        onChange={(e)=>{ SetQuestion(e.target.value) }} >
                                        </textarea>
                                </div>
                            </div>
                        
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                                    <label className="radio-inline">
                                    <input type="radio" name="optradio" checked = {isActive == 'Yes' ? true : false} onChange= {()=>{ SetIsActive('Yes'); }}  /> Active
                                    </label>
                                    <label className="radio-inline" style={{marginLeft:'10px'}}>
                                        <input type="radio" name="optradio" checked = {isActive == 'No' ? true : false} onChange= {()=>{SetIsActive('No'); }} /> Inactive
                                    </label> 
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <label for="validationCustom01">Option<span className="mandatory">*</span></label>
                                <input type="text" class="form-control"  value={option.fld_optiontext} onChange={(e)=>{ handleOptionChange( e.target.value )  }} />
                            </div>
                            <div className="col-md-4">  {/*  onClick={ option.fld_id ? updateOption : AddOptions  }} */}
                            {option.fld_id ?
                            <button className="btn btn-primary" style={{float:'left', marginTop: '28px', marginRight:'10px'}} onClick={()=>{ SetOption({ fld_optiontext:'', fld_iscorrect:false }) } } ><span>Cancle</span> </button>:''}
                            <button className="btn btn-primary" style={{float:'left', marginTop: '28px'}} onClick={ option.fld_id ? updateOption : AddOptions  } > {option.fld_id ? 'Update': <span><i className="uil-plus mr-1"></i>Add Opton</span>}  </button>
                            
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">{
                                optionList.map((option,index)=>(
                                    <tr >
                                        <td style={{padding:'5px'}}><input type="checkbox" onChange={ ()=>{ handleCheckChange(option)}}  checked ={ option.fld_iscorrect == true ? true : false} /></td>
                                        <td style={{padding:'5px', width:'200px'}}><label >{option.fld_optiontext} </label></td>
                                        <td style={{padding:'5px'}}><Edit3 style={{marginLeft: '10px'}}
                                            onClick={()=>{
                                                SetOption(option);
                                            }}
                                            
                                            ></Edit3></td>
                                        <td style={{padding:'5px'}}><Trash2
                                            onClick={()=>{
                                            confirmAlert({
                                                title: 'Confirm to Delete',
                                                message: 'Are you sure you want to delete topic.',
                                                buttons: [
                                                {
                                                    label: 'Yes',
                                                    onClick: () => {
                                                        removeOption( option.fld_id);
                                                    }
                                                },
                                                {
                                                    label: 'No',
                                                }
                                                ]
                                            });
                                            }}
                                            /></td>
                                        </tr>
                                        ))
                                    }
                                {/* <br/><br/><br/>
                                <button className="btn btn-primary" type="submit" style={{float:'left'}} >Rest Correct Option</button> */}
                            </div>
                        </div>

                    </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ props.cancleQuestionBlock}>Cancle</button>
                    <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ saveQuestion}>{questionid === '' ?'Save':'update'}</button>
                    <span>

                    </span>
                </div>
              
                </div>
            </React.Fragment>
        )
    
}
export default QuestionForm;