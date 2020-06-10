import React, { useState, useRef, useEffect } from 'react';
import { Toast, Button, Form } from 'react-bootstrap';
import Detect from 'detectos.js';
import axios from 'axios';

const FeedBackForm = (props) => {
  const [Name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const ContextRef = useRef(null);

  const [IP, setIP] = useState('');
  useEffect(() => {
    axios.get('https://api.ipify.org?format=json').then((res) => setIP(res));
  }, []);

  let module = {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataos: [
      { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
      { name: 'Windows', value: 'Win', version: 'NT' },
      { name: 'iPhone', value: 'iPhone', version: 'OS' },
      { name: 'iPad', value: 'iPad', version: 'OS' },
      { name: 'Kindle', value: 'Silk', version: 'Silk' },
      { name: 'Android', value: 'Android', version: 'Android' },
      { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
      { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
      { name: 'Macintosh', value: 'Mac', version: 'OS X' },
      { name: 'Linux', value: 'Linux', version: 'rv' },
      { name: 'Palm', value: 'Palm', version: 'PalmOS' }
    ],
    databrowser: [
      { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
      { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
      { name: 'Safari', value: 'Safari', version: 'Version' },
      { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
      { name: 'Opera', value: 'Opera', version: 'Opera' },
      { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
      { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
    ],
    init: function () {
      let agent = this.header.join(' '),
        os = this.matchItem(agent, this.dataos),
        browser = this.matchItem(agent, this.databrowser);

      return { os: os, browser: browser };
    },
    matchItem: function (string, data) {
      let i = 0,
        j = 0,
        html = '',
        regex,
        regexv,
        match,
        matches,
        version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, 'i');
        match = regex.test(string);
        if (match) {
          regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
          matches = string.match(regexv);
          version = '';
          if (matches) {
            if (matches[1]) {
              matches = matches[1];
            }
          }
          if (matches) {
            matches = matches.split(/[._]+/);
            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + '.';
              } else {
                version += matches[j];
              }
            }
          } else {
            version = '0';
          }
          return {
            name: data[i].name,
            version: parseFloat(version)
          };
        }
      }
      return { name: 'unknown', version: 0 };
    }
  };

  let e = module.init(),
    machineDetails = '';

  machineDetails += 'os.name = ' + e.os.name + '\n';
  machineDetails += 'browser.name = ' + e.browser.name + '\n';
  machineDetails += 'browser.version = ' + e.browser.version + '\n';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback || !Name) {
      alert('Fill feedback form');
    } else if (props.CanvasImage1 !== null || props.CanvasImage2 !== null || props.WebsitBg !== null) {
      axios
        .post('http://ec2-3-7-168-72.ap-south-1.compute.amazonaws.com:15010/canvas/store', {
          canvasimage1: props.CanvasImage1 || localStorage.getItem('canvas1') || ' ',
          canvasimage2: props.CanvasImage2 || localStorage.getItem('canvas2') || ' ',
          htmlimage: props.WebsitBg || localStorage.getItem('websitBg') || ' ',
          mimage: props.merge || localStorage.getItem('merges') || '',
          comments:
            'Name: ' +
            Name +
            ' \n \n' +
            feedback +
            '\n' +
            '\n' +
            'Screen Size: ' +
            window.innerHeight +
            'px ' +
            ' x ' +
            window.innerWidth +
            'px' +
            '\n' +
            ' ' +
            '\n IP: ' +
            IP.data.ip +
            ' ' +
            machineDetails
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setFeedback('');
      setName('');
      localStorage.clear();
      props.setWebsitBg('');
      props.setCanvasImage1('');
      props.setCanvasImage2('');
      props.setMerge('');
      props.toggleToast();
      props.setFeedBackForm(false);
      props.setFeedBackBtn('block');
    }
  };
  return (
    <div
      data-html2canvas-ignore
      ref={ContextRef}
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 20050
      }}
    >
      <Toast show={props.FeedBackForm} onClose={props.toogleFeedBackForm} style={{ width: '400px' }}>
        <Toast.Header>
          <strong className="mr-auto" style={{ fontWeight: 'bolder', fontSize: '18px' }}>
            Feedback Form
          </strong>
        </Toast.Header>
        <Toast.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              name="tittle"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              size="lg"
            />
            <Form.Control
              as="textarea"
              type="text"
              name="msg"
              rows="4"
              value={feedback}
              placeholder="FeedBack"
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-3"
              size="lg"
            />

            <Button type="submit" variant="primary" className="mt-3" size="sm" size="lg" block>
              Send
            </Button>
          </Form>{' '}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default FeedBackForm;
