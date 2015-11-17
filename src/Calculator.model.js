var Calculator = Calculator || {};
Calculator.model = function(){
        this.init.apply(this, arguments);
    };

Calculator.model.prototype = {
    init: function(option){
        this._setProperty(option);
    },

    _setProperty: function(option) {
        this._defaultValue = option.defaultValue || 0;
        this._value = option.defaultValue || 0;
        this._decimalPlace = option.decimalPlace || 5;
    },

    add: function(inputValue){
        var value = this._value;
        var result = value + inputValue;
        this._value = this._validate(result);
    },

    subtract: function(inputValue){
        var value = this._value;
        var result = value - inputValue;
        this._value = this._validate(result);
    },

    divide: function(inputValue){
        var value = this._value;
        var result = value / inputValue;
        this._value = this._validate(result);
    },


    multiply: function(inputValue){
        var value = this._value;
        var result = value * inputValue;
        this._value = this._validate(result);
    },

    getValue: function(){
        return this._validate(this._value);
    },

    _validate: function(value){
        var pow = Math.pow(10, this._decimalPlace);
        var result = parseInt(value * pow) / pow;
        return result;
    },

    remove: function(){
        this._value = this._defaultValue;
    }



};