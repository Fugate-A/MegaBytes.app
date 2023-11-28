const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectId } = require('mongodb');
const { app, client } = require('./server.js');
require('dotenv').config();
const { MongoClient } = require('mongodb');


const url = process.env.MongoURL;
//const client = new MongoClient(url); // Replace with the path to your MongoDB connection file

chai.use(chaiHttp);
const { expect } = chai;

let userID = '';
let recipeID = '';

describe('API Endpoints', () => {
  before(async () => {
    // Connect to MongoDB before running tests
    await client.connect();
  });

  after(async () => {
    // Close MongoDB connection after running tests
    await client.close();
  });

    describe('Add User', () => {
        it('should add a new user', async () => {
            const res = await chai
                .request(app)
                .post('/api/register')
                .send({
                    username: 'testuser',
                    password: 'testpassword',
                    email: 'test@example.com',
            });

            const data = res.body;
            userID = data.userID;

            
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('error').to.be.oneOf([null, '']);
        });
    });

    describe('Add Recipe', () => {
        it('should add a new recipe', async () => {
            const res = await chai
                .request(app)
                .post('/api/addRecipe')
                .send({
                    UserId: new ObjectId(userID),
                    RecipeName: "Mocha Test",
                    RecipeContents: "Mocha Test",
                    TagList: [0,1],
                    LikeList: [],
                    IsPublic: false,
                    CommentList: [],
                    AI_Generated: false, 
                });

                const data = res.body;
                recipeID = data.recipeID;


                expect(res).to.have.status(200);
                expect(res.body).to.have.property('error').to.be.oneOf([null, '']);
        });
    });

    describe('Delete Recipe', () => {
        it('should delete a recipe', async() => {
            const res = await chai
                .request(app)
                .post('/api/deleteRecipe')
                .send({
                    recipeId: new ObjectId(recipeID),
                });

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('error').to.be.oneOf([null, '']);

        });
    });

    describe('Delete User', () => {
        it('should delete a user', async() => {
            const res = await chai
                .request(app)
                .post('/api/deleteUser')
                .send({
                    userId: new ObjectId(userID),
                });

                expect(res).to.have.status(200);
                expect(res.body).to.have.property('error').to.be.oneOf([null, '']);

        });
    });
});