module("Calculator", {
    setup: function() {
        this.calculatorModel = new Calculator.model({
            defaultValue: 0
        });
        this.calculatorView = new Calculator.view(this.calculatorModel, {
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
    this.calculatorModel._add(inputValue);
    // then
    equal( this.calculatorModel.getValue(), value + inputValue, "덧셈 OK ");
});

QUnit.test( "뺄셈 연산을 할 수 있다.", function() {
    // given
    var value = 0;
    var inputValue = 10;
    // when
    this.calculatorModel._subtract(inputValue);
    // then
    equal( this.calculatorModel.getValue(), value - inputValue, "뺄셈 OK ");
});

QUnit.test( "나누기 연산을 할 수 있다.", function() {
    // given
    var value = 0;
    var inputValue = 10;
    // when
    this.calculatorModel._divide(inputValue);
    // then
    equal( this.calculatorModel.getValue(), value / inputValue, "나누기 OK ");
});

QUnit.test( "곱하기 연산을 할 수 있다.", function() {
    // given
    var value = 0;
    var inputValue = 10;
    // when
    this.calculatorModel._multiply(inputValue);
    // then
    equal( this.calculatorModel.getValue(), value * inputValue, "곱하기 OK ");
});

QUnit.test( "소수점은 5자리까지 계산한다. (5자리이하 버림.)", function() {
    // given
    var testValue = 23;
    var expectedValue = 23;
    var resultValue;
    // when
    resultValue = this.calculatorModel._validate(testValue);
    // then
    equal(resultValue, expectedValue, "소수점 자리 - 5자리이하인 경우");

    // given
    testValue = 12345.12345;
    expectedValue = 12345.12345;
    // when
    resultValue = this.calculatorModel._validate(testValue);
    // then
    equal(resultValue, expectedValue, "소수점 자리 - 5자리인 경우");

    // given
    testValue = 23.1234568;
    expectedValue = 23.12345;
    // when
    resultValue = this.calculatorModel._validate(testValue);
    // then
    equal(resultValue, expectedValue, "소수점 자리 - 5자리이상인 경우");
});

QUnit.test( "R 키를 누를경우 초기화", function() {
    // given
    var expactedValue = 0;
    // when
    this.calculatorView._onClickRemove();
    // then
    equal(this.calculatorView._screen.value, expactedValue, "VIEW-초기화를 할 수 있다.");
    equal(this.calculatorModel.getValue(), expactedValue, "MODEL-초기화를 할 수 있다.");
});

QUnit.test( "1000단위 마다  ‘,’ 을 찍어준다.", function() {
    // given
    var testValue = 123456.789;
    var expactedValue = "123,456.789";
    // when
    this.calculatorView.displayScreenBy(testValue);
    // then
    equal(this.calculatorView._screen.value, expactedValue, "양수 가능(소수점 포함)");

    // given
    var testValue = -12345.0123;
    var expactedValue = "-12,345.0123";
    // when
    this.calculatorView.displayScreenBy(testValue);
    // then
    equal(this.calculatorView._screen.value, expactedValue, "음수 가능(소수점 포함)");

    // given
    var testValue = 0;
    var expactedValue = "0";
    // when
    this.calculatorView.displayScreenBy(testValue);
    // then
    equal(this.calculatorView._screen.value, expactedValue, "0 가능");
});


