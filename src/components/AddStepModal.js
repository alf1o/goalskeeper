import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

function AddStepModal({ open, onClose }) {
  return (
    <Modal>

    </Modal>
  );
}

AddStepModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export { AddStepModal as UnwrappedAddStepModal };
export default AddStepModal;
