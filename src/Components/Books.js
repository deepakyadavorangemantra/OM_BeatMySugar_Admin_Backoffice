import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';

import{
    setbookitemtitle,
    setauthorname,
    setpublishedby,
    setbookitemcategory,
    setbookreturnable,
    setbookreturnabledays,
    setbookhsn,
    setbookgst,
    setclearbookitem
    }from './Actions/ActionType';
 

const ImgUpload =({
    onChange,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>

class Books extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
           
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
         
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            Returnable: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ],
              ReturnableDays:[
                  {value:'1', label:'1'},
                  {value:'2', label:'2'},
                  {value:'3', label:'3'},
                  {value:'4', label:'4'},
                  {value:'5', label:'5'},
                  {value:'6', label:'6'},
                  {value:'7', label:'7'},
                  {value:'8', label:'8'},
                  {value:'9', label:'9'},
                  {value:'10', label:'10'},
                  {value:'11', label:'11'},
                  {value:'12', label:'12'},
                  {value:'13', label:'13'},
                  {value:'14', label:'14'},
                  {value:'15', label:'15'},
                  {value:'16', label:'16'},
                  {value:'17', label:'17'},
                  {value:'18', label:'18'},
                  {value:'19', label:'19'},
                  {value:'20', label:'20'},{value:'21', label:'21'},{value:'22', label:'22'},{value:'23', label:'23'},{value:'24', label:'24'},{value:'25', label:'25'},
                  {value:'26', label:'26'},{value:'27', label:'27'},{value:'28', label:'28'},{value:'29', label:'29'},{value:'30', label:'30'},
    
              ],
              GSTdata:[],
              Categorydata:[],
              AboutBook:'',
              AboutAuthor:'',
              isReturnable : true,

              AddAccess : true,
              CountryOfOrigin : 'India',
              CountryOrigindata : []
             
         
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });

          this.props.setclearbookitem()
          Notiflix.Loading.Dots('');


        GetApiCall.getRequest("GetGstData").then(resultdes =>
            resultdes.json().then(objGst =>{
                this.props.setbookgst(objGst.data[0].value);
                this.setState({
                    GSTdata:objGst.data,
                })
            }))

            GetApiCall.getRequest("GetBookCategoryData").then(resultdes =>
                resultdes.json().then(objCategory =>{
                    this.props.setbookitemcategory(objCategory.data[0].value);
                    this.setState({
                        Categorydata:objCategory.data,
                    })
                    // Notiflix.Loading.Remove()
                }))

                GetApiCall.getRequest("GetCountry").then(resultdes =>
                    resultdes.json().then(obj => {
          
                          this.setState({
                            CountryOrigindata : obj.data ,
                            
                          })

                          

                        }))


                var login=localStorage.getItem('LoginDetail');
                  var details=JSON.parse(login)
          
                  PostApiCall.postRequest({
            
                      staffid : details[0].fld_staffid,
                  
                    },"GetUserSubMenuAccessRights").then((resultssub) => 
                    
                      // const objs = JSON.parse(result._bodyText)
                      resultssub.json().then(objsub => {  
                      if(resultssub.status == 200 || resultssub.status==201){
          
                     var filteredRights = objsub.data;
                          // console.log(filteredRights)
                  
                          var con = 0
                          for(var i = 0 ; i< filteredRights.length ;i++){
             
                              if(filteredRights[i].fld_menuname == 'Add Books'){
                  
                                if(filteredRights[i].fld_access == 1){
                        
                                 this.setState({
                                   AddAccess : true
                                 })
                                }
                              }
                             
                            con = con + 1
                            if(con == filteredRights.length){
                                Notiflix.Loading.Remove();
                            }
                          }
                  
          
                      }
          
                  }))

    }
    photoUpload = e =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file);
      }
   

      onChangetitle(booktitle){
       this.props.setbookitemtitle(booktitle.target.value)
      }
      onChangeauthor(authorname){
        this.props.setauthorname(authorname.target.value)
      }
      onChangePublish(publishedby){
          this.props.setpublishedby(publishedby.target.value)
      }
      onChangeCat(category){
        //   console.log(category.target.value)
          this.props.setbookitemcategory(category.target.value)
      }
      onChangeReturn(returnable){
        //   console.log(returnable.target.value)
        if(returnable.target.value == 'No'){
            this.setState({
                isReturnable : false
            })
            this.props.setbookreturnabledays(0)
        }else
        {
          this.setState({
              isReturnable : true
          })
          this.props.setbookreturnabledays('1')
        }
          this.props.setbookreturnable(returnable.target.value)
      }
      onChangeReturnday(returnableday){
        //   console.log(returnableday.target.value)
          this.props.setbookreturnabledays(returnableday.target.value)
      }
      onChangeHsn(hsncode){
        //   console.log(hsncode.target.value)
          this.props.setbookhsn(hsncode.target.value)
      }
      onChangeGst(gst){
        //   console.log(gst.target.value)
       this.props.setbookgst(gst.target.value)
    }
      
      nextlabel(){
          if(this.props.bookcredential.BookTitle!=''){
              if(this.props.bookcredential.AuthorName!=''){
                  if(this.props.bookcredential.PublishedBy!=''){
                      if(this.props.bookcredential.Category!=''){
                        this.setState({
                            PageTitle: '2',
                            Page1: 'Done'
                        })
                      }
                      else{
                        Notiflix.Notify.Failure('Please select books category.')
                     }

                  }
                  else{
                    Notiflix.Notify.Failure('Please enter the name of the publisher.')
                 }
              }
              else{
                Notiflix.Notify.Failure('Please enter author name.')
             }
          }
          else{
            Notiflix.Notify.Failure('Please enter title of the book.')
         }
       
      }

      onChangeaboutbook(aboutbook){
        //   console.log(aboutbook.target.value)
        this.setState({AboutBook:aboutbook.editor.getData()})
    
      }
      onChangeAboutauthor(author){
        // console.log(author.target.value)
        this.setState({AboutAuthor:author.editor.getData()})
       
      }

      nextlabel2(){

           
        this.setState({
            PageTitle : '3',
            Page2 : 'Done'
        })
      }
    
 
    Savebook(){
                         if(this.props.bookcredential.HSNCode!=''){
        

                            if(this.state.AddAccess){

                                   var login=localStorage.getItem('LoginDetail');
                                    var details=JSON.parse(login)
                                       Notiflix.Loading.Dots('');
                                       
                        PostApiCall.postRequest({
      
                            title : this.props.bookcredential.BookTitle,
                            authorname  :this.props.bookcredential.AuthorName,
                            publishedby  : this.props.bookcredential.PublishedBy,
                            categoryid : this.props.bookcredential.Category,
                            aboutbook : this.state.AboutBook,
                            aboutauthor : this.state.AboutAuthor,
                            reutrnable : this.props.bookcredential.Returnable,
                            returnabledays : this.props.bookcredential.ReturnableDays,
                            hsncode : this.props.bookcredential.HSNCode,
                            gstpercent : this.props.bookcredential.GstRate,
                            approved : 'No',
                            updatedon : moment().format('lll'),
                            updatedby : details[0].fld_staffid,
                            countryoforigin:this.state.CountryOfOrigin
                      
                     
                         },"AddBookItemMaster").then((results) => 
                             
                         
                        //    const objs = JSON.parse(result._bodyText)
                           results.json().then(obj => {
                     
                         
                           if(results.status == 200 || results.status==201){

                            this.props.setclearbookitem()
                            Notiflix.Loading.Remove()
                            Notiflix.Notify.Success('Book Item Master successfully added.')
                            window.location.href = '/bookitemmasterlist'
                            

                        }
                        else{
                            Notiflix.Loading.Remove()
                            Notiflix.Notify.Failure('Book Item already registered.')
                          } 
                        }
                           )
                         )
                             
                        }
                        else{
                            Notiflix.Notify.Failure('You are not authorised to continue.'); 
                         }
                                  }
                                  else{
                                    Notiflix.Notify.Failure('Please enter HSN code.')
                                 }
                             
    

              } 


    render() {
        return (
            <div className="App">
                <div id="wrapper">
                    <div className="content-page">
                        <div class="content">
                            <div className="container-fluid">
                                <div className="row page-title">
                                    <div className="col-md-12">
                                        <nav aria-label="breadcrumb" class="float-right mt-1">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#">Product Management</a></li>
                                                <li class="breadcrumb-item"><a href="/">Books List</a></li>
                                               
                                               
                                                <li class="breadcrumb-item active" aria-current="page">Add New Book</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Add New Book</h4>
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
                                                        }} class="wizardlist nav-link">Book Item Information</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Book & Author</a></li>
                                                 <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">GST & Return</a></li>
                                                 
                                                
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
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Book Item Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Book Title<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                     value={this.props.bookcredential.BookTitle}
                                                                                     onChange={this.onChangetitle.bind(this)}
                                                                                  />
                                                                                    
                                                                                </div>
                                                                            </div> 
                                                                            <div class="col-md-6">
                                                                            <div class="form-group mb-2">
                                                                                <label for="validationCustom05">Author Name<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" id="validationCustom05"
                                                                                value={this.props.bookcredential.AuthorName}
                                                                                onChange={this.onChangeauthor.bind(this)}
                                                                               ></input>
                                                                                
                                                                            </div>
                                                                        </div> 
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-2">
                                                                                <label for="validationCustom05">Published By<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" id="validationCustom05"
                                                                                value={this.props.bookcredential.PublishedBy}
                                                                                onChange={this.onChangePublish.bind(this)}
                                                                               ></input>
                                                                                
                                                                            </div>
                                                                        </div> 
                                                                          
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Category<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            value={this.props.bookcredential.Category}
                                                                            onChange={this.onChangeCat.bind(this)}>
                                                                            {this.state.Categorydata.map(category => (
                           
                                                                                <option key={category.value} value={category.value}>
                                                                                  {category.label}
                                                                             </option>
                                                                             ))}
                                                                                  
                                                                                 
                                                                            </select>
                                                                        </div>
                                                                            </div>

                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Country of Origin<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            disabled={!this.state.IsVisible}
                                                                           value={this.state.CountryOfOrigin}
                                                                           onChange={(text)=>{

                                                                               this.setState({
                                                                                   CountryOfOrigin : text.target.value
                                                                               })

                                                                           }}>
                                                                                    
                                                                           {this.state.CountryOrigindata.map(country =>(
                                                                               <option key={country.label} value={country.label}>
                                                                               {country.label}
                                                                          </option>
                                                                              ))}
                                                                           </select>
                     
                                                                        </div>
                                                                            </div>
                                                                             
                                                                            
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>
                                                                     
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">

                                                                    <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                        <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                        // onClick={() => {

                                                                        //     this.setState({
                                                                        //         PageTitle: '2',
                                                                        //         Page1: 'Done'
                                                                        //     })
                                                                        // }}
                                                                       onClick={this.nextlabel.bind(this)} >Next</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div id="sw-arrows-step-2"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '2' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast">
                                                            <div class="toast-header">
                                                            <strong class="mr-auto">Book & Author</strong>
                                                        </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                <div class="col-md-12">
                                                                <div class="form-group">
                                                                <label for="sw-arrows-first-name" >About Book</label>
                                                                <CKEditor
                                                                config={{
                                                                    extraPlugins: "justify,font,colorbutton",
                                                                 }}
                                                                data={this.state.AboutBook}
                                                                onChange={this.onChangeaboutbook.bind(this)}  
                                                                />
                                                            </div>
                                                                </div>
                                                                 
                                                                <div class="col-md-12">
                                                                <div class="form-group">
                                                                <label for="sw-arrows-first-name" >About Author</label>
                                                                <CKEditor
                                                                config={{
                                                                    extraPlugins: "justify,font,colorbutton",
                                                                 }}
                                                                data={this.state.AboutAuthor}
                                                                onChange={this.onChangeAboutauthor.bind(this)}   
                                                                />
                                                                </div>
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
                                                                        onClick={()=>{
                  
                                                                          this.setState({
                                                                              PageTitle : '1',
                                                                              Page2 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                    //    onClick={()=>{
                                                                         
                                                                    //      this.setState({
                                                                    //          PageTitle : '3',
                                                                    //          Page2 : 'Done'
                                                                    //      })
                                                                    //    }}
                                                                       onClick={this.nextlabel2.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 2*/}
                                                        <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                               
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast">
                                                            <div class="toast-header">
                                                            <strong class="mr-auto">GST & Return</strong>
                                                        </div>
                                                             <div class="toast-body">
                                                                    <div class="row">
                                                                    
                                                                      
                                                                      <div className="col-md-3">
                                                                      <div class="form-group">
                                                                      <label for="sw-arrows-first-name" >Returnable<span className="mandatory">*</span></label>
                                                                      
                                                                      <select class="form-control custom-select"
                                                                      value={this.props.bookcredential.Returnable}
                                                                      onChange={this.onChangeReturn.bind(this)}>
                                                                      {this.state.Returnable.map(returnable => (
                           
                                                                        <option key={returnable.value} value={returnable.value}>
                                                                          {returnable.label}
                                                                     </option>
                                                                     ))}
                                                                          
                                                                      </select>
                                                                  </div>
                                                                      </div>
                                                                      <div className="col-md-3" style={{display : this.state.isReturnable ? '' : 'none'}}>
                                                                      <div class="form-group">
                                                                      <label for="sw-arrows-first-name" >Returnable Days<span className="mandatory">*</span></label>
                                                                      
                                                                      <select class="form-control custom-select"
                                                                      value={this.props.bookcredential.ReturnableDays}
                                                                      onChange={this.onChangeReturnday.bind(this)}>
                                                                      {this.state.ReturnableDays.map(returnabledays => (
                           
                                                                        <option key={returnabledays.value} value={returnabledays.value}>
                                                                          {returnabledays.label}
                                                                     </option>
                                                                     ))}
                                                                      </select>
                                                                  </div>
                                                                      </div>
                                                                      <div class="col-md-3">
                                                                      <div class="form-group mb-2">
                                                                          <label for="validationCustom05">HSN Code<span className="mandatory">*</span></label>
                                                                          <input type="text" class="form-control" id="validationCustom05"
                                                                            value={this.props.bookcredential.HSNCode}
                                                                            onChange={this.onChangeHsn.bind(this)}
                                                                        />
                                                                          
                                                                      </div>
                                                                  </div>
                                                                  <div class="col-md-3">
                                                                  <div class="form-group mb-2">
                                                                      <label for="validationCustom05">GST Rate(%)<span className="mandatory">*</span></label>
                                                                        <select class="form-control custom-select"
                                                                        value={this.props.bookcredential.GstRate}
                                                                        onChange={this.onChangeGst.bind(this)} >
                                                                        {this.state.GSTdata.map(GST =>(
                                                                            <option key={GST.value} value={GST.value}>
                                                                            {GST.label}
                                                                       </option>
                                                                           ))}
                                                                        </select>
                                                                  </div>
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
                                                                                        PageTitle: '2',
                                                                                        Page2: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                            // onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '4',
                                                                            //         Page3 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                            onClick={this.Savebook.bind(this)}>Add Book Item</button>
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


function mapStateToProps(state){
    return{
        bookcredential: state.BookReducers
    }
  }
  export default connect(mapStateToProps, {
    setbookitemtitle,
    setauthorname,
    setpublishedby,
    setbookitemcategory,
    setbookreturnable,
    setbookreturnabledays,
    setbookhsn,
    setbookgst,
    setclearbookitem
    
  }) (Books);
