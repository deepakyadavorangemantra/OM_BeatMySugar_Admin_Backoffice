import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet'
import { Edit,Edit3,Trash2} from 'react-feather';
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

const QuestionListView =( props)=> {

    const [  QuestionList, setQuestionList ] = useState([]);
    const [dragId, setDragId] = useState();
    useEffect( ()=>{
        if(props.QuestionList !== ''){
            setQuestionList( props.QuestionList ? props.QuestionList : []);            
        }
     },[props.QuestionList ])

     const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };

    const handleDrop = (ev) => {
        const dragtopic = QuestionList.find((topic) => topic.fld_id == dragId);
        const droptopic = QuestionList.find((topic) => topic.fld_id == ev.currentTarget.id);
    
        const dragtopicOrder = dragtopic.fld_orderno;
        const droptopicOrder = droptopic.fld_orderno;
    
        const dragtopicIndex = QuestionList.findIndex((topic) => topic.fld_id == dragId);
        const droptopicIndex = QuestionList.findIndex(
          (topic) => topic.fld_id == ev.currentTarget.id
        );
        var QuestionListData = QuestionList;
        let changeOrderList =[];
        if (dragtopicIndex < droptopicIndex) {
          for (let i = droptopicIndex; i > dragtopicIndex; i--) {
            QuestionListData[i].fld_orderno = QuestionList[i - 1].fld_orderno;
            changeOrderList.push({ id : QuestionListData[i].fld_id, orderno :  QuestionList[i - 1].fld_orderno});
          }
          QuestionListData[dragtopicIndex].fld_orderno = droptopicOrder;
          changeOrderList.push({ id : QuestionListData[dragtopicIndex].fld_id, orderno :  droptopicOrder });
        } else if (dragtopicIndex > droptopicIndex) {
          for (let i = droptopicIndex; i < dragtopicIndex; i++) {
            QuestionListData[i].fld_orderno = QuestionList[i+1].fld_orderno;
            changeOrderList.push({ id : QuestionListData[i].fld_id, orderno :  QuestionList[i+1].fld_orderno});
          }
          QuestionListData[dragtopicIndex].fld_orderno = droptopicOrder;
          changeOrderList.push({ id : QuestionListData[dragtopicIndex].fld_id, orderno :  droptopicOrder })
        }
        if(changeOrderList.length>0)
        props.setQuestionListOrderChange(QuestionListData, changeOrderList);
        setDragId('');
    };
        
        return(
           <div>
            <div className="table-responsive">
            <table id="basic-datatable" className="table dt-responsive nowrap">
            <thead>
                <tr>
                    <th>Question </th>
                    <th>Options</th>
                    <th>Status</th>
                    <th>Updated On</th>
                    <th>Action</th>
                </tr>
            </thead>
        
        
            <tbody>
            {QuestionList.length == 0 ? 
                <tr>
                    <td colSpan={5} style={{textAlign:'center'}}>No Topics Available this chapter</td></tr> : 
                    ''} 
                {QuestionList.sort((a, b) => a.fld_orderno - b.fld_orderno)
                .map((data) => (
                        
                            
                <tr draggable={true}
                    id={data.fld_id}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                    style={{
                        cursor :'grab',
                    }}
                >
                    <td>{data.fld_questiontext}</td>
                    <td>{data.options.length > 0 ? 
                        data.options.map((option,index)=>(
                            
                            <tr style={{ color : option.fld_iscorrect == 1? 'green' : '' }}> { (index+1)+'. '+option.fld_optiontext }</tr>))
                        :'' }</td>
                    <td style={{color:data.fld_status == '1' ? 'green' : 'red'}}><b>{data.fld_status == true? 'Active' : 'Inactive'}</b></td>
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
                                props.removeQuestionData( data.fld_id);
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
                            props.editQuestion(data);
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

  export default  QuestionListView;
