import { Remote } from "electron"
import serialPort, { OpenOptions } from "serialport"

/**
 * 获取electron挂载的serialPort
 * @param win 全局window
 * @returns 
 */
export const getSerialPortObject = (win: Window = window): typeof serialPort => {
    return (<Remote>window.require('electron').remote).getGlobal('serialPort')
}

export const serialPort_listPorts = () => {
    return getSerialPortObject().list()
}

/**
 * 初始化新的串口
 * @param path 串口设备
 * @param options 串口选项
 * @returns 
 */
export const newSerialPort = (path: string, options: OpenOptions = {}): serialPort => {
    const opt: OpenOptions = {
        autoOpen: true,
        dataBits: 8,
        stopBits: 1,
        parity: "none"
    }
    // const a = serialPort
    const serial = getSerialPortObject()
    return new serial(path, { ...opt, ...options }, err => {
        if (err) {
            new Notification(`开启串口:${path}出错`, { data: err.message })
        }
    })
}