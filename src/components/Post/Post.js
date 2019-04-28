import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core';
import Markdown from 'react-markdown';
import colorFrom from '../../utils/colors';

const imageUrlRe = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/g;

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    wordWrap: 'break-word',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
  },
});

const Post = ({
  classes,
  id,
  text,
  createdAt,
  user: { username },
  replyToId,
  repliedPost,
  highlighted,
}) => {
  const image = text.match(imageUrlRe);

  return (
    <Card
      key={id}
      component={highlighted ? 'div' : 'li'}
      className={classes.card}
      elevation={highlighted ? 8 : 1}
    >
      {image && (
        <CardMedia
          className={classes.cardMedia}
          image={image[0]}
          title="An post's image"
        />
      )}

      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor: colorFrom(username),
            }}
          >
            {username[0]}
          </Avatar>
        }
        title={username}
        subheader={
          <Link to={`/post/${id}`} className={classes.link}>
            {moment(createdAt).fromNow()}
          </Link>
        }
      />

      <CardContent className={classes.content}>
        {repliedPost && (
          <Typography variant="caption">
            In reply to{' '}
            <Link to={`/post/${replyToId}`} className={classes.link}>
              <cite>{repliedPost.text}</cite>
            </Link>
          </Typography>
        )}
        <Typography variant={highlighted ? 'display1' : 'subheading'}>
          <Markdown
            source={text}
            allowedTypes={[
              'root',
              'paragraph',
              'break',
              'emphasis',
              'strong',
              'delete',
              'link',
              'linkReference',
              'inlineCode',
              'code',
            ]}
          />
        </Typography>
      </CardContent>

      {!highlighted && (
        <CardActions>
          <Button color="primary" component={Link} to={`/post/${id}`}>
            Reply
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  replyToId: PropTypes.string,
  repliedPost: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
  highlighted: PropTypes.bool,
};

Post.defaultProps = {
  replyToId: null,
  repliedPost: null,
  highlighted: false,
};

export default withStyles(styles)(Post);
