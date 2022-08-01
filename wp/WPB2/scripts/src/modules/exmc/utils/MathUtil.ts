export default class MathUtil{
	static isNumber(val:string){    
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
		return regPos.test(val) && regNeg.test(val);
	}
	static zeroIfNaN(num:number){
		return isNaN(num) ? 0 : num;
	}
}