import React from 'react';
import { Toast, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

const FeedBackComponent = ({ FeedBackComp, toogleFeedBackComp, ShowCanvas, toogleFeedBackForm }) => {
  return (
    <div
      data-html2canvas-ignore
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        background: '#014b22',
        zIndex: 20050
      }}
    >
      <Toast show={FeedBackComp} onClose={toogleFeedBackComp}>
        <Toast.Header>
          <strong className="mr-auto" style={{ fontWeight: 'bolder', fontSize: '18px' }}>
            Feedback
          </strong>
        </Toast.Header>
        <Toast.Body>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Have you found a bug or do you have any comments/suggestions about this site?
          </p>
          <Button variant="light" size="lg" block style={{ display: 'flex' }} onClick={ShowCanvas}>
            <FontAwesomeIcon
              icon={faCamera}
              style={{ fontSize: '50px', marginTop: '10px', marginBottom: '10px', paddingRight: '10px' }}
            />
            Select and comment <br /> part of this page
          </Button>
          <Button variant="light" id="tet" size="lg" block style={{ display: 'flex' }} onClick={toogleFeedBackForm}>
            <FontAwesomeIcon
              icon={faCommentAlt}
              style={{ fontSize: '50px', marginTop: '10px', marginBottom: '10px', paddingRight: '10px' }}
            />
            General feedback <br /> about this page
          </Button>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default FeedBackComponent;
