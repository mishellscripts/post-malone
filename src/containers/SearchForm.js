import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

import { searchPosts } from '../actions';
import CloseIcon from '../icons/CloseIcon';

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '8px 16px',
  },
  searchInput: {
    flexGrow: 1,
    maxWidth: 300,
  },
  searchButton: {
    marginLeft: 8,
  },
  autocomplete: {
    position: 'absolute',
    marginTop: '-12px',
    left: 16,
    backgroundColor: '#fff',
    width: 300,
    border: '1px solid lightgray',
    borderTop: 'none',
    zIndex: 1,
  },
  item: {
    padding: 8,
    borderTop: '1px solid lightgray',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  },
};

class SearchForm extends Component {
  state = {
    input: '',
    showAutocomplete: false,
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value, showAutocomplete: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchPosts({ title: this.state.input.trim() });
  }

  handleReset = () => {
    this.setState({ input: '' });
    this.props.searchPosts({ title: '' });
  }

  closeAutocomplete = (e) => {
    this.setState({ showAutocomplete: false });
  }

  openAutocomplete = (e) => {
    this.setState((state) => ({ showAutocomplete: state.input.length > 0 }));
  }

  selectItem = (e, title) => {
    this.setState({ showAutocomplete: false, input: title });
    this.props.searchPosts({ title });
  }

  render() {
    const { loading, classes, posts } = this.props;
    const { input, showAutocomplete } = this.state;
    const filteredPosts = input ? posts.filter((post) => post.title.toLowerCase().slice(0, -1).startsWith(input.toLowerCase())) : [];

    return (
      <>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleChange}
            value={this.state.input}
            disabled={loading}
            placeholder="Search"
            className={classes.searchInput}
            onClick={this.openAutocomplete}
            InputProps={{
              endAdornment: this.state.input.length > 0 ? (
                <InputAdornment position="end">
                  <IconButton onClick={this.handleReset}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
          <Button className={classes.searchButton} type="submit">Search</Button>
        </form>
        {showAutocomplete && (
          <div role="listbox" className={classes.autocomplete} tabIndex="1">
            {filteredPosts.slice(0, 5).map((result) => (
              <Typography
                variant="body2"
                key={result.id}
                className={classes.item}
                onClick={(e) => this.selectItem(e, result.title)}
                role="option"
              >
                {result.title}
              </Typography>
            ))}
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  posts: state.initialPosts,
});

const mapDispatchToProps = {
  searchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchForm));