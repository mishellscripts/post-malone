import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { fetchPosts } from '../actions/posts';
import { openEditModal } from '../actions/modal';
import Post from '../components/Post';


const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 'calc(100vh - 40px)', // height of screen excluding search bar
  },
  center: {
    display: 'block',
    margin: theme.spacing(2, 'auto'),
  }
});

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {
      classes,
      posts,
      loading,
      error,
      openEditModal,
    } = this.props;

    return (
      <div className={classes.root}>
        {error && <Typography className={classes.center} data-test="errorMessage">{error.message}</Typography>}
        {loading ? <CircularProgress className={classes.center} data-test="loaderComponent" /> : (
          <Grid container spacing={2} data-test="postsContainer">
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post.id}>
                <Post
                  title={post.title}
                  body={post.body}
                  handleEdit={() => openEditModal(post)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

const getFilteredPosts = (posts, searchTerm) => {
  if (searchTerm) {
    return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  return posts;
}

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  error: state.posts.error,
  posts: getFilteredPosts(state.posts.posts, state.posts.searchTerm),
});

const mapDispatchToProps = {
  fetchPosts,
  openEditModal,
};

Posts.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string.isRequired,
  }),
  posts: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));