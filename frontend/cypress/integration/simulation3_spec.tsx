// For at Typescript annser det som en modul
export {}

describe("Simulating API calls, and checks if the status response is correct. And database updates accordingly", () => {
    Cypress.config({
        viewportWidth: 1200,
        viewportHeight: 800,
    })
    it('Post/get calls to add/remove movies', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/user?userName=test&password=pwd',
        }).then(function (res) {
            expect(res.body).to.have.length(10)
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
        }).then(function (res) {
            expect(res.status).to.equal(200);
        })
    })
    it('A test call to search using title and genre ', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/movies?genre&title=braveheart',
        }).then(function (res) {
            expect(res.body[0].title).to.deep.equal('Braveheart')
        })
        cy.request({
            method: 'GET',
            url: 'http://localhost:5000/api/movies?genre=Thriller&title=',
        }).then(function (res) {
            expect(res.body.length).to.deep.equal(37)
        })
    })
})