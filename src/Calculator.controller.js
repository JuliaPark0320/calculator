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

    operate: function(value, operateType){
        this._model.operate(value, operateType);
        this._view.displayScreenBy(this._model.getValue());
    },

    remove: function(){
        this._model.remove();
        this._view.remove();
    }
};