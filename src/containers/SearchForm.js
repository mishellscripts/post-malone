import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  SvgIcon,
} from '@material-ui/core';

import { searchPosts } from '../actions/posts';
import { ReactComponent as CloseIcon } from '../icons/close-icon.svg';


const styles = (theme) => ({
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
    borderBottom: '1px solid lightgray',
    cursor: 'pointer',
    '&:last-child': {
      borderBottom: 'none', 
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
});

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
    this.closeAutocomplete();
  }

  handleReset = () => {
    this.setState({ input: '' });
    this.props.searchPosts({ title: '' });
  }

  closeAutocomplete = () => {
    this.setState({ showAutocomplete: false });
  }

  openAutocomplete = () => {
    this.setState((state) => ({ showAutocomplete: state.input.length > 0 }));
  }

  selectItem = (title) => {
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
            id="search"
            label="search"
            onChange={this.handleChange}
            value={this.state.input}
            disabled={loading}
            placeholder="Search"
            className={classes.searchInput}
            onClick={this.openAutocomplete}
            InputProps={{
              endAdornment: this.state.input.length > 0 ? (
                <InputAdornment position="end">
                  <IconButton aria-label="Clear search" onClick={this.handleReset}>
                    <SvgIcon viewBox="0 0 24 24">
                      <CloseIcon />
                    </SvgIcon>
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
                onClick={() => this.selectItem(result.title)}
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
  loading: state.posts.loading,
  posts: state.posts.posts,
});

const mapDispatchToProps = {
  searchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchForm));