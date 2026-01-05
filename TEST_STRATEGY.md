## 1. System Under Test (SUT)

The System Under Test (SUT) for this project is **Sauce Demo**, a publicly available demo web application provided by Sauce Labs.

- URL: https://www.saucedemo.com
- Application type: Web-based e-commerce demo application
- Primary purpose: Demonstrate end-to-end user flows such as authentication, product browsing, cart management, and checkout

This project focuses on validating the core user journeys and critical risks commonly found in real-world web applications, rather than testing Sauce Demo as a production system.



## 2. Test Scope

The scope of this test automation project is intentionally limited to high-value user-facing functionalities that are critical to business workflows.

### In Scope
The following areas are covered by automated tests:

- User authentication (login and error handling)
- Product inventory display and sorting
- Cart add/remove operations
- Checkout flow including form validation and order completion
- Core smoke and regression paths

### Out of Scope
The following areas are intentionally excluded from this project:

- Visual regression or pixel-level UI validation
- Performance, load, or stress testing
- Security or penetration testing
- Cross-browser and mobile viewport testing (handled separately)

These exclusions are made to keep the test suite focused, maintainable, and aligned with the primary goal of demonstrating a practical, risk-based automation strategy.



## 3. Risk-based Prioritization

Test cases in this project are prioritized based on potential business impact and failure risk, rather than purely on functional coverage.

The prioritization strategy follows these principles:

1. Authentication is treated as the highest-risk area, as failure in login functionality blocks all downstream user actions.
2. Checkout-related flows are prioritized next due to their direct impact on transaction completion and user trust.
3. Cart state management is considered a medium-to-high risk area because it is prone to regression and data consistency issues.
4. Inventory display and sorting are validated as representative UI logic that frequently breaks due to frontend changes.

This approach ensures that the most critical user journeys are validated first, providing maximum risk reduction with a limited and maintainable test suite.



## 4. Test Design Principles

The automated tests in this project are designed with maintainability, readability, and stability as primary goals.

The following principles guide test implementation:

- End-to-end tests focus only on critical user journeys and are intentionally kept minimal.
- Test cases are designed to be independent and do not rely on execution order.
- Assertions validate observable system behavior rather than implementation details.
- Stable selectors such as data-test attributes are preferred to reduce flakiness.
- Test data is defined explicitly within the test to avoid hidden dependencies.

These principles help ensure that the test suite remains reliable, easy to understand, and cost-effective to maintain over time.



## 5. Stability & Flakiness Mitigation Strategy

Test stability is treated as a first-class concern in this project, as flaky tests reduce trust in automation and increase maintenance costs.

The following measures are applied to minimize flakiness:

- Automatic waiting mechanisms provided by Playwright are leveraged instead of explicit sleeps.
- A limited retry strategy is applied to failed tests to distinguish genuine defects from transient issues.
- Execution traces are collected on the first retry to support root cause analysis.
- Screenshots and videos are captured only on failure to preserve execution evidence without excessive noise.
- Stable selectors are consistently used to reduce sensitivity to UI changes.

These practices help ensure that failures are actionable, reproducible, and supported by sufficient diagnostic information.



## 6. Reporting & Evidence Strategy

Test execution results are treated as deliverables rather than byproducts of automation.

This project uses the following reporting and evidence strategy:

- Playwright HTML reports are generated for every execution to provide a clear overview of test outcomes.
- Failed test runs include supporting artifacts such as screenshots, videos, and execution traces.
- Evidence artifacts are preserved only for failed executions to keep the repository clean and focused.
- Reports and artifacts are designed to be easily shared with non-technical stakeholders when required.

This approach ensures that test results are transparent, verifiable, and suitable for both technical debugging and cross-team communication.




TEST_STRATEGY.md (한글 번역본)
1. 테스트 대상 시스템 (System Under Test, SUT)

본 프로젝트의 테스트 대상 시스템은 Sauce Labs에서 제공하는 공개 데모 웹 애플리케이션 Sauce Demo이다.

URL: https://www.saucedemo.com

애플리케이션 유형: 웹 기반 이커머스 데모 서비스

목적: 로그인, 상품 탐색, 장바구니, 결제 등 일반적인 사용자 흐름을 제공하는 테스트용 애플리케이션

본 프로젝트는 Sauce Demo 자체를 실제 운영 서비스로 검증하는 것을 목표로 하지 않는다.
대신, 실무 환경에서 자주 발생하는 핵심 사용자 여정과 주요 리스크를 자동화 테스트로 검증하는 데 목적이 있다.




2. 테스트 범위 (Test Scope)

본 테스트 자동화 프로젝트의 범위는 비즈니스 흐름에 직접적인 영향을 주는 사용자 기능으로 의도적으로 제한되어 있다.

포함 범위 (In Scope)

다음 기능은 자동화 테스트 대상에 포함한다.

사용자 인증 기능(로그인 성공 및 실패 처리)

상품 목록 화면 표시 및 정렬 기능

