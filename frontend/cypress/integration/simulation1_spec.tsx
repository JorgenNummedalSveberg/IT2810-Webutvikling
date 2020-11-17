// For at Typescript annser det som en modul
export {}

describe('Simulating a user who wants to log movies he watched', () => {
    it('test, pwd works as a test user, l an confirms you are logged in', () => {
        cy.viewport(1920, 1080)
        cy.visit('http://localhost:3000/').wait(1000);
        cy.get('[data-testid=loginButton]')
            .should('have.text', "Log in/Sign up")
            .click().wait(200);
        cy.get('[data-testid=UsernameID]').find('input')
            .should('have.text', "")
            .type('test');
        cy.get('[data-testid=PasswordID]').find('input')
            .should('have.text', "")
            .type('pwd');
        cy.get('[data-testid=loginButtonID]')
            .click().wait(1000);
        cy.get('[data-testid=logoutButton]')
            .should('have.text', "Log out");
    })
    it('Searches the movie to add to watched list. Confirms that watched button is disabled.', () => {
        cy.viewport(1920, 1080)
        cy.get('[data-testid=searcher]')
            .should('have.value', "")
            .type('Black panther').wait(1000);
        cy.get('[data-testid=BlackPanther]')
            .should('contain.text', 'Black Panther')
            .click().wait(200);
        cy.get('[data-testid=watchButton]').as('watchedNr')
            .click({force: true})
            .should('be.disabled').wait(200);
        cy.get('[data-testid=popupClose]')
            .click().wait(200);
    })
    it('Searches for another movie to add to watched', () => {
        cy.viewport(1920, 1080)
        cy.get('[data-testid=searcher]').clear()
            .should('have.value', "")
            .type('the prestige').wait(1000);
        cy.get('[data-testid=ThePrestige]')
            .should('exist')
            .click().wait(200);
        cy.get('[data-testid=watchButton]')
            .click({force: true});
        cy.get('[data-testid=popupClose]')
            .click().wait(200);
        cy.get('[data-testid=searcher]').clear().wait(1000);
    })
    it('Confirm our added movies, and count a total of 10. Then removes the 2 we added, and confirms their deletion', () => {
        cy.get('[data-testid=myMoviesCheckbox]')
            .click().wait(1000);
        cy.get('[data-testid=movieGrid]').children().as('movieNr')
            .should('have.length', 10);
        cy.get('[data-testid=ThePrestige]')
            .should('exist')
            .click().wait(200);
        cy.get('[data-testid=removeButton]')
            .click({force: true});
        cy.get('[data-testid=popupClose]')
            .click().wait(200);
        cy.get('[data-testid=BlackPanther]')
            .should('exist')
            .click().wait(200);
        cy.get('[data-testid=removeButton]')
            .click({force: true});
        cy.get('[data-testid=popupClose]')
            .click().wait(200);
        cy.get('@movieNr')
            .should('have.length', 8);
    })
})
