import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import moment from 'moment'
import {XSquare} from 'react-feather';
import{
    setitemname,
    setbrand,
    setfoodcompany,
    setfoodmanufacture,
    setfoodmarketer,setfooditemcategory,
    setfooditemfilter,
    setfooditemdescription,
    setkey,setreturnable,
    setreturnabledays,
    setfoodhsn,setfoodgst,
    setfoodsku,
    setfoodvarient,setfoodpackaging,
    setpackagingweight,setweight,
    setunit,setfoodprice,
    setfooddiscount,setfooddiscountprice,
    setfoodtitle,
    setfoodkey,setfoodmeta,
    setfoodvendor,
    setfoodvendoritem,
    setfoodmargin,
    setfoodbmsmargin,
    setfoodapproval,
    setpacklength,
    setpackbreadth,
    setpackheight,
    setpackunit,
    setpackweightunit,
    setweightunit,
    setclearfooditem,

}
from './Actions/ActionType';
import GetApiCall from '../GetApi'
import {Edit3,Trash2,Monitor} from 'react-feather';
import PostApiCall from '../Api';

var arr = []
var arr2 = [];
 

const ImgUploadCover =({
    onChange,
    onCancel,
    src
  })=>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload" >
        <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
      
      </div>
    
     
   
      <input id="photo-upload" type="file" onChange={onChange}/> 

      <XSquare class='product-img'
       onClick={onCancel}
       ></XSquare>
    </label>


class FoodVariant extends Component {

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
            Page7 : 'Pending',
            imagePreviewUrlCover: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            FilterData:[{'label':'Mithai','value' : 'Mithai'},{'label':'Sour','value' : 'Sour'},{'label':'Mango','value' : 'Mango'},{'label':'Grapes','value' : 'Grapes'}
          
        ],

