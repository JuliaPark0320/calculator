/**
 * Calculator의 view 로직
 * @type {{}|Calculator}
 * @param option= {
 *
 * }
 */

var Calculator = Calculator || {};
Calculator.view = function(){
        this.init.apply(this, arguments);
    };

Calculator.view.prototype = {
    /**
     * 초기화 한다.
     * @param option
     */
     init: function(option){
        this._setProperty(option);
        this._cashElement(option);
        this._bindEvent();
    },

    /**
     * 스크린을 param 값으로 보여준다.
     * @param value 스크린에 보여줄 data
     */
    displayScreenBy: function(value){
        this._setDisplayValue(value);
        this._updateScreen(value);
        this._removeInputValue();
    },

    _setProperty: function (option) {
        option = option || {};
        this._inputValue = "";
        this._isOverLength = false;
        this._defaultValue = option.defaultValue || 0;

        //event callback함수.
        this._callbackOperate = option.callbackOperate || function () {};
        this._callbackRemove = option.callbackRemove || function () {};
    },

    _cashElement: function(option) {
        var appId = option.appId || "calculator";
        var app = document.getElementById(appId);
        if(app.getElementsByClassName){
            this._screen = app.getElementsByClassName("screen")[0];
            this._remove = app.getElementsByClassName("clear")[0];
            this._key = app.getElementsByClassName("keys")[0];
        }else{
            //IE8
            this._screen = app.querySelectorAll(".screen")[0];
            this._remove = app.querySelectorAll(".clear")[0];
            this._key = app.querySelectorAll(".keys")[0];
        }
        this._operateType = this._key;
    },

    _bindEvent: function(){
        if(this._key.attachEvent){
            //IE8
            this._key.attachEvent('onclick', this._onClickKey.bind(this));
            this._remove.attachEvent('onclick', this._onClickRemove.bind(this));
        }else{
            this._key.addEventListener('click', this._onClickKey.bind(this));
            this._remove.addEventListener('click', this._onClickRemove.bind(this));
        }
    },

    _onClickRemove: function(event){
        this._removeInputValue();
        this._updateScreen(this._defaultValue);
        this._callbackRemove(event);
    },

    _onClickKey: function(event){
        var type = event.target.dataset["type"];
        var value = event.target.innerText;
        if(type === "num"){
            this._displayInputValue(value);
            return;
        }

        if(type === "operator"){
            this._callbackOperate(this._inputValue, value);
            return;
        }
    },

    _displayInputValue: function(value){
        if(this._isOverLength === true){
            alert("입력은 10 자리까지만 가능합니다.");
            return;
        }

        this._setInputValue(value);
        this._updateScreen(this._inputValue);
    },

    _removeInputValue: function(){
        this._inputValue = "";
        this._isOverLength = false;
    },

    _setInputValue: function(value){
        this._inputValue = this._inputValue + value;
        this._validate();
    },

    _setDisplayValue: function(value){
        this._displayValue = value;
    },

    _validate: function(value){
        //10자리까지만 입력 가능
        var str = Number(this._inputValue).toString();
        var removedPoint = str.replace(".", "");
        var length = removedPoint.length;

        if(length >= 10){
            this._isOverLength = true;
        }else{
            this._isOverLength = false;
        };
    },

    _formatWithComma: function(value){
        //1000단위 마다  ‘,’ 을 찍어준다.
        var num = value.toString();
        var intNum = num.split(".")[0];
        var floatNum = num.split(".")[1];
        var pattern = /(-?[0-9]+)([0-9]{3})/;

        //정수 필터
        while(pattern.test(intNum)) {
            intNum = intNum.replace(pattern,"$1,$2");
        }

        //실수
        if(floatNum === undefined){
            floatNum = "";
        }else{
            floatNum = "." + floatNum;
        }

        num = intNum + floatNum;

        return num;
    },

    _updateScreen: function(value){
        var formatValue = value;

        if(value != 0){
            formatValue = this._formatWithComma(value);
        }
        this._screen.value = formatValue;
    }
};