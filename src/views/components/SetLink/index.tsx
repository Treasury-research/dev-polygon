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
    <div className="link-con">
      <div className="link-top">
        <div className="link-return" onClick={() => setActiveTabStr('offerClaims')}><ArrowLeftOutlined /></div>
        <div className="link-des">
          <div>Offer claims</div>
          <div>
            Define the attributes and bounds of the template to generate
            a verification link for a group of claims (classes) offering
          </div>
        </div>
      </div>
      <div className="link-form">
        <div className="link-form-title border-title">Claims Offering</div>
        <div className="link-claims-item">
          <div className="link-form-title">Claims #1</div>
          <div className="link-base-item">
            <div className="link-base-info">
              <div className="info-common-style">
                <span>Template name:</span>
                <span>BAYX-Holding-Num-Entry</span>
              </div>
            </div>
            <div className="link-base-info">
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
            <div className="link-base-info">
              <div className="info-common-style">
                <span>Lower Bound:</span>
                <span>{'>1'}</span>
              </div>
              <div className="info-common-style">
                <span>Upper Bound:</span>
                <span>{'<5'}</span>
              </div>
            </div>
            <div className="link-base-info">
              <div className="info-common-style">
                <span>Creation Date:</span>
                <span>21/10/2022</span>
              </div>
              <div className="info-common-style">
                <span>Expiration Date:</span>
                <span>31/10/2022</span>
              </div>
            </div>
          </div>
        </div>
        <div className="link-claims-item">
          <div className="link-form-title">Claims #1</div>
          <div className="link-base-item">
            <div className="link-base-info">
              <div className="info-common-style">
                <span>Template name:</span>
                <span>BAYX-Holding-Num-Entry</span>
              </div>
            </div>
            <div className="link-base-info">
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
            <div className="link-base-info">
              <div className="info-common-style">
                <span>Lower Bound:</span>
                <span>{'>1'}</span>
              </div>
              <div className="info-common-style">
                <span>Upper Bound:</span>
                <span>{'<5'}</span>
              </div>
            </div>
            <div className="link-base-info">
              <div className="info-common-style">
                <span>Creation Date:</span>
                <span>21/10/2022</span>
              </div>
              <div className="info-common-style">
                <span>Expiration Date:</span>
                <span>31/10/2022</span>
              </div>
            </div>
          </div>
        </div>
        <div className="link-url">
          <div>Verification Link</div>
          <div>https://...<span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard('1')}
                  className="copyIcon"
                /></span></div>
        </div>
        <div className="button-group">
          <div><Button type="primary" size="large" onClick={() => setActiveTabStr('revocation')}>
            Set Revocation
          </Button></div>
        </div>
      </div>
    </div>
  );
}
