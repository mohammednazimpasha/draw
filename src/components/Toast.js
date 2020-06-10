import React from 'react';
import { Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const SetToast = ({ toggleToast, showToast }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        background: '#014b22',
        zIndex: 20050
      }}
    >
      <Toast show={showToast} onClose={toggleToast}>
        <Toast.Header>
          <FontAwesomeIcon icon={faCheck} className="rounded mr-2" />
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Your FeedBack has been sent</Toast.Body>
      </Toast>
    </div>
  );
};

export default SetToast;
