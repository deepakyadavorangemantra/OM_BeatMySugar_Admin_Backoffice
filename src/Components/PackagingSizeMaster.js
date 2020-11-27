import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import{
    setpackagessize,
    setclearpackagessize
}from './Actions/ActionType';


class PackagingSizeMaster extends Component {
     constructor(props){
         super(props)
         this.state = {
            open:false,
          };
        }
    
         
          onCloseModal = () => {
            this.setState({ open: false });
          };
         
          onChangesize(packagesize){
            this.props.setpackagessize(packagesize.target.value)
        }
        SaveSize(){
            if(this.props.packagesizecredentails.PackagesSize!=''){

            }
            else{
              Notiflix.Notify.Failure('Size Cannot be empty ')
           }
        }

    render(){
        return(
           <div>
          
                     
            <div class="content-page">
            
            <div class="content">
            <Modal class="modal-content"  
    open={this.state.open}
    
   
     center>

    <div class="modal-content modelcontent2">
      <div class="modal-header">
        <h4 class="modal-title">Add New Size</h4>
      </div>
      <div class="modal-body">
            <div class="col-md-12">
            <div class="form-group mb-3">
                <label for="validationCustom01">Size<span class="mandatory">*</span></label>
                <input type="text" class="form-control" 
                value={this.props.packagesizecredentails.PackagesSize} 
                onChange={this.onChangesize.bind(this)}/>
            </div>
        </div>
      </div>
      <div class="modal-footer">
      <button class="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false
        })
    }}>Close</button>
     
      <button class="btn btn-primary" type="submit" style={{float:'right'}}
      onClick={this.SaveSize.bind(this)}>Save</button>
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
                                    <li class="breadcrumb-item active" aria-current="page">Packaging Size Master</li>
                                </ol>
                            </nav>
                            <h4 class="mb-1 mt-0">Packaging Size</h4>
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
                                                class="uil-plus mr-1"></i>Add New Size</button>
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
                                        <th>Size</th>
                                        <th>Updated On</th>
                                        <th>Action</th>
                                       
                                        
                                    </tr>
                                </thead>
                            
                            
                                <tbody>
                                    <tr>
                                        <td>1X10</td>
                                        <td>March 26, 2020</td>
                                        <td className="tableact"><Edit3/> &nbsp;&nbsp; <Trash2/></td>
                                      
                                       
                                    </tr>
                                   
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
       packagesizecredentails: state.PackageSizeReducer
    }
  }
  
  export default connect(mapStateToProps, {
    setpackagessize,
    setclearpackagessize
    })(PackagingSizeMaster);