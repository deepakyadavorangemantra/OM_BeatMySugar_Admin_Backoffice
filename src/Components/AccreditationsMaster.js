import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import PostApiCall from '../Api'
import GetApiCall from '../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import{
    setNameAccred,
    setclearNameAccred
     }from './Actions/ActionType';


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

class AccreditationsMaster extends Component {

  componentDidMount(){
    Notiflix.Loading.Init({
        svgColor : '#507dc0'
       
      });
      this.props.setclearNameAccred()

  
      Notiflix.Loading.Dots('Please wait...');
  
      GetApiCall.getRequest("GetAccreditationMasterList").then(resultdes =>
        resultdes.json().then(obj => {
            this.setState({    
            AccreData : obj.data
          })
           Notiflix.Loading.Remove()
            // console.log(obj.data)
        }))


        
}

onPost = () =>{
  Notiflix.Loading.Dots('Please wait...');
  var login=localStorage.getItem('LoginDetail');
var details=JSON.parse(login)

  PostApiCall.postRequest ({
    logo : '',
    name : this.props.Accreditationcred.Name,
    status : this.state.isActive == 'Yes' ? 'Active' : 'Inactive',
      updatedby : details[0].fld_staffid,
      updatedon : moment().format('lll')
  },"AddAccreditationMaster").then((resultAccr) =>
  resultAccr.json().then(obj => {
      if(resultAccr.status == 200 || resultAccr.status == 201){

      const form = new FormData();
                 
      form.append('file', this.state.ImageData);
      form.append('foldername' , 'Accreditations')
      form.append('filename' , this.props.Accreditationcred.Name.trim().replace(/\s/g,'-')+'-'+(JSON.parse(JSON.stringify(obj.data[0]))).AccreditationId)
      
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

              id : (JSON.parse(JSON.stringify(obj.data[0]))).AccreditationId,
              logo : 'https://images.beatmysugar.com/images/Accreditations/'+res.data.Message.split(',')[2].split('=')[1].trim(),
              updatedby : details[0].fld_staffid,
              updatedon : moment().format('lll')
              
           
         },"UpdateAccreditationMasterLogo").then((results1) => 
   
           results1.json().then(obj1 => {  
           if(results1.status == 200 || results1.status==201){

            
            this.props.setclearNameAccred()
            Notiflix.Loading.Remove();
            Notiflix.Notify.Success('Accredition successfully added.')
            window.location.reload()
  
           }
          }))


      })
  })
     
      }else
        {
          Notiflix.Loading.Remove();
          Notiflix.Notify.Failure('Accredition already present.')
        }
  })
  )
}


     constructor(props){
         super(props)
         this.state = {
            open:false,
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            Status : 'Active',
            ImageApiUrl : 'https://images.beatmysugar.com/api/Image/SaveImage',
            Id : '',
            AccreData: [],
            ImageData : [],
            isActive : 'Yes'
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

        onChangeName(Name){
          this.props.setNameAccred(Name.target.value)
        }
       
       
        saveAccreditations(){
          if(JSON.stringify(this.state.ImageData) != '[]'){
          if(this.props.Accreditationcred.Name!=''){
            this.onPost();
          }
          else{
            Notiflix.Notify.Failure('Please enter accreditation name.')
         }
        }
        else{
          Notiflix.Notify.Failure('Please upload accreditation logo.')
       }
        }


        UpdateAccreditations(){
          if(this.state.imagePreviewUrl != null){
            if(this.props.Accreditationcred.Name!=''){
          

              Notiflix.Loading.Dots('Please wait...');
              var login=localStorage.getItem('LoginDetail');
            var details=JSON.parse(login)

              PostApiCall.postRequest ({
                id : this.state.Id,
                name : this.props.Accreditationcred.Name,
                status : this.state.isActive == 'Yes' ? 'Active' : 'Inactive',
                  updatedby : details[0].fld_staffid,
                  updatedon : moment().format('lll')
              },"UpdateAccreditationMaster").then((resultBrand) =>
              resultBrand.json().then(obj => {
                  if(resultBrand.status == 200 || resultBrand.status == 201){
                    
                    if(JSON.stringify(this.state.ImageData) != '[]')
                    {
                      const form = new FormData();
                 
                      form.append('file', this.state.ImageData);
                      form.append('foldername' , 'Accreditations')
                      form.append('filename' , this.props.Accreditationcred.Name.trim().replace(/\s/g,'-')+'-'+this.state.Id)
                      
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
                      logo : 'https://images.beatmysugar.com/images/Accreditations/'+res.data.Message.split(',')[2].split('=')[1].trim(),
                      updatedby : details[0].fld_staffid,
                      updatedon : moment().format('lll')
                      
                   
                 },"UpdateAccreditationMasterLogo").then((results1) => 
           
                   results1.json().then(obj1 => {  
                       if(results1.status == 200 || results1.status==201){
            
                        
                        this.props.setclearNameAccred()
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Accreditation successfully updated.')
                        window.location.reload()
              
                       }
                      }))
            
            
                  })
              })
            
            }
            else
            {
              this.props.setclearNameAccred()
                        Notiflix.Loading.Remove();
                        Notiflix.Notify.Success('Accreditation successfully updated.')
                        window.location.reload()
              
            }
                  
                  }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Accreditationalready present.')
                    }
              })
              )
            }
            else{
              Notiflix.Notify.Failure('Please enter accreditation name.')
           }
          }
          else{
            Notiflix.Notify.Failure('Please upload accreditation logo.')
         }
        }

    render(){
        return(
           <div>
          
                     
            <div className="content-page">
            
            <div className="content">
            <Modal className="modal-content"  
    open={this.state.open}
    
    onClose={()=>{
      this.setState({open : false})
      this.props.setclearNameAccred()
    }}
     center>

    <div className="modal-content modelcontent3">
      <div className="modal-header">
        <h4 className="modal-title">Add New Accreditation</h4>
      </div>
      <div className="modal-body">
            <div className="row">
            <div className="col-md-4">
            <div className="form-group mb-3">
                <label for="validationCustom01">Logo<span className="mandatory">*</span></label>
              <div className="div1">
                <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
              
        </div>
            </div>
        </div>
        <div className="col-md-8">
            <div className="row">
            <div className="col-md-12" style={{    marginTop: '28px'}}>
              <div className="form-group mb-3">
                <label for="validationCustom01">Name<span className="mandatory">*</span></label>
                <input type="text" className="form-control" 
                value={this.props.Accreditationcred.Name}
                onChange={this.onChangeName.bind(this)}/>
               </div>
            </div>
            
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                <label className="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.isActive == 'Yes' ? true : false} onChange= {()=>{
                  this.setState({
                    isActive : 'Yes'
                  })
                  
                }}  /> Active
              </label>
               <label className="radio-inline" style={{marginLeft:'10px'}}>
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
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            isActive : 'Yes'
        })
        this.props.setclearNameAccred()
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}}
       onClick={this.saveAccreditations.bind(this)}>Save</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
              

              <Modal className="modal-content"  
    open={this.state.openedit}
    
    onClose={()=>{
      this.setState({openedit : false})
      this.props.setclearNameAccred()
    }}
     center>

    <div className="modal-content modelcontent3">
      <div className="modal-header">
        <h4 className="modal-title">Update Accreditation</h4>
      </div>
      <div className="modal-body">
            <div className="row">
            <div className="col-md-4">
            <div className="form-group mb-3">
                <label for="validationCustom01">Logo<span className="mandatory">*</span></label>
              <div className="div1">
                <ImgUpload onChange={this.photoUpload} src={this.state.imagePreviewUrl}/>
              
        </div>
            </div>
        </div>
        <div className="col-md-8">
            <div className="row">
            <div className="col-md-12" style={{marginTop: '28px'}}>
              <div className="form-group mb-3">
                <label for="validationCustom01">Name<span className="mandatory">*</span></label>
                <input type="text" className="form-control" 
                value={this.props.Accreditationcred.Name}
                onChange={this.onChangeName.bind(this)}/>
               </div>
            </div>
            
            <div className="col-md-6">
            <div className="form-group mb-3">
                <label for="validationCustom01">Status<span className="mandatory">*</span></label><br/>
                <label className="radio-inline">
                <input type="radio" name="optradio" checked = {this.state.isActive == 'Yes' ? true : false} onChange= {()=>{
                  this.setState({
                    isActive : 'Yes'
                  })
                }} /> Active
              </label>
               <label className="radio-inline" style={{marginLeft:'10px'}}>
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
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            openedit : false,
            imagePreviewUrl: 'https://www.adcproductdesign.com/wp-content/uploads/2018/02/Realize-Icon-Blue.png',
            isActive : 'Yes'
        })
        this.props.setclearNameAccred()
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}}
       onClick={this.UpdateAccreditations.bind(this)}>Update</button>
        <span>

        </span>
      </div>
 
