// For at Typescript annser det som en modul

export {}

describe("Simulating a user on mobile who wants to search up the shortest movie between 1985 and 2005", () => {
    it('Filters by year range and sorts by shortes movies first', () => {
        cy.viewport(1000, 800)
        cy.visit('http://localhost:3000/').wait(1000);

        // Opens filter and inputs 1985 and 2005 to the slider
        cy.get('[data-testid=FilterButton]').click().wait(200);
        cy.get('[data-testid=yearSlider]').find('[data-index=11]').eq(1).click();
        cy.get('[data-testid=yearSlider]').find('[data-index=17]').eq(1).click();
        cy.get('[data-testid=yearSlider]').find('[data-index=21]').eq(1).click().wait(1000);
        cy.get('[data-testid=mobileFilterClose]').click();

        // Opens sort menu and sorts by length ascending
        cy.get('[data-testid=SortButton]').click().wait(200);
        cy.get('[data-testid=sortbutton2]').eq(1).click().click().wait(1000);
        cy.get('[data-testid=mobileSortClose]').click().wait(200);
    })
    it('Checks that all the movies are within the year range', () => {
        cy.checkRange(1985, 2005)
    })
})