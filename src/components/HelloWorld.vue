<template>
  <h1>{{ msg }}</h1>
  <div @click="()=>{count++}">click summer {{count}}</div>

  <div class="btn-style"  @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <Watermark text="summer huang">
      <div class="content"></div>
    </Watermark>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import Watermark from './Watermark.vue';

defineProps({
  msg: String,
})

const count = ref(0)

const pressTimer = ref(null);
const longPressDuration = 500; // Duration in milliseconds
const isLongPressed = ref(false);

const handleTouchStart = ()=>{
  pressTimer.value = setTimeout(() => {
    isLongPressed.value = true;
    console.log('长按开始')
  }, longPressDuration);
}

const handleTouchMove = ()=>{
  if (isLongPressed.value) {
    // Handle the move event if necessary
    console.log('Moved:', event.touches ? event.touches[0] : event);
  }
}

const handleTouchEnd = ()=>{
  clearTimeout(pressTimer.value);
  if (isLongPressed.value) {
    isLongPressed.value = false;
    console.log('长按结束')
  }
}

</script>

<style>
.btn-style{
  border:1px solid red;
  margin-top:10px;
  /* height: 500px; */
  height: 100%;
  width: 100%;
  .content{
    width: 100%;
    height: 500px;
  }
}
</style>