</div>
    </Modal>
                
              
                <div className="container-fluid">
                    <div className="row page-title">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb" className="float-right mt-1">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Master Management</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Accreditations Master</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Accreditations Master</h4>
                        </div>
                    </div> 

                    <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                        <div className="col text-right">
                                        <button 
                                        onClick={()=>{
                                            this.setState({
                                                open : true
                                            })
                                        }}
                                        className="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                                className="uil-plus mr-1"></i>Add New Accreditation</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                
                </div>
                    
                    
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                <div className="table-responsive">
                                <table id="basic-datatable" className="table dt-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Logo</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                            
                                {this.state.AccreData.length == 0 ? 
                                 <tr><td colSpan={6} style={{textAlign:'center'}}>No Accreditations Available</td></tr> : 
                                 ''} 
                                {this.state.AccreData.map((data,index)=>(
                                           
                                           <tr key={index}>
                                               { index == 0 ?
                                                 <Helmet>
                                             
                                       <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                       <script src="/assets/js/pages/datatables.init.js"></script>
                                       <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
                                  
                                       </Helmet> : ''}
                                           <td><img style={{width:'100px',height: '100px'}} src={data.fld_logo} /></td>
                                           <td>{data.fld_name}</td>
                                  
                                           <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                                           <td>{moment(data.fld_updatedon).format('ll')}</td>
                                           <td className="tableact"
                                          
                                           ><Trash2
                                           onClick={()=>{
                                            confirmAlert({
                                              title: 'Confirm to Delete',
                                              message: 'Are you sure you want to delete Accreditation.',
                                              buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => {
                                                      Notiflix.Loading.Dots('');
                                  
                                    
                                  
                                          PostApiCall.postRequest({
                                        
                                            accreditationid : data.fld_id,
                                           
                                        
                                            },"DeleteAccreditationMaster").then((results) => 
                                            
                                              // const objs = JSON.parse(result._bodyText)
                                              results.json().then(obj => {
                                  
                                              if(results.status == 200 || results.status==201){
                                  
                                                  Notiflix.Loading.Remove()
                                                  Notiflix.Notify.Success('Accreditation successfully deleted.')
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
                                              this.props.setNameAccred(data.fld_name)
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
    Accreditationcred: state.Accreditation
  }
}

export default connect(mapStateToProps, {
    setNameAccred,
    setclearNameAccred
  })(AccreditationsMaster);