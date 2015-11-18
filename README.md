# calculator
calculator using javascript

# Description
calculate like simple calculator of windows
계산기 대상 - window 컴퓨터, 일반용 계산기

src
    - Calculator.view - 뷰 로직을 담당하며 이벤트 시작 시점이다.
    - Calculator.model - 계산 로직을 담당하며 덧셈, 뺄셈, 곱셈, 나눗셈 수행가능하다.
    - Calculator.controller - 뷰와 모델의 연결하는 역할을 한다.

# TEST
using Quint

1. npm install (qunit 설치)
2. test/calculator.html 파일을 이용해 스펙 확인
(테스트는 스펙단위로 구성되었습니다.)