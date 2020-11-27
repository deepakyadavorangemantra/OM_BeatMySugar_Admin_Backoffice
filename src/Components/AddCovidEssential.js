import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import moment from 'moment';
import{
    setcoviditemname,
    setcovidbrand,
    setcovidcompany,
    setcovidmanufacture,
    setcovidmarketer,
    setcoviditemcategory,
    setcoviditemfilter,
    setcovidreturnable,
    setcovidreturnabledays,
    setcovidhsn,setcovidgst,
   setclearcoviditem

}
from './Actions/ActionType';

class covidEssential extends Component {

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
       
        DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
        NumRegex: /^[0-9]*$/,
        AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
        EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        Branddata:[],
        Categorydata:[],
        Filter:[],
        // Flavourdata:[],
        GSTData:[],
        Companydata:[],
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
              {value:'20', label:'20'},
              {value:'21', label:'21'},
              {value:'22', label:'22'},
              {value:'23', label:'23'},
              {value:'24', label:'24'},
              {value:'25', label:'25'},
              {value:'26', label:'26'},{value:'27', label:'27'},{value:'28', label:'28'},{value:'29', label:'29'},{value:'30', label:'30'},

          ],
          Description:'',
          keyIngridents:'',
          ManufactureData:[],
          MarketerData:[],
          isReturnable : true,

          AddAccess : false,

          CountryOfOrigin : 'India',
          CountryOrigindata : []
         
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "assets/js/pages/form-wizard.init.js";
        script.async = true;
        document.body.appendChild(script);

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });


          this.props.setclearcoviditem()
          Notiflix.Loading.Dots('');


        GetApiCall.getRequest("GetBrandData").then(resultdes =>
            resultdes.json().then(objbrand => {
            this.props.setcovidbrand(objbrand.data[0].value);
           
              this.setState({
                Branddata : objbrand.data,
                
              })
            }))
            GetApiCall.getRequest("GetCovidCategoryData").then(resultdes =>
                resultdes.json().then(objcategory =>{
                    this.props.setcoviditemcategory(objcategory.data[0].value);
                    this.setState({
                        Categorydata:objcategory.data,
                    })
                }))

                GetApiCall.getRequest("GetCovidFilterData").then(resultdes =>
                    resultdes.json().then(objfilter =>{
                    
                        this.setState({
                            Filterdata:objfilter.data,
                        })
                    }))
                    // GetApiCall.getRequest("GetFoodFlavourData").then(resultdes =>
                    //  resultdes.json().then(objflavour =>{
                    //     //  this.props.setfooditemflavor(objflavour.data[0].value);
                    //         this.setState({
                    //             Flavourdata:objflavour.data,
                    //         })
                    //     }))
                        GetApiCall.getRequest("GetGstData").then(resultdes =>
                            resultdes.json().then(objGst =>{
                                this.props.setcovidgst(objGst.data[0].value);
                                this.setState({
                                    GSTData:objGst.data,
                                })
                                // Notiflix.Loading.Remove()
                            }))
                            GetApiCall.getRequest("GetCompany").then(resultdes =>
                                resultdes.json().then(objcompany =>{
                                    this.setState({
                                        Companydata:objcompany.data,
                                        ManufactureData:objcompany.data,
                                       MarketerData:objcompany.data

                                    })
                          
                                }))


                                GetApiCall.getRequest("GetCountry").then(resultdes =>
                                    resultdes.json().then(obj => {
                          
                                          this.setState({
                                            CountryOrigindata : obj.data ,
                                            // CountryOfOrigin : FoodData.fld_countryoforigin == null || FoodData.fld_countryoforigin == '' ? 'India' : FoodData.fld_countryoforigin
                                           
                                          })

                                          

                                        }))


                       
    }
   

    onChangeitem(itemname){
        this.props.setcoviditemname(itemname.target.value)
     }
     onChangeBrand(brand){
        this.props.setcovidbrand(brand.target.value)
     }
     onChangeCompany(companyname){
        this.props.setcovidcompany(companyname.target.value)
     }
     onChangeManufact(manufactureName){
       //   console.log(manufactureName.target.value)
        this.props.setcovidmanufacture(manufactureName.target.value)
     }
     onchangemark(marketername){
         this.props.setcovidmarketer(marketername.target.value)
     }
     onChangeCat(category){
        this.props.setcoviditemcategory(category.target.value)
     }
   
  
    
     onchangeReturn(returnable){
         if(returnable.target.value == 'No'){
             this.setState({
                 isReturnable : false
             })
             this.props.setcovidreturnabledays(0)
         }else
         {
           this.setState({
               isReturnable : true
           })
           this.props.setcovidreturnabledays('1')
         }
     this.props.setcovidreturnable(returnable.target.value)
     }
     onChangeReturnday(returnday){
        this.props.setcovidreturnabledays(returnday.target.value)
     }
     onChangeHSN(hsncode){
         if(this.state.AlphaNumericRegex.test(hsncode.target.value)){
        this.props.setcovidhsn(hsncode.target.value)
     }}
     onChangeGst(gstrate){
       
     this.props.setcovidgst(gstrate.target.value)
     
   }
   onChangeFilter(filter){
       this.setState({Filter:filter})
   }
   
   
 
    
      
      nextlabel(){
        if(this.props.covidcredential.ItemName!=''){
            if(this.props.covidcredential.ItemName.length <=160){
             if(this.props.covidcredential.Brand!=''){
           if(this.props.covidcredential.CompanyName!=''){
            if(this.props.covidcredential.Category!=''){
                if(this.state.Filter.length>0){

              
            this.setState({
                PageTitle: '2',
                Page1: 'Done'
            }) 
        }
        else{
            Notiflix.Notify.Failure('Please select covid and health essentials filters.')
         }

        }
        else{
            Notiflix.Notify.Failure('Please select covid and health essentials category.')
         }
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
                Notiflix.Notify.Failure('Please enter covid and health essentials item name with less then 160 characters.')
              }
            }

          else{
           Notiflix.Notify.Failure('Please enter covid and health essentials item name.')
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
                Notiflix.Notify.Failure('Please enter covid and health essentials description.')
              }
            }
        

            onChangekey(keyingridents){
                this.setState({keyIngridents:keyingridents.editor.getData()})
            }

      
nextlabel3(){
     
   
    this.setState({
        PageTitle : '4',
        Page3 : 'Done'
    })

}

onPost = () =>{

    var count = 0

    var login=localStorage.getItem('LoginDetail');
    var details=JSON.parse(login)



   Notiflix.Loading.Dots('');

   PostApiCall.postRequest({

        name : this.props.covidcredential.ItemName,
        brandid : this.props.covidcredential.Brand,
        companyid : this.props.covidcredential.CompanyName,
        manufacturerid : this.props.covidcredential.ManufactureName,
        marketerid : this.props.covidcredential.MarketerName,
        categoryid : this.props.covidcredential.Category,
         description : this.state.Description,
        keyingredients : this.state.keyIngridents,
        reutrnable : this.props.covidcredential.Returnable,
        returnabledays : this.props.covidcredential.ReturnableDays,
        hsncode : this.props.covidcredential.HSNCode,
        gstpercent : this.props.covidcredential.GstRate,
        approved : 'No',
        updatedon : moment().format('lll'),
        updatedby : details[0].fld_staffid,
        countryoforigin : this.state.CountryOfOrigin
 
     },"AddCovidEssentialsItemMaster").then((results) => 
     
       // const objs = JSON.parse(result._bodyText)
       results.json().then(obj => {
 
     
       if(results.status == 200 || results.status==201){

           for(var i =0 ; i<this.state.Filter.length;i++){

               PostApiCall.postRequest({
 
                 covidid : (JSON.parse(JSON.stringify(obj.data[0]))).CovidItemId,
                 filterid: this.state.Filter[i].value,
                 updatedon : moment().format('lll'),
                 updatedby : details[0].fld_staffid
                
              },"AddCovidItemMaster_FilterMapping").then((results) => 
              
                // const objs = JSON.parse(result._bodyText)
                results.json().then(obj => {
          
              
                if(results.status == 200 || results.status==201){

                 count = count + 1;

                 if(count == this.state.Filter.length){
                  this.props.setclearcoviditem()
                   Notiflix.Loading.Remove()
                   Notiflix.Notify.Success('Covid & Health Essentials item master successfully added.')
                 window.location.href = '/covidessentialsmasterlist'
                 }
                }
             
               }))
               }

       }
       else{
           Notiflix.Loading.Remove()
           Notiflix.Notify.Failure('Covid item already present.')
         }
   }
       )
     )
}

SaveProduct(){
    if(this.props.covidcredential.Returnable!=''){
        if(this.props.covidcredential.HSNCode!=''){

        //   console.log(this.props.covidcredential)
          this.onPost();

          }
           else{
               Notiflix.Notify.Failure('Please enter HSN code.')
               }
  
             }
               else{
                Notiflix.Notify.Failure('Please select if the item is returnable or not.')
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
                                                <li class="breadcrumb-item"><a href="">Product Management</a></li>
                                                <li class="breadcrumb-item"><a href="/covidessentialsmasterlist">Covid & Health Essentials List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add New Covid & Health Essentials Item</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Add New Covid & Health Essentials Item</h4>
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
                                                        }} class="wizardlist nav-link">Covid & Health Essentials Item Information                                                        </a></li>

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
                                                            class="wizardlist nav-link">Key Ingridents</a></li>
                                                 <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">GST & Return</a></li>
                                                
                                                    </ul>
                                                    <div className="p-3" style={{ minHeight: '0px' }}>
                                                        <div id="sw-arrows-step-1"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '1' ? 'block' : 'none',
                                                        overflow:'visible' }}
                                                        >
                                                            <form className="needs-validation" novalidate onSubmit={(e) => {
                                                                e.preventDefault()
                                                            }}>
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                style={{overflow:'visible'}}
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Covid & Health Essentials Item Information</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Item Name (160 Character)<span className="mandatory">*</span></label>
                                                                                    <input type="text" class="form-control" id="validationCustom05"
                                                                                    value={this.props.covidcredential.ItemName}
                                                                                    onChange={this.onChangeitem.bind(this)} />
                                                                                    
                                                                                </div>
                                                                            </div> 
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Brand<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                                value={this.props.covidcredential.Brand}
                                                                                onChange={this.onChangeBrand.bind(this)}>
                                                                                      <option>Select Brand</option>
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
                                                                            value={this.props.covidcredential.CompanyName}
                                                                            onChange={this.onChangeCompany.bind(this)}>
                                                                            <option></option>
                                                                            {this.state.Companydata.map(company =>(
                                                                                <option key={company.value} value={company.value}>
                                                                                {company.label}
                                                                           </option>
                                                                               ))}
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                             
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Manufacturer Name</label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                            value={this.props.covidcredential.ManufactureName}
                                                                            onChange={this.onChangeManufact.bind(this)}>
                                                                            <option></option>
                                                                            {this.state.ManufactureData.map(manufacture =>(
                                                                                <option key={manufacture.value} value={manufacture.value}>
                                                                                {manufacture.label}
                                                                           </option>
                                                                               ))}
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Marketer Name</label>
                                                                            
                                                                            <select class="form-control custom-select"
                                                                            value={this.props.covidcredential.MarketerName}
                                                                            onChange={this.onchangemark.bind(this)}>
                                                                            <option></option>
                                                                            {this.state.MarketerData.map(marketername =>(
                                                                                <option key={marketername.value} value={marketername.value}>
                                                                                {marketername.label}
                                                                           </option>
                                                                               ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Category<span className="mandatory">*</span></label>
                                                                            
                                                                            <select class="form-control custom-select" 
                                                                            value={this.props.covidcredential.Category}
                                                                             onChange={this.onChangeCat.bind(this)}>
                                                                                   <option>Select Category</option>
                                                                               {this.state.Categorydata.map(category =>(
                                                                                <option key={category.value} value={category.value}>
                                                                                {category.label}
                                                                           </option>
                                                                               ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                            </div>
                                                                            
                                                                          
                                                                            <div class="col-md-6">
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

                                                                            <div class="col-md-12">
                                                                            <div class="form-group">
                                                                            <label for="sw-arrows-first-name" >Filter<span className="mandatory">*</span></label>
                                                                            
                                                                            <Select 
                                                                            options={this.state.Filterdata}
                                                                                value={this.state.Filter}
                                                                                onChange={this.onChangeFilter.bind(this)}
                                                                                isMulti
                                                                        />
                                                                        </div>
                                                                            </div>


                                                                            <div className="fade show col-md-12" role="alert" aria-live="assertive"
                                                                            aria-atomic="true" data-toggle="toast">
        
                                                                            <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>
        
                                                                                <button className="btn btn-secondary sw-btn-prev btn-radius-right" disabled={true}  >Previous</button>
                                                                                <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                                
                                                                                onClick={this.nextlabel.bind(this)}>Next</button>
                                                                            </div>
                                                                        </div>
                                                                                    
                                                                                  
                                                                                </div>
                                                                                
                                                                         

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>

                                                                        
                                                                     
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
                                                                        data={this.state.Description}
                                                                        onChange={this.onChangeDescription.bind(this)}
                                                                          />
                                                                    </div>
                                                                </div>
                                                                    </div> 

                                                                    
                                                            <div className="fade show col-md-12" role="alert" aria-live="assertive"
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
                                                                    <strong class="mr-auto">Key Ingredients</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    <div class="col-md-12">
                                                                    <div class="form-group">
                                                                    <label for="sw-arrows-first-name" >Key Ingredients</label>
                                                                    
                                                                    <div class="niceeditors">
                                                                    <CKEditor
                                                                    config={{
                                                                        extraPlugins: "justify,font,colorbutton",
                                                                     }}
                                                                    data={this.state.keyIngridents}
                                                                    onChange={this.onChangekey.bind(this)}
                                                                          />
                                                                    </div>
                                                                </div>
                                                                    </div> 

                                                                    <div className="fade show col-md-12" role="alert" aria-live="assertive"
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
                                                                              onClick={this.nextlabel3.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">GST & Return</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                <div class="row">
                                                                <div className="col-md-3">
                                                                <div class="form-group">
                                                                <label for="sw-arrows-first-name" >Returnable<span className="mandatory">*</span></label>
                                                                
                                                                <select class="form-control custom-select" 
                                                                value={this.props.covidcredential.Returnable}
                                                                onChange={this.onchangeReturn.bind(this)}>
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
                                                                value={this.props.covidcredential.ReturnableDays}
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
                                                                     value={this.props.covidcredential.HSNCode}
                                                                     onChange={this.onChangeHSN.bind(this)} />
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                            <div class="form-group mb-2">
                                                                <label for="validationCustom05">GST Rate(%)<span className="mandatory">*</span></label>
                                                              <select class="form-control custom-select"
                                                               value={this.props.covidcredential.GstRate}
                                                               onChange={this.onChangeGst.bind(this)}>
                                                               {this.state.GSTData.map(GST =>(
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
                                                                                        PageTitle: '3',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                            //  onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.SaveProduct.bind(this)}>Add Covid Item</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}
                                                       

                                                    
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
        covidcredential: state.CovidReducers
    }
  }
  export default connect(mapStateToProps, {
    setcoviditemname,
    setcovidbrand,
    setcovidcompany,
    setcovidmanufacture,
    setcovidmarketer,
    setcoviditemcategory,
    setcoviditemfilter,
    setcovidreturnable,
    setcovidreturnabledays,
    setcovidhsn,setcovidgst,
  
    setclearcoviditem
    

  }) (covidEssential);
