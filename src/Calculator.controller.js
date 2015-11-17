var Calculator = Calculator || {};
Calculator.controller = function(){
    this.init.apply(this, arguments);
};

Calculator.controller.prototype = {
    init: function(oModel, oView, option){
        this._model = oModel || new Calculator.model({});
        this._view = oView || new Calculator.view({
                callbackOperate: this.operate.bind(this)
            });

    },
    updateScreen: function(value){
        var formatValue = Number(value);

        this._screen.value = formatValue;

    },

    operate: function(value, operateType){
        value = parseFloat(value, 10);
        if(operateType === "+"){
            this._model.add(value, operateType);
        };

        if(operateType === "-"){
            this._model.subtract(value, operateType);
        };

        this._view.displayScreenBy(this._model.getValue());
    },

    remove: function(value){
        if(value = "+"){
            this._callbackOperate.add();
        };

        if(value = "-"){
            this._callbackOperate.add();
        };
    }
};