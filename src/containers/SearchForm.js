import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withStyles,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  SvgIcon,
} from '@material-ui/core';

import { filterPosts } from '../actions/posts';
import { ReactComponent as CloseIcon } from '../icons/close-icon.svg';


const styles = (theme) => ({
  form: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: theme.spacing(1, 2),
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flexGrow: 1,
    maxWidth: 300,
  },
  searchButton: {
    marginLeft: theme.spacing(1),
  },
  autocomplete: {
    position: 'absolute',
    marginTop: '-8px',
    left: theme.spacing(2),
    width: 298, // width of search input excluding border width
    border: '1px solid lightgray',
    borderTop: 'none',
    zIndex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    padding: theme.spacing(1),
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
    touched: false,
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value, touched: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.touched) {
      this.searchPosts(this.state.input);
    }
  }

  searchPosts = (title) => {
    const query = title.trim();
    this.setState({ touched: false, input: query });
    this.props.filterPosts(query);
  }

  render() {
    const { classes, loading, posts } = this.props;
    const { input, touched } = this.state;

    // display autocomplete results that:
    //  - start with the current search query
    //  - doesn't contain the whole query
    const autocompleteResults = input ? posts.filter((post) => post.title.toLowerCase().slice(0, -1).startsWith(input.toLowerCase())) : [];
    const showAutocomplete = input.length > 0 && touched;

    return (
      <>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleChange}
            value={input}
            disabled={loading}
            placeholder="Search"
            className={classes.searchInput}
            InputProps={{
              endAdornment: input.length > 0 ? (
                <InputAdornment position="end">
                  <IconButton aria-label="Clear search" onClick={() => this.searchPosts('')}>
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
            {autocompleteResults.slice(0, 5).map((post) => (
              <Typography
                key={post.id}
                variant="body2"
                className={classes.item}
                onClick={() => this.searchPosts(post.title)}
                role="option"
              >
                {post.title}
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
  filterPosts,
};

SearchForm.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchForm));