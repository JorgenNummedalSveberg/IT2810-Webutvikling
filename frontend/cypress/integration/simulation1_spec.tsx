// For at Typescript annser det som en modul
export {}

describe('Simulating a user who wants to log movies he watched', () => {
    Cypress.config({
        viewportWidth: 1300,
        viewportHeight: 800,
    })
    it('test, pwd works as a test user, l an confirms you are logged in', () => {
        cy.visit('http://localhost:3000/')
            .wait(1000);
        cy.get('#HeaderID > div.loginButtons > button').as("LoginButton")
            .should('have.text', "Log in/Sign up")
            .click();
        cy.get('#UsernameID')
            .should('have.text', "")
            .type('test');
        cy.get('#PasswordID')
            .should('have.text', "")
            .type('pwd');
        cy.get('#loginButtonID')
            .click();
        cy.get('@LoginButton')
            .should('have.text', "Log out");
    })
    it('Searches the movie to add to watched list. Confirms the amount of watched is +1', () => {
        cy.get('#searchbar')
            .should('have.value', "")
            .type('Black panther')
            .wait(1000);
        cy.get('#id_BlackPanther')
            .should('have.text', 'Black Panther')
            .click();
        cy.get('#watchButton > div').as('watchedNr')
            .then(($span) => {
                const number = parseInt($span.text())
                cy.get('@watchedNr')
                    .click({force: true})
                    .should('have.text', (number + 1).toString());
            })
    })
    it('Searches for another movie to add to watched', () => {
        cy.get('#watchButton > button')
            .should("be.disabled")
            .wait(1000);
        cy.get('#backButtonID')
            .click();
        cy.get('#searchbar').clear()
            .should('have.value', "")
            .type('the prestige')
            .wait(1000);
        cy.get('#id_ThePrestige')
            .click();
        cy.get('#watchButton > div')
            .click({force: true})
        cy.get('#backButtonID')
            .click();
        cy.get('#searchbar').clear();
    })
    it('confirm our added movies, and total of 7. then removes them, and confirms their deletion', () => {
        cy.get('#root > div > div.MainContent > div.ControlPanel > div.Checkbox > div > label').click();
        cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div').children().as('movieNr')
            .should('have.length', 7);
        cy.get('#id_ThePrestige')
            .should('exist')
            .click();
        cy.get('#removeButton').click();
        cy.get('#backButtonID').click()
        cy.get('#id_BlackPanther')
            .should('exist')
            .click();
        cy.get('#removeButton').click();
        cy.get('#backButtonID').click()
        cy.get('@movieNr')
            .should('have.length', 5);
    })
})
