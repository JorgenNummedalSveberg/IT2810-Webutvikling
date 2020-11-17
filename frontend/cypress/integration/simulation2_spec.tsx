// For at Typescript annser det som en modul
export {}

describe("Simulating a user who wants search and read details about the highest rated History movie over 2 hours", () => {
    it("Selects genre, and compare the first 3 movies to check if the score is sorted correctly", () => {
        cy.visit('http://localhost:3000/');
        cy.get('[data-testid=genreSelector]').click();
        cy.get('[data-testid=HistoryOption]').should('exist').click().wait(1000);
        cy.get('[data-testid=sortbutton1]').click().wait(1000);
        cy.get('[data-testid=movieGrid]').children()
            .eq(0).as('firstMovie')
            .next().as('secondMovie')
            .next().as('thirdMovie');
        cy.get('@firstMovie').find('div').find('div').children().eq(2).find('text').as('firstRating');
        cy.get('@secondMovie').find('div').find('div').children().eq(2).find('text').as('secondRating');
        cy.get('@thirdMovie').find('div').find('div').children().eq(2).find('text').as('thirdRating');
        cy.get('@firstRating').invoke('text').then(parseFloat)
            .then(score1 => {
                cy.get('@secondRating').invoke('text').then(parseFloat)
                    .should(score2 => {
                        cy.get('@thirdRating').invoke('text').then(parseFloat)
                            .should(score3 => {
                                expect(score2).to.be.gte(score3)
                            })
                    })
                    .should(score2 => {
                        expect(score1).to.be.gte(score2)
                    })
            });
    })
})