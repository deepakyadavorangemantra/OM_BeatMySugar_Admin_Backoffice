import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import {Edit3,Trash2} from 'react-feather';
import { confirmAlert } from 'react-confirm-alert'; // 
import { connectAdvanced } from 'react-redux';
import PostApiCall from '../../Api';
import TopicReactQuillTextEditor from './TopicQuillTextEditor';

const TopicForm =(props)=>{

    const [ values, setValues] = useState([{ fld_id : '', fld_content : '', fld_orderno : 1, createdon  : moment().format('lll'), updatedon : moment().format('lll')}]);

    const [ topicTitle, SetTopicTitle ] = useState('Add Topic Chapter');
    const [ topicid, SetTopicid ] = useState('');
    const [ orderno, SetOrderno ] = useState(0);
    const [ Title , SetTitle ] = useState('');
    const [ Description, SetDescription ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');
    const [ check, setCheck ] = useState(false);

    useEffect( ()=>{
        if(props.topicEditData !== ''){
            SetTopicTitle('Update Topic Chapter');
            SetTopicid( props.topicEditData ? props.topicEditData.fld_id : '');
            SetTitle(props.topicEditData ? props.topicEditData.fld_title : '');
            SetDescription(props.topicEditData ? props.topicEditData.fld_content : '');
            SetIsActive(props.topicEditData ? props.topicEditData.fld_status === 'Active'? 'Yes':'No' : '');
            SetOrderno(props.topicEditData ? props.topicEditData.fld_orderno : 0);
            setValues(props.topicEditData ? props.topicEditData.contents : [{ fld_id : '', fld_content : '', fld_orderno : 1, createdon  : moment().format('lll'), updatedon : moment().format('lll')}])
        }
     },[props.topicEditData ])

     

      function isValidate(){
        let flag= true;
   
        if(Title == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter topic title.')
        }
        if(values.length === 0){
            flag = false;
            Notiflix.Notify.Failure('Please enter topic content.')
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
            data.contents = values;
            if(topicid !=''){
                data.id = topicid;
                props.updateTopicData(data);
            }else{
                props.saveTopicData(data);
            }
        }
      }

      
    function handleChange( event, i) {
        values[i].fld_content = event //event.editor.getData();
        setValues (values);
        setCheck(!check);
    }

    function removeContent(i){
        if(values[i].fld_id !=''){
            
            Notiflix.Loading.Dots('');

            PostApiCall.postRequest({

                contentid : values[i].fld_id,
            

            },"DeleteTopicContent").then((results) => 
            
                results.json().then(obj => {

                if(results.status == 200 || results.status==201){
                    values.splice(i,1);
                    setValues (values);
                    setCheck(!check);

                    let topicEditData =  props.topicEditData;
                        topicEditData.contents = values;
                        props.updateTpoicListContent( topicEditData);
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Success('Option successfully deleted.')
                    
                }else
                {
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Failure('Something went wrong, try again later.')
                }
            }));
            // props.updateTpoicListContent(values[i].fld_id);
        }else{
            values.splice(i,1);
            setValues (values);
            setCheck(!check);
        }
        
     }

    function addClick(){
        let new_order= values.length;
        if(values.length>0){
            new_order = Math.max.apply(Math, values.map(function(o) { return o.fld_orderno; }))
        }
        values.push({ id : '', fld_content : '', fld_orderno : new_order+1, createdon  : moment().format('lll'), updatedon : moment().format('lll')});
        setValues(values);
        setCheck(!check);
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
                                    <label for="validationCustom01">Content <span className="mandatory">*</span></label>
                                    <div className="form-group mb-3">
                                    
                                        {values.map((item, i) => 
                                            // <li>
                                            <div className="col-md-12">
                                                <div style={{ display:'flex', marginTop:'10px'}} key={i}>
                                                    <label style={{ padding:'10px', fontWeight:'bold'}} for="validationCustom01">{item.fld_orderno}. </label>
                                                    <div style={{ padding:'10px', fontWeight:'bold', width : '90%'}}>
                                                        <TopicReactQuillTextEditor 
                                                            html={item.fld_content||''}
                                                            onChange={(e)=>handleChange(e, i)}
                                                        />
                                                    </div>
                                                    

                                                    {/* <CKEditor   
                                                        config={{
                                                        extraPlugins: "justify,font,colorbutton",
                                                        }}                                
                                                        data={item.fld_content||''}
                                                        // onChange={(event)=>{  SetDescription(event.editor.getData())}}
                                                        onChange={(e)=>handleChange(e, i)}
                                                    /> */}
                                                {/* <input type="text" value={el.description||''} onChange={(e)=>handleChange(e, i)} /> */}
                                                    <div style={{ padding:'10px', fontWeight:'bold'}}>
                                                    <Trash2
                                                        
                                                        onClick={()=>{
                                                        confirmAlert({
                                                            title: 'Confirm to Delete',
                                                            message: 'Are you sure you want to delete content.',
                                                            buttons: [
                                                            {
                                                                label: 'Yes',
                                                                onClick: () => {
                                                                    removeContent(i)
                                                                    // this.props.removeTopicData( data.fld_id);
                                                                }
                                                            },
                                                            {
                                                                label: 'No',
                                                            }
                                                            ]
                                                        });
                                                        }}
                                                    /></div>
                                                </div>     
                                            </div>  
                                            // </li>   
                                        )}   
                                        
                                        <button className="btn btn-primary" type="submit" style={{marginTop:'10px', marginLeft:'3%'}} onClick={ ()=> addClick()}>{ values.length > 0 ?'Add more':'Add Content'}</button>
                                    </div>
                                    
                                    {/* <CKEditor
                                            config={{
                                            extraPlugins: "justify,font,colorbutton",
                                            }}                                
                                            data={Description}
                                            onChange={(event)=>{  SetDescription(event.editor.getData())}}
                                    /> */}
                                </div>
                            </div>
                        
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                                    <label className="radio-inline">
                                    <input type="radio" checked = {isActive == 'Yes' ? true : false} onChange= {()=>{ SetIsActive('Yes'); }}  /> Active
                                </label>
                                <label className="radio-inline" style={{marginLeft:'10px'}}>
                                    <input type="radio" checked = {isActive == 'No' ? true : false} onChange= {()=>{SetIsActive('No'); }} /> Inactive
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