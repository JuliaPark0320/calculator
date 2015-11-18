/**
 * Calculator의 model
 * 일반계산기용 계산 로직을 포함한다.
 * 덧셈, 뺄셈, 곱셈, 나눗셈
 * @type object
 * @param option = {
            defaultValue: 0,
            decimalPlace: 5
        };
 */

var Calculator = Calculator || {};
Calculator.model = function(){
        this.init.apply(this, arguments);
    };

Calculator.model.prototype = {
    /**
     * 초기화 한다.
     * @param option
     */
    init: function(option){
        this._setProperty(option);
    },

    /**
     * 계산 결과값을 리턴한다.
     * @return {*|number} 계산 결과값
     */
    getValue: function(){
        return this._result;
    },

    /**
     * 계산 로직을 초기화 한다.
     */
    remove: function(){
        this._result = this._defaultValue;
        this._preValue = 0;
        this._operateType = "+";
    },

    /**
     * 연산자와 입력값에 따라 계산한다.
     * @param value 입력값
     * @param nextOperateType 연산자 타입
     */
    operate: function(value, nextOperateType){
        if(nextOperateType === "="){
            // "="은 이전 로직을 수행
            nextOperateType = this._operateType;
            value = value === "" ? this._preValue : value;
        }else{
            if(value === ""){
                //입력값 없이 수식만 입력한 경우. 수식만 변경
                this._operateType = nextOperateType;
                return;
            };
        };

        value = parseFloat(value, 10);

        if(this._operateType === "+"){
            this._add(value);
        };

        if(this._operateType === "-"){
            this._subtract(value);
        };

        if(this._operateType === "x"){
            this._multiply(value);
        };

        if(this._operateType === "/"){
            this._divide(value);
        };

        this._operateType = nextOperateType;
    },

    _setProperty: function(option) {
        option = option || {};
        this._defaultValue = option.defaultValue || 0;
        this._decimalPlace = option.decimalPlace || 5;
        this._result = this._defaultValue;
        this._operateType = "+";
        this._preValue = 0;
    },

    _add: function(inputValue){
        var result = this._result + inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },

    _subtract: function(inputValue){
        var result = this._result - inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },

    _divide: function(inputValue){
        var result = this._result / inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },


    _multiply: function(inputValue){
        var result = this._result * inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },

    _validate: function(value){
        var pow = Math.pow(10, this._decimalPlace);
        var result = parseInt(value * pow) / pow;
        return result;
    }
};
