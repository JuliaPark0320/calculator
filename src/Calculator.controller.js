var Calculator = Calculator || {};
Calculator.controller = function(){
    this.init.apply(this, arguments);
};

Calculator.controller.prototype = {
    init: function(option, oView, oModel){
        option = {
            appId: option.appId || "calculator",
            defaultValue: option.defaultValue || 0,
            callbackOperate: option.callbackOperate || function(){},
            callbackRemove: option.callbackRemove || function(){}
        };

        this._model = oModel || new Calculator.model();
        this._view = oView || new Calculator.view({
                appId: option.appId,
                callbackOperate: this.operate.bind(this),
                callbackRemove: this.remove.bind(this)
            });

    },

    operate: function(value, operateType){
        this._model.operate(value, operateType);
        this._view.displayScreenBy(this._model.getValue());
    },

    remove: function(){
        this._model.remove();
    }
};