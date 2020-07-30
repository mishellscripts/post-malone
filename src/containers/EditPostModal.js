import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  Modal,
  TextField,
  Button,
  IconButton,
  SvgIcon,
} from '@material-ui/core';

import { closeEditModal } from '../actions/modal';
import { updatePost } from '../actions/posts';
import { ReactComponent as CloseIcon } from '../icons/close-icon.svg';


const styles = (theme) => ({
  modal: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '70%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    height: 50,
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 32,
  },
  input: {
    width: '80%',
    marginBottom: 16,
  },
});

class EditPostModal extends Component {
  state = {
    id: null,
    userId: null,
    error: false,
    dirty: false,
    fields: {
      title: {
        value: '',
        isValid: false,
        touched: false,
        error: 'Title cannot be empty',
      },
      body: {
        value: '',
        isValid: false,
        touched: false,
        error: 'Body cannot be empty',
      },
    },
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id && props.id !== state.id) {
      const newState = { ...state };
      newState.id = props.id;
      newState.fields.title.value = props.title;
      newState.fields.body.value = props.body;
      return newState;
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, userId, fields, dirty } = this.state;
    const { title, body } = fields;

    // validate fields are not empty
    const isValid = Object.values(fields).reduce((acc, field) => {
      return acc && field.value.length > 0;
    }, true);

    if (!isValid) {
      this.setState({ error: true });
      return;
    }

    // skip call to update if form hasn't been changed
    if (dirty) {
      this.props.updatePost({
        id,
        userId,
        title: title.value,
        body: body.value,
      });
    }

    this.setState({ dirty: false });
    this.props.handleClose();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => ({
      dirty: true,
      fields: {
        ...state.fields,
        [name]: {
          ...state.fields[name],
          value,
          touched: true,
          isValid: value.length > 0,
        },
      },
    }));
  }

  render() {
    const { open, handleClose, classes } = this.props;
    const { fields, error, dirty } = this.state;
    const { title, body } = fields;
    const hasFormError = error && !dirty;

    return (
      <Modal
        aria-labelledby="Edit post"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.modal}>
          <div className={classes.header}>
            <IconButton onClick={handleClose} aria-label="Close Modal">
              <SvgIcon viewBox="0 0 24 24">
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          </div>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              value={title.value}
              id="title"
              name="title"
              label="title"
              onChange={this.handleInputChange}
              className={classes.input}
              error={!title.isValid && (hasFormError || title.touched)}
              helperText={!title.isValid && (hasFormError || title.touched) ? title.error : ''}
            />
            <TextField
              value={body.value}
              id="body"
              name="body"
              label="body"
              onChange={this.handleInputChange}
              multiline 
              className={classes.input} 
              error={!body.isValid && (hasFormError || body.touched)}
              helperText={!body.isValid && (hasFormError || body.touched) ? body.error : ''}
            />
            <Button type="submit">Edit</Button>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.modal.open,
  id: state.modal.id,
  userId: state.modal.userId,
  title: state.modal.title,
  body: state.modal.body,
});

const mapDispatchToProps = {
  handleClose: closeEditModal,
  updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPostModal));