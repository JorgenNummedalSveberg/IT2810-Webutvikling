// For at Typescript annser det som en modul
export {}

describe("Simulating a user who wants search and read details about the oldest horror movie with rating above 7", () => {
    Cypress.config({
        viewportWidth: 400,
        viewportHeight: 800,
    })
    /*it('testUser, pwd works as a test user, an confirms you are logged in', () => {
        cy.visit('http://localhost:3000/')
            .wait(1000);
        cy.get('#HeaderID > div.loginButtons > button').as("LoginButton")
            .should('have.text', "Log in/Sign up")
            .click();
        cy.get('#UsernameID')
            .should('have.text', "")
            .type('testUser')
        cy.get('#PasswordID')
            .should('have.text', "")
            .type('pwd')
        cy.get('#loginButtonID')
            .click()
        cy.get('@LoginButton')
            .should('have.text', "Log out")
    })*/
    /*
    it('asd', ()=> {
        cy.get('#burgerID').as('burgerButton')
            .click();
    })*/
    /*it('asd', ()=> {
        cy.server()           // enable response stubbing
        cy.route({
            method: 'GET',      // Route all GET requests
            url: 'http://localhost:5000/api/user?userName=test',    // that have a URL that matches '/users/!*'
            response: []        // and force the response to be: []
        }).then(console.log)
        //cy.route('GET', 'http://localhost:5000/api/user?userName=test')
    })*/
    it('asd', ()=> {
        /*cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/user?userName=test',
        }).then(function(res){
            expect(res.body).to.have.length(10)
        })http://localhost:5000/api/movies?genre&title=braveheart
            /*cy.request({
                method: 'GET',
                url: 'http://localhost:5000/api/movies?genre&title=braveheart',
            }).then(function(res){
                expect(res.body)
            })
        */
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/user/addMovie/',
            body: {
                userName: "testUser",
                movieId: "5f90456a9d7b1248082beebe",
                },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res){
            expect(res.status).to.equal(200);
        })
    })
//Dark knight: 5f90456a9d7b1248082beebe
//Inception:       5f90456a9d7b1248082beec8
})