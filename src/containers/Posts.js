import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { fetchPosts } from '../actions';
import Post from '../components/Post';
import Grid from '@material-ui/core/Grid';

const styles = {
  container: {
    marginTop: 16,
  }
};

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, classes } = this.props;
    return (
      <Grid container spacing={2} className={classes.container}>
        {posts.map(({ title, body, id }) => (
          <Grid item xs={12} sm={6} md={3}>
            <Post title={title} body={body} key={id} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));