import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import{
    setsocksitemname,
    setsocksgender,
    setsocksitemtype,
    setsocksbrand,
    setsockscompany,
    setsocksmanufacture,
    setsocksmarketer,
    setsocksreturnable,
    setsocksreturnabledays,
    setsockshsn,
    setsocksgst,
    setclearsocksitem

}
from './Actions/ActionType';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 

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

class ViewSocks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            Page4 : 'Pending',
            DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
            NumRegex: /^[0-9]*$/,
            AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
            EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    
          
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
              GSTData:[],
              GenderData: [
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Unisex", label: "Unisex" }
              ],
              Branddata:[],
              Companydata:[],
              ManufactureData:[],
             MarketerData:[],
             Description:'',
             TypeData:[],
             isReturnable : true,


             IsVisible : false,
             EditAccessGranted : false,
             ApproveAccessGranted : false,


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
          this.props.setclearsocksitem()
          Notiflix.Loading.Dots('');

          var det = localStorage.getItem('SocksDetails')
          var SocksData = JSON.parse(det)
           
        //   console.log(SocksData)

           new Promise( ( resolve, reject ) => {
            setTimeout( resolve, 1000 );
          } ).then( () => {
            this.setState( { 
                Description : SocksData.fld_description,
                SocksId:SocksData.fld_id,
                

            } );
        } );

        this.props.setsocksitemname(SocksData.fld_name)
        this.props.setsocksgender(SocksData.fld_gender)
        this.props.setsocksitemtype(SocksData.fld_typeid)
        this.props.setsocksbrand(SocksData.fld_brandid)
        this.props.setsockscompany(SocksData.fld_companyid)
        this.props.setsocksmanufacture(SocksData.fld_manufacturerid)
        this.props.setsocksmarketer(SocksData.fld_marketerid)
        this.props.setsocksreturnable(SocksData.fld_returnable)
        this.props.setsocksreturnabledays(SocksData.fld_returnabledays)
        this.props.setsockshsn(SocksData.fld_hsncode)
        this.props.setsocksgst(SocksData.fld_gstpercent)
      

        if(SocksData.fld_returnable == 'No'){
            this.setState({
                isReturnable : false
            })

        }else
        {
            this.setState({
                isReturnable : true
            })
        }
         
        

        GetApiCall.getRequest("GetGstData").then(resultdes =>
            resultdes.json().then(objGst =>{
            //    this.props.setsocksgst(objGst.data[0].value);
                this.setState({
                    GSTData:objGst.data
                })
            }))
            GetApiCall.getRequest("GetCompany").then(resultdes =>
                resultdes.json().then(objcompany =>{
                    // this.props.setsockscompany(objcompany.data[0].value);
                    this.setState({
                        Companydata:objcompany.data,
                        ManufactureData:objcompany.data,
                       MarketerData:objcompany.data

                    })
                }))
                GetApiCall.getRequest("GetBrandData").then(resultdes =>
                    resultdes.json().then(objbrand => {
                    // this.props.setsocksbrand(objbrand.data[0].value);
                   
                      this.setState({
                        Branddata : objbrand.data,
                        
                      })
                    }))

                 GetApiCall.getRequest("GetSocksTypeMaster").then(resultdes =>
                        resultdes.json().then(objtype => {
                        // this.props.setsocksitemtype(objtype.data[0].value);
                       
                          this.setState({
                            TypeData : objtype.data,
                            
                          })
                        //   Notiflix.Loading.Remove()
                        }))

                        GetApiCall.getRequest("GetCountry").then(resultdes =>
                            resultdes.json().then(obj => {
                  
                                  this.setState({
                                    CountryOrigindata : obj.data ,
                                    CountryOfOrigin : SocksData.fld_countryoforigin == null || SocksData.fld_countryoforigin == '' ? 'India' : SocksData.fld_countryoforigin
                                   
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
   
                    if(filteredRights[i].fld_menuname == 'Edit Socks'){
        
                      if(filteredRights[i].fld_access == 1){
                       this.setState({
                         EditAccessGranted : true
                       })
                      }
                    }else if(filteredRights[i].fld_menuname == 'Approve Socks'){
        
                        if(filteredRights[i].fld_access == 1){
                         this.setState({
                           ApproveAccessGranted : true
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
   
      onChangeItem(itemname){
        this.props.setsocksitemname(itemname.target.value)
    }
     onChangeGender(gender){
         this.props.setsocksgender(gender.target.value)
     }
     onChangeType(type){
         this.props.setsocksitemtype(type.target.value)
     }
     onChangeBrand(brand){
         this.props.setsocksbrand(brand.target.value)
     }
     onChangeCompany(companyname){
         this.props.setsockscompany(companyname.target.value)
     }
     onchangeManufact(manufacturename){
         this.props.setsocksmanufacture(manufacturename.target.value)
     }
     onChangeMark(marketername){
         this.props.setsocksmarketer(marketername.target.value)
     }
     onChangeReturn(returnable){
        if(returnable.target.value == 'No'){
            this.setState({
                isReturnable : false
            })
            this.props.setsocksreturnabledays(0)
        }else
        {
          this.setState({
              isReturnable : true
          })
          this.props.setsocksreturnabledays('1')
        }
         this.props.setsocksreturnable(returnable.target.value)
     }
     onChangeReturnday(returnableday){
         this.props.setsocksreturnabledays(returnableday.target.value)
     }
     onChangeHsn(hsncode){
        if(this.state.AlphaNumericRegex.test(hsncode.target.value)){
         this.props.setsockshsn((hsncode.target.value))
        }
     }
     onChangeGst(gst){
        this.props.setsocksgst(gst.target.value)
     
    }
     
     nextlabel(){
         if(this.props.sockscredential.ItemName!=''){
            if(this.props.sockscredential.ItemName.length < 160){
              if(this.props.sockscredential.Gender!=''){
                 if(this.props.sockscredential.Type!=''){
                     if(this.props.sockscredential.Brand!=''){
                         if(this.props.sockscredential.CompanyName!=''){
                                    
                                    this.setState({
                                        PageTitle: '2',
                                        Page1: 'Done'
                                    })
                                
                                }
                                else{
                                   Notiflix.Notify.Failure('Please select company name.')
                                } 
                            }
                            else{
                               Notiflix.Notify.Failure('Please select brand name.')
                            }
                        }
                        else{
                           Notiflix.Notify.Failure('Please select socks type')
                        }
                        
                    }
                    else{
                       Notiflix.Notify.Failure('Please select gender.')
                    }
                }
                else{
                   Notiflix.Notify.Failure('Please enter socks item name with less then 160 characters.')
                }
               }
               else{
                  Notiflix.Notify.Failure('Please enter socks item name.')
               }
        
     }
  

     onChangeDescription(description){
        this.setState({Description:description.editor.getData()})
    }
  
     nextlabel2(){
         if(this.state.Description!=''){

         

        this.setState({
            PageTitle : '3',
            Page2 : 'Done'
        })
    }
    else{
        Notiflix.Notify.Failure('Please enter socks item description.')
      }
    }

    SaveSocks(){
        if(this.props.sockscredential.HSNCode!=''){
                                                    
                            var login=localStorage.getItem('LoginDetail');
                            var details=JSON.parse(login)
                             Notiflix.Loading.Dots('');
                                  
                       PostApiCall.postRequest({
                       id:this.state.SocksId,
                       name : this.props.sockscredential.ItemName,
                       brandid :this.props.sockscredential.Brand,
                       companyid : this.props.sockscredential.CompanyName,
                       manufacturerid : this.props.sockscredential.ManufactureName,
                       marketerid : this.props.sockscredential.MarketerName,
                       typeid : this.props.sockscredential.Type,
                       gender : this.props.sockscredential.Gender,
                       description : this.state.Description,
                       reutrnable : this.props.sockscredential.Returnable,
                       returnabledays : this.props.sockscredential.ReturnableDays,
                       hsncode : this.props.sockscredential.HSNCode,
                       gstpercent :this.props.sockscredential.GstRate,
                       approved : 'No',
                       updatedon : moment().format('lll'),
                       updatedby : details[0].fld_staffid,
                       countryoforigin : this.state.CountryOfOrigin
                
                    },"UpdateSocksItemMaster").then((results) => 
                        
                    
                   //    const objs = JSON.parse(result._bodyText)
                      results.json().then(obj => {
                
                    
                      if(results.status == 200 || results.status==201){
                       this.props.setclearsocksitem()

                       Notiflix.Loading.Remove()

                       Notiflix.Notify.Success('Socks ttem successfully updated.')
                       window.location.href = '/socksitemmasterlist'
                       

                   }
                   else{
                       Notiflix.Loading.Remove()
                       Notiflix.Notify.Failure('Something went wrong. try again later.')
                     } 
                   }
                      )
                    )
                       
                }
                else{
                    Notiflix.Notify.Failure('Please enter HSN code.')
                    }
                                 }
    



                                 ApproveSocks(){
                                    if(this.state.ApproveAccessGranted){
                            
                                        confirmAlert({
                                            title: 'Confirm to Approve',
                                            message: 'Are you sure you want to approve socks.',
                                            buttons: [
                                              {
                                                label: 'Yes',
                                                onClick: () => {
                                                    Notiflix.Loading.Dots('');
                                
                                                    var login=localStorage.getItem('LoginDetail');
                                                    var details=JSON.parse(login)
                                
                                
                                        PostApiCall.postRequest({
                                      
                                            id:this.state.SocksId,
                                             approved : 'Yes',
                                             updatedby : details[0].fld_staffid,
                                             updatedon : moment().format('lll'),
                                
                                      
                                          },"UpdateSocksItemMasterApprovalStatus").then((results) => 
                                          
                                            // const objs = JSON.parse(result._bodyText)
                                            results.json().then(obj => {
                                
                                            if(results.status == 200 || results.status==201){
                                
                                                Notiflix.Loading.Remove()
                                                Notiflix.Notify.Success('Socks ttem successfully updated.')
                                                        window.location.href = '/socksitemmasterlist'
                                            }else
                                            {
                                                Notiflix.Loading.Remove()
                                                Notiflix.Notify.Failure('Something went wrong, try again later.')
                                            }
                                        }))
                                                }
                                              },
                                              {
                                                label: 'No',
                                                // onClick: () => alert('Click No')
                                              }
                                            ]
                                          });
                                        }else{
                                            Notiflix.Notify.Failure('You are not authorised to continue.'); 
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
                                                <li class="breadcrumb-item"><a href="/">Socks List</a></li>
                                               
                                                <li class="breadcrumb-item active" aria-current="page">View Socks</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Socks Item</h4>
                                    </div>
                                </div>





                                <div class="row" style={{display : this.state.EditAccessGranted ||  this.state.ApproveAccessGranted ? '' : 'none'}}>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center col-lg-5" style={{float : 'right'}}>
                                       <div class="col text-right row " >

                                        <div style={{display : this.state.ApproveAccessGranted ? '' : 'none'}}>
                                       <button 
                                       style={{marginRight : '10px'}}
                                      onClick={this.ApproveSocks.bind(this)}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-check mr-1"></i>Approve Socks </button>
                                                </div>

                                        <div style={{display : this.state.EditAccessGranted ? '' : 'none'}}>
                                        <button  
                                      onClick={()=>{
                                          this.setState({IsVisible : true})
                                      
                                      }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-edit mr-1"></i>Edit Socks Details</button>
                                                </div>
                                    {/* </div>
                                    <div class="col text-right" style={{display : this.state.ApproveAccessGranted ? '' : 'none'}}> */}
                  
                                    </div>
                                </div>
                            </div>
                        </div> 
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
                                                        }} class="wizardlist nav-link">Socks Item Information</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Description</a></li>
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
                                                                        <strong class="mr-auto">Socks Item Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                    
                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Item Name(160 Character)<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                    value={this.props.sockscredential.ItemName}
                                                                                    disabled={!this.state.IsVisible}
                                                                                    onChange={this.onChangeItem.bind(this)}
                                                                                   />
                                                                                    
                                                                                </div>
                                                                            </div> 
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Gender<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            disabled={!this.state.IsVisible}
                                                                            value={this.props.sockscredential.Gender}
                                                                            onChange={this.onChangeGender.bind(this)}>
                                                                            {this.state.GenderData.map(gender => (
                           
                                                                                <option key={gender.value} value={gender.value}>
                                                                                  {gender.label}
                                                                             </option>
                                                                             ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Type<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            disabled={!this.state.IsVisible}
                                                                           value={this.props.sockscredential.Type} 
                                                                           onChange={this.onChangeType.bind(this)}>
                                                                           {this.state.TypeData.map(type => (
                           
                                                                            <option key={type.value} value={type.value}>
                                                                              {type.label}
                                                                         </option>
                                                                         ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Brand<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            disabled={!this.state.IsVisible}
                                                                            value={this.props.sockscredential.Brand}
                                                                            onChange={this.onChangeBrand.bind(this)} >
                                                                            {this.state.Branddata.map(brand => (
                           
                                                                                <option key={brand.value} value={brand.value}>
                                                                                  {brand.label}
                                                                             </option>
                                                                             ))}
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                             
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Company Name<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                            disabled={!this.state.IsVisible}
                                                                            value={this.props.sockscredential.CompanyName}
                                                                            onChange={this.onChangeCompany.bind(this)}>
                                                                            {this.state.Companydata.map(company =>(
                                                                                <option key={company.value} value={company.value}>
                                                                                {company.label}
                                                                           </option>
                                                                               ))}
                                                                          

                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                             
                                                                            <div class="col-md-4">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Manufacturer Name</label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            disabled={!this.state.IsVisible}
                                                                            value={this.props.sockscredential.ManufactureName}
                                                                            onChange={this.onchangeManufact.bind(this)}>
                                                                              <option value={0}></option>
                                                                            {this.state.ManufactureData.map(manufacture =>(
                                                                                <option key={manufacture.value} value={manufacture.value}>
                                                                                {manufacture.label}
                                                                           </option>
                                                                               ))}
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            <div class="col-md-4">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Marketer Name</label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            disabled={!this.state.IsVisible}
                                                                            value={this.props.sockscredential.MarketerName}
                                                                            onChange={this.onChangeMark.bind(this)}>
                                                                             <option value={0}></option>
                                                                            {this.state.MarketerData.map(marketername =>(
                                                                                <option key={marketername.value} value={marketername.value}>
                                                                                {marketername.label}
                                                                           </option>
                                                                               ))}
                                                                            </select>
                                                                             </div>
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Country of Origin <span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                             disabled={!this.state.IsVisible}
                                                                            value={this.state.CountryOfOrigin}
                                                                            onChange={(text)=>{

                                                                                this.setState({
                                                                                    CountryOfOrigin : text.target.value
                                                                                })

                                                                            }}>
                                                                                     
                                                                            {this.state.CountryOrigindata.map(flavour =>(
                                                                                <option key={flavour.label} value={flavour.label}>
                                                                                {flavour.label}
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
                                                                        onClick={this.nextlabel.bind(this)}>Next</button>
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
                                                                    <strong class="mr-auto">Description</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                            <div class="row">
                                                                            <div class="col-md-12">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Description<span className="mandatory">*</span></label>
                                                                            
                                                                            <div class="niceeditors">
                                                                            <CKEditor
                                                                            config={{
                                                                                extraPlugins: "justify,font,colorbutton",
                                                                             }}
                                                                            disabled={!this.state.IsVisible}
                                                                            data={this.state.Description}
                                                                            onChange={this.onChangeDescription.bind(this)}
                                                                             
                                                                              />
                                                                            </div>
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
                                                                    onClick={this.nextlabel2.bind(this)}  >Next</button>
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
                                                                
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                
                                                                <div class="toast-body">
                                                                <div class="row">
                                                                
                                                                  
                                                                  <div className="col-md-3">
                                                                  <div class="form-group">
                                                                  <label for="sw-arrows-first-name" >Returnable<span className="mandatory">*</span></label>
                                                                  
                                                                  <select class="form-control custom-select"
                                                                  disabled={!this.state.IsVisible}
                                                                  value={this.props.sockscredential.Returnable}
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
                                                                  disabled={!this.state.IsVisible}
                                                                  value={this.props.sockscredential.ReturnableDays}
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
                                                                      disabled={!this.state.IsVisible}
                                                                        value={this.props.sockscredential.HSNCode}
                                                                        onChange={this.onChangeHsn.bind(this)}
                                                                    />
                                                                      
                                                                  </div>
                                                              </div>
                                                              <div class="col-md-3">
                                                              <div class="form-group mb-2">
                                                                  <label for="validationCustom05">GST Rate(%)<span className="mandatory">*</span></label>
                                                                 
                                                                    <select class="form-control custom-select"
                                                                    disabled={!this.state.IsVisible}
                                                                    value={this.props.sockscredential.GstRate}
                                                                    onChange={this.onChangeGst.bind(this)} >
                                                                    { this.state.GSTData.map(gst => (
                                                                        <option key={gst.value} value={gst.value}>
                                                                        {gst.label}
                                                                   </option>
                                                                       ))}
                                                                 
                                                                  </select>
                                                                  
                                                              </div>
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
                                                                            disabled={!this.state.IsVisible} 
                                                                            // onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '4',
                                                                            //         Page3 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                            onClick={this.SaveSocks.bind(this)} >Update Socks Item</button>
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
        sockscredential: state.SocksItemReducers
    }
  }
  export default connect(mapStateToProps, {
    setsocksitemname,
    setsocksgender,
    setsocksitemtype,
    setsocksbrand,
    setsockscompany,
    setsocksmanufacture,
    setsocksmarketer,
    setsocksreturnable,
    setsocksreturnabledays,
    setsockshsn,
    setsocksgst,
    setclearsocksitem
    

  }) (ViewSocks);
