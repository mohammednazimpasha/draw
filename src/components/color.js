import React, { useRef } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

const ColorPicker = ({ show, target, color, handleChangeComplete }) => {
  const ref = useRef(null);

  return (
    <div data-html2canvas-ignore ref={ref}>
      <Overlay enfo show={show} target={target} placement="bottom" container={ref.current} containerPadding={20}>
        <Popover id="popover-contained">
          <Popover.Title as="h3">Choose Color</Popover.Title>
          <Popover.Content>
            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};

export default ColorPicker;
