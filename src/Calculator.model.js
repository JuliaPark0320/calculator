var Calculator = Calculator || {};
Calculator.model = function(){
        this.init.apply(this, arguments);
    };

Calculator.model.prototype = {
    init: function(option){
        this._setProperty(option);
    },

    _setProperty: function(option) {
        option = option || {};
        this._defaultValue = option.defaultValue || 0;
        this._result = option.defaultValue || 0;
        this._decimalPlace = option.decimalPlace || 5;
        this._operateType = "+";
        this._preValue = 0;
    },

    operate: function(value, nextOperateType){
            if(nextOperateType === "="){
                nextOperateType = this._operateType;
                if(value === ""){
                    value = this._preValue;
                }
            }else{
                if(value === ""){
                    //입력값 없이 수식만 입력한 경우. 수식만 변경
                    this._operateType = nextOperateType;
                    return;
                };
            };

        value = parseFloat(value, 10);


        if(this._operateType === "+"){
            this.add(value);
        };

        if(this._operateType === "-"){
            this.subtract(value);
        };

        if(this._operateType === "x"){
            this.multiply(value);
        };

        if(this._operateType === "/"){
            this.divide(value);
        };



        this._operateType = nextOperateType;
    },

    add: function(inputValue){
        var result = this._result + inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },

    subtract: function(inputValue){
        var result = this._result - inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },

    divide: function(inputValue){
        var result = this._result / inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },


    multiply: function(inputValue){
        var result = this._result * inputValue;
        this._preValue = inputValue;
        this._result = this._validate(result);
    },

    getValue: function(){
        return this._result;
    },

    _validate: function(value){
        var pow = Math.pow(10, this._decimalPlace);
        var result = parseInt(value * pow) / pow;
        return result;
    },

    remove: function(){
        this._result = this._defaultValue;
        this._preValue = 0;
        this._operateType = "+";
    }
};