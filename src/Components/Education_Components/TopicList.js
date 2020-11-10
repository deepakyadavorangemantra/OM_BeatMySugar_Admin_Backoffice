import React, { Component } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../../Api'
import GetApiCall from '../../GetApi'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // 
import TopicModel from '../../Components/Education_Components/TopicModel';
import{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from '../../Components/Actions/ActionType';

class TopicListView extends Component {

    constructor(props){
        super(props)
        this.state = {
           open:false,
           select_chapter_id: '',
           topicEditData :'',
           TopicsList : [],
           ChapterData :[],
           Numregex : /^[0-9]*$/,
           Status : 'Active',
           Id : '',
           openedit : false,
         };
       }
     
         
    render(){
        const TopicsList = this.props.TopicsList;
        const { ChapterData, select_chapter_id }= this.state
        return(
           <div>
            <div className="table-responsive">
            <table id="basic-datatable" className="table dt-responsive nowrap">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Updated On</th>
                    <th>Action</th>
                </tr>
            </thead>
        
        
            <tbody>
            {TopicsList.length == 0 ? 
                <tr><td colSpan={5} style={{textAlign:'center'}}>No Topics Available this chapter</td></tr> : 
                ''} 
            {TopicsList.map((data,index)=>(
                        
                        <tr key={index}>
                            { index == 0 ?
                                <Helmet>
{/*                             
                    <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
                    <script src="/assets/js/pages/datatables.init.js"></script>
                    <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script> */}
                
                    </Helmet> : ''}
                        <td>{data.fld_title}</td>
                        <td>{data.fld_orderno}</td>
                        <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                        <td>{moment(data.fld_updatedon).format('ll')}</td>
                        <td className="tableact"
                        
                        ><Trash2
                        onClick={()=>{
                        confirmAlert({
                            title: 'Confirm to Delete',
                            message: 'Are you sure you want to delete topic.',
                            buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    this.props.removeTopicData( data.fld_id);
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
                                this.props.editTopic(data);
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
            
     
        )
    }
}

  export default  TopicListView;
