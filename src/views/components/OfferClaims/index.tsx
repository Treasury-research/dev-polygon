import React, { useState, useEffect } from 'react';
import './index.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Checkbox, Input, Button, DatePicker } from 'antd';
import { moduleActive, templateInfos } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import IconCopy from "./../../../static/img/copy.png";
import { copyToClipboard } from "./../../../utils/tools";
import { dataCategoryList } from '../../../config';
import moment from 'moment';

const defaultClassficationItem = {
  name: '',
  lowerBoundType: [0, 0, null],
  upperBoundType: [0, 0, null],
  description: '',
}

const dateFormat = 'YYYY/MM/DD';

export default function CreateTemplate() {
  const [, setActiveTabStr] = useRecoilState(moduleActive);

  const [templateInfo, setTemplateInfo] = useRecoilState<any>(templateInfos);

  const [classfications, setClassfications] = useState<any>([defaultClassficationItem])

  const [expirationDate, setExpirationDate] = useState("2022/10/31")

  const onChange = (index: number, field: string, subIndex: number, value: string) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      setClassfications((prev: any) => {
        prev[index][field][subIndex] = value;
        return [...prev]
      })
    }
  }

  useEffect(() => {
    let classItems: any = JSON.parse(templateInfo.classfications);
    classItems.map((t: any) => {
      t.lowerBoundType[2] = t.lowerBoundType[2] == undefined ? null : t.lowerBoundType[2];
      t.upperBoundType[2] = t.upperBoundType[2] == undefined ? null : t.upperBoundType[2];
    })
    setClassfications(classItems);
  }, []);

  const toLink = (() => {
    setTemplateInfo((prev: any) => {
      return {
        ...prev,
        classfications: JSON.stringify(classfications),
        expirationDate,
      }
    })
    setActiveTabStr('setLink');
  })

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
              <span>{templateInfo.name}</span>
            </div>
          </div>
          <div className="claim-base-info">
            <div className="info-common-style">
              <span>Data Category:</span>
              <span>{dataCategoryList[Number(templateInfo.dataCategory)]}</span>
            </div>
            {
              templateInfo.dataCategory === '1' && (
                <div className="info-common-style">
                  <span>NFT Contract:</span>
                  <span>{templateInfo.subCategory}</span>
                  <span><img
                    alt=""
                    src={IconCopy}
                    onClick={() => copyToClipboard(templateInfo.subCategory)}
                    className="copyIcon"
                  /></span>
                </div>
              )
            }
            {
              templateInfo.dataCategory === '2' && (
                <div className="info-common-style">
                  <span>Space ID:</span>
                  <span>{templateInfo.subCategory}</span>
                </div>
              )
            }
          </div>
        </div>
        {classfications.map((item: any, index: number) =>
          <div className="claim-claims-item" key={index}>
            <div className="claim-form-title">Claims #{index + 1}</div>
            <div className="info-common-style">
              <span>Class Name:</span>
              <span>{item.name}</span>
            </div>
            <div className="info-common-style">
              <span>Class Hash:</span>
              <span>hash</span>
              <span><img
                alt=""
                src={IconCopy}
                onClick={() => copyToClipboard('1')}
                className="copyIcon"
              /></span>
            </div>
            <div className="claim--bound">
              {
                item.lowerBoundType[0] === 1 &&
                <div>
                  <div>Lower Bound:</div>
                  <div><Input value={item.lowerBoundType[2]} onChange={e => onChange(index, 'lowerBoundType', 2, e.target.value)} /></div>
                  <div><Checkbox checked={item.lowerBoundType[1] === 1} disabled>Include lower Bound(≥)</Checkbox></div>
                </div>
              }
              {
                item.upperBoundType[0] === 1 &&
                <div>
                  <div>Upper Bound:</div>
                  <div><Input value={item.upperBoundType[2]} onChange={e => onChange(index, 'upperBoundType', 2, e.target.value)} /></div>
                  <div><Checkbox checked={item.upperBoundType[1] === 1} disabled>Include Upper Bound(≤)</Checkbox></div>
                </div>
              }
            </div>
          </div>
        )}
        {
          templateInfo.isExpirable &&
          <div>
            <div className="claim-form-title">Claims expiration date</div>
            <div><DatePicker format={dateFormat} value={moment(expirationDate, dateFormat)} onChange={(date: any, dateString: string) => setExpirationDate(dateString)} /></div>
          </div>
        }
        <div className="button-group">
          <div><Button type="primary" size="large" onClick={() => toLink()}>
            Generate Verification Link
          </Button></div>
        </div>
      </div>
    </div>
  );
}
