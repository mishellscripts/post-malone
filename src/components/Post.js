import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  SvgIcon,
} from '@material-ui/core';

import { ReactComponent as EditIcon } from '../icons/edit-icon.svg';


const styles = (theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    minHeight: 56,
    marginBottom: theme.spacing(1),
  },
});

const Post = (props) => {
  const { title, body, classes, handleEdit } = props;
  return (
    <Card className={classes.card} elevation={1}>
      <CardContent>
        <Typography component="h2" variant="body2" className={classes.title}>
          {title}
        </Typography>
        <Typography component="h3" variant="body2">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Edit Post" onClick={handleEdit}>
          <SvgIcon viewBox="0 0 24 24">
            <EditIcon />
          </SvgIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default withStyles(styles)(Post);