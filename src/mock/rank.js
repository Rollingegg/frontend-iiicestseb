// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const rankData = function () {
    let authorHIndexRank = []
    for (let i = 0; i < 3; i++) {
        let keywords = []
        const len = Random.integer(1, 10)
        for (let j = 0; j < len; j++) {
            keywords.push(Random.word(3, 10))
        }
        let newRankItem = {
            name: Random.name(),
            hIndex: Random.integer(1, 100),
            paperNum: Random.integer(1, 100),
            references: Random.integer(100, 1000),
            affiliation: Random.sentence(10, 30),
            keywords: keywords,
            statisticNum: Random.integer(1, 100),
            rank: i + 1
        }
        authorHIndexRank.push(newRankItem)
    }
    return {
        hIndex: authorHIndexRank
    }
}

const len = 100
let rankAuthors = []
for (let i = 0; i < len; i++) {
    const keywords = []
    const len = Random.integer(2, 8)
    for (let j = 0; j < len; j++) {
        keywords.push(Random.word(4, 10))
    }
    let newRankItem = {
        name: Random.name(),
        id: i+1,
        affiliationId: i+1,
        hIndex: Random.integer(1, 100),
        paperNum: Random.integer(1, 100),
        references: Random.integer(100, 1000),
        affiliation: Random.sentence(10, 30),
        keywords: keywords,
        statisticNum: Random.integer(1, 100),
        rank: i + 1
    }
    rankAuthors.push(newRankItem)
}
const rankList = function (opt) {
    const {page, size, rankType} = JSON.parse(opt.body)
    return {records: rankAuthors.slice(page * size, (page + 1) * size), total: len}
}

export default {
    getRankOverview: rankData,
    getRankList: opt => rankList(opt)
}
