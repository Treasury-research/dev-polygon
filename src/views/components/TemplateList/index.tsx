import React, { useState, useEffect } from 'react';
import './index.scss';
import api from '../../../api';
import { message } from 'antd';
import { Button } from 'antd';
import { dataCategoryList } from '../../../config'
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Table, Drawer } from 'antd';
import { moduleActive } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import IconCopy from "./../../../static/img/copy.png";
import { copyToClipboard } from "./../../../utils/tools";

interface DataType {
  key: React.Key;
  templateName: string;
  category: string;
  offerData: string;
}

const expandedRowRender = (record:any, index: number) => {
  const columns = [
    { title: 'Class Name', dataIndex: 'name', key: 'name' },
    { title: 'Lower Bound', dataIndex: 'lowerBoundType', key: 'lowerBoundType', render: (text:any) => text && text.length > 0 ? <span>{text[0] === 1 && ">"}{text[1] === 1 && '='}</span> : '' },
    { title: 'Upper Bound', dataIndex: 'upperBoundType', key: 'upperBoundType', render: (text:any) => text && text.length > 0 ? <span>{text[0] === 1 && "<"}{text[1] === 1 && '='}</span> : '' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  let renderData = record.classfications ? JSON.parse(record.classfications) : [];

  if(!Array.isArray(renderData) ){
    renderData  = []
  }

  return <Table columns={columns} dataSource={renderData} pagination={false} />;
};

export default function List() {
  const [activeTabVal, setActiveTabVal] = useState(0);

  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  const [templateList, setTemplateList] = useState([]);

  const [open, setOpen] = useState(false);

  const getTemplateList = async () => {
    const res:any = await api.template.list();
    setTemplateList(res?.result?.data);
  };

  useEffect(() => {
    getTemplateList();
  }, []);

  const showDrawer = (record: any) => {
    console.log('rrecord', record)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'Template Names', dataIndex: 'name', key: 'name', render: (text: string, record: any) => (
        <span className="templateName" onClick={() => showDrawer(record)}>{text}</span>
      ),
    },
    {
      title: 'Category', dataIndex: 'dataCategory', key: 'dataCategory', render: (category:string) => (
        <div className="tag" style={{
          backgroundColor: category === '0' ? '#fff' : category === '1' ? 'rgb(32,128,226)' : category === '3' ? 'green' : '#fff',
          color: category === '1' || category === '3' ? '#fff' : 'blue'
        }}>
          {dataCategoryList[Number(category)]}
        </div>
      ),
    },
    { title: 'Create Time', dataIndex: 'createdAt', key: 'createdAt', render: (text: string) => <span>{text.split('T')[0]}</span> },
    { title: 'Action', key: 'operation', render: () => <span className="offer" onClick={() => setActiveTabStr('offerClaims')}>Offer</span> },
  ];

  return (
    <div className="list-page">
      <div className="list-des">
        <div className="list-title">Templates</div>
        <div>
          {templateList.length} Templates
        </div>
      </div>
      <div className="list-btn">
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setActiveTabStr('creatTempalte')}>
          Create Template
        </Button>
      </div>
      {/* <div className="list-tabs">
        {tabs.map((item, index) => (
          <div key={item.value} className={(index === activeTabVal ? 'active' : '')} onClick={() => setActiveTabVal(index)}>
            <span>
              {item.name}
            </span>
          </div>
        ))}
      </div> */}
      <div className="list-table">
        <Table
          rowKey="id"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={templateList}
          pagination={false}
        />
      </div>
      <Drawer
        title="View Class"
        placement={'right'}
        width={400}
        onClose={onClose}
        visible={open}
      >
        <div className="drawer-des">
          <div>
            <span>Class name:</span>
            <span>BAYC</span>
          </div>
          <div>
            <span>Data Category:</span>
            <span>NFT</span>
          </div>
          <div>
            <span>NFT Contract:</span>
            <span>0xBx</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard('1')}
              className="copyIcon"
            /></span>
          </div>
          <div>
            <span>Lower Bound:</span>
            <span>-(Default `{'>'}` 0)</span>
          </div>
          <div>
            <span>Upper Bound:</span>
            <span>Exclusive (`{'>'}`)</span>
          </div>
          <div>
            <span>Creation Date:</span>
            <span>21/10/2022</span>
          </div>
          <div>
            <span>Class Hash:</span>
            <span>d78...</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard('1')}
              className="copyIcon"
            /></span>
          </div>
          <div>
            <span>Class URL:</span>
            <span>https://s.3.eu-wesr-1....</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard('1')}
              className="copyIcon"
            /></span>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
