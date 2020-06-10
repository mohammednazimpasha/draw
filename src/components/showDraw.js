import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Draw from './Draw';

const ShowDraw = (props) => {
  const [canvaDraw, setcanvaDraw] = useState();

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="Modal-content"
        backdropClassName="Modal-bd"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div>
          <Draw
            generate={props.generate}
            display={props.display}
            setDisplay={props.setDisplay}
            handleClose={props.handleClose}
            output={props.output}
            toggleToast={props.toggleToast}
            showToast={props.showToast}
            frameSrc={props.frameSrc}
            toogleFeedBackForm={props.toogleFeedBackForm}
            canvaDraw={canvaDraw}
            setcanvaDraw={setcanvaDraw}
            setFeedBackBtn={props.setFeedBackBtn}
            handleMouseLeave={props.handleMouseLeave}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ShowDraw;
