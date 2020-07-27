import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Posts from '../containers/Posts';
import SearchForm from '../containers/SearchForm';
import EditPostModal from '../containers/EditPostModal';


const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
});

const App = ({ classes }) => {
  return (
    <div className={classes.root}>
      <SearchForm />
      <Posts />
      <EditPostModal />
    </div>
  );
}

export default withStyles(styles)(App);
