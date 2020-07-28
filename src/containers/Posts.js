import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchPosts, openEditModal } from '../actions';
import Post from '../components/Post';

const styles = {
  container: {
    padding: 16,
    minHeight: 'calc(100vh - 40px)',
  },
  loader: {
    margin: '16px auto',
  }
};

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, loading, classes, openEditModal, searchTerm } = this.props;
    const filteredPosts = searchTerm ? posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase())) : posts;

    return (
      <Grid container spacing={2} className={classes.container}>
        {loading && <CircularProgress className={classes.loader} />}
        {filteredPosts.map((post) => (
            <Grid item xs={12} sm={6} md={3} key={post.id}>
              <Post
                title={post.title}
                body={post.body}
                handleEdit={() => openEditModal({ modalData: post })}
              />
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  posts: state.initialPosts,
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = {
  fetchPosts,
  openEditModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));