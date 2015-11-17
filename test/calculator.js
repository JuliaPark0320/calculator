module("Module Name", {
    setup: function() {
        this.calculatorModel = new Calculator.model({
            defaultValue: 0
        });
    },

    teardown: function() {
        this.calculatorModel = null;
    }
});

/**
 *
    계산 로직 테스트(Model)
 *
 **/
QUnit.test( "덧셈 연산을 할 수 있다.", function() {
// given
    var value = 0;
    var inputValue = 10;
// when
    this.calculatorModel.add(inputValue);
// then
    equal( this.calculatorModel.getValue(), value + inputValue, "덧셈 OK ");
});

QUnit.test( "뺄셈 연산을 할 수 있다.", function() {
// given
    var value = 0;
    var inputValue = 10;
// when
    this.calculatorModel.subtract(inputValue);
// then
    equal( this.calculatorModel.getValue(), value + inputValue, "뺄셈 OK ");
});

QUnit.test( "나누기 연산을 할 수 있다.", function() {
// given
    var value = 0;
    var inputValue = 10;
// when
    this.calculatorModel.divide(inputValue);
// then
    equal( this.calculatorModel.getValue(), value + inputValue, "나누기 OK ");
});

//초기화 테스트
QUnit.test( "곱하기 연산을 할 수 있다.", function() {
// given
    var value = 0;
    var inputValue = 10;
// when
    this.calculatorModel.divide(inputValue);
// then
    equal( this.calculatorModel.getValue(), value + inputValue, "곱하기 OK ");
});