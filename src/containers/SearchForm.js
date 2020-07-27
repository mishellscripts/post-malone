import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    width: 200,
  },
  searchButton: {
    marginLeft: 8,
  },
};

class SearchForm extends Component {
  handleChange = (e) => {

  }

  render() {
    const { loading, classes } = this.props;
    return (
      <form className={classes.form}>
        <TextField
          onChange={this.handleChange}
          disabled={loading}
          placeholder="Search"
          className={classes.searchInput}
        />
        <Button className={classes.searchButton}>Search</Button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

// const mapDispatchToProps = {
//   filterPosts,
// };

export default connect(mapStateToProps, null)(withStyles(styles)(SearchForm));