장바구니 담기 및 제거 기능

입력값 검증을 포함한 결제 흐름 및 주문 완료

핵심 사용자 경로에 대한 스모크 테스트 및 회귀 테스트

제외 범위 (Out of Scope)

다음 항목은 본 프로젝트 범위에서 의도적으로 제외한다.

픽셀 단위 UI 검증 또는 비주얼 리그레션 테스트

성능, 부하, 스트레스 테스트

보안 또는 침투 테스트

다중 브라우저 및 모바일 환경 테스트

이러한 범위 설정은 테스트를 과도하게 확장하지 않고, 유지보수가 가능하며, 리스크 중심 자동화 전략을 명확히 보여주기 위함이다.




3. 리스크 기반 우선순위 설정 (Risk-based Prioritization)

본 프로젝트의 테스트 케이스 우선순위는 단순한 기능 커버리지가 아닌, 장애 발생 시 비즈니스 영향도와 실패 가능성을 기준으로 설정하였다.

우선순위 기준은 다음과 같다.

인증 기능은 로그인 실패 시 모든 사용자 흐름이 차단되므로 최상위 리스크 영역으로 간주한다.

결제 흐름은 주문 완료 및 사용자 신뢰와 직결되기 때문에 두 번째 우선순위로 설정한다.

장바구니 상태 관리는 회귀 이슈와 데이터 불일치가 자주 발생하는 영역으로 중~고위험 영역으로 분류한다.

상품 목록 표시 및 정렬 기능은 프론트엔드 변경 시 오류가 발생하기 쉬운 대표적인 UI 로직으로 검증 대상에 포함한다.

이와 같은 접근 방식은 제한된 테스트 수로도 가장 중요한 사용자 경로를 우선적으로 검증하여 효과적인 리스크 감소를 가능하게 한다.




4. 테스트 설계 원칙 (Test Design Principles)

본 프로젝트의 자동화 테스트는 유지보수성, 가독성, 안정성을 핵심 목표로 설계되었다.

테스트 구현은 다음 원칙을 따른다.

종단 간(E2E) 테스트는 핵심 사용자 흐름에만 집중하며 최소한의 범위로 유지한다.

각 테스트 케이스는 실행 순서에 의존하지 않도록 독립적으로 설계한다.

내부 구현 방식이 아닌, 사용자가 실제로 관찰할 수 있는 시스템 동작을 기준으로 검증한다.

UI 변경에 따른 테스트 실패를 최소화하기 위해 data-test 속성과 같은 안정적인 셀렉터를 우선 사용한다.

테스트 데이터는 테스트 코드 내부에서 명확하게 정의하여 숨겨진 의존성을 제거한다.

이러한 원칙은 테스트 스위트의 신뢰성을 높이고, 장기적인 유지보수 비용을 줄이는 데 목적이 있다.




5. 안정성 및 플래키 테스트 대응 전략

(Stability & Flakiness Mitigation Strategy)

본 프로젝트에서는 테스트 안정성을 핵심 요소로 간주한다.
플래키 테스트는 자동화에 대한 신뢰를 떨어뜨리고 유지보수 비용을 증가시키기 때문이다.

이를 최소화하기 위해 다음 전략을 적용하였다.

명시적인 대기 시간(sleep) 대신 Playwright의 자동 대기 메커니즘을 활용한다.

일시적인 환경 요인과 실제 결함을 구분하기 위해 제한적인 재시도 전략을 사용한다.

첫 번째 재시도 시 실행 트레이스를 수집하여 원인 분석이 가능하도록 한다.

불필요한 산출물을 줄이기 위해 실패한 테스트에 대해서만 스크린샷과 비디오를 저장한다.

UI 변경에 민감하지 않도록 안정적인 셀렉터를 일관되게 사용한다.

이러한 전략을 통해 테스트 실패는 재현 가능하고, 분석 가능하며, 즉각적인 대응이 가능한 상태로 유지된다.




6. 리포팅 및 증거 관리 전략

(Reporting & Evidence Strategy)

본 프로젝트에서는 테스트 실행 결과를 단순한 자동화 결과물이 아닌, 명확한 산출물로 취급한다.

이를 위해 다음과 같은 리포팅 및 증거 관리 전략을 적용하였다.

모든 테스트 실행에 대해 Playwright HTML 리포트를 생성하여 결과를 직관적으로 확인할 수 있도록 한다.

테스트 실패 시 스크린샷, 비디오, 실행 트레이스 등 분석에 필요한 증거 자료를 함께 수집한다.

저장소의 가독성을 유지하기 위해 실패한 실행에 대해서만 증거 산출물을 보존한다.

생성된 리포트와 증거 자료는 필요 시 비기술 직군과도 공유할 수 있도록 구성한다.

이러한 접근 방식은 테스트 결과의 투명성과 신뢰성을 높이고, 기술적 디버깅뿐 아니라 팀 간 커뮤니케이션에도 효과적으로 활용될 수 있다.