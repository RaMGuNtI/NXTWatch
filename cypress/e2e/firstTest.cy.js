describe('My First Test', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('label').should('contain', 'USERNAME');
    cy.get('label').should('be.visible');
    cy.get('input[placeholder="Username"]').type('rahul');
    cy.get('input[placeholder="Password"]').type('rahul@2021');
    cy.contains('Login').should('be.visible');
    cy.contains('button', 'Login').click();
    cy.intercept('POST', 'https://apis.ccbp.in/login').as('postLogin');
    cy.wait('@postLogin');
    cy.url().should('include', '/');
    cy.get('div[data-testid="loader"]').should('be.visible');
    cy.intercept('GET', 'https://apis.ccbp.in/videos/all?search=').as(
      'getHomePageVideos'
    );
    cy.wait('@getHomePageVideos');
    cy.get('div[data-testid="loader"]').should('not.exist');
    cy.get('div[data-testid="banner"]').should('be.visible');
    cy.contains('✖️').should('be.visible');
    cy.contains('✖️').click();
    cy.get('div[data-testid="banner"]').should('not.be.visible');
    cy.get('div[data-testid="banner"]').should('be.hidden');
    cy.get('input[placeholder="Search"]').type('Test');
    cy.get('button').contains('🔍').click();
    cy.get('h1').should('contain', 'No Results Found');
    cy.contains('Sehwag').should('not.exist');
    cy.get('div[data-testid="banner"]').should('be.visible');
    cy.get('p').contains('Trending').click();
    cy.get('h1').contains('Trending').should('be.visible');
    cy.get('a').should(
      'have.attr',
      'href',
      '/videos/ad9822d2-5763-41d9-adaf-baf9da3fd490'
    );
    cy.get('a').eq(0).click();
    cy.url().should('include', '/videos/ad9822d2-5763-41d9-adaf-baf9da3fd490');
    cy.get('p').contains('iB').should('be.visible');
    cy.get('b').contains('Save').click();
    cy.contains('Saved Videos').click();
    cy.get('h1').should('contain', 'Saved Videos');
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');
    cy.visit('http://localhost:5173/gaming');
    cy.url().should('include', '/login');

  });
});
