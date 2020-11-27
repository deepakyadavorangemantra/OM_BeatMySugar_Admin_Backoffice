import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import{
    setfoodcategory,
    setclearfoodcategory
}
from './Actions/ActionType';

const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload" >
      <img for="photo-upload" src={src} style={{width : '100%',height:'100%',  borderRadius: '5%'}}/>
    </div>
    <input
    accept="image/*"
    id="photo-upload" type="file" onChange={onChange}/> 
  </label>

class FoodCategory extends Component {

 

    componentDidMount () {

        Notiflix.Loading.Init({
            svgColor : '#507dc0'
           
          });
      
          Notiflix.Loading.Dots('Please wait...');

          this.props.setclearfoodcategory()
      
          GetApiCall.getRequest("GetCovidCategoryMasterList").then(resultdes =>
            resultdes.json().then(obj => {
              // console.log(obj.data)
                this.setState({
                FoodlistData : obj.data
              })
              
               Notiflix.Loading.Remove()
            }))
    }

    onPost = () =>{

      Notiflix.Loading.Dots('Please wait...');

        var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)
        PostApiCall.postRequest ({
            category : this.props.foodcredential.FoodCategoryName,
            abv : this.state.Abv,
            status : this.state.Status,
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
        },"AddCovidCategoryMaster").then((resultFoodC) =>
        resultFoodC.json().then(objfoodC => {
            if(resultFoodC.status == 200 || resultFoodC.status == 201){
            Notiflix.Loading.Remove();
            this.props.setclearfoodcategory()
            Notiflix.Notify.Success('Covid & Health Essentials category successfully added.')
            window.location.reload()
            }else{
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Covid & Health Essentials category already present.')
            }
        })
        )
    }


     constructor(props){
         super(props)
         this.state = {
            open:false,
            openedit : false,
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            ImageData : [],
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
            FoodlistData : [],
            Status : 'Active',
            FoodId : '',
            Abv : ''
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };


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
          } else {
            Notiflix.Notify.Failure("File too large, upload file less than 100 kb.");
          }
          }

    
          onChangeCat(category){

            this.props.setfoodcategory(category.target.value)
        }

        Savefoodcategory(){
          if(this.props.foodcredential.FoodCategoryName!=''){
            if(this.state.Abv!=''){
            this.onPost();
          }
          else{
            Notiflix.Notify.Failure('Please enter Covid & Health Essentials category abbrevation.')
         }
          }
          else{
            Notiflix.Notify.Failure('Please enter Covid & Health Essentials category name.')
         }
      }

      Updatefoodcategory(){
        if(this.props.foodcredential.FoodCategoryName!=''){

          if(this.state.Abv!=''){
            
          Notiflix.Loading.Dots('Please wait...');

          var login=localStorage.getItem('LoginDetail');

        var details=JSON.parse(login)
          PostApiCall.postRequest ({

              covidid : this.state.FoodId,
              category : this.props.foodcredential.FoodCategoryName,
              abv : this.state.Abv,
              status : this.state.Status,
              updatedby : details[0].fld_staffid,
              updatedon : moment().format('lll')
          },"UpdateCovidCategoryMaster").then((resultFoodC) =>
          resultFoodC.json().then(objfoodC => {
              if(resultFoodC.status == 200 || resultFoodC.status == 201){
                this.props.setclearfoodcategory()
              Notiflix.Loading.Remove();
              Notiflix.Notify.Success('Covid & Health Essentials category successfully updated.')
              window.location.reload()
              }else{
                Notiflix.Loading.Remove();
                Notiflix.Notify.Failure('Covid & Health Essentials category already present.')
              }
          })
          )
        }
        else{
          Notiflix.Notify.Failure('Please enter Covid & Health Essentials category abbrevation.')
       }
        }
        else{
          Notiflix.Notify.Failure('Please enter Covid & Health Essentials category name.')
       }
      }

     
    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
            <Modal class="modal-content"  
    open={this.state.open}
    onClose={()=>{
      this.props.setclearfoodcategory()
      this.setState({open : false})
    }}
     center>

    <div class="modal-content modelcontent3">
      <div class="modal-header">
        <h4 class="modal-title">Add New Covid & Health Essentials Category</h4>
      </div>
      <div class="modal-body">
        <div class="row">
        {/* <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Brand Logo<span className="mandatory">*</span></label>
              <div class="div1">
                <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
              
        </div>
            </div>
        </div> */}
        <div div class="col-md-8">

            <div class="form-group mb-3">
                <label for="validationCustom01">Category Name<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.foodcredential.FoodCategoryName} 
                onChange={this.onChangeCat.bind(this)}/>

        </div>  
        </div>
        <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Abbrevation<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.state.Abv} 
                onChange={(text)=>{
                  this.setState({
                    Abv : text.target.value
                  })

                }}/>
            </div>
        </div>
        <div className="col-md-6">
              <div class="form-group mb-3">
                <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                <label class="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.Status == 'Active' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Active'
                  })
                }} /> Active
              </label>
               <label class="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.Status == 'Inactive' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Inactive'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
     
      
        </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}} 
       onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
        this.props.setclearfoodcategory()
    }}>Close</button>
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Savefoodcategory.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              

    <Modal class="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
      this.props.setclearfoodcategory()
      this.setState({openedit : false})
    }}
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Edit Covid & Health Essentials Category</h4>
      </div>
      <div class="modal-body">
      <div class="row">
            <div class="col-md-8">
            <div class="form-group mb-3">
                <label for="validationCustom01">Category Name<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.props.foodcredential.FoodCategoryName} 
                onChange={this.onChangeCat.bind(this)}/>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Abbrevation<span class="mandatory">*</span></label>
                <input type="text" class="form-control"  
                value={this.state.Abv} 
                onChange={(text)=>{
                  this.setState({
                    Abv : text.target.value
                  })

                }}/>
            </div>
        </div>
        </div>

        <div className="col-md-6">
              <div class="form-group mb-3">
                <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                <label class="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.Status == 'Active' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Active'
                  })
                }} /> Active
              </label>
               <label class="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.Status == 'Inactive' ? true : false} onChange= {()=>{
                  this.setState({
                    Status : 'Inactive'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}} 
       onClick={()=>{
        this.setState({
            openedit : false,
            Status : 'Active'
          })
          this.props.setclearfoodcategory()
    }}>Close</button>
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.Updatefoodcategory.bind(this)}>Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              
                <div class="container-fluid">
                    <div class="row page-title">
                        <div class="col-md-12">
                            <nav aria-label="breadcrumb" class="float-right mt-1">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Master Management</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Covid & Health Essentials Category Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Covid & Health Essentials Category Master</h4>
                        </div>
                    </div> 

                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                                                       <div class="col text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true
                                            })
                                        }}
                                        class="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                class="uil-plus mr-1"></i>Add New Category</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                
                </div>
                    
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                <div class="table-responsive">     
                                <table id="basic-datatable" class="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Category Name</th>
                                        <th>Abbrevation</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>


                                {this.state.FoodlistData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Covid Category Available</td></tr> : 
                                 ''}

                                    {this.state.FoodlistData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td>{data.fld_category}</td>
                                           <td>{data.fld_abv}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                           
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete covid & health essentials category.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            covidid : data.fld_id,
                                           
                                        
                                            },"DeleteCovidCategoryMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Covid & Health Essentials category successfully deleted.')
                                                  window.location.reload()
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
                                           }}
                                           />
                                           
                                           <span>
                                             <Edit3 style={{marginLeft: '10px'}}
                                             onClick={()=>{
                                               this.setState({
                                                 Status : data.fld_status,
                                                 openedit : true,
                                                 FoodId : data.fld_id,
                                                 Abv : data.fld_abv
                                               })

                                               this.props.setfoodcategory(data.fld_category)
                                          
                                             }}
                                             
                                             ></Edit3>
                                           </span>
                                           </td>
                                         
                                           </tr>
                           
                                     
                                   ))}
                                    {/* <tr>
                                        <td>Test</td>
                                        <td>March 24, 2020</td>
                                        <td className="tableact"><Edit3/> &nbsp;&nbsp; <Trash2/></td>
                                    </tr> */}
                                   
                                    </tbody>
                                    </table>
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

function mapStateToProps(state){
    return{
        foodcredential: state.FoodCat
    }
  }
  export default connect(mapStateToProps, {
    setfoodcategory,
    setclearfoodcategory
  }) (FoodCategory);