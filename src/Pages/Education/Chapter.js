import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import PostApiCall from '../../Api';
import GetApiCall from '../../GetApi';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import{
    setNameAccred,
    setclearNameAccred
     }from '../../Action/ActionType';

import CreateChapterModel from '../../Components/Education_Components/CreateChapterModel';


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

class EduChapter extends Component {

  constructor(props){
    super(props)
    this.state = {
       open:false,
       chapterEditData : '',
       imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
       Status : 'Active',
       ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
       Id : '',
       ChapterData: [],
       ImageData : [],
       isActive : 'Yes'
     };
   }

  componentDidMount(){
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
       
      });
      // this.props.dispatch(setclearNameAccred());

  
      Notiflix.Loading.Dots('Please wait...');
      GetApiCall.getRequest("GetChapterMasterList").then(resultdes =>
        resultdes.json().then(obj => {
            this.setState({    
            ChapterData : obj.data
          })
           Notiflix.Loading.Remove()
        }))


        
  }


  saveChapterData = ( chapter_data) =>{
    console.log(chapter_data);
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
            PostApiCall.postRequest({

                id : (JSON.parse(JSON.stringify(obj.data[0]))).ChapterId,
                bgimage : 'https://images.beatmysugar.com/images/Accreditations/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
                
            
          },"UpdateChapterMasterBgImage").then((results1) => 
    
            results1.json().then(obj1 => {  
            if(results1.status == 200 || results1.status==201){
              // this.props.dispatch(setclearNameAccred())
              Notiflix.Loading.Remove();
              Notiflix.Notify.Success('Chapter successfully added.')
              window.location.reload()
    
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
    
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
         
          photoUpload = e =>{
            e.preventDefault();
            if (e.target.files[0].size < 100000) {
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
              this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                ImageData : file
              });
            }
            reader.readAsDataURL(file);
          } else {
            Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
          }
          }

        onChangeName(Name){
          this.props.dispatch(setNameAccred(Name.target.value));
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
          
                      
                      this.props.dispatch(setclearNameAccred())
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Success('Chapter successfully updated.')
                      window.location.reload()
            
                      }
                  }))
              })
          })
        
        }
        else
        {
          this.props.dispatch(setclearNameAccred())
          Notiflix.Loading.Remove();
          Notiflix.Notify.Success('Chapter successfully updated.')
          window.location.reload()
          
        }
              
          }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Chapter already present.')
            }
          })
          )
        }

        UpdateChapters(){
          if(this.state.imagePreviewUrl != null){
            if(this.props.Chapter.Name!=''){
          

              Notiflix.Loading.Dots('Please wait...');
              var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)

              PostApiCall.postRequest ({
                id : this.state.Id,
                name : this.props.Chapter.Name,
                status : this.state.isActive == 'Yes' ? 'Active' : 'Inactive',
                  updatedby : details[0].fld_staffid,
                  updatedon : moment().format('lll')
              },"UpdateChapterMaster").then((resultBrand) =>
              resultBrand.json().then(obj => {
                  if(resultBrand.status == 200 || resultBrand.status == 201){
                    
                    if(JSON.stringify(this.state.ImageData) != '[]')
                    {
                      const form = new FormData();
                 
                      form.append('file', this.state.ImageData);
                      form.append('foldername' , 'Accreditations')
                      form.append('filename' , this.props.Chapter.Name.trim().replace(/\s/g,'-')+'-'+this.state.Id)
                      
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

                      id : this.state.Id,
                      logo : 'https://images.beatmysugar.com/images/Accreditations/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                      updatedby : details[0].fld_staffid,
                      updatedon : moment().format('lll')
                      
                   
                 },"UpdateChapterMasterBgImage").then((results1) => 
           
                   results1.json().then(obj1 => {  
                       if(results1.status == 200 || results1.status==201){
            
                        
                        this.props.dispatch(setclearNameAccred())
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Accreditation successfully updated.')
                        window.location.reload()
              
                       }
                      }))
            
            
                  })
              })
            
            }
            else
            {
              this.props.dispatch(setclearNameAccred())
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Accreditation successfully updated.')
                        window.location.reload()
              
            }
                  
                  }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Accreditationalready present.')
                    }
              })
              )
            }
            else{
              Notiflix.Notify.Failure('Please enter accreditation name.')
           }
          }
          else{
            Notiflix.Notify.Failure('Please upload accreditation logo.')
         }
        }

        deleteChapter=(chapterid)=>{
          Notiflix.Loading.Dots('');         
              PostApiCall.postRequest({    
                chapterid : chapterid,
                },"DeleteChapterMaster").then((results) => 
                
                  results.json().then(obj => {
      
                  if(results.status == 200 || results.status==201){
      
                      Notiflix.Loading.Remove()
                      Notiflix.Notify.Success('Chapter successfully deleted.')
                      window.location.reload()
                  }else
                  {
                      Notiflix.Loading.Remove()
                      Notiflix.Notify.Failure('Something went wrong, try again later.')
                  }
              }))
        }

    render(){
        return(
           <div>
          
                     
            <div className="content-page">
            
            <div className="content">
              { this.state.open === true? <CreateChapterModel 
                open={this.state.open} 
                closeModel={()=>{ this.setState({ open : false, chapterEditData:''})}} 
                saveChapterData={this.saveChapterData}
                chapterEditData={this.state.chapterEditData}
                updateChapterData ={this.updateChapterData}
                />:''}
      
             
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="float-right mt-1">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Education Module</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Chapter Master</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Chapters Master</h4>
                        </div>
                    </div> 

                    <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                        <div className="col text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true,
                                                chapterEditData : ''
                                            })
                                        }}
                                        className="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                className="uil-plus mr-1"></i>Add New Chapter</button>
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
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Duration</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                            
                                {this.state.ChapterData.length == 0 ? 
                                 <tr><td colSpan={6} style={{textAlign:'center'}}>No Chapters Available</td></tr> : 
                                 ''} 
                                {this.state.ChapterData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td><img style={{width:'100px',height: '100px'}} src={data.fld_bgimage} /></td>
                                           <td>{data.fld_title}</td>
                                           <td>{data.fld_description}</td>
                                           <td>{data.fld_duration}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete Accreditation.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                    this.deleteChapter(  data.fld_chapterid )
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
                                              // this.props.dispatch(setNameAccred(data.fld_name));
                                               this.setState({
                                                
                                                chapterEditData : data,
                                                open : true,
                                        
                                               })
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
    Chapter: state.educationChapter
  })
  
  export default connect(mapStateToProps) (EduChapter); 