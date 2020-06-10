import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import ShowDraw from './showDraw';
import FeedBackComponent from './FeedBackComponent';
import FeedBackFormComponent from './FeedBackForm';
import Toast from './Toast';
import mergeImages from 'merge-images';

const Index = () => {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState({ display: '', visibility: '' });
  const [FeedBackBtn, setFeedBackBtn] = useState('block');
  const [CanvasImage1, setCanvasImage1] = useState('');
  const [CanvasImage2, setCanvasImage2] = useState('');
  const [WebsitBg, setWebsitBg] = useState('');
  const [merge, setMerge] = useState('');

  const handleClose = () => {
    setShow(false);
    setFeedBackBtn('block');
  };

  const ShowCanvas = () => {
    setShow(true);
    setDisplay({ display: 'flex', visibility: 'visible' });
    toogleFeedBackComp() || setFeedBackBtn('none');
  };

  const [FeedBackForm, setFeedBackForm] = useState(false);
  const toogleFeedBackForm = () => {
    setFeedBackForm(!FeedBackForm);
    toogleFeedBackComp() || setFeedBackComp(false);
    setShow(false);
    if (FeedBackForm === false) setFeedBackBtn('none');
    if (FeedBackForm === true) setFeedBackBtn('block');
  };

  const [FeedBackComp, setFeedBackComp] = useState(false);
  const toogleFeedBackComp = () => {
    setFeedBackComp(!FeedBackComp);
    if (FeedBackComp === true) setFeedBackBtn('block');
    if (FeedBackComp === false) setFeedBackBtn('none');
  };

  const [showToast, setToast] = useState(false);
  const toggleToast = () => setToast(!showToast);

  const generateCanvasImage2 = () => {
    const page = document.querySelector('.page');
    const canvas = html2canvas(page, {
      backgroundColor: null,
      scrollX: page.scrollLeft,
      scrollY: page.scrollTop
    }).then((canvas) => {
      const data = canvas.toDataURL('image/png');
      const ImageUrl = data.replace(/^data:image.+;base64,/, '');
      localStorage.setItem('canvas2', data);
      setCanvasImage2(data);
    });
    return canvas;
  };

  const generateCanvasImage1 = () => {
    const page = document.querySelector('.page');
    const canvas = html2canvas(page, { scrollX: page.scrollLeft, scrollY: page.scrollTop }).then((canvas) => {
      const data = canvas.toDataURL('image/png');
      const ImageUrl = data.replace(/^data:image.+;base64,/, '');
      localStorage.setItem('canvas1', data);
      setCanvasImage1(data);
    });
    return canvas;
  };

  const generateWebsiteBg = () => {
    // const top = window.pageYOffset || document.documentElement.scrollTop;
    // const left = window.pageXOffset || document.documentElement.scrollLeft;
    const page = document.body;
    const canvas = html2canvas(page, {
      width: window.innerWidth,
      height: window.innerHeight,
      allowTaint: true,
      useCORS: true,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      profile: true
    }).then((canvas) => {
      const data = canvas.toDataURL('image/png');
      // const ImageUrl = data.replace(/^data:image.+;base64,/, '');
      localStorage.setItem('websitBg', data);
      setWebsitBg(data);
    });
    return canvas;
  };
  mergeImages([WebsitBg, CanvasImage2]).then((b64) => setMerge(b64));
  localStorage.setItem('merges', merge);

  const handleMouseLeave = (e) => {
    e.preventDefault();
    generateWebsiteBg();
    generateCanvasImage1();
    generateCanvasImage2();
    toogleFeedBackForm();
  };
  return (
    <div>
      <ShowDraw
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={ShowCanvas}
        display={display}
        setDisplay={setDisplay}
        toggleToast={toggleToast}
        showToast={showToast}
        toogleFeedBackForm={toogleFeedBackForm}
        setFeedBackBtn={setFeedBackBtn}
        handleMouseLeave={handleMouseLeave}
      />
      <Toast toggleToast={toggleToast} showToast={showToast} />
      <FeedBackFormComponent
        FeedBackForm={FeedBackForm}
        setFeedBackForm={setFeedBackForm}
        toogleFeedBackForm={toogleFeedBackForm}
        CanvasImage1={CanvasImage1}
        CanvasImage2={CanvasImage2}
        WebsitBg={WebsitBg}
        setCanvasImage1={setCanvasImage1}
        setCanvasImage2={setCanvasImage2}
        setWebsitBg={setWebsitBg}
        toggleToast={toggleToast}
        setFeedBackBtn={setFeedBackBtn}
        generateCanvasImage2={generateCanvasImage2}
        generateCanvasImage1={generateCanvasImage1}
        generateWebsiteBg={generateWebsiteBg}
        merge={merge}
        setMerge={setMerge}
      />
      <FeedBackComponent
        FeedBackComp={FeedBackComp}
        toogleFeedBackComp={toogleFeedBackComp}
        ShowCanvas={ShowCanvas}
        toogleFeedBackForm={toogleFeedBackForm}
      />

      <div className="feed_btn">
        <Button data-html2canvas-ignore variant="primary" onClick={toogleFeedBackComp} style={{ display: FeedBackBtn }}>
          FEEDBACK
        </Button>
      </div>
    </div>
  );
};

export default Index;
