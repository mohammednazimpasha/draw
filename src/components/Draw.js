import React, { useState, useRef, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faReply, faCheck, faTrash, faPalette } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from './color';

const Draw = (props) => {
  let ContextRef = useRef(null);

  const [showColor, setColorShow] = useState(false);
  const [targetColor, setTargetColor] = useState(null);

  const handleClickColor = (event) => {
    setColorShow(!showColor);
    setTargetColor(event.target);
  };

  const handleHide = () => {
    setColorShow(false);
    props.setFeedBackBtn('none');
  };

  const [color, setColor] = useState('#fff');

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const handleClear = () => {
    return props.canvaDraw.clear();
  };

  const handleUndo = () => {
    return props.canvaDraw.undo();
  };

  const brushRadiusNo = 5;
  return (
    <div>
      <div
        data-html2canvas-ignore
        className="kontrol"
        style={{ display: props.display.display, visibility: props.display.visibility }}
      >
        <div className="icons">
          <FontAwesomeIcon icon={faTimes} onClick={props.handleClose} />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faReply} onClick={handleUndo} />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faTrash} onClick={handleClear} />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faPalette} onClick={handleClickColor ? handleClickColor : handleHide} />
        </div>
        <div className="icons" id="ok">
          <FontAwesomeIcon icon={faCheck} onClick={props.handleMouseLeave} />
        </div>
      </div>
      <div
        className="page"
        onMouseUp={() => props.setDisplay({ display: 'flex', visibility: 'visible' })}
        onMouseDown={() => props.setDisplay({ display: 'none' })}
        onClick={handleHide}
        style={{ zIndex: '8090' }}
      >
        <CanvasDraw
          hideInterface
          hideGrid
          ref={(canavas) => props.setcanvaDraw(canavas)}
          brushColor={color}
          onChange={handleHide}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight}
          brushRadius={brushRadiusNo}
          style={{
            background: 'transparent',
            alignItems: 'center'
          }}
        />
      </div>

      <ColorPicker show={showColor} target={targetColor} color={color} handleChangeComplete={handleChangeComplete} />
    </div>
  );
};

export default Draw;
