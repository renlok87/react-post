import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserById } from '../../modules/users';
import {
  createPost,
  getPostById,
  getRepliesById,
} from '../../modules/posts';
import { getPostMeta } from '../../modules';
import PostInput from '../../components/PostInput';
import Post from '../../components/Post';
import Timeline from '../../components/Timeline';

export class PostPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        post: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    activeUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    post: PropTypes.object.isRequired,
    replies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    createPost: PropTypes.func.isRequired,
  };

  onSubmit = text => {
    const {
      match: { params },
      activeUser,
      createPost,
    } = this.props;

    createPost({
      userId: activeUser.id,
      replyToId: params.post,
      text,
    });
  };

  render() {
    const { post, replies, activeUser } = this.props;
    const hasReplies = replies.length > 0;

    if (!post) {
      return <Redirect to="/404" />;
    }

    return (
      <React.Fragment>
        <Post {...post} highlighted />
        {hasReplies && (
          <Timeline>
            {replies.map(reply => (
              <Post {...reply} key={reply.id} />
            ))}
          </Timeline>
        )}
        {activeUser && <PostInput onSubmit={this.onSubmit} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => ({
  activeUser: getUserById(state.users, state.users.active),
  post: getPostMeta(state, getPostById(state.posts, params.post)),
  replies: getRepliesById(state.posts, params.post).map(post =>
    getPostMeta(state, post),
  ),
});

const mapDispatchToProps = { createPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostPage);
