import React, { useState, useEffect } from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router-dom';
import api from '../../api';

export default function QrCode(props: RouteComponentProps) {

  const [jsonData, setJsonData] = useState('');

  const getQrCode = async () => {
    const res: any = await api.offer.getQrCode(props?.match?.params);
    setJsonData(JSON.stringify(res.result))
  };

  useEffect(() => {
    getQrCode();
  }, []);

  return (
    <div>
      {jsonData}
    </div>
  );
}
