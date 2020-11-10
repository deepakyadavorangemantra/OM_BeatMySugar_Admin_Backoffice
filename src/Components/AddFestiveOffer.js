/* eslint-disable no-loop-func */
import React, { Fragment,Component} from 'react'
import Select from 'react-select';
import GetApiCall from '../GetApi';
import PostApiCall from '../Api'
import Notiflix from "notiflix";
import moment from 'moment'
export default class AddFestiveOffer extends Component {

state={
    FoodFilterData:[],
    FoodFilter:[],
    FOotwareFilterData:[],
    FOotwareFilter:[],
    SocksFilterData:[],
    SOcksFilter:[],
    Title:'' ,
    disableFood:false, 
    disableFootware:false, 
    disableSock:false,
    showOnWebsite:'Yes' ,
    offerid:null
}

componentDidMount(){

    Notiflix.Loading.Dots('');


    GetApiCall.getRequest("GetFoodItemData").then(resultdes =>
        resultdes.json().then(objfilter =>{
        
            this.setState({...this.state,
                FoodFilterData:objfilter.data,
            })
        }))

        GetApiCall.getRequest("GetFootwearItemData").then(resultdes =>
            resultdes.json().then(objfilter =>{
            
                this.setState({...this.state,
                    FOotwareFilterData:objfilter.data,
                })
            }))


            GetApiCall.getRequest("GetSocksItemData").then(resultdes =>
                resultdes.json().then(objfilter =>{
                
                    this.setState({...this.state,
                        SocksFilterData:objfilter.data,
                    })
                }))

                Notiflix.Loading.Remove()


}

  onChangeFoodFilter=(filter)=>{
    return  this.setState({...this.state,FoodFilter:filter})
  }
    onChangeFootwareFilter=(filter)=>{
     return this.setState({...this.state,FOotwareFilter:filter,
        // SocksFilter:[],
        // FoodFilter:[]
        })
  }
    onChangeSocksFilter=(filter)=>{
    return  this.setState({...this.state,SOcksFilter:filter,
        // FoodFilter:[],
        // FOotwareFilter:[]
    })
  }

