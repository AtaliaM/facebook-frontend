import React from 'react';
import './EditUserPost.css';
import {editAuthPost} from '../../../authPaths';

class EditUserPost extends React.Component {

    state = { editedPostBody: this.props.postBody, editedPostHeader: this.props.postHeader, formOpened: false };

    openOrCloseForm = () => {
        console.log("inn")
        this.setState(prevState => ({
            formOpened: !prevState.formOpened
        }));
    }

    editUserPost = async (event) => {
        event.preventDefault();
        const editedPost = {postBody: this.state.editedPostBody, postHeader: this.state.editedPostHeader}
        try {
            await editAuthPost(this.props.postId, editedPost);
            window.location.reload();
        } catch(e) {
            console.log(e)
        }
    }


    render() {
        return (
            <div>
                <span className="left floated">
                    <button className="ui button" onClick={() => this.openOrCloseForm()}>Edit</button>
                </span>

                <div className={`edit-post-form-popup ${this.state.formOpened ? "show" : "hidden"}`} id="myForm">
                    <form action="/action_page.php" className="edit-post-form-container" onSubmit={this.editUserPost}>
                        <h2 className="posth2">What's on your mind?</h2>
                        <input type="text" id="postHeader" className="postHeader" defaultValue={this.props.postHeader} onChange={(e) => this.setState({ editedPostHeader: e.target.value })} />
                        <textarea name="editPostText" id="editPostText" defaultValue={this.props.postBody} onChange={(e)=>this.setState({editedPostBody:e.target.value})} required/>
                        <button type="submit" className="btn">Submit post</button>
                        <button type="button" className="btn cancel" onClick={() =>this.openOrCloseForm()}>Close</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditUserPost;