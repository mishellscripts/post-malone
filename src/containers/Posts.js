import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { fetchPosts } from '../actions/posts';
import { openEditModal } from '../actions/modal';
import Post from '../components/Post';


const styles = {
  root: {
    padding: 16,
    minHeight: 'calc(100vh - 40px)',
  },
  center: {
    display: 'block',
    margin: '16px auto',
  }
};

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {
      classes,
      posts,
      searchTerm,
      loading,
      error,
      openEditModal,
    } = this.props;

    const filteredPosts = searchTerm ? posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())) : posts;

    return (
      <div className={classes.root}>
        {error && <Typography className={classes.center} data-test="errorMessage">{error.message}</Typography>}
        {loading ? <CircularProgress className={classes.center} data-test="loaderComponent" /> : (
          <Grid container spacing={2} data-test="postsContainer">
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post.id}>
                <Post
                  title={post.title}
                  body={post.body}
                  handleEdit={() => openEditModal({ ...post })}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  error: state.posts.error,
  posts: state.posts.posts,
  searchTerm: state.posts.searchTerm,
});

const mapDispatchToProps = {
  fetchPosts,
  openEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));