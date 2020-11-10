import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import{
    setbooksku,
    setbooktype,
    setbooklanguage,
    setbooksize,
    setbookweight,
     setbookprice,
    setbookdiscount,
    setbookdiscountprice,
    setbooktitle,
    setbookkey,
    setbookmeta,
    setbookvendor,
    setbookitemvendor,
    setbookmargin,
    setbookbmsmargin,
    setbookapproval,
    setbookspacklength,
    setbookspackbreadth,
    setbookspackheight,
    setbookspackunit,
    setbookspackweightunit,
    setbooksvolumetricweight,

    setclearbookitem


}from './Actions/ActionType';
import GetApiCall from '../GetApi';
import {Edit3,Trash2,Monitor} from 'react-feather';
import {XSquare} from 'react-feather';
import PostApiCall from '../Api';
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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


class ViewBookVariant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            PageTitle : '1',
            Page1 : 'Pending',
            Page2 : 'Pending',
            Page3 : 'Pending',
            Page4 : 'Pending',
            imagePreviewUrlCover: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
        
            ImageCoverData : [],
        Photos : [
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : '',remove : undefined,url : ''},
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : '',remove : undefined,url : ''},
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : '',remove : undefined,url : ''},
            {image : 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',value : '',data : '',remove : undefined,url : ''},
   
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

        LanguageData : [],
        TypeData: [],


        VariantId : '',
        SKU : '',

        ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',




        IsVisible : false,
        EditAccessGranted : false,
        ApproveAccessGranted : false
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


        var det = localStorage.getItem('BookParentIdDetails')
        var MasterData = JSON.parse(det)

        this.setState({
            MasterId : MasterData.fld_id
        })


        var vardt = localStorage.getItem('BookVariantDetails')
        var VariantData = JSON.parse(vardt)


        // console.log(VariantData)


        this.props.setbooktype(VariantData.fld_typeid)
        this.props.setbooklanguage(VariantData.fld_languageid)
        // this.props.setbooksize(VariantData.fld_)
        this.props.setbookweight(VariantData.fld_packageweight)
        this.props.setbookprice(VariantData.fld_price)
        this.props.setbookdiscount(VariantData.fld_discountpercent)
        this.props.setbookdiscountprice(VariantData.fld_discountprice)
        this.props.setbooktitle(VariantData.fld_titlebar)
        this.props.setbookkey(VariantData.fld_keywords)
        this.props.setbookmeta(VariantData.fld_metadescription)

        this.props.setbookspacklength(VariantData.fld_length)
        this.props.setbookspackbreadth(VariantData.fld_breadth)
        this.props.setbookspackheight(VariantData.fld_heigth)
        this.props.setbookspackunit(VariantData.fld_volumnetricunit)
        this.props.setbookspackweightunit(VariantData.fld_packageunit)

        
        this.setState({
            VolumetricWeight : VariantData.fld_volumetricweight,
            Status : VariantData.fld_showonwebsite,
            Availability : VariantData.fld_availability,
            VariantId : VariantData.fld_id,
            SKU : VariantData.fld_sku
        })


        var qua = []
        if(VariantData.VendorPricing != null){
            for(var i = 0; i < VariantData.VendorPricing.split('*').length ; i++){
                

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
            this.setState({
                VendorPricing : qua,
                
            })
        }



        var qua1 = [...this.state.Photos]
        var cn = 0 
        if(VariantData.VariantImage != null){
            for(var i = 0; i < VariantData.VariantImage.split('#').length ; i++){

                // console.log(VariantData.VariantImage.split('#')[i])
                if(i == 0){

                    this.setState({
                        imagePreviewUrlCover : VariantData.VariantImage.split('#')[0]
                    })
                }else{

                    cn = cn +1

                    // console.log((VariantData.VariantImage.split('#')[i].split('-').pop()).split('.')[0])


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




        GetApiCall.getRequest("GetBookLanguageData").then(resultdes =>
            resultdes.json().then(objcategory =>{
                // this.props.setbooklanguage(objcategory.data[0].value)
                this.setState({
                    LanguageData:objcategory.data,
                })

            }))


            GetApiCall.getRequest("GetBookTypeData").then(resultdes =>
                resultdes.json().then(objcategory =>{
                    // this.props.setbooktype(objcategory.data[0].value)
                    this.setState({
                        TypeData:objcategory.data,
                    })
    
                }))

                GetApiCall.getRequest("GetVendorData").then(resultdes =>
                    resultdes.json().then(objcategory =>{
              
                        this.setState({
                            VendorData:objcategory.data,
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
               
                                if(filteredRights[i].fld_menuname == 'Edit Books'){
                    
                                  if(filteredRights[i].fld_access == 1){
                                   this.setState({
                                     EditAccessGranted : true
                                   })
                                  }
                                }else if(filteredRights[i].fld_menuname == 'Approve Books'){
                    
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
  
                    // this.props.setbookspackweightunit(this.state.PackageMeasuretData[0].value)
                    // this.props.setbookspackunit(this.state.PackageMeasureUnitData[0].value)
        
    

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
  


     
      onChangeSKU(itemsku){
        if(this.state.AlphaNumericRegex.test(itemsku.target.value)){
        this.props.setbooksku(itemsku.target.value)
        }
    }
    onChangeType(booktype){
        this.props.setbooktype(booktype.target.value)
    }
    onChangelang(language){
        this.props.setbooklanguage(language.target.value)
    }
     
      
      nextlabel(){
        //  if(this.props.bookcredential.BookSKU!=''){
     
        
                    this.setState({
                        PageTitle: '2',
                        Page1: 'Done'
                    })
    
        //          } else{
        //     Notiflix.Notify.Failure('Please enter item SKU of BeatMySugar.')
        //  }
      }


      onChangeSize(packagesize){
        if((this.state.DecimalRegex.test(packagesize.target.value))){
     
          this.props.setbooksize(packagesize.target.value)
      }
    }
      onChangeWeight(packageweight){
        if((this.state.DecimalRegex.test(packageweight.target.value))){
     
          this.props.setbookweight(packageweight.target.value)
      }
    }
      onChangeLength(length){
            if((this.state.DecimalRegex.test(length.target.value))){
     
            this.props.setbookspacklength(length.target.value)

            var vw = length.target.value*this.props.bookcredential.Packbreadth*this.props.bookcredential.Packheight
            var total = vw
             if(this.props.bookcredential.Packunit == 'cm'){
      
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
     
            this.props.setbookspackbreadth(breadth.target.value)

            var vw = breadth.target.value*this.props.bookcredential.Packlength*this.props.bookcredential.Packheight
        var total = vw
         if(this.props.bookcredential.Packunit == 'cm'){
  
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
     
            this.props.setbookspackheight(height.target.value)

            var vw = height.target.value*this.props.bookcredential.Packlength*this.props.bookcredential.Packbreadth

            var total = vw
             if(this.props.bookcredential.Packunit == 'cm'){
      
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
            this.props.setbookspackunit(unitofmeasurement.target.value)
        }
        onChangeWeightmeasure(unitofmeasurement){
            this.props.setbookspackweightunit(unitofmeasurement.target.value)
        }
        onChangeVolume(volumetricweight){
            this.props.setbooksvolumetricweight(volumetricweight.target.value)
        }
      
      nextlabel2(){
                   if(this.props.bookcredential.Packlength!=''){
                        if(this.props.bookcredential.Packbreadth!=''){
                            if(this.props.bookcredential.Packheight!=''){
                          if(this.props.bookcredential.BookWeight!=''){

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
            this.props.setbookprice(price.target.value)
            var amt=parseFloat(price.target.value-(this.props.bookcredential.DiscountPer*price.target.value)/100).toFixed(2)
   
        this.props.setbookdiscountprice(amt)
        
    }
}
    onChangeDisc(discountpercent){
        if((this.state.DecimalRegex.test(discountpercent.target.value))){
   
        this.props.setbookdiscount(discountpercent.target.value)
        var amt=parseFloat(this.props.bookcredential.Price-(discountpercent.target.value*this.props.bookcredential.Price)/100).toFixed(2)
        this.props.setbookdiscountprice(amt)
    }
}
    onChangeDpice(discountprice){
        if((this.props.setbookdiscount(discountprice.target.value))){
        
        this.props.setbookdiscountprice(discountprice.target.value)
        this.props.setbookdiscount(parseFloat(((this.props.bookcredential.Price-discountprice.target.value)/this.props.bookcredential.Price)*100).toFixed(2))


    }
    
}

   
    nextlabel3(){
        if(this.props.bookcredential.Price!=''){
            if(this.props.bookcredential.DiscountPrice !=''){
                            
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

    onChangeVendor(selectvendor){
        this.props.setbookvendor(selectvendor.target.value)
    }
    onChangeVendorsku(itemvendor){
       this.props.setbookitemvendor(itemvendor.target.value)
    }
    onChangeMargin(marginamount){
        if((this.state.DecimalRegex.test(marginamount.target.value))){

      this.props.setbookmargin(marginamount.target.value)
    }
}
    onChangeBms(bmsmargin){
        if((this.state.DecimalRegex.test(bmsmargin.target.value))){
       
       this.props.setbookbmsmargin(bmsmargin.target.value)
    }
}

onChangeTitle(title){
    this.props.setbooktitle(title.target.value)
}
onChangeKey(keyword){
    this.props.setbookkey(keyword.target.value)
}
onChangeMeta(metadescription){
    this.props.setbookmeta(metadescription.target.value)
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
        if(this.props.bookcredential.Title!=''){
            if(this.props.bookcredential.Title.length < 60){
            if(this.props.bookcredential.Keyword!=''){
                if(this.props.bookcredential.Keyword.length < 250){
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
        // console.log(this.state.VendorPricing)
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
       this.props.setbookapproval(approval.target.value)
    }


 
    OnAddProductCoverImage(obj){

        var login=localStorage.getItem('LoginDetail');
  var details=JSON.parse(login)

  // console.log(this.state.imagedata != '')
  if(this.state.ImageCoverData != ''){

    
    const form = new FormData();
     
    form.append('file', this.state.ImageCoverData);
    form.append('foldername' , 'Book')
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

        bookvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
        imageurl : 'https://images.beatmysugar.com/images/Book/'+res.data.Message.split(',')[2].split('=')[1].trim(),
        updatedon : moment().format('lll'),
        updatedby : details[0].fld_staffid

 
     },"AddBookVariantImage").then((results1) => 
     
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

        bookvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
        imageurl : this.state.imagePreviewUrlCover,
        updatedon : moment().format('lll'),
        updatedby : details[0].fld_staffid

 
     },"AddBookVariantImage").then((results1) => 
     
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
        form1.append('foldername' , 'Book')
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
      
            bookvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
            imageurl : 'https://images.beatmysugar.com/images/Book/'+res1.data.Message.split(',')[2].split('=')[1].trim(),
            updatedon : moment().format('lll'),
            updatedby : details[0].fld_staffid
      
      
         },"AddBookVariantImage").then((results2) => 
         
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
      
                    bookvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
                    imageurl : this.state.Photos[i].url,
              
                 },"DeleteBookVariantImage").then((results2) => 
                 
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
      
                    bookvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
                    imageurl : this.state.Photos[i].url,
                    updatedon : moment().format('lll'),
                    updatedby : details[0].fld_staffid
              
              
                 },"AddBookVariantImage").then((results2) => 
                 
                   // const objs = JSON.parse(result._bodyText)
                   results2.json().then(obj2 => {
              
                 
                   if(results2.status == 200 || results2.status==201){
                    count = count + 1;
                    empty = empty +1
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

  for(var j =0 ; j<this.state.VendorPricing.length;j++){

    PostApiCall.postRequest({

     bookvariantid : (JSON.parse(JSON.stringify(obj.data[0]))).VariantId,
     vendorid : this.state.VendorPricing[j].Name,
     sku : this.state.VendorPricing[j].Sku,
     marginon : this.state.VendorPricing[j].MarginOn,
     vendorselling : this.state.VendorPricing[j].VendorSellingPrice,
     margin :  this.state.VendorPricing[j].Margin,
     marginpercent : this.state.VendorPricing[j].MarginPercent,
      updatedon : moment().format('lll'),
      updatedby : details[0].fld_staffid


   },"AddBookVariantVendorPricing").then((results3) => 
   
     // const objs = JSON.parse(result._bodyText)
     results3.json().then(obj3 => {

   
     if(results3.status == 200 || results3.status==201){

      count1 = count1 + 1;

      if(count1 == this.state.VendorPricing.length){
    
        Notiflix.Loading.Remove()
        this.props.setclearbookitem()
        Notiflix.Notify.Success('Book variant added successfully.')
        window.location.href = '/bookvariantlist'
      }
     }
  
    }))
    }

    }



    Savebookvariant(){
        if(this.state.Availability!='')
        {
            if(this.state.Status!=''){


                var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)
                  
       
                Notiflix.Loading.Dots('');
                    
                    PostApiCall.postRequest({
    
                        id : this.state.VariantId,
                         bookid : this.state.MasterId,
                         typeid : this.props.bookcredential.BookType,
                         languageid : this.props.bookcredential.BookLanguage,
                         length : this.props.bookcredential.Packlength,
                         breadth : this.props.bookcredential.Packbreadth,
                         height : this.props.bookcredential.Packheight,
                         volunit : this.props.bookcredential.Packunit,
                         volweight : this.state.VolumetricWeight,
                         packunit : this.props.bookcredential.PackWeightUnit,
                         packweight : this.props.bookcredential.BookWeight,
                         price : this.props.bookcredential.Price,
                         discountpercent : this.props.bookcredential.DiscountPer,
                         discountprice : this.props.bookcredential.DiscountPrice,
                         titlebar : this.props.bookcredential.Title,
                         metadescription : this.props.bookcredential.MetaDescription,
                         keywords : this.props.bookcredential.Keyword,
                         availability : this.state.Availability,
                         showonwebsite : this.state.Status,
                         approved : 'No',
                         updatedby : details[0].fld_staffid,
                         updatedon : moment().format('lll'),
                              },"UpdateBookVariant").then((results) => 
                     
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
    


    ApproveBook(){
        if(this.state.ApproveAccessGranted){

            confirmAlert({
                title: 'Confirm to Approve',
                message: 'Are you sure you want to approve book variant.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {
                        Notiflix.Loading.Dots('');
    
                        var login=localStorage.getItem('LoginDetail');
                        var details=JSON.parse(login)
    
    
            PostApiCall.postRequest({
          
                id : this.state.VariantId,
                 approved : 'Yes',
                 updatedby : details[0].fld_staffid,
                 updatedon : moment().format('lll'),
    
          
              },"UpdateBookVariantApprovalStatus").then((results) => 
              
                // const objs = JSON.parse(result._bodyText)
                results.json().then(obj => {
    
                if(results.status == 200 || results.status==201){
    
                    Notiflix.Loading.Remove()
                    Notiflix.Notify.Success('Book variant successfully approved.')
                    window.location.href = '/bookvariantlist'
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
                                                <li class="breadcrumb-item"><a href="/bookitemmasterlist">Books List</a></li>
                                                <li class="breadcrumb-item"><a href="/bookvariantlist">Books Variant</a></li>
                                               
                                               
                                                <li class="breadcrumb-item active" aria-current="page">View Book Variant</li>
                                            </ol>
                                        </nav>
                                        <h4 class="mb-1 mt-0">View Book Variant</h4>
                                    </div>
                                </div>


                                <div class="row" style={{display : this.state.EditAccessGranted ||  this.state.ApproveAccessGranted ? '' : 'none'}}>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center col-lg-6" style={{float : 'right'}}>
                                       <div class="col text-right row " >

                                        <div style={{display : this.state.ApproveAccessGranted ? '' : 'none'}}>
                                       <button 
                                       style={{marginRight : '10px'}}
                                      onClick={this.ApproveBook.bind(this)}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-check mr-1"></i>Approve Book Variant</button>
                                                </div>

                                        <div style={{display : this.state.EditAccessGranted ? '' : 'none'}}>
                                        <button  
                                      onClick={()=>{
                                          this.setState({IsVisible : true})
                                      
                                      }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-edit mr-1"></i>Edit Book Variant Details</button>
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
                                                        }} class="wizardlist nav-link">Book Item Variants</a></li>

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
                                                 <li className={this.state.PageTitle == '6' ? 'active nav-item' : this.state.Page6 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                if (this.state.Page6 == 'Done') {
                                                                    this.setState({
                                                                        PageTitle: '6',
                                                                        Page6: 'Done',
    
                                                                    })
                                                                }
                                                            }}
                                                                class="wizardlist nav-link">Vendor Pricing</a></li>
                                                        
                                                                <li className={this.state.PageTitle == '7' ? 'active nav-item' : this.state.Page7 == 'Done' ? 'done nav-item' : ''}><a onClick={() => {

                                                                    if (this.state.Page4 == 'Done') {
                                                                        this.setState({
                                                                            PageTitle: '7',
                                                                            Page7: 'Done',
        
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
                                                                <strong class="mr-auto">Book Item Variants</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                                <div class="row">
                                                                   
                                                                   {/* <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Item SKU[BMS]<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control"
                                                                            value={this.props.bookcredential.BookSKU}
                                                                            onChange={this.onChangeSKU.bind(this)}  />
                                                                        </div>
                                                                    </div> */}
                                                                    <div class="col-md-6">
                                                                        <div class="form-group mb-3">
                                                                            <label for="validationCustom01">Book Type<span className="mandatory">*</span></label>
                                                                            <select class="form-control custom-select"
                                                                             disabled={!this.state.IsVisible}
                                                                            value={this.props.bookcredential.BookType}
                                                                            onChange={this.onChangeType.bind(this)}>
                                                                            {this.state.TypeData.map(brand => (
                           
                                                                                <option key={brand.value} value={brand.value}>
                                                                                    {brand.label}
                                                                                </option>
                                                                                ))}
                                                                            
                                                                            
                                                                        </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Language<span className="mandatory">*</span></label>
                                                                        <select class="form-control custom-select"
                                                                         disabled={!this.state.IsVisible}
                                                                        value={this.props.bookcredential.BookLanguage}
                                                                        onChange={this.onChangelang.bind(this)}>
                                                                         {this.state.LanguageData.map(brand => (
                                                                                    
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
                                                        <strong class="mr-auto">Packaging Size & Weight</strong>
                                                    </div>
                                                        <div class="toast-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Length<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={!this.state.IsVisible}
                                                                        value={this.props.bookcredential.Packlength}
                                                                        onChange={this.onChangeLength.bind(this)}
                                                                        />
                                                                    
                                                                    </div>
                                                                </div>
                                                               <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Breadth<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                         disabled={!this.state.IsVisible}
                                                                        value={this.props.bookcredential.Packbreadth}
                                                                        onChange={this.onChangebreadth.bind(this)} />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Height<span className="mandatory">*</span></label>
                                                                        <input type="text" class="form-control" 
                                                                         disabled={!this.state.IsVisible} 
                                                                        value={this.props.bookcredential.Packheight}
                                                                        onChange={this.onChangeHeight.bind(this)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                                    <select type="text" class="form-control" 
                                                                     disabled={!this.state.IsVisible}
                                                                    value={this.props.bookcredential.Packunit}
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
                                                                     disabled={!this.state.IsVisible} 
                                                                    value={this.props.bookcredential.BookWeight}
                                                                    onChange={this.onChangeWeight.bind(this)}/>
                                                                
                                                                </div>
                                                            </div>
                                                          
                                                            <div class="col-md-6">
                                                            <div class="form-group mb-3">
                                                                <label for="validationCustom01">Units Of Measurement<span className="mandatory">*</span></label>
                                                                <select type="text" class="form-control" 
                                                                 disabled={!this.state.IsVisible} 
                                                                value={this.props.bookcredential.PackWeightUnit}
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
                                                                       onClick={this.nextlabel2.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         </div>  {/* Sw-arrow 2*/}

                                            
                                                         <div id="sw-arrows-step-3"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '3' ? 'block' : 'none' }}>
                                                            <div class="toast-header">
                                                            <strong class="mr-auto">Pricing</strong>
                                                        </div>   
                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                        aria-atomic="true" data-toggle="toast">
                                                       
                                                        <div class="toast-body">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Price MRP (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                    <input type="text" class="form-control" 
                                                                     disabled={!this.state.IsVisible}
                                                                    value={this.props.bookcredential.Price}
                                                                    onChange={this.onChangePrice.bind(this)}/>
                                                                
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Discounted Price (<span>&#8377;</span>)<span className="mandatory">*</span></label>
                                                                    <input type="text" class="form-control"
                                                                     disabled={!this.state.IsVisible}
                                                                    value={this.props.bookcredential.DiscountPrice}
                                                                    onChange={this.onChangeDpice.bind(this)}/>
                                                                </div>
                                                            </div>
                                                           <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label for="validationCustom01">Discount Percent(%)<span className="mandatory">*</span></label>
                                                                    <input type="text" class="form-control" 
                                                                     disabled={!this.state.IsVisible}
                                                                    value={this.props.bookcredential.DiscountPer}
                                                                    onChange={this.onChangeDisc.bind(this)} />
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
                                                            <div class="toast-header">
                                                            <strong class="mr-auto">Product Image</strong>
                                                        </div>
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
                                                                         disabled={!this.state.IsVisible}
                                                                        onClick={()=>{
                                                                          var arr2 = [...this.state.Photos]
                                                                          arr2[index].image =  'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png'
                                                                          arr2[index].value =  ''
                                                                          arr2[index].data =  ''
                                                                          arr2[index].remove = 'Yes'
                                                                          this.setState({
                                                                            Photos : arr2,
                                                                            imageCount : this.state.imageCount - 1
                                                                          })
                                                                        }}
                                                                        ></XSquare>
                                                                        <input id="photo-upload" 
                                                                         disabled={!this.state.IsVisible}
                                                                        type="file" onChange={(e)=>{
                                                                  //  e.preventDefault();
                                                                  //  console.log(e.target.files[0])
                                                                   if(e.target.files[0] != undefined){
                                                                     if(e.target.files[0].size < 300000){
                                                                      var arr2 = [...this.state.Photos]
                                                                 const reader = new FileReader();
                                                                   const file = e.target.files[0];
                                                                   reader.onload = (e) => {
                                                                    // console.log(e.target.result)
                                                                    // this.setState({image: e.target.result});
                                                                    arr2[index].image =  e.target.result
                                                                    arr2[index].value =  e.target.result
                                                                    arr2[index].data =  file
                                                                    
                                                                    // this.props.setstaffimage(e.target.result);
                                                                    this.setState({
                                                                      Photos : arr2,
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
                                                                            // onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '4',
                                                                            //         Page3 : 'Done'
                                                                            //     })
                                                                            //   }}
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
                                                                            <label for="validationCustom01">Title Bar(60 Characters)<span className="mandatory">*</span></label>
                                                                            <input type="text" class="form-control"
                                                                             disabled={!this.state.IsVisible}
                                                                            value={this.props.bookcredential.Title} 
                                                                            onChange={this.onChangeTitle.bind(this)} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-12">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Meta Description(160 Characters)</label>
                                                                        <textarea class="form-control" rows="2" cols="10"
                                                                         disabled={!this.state.IsVisible}
                                                                        value={this.props.bookcredential.MetaDescription} 
                                                                        onChange={this.onChangeMeta.bind(this)} />
                                                                    </div>
                                                                </div>
                                                                    <div class="col-md-12">
                                                                    <div class="form-group mb-3">
                                                                        <label for="validationCustom01">Keywords(250 Characters)<span className="mandatory">*</span></label>
                                                                        <textarea class="form-control" rows="3" cols="14"
                                                                         disabled={!this.state.IsVisible}
                                                                         value={this.props.bookcredential.Keyword} 
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
                                                                              onClick={this.nextlabel5.bind(this)}>Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="sw-arrows-step-6"
                                                            className="tab-pane step-content"
                                                            style={{ display: this.state.PageTitle == '6' ? 'block' : 'none' }}>
                                                            
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
                                                                             disabled={!this.state.IsVisible}
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
                                                                          disabled={!this.state.IsVisible}
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
                                                                             disabled={!this.state.IsVisible}
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
                                                                         disabled={!this.state.IsVisible}
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
                                                                         disabled={!this.state.IsVisible}
                                                                        value={this.state.MarginPercent} 
                                                                        onChange={(text)=>{
                                                                            if(this.state.DecimalRegex.test(text.target.value)){
                                                                            this.setState({
                                                                                MarginPercent : text.target.value,
                                                                               
                                                                                
                                                                            })
                                                                            if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                                this.setState({
                                                                                    Margin : parseFloat((text.target.value/100)*this.props.bookcredential.Price).toFixed(2)
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
                                                                         disabled={!this.state.IsVisible}
                                                                       value={this.state.Margin} 
                                                                       onChange={(text)=>{
                                                                        if(this.state.DecimalRegex.test(text.target.value)){
                                                                           this.setState({
                                                                               Margin : text.target.value,
                                                                              
                                                                           })

                                                                           if(this.state.MarginOn == 'Maximum Retail Price (MRP)'){
                                                                               this.setState({
                                                                                MarginPercent :  parseFloat((text.target.value/this.props.bookcredential.Price)*100).toFixed(2)
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
                                                     disabled={!this.state.IsVisible}
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
                                                                             onClick={this.nextlabel6.bind(this)} >Next</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>{/*---end 4 row-- */}
                                                        <div id="sw-arrows-step-7"
                                                        className="tab-pane step-content"
                                                        style={{ display: this.state.PageTitle == '7' ? 'block' : 'none' }}>
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
                                                                 disabled={!this.state.IsVisible}
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
                                                         disabled={!this.state.IsVisible}
                                                                   checked={this.state.Status == 'Yes' ? true : false}
                                                                    onChange={()=>{
                                                                        this.setState({
                                                                            Status : 'Yes'
                                                                        })
                                                                    }}/> Yes
                                                                 </label>
                                                                <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                                    <input type="radio" name="optradio" 
                                                                     disabled={!this.state.IsVisible}
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
                                                                value={this.props.bookcredential.Approval}
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
                                                                                    PageTitle: '6',
                                                                                    Page6: 'Done'
                                                                                })
                                                                            }}
                                                                        >Previous</button>
                                                                        <button className="btn btn-secondary sw-btn-next  btn-radius-left"
                                                                         disabled={!this.state.IsVisible}
                                                                        //  onClick={()=>{
                                                   
                                                                        //     this.setState({
                                                                        //         PageTitle : '5',
                                                                        //         Page5 : 'Done'
                                                                        //     })
                                                                        //   }}
                                                                          onClick={this.Savebookvariant.bind(this)}>Update Book Variant</button>
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
        bookcredential: state.BookReducers
    }
  }
  export default connect(mapStateToProps, {
    
    setbooksku,
    setbooktype,
    setbooklanguage,
    setbooksize,
    setbookweight,
    setbookprice,
    setbookdiscount,
    setbookdiscountprice,
    setbooktitle,
    setbookkey,
    setbookmeta,
    setbookvendor,
    setbookitemvendor,
    setbookmargin,
    setbookbmsmargin,
    setbookapproval,
    setbookspacklength,
    setbookspackbreadth,
    setbookspackheight,
    setbookspackunit,
    setbookspackweightunit,
    setbooksvolumetricweight,
    setclearbookitem

  }) (ViewBookVariant);
