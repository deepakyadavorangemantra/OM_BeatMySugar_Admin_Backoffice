import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import {XSquare} from 'react-feather';
import moment from 'moment'
import{
    
    setfootwearsku,
    setfootwearvarient,
    setfootwearitemsize,
    setcolor,
    setfootwearpackagingsize,
    setfootwearpackagingweight,
    setfootwearprice,
    setfootweardiscount,
    setfootweardiscountprice,
    setfootweartitle,
    setfootwearkey,
    setfootwearmeta,
    setfootwearvendor,
    setfootwearitemvendor,
    setfootwearmargin,
    setfootwearbmsmargin,
    setfootwearapproval,
    setfootwearpacklength,
    setfootwearpackbreadth,
    setfootwearpackheight,
    setfootwearpackunit,
    setfootwearpackweightunit,
    setfootwearvolumetricweight,
    setclearfootwearitem

}
from './Actions/ActionType';
import {Edit3,Trash2,Monitor} from 'react-feather';
import GetApiCall from '../GetApi';
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

      {/* <XSquare class='product-img'
       onClick={onCancel}
       ></XSquare> */}
    </label>


class Footwear extends Component {

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

          SizeData : [],
          ColorData : [],
  
  
          AddAccess : false,
  
          ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',


          CustomerBasePrice: 0,
          InvoiceGstAmount : 0,
          MasterData : [],
          TcsValue : 0,
          TdsValue : 0,
          VendorBasePrice : 0,
          BMSDiscount : 0

         
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

        this.props.setclearfootwearitem()

        Notiflix.Loading.Dots('');

        var det = localStorage.getItem('AccessoriesParentIdDetails')
        var MasterData = JSON.parse(det)

        this.setState({
            MasterId : MasterData.fld_id,
            MasterData : MasterData
        })


        GetApiCall.getRequest("GetVendorData").then(resultdes =>
            resultdes.json().then(objcategory =>{
      
                this.setState({
                    VendorData:objcategory.data,
                })

            }))


            GetApiCall.getRequest("Get_AccessoriesColorData").then(resultdes =>
                resultdes.json().then(objcategory =>{
                    this.props.setcolor(objcategory.data[0].value)
                    this.setState({
                        ColorData:objcategory.data,
                    })
    
                }))


                GetApiCall.getRequest("Get_AccessoriesSizeData").then(resultdes =>
                    resultdes.json().then(objcategory =>{
                        this.props.setfootwearitemsize(objcategory.data[0].value)
                        this.setState({
                            SizeData:objcategory.data,
                        })
                        Notiflix.Loading.Remove()
        
                    }))

        this.props.setfootwearpackweightunit(this.state.PackageMeasuretData[0].value)
        this.props.setfootwearpackunit(this.state.PackageMeasureUnitData[0].value)


    //     var login=localStorage.getItem('LoginDetail');
    //     var details=JSON.parse(login)

    //     PostApiCall.postRequest({
  
    //         staffid : details[0].fld_staffid,
        
    //       },"GetUserSubMenuAccessRights").then((resultssub) => 
          
    //         // const objs = JSON.parse(result._bodyText)
    //         resultssub.json().then(objsub => {  
    //         if(resultssub.status == 200 || resultssub.status==201){

    //        var filteredRights = objsub.data;
    //             // console.log(filteredRights)
        
    //             var con = 0
    //             for(var i = 0 ; i< filteredRights.length ;i++){
   
    //                 if(filteredRights[i].fld_menuname == 'Add Footwear'){
        
    //                   if(filteredRights[i].fld_access == 1){
              
    //                    this.setState({
    //                      AddAccess : true
    //                    })
    //                   }
    //                 }
                   
    //               con = con + 1
    //               if(con == filteredRights.length){
    //                   Notiflix.Loading.Remove();
    //               }
    //             }
        

    //         }

    //     }))
   
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
  
  
      onChangeSku(itemsku){
        this.props.setfootwearsku(itemsku.target.value)
    }
    onChangeVarient(varientname){
        this.props.setfootwearvarient(varientname.target.value)
    }
    onChangeSize(size){
        this.props.setfootwearitemsize(size.target.value)
    }
    onChangeColor(color){
        this.props.setcolor(color.target.value)
    }
     
