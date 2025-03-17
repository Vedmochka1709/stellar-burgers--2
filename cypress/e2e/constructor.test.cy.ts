describe('Конструктор бургера', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', (req) => {
            console.log('Intercepted request:', req);
            req.reply({ fixture: 'ingredients.json' });
        }).as('getIngredients');
        cy.visit('/');
        /*cy.wait('@getIngredients');*/
        cy.wait('@getIngredients').then((interception) => {
            if (interception) {
                console.log('Request to getIngredients completed.');
            } else {
                console.error('Request to getIngredients did not occur.');
            }
        });
    });


    it('Добавление булки в конструктор', () => {

        const addButton =  cy.get('[data-cy=bun]').contains('Добавить');
       
        const constructorBunTop = cy.get('[data-cy=constructor-bun-top]');
        const constructorBunBottom = cy.get('[data-cy=constructor-bun-bottom]');

        addButton.click();

        constructorBunTop.contains('bun (верх)').should('exist');
        constructorBunBottom.contains('bun (низ)').should('exist');
    })

   /* it('Добавление ингредиента в конструктор', () => {
       
        const constructorIngredient = cy.get('[data-cy=constructor-ingredient]');

        addButton.click();

        constructorIngredient.contains('ingredient').should('exist');
    })*/

    /*it('Работа модальных окон', () => {
        // Открытие модального окна ингредиента
        cy.get('[data-testid="ingredient-bun1"]').click(); // Замените селектор на ваш
        cy.get('[data-testid="modal"]').should('be.visible'); // Проверяем, что модальное окно открыто

        // Закрытие модального окна по клику на крестик
        cy.get('[data-testid="modal-close"]').click(); // Замените селектор на ваш
        cy.get('[data-testid="modal"]').should('not.exist');

        // Открытие модального окна снова
        cy.get('[data-testid="ingredient-bun1"]').click();
        cy.get('[data-testid="modal"]').should('be.visible');

        // Закрытие модального окна по клику на оверлей
        cy.get('[data-testid="modal-overlay"]').click(); // Замените селектор на ваш
        cy.get('[data-testid="modal"]').should('not.exist');
    });*/   

})

/*describe('add ingredients to constructor', function () {
  
    it('should add ingredients ', () => {
      cy.get('[data-cy=mains-ingredient]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredient]').contains('Добавить').click();
  
      cy.get('[data-cy=constructor-ingredients]')
        .contains('ingredient2')
        .should('exist');
  
      cy.get('[data-cy=constructor-ingredients]')
        .contains('ingredient4')
        .should('exist');
    });
  });
  
  describe('ingredient details modal test', function () {
    beforeEach(function () {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('/');
    });
  
    it('should open modal', () => {
      cy.contains('Детали ингредиента').should('not.exist');
      cy.contains('ingredient1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('#modals').contains('ingredient1').should('exist');
    });
  
    it('should close modal on button click', () => {
      cy.contains('ingredient1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('#modals button[aria-label="Закрыть"]').click();
      cy.contains('Детали ингредиента').should('not.exist');
    });
  
    it('should close modal on overlay click', () => {
      cy.contains('ingredient1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal-overlay]').click('right', { force: true });
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
  
  describe('order modal test', function () {
    beforeEach(function () {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
        'ingredients'
      );
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
  
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
  
      window.localStorage.setItem(
        'accessToken',
        JSON.stringify('test-accessToken')
      );
  
      cy.visit('/');
    });
  
    afterEach(function () {
      cy.clearLocalStorage();
    });
  
    it('should make order', function () {
      cy.get('[data-cy=bun-ingredient]').contains('Добавить').click();
      cy.get('[data-cy=mains-ingredient]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredient]').contains('Добавить').click();
      cy.get('[data-cy=make-order] button').click();
  
      cy.wait('@order')
        .its('request.body')
        .should('deep.equal', {
          ingredients: ['1', '2', '4', '1']
        });
  
      cy.get('[data-cy=order-details]').contains('654321').should('exist');
      cy.get('#modals button[aria-label="Закрыть"]').click();
      cy.get('[data-cy=order-details]').should('not.exist');
    });
  
    it('should clear constructor', () => {
      cy.get('[data-cy=constructor-bun-1]').should('not.exist');
      cy.get('[data-cy=constructor-bun-2]').should('not.exist');
      cy.get('[data-cy=constructor-ingredients]').should('not.exist');
    });
  });*/