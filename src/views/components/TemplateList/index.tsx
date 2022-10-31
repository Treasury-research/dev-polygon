import React, { useState, useEffect } from 'react';
import './index.scss';
import api from '../../../api';
import { message } from 'antd';
import { Button } from 'antd';
import { dataCategoryList } from '../../../config'
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Table, Drawer } from 'antd';
import { moduleActive, templateInfos } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import IconCopy from "./../../../static/img/copy.png";
import { copyToClipboard } from "./../../../utils/tools";

const DataType = {
  name: '',
  templateName: '',
  dataCategory: '',
  subCategory: '',
  lowerBoundType: [0,0],
  upperBoundType: [0,0],
  createdAt: '',
  description: ''
}
// dataCategory subCategory  lowerBoundType upperBoundType createdAt description


export default function List() {
  const [activeTabVal, setActiveTabVal] = useState(0);

  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  const [templateList, setTemplateList] = useState([]);

  const [open, setOpen] = useState(false);

  const [templateInfo, setTemplateInfo] = useRecoilState<any>(templateInfos);

  const [drawerRecords, setDrawerRecords] = useState(DataType);

  const getTemplateList = async () => {
    const res: any = await api.template.list();
    setTemplateList(res?.result?.data);
  };

  useEffect(() => {
    getTemplateList();
  }, []);

  const showDrawer = (record: any) => {
    setOpen(true);
    setDrawerRecords(record);
  };

  const onClose = () => {
    setOpen(false);
  };

  const offer = (record: any) => {
    setTemplateInfo(record);
    setActiveTabStr('offerClaims');
  }

  const expandedRowRender = (record: any, index: number) => {
    const columns = [
      { title: 'Class Name', dataIndex: 'name', key: 'name', render: (text: string, record: any) => <span className="templateName" onClick={() => showDrawer(record)}>{text}</span> },
      { title: 'Lower Bound', dataIndex: 'lowerBoundType', key: 'lowerBoundType', render: (text: any) => text && text.length > 0 ? <span>{text[0] === 1 && ">"}{text[1] === 1 && '='}</span> : '--' },
      { title: 'Upper Bound', dataIndex: 'upperBoundType', key: 'upperBoundType', render: (text: any) => text && text.length > 0 ? <span>{text[0] === 1 && "<"}{text[1] === 1 && '='}</span> : '--' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
    ];

    let renderData: Array<any> = [];

    if (record.classfications) {
      let expandData = JSON.parse(record.classfications);
      expandData.map((t: any) => {
        t.createdAt = record.createdAt;
        t.dataCategory = record.dataCategory;
        t.subCategory = record.subCategory;
        t.templateName = record.name;
      })
      renderData = [...expandData];
    } else {
      renderData = []
    }

    if (!Array.isArray(renderData)) {
      renderData = []
    }

    return <Table columns={columns} dataSource={renderData} pagination={false} />;
  };

  const columns = [
    {
      title: 'Template Names', dataIndex: 'name', key: 'name', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Category', dataIndex: 'dataCategory', key: 'dataCategory', render: (category: string) => (
        <div className="tag" style={{
          backgroundColor: category === '0' ? '#fff' : category === '1' ? 'rgb(32,128,226)' : category === '3' ? 'green' : '#fff',
          color: category === '1' || category === '3' ? '#fff' : category === '2' ? 'rgb(247,186,71)' : 'blue'
        }}>
          {dataCategoryList[Number(category)]}
        </div>
      ),
    },
    { title: 'Create Time', dataIndex: 'createdAt', key: 'createdAt', render: (text: string) => <span>{text.split('T')[0]}</span> },
    { title: 'Action', key: 'operation', render: (text: string, record: any) => <span className="offer" onClick={() => offer(record)}>Offer</span> },
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
            <span>Template name:</span>
            <span>{drawerRecords.templateName}</span>
          </div>
          <div>
            <span>Class name:</span>
            <span>{drawerRecords.name}</span>
          </div>
          <div>
            <span>Data Category:</span>
            <span>{dataCategoryList[Number(drawerRecords.dataCategory)]}</span>
          </div>
          {
            drawerRecords.dataCategory === '1' && (
              <div>
                <span>NFT Contract:</span>
                <span>{drawerRecords.subCategory}</span>
                <span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard(drawerRecords.subCategory)}
                  className="copyIcon"
                /></span>
              </div>
            )
          }
          {
            drawerRecords.dataCategory === '2' && (
              <div>
                <span>Space ID:</span>
                <span>{drawerRecords.subCategory}</span>
                <span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard(drawerRecords.subCategory)}
                  className="copyIcon"
                /></span>
              </div>
            )
          }
          <div>
            <span>Lower Bound:</span>
            <span>{drawerRecords.lowerBoundType[0] === 0 ? '--' : drawerRecords.lowerBoundType[1] === 1 ? '≥' : '>'}</span>
          </div>
          <div>
            <span>Upper Bound:</span>
            <span>{drawerRecords.upperBoundType[0] === 0 ? '--' : drawerRecords.upperBoundType[1] === 1 ? '≤' : '<'}</span>
          </div>
          <div>
            <span>Creation Date:</span>
            <span>{drawerRecords.createdAt.split('T')[0]}</span>
          </div>
          <div>
            <span>Class Hash:</span>
            <span>...</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard('...')}
              className="copyIcon"
            /></span>
          </div>
          <div>
            <span>Description:</span>
            <span>{drawerRecords.description}</span>
            <span><img
              alt=""
              src={IconCopy}
              onClick={() => copyToClipboard(drawerRecords.description)}
              className="copyIcon"
            /></span>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
