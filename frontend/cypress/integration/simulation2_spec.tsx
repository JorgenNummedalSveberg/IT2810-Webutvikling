// For at Typescript annser det som en modul
export {}

describe("Simulating a user who wants search and read details about the oldest horror movie with rating above 7", () => {
    it("Selects horror as genre, we use nth child to make sure it's the first result, compare year to the other movies", () => {
        cy.visit('http://localhost:3000/');
        cy.get('#dropdownmenu > div:first')
            .should('have.text', 'Select genre...')
            .click();
        cy.get('#Horror')
            .click();
        cy.get('#sortbutton3')
            .click()
            .click();
    })
    it('Check the amount of movies corresponds to filtering', () => {
        cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div').children()
            .should('have.length', 4);
        cy.get('#root > div > div.MainContent > div.ControlPanel > div:nth-child(3) > span > span:nth-child(7)')
            .click();
        cy.get('#root > div > div.MainContent > div.ControlPanel > div:nth-child(3) > span > span:nth-child(13)')
            .click();
        cy.get('#root > div > div.MainContent > div.ControlPanel > div:nth-child(3) > span > span:nth-child(18)')
            .click();
        cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div').children()
            .should('have.length', 3);
    })
    it('Check if the movies are sorted from oldest to latest', () => {
        cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div > div:nth-child(1) > a >' +
            'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
            const year = parseInt($span.text().slice(7, 11));
            cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div > div:nth-child(2) > a >' +
                'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
                expect(parseInt($span.text().slice(7, 11))).greaterThan(year);
            })
            cy.get('#root > div > div.MainContent > div.GridView > div:nth-child(2) > div > div:nth-child(3) > a >' +
                'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
                expect(parseInt($span.text().slice(7, 11))).greaterThan(year);
            })
        })
    })
    it('Check the last movie for correct information, and popup', () => {
        cy.get('#id_Dedjävulska')
            .should('have.text', 'De djävulska')
            .wait(500)
            .click();
    })
})