        ImageCoverData : [],
        Photos : [
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : ''},
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : ''},
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : ''},
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : ''},
   
          ],
          imageCount : 0,
        WeightData: [
            { value: "gm", label: "gm" },
            { value: "kg", label: "kg" },
            { value: "ml", label: "ml" },
            { value: "ltr", label: "ltr" },
            
          ],
          PackageMeasuretData: [
            { value: "gm", label: "gm" },
            { value: "kg", label: "kg" },
          
            
          ],
          PackageMeasureUnitData: [
            { value: "cm", label: "cm" },
            { value: "inches", label: "inches" },
          
            
          ],

          AvailabilityData: [
            { value: "In stock", label: "In stock" },
            { value: "Out of stock", label: "Out of stock" },
            { value: "Banned", label: "Banned" },
            { value: "Discontinued", label: "Discontinued" },
            
          ],

          PackagingTypeData : [],

          DecimalRegex : /^(\d*\.?\d{0,2}|\.\d{0,9})$/,
        NumRegex: /^[0-9]*$/,
        AlphaNumericRegex : /^[a-zA-Z0-9]*$/,
        EmailRegex :  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        UrlRegex : /^(https:\/\/www\.|https:\/\/www\.|https:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,

        Status : 'Yes',
        Availability:'In stock',

        MasterId : '',
        VolumetricWeight : 0,


        VendorPricing : [],
        Name : '',
        Sku : '',
        Margin : 0,
        MarginPercent : 0,
        VenName : '',
        MarginOn : '',
        VendorSellingPrice : 0,
        isVendorSellingVisible : true,
        VendorData : [],

        MarginOnData : [
            {label : 'Maximum Retail Price (MRP)',value : 'Maximum Retail Price (MRP)'},
            {label : 'Vendor Selling Price' , value : 'Vendor Selling Price'}
        ],


        AddAccess : false,

        ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',


        CustomerBasePrice: 0,
        InvoiceGstAmount : 0,
        MasterData : [],
        TcsValue : 0,
        TdsValue : 0,
        VendorBasePrice : 0,
        BMSDiscount : 0,
        ColorData:[],
        Color:0,
        SizeData :[],
        Size : 0
         
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

        this.props.setclearfooditem()

        Notiflix.Loading.Dots('');

        var det = localStorage.getItem('CovidParentIdDetails')
        var MasterData = JSON.parse(det)


        // console.log(MasterData)

        this.setState({
            MasterId : MasterData.fld_id,
            MasterData : MasterData
        })


        var vardt = localStorage.getItem('CovidVariantDetails')
        var VariantData = JSON.parse(vardt)

        console.log(VariantData)


        this.props.setfoodvarient(VariantData.fld_name)
        this.props.setfoodpackaging(VariantData.fld_packagingtypeid)
        this.props.setpackagingweight(VariantData.fld_packageweight)
        this.props.setweight(VariantData.fld_productweight)
        this.props.setfoodprice(VariantData.fld_price)
        this.props.setfooddiscount(VariantData.fld_discountpercent)
        this.props.setfooddiscountprice(VariantData.fld_discountprice)
        this.props.setfoodtitle(VariantData.fld_titlebar)
        this.props.setfoodkey(VariantData.fld_keywords)
        this.props.setfoodmeta(VariantData.fld_metadescription)
        this.props.setpacklength(VariantData.fld_length)
        this.props.setpackbreadth(VariantData.fld_breadth)
        this.props.setpackheight(VariantData.fld_heigth)
        this.props.setpackunit(VariantData.fld_volumnetricunit)
        this.props.setpackweightunit(VariantData.fld_packageunit)
        this.props.setweightunit(VariantData.fld_productunit)

        // console.log(VariantData.fld_sku)

        this.setState({
            VolumetricWeight : VariantData.fld_volumetricweight,
            Status : VariantData.fld_showonwebsite,
            Availability : VariantData.fld_availability,
            VariantId : VariantData.fld_id,
            SKU : VariantData.fld_sku,
            Color:VariantData.fld_colorid,
            Size : VariantData.fld_sizeid,
        })


        var cusbasepr = parseFloat(VariantData.fld_discountprice/(1+(MasterData.fld_gstpercent/100))).toFixed(2)

        var invoiceamt = parseFloat(cusbasepr*(MasterData.fld_gstpercent/100)).toFixed(2)

        this.setState({
            CustomerBasePrice : cusbasepr,
            InvoiceGstAmount : invoiceamt,
            TcsValue : parseFloat(cusbasepr*(MasterData.TcsPercent/100)).toFixed(2),
            TdsValue : MasterData.TdsPercent == 0 ? 0 : parseFloat(cusbasepr*(MasterData.TdsPercent/100)).toFixed(2)
        })

        

        var qua = []
        // console.log(VariantData.VendorPricing)
        if(VariantData.VendorPricing != null){
            for(var i = 0; i < VariantData.VendorPricing.split('*').length ; i++){
                
                var mar = VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? parseFloat(VariantData.fld_price*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100)).toFixed(2) : parseFloat(VariantData.VendorPricing.split('*')[i].split('#')[3]*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100)).toFixed(2)
                var dis = VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? parseFloat(VariantData.fld_price - VariantData.fld_discountprice) : parseFloat(VariantData.VendorPricing.split('*')[i].split('#')[3] - VariantData.fld_discountprice)
                var cstp = VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? parseFloat(VariantData.fld_price - (VariantData.fld_price*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100))).toFixed(2) : parseFloat(VariantData.VendorPricing.split('*')[i].split('#')[3] - (VariantData.VendorPricing.split('*')[i].split('#')[3]*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100))).toFixed(2)

                this.setState({
                    Name : VariantData.VendorPricing.split('*')[i].split('#')[0],
                    Sku : VariantData.VendorPricing.split('*')[i].split('#')[1],
                    MarginOn : VariantData.VendorPricing.split('*')[i].split('#')[2],
                    VendorSellingPrice : VariantData.VendorPricing.split('*')[i].split('#')[3] == '0.00' ? undefined : VariantData.VendorPricing.split('*')[i].split('#')[3] ,
                    VendorBasePrice : VariantData.VendorPricing.split('*')[i].split('#')[3] == '0.00' ? undefined : parseFloat((VariantData.VendorPricing.split('*')[i].split('#')[3])/(1+(MasterData.fld_gstpercent/100))).toFixed(2) ,
                    isVendorSellingVisible : VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? false : true,
                    MarginPercent : VariantData.VendorPricing.split('*')[i].split('#')[5] ,
                    Margin : VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? parseFloat(VariantData.fld_price*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100)).toFixed(2) : parseFloat(VariantData.VendorPricing.split('*')[i].split('#')[3]*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100)).toFixed(2) ,
                    BMSDiscount : VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? parseFloat(VariantData.fld_price - VariantData.fld_discountprice) : parseFloat(VariantData.VendorPricing.split('*')[i].split('#')[3] - VariantData.fld_discountprice) ,
                    CostPrice : VariantData.VendorPricing.split('*')[i].split('#')[2] == 'Maximum Retail Price (MRP)' ? parseFloat(VariantData.fld_price - (VariantData.fld_price*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100))).toFixed(2) : parseFloat(VariantData.VendorPricing.split('*')[i].split('#')[3] - (VariantData.VendorPricing.split('*')[i].split('#')[3]*(VariantData.VendorPricing.split('*')[i].split('#')[5]/100))).toFixed(2),
                    BMSSplitAmount : parseFloat((parseFloat(mar)+parseFloat(cusbasepr*(MasterData.TcsPercent/100))+(MasterData.TdsPercent == 0 ? 0 : parseFloat(cusbasepr*(MasterData.TdsPercent/100))))-dis).toFixed(2),
                    VendorSplitAmount : parseFloat(cstp - parseFloat(cusbasepr*(MasterData.TcsPercent/100)) - (MasterData.TdsPercent == 0 ? 0 : parseFloat(cusbasepr*(MasterData.TdsPercent/100)))).toFixed(2)
                })


                qua.push({

                    Name : VariantData.VendorPricing.split('*')[i].split('#')[0] ,
                    Sku: VariantData.VendorPricing.split('*')[i].split('#')[1] ,
                    MarginOn : VariantData.VendorPricing.split('*')[i].split('#')[2] ,
                    VendorSellingPrice : VariantData.VendorPricing.split('*')[i].split('#')[3] == '0.00' ? undefined : VariantData.VendorPricing.split('*')[i].split('#')[3] ,
                    Margin: VariantData.VendorPricing.split('*')[i].split('#')[4] ,
                    MarginPercent : VariantData.VendorPricing.split('*')[i].split('#')[5] ,
                    VenName : VariantData.VendorPricing.split('*')[i].split('#')[6] 

                })
            }
            arr = qua
            console.log(qua)
            this.setState({
                VendorPricing : qua,
                
            })
         
        }


        var qua1 = [...this.state.Photos]
        var cn = 0 
        if(VariantData.VariantImage != null){
            for(var i = 0; i < VariantData.VariantImage.split('#').length ; i++){

                if(i == 0){

                    this.setState({
                        imagePreviewUrlCover : VariantData.VariantImage.split('#')[0]
                    })
                }else{

                    cn = cn +1

                    // console.log((VariantData.VariantImage.split('#')[i].split('-').pop()).split('.')[0])
                    // this.setState({
                    //     imageCount : this.state.imageCount +1
                    // })
                    qua1[((VariantData.VariantImage.split('#')[i].split('-').pop()).split('.')[0])-1].image = VariantData.VariantImage.split('#')[i]
                    qua1[((VariantData.VariantImage.split('#')[i].split('-').pop()).split('.')[0])-1].url = VariantData.VariantImage.split('#')[i]
                    qua1[((VariantData.VariantImage.split('#')[i].split('-').pop()).split('.')[0])-1].remove = 'No'

                }
                
            }

            this.setState({
                Photos : qua1,
                imageCount : cn
                
            })
        }




        GetApiCall.getRequest("GetVendorData").then(resultdes =>
            resultdes.json().then(objcategory =>{

        
      
                this.setState({
                    VendorData:objcategory.data,
                })
                // console.log(objcategory.data)

            }))

        GetApiCall.getRequest("GetPackagingTypeData").then(resultdes =>
            resultdes.json().then(objcategory =>{

                var a = []
                a.push({label:'N/A',value:0})
                var na = [...a,...objcategory.data]
                this.setState({
                    PackagingTypeData: na
                })


                // this.props.setweightunit(this.state.WeightData[0].value)
                // this.props.setpackweightunit(this.state.PackageMeasuretData[0].value)
                // this.props.setpackunit(this.state.PackageMeasureUnitData[0].value)

                // Notiflix.Loading.Remove()
            }))


            GetApiCall.getRequest("GetCovidColorData").then(resultdes =>
                resultdes.json().then(objcategory =>{
                    // this.props.setcolor(objcategory.data[0].value)
                    var b = []
                    b.push({label:'N/A',value:0})
                    var nb = [...b,...objcategory.data]
                    this.setState({
                        ColorData:nb,
                    })
    
                }))


                GetApiCall.getRequest("GetCovidSizeData").then(resultdes =>
                    resultdes.json().then(objcategory =>{
                        // this.props.setfootwearitemsize(objcategory.data[0].value)
                        var c = []
                        c.push({label:'N/A',value:0})
                        var nc = [...c,...objcategory.data]
                        this.setState({
                            SizeData:nc,
                        })
                        // Notiflix.Loading.Remove()
        
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
       
                        if(filteredRights[i].fld_menuname == 'Add Food'){
            
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
        if(e.target.files[0] != undefined){
        if (e.target.files[0].size < 300000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrlCover: reader.result,
            ImageCoverData : file
          });
        }
        reader.readAsDataURL(file);
    } else {
        Notiflix.Notify.Failure("File too large, upload file less than 300 kb.");
      }
    }
      }

      onCancelPressed  = e =>{
        e.preventDefault();
        this.setState({
          imagePreviewUrlCover: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png'
        })
      }
  
   
    
      onchangesku(sku){
          if(this.state.AlphaNumericRegex.test(sku.target.value)){
          this.props.setfoodsku(sku.target.value)
          }
      }
      onChangeVarient(varientname){
          this.props.setfoodvarient(varientname.target.value)
      }

      onChangeSize(size){
        // this.props.setfoodvarientsize(size.target.value)
        this.setState({
            Size: size.target.value
        })
    }
      onChangePack(packagetype){
          this.props.setfoodpackaging(packagetype.target.value)
      }

        
      nextlabel(){
        //    if(this.props.foodcredential.ItemSkuBms!=''){
               if(this.props.foodcredential.VarientName!=''){
                if(this.props.foodcredential.VarientName.length < 160){
                    // if(this.state.Color!=''){

                   

                        this.setState({
                            PageTitle: '2',
                            Page1: 'Done'
                        }) 
                    // }
                           
                    // else{
                    //     Notiflix.Notify.Failure('Please select variant color.')
                    //    }
                }
                                
                           else{
                            Notiflix.Notify.Failure('Please enter covid variant name with less then 160 characters.')
                           }
                       }
                       else{
                        Notiflix.Notify.Failure('Please enter variant name.')
                       }
                    // }
                    // else{
                    //     Notiflix.Notify.Failure('Please enter item SKU of BeatMySugar.')
                    // }

              }

     
      onChangepackweight(packweight){
        if((this.state.DecimalRegex.test(packweight.target.value))){
          this.props.setpackagingweight(packweight.target.value)
      }
    }
      onChangeWeight(weight){
        if((this.state.DecimalRegex.test(weight.target.value))){
          this.props.setweight(weight.target.value)
      }
    }
    
    onChangeLength(length){
        if((this.state.DecimalRegex.test(length.target.value))){
        this.props.setpacklength(length.target.value)

       var vw = length.target.value*this.props.foodcredential.Packbreadth*this.props.foodcredential.Packheight
      var total = vw
       if(this.props.foodcredential.Packunit == 'cm'){

        total = vw/ 5000
        this.setState({
            VolumetricWeight : parseFloat(total*1000).toFixed(2)
        })

       }else{
        total = vw/ 305
        this.setState({
            VolumetricWeight : parseFloat(total*1000).toFixed(2)
        })

       }
    }
}
    onChangebreadth(breadth){
        if((this.state.DecimalRegex.test(breadth.target.value))){
        this.props.setpackbreadth(breadth.target.value)

        var vw = breadth.target.value*this.props.foodcredential.Packlength*this.props.foodcredential.Packheight
        var total = vw
         if(this.props.foodcredential.Packunit == 'cm'){
  
          total = vw/ 5000
          this.setState({
              VolumetricWeight : parseFloat(total*1000).toFixed(2)
          })
  
         }else{
          total = vw/ 305
          this.setState({
              VolumetricWeight : parseFloat(total*1000).toFixed(2)
          })
  
         }
    }
}
    onChangeHeight(height){
        if((this.state.DecimalRegex.test(height.target.value))){
        this.props.setpackheight(height.target.value)

        var vw = height.target.value*this.props.foodcredential.Packlength*this.props.foodcredential.Packbreadth

        var total = vw
         if(this.props.foodcredential.Packunit == 'cm'){
  
          total = vw/ 5000
          this.setState({
              VolumetricWeight : parseFloat(total*1000).toFixed(2)
          })
  
         }else{
          total = vw/ 305
          this.setState({
              VolumetricWeight : parseFloat(total*1000).toFixed(2)
          })
  
         }
        
    }
}
    onChangePackunit(unitofmeasurement){
        this.props.setpackunit(unitofmeasurement.target.value)

        var vw = this.props.foodcredential.Packheight*this.props.foodcredential.Packlength*this.props.foodcredential.Packbreadth

        var total = vw
         if(unitofmeasurement.target.value == 'cm'){
  
          total = vw/ 5000
          this.setState({
              VolumetricWeight : parseFloat(total*1000).toFixed(2)
          })
  
         }else{
          total = vw/ 305
          this.setState({
              VolumetricWeight : parseFloat(total*1000).toFixed(2)
          })
  
         }
    }
    onChangeWeightmeasure(unitofmeasurement){
        this.props.setpackweightunit(unitofmeasurement.target.value)
    }
    onChangeWeightUnits(unitmeasurement){
        this.props.setweightunit(unitmeasurement.target.value)

    }
    
        nextlabel2(){
                     if(this.props.foodcredential.Packlength!=''){
                        if(this.props.foodcredential.Packbreadth!=''){
                            if(this.props.foodcredential.Packheight!=''){
             
                                if(this.props.foodcredential.PackageWeight!=''){
                  
                                    if(this.props.foodcredential.Weight!=''){
                                                      
                                       this.setState({
                                            PageTitle : '3',
                                            Page2 : 'Done'
                                        })
                                                                
                                 
                                 }
                                    else{
                                        Notiflix.Notify.Failure('Please enter product net content weight.')
                                    }
                                    
                      
                                 }
                                    else{
                                        Notiflix.Notify.Failure('Please enter package weight.')
                                    }
                                    
                      
                             }
                                else{
                                    Notiflix.Notify.Failure('Please enter package height.')
                                }  
                            }
                            else{
                                Notiflix.Notify.Failure('Please enter package breadth.')
                            }
                        }
                    
                        else{
                            Notiflix.Notify.Failure('Please enter package length.')
                        }
                
        }

        onChangeprice(price){
            if((this.state.DecimalRegex.test(price.target.value))){
                this.props.setfoodprice(price.target.value)

                var amt = 0

                // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                 amt=parseFloat(price.target.value-(this.props.foodcredential.DiscountPer*price.target.value)/100).toFixed(2)
          
                // }else
                // {
                //  amt=parseFloat(this.state.VendorSellingPrice-(this.props.foodcredential.DiscountPer*this.state.VendorSellingPrice)/100).toFixed(2)

                // }
                this.props.setfooddiscountprice(amt)


                var cusbasepr = parseFloat(amt/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)

                var invoiceamt = parseFloat(cusbasepr*(this.state.MasterData.fld_gstpercent/100)).toFixed(2)

                this.setState({
                    CustomerBasePrice : cusbasepr,
                    InvoiceGstAmount : invoiceamt,
                    TcsValue : parseFloat(cusbasepr*(this.state.MasterData.TcsPercent/100)).toFixed(2),
                    
                })

              }
            }

          
        onChangeDiscount(discount){
            if((this.state.DecimalRegex.test(discount.target.value))){
            this.props.setfooddiscount(discount.target.value)

            var amt = 0

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                amt=parseFloat(this.props.foodcredential.Price-(discount.target.value*this.props.foodcredential.Price)/100).toFixed(2)

            // }else
            // {
            //     amt=parseFloat(this.state.VendorSellingPrice-(discount.target.value*this.state.VendorSellingPrice)/100).toFixed(2)

            // }
            this.props.setfooddiscountprice(amt)


            var cusbasepr = parseFloat(amt/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)

            var invoiceamt = parseFloat(cusbasepr*(this.state.MasterData.fld_gstpercent/100)).toFixed(2)

            this.setState({
                CustomerBasePrice : cusbasepr,
                InvoiceGstAmount : invoiceamt,
                TcsValue : parseFloat(cusbasepr*(this.state.MasterData.TcsPercent/100)).toFixed(2),
              
            })

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){

                this.setState({
                    BMSDiscount : parseFloat(this.props.foodcredential.Price - amt).toFixed(2)
                })

            // }else
            // {
            //     this.setState({
            //         BMSDiscount : parseFloat(this.state.VendorSellingPrice - amt).toFixed(2)
            //     })

            // }

        }
    }
        onChangediscprice(discountprice){
            if((this.props.setfooddiscount(discountprice.target.value))){
            this.props.setfooddiscountprice(discountprice.target.value)

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
            this.props.setfooddiscount(parseFloat(((this.props.foodcredential.Price-discountprice.target.value)/this.props.foodcredential.Price)*100).toFixed(2))
            // }else
            // {
            // this.props.setfooddiscount(parseFloat(((this.state.VendorSellingPrice-discountprice.target.value)/this.state.VendorSellingPrice)*100).toFixed(2))

            // }

            var cusbasepr = parseFloat(discountprice.target.value/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)

            var invoiceamt = parseFloat(cusbasepr*(this.state.MasterData.fld_gstpercent/100)).toFixed(2)

            // console.log(parseFloat(cusbasepr*(this.state.MasterData.TcsPercent/100)).toFixed(2))
            this.setState({
                CustomerBasePrice : cusbasepr,
                InvoiceGstAmount : invoiceamt,
                TcsValue : parseFloat(cusbasepr*(this.state.MasterData.TcsPercent/100)).toFixed(2),
               
            })

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){

                this.setState({
                    BMSDiscount : parseFloat(this.props.foodcredential.Price - discountprice.target.value).toFixed(2)
                })

            // }else
            // {
            //     this.setState({
            //         BMSDiscount : parseFloat(this.state.VendorSellingPrice - discountprice.target.value).toFixed(2)
            //     })

            // }
            


        }
    }

        onChangeTitle(title){
            this.props.setfoodtitle(title.target.value)
        }
        onChangeKey(keyword){
            this.props.setfoodkey(keyword.target.value)
        }
        onChangemeta(metadata){
            this.props.setfoodmeta(metadata.target.value)
        }


