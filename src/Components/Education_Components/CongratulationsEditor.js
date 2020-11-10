import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";
import CKEditor from 'ckeditor4-react';

const CongratulationForm =(props)=>{
    const [  pageTitle, SetPageTitle ] = useState('Add Congratulation');
    const [  CongratulationId, SetCongratulationId ] = useState('');
    const [ Title , SetTitle ] = useState('');
    const [ Description, SetDescription ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');

    useEffect( ()=>{
        debugger;
        if(props.CongratulationsEditData !== ''){
            SetPageTitle('Update Congratulation')
            SetCongratulationId( props.CongratulationsEditData ? props.CongratulationsEditData.fld_id : '');
            SetTitle(props.CongratulationsEditData ? props.CongratulationsEditData.fld_title : '');
            SetDescription(props.CongratulationsEditData ? props.CongratulationsEditData.fld_content : '');
            SetIsActive(props.CongratulationsEditData ? props.CongratulationsEditData.fld_status == 1 ? 'Yes':'No' : '');
        }
     },[props.CongratulationsEditData ])


      function isValidate(){
        let flag= true;
   
        if(Title == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter Congratulation title.')
        }
        if(Description == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter Congratulation description.')
        }
        return flag;
      }

      function saveCongratulation(){
          if(isValidate()){
            let data ={}
            data.title = Title;
            data.description = Description;
            data.status = isActive == 'Yes' ? 1 : 0;
            if(CongratulationId !=''){
                data.id = CongratulationId;
                props.updateCongratulationData(data);
            }else{
                props.saveCongratulation(data);
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
                        <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ props.closeModel}>Cancle</button>
                        <button className="btn btn-primary" type="submit" style={{float:'right'}} onClick={ saveCongratulation}>{ CongratulationId == '' ? 'Save' : 'Update'}</button>
                    <span>

                    </span>
                </div>
              
                </div>
            </React.Fragment>
        )
    
}
export default CongratulationForm;