     nextlabel(){
             if(this.props.footcredential.VarientName!=''){
                if(this.props.footcredential.VarientName.length < 160){


                        this.setState({
                            PageTitle: '2',
                            Page1: 'Done'
                        })
                    }
                                
                    else{
                     Notiflix.Notify.Failure('Please enter accessories variant name with less then 160 characters.')
                    }
                         }
                         else{
                            Notiflix.Notify.Failure('Please enter variant name.')
                         }
                   
     }


     onChangePack(packagingsize){
        if((this.state.DecimalRegex.test(packagingsize.target.value))){
         this.props.setfootwearpackagingsize(packagingsize.target.value)
     }
    }
     onChangeWeight(packageweight){
        if((this.state.DecimalRegex.test(packageweight.target.value))){
         this.props.setfootwearpackagingweight(packageweight.target.value)
     }
    }

    
    onChangeLength(length){
        if((this.state.DecimalRegex.test(length.target.value))){
        this.props.setfootwearpacklength(length.target.value)

        var vw = length.target.value*this.props.footcredential.Packbreadth*this.props.footcredential.Packheight
        var total = vw
         if(this.props.footcredential.Packunit == 'cm'){
  
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
        this.props.setfootwearpackbreadth(breadth.target.value)

        var vw = breadth.target.value*this.props.footcredential.Packlength*this.props.footcredential.Packheight
        var total = vw
         if(this.props.footcredential.Packunit == 'cm'){
  
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

        this.props.setfootwearpackheight(height.target.value)
        var vw = height.target.value*this.props.footcredential.Packlength*this.props.footcredential.Packbreadth

        var total = vw
         if(this.props.footcredential.Packunit == 'cm'){
  
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
        this.props.setfootwearpackunit(unitofmeasurement.target.value)

        var vw = this.props.footcredential.Packheight*this.props.footcredential.Packlength*this.props.footcredential.Packbreadth

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
        this.props.setfootwearpackweightunit(unitofmeasurement.target.value)
    }
    onChangeVolume(volumetricweight){
        this.props.setfootwearvolumetricweight(volumetricweight.target.value)
    }
    
     nextlabel2(){
           if(this.props.footcredential.Packlength!=''){
            if(this.props.footcredential.Packbreadth!=''){
                  if(this.props.footcredential.Packheight!=''){
                      if(this.props.footcredential.PackageWeight!=''){
                                     
                            this.setState({
                                PageTitle : '3',
                                Page2 : 'Done'
                            })
          
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

    

     onChangePrice(price){
        if((this.state.DecimalRegex.test(price.target.value))){
            this.props.setfootwearprice(price.target.value)

            var amt = 0

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
             amt=parseFloat(price.target.value-(this.props.footcredential.DiscountPer*price.target.value)/100).toFixed(2)
      
            // }else
            // {
            //  amt=parseFloat(this.state.VendorSellingPrice-(this.props.footcredential.DiscountPer*this.state.VendorSellingPrice)/100).toFixed(2)

            // }
            this.props.setfootweardiscountprice(amt)


            var cusbasepr = parseFloat(amt/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)

            var invoiceamt = parseFloat(cusbasepr*(this.state.MasterData.fld_gstpercent/100)).toFixed(2)

            this.setState({
                CustomerBasePrice : cusbasepr,
                InvoiceGstAmount : invoiceamt,
                TcsValue : parseFloat(cusbasepr*(this.state.MasterData.TcsPercent/100)).toFixed(2),
                
            })

          }
    }
     onChangeDisc(discount){
        if((this.state.DecimalRegex.test(discount.target.value))){
            this.props.setfootweardiscount(discount.target.value)

            var amt = 0

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                amt=parseFloat(this.props.footcredential.Price-(discount.target.value*this.props.footcredential.Price)/100).toFixed(2)

            // }else
            // {
            //     amt=parseFloat(this.state.VendorSellingPrice-(discount.target.value*this.state.VendorSellingPrice)/100).toFixed(2)

            // }
            this.props.setfootweardiscountprice(amt)


            var cusbasepr = parseFloat(amt/(1+(this.state.MasterData.fld_gstpercent/100))).toFixed(2)

            var invoiceamt = parseFloat(cusbasepr*(this.state.MasterData.fld_gstpercent/100)).toFixed(2)

            this.setState({
                CustomerBasePrice : cusbasepr,
                InvoiceGstAmount : invoiceamt,
                TcsValue : parseFloat(cusbasepr*(this.state.MasterData.TcsPercent/100)).toFixed(2),
              
            })

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){

                this.setState({
                    BMSDiscount : parseFloat(this.props.footcredential.Price - amt).toFixed(2)
                })

            // }else
            // {
            //     this.setState({
            //         BMSDiscount : parseFloat(this.state.VendorSellingPrice - amt).toFixed(2)
            //     })

            // }

        }
     }
     onChangeDpice(discountprice){
 
        if((this.props.setfootweardiscount(discountprice.target.value))){
            this.props.setfootweardiscountprice(discountprice.target.value)

            // if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
            this.props.setfootweardiscount(parseFloat(((this.props.footcredential.Price-discountprice.target.value)/this.props.footcredential.Price)*100).toFixed(2))
            // }else
            // {
            // this.props.setfootweardiscount(parseFloat(((this.state.VendorSellingPrice-discountprice.target.value)/this.state.VendorSellingPrice)*100).toFixed(2))

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
                    BMSDiscount : parseFloat(this.props.footcredential.Price - discountprice.target.value).toFixed(2)
                })

            // }else
            // {
            //     this.setState({
            //         BMSDiscount : parseFloat(this.state.VendorSellingPrice - discountprice.target.value).toFixed(2)
            //     })

            // }
            


        }
    }
       
     nextlabel3(){
        if(this.props.footcredential.Price!=''){
             if(this.props.footcredential.DiscountPrice!=''){
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

     nextlabel4(){
        if(JSON.stringify(this.state.ImageCoverData) != '[]'){

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

    

    onChangeTitle(title){
        this.props.setfootweartitle(title.target.value)
    }
    onChangeKey(keyword){
        this.props.setfootwearkey(keyword.target.value)
    }
    onChangeMeta(metadescription){
        this.props.setfootwearmeta(metadescription.target.value)
    }

     nextlabel5(){

         if(this.props.footcredential.Title!=''){
            if(this.props.footcredential.Title.length<60){
             if(this.props.footcredential.Keyword!=''){
                if(this.props.footcredential.Keyword.length<250){
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

    onChangeVendor(selectvendor){
        this.props.setfootwearvendor(selectvendor.target.value)
    }
    onChangeVendorsku(itemvendor){
       this.props.setfootwearitemvendor(itemvendor.target.value)
    }
    onChangeMargin(marginamount){
       if((this.state.DecimalRegex.test(marginamount.target.value))){

      this.props.setfootwearmargin(marginamount.target.value)
    }
   }
    onChangeBms(bmsmargin){
       if((this.state.DecimalRegex.test(bmsmargin.target.value))){
       this.props.setfootwearbmsmargin(bmsmargin.target.value)
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
     onChangeApprove(approval){
        this.props.setfootwearapproval(approval.target.value)
     }



     OnAddProductCoverImage(obj){

        var login=localStorage.getItem('LoginDetail');
  var details=JSON.parse(login)

  // console.log(this.state.imagedata != '')
  if(this.state.ImageCoverData != ''){

    const form = new FormData();
     
    form.append('file', this.state.ImageCoverData);
    form.append('foldername' , 'Accessories')
    form.append('filename' , (JSON.parse(JSON.stringify(obj.data[0]))).SKU+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).VariantId+'-0')
    
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

        accessoriesvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
        imageurl : 'https://images.beatmysugar.com/images/Accessories/'+res.data.Message.split(',')[2].split('=')[1].trim(),
        updatedon : moment().format('lll'),
        updatedby : details[0].fld_staffid

 
     },"AddAccessoriesVariantImages").then((results1) => 
     
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
  // console.log('in no cover')
  this.OnAddProductImages(obj)
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
        form1.append('foldername' , 'Accessories')
        form1.append('filename' , (JSON.parse(JSON.stringify(obj.data[0]))).SKU+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).VariantId+'-'+(i+1))
        
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
      
            accessoriesvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
            imageurl : 'https://images.beatmysugar.com/images/Accessories/'+res1.data.Message.split(',')[2].split('=')[1].trim(),
            updatedon : moment().format('lll'),
            updatedby : details[0].fld_staffid
      
      
         },"AddAccessoriesVariantImages").then((results2) => 
         
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
            count = count + 1;
            empty = empty +1
            if(count == this.state.Photos.length){
                this.OnSaveVendorPricing(obj)
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

    accessoriesvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
     vendorid : this.state.Name,
     sku : this.state.Sku,
     marginon : this.state.MarginOn,
     vendorselling : this.state.VendorSellingPrice,
     margin :  this.state.Margin,
     marginpercent : this.state.MarginPercent,
      updatedon : moment().format('lll'),
      updatedby : details[0].fld_staffid,
      costprice : this.state.CostPrice


   },"AddAccessoriesVariantVendorPricing").then((results3) => 
   
     // const objs = JSON.parse(result._bodyText)
     results3.json().then(obj3 => {

   
     if(results3.status == 200 || results3.status==201){

    //   count1 = count1 + 1;

    //   if(count1 == this.state.VendorPricing.length){
    
        Notiflix.Loading.Remove()
        this.props.setclearfootwearitem()
        Notiflix.Notify.Success('Accessories variant added successfully.')
        window.location.href = '/accessoriesvariantlist'
      }
    //  }
  
    }))
    // }

    }

     Savefootwearvariant(){
       if(this.state.Availability!='')
    {
        if(this.state.Status!=''){

         
            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
              
   
            Notiflix.Loading.Dots('');
                
                PostApiCall.postRequest({

                    accessoriesid : this.state.MasterId,
                     name : this.props.footcredential.VarientName,
                     colorid : this.props.footcredential.Color,
                     sizeid : this.props.footcredential.Size,
                     length : this.props.footcredential.Packlength,
                     breadth : this.props.footcredential.Packbreadth,
                     height : this.props.footcredential.Packheight,
                     volunit : this.props.footcredential.Packunit,
                     volweight : this.state.VolumetricWeight,
                     packunit : this.props.footcredential.PackWeightUnit,
                     packweight : this.props.footcredential.PackageWeight,
                     price : this.props.footcredential.Price,
                     discountpercent : this.props.footcredential.DiscountPer,
                     discountprice : this.props.footcredential.DiscountPrice,
                     titlebar : this.props.footcredential.Title,
                     metadescription : this.props.footcredential.MetaDescription,
                     keywords : this.props.footcredential.Keyword,
                     availability : this.state.Availability,
                     showonwebsite : this.state.Status,
                     approved : 'No',
                     updatedby : details[0].fld_staffid,
                     updatedon : moment().format('lll'),
                          },"AddAccessoriesVariant").then((results) => 
                 
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(obj => {
             
                 
                    if(results.status == 200 || results.status==201){


                        this.OnAddProductCoverImage(obj)


                    }else
                    {
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
                      VenName : this.state.VenName
                    
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
                      VenName : ''
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
                                                <li class="breadcrumb-item"><a href="/accessoriesitemmasterlist">Accessories List</a></li>
                                                <li class="breadcrumb-item"><a href="/accessoriesvariantlist">Accessories Variant List</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Add New Accessories Variant</li>
                                                </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">Add New Accessories Variant</h4>
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
                                                        }} class="wizardlist nav-link">Accessories Item Variants</a></li>

                                                        <li className={this.state.PageTitle == '2' ? 'active nav-item' : this.state.Page2 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                            if (this.state.Page2 == 'Done') {
                                                                this.setState({
                                                                    PageTitle: '2',
                                                                    Page2: 'Done',

                                                                })
                                                            }
                                                        }}
                                                            class="wizardlist nav-link">Packaging Weight</a></li>
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
                                                                        Page4: 'Done',
    
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
                                                                        Page6: 'Done',
    
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
                                                                    <strong class="mr-auto">Accessories Item Variants</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                    <div class="row">
                                                                        {/* <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Item SKU [BMS]<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" 
                                                                                value={this.props.footcredential.ItemSkuBms}
                                                                                onChange={this.onChangeSku.bind(this)} />
                                                                            </div>
                                                                        </div> */}
                                                                        <div class="col-md-6">
                                                                            <div class="form-group mb-3">
                                                                                <label for="validationCustom01">Variant Name (160 Character)<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control" 
                                                                                value={this.props.footcredential.VarientName}
                                                                                onChange={this.onChangeVarient.bind(this)} />
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-md-2">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Size<span className="mandatory">*</span></label>
                                                                            <select class="form-control custom-select"
                                                                          value={this.props.footcredential.Size} 
                                                                          onChange={this.onChangeSize.bind(this)} >
                                                                              {this.state.SizeData.map(brand => (
                           
                                                                                    <option key={brand.value} value={brand.value}>
                                                                                        {brand.label}
                                                                                    </option>
                                                                                    ))}
                                                                              
                                                                            
                                                                          </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-4">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Color<span className="mandatory">*</span></label>
                                                                            <select class="form-control custom-select"
                                                                            value={this.props.footcredential.Color}
                                                                            onChange={this.onChangeColor.bind(this)}>
                                                                               {this.state.ColorData.map(brand => (
                           
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
                                                                        //  onClick={() => {

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
                                                        <strong class="mr-auto">Packaging Size Volumetric</strong>
                                                    </div>
                                                        <div class="toast-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Length<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                        value={this.props.footcredential.Packlength}
                                                                        onChange={this.onChangeLength.bind(this)}
                                                                        />
                                                                    
                                                                    </div>
                                                                </div>
                                                               <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Breadth<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                        value={this.props.footcredential.Packbreadth}
                                                                        onChange={this.onChangebreadth.bind(this)} />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Height<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control"  
                                                                        value={this.props.footcredential.Packheight}
                                                                        onChange={this.onChangeHeight.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                                    <select type="text" class="form-control" 
                                                                    value={this.props.footcredential.Packunit}
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
                                                                <label for="validationCustom01">Volumetric Weight (in gms.)<span className="mandatory">*</span></label>
                                                                <input type="text" class="form-control"  
                                                                   disabled="true"
                                                                   value={this.state.VolumetricWeight}
                                                                  onChange={this.onChangeVolume.bind(this)}
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
                                                                    value={this.props.footcredential.PackageWeight}
                                                                    onChange={this.onChangeWeight.bind(this)}
                                                                    />
                                                                
                                                                </div>
                                                            </div>
                                                          
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                                <select type="text" class="form-control"  
                                                                value={this.props.footcredential.PackWeightUnit}
                                                                onChange={this.onChangeWeightmeasure.bind(this)}>
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
                                                                     onClick={this.nextlabel2.bind(this)} >Next</button>
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
                                                                         value={this.props.footcredential.Price}
                                                                         onChange={this.onChangePrice.bind(this)}/>
                                                                     
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
                                                                                         var margin = text.target.value != 0 ? parseFloat((marginpercent) - (text.target.value*(this.props.footcredential.DiscountPer/100))).toFixed(2) : 0
                                                                                         this.setState({
                                                                                            Margin : text.target.value != 0 ? parseFloat(text.target.value - parseFloat(marginpercent)).toFixed(2) : 0,
                                                                                             MarginPercent : marginpercent,
                                                                                            CostPrice : parseFloat(this.props.footcredential.DiscountPrice - (margin)).toFixed(2),
                                                                                            BMSSplitAmount : (parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(margin)).toFixed(2),
                                                                                            VendorSplitAmount : ((this.props.footcredential.DiscountPrice - (margin)) - parseFloat(this.state.TcsValue)- parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                        
                                                                                            
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
                                                                         value={this.props.footcredential.DiscountPrice}
                                                                         onChange={this.onChangeDpice.bind(this)} />
                                                                     </div>
                                                                 </div>
                                                                <div class="col-md-4">
                                                                     <div class="form-group mb-3">
                                                                         <label for="validationCustom01">Discount Percent(%)<span className="mandatory">*</span></label>
                                                                         <input type="text" class="form-control" value={this.props.footcredential.DiscountPer} 
                                                                        //   disabled={!this.state.IsVisible}
                                                                         onChange={this.onChangeDisc.bind(this)}/>
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
                                                                                var margin = parseFloat((this.props.footcredential.Price*(text.target.value/100)) - (this.props.footcredential.Price*(this.props.footcredential.DiscountPer/100))).toFixed(2)
                                                                                
                                                                                this.setState({
                                                                                    Margin : parseFloat((this.props.footcredential.Price*(text.target.value/100))).toFixed(2),
                                                                                    CostPrice : parseFloat(this.props.footcredential.DiscountPrice - margin).toFixed(2),
                                                                                    BMSSplitAmount :parseFloat(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(margin)).toFixed(2),
                                                                                    VendorSplitAmount : parseFloat((this.props.footcredential.DiscountPrice - (margin)) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                })
                                                                            }else
                                                                            {

                                                                                var margin2 = parseFloat(((text.target.value/100)*this.state.VendorSellingPrice) - (this.state.VendorSellingPrice*(this.props.footcredential.DiscountPer/100))).toFixed(2)
                                                                               

                                                                                this.setState({
                                                                                    Margin : parseFloat((this.state.VendorSellingPrice)*(text.target.value/100)).toFixed(2),
                                                                                    CostPrice : parseFloat(this.props.footcredential.DiscountPrice - parseFloat(margin2)).toFixed(2),
                                                                                    BMSSplitAmount : parseFloat(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(margin2)).toFixed(2),
                                                                                    VendorSplitAmount : parseFloat((this.props.footcredential.DiscountPrice - parseFloat(margin2)) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)
                                                                                    
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
                                                                               CostPrice : parseFloat(this.props.footcredential.DiscountPrice - text.target.value).toFixed(2),
                                                                               BMSSplitAmount : parseFloat(parseFloat(this.state.TdsValue) + parseFloat(this.state.TcsValue) + parseFloat(text.target.value)).toFixed(2),
                                                                               VendorSplitAmount : parseFloat((this.props.footcredential.DiscountPrice - text.target.value) - parseFloat(this.state.TcsValue) - parseFloat(this.state.TdsValue)).toFixed(2)

                                                                              
                                                                           })

                                                                           if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                               this.setState({
                                                                                MarginPercent :  (parseFloat(text.target.value)+parseFloat(this.props.footcredential.Price*(this.props.footcredential.DiscountPer/100))).toFixed(2)
                                                                               })
                                                                           }
                                                                           else
                                                                           {
                                                                            this.setState({
                                                                                MarginPercent :  (parseFloat(text.target.value)+parseFloat(this.state.VendorSellingPrice*(this.props.footcredential.DiscountPer/100))).toFixed(2)
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
                                                       
                                                
                                                        <div class="col-md-9 ">
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
                                                                            imageCount : this.state.imageCount - 1
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
                                                                    // console.log(e.target.result)
                                                                    // this.setState({image: e.target.result});
                                                                    arr1[index].image =  e.target.result
                                                                    arr1[index].value =  e.target.result
                                                                    arr1[index].data =  file
                                                                    
                                                                    // this.props.setstaffimage(e.target.result);
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
                                                                                        Page4: 'Done'
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
                                                                             onClick={this.nextlabel4.bind(this)} >Next</button>
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
                                                                                <label for="validationCustom01">Title Bar(60 Characters)<span className="mandatory">*</span></label>
                                                                                <input type="text" class="form-control"
                                                                                value={this.props.footcredential.Title} 
                                                                                onChange={this.onChangeTitle.bind(this)} />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-12">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Meta Description(160 Characters)</label>
                                                                            <textarea class="form-control" rows="2" cols="10"
                                                                            value={this.props.footcredential.MetaDescription} 
                                                                            onChange={this.onChangeMeta.bind(this)} />
                                                                        </div>
                                                                    </div>
                                                                        <div class="col-md-12">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Keywords(250 Characters)<span className="mandatory">*</span></label>
                                                                            <textarea class="form-control" rows="3" cols="14"
                                                                             value={this.props.footcredential.Keyword} 
                                                                             onChange={this.onChangeKey.bind(this)} />
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
                                                                                        Page5: 'Done'
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
                                                                             onClick={this.nextlabel5.bind(this)} >Next</button>
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
                                                                                         })

                                                                                         this.setState({
                                                                                            Margin : text.target.value != 0 ? parseFloat((this.state.MarginPercent/100)*text.target.value).toFixed(2) : 0,
                                                                                             MarginPercent : text.target.value != 0 ? parseFloat((this.state.Margin/text.target.value)*100).toFixed(2) : 0
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
                                                                                    Margin : parseFloat((text.target.value/100)*this.props.footcredential.Price).toFixed(2)
                                                                                })
                                                                            }else
                                                                            {
                                                                                this.setState({
                                                                                    Margin : parseFloat((text.target.value/100)*this.state.VendorSellingPrice).toFixed(2)
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
                                                                              
                                                                           })

                                                                           if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                               this.setState({
                                                                                MarginPercent :  parseFloat((text.target.value/this.props.footcredential.Price)*100).toFixed(2)
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
                                                   
                                                    <th>Action</th>
                                                   
                                                </tr>
                                            </thead>
                                        
                                     
                                           
                                           
                                    <tbody >
                                 
                                 {this.state.VendorPricing.length == 0 ? 
                                 <tr><td colSpan={7} style={{textAlign:'center'}}>No Pricing Available</td></tr> : 
                                 ''}
                                        
                                         {this.state.VendorPricing.map((data,index)=>(
                                           
                                           
                                       
                                                <tr key={index}>
                                                      
                                                <td>{data.VenName}</td>
                                                <td>{data.Sku}</td>
                                                <td>{data.MarginOn}</td>
                                                <td>{data.VendorSellingPrice}</td>
                                                <td>{data.MarginPercent}</td>
                                                <td>{data.Margin}</td>
                                              
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
                                                isVendorSellingVisible : data[index].VendorSellingPrice == undefined ? false : true
                                               
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
                                                                                        PageTitle: '3',
                                                                                        Page3: 'Done'
                                                                                    })
                                                                                }}
                                                                            >Previous</button>
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius-left" 
                                                                            // onClick={()=>{
                                                       
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
                                                       {/* <div class="col-md-12">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Approval<span className="mandatory">*</span></label>
                                                                <select type="text" class="form-control" 
                                                                value={this.props.footcredential.Approval}
                                                                onChange={this.onChangeApprove.bind(this)}>
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                                
                                                            </select>
                                                            </div>
                                                                </div>*/}
                                                        
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
                                                                          onClick={this.Savefootwearvariant.bind(this)}>Add Accessories Variant</button>
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
        footcredential: state.FootwearItemReducer
    }
  }
  export default connect(mapStateToProps, {
   
    setfootwearsku,
    setfootwearvarient,
    setfootwearitemsize,
    setcolor,
   
    setfootwearpackagingsize,
    setfootwearpackagingweight,
    setfootwearprice,
    setfootweardiscount,
    setfootweardiscountprice,
    setfootweartitle,
    setfootwearkey,
    setfootwearmeta,
    setfootwearvendor,
    setfootwearitemvendor,
    setfootwearmargin,
    setfootwearbmsmargin,
    setfootwearapproval,
    setfootwearpacklength,
    setfootwearpackbreadth,
    setfootwearpackheight,
    setfootwearpackunit,
    setfootwearpackweightunit,
    setfootwearvolumetricweight,
    setclearfootwearitem
    

  }) (Footwear);
