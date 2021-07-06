import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
} from 'antd'
import './index.less'
import axios from 'axios'
import CountUp from 'react-countup'
const { Meta } = Card
const HOST = 'http://localhost:8088/interface'

export default class MIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cusOrder: [],
      driOrder: [],
      cusList: [],
      driList: [],
      totalMoney: 0,
      moneyCus: [],
      moneyDri: [],
    }
  }

  async componentDidMount() {
    //   用户列表
    const cusList = await axios.post(`${HOST}/User/userList`)
    // 司机列表
    const driList = await axios.post(`${HOST}/Driver/driList`)
    // 乘客订单
    const cusOrder = await axios.post(`${HOST}/CusRecord/getRecordList`)
    // 司机订单
    const driOrder = await axios.post(`${HOST}/CusRecord/getRecordListDriver`)
    //   乘客流水
    const moneyCus = await axios.post(`${HOST}/RechargeRecord/getRecord`, {
      nickName: '',
    })
    // 司机流水
    const moneyDri = await axios.post(
      'http://localhost:8088/interface/RechargeRecord/getRecord',
      { nickName: '', isDriver: true }
    )
    let totalMoney = 0
    const arr = [...moneyCus.data.data]
    arr.map((item) => {
      totalMoney = totalMoney + +item.money
    })
    this.setState({
      cusList: cusList.data.info,
      driList: driList.data.info,
      cusOrder: cusOrder.data.data,
      driOrder: driOrder.data.data,
      totalMoney,
      moneyCus: moneyCus.data.data,
      moneyDri: moneyDri.data.data,
    })
  }

  // 首页卡片
  CountUp() {
    const { cusOrder, driOrder, cusList, driList, totalMoney } = this.state
    let imgSrc = ['平台订单', '平台流水', '平台司机', '平台乘客']
    let imgName = ['平台订单', '平台流水', '平台司机', '平台乘客']
    let count = [cusOrder.length, totalMoney, driOrder.length, driList.length]
    let cu = imgSrc.map(function (item, index) {
      return (
        <Col md={12} key={item}>
          <Card style={{ cursor: 'pointer', marginBottom: 16 }}>
            <Meta
              style={{ fontSize: 22 }}
              avatar={
                <img
                  className='indexIcon'
                  src={require('../../style/img/' + item + '.png')}
                  alt=''
                />
              }
              title={imgName[index]}
              description={
                <CountUp start={0} end={count[index]} duration={2.75} />
              }
            />
          </Card>
        </Col>
      )
    })
    return cu
  }

  render() {
    return (
      <div>
        <div className='mindex'>
          <Row gutter={16}>{this.CountUp()}</Row>
        </div>
      </div>
    )
  }
}
