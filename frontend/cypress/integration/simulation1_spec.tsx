import cypress from "cypress";

describe('Simulating a user who wants to log a movie he watched', () => {
    it('Search for movie and confirms it is the correct one', () => {
        cy.viewport(1300,800)
        cy.visit('http://localhost:3000/');
        cy.get('#searchbar').should('have.value', "")
            .type('Black panther')
             .wait(1500);
        cy.get('#id_BlackPanther')
            .should('have.text', 'Black Panther')
            .click();
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.label')
            .then(($span) => {
                const number = parseInt($span.text())
                cy.get('.ui.labeled.button:not([class*="left labeled"])>.label')
                    .click()
                    .should('have.text', (number+1).toString())
            })
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.button').should("be.disabled")
            .wait(1000);
        cy.reload()
        cy.get('#searchbar')
            .type('Black Panther')
            .wait(1500);
        cy.get('.ui.card > .content > .header:not(.ui), .ui.cards > .card > .content > .header:not(.ui)')
            .click();
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.button').should("be.disabled")
    })
})
