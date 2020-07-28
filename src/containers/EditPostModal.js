import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { closeEditModal, updatePost } from '../actions';
import CloseIcon from '../icons/CloseIcon';

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
    title: '',
    body: '',
    id: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.modalData && props.modalData.id !== state.id) {
      return { ...state, ...props.modalData };
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updatePost({
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
    });
    this.props.handleClose();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { open, handleClose, classes } = this.props;
    const { title, body } = this.state;
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <div className={classes.header}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField value={title} label="Title" name="title" onChange={this.handleInputChange} className={classes.input} />
            <TextField value={body} label="Body" name="body" onChange={this.handleInputChange} multiline className={classes.input} />
            <Button type="submit">Edit</Button>
          </form>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.modalData !== null,
  posts: state.posts,
  modalData: state.modalData,
});

const mapDispatchToProps = {
  handleClose: closeEditModal,
  updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPostModal));