var Calculator = Calculator || {};
Calculator.view = function(){
        this.init.apply(this, arguments);
    };

Calculator.view.prototype = {
    init: function(option){
        this._callbackOperate = option.callbackOperate || function(){};
        this._callbackRemove = option.callbackRemove || function(){};
        this._displayValue = option.defaultValue || 0;
        this._inputValue = "";
        this._isOverLength = false;
        this._cashElement(option);
        this._bindEvent();
    },

    _cashElement: function(option) {
        var appId = option.appId || "calculator";
        var app = document.getElementById(appId);
        this._screen = app.getElementsByClassName("screen")[0];
        this._remove = app.getElementsByClassName("clear")[0];
        this._key = app.getElementsByClassName("keys")[0];
        this._operateType = this._key;
    },

    _bindEvent: function(){
        if(this._key.attachEvent){
            this._key.attachEvent('onclick', this._onClickKey.bind(this));
        }else{
            this._key.addEventListener('click', this._onClickKey.bind(this));
            this._remove.addEventListener('click', this._onClickRemove.bind(this), true);
        }

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

    displayScreenBy: function(value){
        this._setDisplayValue(value);
        this._updateScreen(value);
        this._removeInputValue();
    },

    _validate: function(value){
        var str = Number(this._inputValue).toString();
        var removedPoint = str.replace(".", "");
        var length = removedPoint.length;

        if(length >= 10){
            this._isOverLength = true;
        }else{
            this._isOverLength = false;
        };
    },

    _updateScreen: function(value){
        var formatValue = value == 0 ? 0 : Number(value);

        this._screen.value = formatValue;

    },

    _onClickRemove: function(event){
        this._removeInputValue();
        this._updateScreen(0);
        this._callbackRemove(event);
    }
};