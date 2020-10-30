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
    it('API call to search for braveheart',()=> {
        cy.request({
                method: 'GET',
                url: 'http://localhost:5000/api/movies?genre&title=braveheart',
            }).then(function(res){
                expect(res.body)
            })
    })
    */
    it('API call to add and remove movie, checks inbetween if the amount increases/decreases', ()=> {
        cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/user?userName=testUser',
        }).then(function(res){
            expect(res.body).to.have.length(5)
        })

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
        cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/user?userName=testUser',
        }).then(function(res){
            expect(res.body).to.have.length(6)
        })
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/user/removeMovie/',
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