import React, { useState } from 'react';
import './index.scss';
import { Button } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Table } from 'antd';
import { moduleActive } from '../../store/atom';
import { useRecoilState } from 'recoil';

const tabs = [
  {
    name: 'My Templates',
    value: 0,
  },
  {
    name: 'Offered Claims',
    value: 1,
  },
];

interface DataType {
  key: React.Key;
  templateName: string;
  category: string;
}

export default function List() {
  const [activeTabVal, setActiveTabVal] = useState(0);

  const [activeTabStr, setActiveTabStr] = useRecoilState(moduleActive);

  const expandedRowRender = () => {
    const columns = [
      { title: 'Class Name', dataIndex: 'className', key: 'className' },
      { title: 'Lower Bound', dataIndex: 'lowerBound', key: 'lowerBound' },
      { title: 'Upper Bound', dataIndex: 'uperBound', key: 'uperBound' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        className: 'Entry',
        lowerBound: '-(Default>0)',
        uperBound: 'inclusive(≤)',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Template Names', dataIndex: 'templateName', key: 'templateName' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Action', key: 'operation', render: () => <a style={{ color: 'rgb(131, 83, 226)' }}>Offer</a> },
  ];

  const data: DataType[] = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      templateName: 'ENS-Holding-Num',
      category: 'ENS',
    });
  }

  return (
    <div className="list-page">
      <div className="list-title">Claiming</div>
      <div className="list-des">
        A claim is a statement made by one identity about another identity or about itself.
      </div>
      <div className="list-des">Create claim schemas then offer them for scanning with the Polygon ID Wallet</div>
      <div className="list-des">mobile app.</div>
      <div className="list-btn">
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setActiveTabStr('creatTempalte')}>
          Create Template
        </Button>
      </div>
      <div className="list-tabs">
        {tabs.map((item, index) => (
          <div key={item.value} className={(index === activeTabVal ? 'active' : '')} onClick={() => setActiveTabVal(index)}>
            <span>
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div className="list-table">
        <Table
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
          dataSource={data}
        />
      </div>
    </div>
  );
}
