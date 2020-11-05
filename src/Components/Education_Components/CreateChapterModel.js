import React, { useEffect, useState } from 'react';
import Modal from 'react-responsive-modal';
import Notiflix from "notiflix";
import { Flag } from 'react-feather';

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input
      accept="image/*"
      id="photo-upload" type="file" onChange={onChange}/> 
    </label>
    
const CreateChapterModel =(props)=>{
    const [ chapterid, SetChapterid ] = useState('');
    const [ orderno, SetOrderno ] = useState(0);
    const [ Title , SetTitle ] = useState('');
    const [ Duration , SetDuration ] = useState('');
    const [ Description, SetDescription ] = useState('');
    const [ isActive, SetIsActive ] = useState('Yes');
    const [ AccreData, SetAccreData ] =useState([]);
    const [ ImageData, SetImageData ] = useState([]);
    const [ file, SetFile ] = useState('');
    const [ imagePreviewUrl, setImagePreviewUrl] = useState('https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png');

    useEffect( ()=>{
        if(props.chapterEditData !== ''){
            SetChapterid( props.chapterEditData ? props.chapterEditData.fld_chapterid : '');
            SetTitle(props.chapterEditData ? props.chapterEditData.fld_title : '');
            SetDuration(props.chapterEditData ? props.chapterEditData.fld_duration : '');
            SetDescription(props.chapterEditData ? props.chapterEditData.fld_description : '');
            SetIsActive(props.chapterEditData ? props.chapterEditData.fld_status === 'Active'? 'Yes':'No' : '');
            SetOrderno(props.chapterEditData ? props.chapterEditData.fld_orderno : 0);
            setImagePreviewUrl(props.chapterEditData ? props.chapterEditData.fld_bgimage : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png');
            SetImageData(props.chapterEditData ? props.chapterEditData.fld_bgimage : []);
        }
     },[])

    function photoUpload (e){
        e.preventDefault();
        if (e.target.files[0].size < 100000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            SetFile(file);
            setImagePreviewUrl(reader.result);
            SetImageData(file);
        }
        reader.readAsDataURL(file);
      } else {
        Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
      }
      }

      function isValidate(){
        let flag= true;
        if(JSON.stringify(ImageData) == '[]'){
            flag = false;
            Notiflix.Notify.Failure('Please upload thumbnail image.');
        }
        if(Title == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter chapter title.')
        }
        if(Duration == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter time duration of chapter.')
        }
        if(Description == ''){
            flag = false;
            Notiflix.Notify.Failure('Please enter chapter description.')
        }
        return flag;
      }

      function saveChapter(){
          if(isValidate()){
            let data ={}
            data.ImageData = ImageData;
            data.title = Title;
            data.description = Description;
            data.duration = Duration;
            data.orderno = orderno;
            data.status = isActive == 'Yes' ? 'Active' : 'Inactive';
            if(chapterid !=''){
                data.id = chapterid;
                props.updateChapterData(data);
            }else{
                props.saveChapterData(data);
            }
          }
      }

    return(
        <React.Fragment>
            <Modal className="modal-content"  
                open={ props.open}
                
                onClose={()=>{
                props.closeModel();
                // this.props.dispatch(setclearNameAccred())
                }}
                center>

                <div className="modal-content modelcontent3">
                <div className="modal-header">
                    <h4 className="modal-title">Add New Chapter</h4>
                </div>
                <div className="modal-body">
                        <div className="row">
                        <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label for="validationCustom01">Thumbnail Image<span className="mandatory">*</span></label>
                        <div className="div1">
                            <ImgUpload onChange={photoUpload} src={ imagePreviewUrl }/>
                        
                    </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12" style={{    marginTop: '28px'}}>
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Title<span className="mandatory">*</span></label>
                                    <input type="text" className="form-control" 
                                    value={Title}
                                    onChange={(e)=>{ SetTitle(e.target.value) }}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Duration<span className="mandatory">*</span></label>
                                    <input type="time" className="form-control" 
                                    value={Duration}
                                    onChange={(e)=>{ SetDuration(e.target.value) }}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="validationCustom01">Description<span className="mandatory">*</span></label>
                                    <input type="text" className="form-control" 
                                    value={Description}
                                    onChange={(e)=>{ SetDescription(e.target.value) }}/>
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
                <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
                    // this.setState({
                    //     open : false,
                    //     imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
                    //     isActive : 'Yes'
                    // })
                    props.closeModel();
                    // this.props.dispatch(setclearNameAccred())
                }}>Close</button>
                
                <button className="btn btn-primary" type="submit" style={{float:'right'}}
                onClick={ saveChapter}>Save</button>
                    <span>

                    </span>
                </div>
              
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default CreateChapterModel;