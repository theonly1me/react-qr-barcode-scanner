import React, { useState } from 'react';
import QRScanner from 'react-qr-reader';
import BarcodeScanner from 'react-qr-barcode-scanner';
import Modal from './Modal';
import useSound from 'use-sound';

import classes from './qr-reader.module.css';

const QRReader = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [qrScan, setQrScan] = useState(false);
  const [barScan, setBarScan] = useState(false);

  const [playAlert] = useSound(`${process.env.PUBLIC_URL}/assets/alert.wav`, {
    volume: 0.25,
  });

  const handleQRScan = data => {
    if (!data) return;
    setData(data);
    playAlert();
  };

  const handleBarcodeScan = (err, data) => {
    if (err) console.error(err);
    if (!data) return;
    setData(data.text);
    playAlert();
  };

  const handleError = err => console.error(err);

  return (
    <div className={classes.container}>
      <button
        className={classes.btn}
        onClick={e => {
          e.preventDefault();
          setShowModal(true);
          setQrScan(true);
          setBarScan(false);
          setData(null);
        }}
      >
        Scan QR Code
      </button>

      <button
        className={classes.btn}
        onClick={e => {
          e.preventDefault();
          setShowModal(true);
          setBarScan(true);
          setQrScan(false);
          setData(null);
        }}
      >
        Scan Barcode
      </button>
      {showModal && (
        <Modal>
          <React.Fragment>
            <button
              className={classes.closeModal}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            {qrScan && (
              <QRScanner
                delay={100}
                onError={handleError}
                onScan={handleQRScan}
              />
            )}
            {barScan && (
              <BarcodeScanner
                style={{ width: '90%' }}
                onUpdate={handleBarcodeScan}
              />
            )}
            {data && <div className={classes.result}>{data}</div>}
          </React.Fragment>
        </Modal>
      )}
    </div>
  );
};

export default QRReader;
