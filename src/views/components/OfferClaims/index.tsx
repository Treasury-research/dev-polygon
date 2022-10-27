import React, { useState } from 'react';
import './index.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Checkbox, Input, Button } from 'antd';
import { moduleActive } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import IconCopy from "./../../../static/img/copy.png";
import { copyToClipboard } from "./../../../utils/tools";

export default function CreateTemplate() {
  const [, setActiveTabStr] = useRecoilState(moduleActive);

  const onChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="claim-con">
      <div className="claim-top">
        <div className="claim-return" onClick={() => setActiveTabStr('creatTempalte')}><ArrowLeftOutlined /></div>
        <div className="claim-des">
          <div>Offer claims</div>
          <div>
            Define the attributes and bounds of the template to generate
            a verification link for a group of claims (classes) offering
          </div>
        </div>
      </div>
      <div className="claim-form">
        <div className="claim-form-title">Template for claims</div>
        <div className="claim-base-item">
        <div className="claim-base-info">
          <div className="info-common-style">
            <span>Template name:</span>
            <span>BAYX-Holding-Num-Entry</span>
          </div>
        </div>
        <div className="claim-base-info">
          <div className="info-common-style">
            <span>Data Category:</span>
            <span>NFT</span>
          </div>
          <div className="info-common-style">
            <span>NFT Contract:</span>
            <span>0x6d2e83a559c1fbe0cc677d10a22f28f0f8b1f325</span>
          </div>
        </div>
        </div>
        
        <div className="claim-claims-item">
          <div className="claim-form-title">Claims #1</div>
          <div className="info-common-style">
            <span>Class Name:</span>
            <span>BAYC</span>
          </div>
          <div className="info-common-style">
            <span>Class Hash:</span>
            <span>234234</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard('1')}
              className="copyIcon"
            /></span>
          </div>
          <div className="claim--bound">
            <div>
              <div>Lower Bound:</div>
              <div><Input /></div>
              <div><Checkbox onChange={onChange}>Include lower Bound(≥)</Checkbox></div>
            </div>
            <div>
              <div>Upper Bound:</div>
              <div><Input /></div>
              <div><Checkbox onChange={onChange}>Include Upper Bound(≤)</Checkbox></div>
            </div>
          </div>
        </div>
        <div className="claim-claims-item">
          <div className="claim-form-title">Claims #1</div>
          <div className="info-common-style">
            <span>Class Name:</span>
            <span>BAYC</span>
          </div>
          <div className="info-common-style">
            <span>Class Hash:</span>
            <span>234234</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard('1')}
              className="copyIcon"
            /></span>
          </div>
          <div className="claim--bound">
            <div>
              <div>Lower Bound:</div>
              <div><Input /></div>
              <div><Checkbox onChange={onChange}>Include lower Bound(≥)</Checkbox></div>
            </div>
          </div>
        </div>
        <div className="button-group">
          <div><Button type="primary" size="large" onClick={() => setActiveTabStr('setLink')}>
            Generate Verification Link
          </Button></div>
        </div>
      </div>
    </div>
  );
}
