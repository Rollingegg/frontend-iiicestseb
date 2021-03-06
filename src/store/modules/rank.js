import request from "@/utils/request";
import {Message} from "element-ui";

const rank = {
    namespaced: true,
    state: {
        currentRankType: '',
        currentTotalNum: 0,
        currentRankList: [],
        currentPageNum: 1,
    },
    mutations: {
        set_currentRankType: function (state, val) {
            state.currentRankType = val
        },
        set_currentTotalNum: function (state, val){
            state.currentTotalNum=val
        },
        set_currentPageNum(state, val) {
            state.currentPageNum = val
        },
        set_currentRankList: function (state, val) {
            state.currentRankList = val
        }
    },
    actions: {
        getRankList: async ({state, commit}) => {
            try {
                const res = await request.post('rank/get', {
                    page: state.currentPageNum,
                    size: 20,
                    rankType: state.currentRankType
                })
                console.log(res)
                if (res.status&&res.data.status) {
                    commit('set_currentRankList', res.data.result.authorRankDataVOList)
                    commit('set_currentTotalNum', res.data.result.total)
                } else {
                    commit('set_currentRankList', [])
                    commit('set_currentTotalNum', 0)
                    Message.error(e)
                }
            } catch (e) {
                Message.error(e)
            }
        }
    }
}
export default rank
