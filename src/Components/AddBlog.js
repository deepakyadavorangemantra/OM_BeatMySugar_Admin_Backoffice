/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Notiflix from 'notiflix';
import Select from 'react-select';
import {
    setCategory,
    setSubCategory,
    setArticalTitle,
    setShortDescription,
    setArticalContent,
    setTages,
    setWrittenByWhome,
    setReviewedBy,
    setShowOnWebsite,
    setClearArticle
} from './Actions/ActionType'
import { connect } from 'react-redux';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api';
import moment from 'moment';
// import * from '@ckeditor/ckeditor5-editor-inline/src/col'

const ImgUpload = ({
    onChange,
    src
}) =>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
            <img for="photo-upload" src={src} style={{ width: '100%', height: '100%', borderRadius: '5%' }} />
        </div>
        <input
        accept="image/*"
        id="photo-upload" type="file" onChange={onChange} />
    </label>


const ImgUploadCover = ({
    onChange,
    src
}) =>
    <label htmlFor="photo-upload-1" className="custom-file-upload fas" style={{width: '100%',borderRadius : '10px'}}>
        <div className="img-wrap1 img-upload1" >
            <img for="photo-upload-1" src={src} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
        </div>
        <input
        accept="image/*"
        id="photo-upload-1" type="file" onChange={onChange} />
    </label>

