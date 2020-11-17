import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';

const SetAlertForm =(props)=>{
    const [  topicTitle, SetTopicTitle ] = useState('Add Alert');
    const [  buttonText, setButtonText ] = useState('Save');
    const [  topicid, SetAlertid ] = useState('');
    const [ Description, SetDescription ] = useState('');
    const [ isActive, SetIsActive ] = useState(1);
    const [ editDescription, setShowDescription ] =useState(true);

    useEffect( ()=>{
        if( props.topicEditData  && props.topicEditData !== '' ){
            debugger
            SetTopicTitle(  props.topicEditData ? props.topicEditData.fld_id ? 'Alert' : 'Add Alert':'');
            SetAlertid( props.topicEditData ? props.topicEditData.fld_id : '');
            SetDescription(props.topicEditData ? props.topicEditData.fld_emailtext : '');
            SetIsActive(props.topicEditData ? props.topicEditData.fld_status === 1 ? 1 : 0 : '');
            setButtonText('Update');
            setShowDescription(false);
        }
     },[props.topicEditData ])


      function isValidate(){
        let flag= true;
        if(Description == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter alert description.')
        }
        return flag;
      }

      function saveTopic(){
        if(isValidate()){
            let data ={};
            data.description = Description;
            data.status = isActive == '1' ? 1 : 0;
            if(topicid !=''){
                data.id = topicid;
                props.updateTopicData(data);
            }else{
                props.saveAlertData(data);
            }
        }
      }

        return(
            <React.Fragment>
                 <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{topicTitle}</h4>
                </div>
                <div className="modal-body">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12" >
                                { editDescription === true ? 
                                   
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Description<span className="mandatory">*</span></label> 
                                    <CKEditor
                                        config={{
                                        extraPlugins: "justify,font,colorbutton",
                                        }}                                
                                        data={Description}
                                        onChange={(event)=>{  SetDescription(event.editor.getData())}}
                                    />
                                   
                                </div> :
                                <div className="form-group mb-3" dangerouslySetInnerHTML={{__html: Description}}></div>
                                }
                                
                            </div>
                            { editDescription === true ? 
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                                    <label className="radio-inline">
                                    <input type="radio" name="optradio" checked = {isActive == 1 ? true : false} onChange= {()=>{ SetIsActive(1); }}  /> Active
                                </label>
                                <label className="radio-inline" style={{marginLeft:'10px'}}>
                                    <input type="radio" name="optradio" checked = {isActive == 0 ? true : false} onChange= {()=>{SetIsActive(0); }} /> Inactive
                                </label> 
                                </div>
                            </div>:
                            <div className="col-md-6"></div>}
                        </div>
                    </div>
                        </div>
                </div>
                { editDescription === true ? 
                <div className="modal-footer">
                    { topicid != '' ? 
                    <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ ()=>{ setShowDescription(false) }}>Cancle</button>:''}
                    <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ saveTopic }>{ buttonText }</button>
                    <span>

                    </span>
                </div>
                :
                <div className="modal-footer">
                    <button className="btn btn-primary" style={{float:'right'}} onClick={()=>{ setShowDescription(true) }}>Edit</button>
                </div>
                }
              
                </div>
            </React.Fragment>
        )
    
}
export default SetAlertForm;