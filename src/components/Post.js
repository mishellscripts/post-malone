import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  card: {
    height: '100%',
  },
}

const Post = (props) => {
  const { title, body, classes } = props;
  return (
    <Card className={classes.card} square>
      <CardContent>
        <Typography component="h2" variant="h6">{title}</Typography>
        <Typography component="h3" variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default withStyles(styles)(Post);