class AddBlog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle: '1',
            Page1: 'Pending',
            Page2: 'Pending',
            Page3: 'Pending',
            Page4: 'Pending',
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            imagePreviewUrlCover: 'assets/images/blog.png',
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
            Show: 'Yes',
            Tags : [],

            CategoryData : [],
            SubCategoryData : [],
            TagData : [],
            ContributorsData : [],
            ImageDataPreview : [],
            ImageDataCover : []
        };
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);


        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

          this.props.setClearArticle()
       
          Notiflix.Loading.Dots('');

          GetApiCall.getRequest("GetArticleCategory").then(resultdes =>
              resultdes.json().then(obj => {
                this.props.setCategory(obj.data[0].value)
              // console.log(obj.data)
                this.setState({
                   CategoryData : obj.data
                })
  
              }))


              GetApiCall.getRequest("GetArticleSubCategory").then(resultdes =>
                resultdes.json().then(obj => {
               
                // console.log(obj.data)
                
                  this.setState({
                     SubCategoryData : obj.data
                  })
                }))

                GetApiCall.getRequest("GetBlogContributors").then(resultdes =>
                    resultdes.json().then(obj => {
                   
                    // console.log(obj.data)
                    
                      this.setState({
                         ContributorsData : obj.data
                      })
                    }))

              GetApiCall.getRequest("GetArticleTags").then(resultdes =>
                resultdes.json().then(obj => {
               
                // console.log(obj.data)
                
                  this.setState({
                    TagData : obj.data
                  })
                  Notiflix.Loading.Remove();
                }))
    
    }
    photoUpload = e => {
        e.preventDefault();
        if (e.target.files[0].size < 100000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                ImageDataPreview : file
            });
        }
        reader.readAsDataURL(file);
    }else {
        Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
      }
    }

    photoUploadCover = e => {
        e.preventDefault();
        if (e.target.files[0].size < 200000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrlCover: reader.result,
                ImageDataCover : file
            });
        }
        reader.readAsDataURL(file);
    }else {
            Notiflix.Notify.Failure("File too large, upload file less than 200 kb.");
          }
    }

    handleCategoryChange = event => {
        this.props.setCategory(event.target.value)
    }

    handleSubCategoryChange = event => {
    
        this.props.setSubCategory(event.target.value)
    }

    handleArticalTitleChange = event => {
        if(event.target.value.length <= 160){
        this.props.setArticalTitle(event.target.value)
        }
    }
    handleShortDescriptionChange = event => {
        this.props.setShortDescription(event.editor.getData())
    }

    handleArticalContentChange = event => {
        this.props.setArticalContent(event.editor.getData())
    }

    handleTagesChange = event => {
        this.props.Tages(event.target.value)
    }

    handleWrittenByWhomeChange = event => {
        this.props.setWrittenByWhome(event.target.value)
    }

    handleReviewedByChange = event => {
        this.props.setReviewedBy(event.target.value)
    }

    handleNextChange = () => {
                if (this.props.blog.ArticalTitle != '') {
                    if (this.props.blog.ShortDescription != '') {
                        if(((this.props.blog.ShortDescription.replace( /(<([^>]+)>)/ig, '').trim()).length) < 600) {
                        if (this.props.blog.ArticalContent != '') {
                           
                                    
                                        this.setState({
                                            PageTitle: '2',
                                            Page1: 'Done'
                                        })
                                   
                              
                        }else{Notiflix.Notify.Failure('Please enter article content.')}
                    }else{Notiflix.Notify.Failure('Please enter short description with maximum 600 characters.')}
                    }else{Notiflix.Notify.Failure('Please enter short description.')}
                }else{Notiflix.Notify.Failure('Please enter article title.')}
   
    }


    SavePreviewImage(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        const form = new FormData();
                             
        form.append('file', this.state.ImageDataPreview);
        form.append('foldername' , 'Article')
        form.append('filename' , 'Preview-'+(JSON.parse(JSON.stringify(obj.data[0]))).ArticleId)
        
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
  
                id : (JSON.parse(JSON.stringify(obj.data[0]))).ArticleId,
                photo : 'https://images.beatmysugar.com/images/Article/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
                
             
           },"UpdateArticlePreviewPhoto").then((results1) => 
     
             results1.json().then(obj1 => {  
             if(results1.status == 200 || results1.status==201){
  
                this.SaveCoverImage(obj)
              
             }
            }))
  
  
        })
    })
       

    }

    SaveCoverImage(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        const form = new FormData();
                             
        form.append('file', this.state.ImageDataCover);
        form.append('foldername' , 'Article')
        form.append('filename' , 'Cover-'+(JSON.parse(JSON.stringify(obj.data[0]))).ArticleId)
        
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
  
                id : (JSON.parse(JSON.stringify(obj.data[0]))).ArticleId,
                photo : 'https://images.beatmysugar.com/images/Article/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll')
                
             
           },"UpdateArticleCoverPhoto").then((results1) => 
     
             results1.json().then(obj1 => {  
             if(results1.status == 200 || results1.status==201){
  
                this.SaveTags(obj)
              
             }
            }))
  
  
        })
    })
       

    }


    SaveTags(obj){

        if(this.state.Tags.length > 0){
        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)

        var count = 0

        for(var i=0 ; i<this.state.Tags.length;i++){

            PostApiCall.postRequest({
                articleid : (JSON.parse(JSON.stringify(obj.data[0]))).ArticleId,
                tagid : this.state.Tags[i].value,
                updatedby : details[0].fld_staffid,
                updatedon : moment().format('lll'),
                     },"AddArticleTagMapping").then((results1) => 
            
               // const objs = JSON.parse(result._bodyText)
               results1.json().then(obj1 => {
    
               if(results1.status == 200 || results1.status==201){

                count = count + 1

                if(count == this.state.Tags.length){

                    this.props.setClearArticle()

                    this.setState({
                        PageTitle: '4',
                        Page4: 'Done'
                    })

                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Success('Article successfully added.')
                    window.location.href = '/articlelist'
                }

               }
            }))

        }
    }else
    {
        this.props.setClearArticle()

                    this.setState({
                        PageTitle: '4',
                        Page4: 'Done'
                    })

                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Success('Article successfully added.')
                    window.location.href = '/articlelist'
    }
    }

    handleSubmitChange = () => {
        if(this.props.blog.WrittenByWhome != ''){

            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
              
    
   
            Notiflix.Loading.Dots('');
                
                PostApiCall.postRequest({
                     categoryid : this.props.blog.Category,
                     subcategoryid : this.props.blog.SubCategory,
                     title : this.props.blog.ArticalTitle,
                     shortdescription : this.props.blog.ShortDescription,
                     content : this.props.blog.ArticalContent,
                     writtenbyid : this.props.blog.WrittenByWhome,
                     reviewedbyid : this.props.blog.ReviewedBy,
                     showonwebsite :this.state.Show,
                     lastsavedon : '',
                     updatedby : details[0].fld_staffid,
                     updatedon : moment().format('lll'),
                          },"AddArticle").then((results) => 
                 
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(obj => {
             
                 
                    if(results.status == 200 || results.status==201){


                        this.SavePreviewImage(obj)

                    
        }else{
            Notiflix.Loading.Remove()
            Notiflix.Notify.Failure(obj.data)
        }
    }))
            // console.log(this.state.Show == 'Yes' ?  'Show' : 'Dont Show')
        }else{
            Notiflix.Notify.Failure('Please select the name of person who wrote the article.')
        }
        

    }

    handleImageSubmit(){
        if(JSON.stringify(this.state.ImageDataPreview) != '[]'){
            if(JSON.stringify(this.state.ImageDataCover) != '[]'){
        this.setState({
            PageTitle: '3',
            Page2: 'Done'
        })
    }else{Notiflix.Notify.Failure('Please upload article cover image.')}
    }else{Notiflix.Notify.Failure('Please upload article preview image.')}
    }


    handleTagSubmit(){
        this.setState({
            PageTitle: '4',
            Page3: 'Done'
        })
    }


    render() {
        return (
            <div className="App">
                <div id="wrapper">
                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">
                                <div className="row page-title">
                                    <div className="col-md-12">
                                        <nav aria-label="breadcrumb" className="float-right mt-1">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="#">Health Knowledge</a></li>
                                                <li className="breadcrumb-item"><a href="/articlelist">Article List</a></li>

                                                <li className="breadcrumb-item active" aria-current="page">Add New Article</li>
                                            </ol>
                                        </nav>
                                        <h4 className="mb-1 mt-0">Add New Article</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div id="smartwizard-arrows">
                                                    <ul>
                                                        <li className={this.state.PageTitle == '1' ? 'active nav-item' : this.state.Page1 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {
                                                            this.setState({
                                                                PageTitle: '1',
                                                                Page1: 'Done'
                                                            })
                                                        }} className="wizardlist nav-link">Article Content</a></li>


                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            className="wizardlist nav-link">Article Images</a></li>

                                                         <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page3 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '3',
                                                                    Page3: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            className="wizardlist nav-link">Article Tags</a></li>

                                                        <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page4 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '4',
                                                                    Page4: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            className="wizardlist nav-link">Article Status</a></li>

                                                    </ul>
                                                    <div className="p-3" style={{ minHeight: '0px' }}>
                                                        <div id="sw-arrows-step-1"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '1' ? 'block' : 'none' }}
                                                        >
                                                            <form className="needs-validation" novalidate onSubmit={(e) => {
                                                                e.preventDefault()
                                                            }}>
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Article Content</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Category<span className="mandatory">*</span></label>

                                                                                    <select className="form-control custom-select"
                                                                                        value={this.props.blog.Category}
                                                                                        onChange={this.handleCategoryChange}
                                                                                    >
                                                                                         {this.state.CategoryData.map(cat => (
                           
                                                                                                <option key={cat.value} value={cat.value}>
                                                                                                    {cat.label}
                                                                                                </option>
                                                                                                ))}

                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Sub Category</label>

                                                                                    <select className="form-control custom-select"
                                                                                        value={this.props.blog.SubCategory}
                                                                                        onChange={this.handleSubCategoryChange}
                                                                                    >
                                                                                  <option value={0}></option>
                                                                                      {this.state.SubCategoryData.map(cat => (
                           
                                                                                                    <option key={cat.value} value={cat.value}>
                                                                                                        {cat.label}
                                                                                                    </option>
                                                                                                    ))}

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Article title (160 characters)<span className="mandatory">*</span></label>
                                                                                    <input type="text" className="form-control"
                                                                                        value={this.props.blog.ArticalTitle}
                                                                                        onChange={this.handleArticalTitleChange}
                                                                                    ></input>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Short Description (600 characters)                                                                    <span className="mandatory">*</span></label>

                                                                                    <div className="niceeditors">
                                                                                        <CKEditor
                                                                                            config={{
                                                                                                extraPlugins: "justify,font,colorbutton",
                                                                                             }}
                                                                                            data={this.props.blog.ShortDescription}
                                                                                            onChange={this.handleShortDescriptionChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Article Content<span className="mandatory">*</span></label>

                                                                                    <div className="niceeditors">
                                                                                        <CKEditor
                                                                                       config={{
                                                                                        extraPlugins: "justify,font,colorbutton",
                                                                                     }}
                                                                                            data={this.props.blog.ArticalContent}
                                                                                            onChange={this.handleArticalContentChange}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                </div>

                                
                                                              
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleNextChange}>Next</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>


                                                        <div id="sw-arrows-step-2"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '2' ? 'block' : 'none' }}
                                                        >
                                                               <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Article Preview & Cover Image</strong>
                                                                    </div>

                                                                    <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                        <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" style={{height : '30px'}}>Preview Image (Size &lt; 100kb, 500*500)<span className="mandatory">*</span></label>
                                                                                    <div className="div1" >
                                                                                        <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl} />

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" style={{height : '30px'}} >Cover Image (Size &lt; 200kb, 1020*400)
                                                                                  <span className="mandatory">*</span></label>
                                                                                    <div >
                                                                                        <ImgUploadCover onChange={this.photoUploadCover} src={this.state.imagePreviewUrlCover} />

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                           
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '1',
                                                                                        Page2: 'Done'
                                                                                    })
                                                                                    }}  >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleImageSubmit.bind(this)}>Next</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                     
                                                            <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}
                                                        >
                                                               <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast" style={{overflow : 'visible'}}>
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Article Tags</strong>
                                                                    </div>

                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Tags (Select one or more tags)</label>
                                                                                    <Select 
                                                                                    options={this.state.TagData}
                                                                                        value={this.state.Tags}
                                                                                        onChange={(tag)=>{
                                                                                            this.setState({Tags : tag})
                                                                                        }}
                                                                                        isMulti
                                                                                    
                                                                                        />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                                    </div>

                                                                                    <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '2',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                    }}  >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleTagSubmit.bind(this)}>Next</button>
                                                                    </div>
                                                                </div>
                                                                                    </div>
                                                     
                                                        <div id="sw-arrows-step-4"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className="toast-header">
                                                                    <strong className="mr-auto">Article Status</strong>
                                                                </div>
                                                                <div className="toast-body">
                                                                <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Written By Whom<span className="mandatory">*</span></label>
                                                                                    <select className="form-control custom-select"
                                                                                        value={this.props.blog.WrittenByWhome}
                                                                                        onChange={this.handleWrittenByWhomeChange.bind(this)}
                                                                                    >
                                                                                        <option></option>
                                                                                                                    {this.state.ContributorsData.map(cat => (
                           
                                                                                                            <option key={cat.value} value={cat.value}>
                                                                                                                {cat.label}
                                                                                                            </option>
                                                                                                            ))}

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="sw-arrows-first-name" >Reviewed By</label>

                                                                                    <select className="form-control custom-select"
                                                                                        value={this.props.blog.ReviewedBy}
                                                                                        onChange={this.handleReviewedByChange}
                                                                                    >
                                                                                         <option></option>
                                                                                                                                    {this.state.ContributorsData.map(cat => (
                           
                                                                                                    <option key={cat.value} value={cat.value}>
                                                                                                        {cat.label}
                                                                                                    </option>
                                                                                                    ))}

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label for="sw-arrows-first-name" >Show On Website<span className="mandatory">*</span></label>
                                                                            <br />
                                                                            <label className="radio-inline">
                                                                                <input type="radio" name="optradio" checked={this.state.Show == 'Yes' ? true : false} onChange={() => {
                                                                                    this.setState({
                                                                                        Show: 'Yes'
                                                                                    })
                                                                                }} /> Yes
                                                                    </label>
                                                                            <label className="radio-inline" style={{ marginLeft: '10px' }}>
                                                                                <input type="radio" name="optradio" checked={this.state.Show == 'No' ? true : false} onChange={() => {
                                                                                    this.setState({
                                                                                        Show: 'No'
                                                                                    })
                                                                                }} /> No
                                                                   </label>
                                                                        </div>

                                                                    </div>

                                                                </div>

                                                               
                                                            </div>

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>

                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                            <button className="btn btn-secondary sw-btn-prev btn-radius-right"
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '3',
                                                                                        Page4: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" onClick={this.handleSubmitChange.bind(this)}>Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        blog: state.Addblog
    }
}



export default connect(mapStateToProps, {
    setCategory,
    setSubCategory,
    setArticalTitle,
    setShortDescription,
    setArticalContent,
    setTages,
    setWrittenByWhome,
    setReviewedBy,
    setShowOnWebsite,
    setClearArticle
})(AddBlog);
