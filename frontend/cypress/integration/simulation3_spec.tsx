// For at Typescript annser det som en modul
export {}

describe("Simulating a user who wants search and read details about the oldest horror movie with rating above 7", () => {
    Cypress.config({
        viewportWidth: 400,
        viewportHeight: 800,
    })
    it("asd", () => {
        cy.visit('http://localhost:3000/');
        cy.get('#burgerID').as('burgerButton')
            .click();
    })

})