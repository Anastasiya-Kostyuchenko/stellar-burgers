describe('Тестирование добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getAuth'
    );
    cy.visit('http://localhost:4000');
    cy.wait(['@getIngredients', '@getAuth']);
    cy.get('[data-cy="ingredient-bun"]').as('bunIngredients');
    cy.get('[data-cy="ingredient-main"]').as('mainIngredients');
    cy.get('[data-cy="ingredient-sauce"]').as('sauceIngredients');
  });

  it('Добавление булок и ингредиентов в заказ', function () {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.contains(
      'div.constructor-element span.constructor-element__text',
      'Краторная булка N-200i (верх)'
    ).should('exist');
    cy.contains(
      'div.constructor-element span.constructor-element__text',
      'Краторная булка N-200i (низ)'
    ).should('exist');

    cy.get('@mainIngredients').contains('Добавить').click();
    cy.contains(
      'div.constructor-element span.constructor-element__text',
      'Биокотлета из марсианской Магнолии'
    ).should('exist');

    cy.get('@sauceIngredients').contains('Добавить').click();
    cy.contains(
      'div.constructor-element span.constructor-element__text',
      'Соус Spicy-X'
    ).should('exist');

    cy.get('@mainIngredients').contains('Добавить').click();
    cy.contains(
      'div.constructor-element span.constructor-element__text',
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
    cy.visit('http://localhost:4000');
    cy.wait(['@getIngredients', '@getAuth']);
  });

  it('Открытие и закрытие модального окна ингредиента', function () {
    cy.get('[data-cy="ingredient-bun"]').first().click();

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-bun"]').first().click();

    cy.get('[data-cy="modal"]').should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get('[data-cy="modal"]').should('not.exist');
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

    cy.visit('http://localhost:4000/login');
    cy.wait(['@getIngredients', '@getAuth']);

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');

    cy.get('[data-cy="ingredient-bun"]').as('bunIngredients');
    cy.get('[data-cy="ingredient-main"]').as('mainIngredients');
    cy.get('[data-cy="ingredient-sauce"]').as('sauceIngredients');
  });
  it('Успешное создание заказа после авторизации', function () {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('@mainIngredients').contains('Добавить').click();
    cy.get('@sauceIngredients').contains('Добавить').click();
    cy.get('@mainIngredients').contains('Добавить').click();

    cy.get('[data-cy="onOrderClick"]').click();

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('[data-cy="order-number"]').should('contain', '42424');

    cy.get('[data-cy="modal-close"]').click();

    cy.get('[data-cy="top"]').contains('Выберите булки');
    cy.get('[data-cy="mid"]').contains('Выберите начинку');
    cy.get('[data-cy="bottom"]').contains('Выберите булки');
  });
});
