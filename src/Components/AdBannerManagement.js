import React, { Component,Fragment } from 'react'
import Select from 'react-select';
import Notiflix from 'notiflix';
import PostApiCall from '../Api';
import moment from 'moment';
import { Helmet } from 'react-helmet';

var width = '100%'
var height = 300

var widthm = 365
var heightm = 400


var widthapp = 250
var heightapp = 150

const ImgUploadCover = ({
    onChange,
    src
}) =>
    <label htmlFor="photo-upload-1" className="custom-file-upload fas"  style={{width: width, height:height+'px',borderRadius : '10px'}}>
        
    <div className="img-wrap1 img-upload1" style={{width: width-10, height:height-15+'px', borderRadius: '10px'}}>
            <img for="photo-upload-1" src={src} style={{width: width, height:height-15+'px', borderRadius: '10px' }} />
        </div>
        <input
        accept="image/*"
        id="photo-upload-1" type="file" onChange={onChange} />
    </label>



    const ImgUploadCover1 = ({
        onChange1,
        src1
    }) =>
        <label htmlFor="photo-upload-2" className="custom-file-upload fas"  style={{width: widthm, height:heightm,borderRadius : '10px'}}>
            
        <div className="img-wrap1 img-upload1" style={{width: widthm-15, height:heightm-15, borderRadius: '10px'}}>
                <img for="photo-upload-2" src={src1} style={{width: widthm-15, height:heightm-15, borderRadius: '10px' }} />
            </div>
            <input
            accept="image/*"
            id="photo-upload-2" type="file" onChange={onChange1} />
        </label>
    
    const ImgUploadCover2 = ({
        onChange2,
        src2
    }) =>
        <label htmlFor="photo-upload-3" className="custom-file-upload fas"  style={{width: widthapp, height:heightapp,borderRadius : '10px'}}>
            
        <div className="img-wrap1 img-upload1" style={{width: widthapp-15, height:heightapp-15+'px', borderRadius: '10px'}}>
                <img for="photo-upload-3" src={src2} style={{width: widthapp-15, height:heightapp-15+'px', borderRadius: '10px' }} />
            </div>
            <input
            accept="image/*"
            id="photo-upload-3" type="file" onChange={onChange2} />
        </label>
    


export default class AddBanner extends Component {
    constructor(props){
        super(props)


        this.state={

            UrlRegex : /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
     
        VerticalData:[
            {value: '', label:'Select Vertical'},
            {value: 'Home', label:'Home'},
            {value: 'Food & Supplements', label:'Food & Supplements'},
            {value: 'Footwear', label:'Footwear'},
            {value: 'Socks', label:'Socks'},
            {value: 'Festive Offer', label:'Festive Offer'},
            {value: 'Insurance', label:'Insurance'},
            {value: 'Doctor', label:'Doctors'},
            {value: 'Dietician', label:'Dietitian'},
            {value: 'Sell With Us', label:'Sell With Us'},
            {value: 'Careers', label:'Careers'},
            {value: 'Contact Us', label:'Contact Us'}
        ],
        TypeData:[
            {value: '', label:'Select Type'},
            {value: 'Listing Page', label:'Listing Page'},
            {value: 'Detail Page', label:'Detail Page'},
            {value: 'Detail Page Side Banner', label:'Detail Page Side Banner'},
        ],

        Vertical : '',
        Type : '',
        Url : '',
        ShowOnWebsite : 'Yes',
        BannerOrder : 1,

        IsType : false,
        WebSizeText : '',
        MobileSizeText : '',
        MobileAppSizeText:'',
        ImageDataCover:[],
        ImageDataCover1:[],
        ImageDataCover2:[],
        OrderData : [],
        file:'',
        file1:'',
        file2:'',
        imagePreviewUrlCover: '/assets/images/Cover-logo.png',
        imagePreviewUrlCover1: '/assets/images/Cover-logo.png',
        imagePreviewUrlCover2: '/assets/images/Cover-logo.png',

        ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
      
   
        // ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
      
    }




    }


