import React, { useState,useEffect } from 'react'
import './Post.css'
import {db} from './firebase';
import Avatar from "@material-ui/core/Avatar"
import firebase from 'firebase';

function Post({postId, user,username, caption, imageUrl}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) =>{
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return() =>{
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) =>{
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            username:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="MichaelYeung"
                    src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-512.png"
                    />
                <h3>{username}</h3>
            </div>
            

            {/**header = avatar + username */}
            <img className="post_image" src={imageUrl} alt=""></img>
            {/**image */}

            <h4 className="post_text"><strong>{username}</strong>  {caption}</h4>
            {/**username + caption */}

            <div className="post_comments">
                {comments.map((comment)=> (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            {/*comments */}

            {user && (
                <form className="post_commentbox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}

                />
                <button className="post_button" disabled={!comment} type="submit" onClick={postComment}>Post</button>
                
                </form>
            )}
            
        </div>
    )
}

export default Post
