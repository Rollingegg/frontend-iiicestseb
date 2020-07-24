import Mock from 'mockjs'
import rankApi from './rank'

const url = process.env.BASE_API
Mock.mock(`${url}/rank/overview`,'get',rankApi.getRankOverview)
Mock.mock(`${url}/rank/get`,'post',rankApi.getRankList)
