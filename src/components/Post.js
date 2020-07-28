import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '../icons/EditIcon';

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    minHeight: 56,
    marginBottom: 8,
  },
};

const Post = (props) => {
  const { title, body, classes, handleEdit } = props;
  return (
    <Card className={classes.card} elevation={1}>
      <CardContent>
        <Typography component="h2" variant="body2" className={classes.title}>{title}</Typography>
        <Typography component="h3" variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="edit post" onClick={handleEdit}>
          <EditIcon />
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