import React, { Component } from 'react'
import { Table, Icon, Popconfirm } from 'antd'
import moment from 'moment'

const OrderStatusMap = {
  0: '待成单',
  1: '待出行',
  2: '进行中',
  3: '已完成',
  4: '已关闭',
  9: '已废弃',
}

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
        title: '价格',
        dataIndex: 'price',
        width: 150,
        sorter: (a, b) => +a.price - +b.price,
      },
      {
        title: '出发地',
        dataIndex: 'startLocal',
        width: 350,
      },
      {
        title: '目的地',
        dataIndex: 'endLocal',
        width: 350,
      },
      {
        title: '出行人数',
        dataIndex: 'cusNum',
        width: 140,
      },
      {
        title: '出发时间',
        dataIndex: 'date',
        sorter: (a, b) => +a.date - +b.date,
        width: 200,
        render: (value) => moment(+value).format('YYYY-MM-DD HH:MM:ss'),
      },
      {
        title: '发布时间',
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
      {
        title: '订单编号',
        dataIndex: 'matchCode',
        width: 400,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        width: 150,
        render: (status) => OrderStatusMap[status],
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 150,
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
