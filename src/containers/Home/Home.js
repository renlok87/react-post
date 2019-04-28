import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostInput from '../../components/PostInput';
import { logout, getUserById } from '../../modules/users';
import { createPost, getPostById, getAllPosts } from '../../modules/posts';
import Post from '../../components/Post';
import Timeline from '../../components/Timeline';
import sortByDatetime from '../../utils/datetime';

export class Home extends React.Component {
  static propTypes = {
    activeUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string,
    }).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    createPost: PropTypes.func.isRequired,
  };

  onSubmit = text => {
    const {
      createPost,
      activeUser: { id: userId },
    } = this.props;
    createPost({ userId, text });
  };

  render() {
    const { posts } = this.props;

    return (
      <React.Fragment>
        <PostInput onSubmit={this.onSubmit} />
        <Timeline>
          {posts.map(post => (
            <Post {...post} key={post.id} />
          ))}
        </Timeline>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: getUserById(state.users, state.users.active),
  posts: getAllPosts(state.posts)
    .map(post => ({
      ...post,
      repliedPost: getPostById(state.posts, post.replyToId),
      user: getUserById(state.users, post.userId),
    }))
    .sort(sortByDatetime),
});

const mapDispatchToProps = { logout, createPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
