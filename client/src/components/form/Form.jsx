import React, { Component } from 'react'
import './form.less'

import axios from 'axios'
import Mock from 'mockjs'
import moment from 'moment'
import {
  Row,
  Col,
  Input,
  Icon,
  Cascader,
  DatePicker,
  Button,
  Select,
  Tooltip,
  Popconfirm,
} from 'antd'

import FormTable from './FormTable'

const Search = Input.Search


const { RangePicker } = DatePicker

const HOST = 'http://localhost:8088/interface'
const OrderStatusMap = {
  0: '待成单',
  1: '待出行',
  2: '进行中',
  3: '已完成',
  9: '已废弃',
}
const orderOpts = [
  { label: '待成单', value: 0 },
  { label: '待出行', value: 1 },
  { label: '进行中', value: 2 },
  { label: '已完成', value: 3 },
  { label: '已废弃', value: 9 },
]


export default class UForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {
        startDate: Date.now() - 1000 * 60 * 60 * 24 * 365,
        endDate: Date.now() + 1000 * 60 * 60 * 24 * 365,
      },
      address: '',
      timeRange: '',
      visible: false, //新建窗口隐藏
      dataSource: [],
      selectedRowKeys: [],
      tableRowKey: 0,
      isUpdate: false,
      loading: true,
    }
  }
  // 获取数据
  getData = async () => {
    const cusOrder = await axios.post(
      `${HOST}/CusRecord/getRecordList`,
      this.state.filter
    )
    this.setState(
      {
        dataSource: cusOrder.data.data,
      },
      () => {
        this.setState({
          loading: false,
        })
      }
    )
  }
  //用户名输入
  onChangeUserName = (e) => {
    const value = e.target.value
    this.setState({
      filter: {
        userName: value,
      },
    })
  }
  //用户名搜索
  onSearchUserName = (value) => {
    // console.log(value);
    const { dataSource } = this.state
    this.setState({
      dataSource: dataSource.filter((item) => item.name.indexOf(value) !== -1),
      loading: false,
    })
  }

  //时间选择
  RangePicker_Select = (date, dateString) => {
    // console.log(date, dateString);
    const { dataSource } = this.state
    const startDate = moment(dateString[0]).valueOf()
    const endDate = moment(dateString[1]).valueOf()
    this.setState({
      filter: {
        startDate,
        endDate,
      },
    })
  }
  //渲染
  componentDidMount() {
    this.getData()
  }
  //搜索按钮
  btnSearch_Click = () => {
    this.getData()
  }
  //重置按钮
  btnClear_Click = () => {
    this.setState(
      {
        filter: {
          startDate: Date.now() - 1000 * 60 * 60 * 24 * 365,
          endDate: Date.now() + 1000 * 60 * 60 * 24 * 365,
        },
      },
      () => {
        this.getData()
      }
    )
  }


  //单选框改变选择
  checkChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys: selectedRowKeys })
  }
  render() {
    const {
      filter,
      address,
      timeRange,
      dataSource,
      visible,
      isUpdate,
      loading,
    } = this.state

    return (
      <div>
        <div className='formBody'>
          <Row gutter={16}>
            <Col className='gutter-row' sm={8}>
              <Search
                placeholder='请输入用户名'
                prefix={<Icon type='user' />}
                value={filter.userName}
                onChange={this.onChangeUserName}
                // onSearch={this.onSearchUserName}
              />
            </Col>
            <Col className='gutter-row' sm={8}>
              <Select
                onChange={(value) =>
                  this.setState({ filter: { status: value } })
                }
                placeholder='请输选择订单状态'
                style={{ width: '100%' }}
              >
                {orderOpts.map((item) => (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col className='gutter-row' sm={8}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={this.RangePicker_Select}
                value={[moment(filter.startDate), moment(filter.endDate)]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <div className='btnOpera'>
              <Button
                type='primary'
                onClick={this.btnSearch_Click}
                style={{ marginRight: '10px' }}
              >
                查询
              </Button>
              <Button
                type='primary'
                onClick={this.btnClear_Click}
                style={{ background: '#f8f8f8', color: '#108ee9' }}
              >
                重置
              </Button>
            </div>
          </Row>
          <FormTable
            dataSource={dataSource}
            checkChange={this.checkChange}
            onDelete={this.onDelete}
            editClick={this.editClick}
            loading={loading}
          />
        </div>
      </div>
    )
  }
}