   onchangeInputHandle=(e)=>{
      e.preventDefault()
      this.setState({...this.state,Title:e.target.value})
  }



//   submitHandler=(e)=>{
//     e.preventDefault()


//     if(this.state.showOnWebsite==''){
//       return  Notiflix.Notify.Failure('Please select whether to show this offer or not.');
//     }

//     if(this.state.Title===''){
//       return  Notiflix.Notify.Failure('Please enter festive offer title.');

//     }
//     Notiflix.Loading.Init({
//         svgColor : '#507dc0'
       
//       });

     

//       if(this.state.FoodFilter.length == 0 && this.state.FOotwareFilter.length == 0 && this.state.SOcksFilter.length == 0){
//          Notiflix.Notify.Failure('Please select atleast one product in this offer.');

//       }else
//       {
//         Notiflix.Loading.Dots('Please wait...');
//       }

//   if(this.state.FoodFilter&&this.state.FoodFilter.length!==0){
//     var login=localStorage.getItem('LoginDetail');
//         var details=JSON.parse(login)

//         PostApiCall.postRequest({title:this.state.Title,
//         showonwebsite:this.state.showOnWebsite,
//     updatedby: details[0].fld_staffid,
//     updatedon:moment(new Date()).format('LLL')},'AddFestiveOfferMaster').then((resultssub) => 
                
// // const objs = JSON.parse(result._bodyText)
// resultssub.json().then(objsub => {  Notiflix.Loading.Remove()
//    this.setState({...this.state,
//           offerid:objsub.data[0].OfferId})
   
//     console.log(objsub) }))


//     this.state.FoodFilter.map((singleDate,index)=>{
//              PostApiCall.postRequest({
//                 category:'Food',
//             productid:singleDate.value,
//             offerid:this.state.offerid,
//         updatedby: details[0].fld_staffid,
//         updatedon:moment(new Date()).format('LLL')},'AddFestiveOfferProductMapping').then((resultssub) => 
                    
//     // const objs = JSON.parse(result._bodyText)
//     resultssub.json().then(objsub => {  if(index===this.state.FoodFilter.length-1){
//         Notiflix.Loading.Remove()
//         Notiflix.Notify.Success('Offer with Food Category have been succeffully added') 
//         this.setState({...this.state,FoodFilter:[],
//         Title:''})


//     }}))
//     })

  
   
//   }
//  if(this.state.FOotwareFilter&&this.state.FOotwareFilter.length!==0){
//   var login=localStorage.getItem('LoginDetail');
//         var details=JSON.parse(login)
         

//         PostApiCall.postRequest({title:this.state.Title,
//             showonwebsite:this.state.showOnWebsite,
//         updatedby: details[0].fld_staffid,
//         updatedon:moment(new Date()).format('LLL')},'AddFestiveOfferMaster').then((resultssub) => 
                    
//     // const objs = JSON.parse(result._bodyText)
//     resultssub.json().then(objsub => {  Notiflix.Loading.Remove()
//        this.setState({...this.state,
//               offerid:objsub.data[0].OfferId})
       
//         console.log(objsub) }))
    


//     this.state.FOotwareFilter.map((singleDate,index)=>{
      

//         PostApiCall.postRequest({
//             category:'Footware',
//             productid:singleDate.value,
//             offerid:this.state.offerid,
//         updatedby: details[0].fld_staffid,
//         updatedon:moment(new Date()).format('LLL')},'AddFestiveOfferProductMapping'
//                 ).then((resultssub) => 
               
// // const objs = JSON.parse(result._bodyText)
// resultssub.json().then(objsub => {      
//     if(index===this.state.FOotwareFilter.length-1){
//         Notiflix.Loading.Remove()
//         Notiflix.Notify.Success('Offer with Footwear Category have been succeffully added') 
//         this.setState({...this.state,FOotwareFilter:[],
//         Title:''})


//     }
//     console.log(objsub) }))  
// })    
//   }
//    if(this.state.SOcksFilter&&this.state.SOcksFilter.length!==0){
 
//     var login=localStorage.getItem('LoginDetail');
//     var details=JSON.parse(login)


//     PostApiCall.postRequest({title:this.state.Title,
//         showonwebsite:this.state.showOnWebsite,
//     updatedby: details[0].fld_staffid,
//     updatedon:moment(new Date()).format('LLL')},'AddFestiveOfferMaster').then((resultssub) => 
                
// // const objs = JSON.parse(result._bodyText)
// resultssub.json().then(objsub => {  Notiflix.Loading.Remove()
//    this.setState({...this.state,
//           offerid:objsub.data[0].OfferId})
   
//     console.log(objsub) }))



//     this.state.SOcksFilter.map((singleDate,index)=>{
//       return  PostApiCall.postRequest({ category:'Socks',
//       productid:singleDate.value,
//       offerid:this.state.offerid,
//   updatedby: details[0].fld_staffid,
//   updatedon:moment(new Date()).format('LLL')},'AddFestiveOfferProductMapping'
//          ).then((resultssub) => 
               
//    // const objs = JSON.parse(result._bodyText)
//    resultssub.json().then(objsub => {    if(index===this.state.SOcksFilter.length-1){
//     Notiflix.Loading.Remove()
//     Notiflix.Notify.Success('Offer with Socks Category have been succeffully added') 
//     this.setState({...this.state,SocksFilter:[],
//     Title:''})


// } }))  
// })

//   }

   
//   }



  submitHandler=(e)=>{
    e.preventDefault()

    if(this.state.Title != ''){

        if(this.state.FoodFilter.length > 0 || this.state.FOotwareFilter.length > 0 || this.state.SOcksFilter.length > 0){


            // console.log(this.state.FoodFilter)
            // console.log(this.state.FOotwareFilter)
            // console.log(this.state.SOcksFilter)

            var fcount = 0

            var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)
              
   
            Notiflix.Loading.Dots('');
                
                PostApiCall.postRequest({
                    title:this.state.Title,
                     showonwebsite:this.state.showOnWebsite,
                     updatedby: details[0].fld_staffid,
                      updatedon:moment(new Date()).format('LLL')
                          },"AddFestiveOfferMaster").then((results) => 
                 
                    // const objs = JSON.parse(result._bodyText)
                    results.json().then(obj => {
             
                 
                    if(results.status == 200 || results.status==201){


                        if(this.state.FoodFilter.length>0){

                            for(var i =0 ;i < this.state.FoodFilter.length;i++){
                                PostApiCall.postRequest({
                                    category:'Food',
                                productid:this.state.FoodFilter[i].value,
                               offerid:(JSON.parse(JSON.stringify(obj.data[0]))).OfferId,
                                    updatedby: details[0].fld_staffid,
                                    updatedon:moment(new Date()).format('LLL')
                                          },"AddFestiveOfferProductMapping").then((results1) => 
                                 
                                    // const objs = JSON.parse(result._bodyText)
                                    results1.json().then(obj1 => {
                             
                
                                    if(results1.status == 200 || results1.status==201){

                                        fcount = fcount + 1

                                        if(fcount == this.state.FoodFilter.length){

                                            this.AddFootFilter(obj)

                                        }

                                    }
                                }))

                            }


                        }else
                        {
                            this.AddFootFilter(obj)
                        }


                       

                    }
                }))



        }else{
            Notiflix.Notify.Failure('Please select atleast one product.')
        }

    }else
    {
        Notiflix.Notify.Failure('Please enter offer title.')
    }

}


