/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {
    setoffername,
    setoffercaption,
    setofferprice,
    setoffermaxprice,
    setofferminprice,
    setofferdescription,
    setoffercode,
    setofferstartdate,
    setofferenddate,
    setoffertermsconditions,
    setoffershowonwebsite,
    offercleardata
} from './Actions/ActionType'
import { connect } from 'react-redux';
import moment from 'moment';
import Notiflix from 'notiflix';
import PostApiCall from '../Api';




class  AddOffer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            Page4 : 'Pending',
            Page5 : 'Pending',
            Page6 : 'Pending',
            Status:'Yes',
            pictures: [],
                editorStateDescription : '',
                editorStateTerms : '',
                brandName: '',
                pharmaCompanyName: '',
                pharmaData : [],
                NumRegex : /^0|[0-9]\d*$/,
                MobileRegex : /^[0-9]*$/,
                DecimalRegex : /^(\d*\.?\d{0,9}|\.\d{0,9})$/,
                AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
                SpecialRegex : /[-!$%^&*()_+|~=`'"{}\[\]:\/;<>?,.@#]/,
                EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               UrlRegex : /^(https:\/\/www\.|httpss:\/\/www\.|https:\/\/|httpss:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
               imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
           
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);
         
     
    }



    onSaveData(){

  
                          Notiflix.Loading.Dots('Please wait...');
  
                          var login=localStorage.getItem('LoginDetail');
                          var details=JSON.parse(login)
  
                                                          PostApiCall.postRequest({
    
                                                             name : this.props.OfferReducer.Name,
                                                             caption : this.props.OfferReducer.Caption,
                                                             price : this.props.OfferReducer.Price,
                                                             max_price : this.props.OfferReducer.MaxPrice,
                                                             min_price : this.props.OfferReducer.MinPrice,
                                                             description : this.props.OfferReducer.Description,
                                                             code : this.props.OfferReducer.Code,
                                                             start_date : this.props.OfferReducer.StartDate,
                                                             end_date : this.props.OfferReducer.EndDate,
                                                             terms_condition : this.props.OfferReducer.TermsCondition,
                                                             show_on_website : this.state.Status,
                                                             updated_on : moment().format('lll').toString(),
                                                             updated_by : details[0].fld_staffid
                                                          
                                                          },"AddOffer").then((results) => 
                                                          
                                                            // const objs = JSON.parse(result._bodyText)
                                                            results.json().then(obj => {
  
                                                          
                                                            if(results.status == 200 || results.status==201){
  
  
                                                              Notiflix.Loading.Remove();
                                                                this.props.offercleardata()
                                                              Notiflix.Notify.Success('Successfully Added');
                                                              window.location.href = '/offerlist'
  
                                                            }else
                                                            {
                                                              Notiflix.Loading.Remove();
                                                              Notiflix.Notify.Failure('Error Occured');
                                                           
  
                                                            }
                                                          }))
  
                       
  
      }

   
    onChangeName = event => {
        this.props.setoffername(event.target.value)
      }
  
      onChangeCaption = event => {
        this.props.setoffercaption(event.target.value)
      }
  
  
      onChangePrice = event => {
        if((this.state.DecimalRegex.test(event.target.value))){
        this.props.setofferprice(event.target.value)
        }
      }
  
      onChangeMaxPrice = event => {
        if((this.state.DecimalRegex.test(event.target.value))){
        this.props.setoffermaxprice(event.target.value)
        }
      }
  
      onChangeMinPrice = event => {
        if((this.state.DecimalRegex.test(event.target.value))){
        this.props.setofferminprice(event.target.value)
        }
      }
  
      onChangeCode = event => {
        this.props.setoffercode(event.target.value)
      }
     
      onChangeStartDate = event => {
        this.props.setofferstartdate(event.target.value)
      }
  
      onChangeEndDate = event => {
        this.props.setofferenddate(event.target.value)
      }
  

    onChangeDescription = event => {

        this.props.setofferdescription(event.editor.getData())
        
    }

    onChangeTerms = event => {

        this.props.setoffertermsconditions(event.editor.getData())
        
    }

  
    //   if(event.target.value.length <= 160){
   
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
     }
    //   else {
    //         Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
    //       }
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
                                                <li className="breadcrumb-item"><a href="#">Offer Management</a></li>
                                                <li className="breadcrumb-item"><a href="/ooferlist">Offer List</a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Add Offer</li>
                                            </ol>
                                        </nav>
                                        <h4 className="mb-1 mt-0">Add Offer</h4>
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
                                                        }} className="wizardlist nav-link">Offer Details</a></li>
                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            className="wizardlist nav-link">Offer Description</a></li>
                                                            <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                className="wizardlist nav-link">Validity</a></li>
                                                                <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page4 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '4',
                                                                            Page4: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    className="wizardlist nav-link">Terms & Condition</a></li>
                                                                    <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                        if (this.state.Page5 == 'Done') {
                                                                            this.setState({
                                                                                PageTitle: '5',
                                                                                Page5: 'Done',
            
                                                                            })
                                                                        }
                                                                    }}
                                                                        className="wizardlist nav-link">Status</a></li>
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
                                                                        <strong className="mr-auto">Offer Details</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="row">
                                                                                <div className="col-md-6">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Offer Name<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05" 
                                                                                   value= {this.props.OfferReducer.Name}
                                                                                   onChange={this.onChangeName.bind(this)}></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div className="col-md-6">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Offer Caption<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                       value= {this.props.OfferReducer.Caption}
                                                                                       onChange={this.onChangeCaption.bind(this)}></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                                                   <div className="col-md-4">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Coupon Price(%)<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                    value= {this.props.OfferReducer.Price}
                                                                                    onChange={this.onChangePrice.bind(this)}></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div className="col-md-4">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Minimum Price For Discount(Rs.)<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                   value= {this.props.OfferReducer.MinPrice}
                                                                                   onChange={this.onChangeMinPrice.bind(this)}></input>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div className="col-md-4">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Maximum Discount(Rs.)<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                             value= {this.props.OfferReducer.MaxPrice}
                                                                                             onChange={this.onChangeMaxPrice.bind(this)}></input>
                                                                                   
                                                                                   
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
                                                                         onClick={() => {
                                                                            if(this.props.OfferReducer.Name != ''){

                                                                                if(this.props.OfferReducer.Caption != ''){
                                                                        
                                                                                  if(this.props.OfferReducer.Price != ''){
                                                                        
                                                                                    if(this.props.OfferReducer.MinPrice != ''){
                                                                        
                                                                                      if(this.props.OfferReducer.MaxPrice != ''){


                                                                                this.setState({
                                                                                    PageTitle: '2',
                                                                                    Page1: 'Done'
                                                                                })

                                                                                    }else
                                                                                    {
                                                                                      Notiflix.Notify.Failure('Offer Maximun Discounted Price cannot be empty.');
                                                                                    }
                                                                                  }else
                                                                                  {
                                                                                    Notiflix.Notify.Failure('Offer Minimum Discounted Price cannot be empty.');
                                                                                  }
                                                                                  }else
                                                                                  {
                                                                                    Notiflix.Notify.Failure('Offer Discount Percent cannot be empty.');
                                                                                  }
                                                                                }else
                                                                                {
                                                                                  Notiflix.Notify.Failure('Offer Caption cannot be empty.');
                                                                                }
                                                                        
                                                                              }else
                                                                              {
                                                                                Notiflix.Notify.Failure('Offer Name cannot be empty.');
                                                                              }


                                                                        }
                                                                        } >  Next</button>
                                                                    </div>
                                                                </div>
                                                            
                                                 
                                                        </form>
                                                        </div>
                                                        <div id="sw-arrows-step-2"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '2' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Offer Description</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                            <div className="form-group">
                                                                            <label for="sw-arrows-first-name" >Offer Description(maximum 500 Character)<span className="mandatory">*</span></label>
                                                                            
                                                                            <div className="niceeditors">
                                                                            <CKEditor
                                                                                     config={{
                                                                                        extraPlugins: "justify,font,colorbutton",
                                                                                     }}                                
                                                                                                                     data={this.props.OfferReducer.Description}
                                                                                                                     onChange={this.onChangeDescription.bind(this)}
                                                                              />
                                                                            </div>
                                                                        </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
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
                                                                       onClick={()=>{
                                                                        if(this.props.OfferReducer.Description != ''){
                                                                            if(((this.props.OfferReducer.Description.replace( /(<([^>]+)>)/ig, '').trim()).length) < 500) {
                                                                         
                                                                                this.setState({
                                                                                PageTitle : '3',
                                                                                Page2 : 'Done'
                                                                            })

                                                                        }else
                                                                        {
                                                                          Notiflix.Notify.Failure('Please enter offer description with maximum 500 characters.');
                                                                        }
                                                                        }else
                                                                        {
                                                                          Notiflix.Notify.Failure('Offer Description cannot be empty.');
                                                                        }
                                                                         
                                                                       }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 
                                                        

                                                         <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Validity</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="row">
                                                                                <div className="col-md-12">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Coupon Code<span className="mandatory">*</span></label>
                                                                                   <input type="text" className="form-control" id="validationCustom05"
                                                                                                                                                                                                        
                                                                                                                                                                                                        value={this.props.OfferReducer.Code}
                                                                                                                                                                                                        onChange={this.onChangeCode.bind(this)}/>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                   <div className="col-md-6">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">Start Date Of Offer<span className="mandatory">*</span></label>
                                                                                   <input type="date" className="form-control" id="validationCustom05"
                                                                                  onKeyDown={(e) => e.preventDefault()} 
                                                                              value={this.props.OfferReducer.StartDate}
                                                                              onChange={this.onChangeStartDate.bind(this)}/>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                                                   <div className="col-md-6">
                                                                                   <div className="form-group mb-2">
                                                                                   <label for="validationCustom05">End Date Of Offer<span className="mandatory">*</span></label>
                                                                                   <input type="date" className="form-control" id="validationCustom05"
                                                                                    onKeyDown={(e) => e.preventDefault()} 
                                                                               value={this.props.OfferReducer.EndDate}
                                                                               onChange={this.onChangeEndDate.bind(this)}/>
                                                                                   
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                  
                                                           
                                                                                    
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
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
                                                                              PageTitle : '2',
                                                                              Page3 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{

                                                                        if(this.props.OfferReducer.Code != ''){

                                                                            if(this.props.OfferReducer.StartDate != ''){
                                                          
                                                                              if(this.props.OfferReducer.EndDate != ''){

                                                                            this.setState({
                                                                                PageTitle : '4',
                                                                                Page3 : 'Done'
                                                                            })
                                                                            }else
                                                                            {
                                                                              Notiflix.Notify.Failure('Offer EndDate cannot be empty.');
                                                                            }
                                                                          }else
                                                                          {
                                                                            Notiflix.Notify.Failure('Offer StartDate cannot be empty.');
                                                                          }
                                                                        }else
                                                                        {
                                                                          Notiflix.Notify.Failure('Offer Code cannot be empty.');
                                                                        }
                                                                         
                                                                        
                                                                       }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 

                                                         <div id="sw-arrows-step-4"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Terms & Condition</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                            <div className="form-group">
                                                                            <label for="sw-arrows-first-name" >Terms & Conditions(maximum 500 Character)<span className="mandatory">*</span></label>
                                                                            
                                                                            <div className="niceeditors">
                                                                            <CKEditor
                                                                      data={this.props.OfferReducer.TermsCondition}
                                                                      onChange={this.onChangeTerms.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
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
                                                                              PageTitle : '3',
                                                                              Page4 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                        if(this.props.OfferReducer.TermsCondition != ''){

                                                                            if(((this.props.OfferReducer.TermsCondition.replace( /(<([^>]+)>)/ig, '').trim()).length) < 500) {
                                                                            this.setState({
                                                                                PageTitle : '5',
                                                                                Page4 : 'Done'
                                                                            })
                                                                        }else
                                                                        {
                                                                          Notiflix.Notify.Failure('Please enter terms & conditions with maximum 500 characters.');
                                                                        }
                                                                        }else
                                                                        {
                                                                          Notiflix.Notify.Failure('Offer Terms & Conditions cannot be empty.');
                                                                        }
                                                                        
                                                                       }}
                                                                    // onClick={this.nextlabel2.bind(this)}
                                                                       >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div> 

                                                         <div id="sw-arrows-step-5"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '5' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div className="toast-header">
                                                                        <strong className="mr-auto">Status</strong>
                                                                    </div>
                                                                    <div className="toast-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="row">
                                                                                <div className="col-md-6">
                                                                                <label for="validationCustom05">Show On Website <span className="mandatory">*</span></label>
                                                                                  
                                                                                   <div className="form-group mb-2">
                                                                                   <label className="radio-inline">
                                                                                   <input type="radio" name="optradio"
                                                                                              checked={this.state.Status == 'Yes' ? true : false}
                                                                                               onChange={()=>{
                                                                                                   this.setState({
                                                                                                       Status : 'Yes'
                                                                                                   })
                                                                                               }}/> Yes
                                                                                            </label>
                                                                                           <label className="radio-inline" style={{marginLeft:'10px'}}>
                                                                                               <input type="radio" name="optradio" 
                                                                                               checked={this.state.Status == 'No' ? true : false}
                                                                                               onChange={()=>{
                                                                                                   this.setState({
                                                                                                       Status : 'No'
                                                                                                   })
                                                                                               }}/> No
                                                                                       </label>
                                                                                   
                                                                               </div>
                                                                                   </div>
                                                                                     
                                                                                  
                                                                                </div>
                                                                                

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
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
                                                                              PageTitle : '4',
                                                                              Page5 : 'Done'
                                                                          })
                                                                          }}
                                                                       >Previous</button>
                                                                       <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                       onClick={()=>{
                                                                         
                                                                         this.setState({
                                                                             PageTitle : '5',
                                                                             Page5 : 'Done'
                                                                         })
                                                                       }}
                                                                    onClick={this.onSaveData.bind(this)}
                                                                       >Submit</button>
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
        OfferReducer: state.OfferReducer
    };
  }
  
  export default connect(
    mapStateToProps,
    {
      setoffername,
      setoffercaption,
      setofferprice,
      setoffermaxprice,
      setofferminprice,
      setofferdescription,
      setoffercode,
      setofferstartdate,
      setofferenddate,
      setoffertermsconditions,
      setoffershowonwebsite,
      offercleardata
    }
  )(AddOffer);
  
  

