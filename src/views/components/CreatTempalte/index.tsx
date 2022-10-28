import React, { useEffect, useState } from 'react';
import './index.scss';
import {dataCategoryList} from '../../../config'
import api from '../../../api';
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox, Radio, Input, Select, Button, message } from 'antd';
import { moduleActive } from '../../../store/atom';
import { useRecoilState } from 'recoil';
const { Option } = Select;
const { TextArea } = Input;

const defaultClassficationItem = {
  name: '',
  lowerBoundType: [0,0],
  upperBoundType: [0,0],
  description: '',
}

export default function CreateTemplate() {
  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  const [templateName, setTemplateName] = useState("");

  const [clasifications, setClassifications] = useState<any>([defaultClassficationItem])

  const [dataCategory, setDataCategory] = useState('0');

  const [subCategory, setSubCategory] = useState('');
  const [isExpirable, setIsExpirable] = useState(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setDataCategory(value)
  };

  const onClassificationChange = (index: number, field: string, value: string) => {
    setClassifications((prev:any) => {
      let obj  = JSON.parse(JSON.stringify(prev));
      console.log('obj is', obj)
      obj[index][field] = value;
      return [...obj]
    })
  }

  const onBoundChange = (index: number, field: string, subIndex: number, value: number) => {
    console.log('bond change', index, field, subIndex, value)
    setClassifications((prev:any) => {
      let obj  = JSON.parse(JSON.stringify(prev));
      obj[index][field][subIndex] = value;
      return [...obj]
    })
  }

  const doCreate = async () => {
    const res:any = await api.template.create({
      name: templateName,
      dataCategory,
      subCategory,
      classfications: JSON.stringify(clasifications),
    })
    if(res.code === 200){
      message.success('Created template')
      setActiveTabStr('templateList');
    }
  };

  const doCreateAndOffer = async () => {
    await doCreate();
    setActiveTabStr('offerClaims');
  };

  const addTemplate = async () => {
    setClassifications((prev: any )=> [
      ...prev,
      defaultClassficationItem
    ])
  }

  const removeTemplate = async (index: number) => {
    setClassifications((prev:any)=>{
      prev.splice(index, 1);
      return [...prev]
    })
  }

  useEffect(()=>{
    setSubCategory('')
  }, [dataCategory])

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
          <div><Input placeholder="e.g. ENS-holding-number" value={templateName} onChange={e => setTemplateName(e.target.value)} /></div>
        </div>
        <div className="template-form-input-item">
          <div>Data Category<span className="require">*</span></div>
          <div>
            <Select value={dataCategory} style={{ width: '100%' }} onChange={handleChange}>
              {dataCategoryList.map((item: string, index: number) => <Option key={index} value={index.toString()}>{dataCategoryList[index]}</Option>)}
            </Select></div>
        </div>
        {dataCategory === "1" &&
          (<div className="template-form-input-item">
            <div>NFT Contract</div>
            <div>
              <Input placeholder="Enter Nft contract" value={subCategory} onChange={e => setSubCategory(e.target.value)} />
            </div>
          </div>
          )}
        {dataCategory === "2" &&
          (<div className="template-form-input-item">
            <div>Space ID (Optional for Template)</div>
            <div>
              <Input placeholder="Enter Space ID" onChange={e => setSubCategory(e.target.value)} />
            </div>
          </div>
          )}

        {clasifications.map((item:any, index: number) => <div key={index} className="template-form-class-item">
          <div className='template-class-header'>
            <div className="template-form-class-name">Class #{index + 1}</div>
            <a className='icon-minus' onClick={()=> removeTemplate(index)}>-</a>
          </div>
          <div>
            <div className="template-form-input-item">
              <div>Class name<span className="require">*</span></div>
              <div><Input placeholder="e.g. Gold" value={item.name} onChange={(e) => onClassificationChange(index, 'name', e.target.value) } /></div>
            </div>
            <div className="template-form-bound">
              <div>Bounds<span className="require">*</span> (at least one)</div>
              <div className="template-form-bound-select">
                <div><Radio value={item.lowerBoundType[0] === 1} onChange={e=>onBoundChange(index, 'lowerBoundType', 0, e.target.checked ? 1 : 0)}>Lower Bound{'(>)'}</Radio></div>
                <div><Radio value={item.upperBoundType[1] === 1} onChange={e=> onBoundChange(index, 'upperBoundType', 0, e.target.checked ? 1: 0)}>Upper Bound{'(<)'}</Radio></div>
                <div><Checkbox value={item.lowerBoundType[1] === 1} onChange={e=>onBoundChange(index, 'lowerBoundType', 1, e.target.checked ? 1: 0)}>Include lower Bound(≥)</Checkbox></div>
                <div><Checkbox value={item.upperBoundType[1] === 1} onChange={e=> onBoundChange(index, 'upperBoundType', 1, e.target.checked ? 1: 0)}>Include upper Bound(≤)</Checkbox></div>
              </div>
            </div>
            <div className="template-form-input-item">
              <div>Classification description (Optional)</div>
              <div>
                <TextArea rows={4} placeholder="Enter a description..."  onChange={(e) => onClassificationChange(index, 'description', e.target.value) } />
              </div>
            </div>
          </div>
        </div>)}
       
        <div className="add-class" onClick={addTemplate}><span>+</span> Add Class (no intersection)</div>
        <div className="date-check"><Checkbox value={isExpirable} onChange={e => setIsExpirable(e.target.value)}><span className="check-des">Mandatory claim expiration date (Optional)</span></Checkbox></div>
        <div className="date-des">When offering a claim,there will be a requirement to fill the expiration date.</div>
        <div className="date-des">Leaving this unchecked will keep the expiration date as optional.</div>
        <div className="button-group">
          <div onClick={doCreate}>
            Save template</div>
          <div><Button type="primary" size="large" onClick={doCreateAndOffer}>
            Save & Offer claims
          </Button></div>
        </div>
      </div>
    </div>
  );
}