    componentDidMount(){
        var dt = []
        for(var i = 0 ;i<20;i++){

            dt.push({label : i+1 ,value : i+1})

         
        }
        this.setState({
            OrderData : dt
        })

    }
   
    photoUploadCover = e => {
        e.preventDefault();
        if (e.target.files[0].size < 300000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {

    
            this.setState({
                file: file,
                imagePreviewUrlCover: reader.result,
               ImageDataCover: file
            });
         
        }
        reader.readAsDataURL(file);
    }else {
            Notiflix.Notify.Failure("File too large, upload file less than 200 kb.");
          }
    }

    photoUploadCover1 = e => {
        e.preventDefault();
        if (e.target.files[0].size < 300000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
      
            this.setState({
                file1: file,
                imagePreviewUrlCover1: reader.result,
               ImageDataCover1: file
            });
         
        }
        reader.readAsDataURL(file);
    }else {
            Notiflix.Notify.Failure("File too large, upload file less than 200 kb.");
          }
    }


    photoUploadCover2 = e => {
        e.preventDefault();
        if (e.target.files[0].size < 300000) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
      
            this.setState({
                file2: file,
                imagePreviewUrlCover2: reader.result,
               ImageDataCover2: file
            });
         
        }
        reader.readAsDataURL(file);
    }else {
            Notiflix.Notify.Failure("File too large, upload file less than 200 kb.");
          }
    }


save(){
    if(this.state.Vertical != ''){

        if(this.state.Vertical == 'Home' || this.state.Vertical =='Insurance' || this.state.Vertical =='Sell With Us' || this.state.Vertical =='Contact Us' || this.state.Vertical =='Careers'){

            this.AddNewBanner()
        }else{

            if(this.state.Type != ''){
                this.AddNewBanner()
            }
            else
            {
                Notiflix.Notify.Failure('Please select banner type.')
            }
            
        }
    }else{
        Notiflix.Notify.Failure('Please select banner vertical.')
    }

}

AddNewBanner(){
    if(this.state.Url != ''){

        if(this.state.UrlRegex.test(this.state.Url)){
            this.SaveFinal()
        }else
        {
            Notiflix.Notify.Failure('Please specify complete URL.')
        }

    }else
    {

    this.SaveFinal()
  
}
}

SaveFinal(){
    if(JSON.stringify(this.state.ImageDataCover) != '[]')
    {
         if(JSON.stringify(this.state.ImageDataCover1) != '[]')
         if(JSON.stringify(this.state.ImageDataCover2) != '[]'){
            {

                Notiflix.Loading.Dots('')
        
                var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)
        
                   PostApiCall.postRequest({
                       verticle :this.state.Vertical,
                       type:this.state.Type,
                       url :this.state.Url,
                       showonwebsite :this.state.ShowOnWebsite,
                       updatedby :details[0].fld_staffid,
                       updatedon :moment().format('lll'),
                       order : this.state.BannerOrder
                     },"AddAdBannerMaster").then((result) =>
                     
                       result.json().then(obj1 =>{
        
                           if(result.status == 200 || result.status==201){
        
                               if(JSON.stringify(this.state.ImageDataCover) != '[]'){
                 
                                   const form = new FormData();
                                            
                                   form.append('file', this.state.ImageDataCover);
                                   form.append('foldername' , 'AdBanner')
                                   form.append('filename' ,'WebBanner'+'-'+(JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId)
                                   
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
                           
                               id : (JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId,
                               type : 'web',
                               photo : 'https://images.beatmysugar.com/images/AdBanner/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                      
                           },"UpdateAdBannerImage").then((results1) => 
                           
                            results1.json().then(obj2 => {  
                            if(results1.status == 200 || results1.status==201){
                            //  console.log(obj2)
                      
        
                           if(JSON.stringify(this.state.ImageDataCover1) != '[]'){
                 
                            const form = new FormData();
                                     
                            form.append('file', this.state.ImageDataCover1);
                            form.append('foldername' , 'AdBanner')
                            form.append('filename' ,'MobileBanner'+'-'+(JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId)
                            
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
                    
                        id : (JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId,
                        type : 'mobile',
                        photo : 'https://images.beatmysugar.com/images/AdBanner/'+res.data.Message.split(',')[2].split('=')[1].trim(),
               
                    },"UpdateAdBannerImage").then((results2) => 
                    
                     results2.json().then(obj3 => {  
                     if(results2.status == 200 || results2.status==201){
                         
                //   console.log('MobileApp'+ (JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId)
                
                this.AddMobileAppBanner(obj1)

                    }



                    }))
                    
                    
                    })
                    
        
        
        
        
        
                  
                    })
                    
                    }
                       
        
                    
                            }
                           }))
                           
                           
                           })
                           })
                           
                           }
        
                      
                               
                       }
                       })
                     )
                
            }
         }
       else{

        Notiflix.Notify.Failure('Please upload mobile app banner.')


         }
  else
    {
        Notiflix.Notify.Failure('Please upload mobile banner.')
    }

    }else
    {
        Notiflix.Notify.Failure('Please upload website banner.')
    }
}


