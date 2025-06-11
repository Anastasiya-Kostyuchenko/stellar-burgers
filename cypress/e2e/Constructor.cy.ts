const SELECTOR_INGREDIENT_BUN = '[data-cy="ingredient-bun"]';
const SELECTOR_MODAL = '[data-cy="modal"]';
const SELECTOR_CONSTRUCTOR_TEXT =
  'div.constructor-element span.constructor-element__text';

describe('Тестирование добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getAuth'
    );
    cy.visit('/');
    cy.wait(['@getIngredients', '@getAuth']);
    cy.get(SELECTOR_INGREDIENT_BUN).as('bunIngredients');
    cy.get('[data-cy="ingredient-main"]').as('mainIngredients');
    cy.get('[data-cy="ingredient-sauce"]').as('sauceIngredients');
  });

  it('Добавление булок и ингредиентов в заказ', function () {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.contains(
      SELECTOR_CONSTRUCTOR_TEXT,
      'Краторная булка N-200i (верх)'
    ).should('exist');
    cy.contains(
      SELECTOR_CONSTRUCTOR_TEXT,
      'Краторная булка N-200i (низ)'
    ).should('exist');

    cy.get('@mainIngredients').contains('Добавить').click();
    cy.contains(
      SELECTOR_CONSTRUCTOR_TEXT,
      'Биокотлета из марсианской Магнолии'
    ).should('exist');

    cy.get('@sauceIngredients').contains('Добавить').click();
    cy.contains(SELECTOR_CONSTRUCTOR_TEXT, 'Соус Spicy-X').should('exist');

    cy.get('@mainIngredients').contains('Добавить').click();
    cy.contains(
      SELECTOR_CONSTRUCTOR_TEXT,
      'Биокотлета из марсианской Магнолии'
    ).should('exist');
  });
});

describe('Тестирование работы модального окна для ингредиента', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getAuth'
    );
    cy.visit('/');
    cy.wait(['@getIngredients', '@getAuth']);
  });

  it('Открытие и закрытие модального окна ингредиента', function () {
    cy.get(SELECTOR_INGREDIENT_BUN).first().click();
    cy.get(SELECTOR_MODAL).should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get(SELECTOR_MODAL).should('not.exist');
    cy.get(SELECTOR_INGREDIENT_BUN).first().click();
    cy.get(SELECTOR_MODAL).should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(SELECTOR_MODAL).should('not.exist');
  });
});

describe('Тестирование создания заказа', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getAuth'
    );
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' }).as(
      'login'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/');
    cy.wait(['@getIngredients', '@getAuth']);
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');

    cy.get(SELECTOR_INGREDIENT_BUN).as('bunIngredients');
    cy.get('[data-cy="ingredient-main"]').as('mainIngredients');
    cy.get('[data-cy="ingredient-sauce"]').as('sauceIngredients');
  });

  it('Успешное создание заказа после авторизации', function () {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('@mainIngredients').contains('Добавить').click();
    cy.get('@sauceIngredients').contains('Добавить').click();
    cy.get('@mainIngredients').contains('Добавить').click();

    cy.get('[data-cy="onOrderClick"]').click();
    cy.get(SELECTOR_MODAL).should('exist');
    cy.get('[data-cy="order-number"]').should('contain', '42424');
    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="top"]').contains('Выберите булки');
    cy.get('[data-cy="mid"]').contains('Выберите начинку');
    cy.get('[data-cy="bottom"]').contains('Выберите булки');
  });
});
