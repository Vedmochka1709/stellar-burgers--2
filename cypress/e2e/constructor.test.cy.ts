describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление булки в конструктор', () => {
    cy.get('[data-cy=bun]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-top]')
      .contains('bun (верх)')
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains('bun (низ)')
      .should('exist');
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.get('[data-cy=main]').contains('Добавить').click();
    cy.get('[data-cy=sauce]').contains('Добавить').click();

    cy.get('[data-cy=constructor-ingredient]')
      .contains('sauce')
      .should('exist');
    cy.get('[data-cy=constructor-ingredient]').contains('main').should('exist');
  });
});

describe('Работа модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('bun').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('bun').should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.contains('bun').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-btn-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.contains('bun').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json'
    }).as('user');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json'
    }).as('order');

    cy.setCookie('refreshToken', 'test-refreshToken');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');

    cy.wait('@user');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(function () {
    cy.clearCookies();
  });

  it('Цикл создания заказа', function () {
    cy.get('[data-cy=bun]').contains('Добавить').click();
    cy.get('[data-cy=main]').contains('Добавить').click();
    cy.get('[data-cy=sauce]').contains('Добавить').click();
    cy.contains('Оформить заказ').click();

    cy.contains('125793').should('exist');
    cy.get('[data-cy=modal-btn-close]').click();
    cy.contains('125793').should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
