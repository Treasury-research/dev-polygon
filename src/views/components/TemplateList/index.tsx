import React, { useState } from 'react';
import './index.less';
import { Button } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Table, Drawer } from 'antd';
import { moduleActive } from '../../../store/atom';
import { useRecoilState } from 'recoil';

interface DataType {
  key: React.Key;
  templateName: string;
  category: string;
  offerData: string;
}

export default function List() {
  const [activeTabVal, setActiveTabVal] = useState(0);

  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const expandedRowRender = () => {
    const columns = [
      { title: 'Class Name', dataIndex: 'className', key: 'className' },
      { title: 'Lower Bound', dataIndex: 'lowerBound', key: 'lowerBound' },
      { title: 'Upper Bound', dataIndex: 'uperBound', key: 'uperBound' },
      { title: 'Revocation Trigger', dataIndex: 'revocationTrigger', key: 'revocationTrigger' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        className: 'Entry',
        lowerBound: '-(Default>0)',
        uperBound: 'inclusive(≤)',
        revocationTrigger: 'Never'
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: 'Template Names', dataIndex: 'templateName', key: 'templateName', render: (templateName) => (
        <span className="templateName" onClick={() => showDrawer()}>templateName</span>
      ),
    },
    {
      title: 'Category', dataIndex: 'category', key: 'category', render: (category) => (
        <div className="tag" style={{
          backgroundColor: category === 'ENS' ? '#fff' : category === 'NFT' ? 'rgb(32,128,226)' : category === 'LENS' ? 'green' : '#fff',
          color: category === 'NFT' || category === 'LENS' ? '#fff' : 'blue'
        }}>
          {category}
        </div>
      ),
    },
    { title: 'Offer Data', dataIndex: 'offerData', key: 'offerData' },
    { title: 'Action', key: 'operation', render: () => <span className="offer">Offer</span> },
  ];

  const data: DataType[] = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      templateName: 'ENS-Holding-Num',
      category: 'LENS',
      offerData: '21/10/2022'
    });
  }

  return (
    <div className="list-page">
      <div className="list-des">
        <div className="list-title">Templates</div>
        <div>
          4 Templates
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
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
          dataSource={data}
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
          </div>
          <div>
            <span>Class URL:</span>
            <span>https://s.3.eu-wesr-1....</span>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
