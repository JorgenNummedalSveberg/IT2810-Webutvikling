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
        }).then(res => {
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
        }).then(res => {
            expect(res.status).to.equal(200);
        })
    })

    it('A test call to search using title and genre ', () => {
        const braveHeartBody = {
            genre: '',
            title: 'Braveheart',
            sort: 'Name',
            desc: true,
            yearRange: [1900, 2020],
            scoreRange: [0, 10],
            user: '',
            page: 0
        }
        const familyBody = {
            genre: 'Family',
            title: '',
            sort: 'Name',
            desc: true,
            yearRange: [1900, 2020],
            scoreRange: [0, 10],
            user: '',
            page: 0
        }
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/movies/index',
            body: braveHeartBody
        }).then(res => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:5000/api/movies/',
                body: {ids: res.body.movies}
            }).then(res => {
                expect(res.body[0].title).to.deep.equal('Braveheart')
            })
        })
        cy.request({
            method: 'POST',
            url: 'http://localhost:5000/api/movies/index',
            body: familyBody
        }).then(res => {
            expect(res.body.movies.length).to.equal(13)
        })
    })
})