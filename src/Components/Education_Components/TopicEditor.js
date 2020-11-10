import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';

const TopicForm =(props)=>{
    const [  topicTitle, SetTopicTitle ] = useState('Add Topic Chapter');
    const [  topicid, SetTopicid ] = useState('');
    const [ orderno, SetOrderno ] = useState(0);
    const [ Title , SetTitle ] = useState('');
    const [ Description, SetDescription ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');

    useEffect( ()=>{
        if(props.topicEditData !== ''){
            SetTopicTitle('Update Topic Chapter')
            SetTopicid( props.topicEditData ? props.topicEditData.fld_id : '');
            SetTitle(props.topicEditData ? props.topicEditData.fld_title : '');
            
            SetDescription(props.topicEditData ? props.topicEditData.fld_content : '');
            SetIsActive(props.topicEditData ? props.topicEditData.fld_status === 'Active'? 'Yes':'No' : '');
            SetOrderno(props.topicEditData ? props.topicEditData.fld_orderno : 0);
        }
     },[props.topicEditData ])


      function isValidate(){
        let flag= true;
   
        if(Title == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter chapter title.')
        }
        if(Description == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter chapter description.')
        }
        return flag;
      }

      function saveTopic(){
          if(isValidate()){
            let data ={}
            data.chapterid = props.chapterEditData.fld_chapterid;
            data.title = Title;
            data.description = Description;
            data.orderno = orderno;
            data.status = isActive == 'Yes' ? 'Active' : 'Inactive';
            if(topicid !=''){
                data.id = topicid;
                props.updateTopicData(data);
            }else{
                props.saveTopicData(data);
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
                                {/* <div className="form-group mb-3">
                                    <label for="validationCustom01">Chapter<span className="mandatory">*</span></label>
                                       
                                            <input type="text" className="form-control" 
                                                value={props.chapterEditData.fld_title}
                                                disabled
                                               />
                                          
                                    </div> */}

                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Title<span className="mandatory">*</span></label>
                                    <input type="text" className="form-control" 
                                    value={Title}
                                    onChange={(e)=>{ SetTitle(e.target.value) }}/>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Description<span className="mandatory">*</span></label>
                                   
                                    <CKEditor
                                            config={{
                                            extraPlugins: "justify,font,colorbutton",
                                            }}                                
                                            data={Description}
                                            onChange={(event)=>{  SetDescription(event.editor.getData())}}
                                    />
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
                <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ props.cancleTopicBlock}>Cancle</button>
                <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ saveTopic}>Save</button>
                    <span>

                    </span>
                </div>
              
                </div>
            </React.Fragment>
        )
    
}
export default TopicForm;