export default class Quantization {
    /**
     * 初始化量化器
     * @param {number} steps - 量化步长，默认为256
     */
    constructor(steps = 256) {
        if (typeof steps !== 'number' || steps <= 0) {
            throw new Error('steps must be a positive number');
        }
        this.steps = steps;
    }
    /**
     * 执行量化操作
     * @param {number} value - 需要量化的浮点数值（假设值域在0-1之间）
     * @returns {number} - 量化后的整数值
     */
    quantize(value) {
        if (value < 0 || value > 1) {
            throw new Error('Input value should be between 0 and 1');
        }
        // 将值映射到整数区间并量化
        const quantizedValue = Math.floor(value * this.steps);
        // 返回量化后的值，转换回浮点数以便于连续处理
        return quantizedValue / this.steps;
    }
}
//# sourceMappingURL=Quantization.js.map