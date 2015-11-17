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
    },

    add: function(inputValue){
        this._value += inputValue;
        return this._value;
    },

    getValue: function(){
        return this._value;
    },

    remove: function(){
        this._value = this._defaultValue;
    }



};