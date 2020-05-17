<template>
    <div>
        <div
                :class="['menu-switch',uploadFlag ? 'active off' : 'leave']"
                @click.stop="openFeedback"
                @mouseenter="uploadEnter"
                @mouseleave="uploadLeave"
                v-if="uploadShow"
        >
            <svg height="64" p-id="3338" t="1589715433831" version="1.1" viewBox="0 0 1024 1024"
                 width="64" xmlns="http://www.w3.org/2000/svg">
                <path d="M809.984 578.56c-1.024-4.096-1.024-9.216 2.048-12.288C829.44 534.528 839.68 498.688 839.68 460.8c0-118.784-101.376-215.04-225.28-215.04-53.248 0-102.4 18.432-141.312 48.128C601.088 321.536 696.32 432.128 696.32 563.2c0 36.864-7.168 72.704-21.504 104.448 20.48-5.12 39.936-13.312 58.368-24.576 4.096-2.048 8.192-3.072 12.288-1.024l65.536 23.552c11.264 4.096 22.528-7.168 19.456-19.456l-20.48-67.584zM409.6 348.16c-123.904 0-225.28 96.256-225.28 215.04 0 37.888 10.24 73.728 28.672 105.472 2.048 4.096 3.072 8.192 2.048 12.288l-21.504 68.608c-4.096 12.288 7.168 23.552 19.456 19.456l65.536-23.552c4.096-1.024 9.216-1.024 12.288 1.024 34.816 20.48 74.752 31.744 118.784 31.744 123.904 0 225.28-96.256 225.28-215.04s-101.376-215.04-225.28-215.04zM286.72 604.16c-22.528 0-40.96-18.432-40.96-40.96s18.432-40.96 40.96-40.96 40.96 18.432 40.96 40.96-18.432 40.96-40.96 40.96z m122.88 0c-22.528 0-40.96-18.432-40.96-40.96s18.432-40.96 40.96-40.96 40.96 18.432 40.96 40.96-18.432 40.96-40.96 40.96z m122.88 0c-22.528 0-40.96-18.432-40.96-40.96s18.432-40.96 40.96-40.96 40.96 18.432 40.96 40.96-18.432 40.96-40.96 40.96z"
                      fill="#409EFF" p-id="3339"></path>
            </svg>
        </div>
        <el-dialog :visible.sync="feedbackFormVisible" center title="OASIS" :style="formColor">
            <div class="feedback-form-item">
                <div>您对我们网站的意见是</div>
                <vue-feedback-reaction :labels="emojiLabels" emojiHeight="64px" emojiWidth="64px" v-model="feedback"/>
            </div>
            <div class="feedback-form-item">
                <div>请在下面留下您的反馈</div>
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入您的反馈内容"
                        v-model="feedbackText">
                </el-input>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="submitFeedback" icon="el-icon-s-promotion" type="primary">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {VueFeedbackReaction} from 'vue-feedback-reaction';

    export default {
        name: "Feedback",
        data() {
            return {
                uploadShow: false,
                uploadFlag: true,
                feedback: '',
                feedbackFormVisible: false,
                emojiLabels: ['Unsatisfied', 'Dislike', 'Neutral', 'Like', 'Love'],
                feedbackText: ''
            }
        },
        computed: {
            formColor() {
                const colors = ['rgba(255,0,0,0.4)', 'rgba(148,0,211,0.4)', 'rgba(255,255,0,0.4)', 'rgba(50,205,50,0.4)', 'rgba(30,144,255,0.4)'];
                // console.log(this.feedback);
                if (this.feedback)
                    return `backgroundColor: ${colors[this.feedback - 1]}; transition: all 500ms linear 0s`;
                return '';
            }
        },
        components: {
            VueFeedbackReaction
        },
        methods: {
            uploadEnter() {
                this.uploadFlag = true;
            },
            uploadLeave() {
                this.uploadFlag = false;
            },
            uploadAnimated() {
                setTimeout(() => {
                    this.uploadShow = true;
                    setTimeout(() => {
                        this.uploadLeave();
                    }, 1000);
                }, 1000);
            },
            openFeedback() {
                this.feedbackFormVisible = true;
            },
            submitFeedback() {
                this.feedbackFormVisible = false;

                this.$message({
                    showClose: true,
                    message: "感谢您的反馈，我们一定会做的更好的！",
                    type: "success"
                });
            }
        },
        mounted() {
            this.uploadAnimated();
        }
    }
</script>

<style lang="less" scoped>
    .off {
        -webkit-animation: 1s secondDiv;
        background: transparent;
    }

    @keyframes secondDiv {
        0% {
            transform: scale(1.4, 1.4);
        }
        10% {
            transform: scale(1, 1);
        }
        25% {
            transform: scale(1.2, 1.2);
        }
        50% {
            transform: scale(1, 1);
        }
        70% {
            transform: scale(1.2, 1.2);
        }
        100% {
            transform: scale(1, 1);
        }
    }

    .menu-switch {
        position: fixed;
        bottom: 20px;
        left: 0;
        z-index: 2001;
        cursor: pointer;
        transition: all 0.25s;

        &.leave {
            left: -36px;
        }

        &.active {
            left: 0;
        }

        &:hover {
            transform: scale(1.02);
        }

    }

    .feedback-form-item {
        text-align: center;
        margin-bottom: 20px;
    }
</style>