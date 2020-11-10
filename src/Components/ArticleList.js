import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2,Monitor} from 'react-feather';
import GetApiCall from '../GetApi';
import Notiflix from "notiflix";
import moment from 'moment';
import Modal from 'react-responsive-modal';
import PostApiCall from '../Api';

class ArticleList extends Component {
    
    
    constructor(props){
        super(props)
           this.state={
               ArticleData:[],
               open:false,

               PublishDate : '',
               Id : ''
            }
    
        }

        onCloseModal = () => {
            this.setState({ open: false });
          };

        componentDidMount(){
            Notiflix.Loading.Init({
                svgColor : '#507dc0'
               
              });
           
              Notiflix.Loading.Dots('');
    
              GetApiCall.getRequest("GetArticleList").then(resultdes =>
                  resultdes.json().then(obj => {
                 
                  // console.log(obj.data)
                  
                    this.setState({
                        ArticleData : obj.data,

                    })
      
      
                    Notiflix.Loading.Remove();
                  }))
        
        }
         


        SavePublishDate(){

            if(this.state.PublishDate != ''){


                Notiflix.Loading.Dots('Please wait...');
                var login=localStorage.getItem('LoginDetail');
                var details=JSON.parse(login)

                PostApiCall.postRequest ({
                    id : this.state.Id, 
                    publishdate : this.state.PublishDate,
                    updatedby : details[0].fld_staffid,
                    updatedon : moment().format('lll')
                },"Updateblogpublish").then((resultArticel) =>
                resultArticel.json().then(objArtical => {
                    if(resultArticel.status == 200 || resultArticel.status == 201){
                    //   this.props.setClearTag()
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Success('Article published successfully.')
                      window.location.reload()
                    }else
                    {
                      Notiflix.Loading.Remove();
                      Notiflix.Notify.Failure('Something went wrong, try again later.')
                    }
                })
                )

            }else
            {
                Notiflix.Notify.Failure('Please select publish date.')
            }
            // console.log(this.state.PublishDate)
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
      }}
     center>

    <div className="modal-content modelcontent2">
      <div className="modal-header">
        <h4 className="modal-title">Publish Article</h4>
      </div>
      <div className="modal-body">
            <div className="col-md-12">
            <div className="form-group mb-3">
                <label for="validationCustom01">Publish Date<span className="mandatory">*</span></label>
                <input type="date" className="form-control"
                 onKeyDown={(e) => e.preventDefault()} 
                value = {this.state.PublishDate} 
                onChange = {(text)=>{
                    this.setState({
                        PublishDate : text.target.value
                    })

                }}
               />
            </div>
        </div>


     
      </div>
      <div className="modal-footer">
      <button className="btn btn-primary" type="submit" style={{float:'right'}}  onClick={()=>{
        this.setState({
            open : false,
            Status : 'Active'
        })
    }}>Close</button>
     
      <button className="btn btn-primary" type="submit" style={{float:'right'}} 
      onClick={this.SavePublishDate.bind(this)}
     >Save</button>
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
                                    <li className="breadcrumb-item"><a href="#">Health Knowledge</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Article List</li>
                                </ol>
                            </nav>
                            <h4 className="mb-1 mt-0">Article List</h4>
                        </div>
                    </div> 

                    
                <div className="row">
                <div className="col-12">
                     <div className="card">
                         <div className="card-body">
                             <div className="row align-items-center">
                                                                    <div className="col text-right">
                                    <a href='/addarticle'>
                                    <button 
                                    
                                    className="btn btn-primary" id="btn-new-event" data-toggle="modal"><i
                                            className="uil-plus mr-1"></i>Add New Article</button>
                               
                                    </a>
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
                                        <th>Article Title</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Written By</th>
                                        <th>Publish Date</th>
                                        <th>Updated On</th>
                                        <th>Show on Website</th>
                                        <th>Publish</th>
                                        <th>Action</th>
                                        
                                        
                                       
                                        
                                    </tr>
                                </thead>
                            
                                <tbody>

                                            {this.state.ArticleData.length == 0 ? 
                                            <tr><td colSpan={9} style={{textAlign:'center'}}>No Articles Available</td></tr> : 
                                            ''} 
                                            {this.state.ArticleData.map((data,index)=>(
                                                    
                                                    
                                                
                                                <tr key={index}>
                                                            { index == 0 ?
                                                    <Helmet>
                                                
                                            <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                                            <script src="/assets/js/pages/datatables.init.js"></script>
                                            <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>

                                            </Helmet> : ''}
                                                <td>{data.fld_title}</td>
                                                <td>{data.fld_category}</td>
                                                <td>{data.fld_subcategory}</td>
                                                <td>{data.fld_name}</td>
                                                <td>{data.fld_publishdate == null || data.fld_publishdate == '' ? '' : moment(data.fld_publishdate).format('ll')}</td>
                                                <td>{data.fld_lastsavedon == null || data.fld_lastsavedon == '' ? '' : moment(data.fld_lastsavedon).format('ll')}</td>
                                                <td> <Monitor style={{color : data.fld_showonwebsite == 'Yes' ? 'green' : 'red'}} /></td> 

                                            <td>

                                            <button  className="btn btn-primary" id="btn-new-event" data-toggle="modal"
                                            onClick={()=>{
                                               
                                                this.setState({
                                                    Id : data.fld_id,
                                                    PublishDate : data.fld_publishdate,
                                                    open : true
                                                })
                                            }}>Publish</button>
                                            </td>
                                            
                                                <td> <div className="align-self-center tableact" style={{    textAlign: 'center'}}
                                                onClick={()=>{
                                                
                                                    localStorage.setItem('ArticleDetails',JSON.stringify(data))
                                                    window.location.href = '/viewarticle'
                                                }}
                                                >
                                            <span  >
                                            <Edit3/>
                                                </span>
                                                {/* &nbsp;&nbsp;<Trash2/> */}
                                                </div> &nbsp;&nbsp;
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
export default ArticleList;