nextlabel3(){
    if(this.props.foodcredential.Price!=''){
        if(this.props.foodcredential.DiscountPrice !=''){
                           this.setState({
                                          PageTitle : '4',
                                          Page3 : 'Done'
                                            })
                                              
                                        }else
                                        {
                                            Notiflix.Notify.Failure('Please enter product discounted price.')
                                        }
                                 }
                                 else{
                                    Notiflix.Notify.Failure('Please enter product price.')
                                 }
    
   
}

onChangeselect(selectvendor){
    this.props.setfoodvendor(selectvendor.target.value)

}
onChangeitemsku(itemsku){
 this.props.setfoodvendoritem(itemsku.target.value)
}
onChangeAmt(marginamount){
    if((this.state.DecimalRegex.test(marginamount.target.value))){
this.props.setfoodmargin(marginamount.target.value)
}
}
onChangeBMS(bmsmargin){
    if((this.state.DecimalRegex.test(bmsmargin.target.value))){
   this.props.setfoodbmsmargin(bmsmargin.target.value) 
    }
}
nextlabel4(){

    if(this.state.imagePreviewUrlCover != null ){

    if(this.state.imageCount > 0){

    this.setState({
        PageTitle : '5',
        Page4 : 'Done'
    })
}else
{
    Notiflix.Notify.Failure('Please upload atleast one product image.')  
}
}
    else
    {
        Notiflix.Notify.Failure('Please upload cover image for product.')
    }
}

