"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = writeFile;
exports.readFile = readFile;
const fs = require("fs");
/**
 * 重试文件写入操作。
 * @param path 文件路径
 * @param msg 要写入的内容
 * @param maxRetries 最大重试次数
 * @param retryDelay 重试之间的延迟时间（毫秒）
 */
async function writeFile(path, msg, maxRetries = 3, retryDelay = 2) {
    let retries = 0;
    while (retries <= maxRetries) {
        try {
            await new Promise((resolve, reject) => {
                fs.writeFile(path, msg, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
            return; // 成功写入后退出
        }
        catch (error) {
            if (retries === maxRetries) {
                throw error; // 达到最大重试次数后抛出错误
            }
            retries++;
            console.log(`文件写入失败，正在进行第 ${retries} 次重试...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // 等待一段时间后重试
        }
    }
}
/**
 * 重试文件读取操作。
 * @param path 文件路径
 * @param maxRetries 最大重试次数
 * @param retryDelay 重试之间的延迟时间（毫秒）
 */
async function readFile(path, maxRetries = 3, retryDelay = 2) {
    let retries = 0;
    while (retries <= maxRetries) {
        try {
            return await new Promise((resolve, reject) => {
                fs.readFile(path, "utf-8", (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }
        catch (error) {
            if (retries === maxRetries) {
                throw error; // 达到最大重试次数后抛出错误
            }
            retries++;
            console.log(`文件读取失败，正在进行第 ${retries} 次重试...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // 等待一段时间后重试
        }
    }
}
//# sourceMappingURL=fileOper.js.map