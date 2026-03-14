<template>
    <div class="main-content">
        <div class="title">
            <i class="iconfont icon-AI"></i>
            AI Hub
        </div>
        <div class="content">
            <div class="title">AI 应用中心</div>
            <div class="warp">
                <div class="list" v-for="value in list" :key="value.title">
                    <i :class="value.class"></i>
                    <div class="info">
                        <div class="name">{{ value.title }}</div>
                        <div class="description">{{ value.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import './index.less'

const list = ref([
    {
        title:'AI 聊天',
        class:'iconfont icon-AIliaotian',
        name:'与智能AI助手进行自然语言交流'
    },
    {
        title:'哄哄模拟器',
        class:'iconfont icon-aixin',
        name:'一个帮助你联系哄女朋友开心的游戏'
    },
    {
        title:'智能客服',
        class:'iconfont icon-zaixiankefu',
        name:'24小时在线的智能客服，随时为您解答问题'
    },
    {
        title:'ChatPDF',
        class:'iconfont icon-chat_file_fail',
        name:'智能文档阅读与问答系统'
    }
]);
</script>