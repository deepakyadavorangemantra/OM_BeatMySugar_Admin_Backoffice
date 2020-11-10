import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";

const QuestionForm =(props)=>{
    const [  pageTitle, SetPageTitle ] = useState('Add Question Chapter');
    const [  questionid, SetQuestionid ] = useState('');
    const [ orderno, SetOrderno ] = useState(0);
    const [ Question, SetQuestion ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');

    useEffect( ()=>{
        if(props.questionEditData !== ''){
            SetPageTitle("Update Chapter's Question")
            SetQuestionid( props.questionEditData ? props.questionEditData.fld_id : '');            
            SetQuestion(props.questionEditData ? props.questionEditData.fld_questiontext : '');
            SetIsActive(props.questionEditData ? props.questionEditData.fld_status == 1? 'Yes':'No' : '');
            SetOrderno(props.questionEditData ? props.questionEditData.fld_orderno : 0);
        }
     },[props.questionEditData ])


      function isValidate(){
        let flag= true;
   
        if(Question == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter chapter Question.')
        }
        return flag;
      }

      function saveQuestion(){
          if(isValidate()){
            let data ={}
            data.Question = Question;
            data.orderno = orderno;
            data.status = isActive == 'Yes' ? 1 : 0;
            if(questionid !=''){
                data.id = questionid;
                props.updateQuestionData(data);
            }else{
                props.saveQuestionData(data);
            }
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
                                {/* <div className="form-group mb-3">
                                    <label for="validationCustom01">Chapter<span className="mandatory">*</span></label>
                                       
                                            <input type="text" className="form-control" 
                                                value={props.chapterEditData.fld_title}
                                                disabled
                                               />
                                          
                                    </div> */}

                            
                                
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
                    </div>
                    </div>
                </div>
                <div className="modal-footer">
                <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ props.cancleQuestionBlock}>Cancle</button>
                <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ saveQuestion}>Save</button>
                    <span>

                    </span>
                </div>
              
                </div>
            </React.Fragment>
        )
    
}
export default QuestionForm;