<template>
    <div>
        <div class="dialog-wrap">
            <div class="dialog-cover" v-if="isShow"  @click="closeMyself">
            </div>
            <transition class="drop">
            <div class="dialog-content" v-if="isShow">
                <p class="dialog-close"  @click="closeMyself">
                    X
                </p>
            <slot></slot>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        closeMyself () {
            this.$emit('on-close')
        }
    }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 40%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: .04rem solid #FF7F00;
  padding: 2%;
  line-height: 1.6;
  border-radius: .2rem;
}
.dialog-close {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: .42rem;
  color:gray;
  cursor: pointer;
   transition: transform 1s;
}
.dialog-close:hover {
  color: #FF7F00;
  transform:rotate(360deg);
}
</style>
