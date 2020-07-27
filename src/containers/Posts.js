import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { fetchPosts, openEditModal } from '../actions';
import Post from '../components/Post';
import Grid from '@material-ui/core/Grid';

const styles = {
  container: {
    padding: 16,
  },
};

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, classes, openEditModal } = this.props;
    return (
      <Grid container spacing={2} className={classes.container}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={3} key={post.id}>
            <Post
              title={post.title}
              body={post.body}
              handleEdit={() => openEditModal({ modalData: post })}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  posts: state.posts,
});

const mapDispatchToProps = {
  fetchPosts,
  openEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));