nextlabel5(){
     if(this.props.foodcredential.Title!=''){
         if(this.props.foodcredential.Title.length < 60){
           
         
        
        if(this.props.foodcredential.Keyword!=''){
            if(this.props.foodcredential.Keyword.length < 250)
            {

            
           
            this.setState({
                PageTitle : '6',
                Page5 : 'Done'
            })
          
        }
        else{
            Notiflix.Notify.Failure('Please enter keywords with less then 250 characters.')
        }
    }
        else{
            Notiflix.Notify.Failure('Please enter keywords for product.')
        }
   
    }
    else{
        Notiflix.Notify.Failure('Please enter title bar name with less then 60 characters.')
    }

}
    else{
        Notiflix.Notify.Failure('Please enter title bar name for product.')
    }
    
}
    nextlabel6(){
        if(this.state.VendorPricing.length > 0){
     
                this.setState({
                    PageTitle : '7',
                    Page6 : 'Done'
                })
              
    }
    else{
        Notiflix.Notify.Failure('Add atleast one vendor pricing.')
    }
       
    }


    OnAddProductCoverImage(obj){

        var login=localStorage.getItem('LoginDetail');
  var details=JSON.parse(login)

  // console.log(this.state.imagedata != '')
  if(this.state.ImageCoverData != ''){

    
    const form = new FormData();
     
    form.append('file', this.state.ImageCoverData);
    form.append('foldername' , 'Covid')
    form.append('filename' , this.state.SKU+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).VariantId+'-0')
    
  fetch(this.state.ImageApiUrl, {
    method: 'POST',
    body: form
    }).then((image) => {
    
    image.json().then(data => ({
    data: data,
    status: image.status
    })
    ).then(res => {
   
      // console.log(obj.data[0])

      PostApiCall.postRequest({

        covidvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
        imageurl : 'https://images.beatmysugar.com/images/Covid/'+res.data.Message.split(',')[2].split('=')[1].trim(),
        updatedon : moment().format('lll'),
        updatedby : details[0].fld_staffid

 
     },"AddCovidVariantImage").then((results1) => 
     
       // const objs = JSON.parse(result._bodyText)
       results1.json().then(obj1 => {
 
     
       if(results1.status == 200 || results1.status==201){

        this.OnAddProductImages(obj)

       }
      }))
    })
   
  })

}else
{

    PostApiCall.postRequest({

        covidvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
        imageurl : this.state.imagePreviewUrlCover,
        updatedon : moment().format('lll'),
        updatedby : details[0].fld_staffid

 
     },"AddCovidVariantImage").then((results1) => 
     
       // const objs = JSON.parse(result._bodyText)
       results1.json().then(obj1 => {
 
     
       if(results1.status == 200 || results1.status==201){
  // console.log('in no cover')
  this.OnAddProductImages(obj)
       }
}))
}
    }


    OnAddProductImages(obj){

        var login=localStorage.getItem('LoginDetail');
        var details=JSON.parse(login)
      
       var empty = 0

       var count = 0
      
        for(var i =0 ; i <this.state.Photos.length;i++){
      
          // console.log(this.state.Photos)
        
      
          if(this.state.Photos[i].value != ''){
      
            const form1 = new FormData();
      
            // console.log(this.state.Photos[i].data)
         
        form1.append('file', this.state.Photos[i].data);
        form1.append('foldername' , 'Covid')
        form1.append('filename' , this.state.SKU+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).VariantId+'-'+(i+1))
        
       fetch(this.state.ImageApiUrl, {
        method: 'POST',
        body: form1
        // eslint-disable-next-line no-loop-func
        }).then((image1) => {
        
        image1.json().then(data1 => ({
        data: data1,
        status: image1.status
        })
        ).then(res1 => {
        // console.log(res.data)
      
      
          PostApiCall.postRequest({
      
            covidvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
            imageurl : 'https://images.beatmysugar.com/images/Covid/'+res1.data.Message.split(',')[2].split('=')[1].trim(),
            updatedon : moment().format('lll'),
            updatedby : details[0].fld_staffid
      
      
         },"AddCovidVariantImage").then((results2) => 
         
           // const objs = JSON.parse(result._bodyText)
           results2.json().then(obj2 => {
      
         
           if(results2.status == 200 || results2.status==201){
      
            count = count + 1;
      
         
                if(count == this.state.Photos.length){
      
                    this.OnSaveVendorPricing(obj)
      
                }
      
           }
          }))
        
        
       
      })
        })
      
            
          }else
          {

            if(this.state.Photos[i].remove == 'Yes'){

                PostApiCall.postRequest({
      
                    covidvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
                    imageurl : this.state.Photos[i].url,
              
                 },"DeleteCovidVariantImage").then((results2) => 
                 
                   // const objs = JSON.parse(result._bodyText)
                   results2.json().then(obj2 => {
              
                 
                   if(results2.status == 200 || results2.status==201){

                    count = count + 1;
                    empty = empty +1
                    if(count == this.state.Photos.length){
                        this.OnSaveVendorPricing(obj)
                    }

                   }else{
                    count = count + 1;
                    empty = empty +1
                    if(count == this.state.Photos.length){
                        this.OnSaveVendorPricing(obj)
                    }

                   }

                }))

            }else if(this.state.Photos[i].remove == 'No')
            {
                PostApiCall.postRequest({
      
                    covidvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
                    imageurl : this.state.Photos[i].url,
                    updatedon : moment().format('lll'),
                    updatedby : details[0].fld_staffid
              
              
                 },"AddCovidVariantImage").then((results2) => 
                 
                   // const objs = JSON.parse(result._bodyText)
                   results2.json().then(obj2 => {
              
                 
                   if(results2.status == 200 || results2.status==201){
                    count = count + 1;
                    empty = empty +1
                    console.log(obj2)
                    if(count == this.state.Photos.length){
                        this.OnSaveVendorPricing(obj)

                      }
                   }
                }))
            }else
            {
                count = count + 1;
                    empty = empty +1
                    if(count == this.state.Photos.length){
                        this.OnSaveVendorPricing(obj)
                      }
            }
           
            
          }
      
         
      
        }
    }

    OnSaveVendorPricing(obj){


        var count1 =0 

  var login=localStorage.getItem('LoginDetail');
  var details=JSON.parse(login)

//   for(var j =0 ; j<this.state.VendorPricing.length;j++){

    PostApiCall.postRequest({

        covidvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
        vendorid : this.state.Name,
        sku : this.state.Sku,
        marginon : this.state.MarginOn,
        vendorselling : this.state.VendorSellingPrice,
        margin :  this.state.Margin,
        marginpercent : this.state.MarginPercent,
         updatedon : moment().format('lll'),
         updatedby : details[0].fld_staffid,
         costprice : this.state.CostPrice


   },"AddCovidVariantVendorPricing").then((results3) => 
   
     // const objs = JSON.parse(result._bodyText)
     results3.json().then(obj3 => {

   
     if(results3.status == 200 || results3.status==201){

    //   count1 = count1 + 1;

    //   if(count1 == this.state.VendorPricing.length){
    console.log(obj3)
        Notiflix.Loading.Remove()
        this.props.setclearfooditem()
        Notiflix.Notify.Success('Covid variant added successfully.')
        window.location.href = '/covidvariantlist'
    //   }
     }
  
    }))
    // }

    }

SaveVariant(){
    if(this.state.Availability!='')
    {
        if(this.state.Status!=''){

           
            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
              
   
            Notiflix.Loading.Dots('');
                
                PostApiCall.postRequest({

                     id : this.state.VariantId,
                     covidid : this.state.MasterId,
                     name : this.props.foodcredential.VarientName,
                     colorid:this.state.Color,
                     sizeid : this.state.Size,
                     packagingtypeid : this.props.foodcredential.PackagingType,
                     length : this.props.foodcredential.Packlength,
                     breadth : this.props.foodcredential.Packbreadth,
                     height : this.props.foodcredential.Packheight,
                     volunit : this.props.foodcredential.Packunit,
                     volweight : this.state.VolumetricWeight,
                     packunit : this.props.foodcredential.PackWeightUnit,
                     packweight : this.props.foodcredential.PackageWeight,
                     produnit : this.props.foodcredential.WeightUnit,
                     prodweight : this.props.foodcredential.Weight,
                     price : this.props.foodcredential.Price,
                     discountpercent : this.props.foodcredential.DiscountPer,
                     discountprice : this.props.foodcredential.DiscountPrice,
                     titlebar : this.props.foodcredential.Title,
                     metadescription : this.props.foodcredential.MetaDescription,
                     keywords : this.props.foodcredential.Keyword,
                     availability : this.state.Availability,
                     showonwebsite : this.state.Status,
                     approved : 'No',
                     updatedby : details[0].fld_staffid,
                     updatedon : moment().format('lll'),
                          },"UpdateCovidVariant").then((results) => 
                 
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(obj => {
             
                 
                    if(results.status == 200 || results.status==201){

                    console.log(obj)
                        this.OnAddProductCoverImage(obj)
 

                    }else{
                        Notiflix.Loading.Remove()
                        Notiflix.Notify.Failure(obj.data)
                    }

                }))

           

        } 
        else{
            Notiflix.Notify.Failure('Please select whether to show variant on website or not.')
        }
    }
    else{
        Notiflix.Notify.Failure('Please select availability of prodcut.')
    }
}



