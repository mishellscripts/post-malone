import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { filterPosts } from '../actions';

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '8px 16px',
  },
  searchInput: {
    flexGrow: 1,
    maxWidth: 300,
  },
  searchButton: {
    marginLeft: 8,
  },
};

class SearchForm extends Component {
  state = {
    input: '',
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.filterPosts({ title: this.state.input.trim() });
  }

  render() {
    const { loading, classes } = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          onChange={this.handleChange}
          value={this.state.input}
          disabled={loading}
          placeholder="Search"
          className={classes.searchInput}
        />
        <Button className={classes.searchButton} type="submit">Search</Button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

const mapDispatchToProps = {
  filterPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchForm));