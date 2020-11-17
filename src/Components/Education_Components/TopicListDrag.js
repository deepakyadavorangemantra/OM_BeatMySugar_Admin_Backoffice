import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet'
import {Edit3,Trash2} from 'react-feather';
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux';
import Notiflix from "notiflix";
import PostApiCall from '../../Api';
import GetApiCall from '../../GetApi';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // 
import TopicModel from '../../Components/Education_Components/TopicModel';
import{
    setSubCategoryName,
    setSubOrder,
    setClearArticleSubCategory
}
from '../../Components/Actions/ActionType';

const TopicListView =( props)=> {
    const [  TopicsList, setTopicsList ] = useState([]);
    const [dragId, setDragId] = useState();

    useEffect( ()=>{
        if(props.TopicsList !== ''){
            setTopicsList( props.TopicsList ? props.TopicsList : []);            
        }
     },[props.TopicsList ])

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };

    const handleDrop = (ev) => {
        const dragtopic = TopicsList.find((topic) => topic.fld_id == dragId);
        const droptopic = TopicsList.find((topic) => topic.fld_id == ev.currentTarget.id);
    
        const dragtopicOrder = dragtopic.fld_orderno;
        const droptopicOrder = droptopic.fld_orderno;
    
        const dragtopicIndex = TopicsList.findIndex((topic) => topic.fld_id == dragId);
        const droptopicIndex = TopicsList.findIndex(
          (topic) => topic.fld_id == ev.currentTarget.id
        );
        var TopicsListData = TopicsList;
        let changeOrderList =[];
        if (dragtopicIndex < droptopicIndex) {
          for (let i = droptopicIndex; i > dragtopicIndex; i--) {
            TopicsListData[i].fld_orderno = TopicsList[i - 1].fld_orderno;
            changeOrderList.push({ id : TopicsListData[i].fld_id, orderno :  TopicsList[i - 1].fld_orderno});
          }
          TopicsListData[dragtopicIndex].fld_orderno = droptopicOrder;
          changeOrderList.push({ id : TopicsListData[dragtopicIndex].fld_id, orderno :  droptopicOrder });
        } else if (dragtopicIndex > droptopicIndex) {
          for (let i = droptopicIndex; i < dragtopicIndex; i++) {
            TopicsListData[i].fld_orderno = TopicsList[i+1].fld_orderno;
            changeOrderList.push({ id : TopicsListData[i].fld_id, orderno :  TopicsList[i+1].fld_orderno});
          }
          TopicsListData[dragtopicIndex].fld_orderno = droptopicOrder;
          changeOrderList.push({ id : TopicsListData[dragtopicIndex].fld_id, orderno :  droptopicOrder })
        }
        if(changeOrderList.length>0)
        props.setTopicsListOrderChange(TopicsListData, changeOrderList);
        setDragId('');
    };
     
        return(
    <div>
        <div className="table-responsive">
            <table id="basic-datatable" className="table dt-responsive nowrap">
            <thead>
                <tr><th>Sr.No.</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Updated On</th>
                    <th>Action</th>
                </tr>
            </thead>
        
        
            <tbody>
            {TopicsList.length == 0 ? 
                <tr><td colSpan={5} style={{textAlign:'center'}}>No Topics Available this chapter</td></tr> : 
                ''} 
            {TopicsList.sort((a, b) => a.fld_orderno - b.fld_orderno)
                .map((data, index) => (
                        
                    <tr draggable={true}
                        id={data.fld_id}
                        onDragOver={(ev) => ev.preventDefault()}
                        onDragStart={handleDrag}
                        onDrop={handleDrop}
                        style={{
                            cursor :'grab',
                        }}
                    >   <td>{ index+1 }</td>
                        <td>{data.fld_title}</td>
                        <td style={{color:data.fld_status == 'Active' ? 'green' : 'red'}}><b>{data.fld_status}</b></td>
                        <td>{moment(data.fld_updatedon).format('ll')}</td>
                        <td className="tableact"><span  ><Trash2
                            onClick={()=>{
                            confirmAlert({
                                title: 'Confirm to Delete',
                                message: 'Are you sure you want to delete topic.',
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () => {
                                            props.removeTopicData( data.fld_id);
                                        }
                                    },
                                    {
                                        label: 'No',
                                    }
                                ]
                            });
                            }}
                        /></span>
                        <span >
                            <Edit3 style={{marginLeft: '10px'}}
                            onClick={()=>{
                                props.editTopic(data);
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

  export default  TopicListView;
