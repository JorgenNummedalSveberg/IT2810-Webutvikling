import cypress from "cypress";

describe('Simulating a user who wants to log a movie he watched', () => {
    Cypress.config({
        viewportWidth: 1300,
        viewportHeight: 800,
    })
    it('test, pwd works as a test user, logs an confirms you are logged in', () => {
        cy.visit('http://localhost:3000/')
            .wait(1000);
        cy.get('#HeaderID > button').as("LoginButton")
            .should('have.text', "Log in/Sign up")
            .click();
        cy.get('#UsernameID')
            .should('have.text', "")
            .type('test')
        cy.get('#PasswordID')
            .should('have.text', "")
            .type('pwd')
        cy.get('#submitButtonID') //submitButtonID //loginButtonID
            .click()
        cy.get('@LoginButton')
            .should('have.text', "Log out")
    })
    it('Searches the movie to add to watched list. Confirms the amount of watched is +1', () => {
        cy.get('#searchbar')
            .should('have.value', "")
            .type('Black panther')
            .wait(1500);
        cy.get('#id_BlackPanther')
            .should('have.text', 'Black Panther')
            .click();
        cy.get('#watchButton > div').as('watchedNr')
            .then(($span) => {
                const number = parseInt($span.text())
                cy.get('@watchedNr')
                    .click()
                    .should('have.text', (number + 1).toString());
            })
    })
    it('Searches for another movie to add to watched', () => {
        cy.get('#watchButton > button')
            .should("be.disabled")
            .wait(1000);
        cy.get('#backButtonID')
            .click()
        cy.get('#searchbar').clear()
            .should('have.value', "")
            .type('the prestige')
            .wait(1500);
        cy.get('#id_ThePrestige')
            .click();
        cy.get('#watchButton > div')
            .click();
        cy.get('#backButtonID')
            .click()
    })
    it('clear searchbar, and ')
})
