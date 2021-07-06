import React, { Component } from 'react'
import { Table } from 'antd'
import moment from 'moment'

export default class FormTable extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { checkChange, onDelete, editClick, dataSource, loading } = this.props
    const rowSelection = {
      onChange: checkChange,
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 80,
        sorter: (a, b) => +a.id - +b.id,
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        width: 80,
      },
      {
        title: '微信名',
        dataIndex: 'nickName',
        width: 150,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        filters: [
          { text: '男', value: 0 },
          { text: '女', value: 1 },
        ],
        onFilter: (value, record) => record.sex == value,
        width: 80,
        render: (sex) => (sex == 0 ? '男' : '女'),
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        width: 200,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 100,
        sorter: (a, b) => +a.age - +b.age,
      },
      {
        title: '账户余额',
        dataIndex: 'amount',
        width: 200,
        sorter: (a, b) => +a.amount - +b.amount,
      },

      {
        title: '注册时间',
        dataIndex: 'createdAt',
        sorter: (a, b) => +a.createdAt - +b.createdAt,
        width: 200,
        render: (value) => moment(+value).format('YYYY-MM-DD HH:MM:ss'),
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: (a, b) => +a.updatedAt - +b.updatedAt,
        width: 200,
        render: (value) => moment(+value).format('YYYY-MM-DD HH:MM:ss'),
      },
    ]
    return (
      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        scroll={{ x: '100%' }}
        className='formTable'
        loading={loading}
      />
    )
  }
}
