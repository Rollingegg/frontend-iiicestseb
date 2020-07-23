const url=process.env.BASE_API
// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const rankData = function () {
    let authorHIndexRank=[]
    for (let i = 0; i < 3; i++) {
        let keywords=[]
        const len=Random.integer(1,10)
        for (let j = 0; j < len; j++) {
            keywords.push(Random.word(3,10))
        }
        let newRankItem={
            name: Random.name(),
            hIndex: Random.integer(1,100),
            paperNum: Random.integer(1,100),
            references: Random.integer(100,1000),
            affiliation: Random.sentence(10,30),
            keywords: keywords,
            rank: i+1
        }
        authorHIndexRank.push(newRankItem)
    }
    return {
        hIndex: authorHIndexRank
    }
}
// 拦截ajax请求，配置mock的数据
Mock.mock(`${url}/rank/overview`, 'get', rankData)
