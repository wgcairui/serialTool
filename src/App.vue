<template>
  <el-row>
    <el-row :span="8">
      <el-form label-width="50px" label-suffix=":">
        <el-form-item label="串口">
          <el-select v-model="path" placeholder="选择串口">
            <el-option v-for="val in ports" :key="val.path" :value="val" :label="val.path"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
  </el-row>
</template>

<script lang="ts">
  import { PortInfo } from "serialport";
  import { defineComponent, onMounted, reactive, ref } from "vue";

  import { serialPort_listPorts } from "./common"

  export default defineComponent({
    setup() {

      const path = reactive<PortInfo>({
        path: ''
      })

      const serialOpt = reactive({
        path: '',

      })

      const ports = ref<PortInfo[]>([])

      onMounted(() => {
        serialPort_listPorts().then(el => {
          ports.value = el
        })
      })

      return { ports, serialOpt, path }
    }
  })
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