AddFootFilter(obj){

    var fcount = 0

    var login=localStorage.getItem('LoginDetail');
    var details=JSON.parse(login)

    if(this.state.FOotwareFilter.length>0){

        for(var i =0 ;i < this.state.FOotwareFilter.length;i++){
            PostApiCall.postRequest({
                category:'Footwear',
            productid:this.state.FOotwareFilter[i].value,
           offerid:(JSON.parse(JSON.stringify(obj.data[0]))).OfferId,
                updatedby: details[0].fld_staffid,
                updatedon:moment(new Date()).format('LLL')
                      },"AddFestiveOfferProductMapping").then((results1) => 
             
                // const objs = JSON.parse(result._bodyText)
                results1.json().then(obj1 => {
         

                if(results1.status == 200 || results1.status==201){

                    fcount = fcount + 1

                    if(fcount == this.state.FOotwareFilter.length){

                        this.AddSocksFilter(obj)

                    }

                }
            }))

        }


    }else
    {
        this.AddSocksFilter(obj)
    }

}


AddSocksFilter(obj){

    var fcount = 0

    var login=localStorage.getItem('LoginDetail');
    var details=JSON.parse(login)

    if(this.state.SOcksFilter.length>0){

        for(var i =0 ;i < this.state.SOcksFilter.length;i++){
            PostApiCall.postRequest({
                category:'Socks',
            productid:this.state.SOcksFilter[i].value,
           offerid:(JSON.parse(JSON.stringify(obj.data[0]))).OfferId,
                updatedby: details[0].fld_staffid,
                updatedon:moment(new Date()).format('LLL')
                      },"AddFestiveOfferProductMapping").then((results1) => 
             
                // const objs = JSON.parse(result._bodyText)
                results1.json().then(obj1 => {
         

                if(results1.status == 200 || results1.status==201){

                    fcount = fcount + 1

                    if(fcount == this.state.SOcksFilter.length){

                       Notiflix.Loading.Remove()
                       Notiflix.Notify.Success('Offer added successfully')
                       window.location.href = '/festiveoffers'

                    }

                }
            }))

        }


    }else
    {
        Notiflix.Loading.Remove()
        Notiflix.Notify.Success('Offer added successfully')
        window.location.href = '/festiveoffers'
    }

}

    render() {

// console.log(this.state.FoodFilter);
// console.log(this.state.SOcksFilter);
// console.log(this.state.FOotwareFilter);



        return (
            <Fragment>
            
            <div className="App">
        <div id="wrapper">
            <div className="content-page">
                <div class="content">
                    <div className="container-fluid">
                        <div className="row page-title">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                              <li class="breadcrumb-item"><a href="#">Festive Offers</a></li>
                              <li class="breadcrumb-item" aria-current="page">Offers List</li>
                              <li class="breadcrumb-item active" aria-current="page">Add Offer</li>
                          </ol>
                                </nav>
                                <h4 class="mb-1 mt-0">Add New Festive Offer</h4>
                            </div>
                        </div>

                        <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div id="smartwizard-arrows">
                                                    <ul>
                                                        <li className='active nav-item'><a class="wizardlist nav-link">Offer Details</a></li>
                                                        </ul>



                      
                        </div>



                        <div className="toast fade show" role="alert" aria-live="assertive"
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Title of Festive Offer</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                                <div class="col-md-12">
                                                                                <div class="form-group mb-2">
                                                                                    <label for="validationCustom05">Title of Festive Offer<span className="mandatory">*</span></label>
                                                                                    <input required type="text" class="form-control" id="validationCustom05"
                                                                                    value={this.state.Title}
                                                                                    onChange={(e)=>this.onchangeInputHandle(e)
                                                                                    }

                                                                                  />
                                                                                    
                                                                                </div>
                                                                            </div> 
                                                                        
                                                                             
                                                                           
                                                        
                                                                                  
                                                                                </div>
                                                                                
                                                                         

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>

                                                                        
                                                                    
                                                                    </div>
                                                                </div>
                       
                      
                        <div className="toast fade show" role="alert" aria-live="assertive"
                        style={{overflow : 'visible'}}
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Food</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                               
                                                                        
                                                                             
                                                                           
                                                                         
                                                                        
                                                                            
                                                                           

                                                                            

                                                                            <div class="col-md-12">
                                                                            <div class="form-group productmultiselect">
                                                                            <label for="sw-arrows-first-name" >Food<span className="mandatory">*</span></label>
                                                                            
                                                                            <Select 
                                                                            options={this.state.FoodFilterData}
                                                                                value={this.state.FoodFilter}
                                                                                onChange={this.onChangeFoodFilter.bind(this)}
                                                                                // isDisabled={(this.state.FOotwareFilter&&this.state.FOotwareFilter.length!==0)||(this.state.SOcksFilter&&this.state.SOcksFilter.length!==0)?true:false}
                                                                                isMulti
                                                                        />
                                                                        </div>
                                                                            </div>
                                                                         

                                                                               
                                                                                </div>
                                                                                
                                                                         

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>

                                                                        
                                                                    
                                                                    </div>
                                                                </div>
                  
                  
                                                                <div className="toast fade show" role="alert" aria-live="assertive"
                                                                style={{overflow : 'visible'}}
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Footware</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                               
                                                                        
                                                                             
                                                                           
                                                                         
                                                                        
                                                                            
                                                                           

                                                                            

                                                                            <div class="col-md-12">
                                                                            <div class="form-group productmultiselect">
                                                                            <label for="sw-arrows-first-name" >Footware<span className="mandatory">*</span></label>
                                                                            
                                                                            <Select 
                                                                            options={this.state.FOotwareFilterData}
                                                                                value={this.state.FOotwareFilter}
                                                                                onChange={this.onChangeFootwareFilter.bind(this)}
                                                                                // isDisabled={(this.state.SOcksFilter&&this.state.SOcksFilter.length!==0)||(this.state.FoodFilter&&this.state.FoodFilter.length!==0)?true:false}
                                                                                isMulti
                                                                        />
                                                                        </div>
                                                                            </div>
                                                                         

                                                                               
                                                                                </div>
                                                                                
                                                                         

                                                                                
                                                                            </div> {/* end col-md-12 */}
                                                                            
                                                                        </div>

                                                                        
                                                                    
                                                                    </div>
                                                                </div>
                  

                        <div className="toast fade show" role="alert" aria-live="assertive"
                        style={{overflow : 'visible'}}
                                                                    aria-atomic="true" data-toggle="toast">
                                                                    <div class="toast-header">
                                                                        <strong class="mr-auto">Socks</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
                                                                               
                               
                                                                            <div class="col-md-12">
                                                                            <div class="form-group productmultiselect">
                                                                            <label for="sw-arrows-first-name" >Socks<span className="mandatory">*</span></label>
                                                                            
                                                                           
                                                                            <Select 
                                                                            options={this.state.SocksFilterData}
                                                                                value={this.state.SOcksFilter}
                                                                                onChange={this.onChangeSocksFilter.bind(this)}
                                                                                //   isDisabled={(this.state.FOotwareFilter&&this.state.FOotwareFilter.length!==0)||(this.state.FoodFilter&&this.state.FoodFilter.length!==0)?true:false}
                                                                                isMulti
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
                                                                        <strong class="mr-auto">Show On website</strong>
                                                                    </div>
                                                                    <div class="toast-body">
                                                                    
                                                                    <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                   
    
                                                                            <div class="col-md-12">
                                                                            <div class="form-group">
                                                                            <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                                                                            <label class="radio-inline">
                                                                            <input type="radio" name="optradio" checked = {this.state.showOnWebsite == 'Yes' ? true : false} onChange= {()=>{
                                                                            this.setState({
                                                                                showOnWebsite : 'Yes'
                                                                            })
                                                                            }} /> Yes
                                                                        </label>
                                                                        <label class="radio-inline" style={{marginLeft:'10px'}}>
                                                                            <input type="radio" name="optradio" checked = {this.state.showOnWebsite == 'No' ? true : false} onChange= {()=>{
                                                                            this.setState({
                                                                                showOnWebsite: 'No'
                                                                            })
                                                                            }} /> No
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
                                                                        <div className="btn-toolbar p-1  sw-toolbar sw-toolbar-top justify-content-right" style={{ float: 'right' }}>

                                                                           
                                                                            <button className="btn btn-secondary sw-btn-next  btn-radius"
                                                                            //  onClick={()=>{
                                                       
                                                                            //     this.setState({
                                                                            //         PageTitle : '5',
                                                                            //         Page4 : 'Done'
                                                                            //     })
                                                                            //   }}
                                                                              onClick={this.submitHandler.bind(this)}>Add Offer</button>
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
                      

        </Fragment>

        )
    }
}


