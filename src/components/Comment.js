import React from 'react'
import LikeDislikeComment from './LikeDislikeComment'
import {useDispatch, useSelector } from 'react-redux'
import {  DeleteOutlined, EditOutlined} from '@ant-design/icons'
import { Button} from 'antd'
import axios from 'axios'
import { setMediaComments } from '../redux/reducers/comment/commentSlice'



const Comment = ({ comment }) => {
    
    const userInformation = useSelector((store) => store.userInformation)
   
    const deleteComment  = async (event) => {
        event.persist()
        axios
            .delete(
                `${process.env.REACT_APP_API_BASE_URL}/api/comments/delete`,
                {
                    data: {
                        comment_id: comment.comment_id
                    },
                }
            )
            .then((response) => {
                console.log(response)
            })

        }
    
    function ShowDeleteButton(){

        if(comment.user.id == userInformation.id ){
            return (
                <Button 
                onClick={(e) => deleteComment(e)}
                type= "link" shape="circle" 
                icon={<DeleteOutlined />}
                danger
                />
            )
        }
        else return null

    }

    function ShowEditButton(){
        if(comment.user.id == userInformation.id ){
            return (
                <Button 
                onClick={(e) => deleteComment(e)}
                type= "link" shape="circle" 
                icon={<EditOutlined />}
                
                />
            )
        }
        else return null

    }
    


    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" alt="user icon" />
            </div>

            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">
                        {comment.user.username}
                    </div>
                    <div className="timeStamp">{comment.comment_timestamp}< ShowDeleteButton /> <ShowEditButton/></div>
                </div>
                <div className="comment-text">
                    {comment.content}
                    
                    
                    <div style={{ width: '110px', margin: '8px' }}>
                    
                        <LikeDislikeComment
                            key={comment.comment_id}
                            commentId={comment.comment_id}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
