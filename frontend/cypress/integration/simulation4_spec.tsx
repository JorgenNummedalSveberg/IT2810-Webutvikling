// For at Typescript annser det som en modul
export {}

describe("Simulating a user who wants search and read details about the oldest horror movie with rating above 7", () => {
    Cypress.config({
        viewportWidth: 400,
        viewportHeight: 800,
    })
    it('testUser, pwd works as a test user, an confirms you are logged in', () => {
        cy.visit('http://localhost:3000/')
            .wait(1000);
        cy.get('#HeaderID > div.loginButtons > button').as("LoginButton")
            .should('have.text', "Log in/Sign up")
            .click();
        cy.get('#UsernameID')
            .should('have.text', "")
            .type('testMobil')
        cy.get('#PasswordID')
            .should('have.text', "")
            .type('pwd')
        cy.get('#loginButtonID')
            .click()
        cy.get('@LoginButton')
            .should('have.text', "Log out")
    })
})