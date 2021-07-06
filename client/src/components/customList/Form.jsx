import React, { Component } from 'react'
import './form.less'

import axios from 'axios'
import {
  Row,
  Col,
  Input,
  Icon,
  Button,
} from 'antd'

import FormTable from './FormTable'

const Search = Input.Search

const HOST = 'http://localhost:8088/interface'

export default class UForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: {},
      dataSource: [],
      loading: true,
    }
  }
  // 获取数据
  getData = async () => {
    const resDri = await axios.post(`${HOST}/User/userList`, {
      filter: this.state.filter,
    })
    this.setState(
      {
        dataSource: resDri.data.info,
      },
      () => {
        this.setState({
          loading: false,
        })
      }
    )
  }
  //姓名输入
  onChangeUserName = (e, field) => {
    const value = e.target.value
    this.setState({
      filter: {
        [field]: value,
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
        filter: {},
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
      dataSource,
      loading,
    } = this.state

    return (
      <div>
        <div className='formBody'>
          <Row gutter={16}>
            <Col className='gutter-row' sm={8}>
              <Search
                placeholder='请输入姓名'
                prefix={<Icon type='user' />}
                value={filter.userName}
                onChange={(e) => this.onChangeUserName(e, 'userName')}
              />
            </Col>
            <Col className='gutter-row' sm={8}>
              <Search
                placeholder='请输入ID'
                prefix={<Icon type='user' />}
                value={filter.id}
                onChange={(e) => this.onChangeUserName(e, 'id')}
              />
            </Col>
            <Col className='gutter-row' sm={8}>
              <Search
                placeholder='请输入手机号'
                prefix={<Icon type='user' />}
                value={filter.phone}
                onChange={(e) => this.onChangeUserName(e, 'phone')}
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