OnAddVendorPricing(){
    if(this.state.Name != ''){
        if(this.state.Sku != ''){
            if(this.state.MarginOn != ''){
                if(this.state.VendorSellingPrice != 0){
        //   if(this.state.MarginPercent != ''){
           
            var dt = this.state.VendorPricing.filter((value)=> value.Name == this.state.Name)

            if(dt == '')
            {
                
                arr.push({
                  Name : this.state.Name ,
                  Sku: this.state.Sku,
                  MarginOn : this.state.MarginOn,
                  VendorSellingPrice : this.state.VendorSellingPrice,
                  Margin: this.state.Margin,
                  MarginPercent : this.state.MarginPercent,
                  VenName : this.state.VenName,
                  CostPrice : this.state.CostPrice,
                  BMSSplitAmount : this.state.BMSSplitAmount,
                  VendorSplitAmount : this.state.VendorSplitAmount,
                  VendorBasePrice : this.state.VendorBasePrice
                
                })

             

              this.setState({
                VendorPricing: arr
              })
                 
                this.setState({
                    Name : '' ,
                  Sku: '',
                MarginOn : '',
                VendorSellingPrice : 0,
                  Margin: '',
                  MarginPercent : '',
                  VenName : '',
                  CostPrice : '',
                  BMSSplitAmount : '',
                  VendorSplitAmount : '',
                  VendorBasePrice : ''
                })
            }
            else
            {
                Notiflix.Notify.Failure('Vendor pricing already added.'); 
            } 

                

              
        //   }else
        //   {
        //     Notiflix.Notify.Failure('Please enter margin percent.');
        //   }
        }else
        {
          Notiflix.Notify.Failure('Please enter vendor selling price.');
        }
        }else
        {
          Notiflix.Notify.Failure('Please select the basis on which BMS margin depends.');
        }
        }else
        {
          Notiflix.Notify.Failure('Please enter vendor product sku.');
        }
      }else
      {
        Notiflix.Notify.Failure('Please select vendor name.');
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
                                                <li class="breadcrumb-item"><a href="/covidessentialsmasterlist">Covid List</a></li>
                                                <li class="breadcrumb-item"><a href="/covidvariantlist">Covid Variant List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">View Covid Variant</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Covid Variant</h4>
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
                                                        }} class="wizardlist nav-link">Covid Item Variants                                                        </a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Packaging Size & Weight</a></li>
                                                            <li className={this.state.PageTitle == '3' ? 'active nav-item' : this.state.Page3 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page3 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '3',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">Pricing</a></li>
                                                      <li className={this.state.PageTitle == '4' ? 'active nav-item' : this.state.Page4 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page4 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '4',
                                                                        Page3: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">Product Image</a></li>
                                                 <li className={this.state.PageTitle == '5' ? 'active nav-item' : this.state.Page5 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page5 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '5',
                                                                        Page5: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                            class="wizardlist nav-link">SEO Details</a></li>
                                                 {/* <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page6 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '6',
                                                                        Page4: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Vendor Pricing</a></li> */}
                                                
                                                                <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page6 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '6',
                                                                            Page6: 'Done',
        
                                                                        })
                                                                    }
                                                                }}
                                                                    class="wizardlist nav-link">Status</a></li>
                                                   
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
                                                                <strong class="mr-auto">Covid Item Variants</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                   
                                                                   {/* <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Item SKU [BMS]<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control"
                                                                            value={this.props.foodcredential.ItemSkuBms}
                                                                            onChange={this.onchangesku.bind(this)}/>
                                                                        </div>
                                                                    </div> */}
                                                                    <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Variant Name (160 Character)<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control"  
                                                                            value={this.props.foodcredential.VarientName}
                                                                            onChange={this.onChangeVarient.bind(this)}/>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-2">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Size<span className="mandatory">*</span></label>
                                                                            <select class="form-control custom-select"
                                                                          value={this.state.Size} 
                                                                          onChange={this.onChangeSize.bind(this)} >
                                                                              {this.state.SizeData.map(brand => (
                           
                                                                                    <option key={brand.value} value={brand.value}>
                                                                                        {brand.label}
                                                                                    </option>
                                                                                    ))}
                                                                              
                                                                            
                                                                          </select>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-3">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Color<span className="mandatory">*</span></label>
                                                                <select class="form-control custom-select"
                                                                value={this.state.Color}
                                                                onChange={(text)=>{
                                                                    this.setState({
                                                                        Color:text.target.value
                                                                    })
                                                                }}>
                                                            
                                                                  {this.state.ColorData.map(brand => (
                           
                                                                    <option key={brand.value} value={brand.value}>
                                                                        {brand.label}
                                                                    </option>
                                                                    ))}
                                                                
                                                              </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                        <div class="form-group mb-3">
                                                            <label for="validationCustom01">Packaging Type<span className="mandatory">*</span></label>
                                                            <select class="form-control custom-select"
                                                            value={this.props.foodcredential.PackagingType}
                                                            onChange={this.onChangePack.bind(this)}>
                                                              {this.state.PackagingTypeData.map(brand => (
                       
                                                                <option key={brand.value} value={brand.value}>
                                                                    {brand.label}
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
                                                        <strong class="mr-auto">Packaging Size Volumetric</strong>
                                                    </div>
                                                        <div class="toast-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Length<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                        value={this.props.foodcredential.Packlength}
                                                                        onChange={this.onChangeLength.bind(this)}
                                                                        />
                                                                    
                                                                    </div>
                                                                </div>
                                                               <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Breadth<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                        value={this.props.foodcredential.Packbreadth}
                                                                        onChange={this.onChangebreadth.bind(this)} />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Height<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control"  
                                                                        value={this.props.foodcredential.Packheight}
                                                                        onChange={this.onChangeHeight.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                                    <select type="text" class="form-control" 
                                                                    value={this.props.foodcredential.Packunit}
                                                                    onChange={this.onChangePackunit.bind(this)} >
                                                                    {this.state.PackageMeasureUnitData.map(unitmeasure => (
                           
                                                                        <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                          {unitmeasure.label}
                                                                     </option>
                                                                     ))}
                                                                    
                                                                </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Volumetric Weight (in gms.)<span className="mandatory"></span></label>
                                                                <input type="text" class="form-control"  
                                                                value={this.state.VolumetricWeight}
                                                                  disabled="true"
                                                                />
                                                            </div>
                                                        </div>
                                                     

                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">
                                                    <div class="toast-header">
                                                    <strong class="mr-auto">Package Weight</strong>
                                                </div>
                                                    <div class="toast-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Weight<span className="mandatory">*</span></label>
                                                                    <input type="text" class="form-control"  
                                                                    value={this.props.foodcredential.PackageWeight}
                                                                    onChange={this.onChangepackweight.bind(this)}
                                                                    />
                                                                
                                                                </div>
                                                            </div>
                                                          
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                                <select type="text" class="form-control"  
                                                                value={this.props.foodcredential.PackWeightUnit}
                                                                onChange={this.onChangeWeightmeasure.bind(this)}>
                                                                {this.state.PackageMeasuretData.map(unitmeasure => (
                           
                                                                    <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                      {unitmeasure.label}
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
                                                <div class="toast-header">
                                                <strong class="mr-auto">Net Content Weight</strong>
                                            </div>
                                                <div class="toast-body">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Net Content Weight<span className="mandatory">*</span></label>
                                                                <input type="text" class="form-control"  
                                                                value={this.props.foodcredential.Weight}
                                                                onChange={this.onChangeWeight.bind(this)}
                                                                />
                                                            
                                                            </div>
                                                        </div>
                                                      
                                                        <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                            <select type="text" class="form-control" 
                                                            value={this.props.foodcredential.WeightUnit}
                                                            onChange={this.onChangeWeightUnits.bind(this)}>
                                                            {this.state.WeightData.map(unitmeasure => (
                           
                                                                <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                  {unitmeasure.label}
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
                                                        
                                                         <div class="toast-body">
                                                             <div class="row">
                                                                 <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">Price MRP (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                         <input type="text" class="form-control" 
                                                                        //   disabled={!this.state.IsVisible}
                                                                         value={this.props.foodcredential.Price}
                                                                         onChange={this.onChangeprice.bind(this)}/>
                                                                     
                                                                     </div>
                                                                 </div>

                                                                 <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Select Vendor<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control" 
                                                                            //  disabled={!this.state.IsVisible} 
                                                                           value={this.state.Name} 
                                                                           onChange={(text)=>{
                                                                               this.setState({
                                                                                   Name : text.target.value
                                                                               })
                                                                               console.log(text.target.value)

                                                                               for(var i =0 ;i<this.state.VendorData.length;i++){
                                                                                   if(this.state.VendorData[i].value == text.target.value){
                                                                                    this.setState({
                                                                                        VenName: this.state.VendorData[i].label,
                                                                                        VenId : this.state.VendorData[i].value
                                                                                    })  
                                                                                   }

                                                                               }

                                                                           }} >
                                                                                <option></option>
                                                                                {this.state.VendorData.map(unitmeasure => (
                                    
                                                                                    <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                                    {unitmeasure.label}
                                                                                </option>
                                                                                ))}
                                                                               
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Item SKU<span className="mandatory">*</span></label>
                                                                         <input type="text" class="form-control" 
                                                                        //   disabled={!this.state.IsVisible}
                                                                          value={this.state.Sku} 
                                                                          onChange={(text)=>{
                                                                            //   if(this.state.AlphaNumericRegex.test(text.target.value)){
                                                                              this.setState({
                                                                                  Sku : text.target.value
                                                                              })
                                                                            // }

                                                                          }}></input>
                                                                    </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Select BMS Margin On<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control"  
                                                                            //  disabled={!this.state.IsVisible}
                                                                           value={this.state.MarginOn} 
                                                                           onChange={(text)=>{
                                                                               this.setState({
                                                                                   MarginOn : text.target.value
                                                                               })
                                                                               if(text.target.value == 'Maximum Retail Price (MRP)'){
                                                                                this.setState({
                                                                                    isVendorSellingVisible : false,
                                                                                    VendorSellingPrice : undefined
                                                                                })
                                                                               }else
                                                                               {
                                                                                this.setState({
                                                                                    isVendorSellingVisible : true,
                                                                                    VendorSellingPrice : 0
                                                                                })
                                                                               }
                                                                            
                                                                           }} >
                                                                                <option></option>
                                                                                {this.state.MarginOnData.map(unitmeasure => (
                                    
                                                                                    <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                                    {unitmeasure.label}
                                                                                </option>
                                                                                ))}
                                                                               
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-4" style={{display : this.state.isVendorSellingVisible ? '' : 'none'}}>
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Selling Price (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                        //  disabled={!this.state.IsVisible}
                                                                       value={this.state.VendorSellingPrice} 
                                                                       onChange={(text)=>{
                                                                        if(this.state.DecimalRegex.test(text.target.value)){
                                                                           this.setState({
                                                                               VendorSellingPrice : text.target.value,
                                                                               VendorBasePrice : parseFloat(text.target.value/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)
                                                                                         })

                                                                                         var marginpercent = text.target.value != 0 ? parseFloat((this.state.Margin/text.target.value)*100).toFixed(2) : 0
                                                                                         var margin = text.target.value != 0 ? parseFloat((marginpercent) - (text.target.value*(this.props.foodcredential.DiscountPer/100))).toFixed(2) : 0
                                                                                         this.setState({
                                                                                            Margin : text.target.value != 0 ? parseFloat(text.target.value - parseFloat(marginpercent)).toFixed(2) : 0,
                                                                                            MarginPercent : marginpercent,
                                                                                            CostPrice : parseFloat(this.props.foodcredential.DiscountPrice - (margin)).toFixed(2),
                                                                                            BMSSplitAmount : (parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(margin)).toFixed(2),
                                                                                            VendorSplitAmount : ((this.props.foodcredential.DiscountPrice - (margin)) - parseFloat(this.state.TcsValue)- parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                        
                                                                                            
                                                                                        })
                                                                                        
                                                                        }

                                                                       }}/>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4" style={{display : this.state.isVendorSellingVisible ? '' : 'none'}}>
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Selling Base Price (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.VendorBasePrice} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                                 <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">Discounted Price (<span>&#8377;</span>)<span className="mandatory"></span></label>
                                                                         <input type="text" class="form-control"  
                                                                        //   disabled={!this.state.IsVisible}
                                                                         value={this.props.foodcredential.DiscountPrice}
                                                                         onChange={this.onChangediscprice.bind(this)} />
                                                                     </div>
                                                                 </div>
                                                                <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">Discount Percent(%)<span className="mandatory">*</span></label>
                                                                         <input type="text" class="form-control" value={this.props.foodcredential.DiscountPer} 
                                                                        //   disabled={!this.state.IsVisible}
                                                                         onChange={this.onChangeDiscount.bind(this)}/>
                                                                     </div>
                                                                 </div>
                                                               
                                                                 <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">Customer Base Price</label>
                                                                         <input type="text" class="form-control" 
                                                                         value={this.state.CustomerBasePrice} 
                                                                          disabled={true}
                                                                         />
                                                                     </div>
                                                                 </div>

                                                                 <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">Invoice GST Amount</label>
                                                                         <input type="text" class="form-control" 
                                                                         value={this.state.InvoiceGstAmount} 
                                                                          disabled={true}
                                                                     />
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">TCS</label>
                                                                         <input type="text" class="form-control" 
                                                                         value={this.state.TcsValue} 
                                                                          disabled={true}
                                                                     />
                                                                     </div>
                                                                 </div>
                                                                 <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">TDS</label>
                                                                         <input type="text" class="form-control" 
                                                                         value={this.state.TdsValue} 
                                                                          disabled={true}
                                                                     />
                                                                     </div>
                                                                 </div>


                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">BMS Margin (%)<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                        //  disabled={!this.state.IsVisible}
                                                                        value={this.state.MarginPercent} 
                                                                        onChange={(text)=>{
                                                                            if(this.state.DecimalRegex.test(text.target.value)){
                                                                            this.setState({
                                                                                MarginPercent : text.target.value,
                                                                               
                                                                                
                                                                            })
                                                                            if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                                var margin = parseFloat((this.props.foodcredential.Price*(text.target.value/100)) - (this.props.foodcredential.Price*(this.props.foodcredential.DiscountPer/100))).toFixed(2)
                                                                                
                                                                                this.setState({
                                                                                    Margin : parseFloat((this.props.foodcredential.Price*(text.target.value/100))).toFixed(2),
                                                                                    CostPrice : parseFloat(this.props.foodcredential.DiscountPrice - margin).toFixed(2),
                                                                                    BMSSplitAmount :parseFloat(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(margin)).toFixed(2),
                                                                                    VendorSplitAmount : parseFloat((this.props.foodcredential.DiscountPrice - (margin)) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                })
                                                                            }else
                                                                            {

                                                                                var margin2 = parseFloat(((text.target.value/100)*this.state.VendorSellingPrice) - (this.state.VendorSellingPrice*(this.props.foodcredential.DiscountPer/100))).toFixed(2)
                                                                               

                                                                                this.setState({
                                                                                    Margin : parseFloat((this.state.VendorSellingPrice)*(text.target.value/100)).toFixed(2),
                                                                                    CostPrice : parseFloat(this.props.foodcredential.DiscountPrice - parseFloat(margin2)).toFixed(2),
                                                                                    BMSSplitAmount : parseFloat(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(margin2)).toFixed(2),
                                                                                    VendorSplitAmount : parseFloat((this.props.foodcredential.DiscountPrice - parseFloat(margin2)) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                    
                                                                                })
                                                                            }
                                                                        }
                                                                        }}/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Margin Amount (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                        //  disabled={!this.state.IsVisible}
                                                                       value={this.state.Margin} 
                                                                       onChange={(text)=>{
                                                                        if(this.state.DecimalRegex.test(text.target.value)){
                                                                           this.setState({
                                                                               Margin : text.target.value,
                                                                               CostPrice : parseFloat(this.props.foodcredential.DiscountPrice - text.target.value).toFixed(2),
                                                                               BMSSplitAmount : parseFloat(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(text.target.value)).toFixed(2),
                                                                               VendorSplitAmount : parseFloat((this.props.foodcredential.DiscountPrice - text.target.value) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)

                                                                              
                                                                           })

                                                                           if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                               this.setState({
                                                                                MarginPercent :  (parseFloat(text.target.value)+parseFloat(this.props.foodcredential.Price*(this.props.foodcredential.DiscountPer/100))).toFixed(2)
                                                                               })
                                                                           }
                                                                           else
                                                                           {
                                                                            this.setState({
                                                                                MarginPercent :  (parseFloat(text.target.value)+parseFloat(this.state.VendorSellingPrice*(this.props.foodcredential.DiscountPer/100))).toFixed(2)
                                                                               })
                                                                           }
                                                                        }

                                                                       }}/>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">BMS Discount</label>
                                                                         <input type="text" class="form-control" 
                                                                         value={this.state.BMSDiscount} 
                                                                          disabled={true}
                                                                     />
                                                                     </div>
                                                                 </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Cost Price (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.CostPrice} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">BMS Split Amount (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.BMSSplitAmount} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Split Amount (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.VendorSplitAmount} 
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
                                                                             onClick={() => {

                                                                                 this.setState({
                                                                                     PageTitle: '2',
                                                                                     Page3: 'Done'
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
                                                   
                                                     <div id="sw-arrows-step-4"
                                                     className="tab-pane step-content"
                                                     style={{ display: this.state.PageTitle == '4' ? 'block' : 'none' }}>
                                                         
                                                    <div className="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">
                                                    
                                                    <div class="toast-body">
                                                       
                                                        <div class="row">
                                                        <div class="col-md-3">
                                                        <label for="sw-arrows-first-name">Cover Image<span className="mandatory">*</span></label>
                                                       
                                                        <div class="form-group">
                                                        <div class="div1">
                                                        <ImgUploadCover onChange={this.photoUpload} src={this.state.imagePreviewUrlCover}/>
                                                                 </div>
                                                         </div>
                                                        </div>  
                                                       
                                                
                                                        <div class="col-md-9">
                                                        <label for="sw-arrows-first-name" >Product Image<span className="mandatory">*</span></label>
        
                                                        {/* <div class="form-group"> */}
                                                         <div class="div1" class='row'>
                                                         {this.state.Photos.map((photo,index)=>(  
                                                              <div style={{    marginLeft: '1%',    marginRight: '2%'}}>   
                                                               <label  className="custom-file-upload fas">
                                                                        <div className="img-wrap img-upload" >
                                                                          <img for="photo-upload" src={photo.image} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
                                                                        
                                                                        </div>
                                                                        <XSquare class='product-img'
                                                                        onClick={()=>{
                                                                          var arr1 = [...this.state.Photos]
                                                                          arr1[index].image =  'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png'
                                                                          arr1[index].value =  ''
                                                                          arr1[index].data =  ''
                                                                          this.setState({
                                                                            Photos : arr1,
                                                                            imageCount : this.state.imageCount -1
                                                                          })
                                                                        }}
                                                                        ></XSquare>
                                                                        <input id="photo-upload" type="file" onChange={(e)=>{
                                                                  //  e.preventDefault();
                                                                  //  console.log(e.target.files[0])
                                                                   if(e.target.files[0] != undefined){
                                                                     if(e.target.files[0].size < 300000){
                                                                      var arr1 = [...this.state.Photos]
                                                                 const reader = new FileReader();
                                                                   const file = e.target.files[0];
                                                                   reader.onload = (e) => {
                                                                      arr1[index].image =  e.target.result
                                                                    arr1[index].value =  e.target.result
                                                                    arr1[index].data =  file
                                                                    
                                                                     this.setState({
                                                                      Photos : arr1,
                                                                      imageCount : this.state.imageCount + 1
                                                                    })
                                                                    };
                                                                   reader.readAsDataURL(file);
                                                                   }else
                                                                   {
                                                                   Notiflix.Notify.Failure('File too large, upload file less than 300 kb.');
                                                                   
                                                                   }
                                                                 }
                                                                }}/> 
                                                                      </label>                                                        
                                                               
                                                           </div>
                                                            ))}
                                                                 {/* </div> */}
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
                                                                       onClick={this.nextlabel4.bind(this)}>Next</button>
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
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">SEO Details</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Title Bar (60 Characters)<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" 
                                                                                value={this.props.foodcredential.Title} 
                                                                                onChange={this.onChangeTitle.bind(this)}/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-12">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Meta Description (160 Characters)</label>
                                                                           
                                                                            <textarea class="form-control" rows="2" cols="10"
                                                                            value={this.props.foodcredential.MetaDescription} 
                                                                            onChange={this.onChangemeta.bind(this)}>
                                                                              </textarea>
                                                                        </div>
                                                                    </div>
                                                                        <div class="col-md-12">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Keywords (250 Characters)<span className="mandatory">*</span></label>
                                                                          
                                                                         <textarea class="form-control" rows="3" cols="15"
                                                                          value={this.props.foodcredential.Keyword}
                                                                         onChange={this.onChangeKey.bind(this)}></textarea>
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
                                                                                        PageTitle: '4',
                                                                                        Page4: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                            
                                                                              onClick={this.nextlabel5.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="sw-arrows-step-7"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '7' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Vendor Pricing</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                       
                                                                        <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Select Vendor<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control"  
                                                                           value={this.state.Name} 
                                                                           onChange={(text)=>{
                                                                               this.setState({
                                                                                   Name : text.target.value
                                                                               })

                                                                               for(var i =0 ;i<this.state.VendorData.length;i++){
                                                                                   if(this.state.VendorData[i].value == text.target.value){
                                                                                    this.setState({
                                                                                        VenName: this.state.VendorData[i].label
                                                                                    })  
                                                                                   }

                                                                               }

                                                                           }} >
                                                                                <option></option>
                                                                                {this.state.VendorData.map(unitmeasure => (
                                    
                                                                                    <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                                    {unitmeasure.label}
                                                                                </option>
                                                                                ))}
                                                                               
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                   
                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Item SKU<span className="mandatory">*</span></label>
                                                                         <input type="text" class="form-control" 
                                                                          value={this.state.Sku} 
                                                                          onChange={(text)=>{
                                                                            //   if(this.state.AlphaNumericRegex.test(text.target.value)){
                                                                              this.setState({
                                                                                  Sku : text.target.value
                                                                              })
                                                                            // }

                                                                          }}></input>
                                                                    </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Select BMS Margin On<span className="mandatory">*</span></label>
                                                                            <select type="text" class="form-control"  
                                                                           value={this.state.MarginOn} 
                                                                           onChange={(text)=>{
                                                                               this.setState({
                                                                                   MarginOn : text.target.value
                                                                               })
                                                                               if(text.target.value == 'Maximum Retail Price (MRP)'){
                                                                                this.setState({
                                                                                    isVendorSellingVisible : false,
                                                                                    VendorSellingPrice : undefined
                                                                                })
                                                                               }else
                                                                               {
                                                                                this.setState({
                                                                                    isVendorSellingVisible : true,
                                                                                    VendorSellingPrice : 0
                                                                                })
                                                                               }
                                                                            
                                                                           }} >
                                                                                <option></option>
                                                                                {this.state.MarginOnData.map(unitmeasure => (
                                    
                                                                                    <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                                    {unitmeasure.label}
                                                                                </option>
                                                                                ))}
                                                                               
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                              
                                                                <div class="col-md-4" style={{display : this.state.isVendorSellingVisible ? '' : 'none'}}>
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Selling Price (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                       value={this.state.VendorSellingPrice} 
                                                                       onChange={(text)=>{
                                                                        if(this.state.DecimalRegex.test(text.target.value)){
                                                                           this.setState({
                                                                               VendorSellingPrice : text.target.value,
                                                                               VendorBasePrice : parseFloat(text.target.value/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)

                                                                                         })

                                                                                         this.setState({
                                                                                            Margin : text.target.value != 0 ? parseFloat((this.state.MarginPercent/100)*text.target.value).toFixed(2) : 0,
                                                                                             MarginPercent : text.target.value != 0 ? parseFloat((this.state.Margin/text.target.value)*100).toFixed(2) : 0,
                                                                                             CostPrice : this.props.foodcredential.DiscountPrice - (text.target.value != 0 ? parseFloat((this.state.MarginPercent/100)*text.target.value).toFixed(2) : 0),
                                                                                             BMSSplitAmount : (parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + (text.target.value != 0 ? parseFloat((this.state.MarginPercent/100)*text.target.value) : 0 )).toFixed(2),
                                                                                             VendorSplitAmount : ((this.props.foodcredential.DiscountPrice - (text.target.value != 0 ? parseFloat((this.state.MarginPercent/100)*text.target.value) : 0)) - parseFloat(this.state.TcsValue)- parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                         
                                                                                            })
                                                                                        
                                                                        }

                                                                       }}/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">BMS Margin (%)<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                        value={this.state.MarginPercent} 
                                                                        onChange={(text)=>{
                                                                            if(this.state.DecimalRegex.test(text.target.value)){
                                                                            this.setState({
                                                                                MarginPercent : text.target.value,
                                                                               
                                                                                
                                                                            })
                                                                            if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                                this.setState({
                                                                                    Margin : parseFloat((text.target.value/100)*this.props.foodcredential.Price).toFixed(2),
                                                                                    CostPrice : this.props.foodcredential.DiscountPrice - parseFloat((text.target.value/100)*this.props.foodcredential.Price).toFixed(2),
                                                                                    BMSSplitAmount :(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat((text.target.value/100)*this.props.foodcredential.Price)).toFixed(2),
                                                                                    VendorSplitAmount : ((this.props.foodcredential.DiscountPrice - parseFloat((text.target.value/100)*this.props.foodcredential.Price)) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                })
                                                                            }else
                                                                            {
                                                                                this.setState({
                                                                                    Margin : parseFloat((text.target.value/100)*this.state.VendorSellingPrice).toFixed(2),
                                                                                    CostPrice : this.props.foodcredential.DiscountPrice - parseFloat((text.target.value/100)*this.state.VendorSellingPrice).toFixed(2),
                                                                                    BMSSplitAmount : (parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat((text.target.value/100)*this.state.VendorSellingPrice)).toFixed(2),
                                                                                    VendorSplitAmount : ((this.props.foodcredential.DiscountPrice - parseFloat((text.target.value/100)*this.state.VendorSellingPrice)) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                })
                                                                            }
                                                                        }
                                                                        }}/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Margin Amount (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                       value={this.state.Margin} 
                                                                       onChange={(text)=>{
                                                                        if(this.state.DecimalRegex.test(text.target.value)){
                                                                           this.setState({
                                                                               Margin : text.target.value,
                                                                               CostPrice : this.props.foodcredential.DiscountPrice - text.target.value,
                                                                               BMSSplitAmount : (parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(text.target.value)).toFixed(2),
                                                                               VendorSplitAmount : ((this.props.foodcredential.DiscountPrice - text.target.value) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                           })

                                                                           if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                               this.setState({
                                                                                MarginPercent :  parseFloat((text.target.value/this.props.foodcredential.Price)*100).toFixed(2)
                                                                               })
                                                                           }
                                                                           else
                                                                           {
                                                                            this.setState({
                                                                                MarginPercent :  parseFloat((text.target.value/this.state.VendorSellingPrice)*100).toFixed(2)
                                                                               })
                                                                           }
                                                                        }

                                                                       }}/>
                                                                    </div>
                                                                </div>


                                                                <div class="col-md-4" style={{display : this.state.isVendorSellingVisible ? '' : 'none'}}>
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Selling Base Price (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.VendorBasePrice} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Cost Price (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.CostPrice} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">BMS Split Amount (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.BMSSplitAmount} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-4">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Vendor Split Amount (<span>&#8377;</span>)</label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={true}
                                                                       value={this.state.VendorSplitAmount} 
                                                                      />
                                                                    </div>
                                                                </div>

                                                             
 
                                                                    </div>
                                                                    
                                                                    <div>
                                                    <button class="btn btn-primary" style={{float: 'right',marginBottom: '9px'}}
                                              onClick={this.OnAddVendorPricing.bind(this)}
                                                    > Add Vendor Pricing</button>
                                                </div>
                                                                </div>
                                                      
                                                            </div>  

                                                            <div class="toast fade show" role="alert" aria-live="assertive"
                                                    aria-atomic="true" data-toggle="toast">

                               <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                    <div class="table-responsive">    
                                    <table id="selection-datatable" class="table table-striped dt-responsive nowrap">
                                            <thead style={{
                                                  background: '#2e4a9a',
                                                  color: '#fff'
                                            }}>
                                                <tr>
                                                    <th style={{borderRight : '1px solid #fff'}}>Vendor Name</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Vendor Item SKu</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>BMS Margin On</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Vendor Selling Price</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>BMS Margin (%)</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Margin Amount</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Vendor Base Price</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Cost Price</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>BMS Split Amount</th>
                                                    <th style={{borderRight : '1px solid #fff'}}>Vendor Split Amount</th>
                                                   
                                                    <th>Action</th>
                                                   
                                                </tr>
                                            </thead>
                                        
                                     
                                           
                                           
                                    <tbody >
                                 
                                 {this.state.VendorPricing.length == 0 ? 
                                 <tr><td colSpan={11} style={{textAlign:'center'}}>No Pricing Available</td></tr> : 
                                 ''}
                                        
                                         {this.state.VendorPricing.map((data,index)=>(
                                           
                                           
                                       
                                                <tr key={index}>
                                                      
                                                <td>{data.VenName}</td>
                                                <td>{data.Sku}</td>
                                                <td>{data.MarginOn}</td>
                                                <td>{data.VendorSellingPrice}</td>
                                                 <td>{data.MarginPercent}</td>
                                                <td>{data.Margin}</td>
                                                <td>{data.VendorBasePrice}</td>
                                                <td>{data.CostPrice}</td>
                                                <td>{data.BMSSplitAmount}</td>
                                                <td>{data.VendorSplitAmount}</td>
                                               
                                                <td> <div class="align-self-center" style={{    textAlign: 'center'}}>
                                            <span  >
                                            <Edit3 style={{marginRight : '10px'}}
                                            onClick={()=>{
                                              var data = [...this.state.VendorPricing]

                                              this.setState({
                                                Name : data[index].Name,
                                                VenName : data[index].VenName,
                                                Sku : data[index].Sku,
                                                Margin : data[index].Margin,
                                                MarginPercent : data[index].MarginPercent,
                                                MarginOn : data[index].MarginOn,
                                                VendorSellingPrice : data[index].VendorSellingPrice,
                                                isVendorSellingVisible : data[index].VendorSellingPrice == undefined ? false : true,

                                                CostPrice : data[index].CostPrice,
                                                BMSSplitAmount : data[index].BMSSplitAmount,
                                                VendorSplitAmount : data[index].VendorSplitAmount,
                                                VendorBasePrice : data[index].VendorBasePrice

                                               
                                              },()=>{
                                                data.splice(index,1)
                                                arr.splice(index,1)
                                                this.setState({
                                                  VendorPricing : data
                                                })
                                              })
                                             
                                            }}
                                            ></Edit3>
                                              <Trash2
                                               onClick={()=>{
                                                var data = [...this.state.VendorPricing ]
                                                data.splice(index,1)
                                                arr.splice(index,1)
                                                this.setState({
                                                    VendorPricing  : data
                                                })
                                              }}
                                              ></Trash2>
                                            </span>
                                        </div></td>
                                              
                                              
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


                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                   
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                            <button className="btn btn-secondary sw-btn-prev btn-radius-right"
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '5',
                                                                                        Page5: 'Done'
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
                                                                              onClick={this.nextlabel6.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}
                                                        
                                                        <div id="sw-arrows-step-6"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '6' ? 'block' : 'none' }}>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">Status</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                    <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Availability<span className="mandatory">*</span></label><br/>
                                                                     
                                                                        <select type="text" class="form-control" 
                                                                        value={this.state.Availability}
                                                                        onChange={(text)=>{
                                                                            this.setState({
                                                                                Availability : text.target.value
                                                                            })
                                                                        }}>
                                                                        {this.state.AvailabilityData.map(unitmeasure => (
                                    
                                                                            <option key={unitmeasure.value} value={unitmeasure.value}>
                                                                            {unitmeasure.label}
                                                                        </option>
                                                                        ))}
                                                        </select>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                <label for="sw-arrows-first-name" >Show On Website<span className="mandatory">*</span></label><br/>
                                                                <label class="radio-inline">
                                                                <input type="radio" name="optradio"
                                                                   checked={this.state.Status == 'Yes' ? true : false}
                                                                    onChange={()=>{
                                                                        this.setState({
                                                                            Status : 'Yes'
                                                                        })
                                                                    }}/> Yes
                                                                 </label>
                                                                <label class="radio-inline" style={{marginLeft:'10px'}}>
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
                                                            </div>  

                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                   
                                                                    <div className="col-md-12">
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                            <button className="btn btn-secondary sw-btn-prev btn-radius-right"
                                                                                onClick={() => {

                                                                                    this.setState({
                                                                                        PageTitle: '5',
                                                                                        Page6: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                            // onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page5 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.SaveVariant.bind(this)}>Add Variant</button>
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
        foodcredential: state.FoodItemReducer
    }
  }
  export default connect(mapStateToProps, {
    setitemname,
    setbrand,
    setfoodcompany,
    setfoodmanufacture,
    setfoodmarketer,setfooditemcategory,
    setfooditemfilter,setfooditemdescription,
    setkey,setreturnable,
    setfoodhsn,setfoodgst,setfoodsku,
    setfoodvarient,setfoodpackaging,
    setpackagingweight,
    setweight,
    setunit,setfoodprice,
    setfooddiscount,setfooddiscountprice,
    setfoodtitle,setfoodmeta,
    setfoodkey,
    setfoodvendor,
    setfoodvendoritem,
    setfoodmargin,
    setfoodbmsmargin,
    setfoodapproval,
    setreturnabledays,
    setpacklength,
    setpackbreadth,
    setpackheight,
    setpackunit,
    setpackweightunit,
    setweightunit,
    setclearfooditem,
    

  }) (FoodVariant);
