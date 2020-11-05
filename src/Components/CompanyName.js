import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import{
  setcompany,
  setclearcompany
     }from './Actions/ActionType';
     
     import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

  

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



class CompanyName extends Component {

  componentDidMount() {


    Notiflix.Loading.Init({
      svgColor : '#507dc0'
     
    });

    Notiflix.Loading.Dots('Please wait...');

    this.props.setclearcompany()

    GetApiCall.getRequest("GetCompanyList").then(resultdes =>
      resultdes.json().then(obj => {

        this.setState({
          CompanyData : obj.data
        })

        Notiflix.Loading.Remove()
        
      }))


    }

    onPost = () =>{

      var login=localStorage.getItem('LoginDetail');
      var details=JSON.parse(login)


      Notiflix.Loading.Dots('Please wait...');

      PostApiCall.postRequest({
        logo : '',
        company : this.props.companycredentials.CompanyName,
        status : this.state.isActive == 'Yes' ? 'Active' : 'Inactive',
        updatedby : details[0].fld_staffid,
        updatedon : moment().format('lll')
      },"AddCompanyMaster").then((resultCompanyDetails) =>
      resultCompanyDetails.json().then(obj => {
        if(resultCompanyDetails.status == 200 || resultCompanyDetails.status == 201){

          const form = new FormData();
                 
          form.append('file', this.state.ImageData);
          form.append('foldername' , 'Company')
          form.append('filename' , this.props.companycredentials.CompanyName.trim().replace(/\s/g,'-')+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).CompanyId)
          
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
  
                  id : (JSON.parse(JSON.stringify(obj.data[0]))).CompanyId,
                  logo : 'https://images.beatmysugar.com/images/Company/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                  updatedby : details[0].fld_staffid,
                  updatedon : moment().format('lll')
                  
               
             },"UpdateCompanyLogo").then((results1) => 
       
               results1.json().then(obj1 => {  
               if(results1.status == 200 || results1.status==201){

                
          this.props.setclearcompany()
          Notiflix.Loading.Remove();
          Notiflix.Notify.Success('Company successfully added.')
          window.location.reload()

                 

               }
              }))


          })
      })



        }else
        {
          Notiflix.Loading.Remove();
          Notiflix.Notify.Failure('Company name already present.')
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
             isActive : 'Yes',
             ImageData : [],
             CompanyData : [],
             Edit : false,
             ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
             Id : ''
           
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

    onChangeCompany(company){
      this.props.setcompany(company.target.value)
    }
    savecompany(){
      if(JSON.stringify(this.state.ImageData) != '[]'){
      if(this.props.companycredentials.CompanyName!=''){
         this.onPost();
      }
      
      else{
        Notiflix.Notify.Failure('Please enter company name.')
     }
    }
    
    else{
      Notiflix.Notify.Failure('Please upload company logo.')
   }
    }



    Updatecompany(){
   
        if(this.props.companycredentials.CompanyName!=''){
       
          var login=localStorage.getItem('LoginDetail');
          var details=JSON.parse(login)
  
          Notiflix.Loading.Dots('Please wait...');
    
          PostApiCall.postRequest({
            id : this.state.Id,
            company : this.props.companycredentials.CompanyName,
            status : this.state.isActive == 'Yes' ? 'Active' : 'Inactive',
            updatedby : details[0].fld_staffid,
            updatedon : moment().format('lll')
          },"UpdateCompanyMaster").then((resultCompanyDetails) =>
          resultCompanyDetails.json().then(objCdetails => {
            if(resultCompanyDetails.status == 200 || resultCompanyDetails.status == 201){
            
              if(JSON.stringify(this.state.ImageData) != '[]'){

              const form = new FormData();
                 
              form.append('file', this.state.ImageData);
              form.append('foldername' , 'Company')
              form.append('filename' , this.props.companycredentials.CompanyName.trim().replace(/\s/g,'-')+'-'+this.state.Id)
              
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
      
                      id : this.state.Id,
                      logo : 'https://images.beatmysugar.com/images/Company/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                      updatedby : details[0].fld_staffid,
                      updatedon : moment().format('lll')
                      
                   
                 },"UpdateCompanyLogo").then((results1) => 
           
                   results1.json().then(obj1 => {  
                   if(results1.status == 200 || results1.status==201){
    
                    
              this.props.setclearcompany()
              Notiflix.Loading.Remove();
              Notiflix.Notify.Success('Company successfully updated.')
              window.location.reload()
    
                     
    
                   }
                  }))
    
    
              })
          })
    
        }else
        {
          this.props.setclearcompany()
          Notiflix.Loading.Remove();
          Notiflix.Notify.Success('Company successfully updated.')
          window.location.reload()
        }
          

            }else
            {
              Notiflix.Loading.Remove();
              Notiflix.Notify.Failure('Company name already present.')
            }
          })
          )
        } 
        else{
          Notiflix.Notify.Failure('Please enter company name.')
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
      this.setState({open : false})
      this.props.setclearcompany()
    }}
   
     center>

    <div class="modal-content modelcontent3">
      <div class="modal-header">
        <h4 class="modal-title">Add New Company</h4>
      </div>
      <div class="modal-body">
            <div className="row">
            <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Company Logo ( Size &lt; 100kb, 500*500)<span class="mandatory">*</span></label>
               <div class="div1">
                <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
              
                         </div>
        </div>
        </div>
        <div class="col-md-8">
            <div className="row">
           
            <div className="col-md-12" style={{    marginTop: '47px'}}>
              <div class="form-group mb-3">
                <label for="validationCustom01">Company Name<span class="mandatory">*</span></label>
                    <input type="text" class="form-control"
                value={this.props.companycredentials.CompanyName}
                onChange={this.onChangeCompany.bind(this)}>
                </input>
               </div>
            </div>
            <div className="col-md-6">
              <div class="form-group mb-3">
                <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                <label class="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.isActive == 'Yes' ? true : false} onChange= {()=>{
                  this.setState({
                    isActive : 'Yes'
                  })
                }} /> Active
              </label>
               <label class="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.isActive == 'No' ? true : false} onChange= {()=>{
                  this.setState({
                    isActive : 'No'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
            </div>
        </div>
            </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            isActive : 'Yes'
        })
        this.props.setclearcompany()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
       onClick={this.savecompany.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
             
             

    <Modal class="modal-content"  
    open={this.state.openedit}
    onClose={()=>{
      this.setState({openedit : false})
      this.props.setclearcompany()
    }}
   
     center>

    <div class="modal-content modelcontent3">
      <div class="modal-header">
        <h4 class="modal-title">Update Company</h4>
      </div>
      <div class="modal-body">
            <div className="row">
            <div class="col-md-4">
            <div class="form-group mb-3">
                <label for="validationCustom01">Company Logo ( Size &lt; 100kb, 500*500)<span class="mandatory">*</span></label>
               <div class="div1">
                <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
              
                         </div>
        </div>
        </div>
        <div class="col-md-8">
            <div className="row">
           
            <div className="col-md-12" style={{    marginTop: '47px'}}>
              <div class="form-group mb-3">
                <label for="validationCustom01">Company Name<span class="mandatory">*</span></label>
                    <input type="text" class="form-control"
                value={this.props.companycredentials.CompanyName}
                onChange={this.onChangeCompany.bind(this)}>
                </input>
               </div>
            </div>
            <div className="col-md-6">
              <div class="form-group mb-3">
                <label for="validationCustom01">Status<span class="mandatory">*</span></label><br/>
                <label class="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.isActive == 'Yes' ? true : false} onChange= {()=>{
                  this.setState({
                    isActive : 'Yes'
                  })
        
                }} /> Active
              </label>
               <label class="radio-inline" style={{marginLeft:'10px'}}>
                <input type="radio" name="optradio" checked = {this.state.isActive == 'No' ? true : false} onChange= {()=>{
                  this.setState({
                    isActive : 'No'
                  })
                }} /> Inactive
              </label> 
                </div>
            </div>
            </div>
        </div>
            </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            isActive : 'Yes'
        })
        this.props.setclearcompany()
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
       onClick={this.Updatecompany.bind(this)}>Update</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Company Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Company Master</h4>
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
                                                class="uil-plus mr-1"></i>Add New Company</button>
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
                                        <th>Company Logo</th>
                                       <th>Company Name</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                {this.state.CompanyData.length == 0 ? 
                                 <tr><td colSpan={5} style={{textAlign:'center'}}>No Salt Available</td></tr> : 
                                 ''} 
                                    {this.state.CompanyData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td><img style={{width:'100px',height: '100px'}} src={data.fld_logo} /></td>
                                           <td>{data.fld_company}</td>
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                        ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete the company.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                               companyid : data.fld_id,
                                           
                                        
                                            },"DeleteCompanyMaster").then((results) => 
                                            
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Company successfully deleted.')
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
                                                }
                                              ]
                                            });
                                           }}
                                           />
                                           <span>
                                             <Edit3 style={{marginLeft: '10px'}}
                                             onClick={()=>{
                                              this.props.setcompany(data.fld_company)
                                               this.setState({
                                                imagePreviewUrl : data.fld_logo,
                                                Id : data.fld_id,
                                               openedit : true,
                                              isActive : data.fld_status == 'Active' ? 'Yes' : 'No'
                                               })
                                             }}
                                             
                                             ></Edit3>
                                           </span>
                                           </td>
                                         
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
            </div>
         </div>  

           </div>
        )
    }
}

function mapStateToProps(state){
  return{
      companycredentials: state.CompanyReducers
  }
}

export default connect(mapStateToProps, {
  setcompany,
  setclearcompany})(CompanyName);