AddMobileAppBanner(obj1){

    // console.log(obj1.data)

    if(JSON.stringify(this.state.ImageDataCover2) != '[]'){


        const form = new FormData();
                 
        form.append('file', this.state.ImageDataCover2);
        form.append('foldername' , 'AdBanner')
        form.append('filename' ,'MobileAppBanner'+'-'+(JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId)
        
        // console.log(this.state.ImageApiUrl)
fetch(this.state.ImageApiUrl, {
method: 'POST', 
body: form
}).then((image) => {

image.json().then(data => ({
data: data,
status: image.status
})
).then(res=>{
    // console.log(res.data)
    PostApiCall.postRequest({

        id : (JSON.parse(JSON.stringify(obj1.data[0]))).AdBannerId,
        type : 'mobileApp',
        photo : 'https://images.beatmysugar.com/images/AdBanner/'+res.data.Message.split(',')[2].split('=')[1].trim(),

    },"UpdateAdBannerImage").then((results4) => 
    
     results4.json().then(obj4 => {  
     if(results4.status == 200 || results4.status==201){
      console.log(obj4)
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success('Banner successfully added.')
        window.location.href='/bannermanagement'
    
     }
    }))
    
    
   
})

    }

     





 )
  } else
  {
    Notiflix.Loading.Remove();
    Notiflix.Notify.Success('Banner successfully added.')
    window.location.href='/bannermanagement'
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
                              <li class="breadcrumb-item"><a href="#">Banner Management</a></li>
                              <li class="breadcrumb-item" aria-current="page">Add new Banner</li>
                          </ol>
                                </nav>
                                <h4 class="mb-1 mt-0">Add New Banner</h4>
                            </div>
                        </div>

                        <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div id="smartwizard-arrows">
                                                    <ul>
                                                        <li className='active nav-item'><a class="wizardlist nav-link">Banner Details</a></li>
                                                    </ul>
                        </div>

                       
                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Banner Category</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">                                                                            

                                                                            <div class="col-md-6">
                                                                                <div class="form-group">
                                                                                <label>Vertical<span className="mandatory">*</span></label>
                                                                                <select type="text" class="form-control" 
                                                                                value={this.state.Vertical}
                                                                                onChange={(text)=>{

                                                                                    this.setState({
                                                                                        Vertical : text.target.value
                                                                                    })

                                                                                   

                                                                                    if(text.target.value == ''){
                                                                                        this.setState({
                                                                                            IsType : false,
                                                                                            WebSizeText : '',
                                                                                            MobileSizeText : '',
                                                                                            MobileAppSizeText : ''
                                                                                        })
                                                                                        width = '100%'
                                                                                        height = 300
                                                                                    }

                                                                                    else if(text.target.value == 'Home' || text.target.value =='Insurance' || text.target.value =='Sell With Us' || text.target.value =='Contact Us' || text.target.value =='Careers')
                                                                                    {
                                                                                        this.setState({
                                                                                            IsType : false,
                                                                                            WebSizeText : '(Banner must be 1600 X 400 in dimension, less than 300 kb)',
                                                                                            MobileSizeText : '(Banner must be 365 X 400 in dimension, less than 300 kb)',
                                                                                            MobileAppSizeText : '(Banner must be 250 X 150 in dimension, less than 300 kb)',
                                                                                            Type : ''
                                                                                        })
                                                                                        width = '100%'
                                                                                        height = 300
                                                                                        widthm = 365
                                                                                        heightm = 400
                                                                                        widthapp = 250
                                                                                        heightapp = 150
                                                                                    }else
                                                                                    {
                                                                                      
                                                                                        this.setState({
                                                                                            IsType : true,
                                                                                            WebSizeText : '',
                                                                                            MobileSizeText : '',
                                                                                            MobileAppSizeText : ''
                                                                                        })  
                                                                                    }
                                                                                  

                                                                                }}
                                                                               >
                                                                       
                                                                               {this.state.VerticalData.map(title => (
                           
                                                                                    <option key={title.value} value={title.value}>
                                                                                        {title.label}
                                                                                    </option>
                                                                                    ))}
                                                                                </select>
                                                                                 </div>
                                                                            </div>

                                                                            <div  class="col-md-6" style={{display : this.state.IsType ? '' : 'none'}}>
                                                                                <div class="form-group" >
                                                                                <label>Type<span className="mandatory">*</span></label>
                                                                                <select type="text" class="form-control" 
                                                                                     value={this.state.Type}
                                                                                     onChange={(text)=>{

                                                                                        if(text.target.value == 'Listing Page' || text.target.value == 'Detail Page')
                                                                                        {

                                                                                            this.setState({
                                                                                                
                                                                                                WebSizeText : '(Banner must be 1600 X 180 in dimension, less than 300 kb)',
                                                                                                MobileSizeText : '(Banner must be 365 X 60 in dimension, less than 300 kb)',
                                                                                            MobileAppSizeText : '(Banner must be 250 X 150 in dimension, less than 300 kb)',

                                                                                            })
                                                                                            width = '100%'
                                                                                            height = 200
                                                                                            widthm = 365
                                                                                            heightm = 100
                                                                                            widthapp = 250
                                                                                            heightapp = 150

                                                                                        }else if(text.target.value =='Detail Page Side Banner')
                                                                                        {

                                                                                            this.setState({
                                                                                               
                                                                                                WebSizeText : '(Banner must be 340 X 310 in dimension, less than 300 kb)',
                                                                                                MobileSizeText : '(Banner must be 340 X 310 in dimension, less than 300 kb)',
                                                                                            MobileAppSizeText : '(Banner must be 250 X 150 in dimension, less than 300 kb)',

                                                                                            })
                                                                                            width = '340px'
                                                                                            height = 310
                                                                                            widthm = 340
                                                                                            heightm = 310
                                                                                            widthapp = 250
                                                                                            heightapp = 150

                                                                                        }
                                                                                        this.setState({
                                                                                            Type : text.target.value
                                                                                        })
    
                                                                                    }}
                                                                                >
                                                                        
                                                                                {this.state.TypeData.map(title => (
                            
                                                                                     <option key={title.value} value={title.value}>
                                                                                         {title.label}
                                                                                     </option>
                                                                                     ))}
                                                                                 </select>
                                                                                </div>
                                                                            </div>                                                                               
                                                                               
                                                                               
                                                                            <div  class="col-md-6" style={{display : this.state.Vertical == 'Home' ? '' : 'none'}}>
                                                                                <div class="form-group" >
                                                                                <label>Banner Order<span className="mandatory">*</span></label>
                                                                                <select type="text" class="form-control" 
                                                                                     value={this.state.BannerOrder}
                                                                                     onChange={(text)=>{

                                                                                        if(text.target.value == 'Listing Page' || text.target.value == 'Detail Page')
                                                                                        {

                                                                                            this.setState({
                                                                                                
                                                                                                WebSizeText : '(Banner must be 1600 X 180 in dimension, less than 300 kb)',
                                                                                                MobileSizeText : '(Banner must be 365 X 60 in dimension, less than 300 kb)',
                                                                                            MobileAppSizeText : '(Banner must be 250 X 150 in dimension, less than 300 kb)',

                                                                                            })
                                                                                            width = '100%'
                                                                                            height = 200
                                                                                            widthm = 365
                                                                                            heightm = 100
                                                                                            widthapp = 250
                                                                                            heightapp = 150

                                                                                        }else if(text.target.value =='Detail Page Side Banner')
                                                                                        {

                                                                                            this.setState({
                                                                                               
                                                                                                WebSizeText : '(Banner must be 340 X 310 in dimension, less than 300 kb)',
                                                                                                MobileSizeText : '(Banner must be 340 X 310 in dimension, less than 300 kb)',
                                                                                            MobileAppSizeText : '(Banner must be 250 X 150 in dimension, less than 300 kb)',

                                                                                            })
                                                                                            width = '340px'
                                                                                            height = 310
                                                                                            widthm = 340
                                                                                            heightm = 310
                                                                                            widthapp = 250
                                                                                            heightapp = 150

                                                                                        }
                                                                                        this.setState({
                                                                                            BannerOrder : text.target.value
                                                                                        })
    
                                                                                    }}
                                                                                >
                                                                        
                                                                                {this.state.OrderData.map(title => (
                            
                                                                                     <option key={title.value} value={title.value}>
                                                                                         {title.label}
                                                                                     </option>
                                                                                     ))}
                                                                                 </select>
                                                                                </div>
                                                                            </div>                                                                               
                                                                              
                                                                                </div>                                                                            
                                                                            </div>                                                                             
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div class="toast-header">
                                                                    <strong class="mr-auto">URL (URL of the page to which banner should navigate when it is clicked.)</strong>
                                                                </div>
                                                                <div class="toast-body">
                                                                
                                                                <div class="row">
                                                                        <div class="col-md-12">
                                                                            <div class="row">
                                                                               
                                                                            <div class="col-md-12">
                                                                            <div class="form-group mb-2">
                                                                                <label for="validationCustom05">URL</label>
                                                                                <input type="text" class="form-control" id="validationCustom05"
                                                                               value ={this.state.Url}
                                                                               onChange={(text)=>{

                                                                                this.setState({
                                                                                    Url : text.target.value
                                                                                })

                                                                               }}
                                                                              />
                                                                                
                                                                            </div>
                                                                        </div> 
                                                                              
                                                                            </div>
                                                                            
                                                                        </div> {/* end col-md-12 */}
                                                                        
                                                                    </div>

                                                                    
                                                                
                                                                </div>
                                                            </div>
                   
                  
                                                            <div className="toast fade show" role="alert" aria-live="assertive"
                                                            aria-atomic="true" data-toggle="toast">
                                                            <div class="toast-header">
                                                                <strong class="mr-auto">Upload Website Banner</strong>
                                                            </div>
                                                            <div class="toast-body">
                                                            
                                                            <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="row">
                                                                           
                                                                        <div class="col-md-12">
                                                                        <div class="form-group mb-2">
                                                                           <div>
                                                                           </div>
                                                                            <label for="validationCustom05">Website Banner<span className="mandatory">* </span> 
                                                                            <span> {this.state.WebSizeText}</span>
                                                                            </label>
                                                                            <div>
                                                                            <ImgUploadCover onChange={(e)=>this.photoUploadCover(e)} src={this.state.imagePreviewUrlCover} />

                                                                        </div>
                                                                            
                                                                        </div>
                                                                    </div> 
                                                                          
                                                                        </div>
                                                                        
                                                                    </div> {/* end col-md-12 */}
                                                                    
                                                                </div>

                                                                
                                                            
                                                            </div>
                                                        </div>




                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                        aria-atomic="true" data-toggle="toast">
                                                        <div class="toast-header">
                                                            <strong class="mr-auto">Upload Mobile Banner</strong>
                                                        </div>

                                                        <div class="toast-body">
                                                        
                                                        <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="row">
                                                                       
                                                                    <div class="col-md-12">
                                                                    <div class="form-group mb-2">
                                                                       
                                                                        <label for="validationCustom05"> Mobile Banner<span className="mandatory">* </span> 
                                                                        <span> {this.state.MobileSizeText}</span>
                                                                       </label>
                                                                      
                                                                        <div>
                                                                        <ImgUploadCover1 onChange1={(e)=>this.photoUploadCover1(e)} src1={this.state.imagePreviewUrlCover1} />

                                                                    </div>
                                                                        
                                                                    </div>
                                                                </div> 
                                                                      
                                                                    </div>
                                                                    
                                                                </div> {/* end col-md-12 */}
                                                                
                                                            </div>

                                                            
                                                        
                                                        </div>
                                                    </div>



                                                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                        aria-atomic="true" data-toggle="toast">
                                                        <div class="toast-header">
                                                            <strong class="mr-auto">Upload Mobile App Banner</strong>
                                                        </div>

                                                        <div class="toast-body">
                                                        
                                                        <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="row">
                                                                       
                                                                    <div class="col-md-12">
                                                                    <div class="form-group mb-2">
                                                                       
                                                                        <label for="validationCustom05"> Mobile App Banner<span className="mandatory"> </span> 
                                                                        <span> {this.state.MobileAppSizeText}</span>
                                                                       </label>
                                                                      
                                                                        <div>
                                                                        <ImgUploadCover2 onChange2={(e)=>this.photoUploadCover2(e)} src2 ={this.state.imagePreviewUrlCover2} />

                                                                    </div>
                                                                        
                                                                    </div>
                                                                </div> 
                                                                      
                                                                    </div>
                                                                    
                                                                </div> {/* end col-md-12 */}
                                                                
                                                            </div>

                                                            
                                                        
                                                        </div>
                                                    </div>







               
                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Show On website</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                        <div class="col-md-12">
                                                                               
                                                                            <label class="radio-inline">
                                                                                <input type="radio" name="optradio"  
                                                                                 checked={this.state.ShowOnWebsite == 'Yes' ? true : false}
                                                                                 onChange={()=>{
                                                                                     this.setState({
                                                                                        ShowOnWebsite : 'Yes'
                                                                                     })
                                                                                 }}
                                                                                /> Yes
                                                                            </label>
                                                                            <label class="radio-inline" style={{marginLeft:'20px'}}>
                                                                                <input type="radio" name="optradio" 
                                                                                  checked={this.state.ShowOnWebsite == 'No' ? true : false}
                                                                                  onChange={()=>{
                                                                                      this.setState({
                                                                                         ShowOnWebsite : 'No'
                                                                                      })
                                                                                  }}
                                                                                /> No
                                                                            </label>
                                                                               
                                                                        </div>
                                                                            
                                                                        </div>

                                                                        
                                                                    
                                                                    </div>
                                                                </div>
                  


                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                aria-atomic="true" data-toggle="toast">
                                                                <div className='row'>
                                                                   
                                                                    <div className="col-md-12" style={{height:'3.5rem'}}>
                                                                        <div className="btn-toolbar sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                           
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius m-2"
                                                                           
                                                                              onClick={this.save.bind(this)}>Save</button>
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
                      

     
        )
    }
}
