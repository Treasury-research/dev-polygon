import React, { useState } from 'react';
import './index.less';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox, Radio, Input, Select, Button } from 'antd';
import { moduleActive } from '../../../store/atom';
import { useRecoilState } from 'recoil';
const { Option } = Select;
const { TextArea } = Input;

export default function CreateTemplate() {
  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  const [dataCategory, setDataCategory] = useState('0');

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setDataCategory(value)
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="template-con">
      <div className="template-top">
        <div className="template-return" onClick={() => setActiveTabStr('templateList')}><ArrowLeftOutlined /></div>
        <div className="template-des">
          <div>Create Template</div>
          <div>Templates provide an easy way standardize a
            group of class (claims) width different data categories and bounds
          </div>
        </div>
      </div>
      <div className="template-form">
        <div className="template-form-title">Define Tempalate</div>
        <div className="template-form-input-item">
          <div>Tempalate name<span className="require">*</span><span className="input-des">Only alphanumeric characters allowed. No spaces.</span></div>
          <div><Input placeholder="e.g. ENS-holding-number" /></div>
        </div>
        <div className="template-form-input-item">
          <div>Data Category<span className="require">*</span></div>
          <div>
            <Select defaultValue="0" value={dataCategory} style={{ width: '100%' }} onChange={handleChange}>
              <Option value="0">ENS</Option>
              <Option value="1">NFT</Option>
              <Option value="2">Snapshot</Option>
              <Option value="3">Lens Protocol(Rank)</Option>
            </Select></div>
        </div>
        {dataCategory === "1" &&
          (<div className="template-form-input-item">
            <div>NFT Contract</div>
            <div>
              <Input placeholder="Enter Nft contract" />
            </div>
          </div>
          )}
        {dataCategory === "2" &&
          (<div className="template-form-input-item">
            <div>Space ID (Optional for Template)</div>
            <div>
              <Input placeholder="Enter Space ID" />
            </div>
          </div>
          )}
        <div className="template-form-class-item">
          <div className="template-form-class-name">Class #1</div>
          <div>
            <div className="template-form-input-item">
              <div>Class name<span className="require">*</span></div>
              <div><Input placeholder="e.g. Gold" /></div>
            </div>
            <div className="template-form-bound">
              <div>Bounds<span className="require">*</span> (at least one)</div>
              <div className="template-form-bound-select">
                <div><Radio>Lower Bound{'(>)'}</Radio></div>
                <div><Radio>Upper Bound{'(<)'}</Radio></div>
                <div><Checkbox onChange={onChange}>Include lower Bound(≥)</Checkbox></div>
                <div><Checkbox onChange={onChange}>Include upper Bound(≤)</Checkbox></div>
              </div>
            </div>
            <div className="template-form-input-item">
              <div>Classification description (Optional)</div>
              <div>
                <TextArea rows={4} placeholder="Enter a description..." />
              </div>
            </div>
          </div>
        </div>
        <div className="add-class"><span>+</span> Add Class (no intersection)</div>
        <div className="date-check"><Checkbox onChange={onChange}><span className="check-des">Mandatory claim expiration date (Optional)</span></Checkbox></div>
        <div className="date-des">When offering a claim,there will be a requirement to fill the expiration date.</div>
        <div className="date-des">Leaving this unchecked will keep the expiration date as optional.</div>
        <div className="button-group">
          <div onClick={() => setActiveTabStr('templateList')}>
            Save template</div>
          <div><Button type="primary" size="large" onClick={() => setActiveTabStr('offerClaims')}>
            Save & Offer claims
          </Button></div>
        </div>
      </div>
    </div>
  );
}
