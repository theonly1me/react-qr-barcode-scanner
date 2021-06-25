import React, { useState } from 'react';
import QRScanner from 'react-qr-reader';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner2';
import Modal from './Modal';

import classes from './qr-reader.module.css';

const QRReader = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [qrScan, setQrScan] = useState(false);
  const [barScan, setBarScan] = useState(false);

  const handleQRScan = data => {
    if (!data) return;
    setData(data);
  };

  const handleBarcodeScan = (err, data) => {
    if (!data) return;
    setData(data.text);
  };

  const handleError = error => console.error(error);

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
                style={{ width: '90%' }}
              />
            )}
            {barScan && (
              <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={handleBarcodeScan}
              />
            )}
            <div className={classes.result}>{data}</div>
          </React.Fragment>
        </Modal>
      )}
    </div>
  );
};

export default QRReader;
