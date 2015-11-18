/**
 * Calculator의 view 로직
 * Calculator의 상위엘리먼트는 screen, clear, keys 엘리먼트 요소를 포함한다.
 * screen 클래스 엘리먼트은 입력값과 계산 결과값을 노출한다.
 * clear 클래스 엘리먼트는 초기화를 수행한다.
 * keys 클래스 엘리먼트는 숫자키와 연산키를 포함하고 해당 이벤트를 실행한다.
 * @type object
 * @param option= {
          appId: "calculator",
          defaultValue: 0,
          callbackOperate: function () {},
          callbackRemove: function () {}
      };
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
     * 스크린을 value 값으로 보여준다.
     * @param value 스크린에 보여줄 data
     */
    displayScreenBy: function(value){
        this._updateScreen(value);
        this._removeInputValue();
    },

    _setProperty: function (option) {
        option = option || {};
        this._inputValue = "";
        this._isValid = true;
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
            this._keys = app.getElementsByClassName("keys")[0];
        }else{
            //IE8
            this._screen = app.querySelectorAll(".screen")[0];
            this._remove = app.querySelectorAll(".clear")[0];
            this._keys = app.querySelectorAll(".keys")[0];
        }
        this._operateType = this._keys;
    },

    _bindEvent: function(){
        if(this._keys.attachEvent){
            //IE8
            this._keys.attachEvent('onclick', this._onClickKey.bind(this));
            this._remove.attachEvent('onclick', this._onClickRemove.bind(this));
        }else{
            this._keys.addEventListener('click', this._onClickKey.bind(this));
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
        if(this._isValid === false){
            console.log("입력은 10 자리까지만 가능합니다.");
            return;
        }

        this._setInputValue(value);
        this._updateScreen(this._inputValue);
    },

    _removeInputValue: function(){
        this._inputValue = "";
        this._isValid = false;
    },

    _setInputValue: function(value){
        this._inputValue = this._inputValue + value;
        this._validate(this._inputValue);
    },

    _validate: function(value){
        //10자리까지만 입력 가능
        var str = Number(value).toString();
        var removedPoint = str.replace(".", "");
        var length = removedPoint.length;

        if(length >= 10){
            this._isValid = false;
        }else{
            this._isValid = true;
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
