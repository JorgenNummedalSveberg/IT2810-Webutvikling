




describe("Simulating a user who wants search and read detailes about the oldest horror movie", () => {
    it("Selects horror as genre", () => {
        cy.visit('http://localhost:3000/');
        cy.get('#dropdownmenu')
            .should('have.text', 'Select genre...')
            .click()
        cy.get('#Horror')
            .click()
        cy.get('#sortbutton3')
            .click()
            .click()                                                                //GERE
        cy.get('#root > div > div.MainContent > div.GridView > div.ui.centered.cards > a:first > ' +
            'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
           const year = parseInt($span.text().slice(7,11))
            cy.get('#root > div > div.MainContent > div.GridView > div.ui.centered.cards > a:nth-child(2) > ' +
                'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
                expect(parseInt($span.text().slice(7,11))).greaterThan(year)
            })
            cy.get('#root > div > div.MainContent > div.GridView > div.ui.centered.cards > a:nth-child(3) > ' +
                'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
                expect(parseInt($span.text().slice(7,11))).greaterThan(year)
            })
            cy.get('#root > div > div.MainContent > div.GridView > div.ui.centered.cards > a:nth-child(4) > ' +
                'div:nth-child(2) > div.description > div:nth-child(2)').then(($span) => {
                expect(parseInt($span.text().slice(7,11))).greaterThan(year)
            })
        })
        cy.get('#id_Dedjävulska')
            .should('have.text', 'De djävulska')
            .wait(500)
            .click()
    })
})