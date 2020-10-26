





describe('Simulating a user who wants to log a movie he watched', () => {
    it('Search for movie and confirms it is the correct one', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input').should('have.value', "")
            .type('Black panther');
        cy.get('#id_BlackPanther')
            .should('have.text', 'Black Panther').click();
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.label')
            .then(($span) => {
                const number = parseInt($span.text())
                cy.get('.ui.labeled.button:not([class*="left labeled"])>.label')
                    .click()
                    .should('have.text', (number+1).toString())
            })
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.button').should("be.disabled")
        cy.reload()
        cy.get('input')
            .type('Black Panther');
        cy.get('.ui.card > .content > .header:not(.ui), .ui.cards > .card > .content > .header:not(.ui)')
            .click();
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.button').should("be.disabled")
    })
    /*it("Check that the movie is logged (not clickable)", ()=> {
        cy.reload()
        cy.get("input")
            .type("Black Panther");
        cy.get(".ui.card > .content > .header:not(.ui), .ui.cards > .card > .content > .header:not(.ui)")
            .click();
        cy.get('.ui.labeled.button:not([class*="left labeled"])>.button').should("be.disabled")
    })*/
})
