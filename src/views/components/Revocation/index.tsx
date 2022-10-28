import React, { useState } from 'react';
import './index.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Checkbox, Select, Button } from 'antd';
import { moduleActive } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import IconCopy from "./../../../static/img/copy.png";
import { copyToClipboard } from "./../../../utils/tools";
const { Option } = Select;

export default function CreateTemplate() {

  const [, setActiveTabStr] = useRecoilState(moduleActive);
  const history = useHistory();

  const onChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const fallback = () => {
    if(history.location.pathname === '/template'){
      setActiveTabStr('setLink')
    }else{
      setActiveTabStr('claimList')
    }
  };

  return (
    <div className="revocation-con">
      <div className="revocation-top">
        <div className="revocation-return" onClick={() => fallback()}><ArrowLeftOutlined /></div>
        <div className="revocation-des">
          <div>Set Revocation</div>
          <div>
            Set revocation triggers for claims with the support of dynamic verifications
          </div>
        </div>
      </div>
      <div className="revocation-form">
        <div className="revocation-form-title border-title">Revocation Settings</div>
        <div className="revocation-claims-item">
          <div className="revocation-form-title">Basics</div>
          <div className="revocation-base-item">
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Template name:</span>
                <span>BAYX-Holding-Num-Entry</span>
              </div>
            </div>
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Data Category:</span>
                <span>NFT</span>
              </div>
              <div className="info-common-style">
                <span>NFT Contract:</span>
                <span>0x6d2e83a559c1fbe0cc677d10a22f28f0f8b1f325</span>
                <span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard('1')}
                  className="copyIcon"
                /></span>
              </div>
            </div>
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Creation Date:</span>
                <span>21/10/2022</span>
              </div>
              <div className="info-common-style">
                <span>Expirationg Date:</span>
                <span>31/10/2022</span>
              </div>
            </div>
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Creation Date:</span>
                <span>21/10/2022</span>
              </div>
              <div className="info-common-style">
                <span>Expiration Date:</span>
                <span>31/10/2022</span>
              </div>
            </div>
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Verification Link:</span>
                <span>https://dynamic-verification.knn3.xyz/nft-holding/xxxxxxxx</span>
                <span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard('1')}
                  className="copyIcon"
                /></span>
              </div>
            </div>
          </div>
        </div>
        <div className="revocation-claims-item">
          <div className="revocation-form-title">Claims #1</div>
          <div className="revocation-base-item">
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Class name:</span>
                <span>BAYX-Holding-Num-Entry</span>
              </div>
            </div>
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Class Hash:</span>
                <span>d78......</span>
                <span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard('1')}
                  className="copyIcon"
                /></span>
              </div>
            </div>
            <div className="revocation-base-info">
              <div className="info-common-style">
                <span>Lower Bound:</span>
                <span>{'>1'}</span>
              </div>
              <div className="info-common-style">
                <span>Upper Bound:</span>
                <span>{'<5'}</span>
              </div>
            </div>
            <div className="revocation-trigger">
              <div>
                Revocation Trigger
              </div>
              <div>
                <Select defaultValue="0" style={{ width: '100%' }} onChange={handleChange}>
                  <Option value="0">Never</Option>
                  <Option value="1">The lower bound is unmet</Option>
                  <Option value="2">The upper bound is unmet</Option>
                  <Option value="3">Either bound is unmet</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="button-group">
          <div><Button type="primary" size="large" onClick={() => setActiveTabStr('revocation')}>
            Done
          </Button></div>
        </div>
      </div>
    </div>
  );
}
