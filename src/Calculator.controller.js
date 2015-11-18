/**
 * Calculator의 APP
 * model과 view의 동작을 연결한다.
 * @type object
 * @param option = {
            appId: "calculator",
            defaultValue: 0,
            decimalPlace: 5
        };
 */

var Calculator = Calculator || {};
Calculator.controller = function(){
    this.init.apply(this, arguments);
};

Calculator.controller.prototype = {
    /**
     * 초기화 한다.
     * @param option
     */
    init: function(option, oView, oModel){
        option = {
            appId: option.appId || "calculator",
            defaultValue: option.defaultValue || 0,
            decimalPlace: option.decimalPlace || 5
        };

        this._model = oModel || new Calculator.model({
                defaultValue: option.defaultValue,
                decimalPlace: option.decimalPlace
            });

        this._view = oView || new Calculator.view({
                appId: option.appId,
                defaultValue: option.defaultValue,
                callbackOperate: this.operate.bind(this),
                callbackRemove: this.remove.bind(this)
            });
    },

    /**
     * _view 객체의 연산키의 이벤트 콜백 함수
     * 계산 동작함수
     * 덧셈, 뺄셈, 나눗셈, 곱셈
     * @param value 입력 값
     * @param operateType 연산 기호
     */
    operate: function(value, operateType){
        this._model.operate(value, operateType);
        this._view.displayScreenBy(this._model.getValue());
    },

    /**
     * _view 객체의 삭제키의 이벤트 콜백 함수
     * 계산기 초기화
     */
    remove: function(){
        this._model.remove();
    }
};
