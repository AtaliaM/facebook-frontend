import React from 'react';
import './UserWall.css'
import facebookApi from '../../../apis/facebook-api';
import AddNewPost from '../../UserPosts/AddPost/AddUserPost';
import UserFollowingSection from '../UserFollowingSection/UserFollowingSection';
import EditUserPost from '../../UserPosts/EditPost/EditUserPost';
import DeleteUserPost from '../../UserPosts/DeletePost/DeleteUserPost';

class UserWall extends React.Component {

    state = { userPosts: [] }

    async componentDidMount() {
        if (this.props.userId) {
            try {
                const res = await facebookApi.get(`/posts/user/${this.props.userId}`);
                // console.log(res)
                if (res) {
                    this.setState({ userPosts: res.data.reverse() })
                }

            } catch (e) {
                console.log(e);
            }
        }
    }

    renderUserPosts = () => {
        return (
            this.state.userPosts.map((post) => {
                return (
                    <div className="ui card" key={post._id}>
                        <div className="content scroll">
                            <i className="right floated like icon"></i>
                            <i className="right floated star icon"></i>
                            {post.postHeader ? <h3 className="postHeader">{post.postHeader}</h3> : null}
                            <div className="postBody">
                                <p className="postBody">{post.postBody}</p>
                            </div>
                        </div>
                        {this.props.myProfile ?
                            <div className="extra content">
                                <EditUserPost postId={post._id} postBody={post.postBody} postHeader={post.postHeader} />
                                <DeleteUserPost postId={post._id} />
                            </div>
                            : null}
                        <div className="extra content">
                            <span className="left floated like">
                                <i className="like icon"></i>
                                Like</span>
                            <span >
                                <i className="comment icon"></i>
                                Comments</span>
                            <span className="right floated star">
                                <i className="star icon"></i>
                                Favorite</span>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            this.state.userPosts.length !== 0 ?
                <div className="wall-container">
                    {this.props.myProfile ? <AddNewPost /> : null}
                    <div className="postsContainer">
                        {this.renderUserPosts()}
                    </div>
                        <UserFollowingSection className="followingSection" sectionType="usersIFollow" />
                        <UserFollowingSection className="followingSection" sectionType="followingMe" />
                </div> :
                <div className="wall-container">
                    {this.props.myProfile ? <AddNewPost /> : null}
                    <div className="noPostsMsg">{this.props.myProfile ? `You don't have any posts yet` : `This user doesn't have any posts yet`}</div>
                    <UserFollowingSection className="followingSection" sectionType="usersIFollow" />
                    <UserFollowingSection className="followingSection" sectionType="followingMe" />
                </div>
        )
    }
}


export default UserWall;