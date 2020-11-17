// For at Typescript annser det som en modul
export {}

describe("Simulating a user on mobile who wants to search up the shortest movie between 1990 and 2005", () => {
    it('testUser, pwd works as a test user, an confirms you are logged in', () => {
        cy.visit('http://localhost:3000/')
            .wait(1000);
        cy.get('#root > div > button').as('filterButton')
            .click();
        cy.get('#root > div > div.MainContent > div.MobilePanel > div:nth-child(4) > span > span:nth-child(9)').click();
        cy.get('#root > div > div.MainContent > div.MobilePanel > div:nth-child(4) > span > span:nth-child(13)').click();
        cy.get('#root > div > div.MainContent > div.MobilePanel > div:nth-child(4) > span > span:nth-child(18)').click();
        cy.get('#root > div > div.MainContent > div.MobilePanel > div:nth-child(4) > span > span:nth-child(22)').click();
        cy.get('#root > div > div.MainContent > div.MobilePanel > div:nth-child(4) > span > span:nth-child(25)').click();
        cy.get('#root > div > button').as('filterButton')
            .click();
        cy.get('#burgerID').click();
        cy.get('#sortbutton2').click().click();
        cy.get('#burgerID').click();
        cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div > div:nth-child(1) > a > div.extra.content > div > div:nth-child(1)')
            .should('have.text', "1h21m");
    })
})