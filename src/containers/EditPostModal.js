import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    maxWidth: 800,
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 50,
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  input: {
    width: '80%',
    marginBottom: theme.spacing(1),
  },
});

const defaultState = {
  id: null,
  userId: null,
  error: false,
  dirty: false,
  fields: {
    title: {
      id: 'Title',
      value: '',
      isValid: false,
      touched: false,
      error: 'Title cannot be empty',
      rule: /\S+/,
    },
    body: {
      id: 'Body',
      value: '',
      isValid: false,
      touched: false,
      error: 'Body cannot be empty',
      rule: /\S+/,
    },
  },
};

class EditPostModal extends Component {
  state = defaultState;

  static getDerivedStateFromProps(props, state) {
    // when new post passed in through props, reset form errors & set values
    if (props.id && props.id !== state.id) {
      const newState = { ... defaultState };
      newState.id = props.id;
      newState.userId = props.userId;
      newState.fields = {
        title: {
          ...defaultState.fields.title,
          value: props.title,
          isValid: state.fields.title.rule.test(props.title),
        },
        body: {
          ...defaultState.fields.body,
          value: props.body,
          isValid: state.fields.body.rule.test(props.body),
        },
      };
      return newState;
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, userId, fields, dirty } = this.state;
    const { title, body } = fields;

    // validate that fields are not empty
    const isValid = Object.values(fields).reduce((acc, field) => {
      return acc && field.isValid;
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
        title: title.value.trim(),
        body: body.value.trim(),
      });
    }

    this.setState({ dirty: false });
    this.props.handleClose();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => {
      const field = state.fields[name];
      return {
        dirty: true,
        fields: {
          ...state.fields,
          [name]: {
            ...field,
            value,
            touched: true,
            isValid: field.rule.test(value),
          },
        },
      }
    });
  }

  renderInput = (name, fieldData) => {
    const { classes } = this.props;
    const { error, dirty } = this.state;
    const hasFormError = error && !dirty;

    return (
      <TextField
        key={fieldData.id}
        value={fieldData.value}
        id={fieldData.id}
        name={name}
        label={fieldData.id}
        onChange={this.handleInputChange}
        className={classes.input}
        error={!fieldData.isValid && (hasFormError || fieldData.touched)}
        helperText={!fieldData.isValid && (hasFormError || fieldData.touched) ? fieldData.error : ''}
        multiline
      />
    )
  }

  render() {
    const { classes, open, handleClose } = this.props;
    const { fields } = this.state;

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
            {Object.entries(fields).map(([name, fieldData]) => (
              this.renderInput(name, fieldData)
            ))}
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

EditPostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPostModal));