var Calculator = Calculator || {};
Calculator.view = function(){
        this.init.apply(this, arguments);
    };

Calculator.view.prototype = {
    init: function(option){
        this._callbackOperate = option.callbackOperate || function(){};
        this._value = option.defaultValue || 0;
        this._displayValue = option.defaultValue || [0];
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
    },

    _bindEvent: function(){
        if(this._key.attachEvent){
            this._key.attachEvent('onclick', this._onClickKey.bind(this));
        }else{
            this._key.addEventListener('click', this._onClickKey.bind(this));
            this._remove.addEventListener('click', this._onClickRemove.bind(this));
        }

    },

    _onClickKey: function(event){
        console.log(event);
        var type = event.target.dataset["type"];
        var value = event.target.innerText;
        if(type === "num"){
            this._display(value);
            return;
        }

        if(type === "operator"){
            this._callbackOperate(this._value, value);
            return;
        }

    },

    _display: function(value){
        if(this._isOverLength === true){
            alert("입력은 10 자리까지만 가능합니다.");
            return;
        }

        this._inputValue(value);
        this._updateScreen(this._value);
    },

    _inputValue: function(value){
        this._value += value;
        this._validate();
    },

    _setValue: function(value){
        this._value = value;
    },

    _setValue: function(value){
        this._value = value;
    },

    displayScreenBy: function(value){
        this._updateScreen(value);
        this._setValue("");
    },

    _validate: function(value){
        var str = Number(this._value).toString();
        var removedPoint = str.replace(".", "");
        var length = removedPoint.length;

        if(length >= 10){
            this._isOverLength = true;
        };
    },

    _updateScreen: function(value){
        var formatValue = Number(value);

        this._screen.value = formatValue;

    },

    _onClickRemove: function(){
        this._value = 0;
        this.updateScreen(this._value);
    }
};