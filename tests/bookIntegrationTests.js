var should = require('should'),
    request = require('supertest'),
    app = ('../app/js'),
    mongoose = require('mongoose'),
    Book = require('../models/bookModel.js'),
    agent = request.agent(app);

describe('Book CRUD Test', function(){
    it('Should allow a bookg to be posted and return a read and _id', function(done){
        var bookPost = { title: "New Book", author: "John Doe", genre: "Fiction" };
        console.log("Book Post: ", bookPost);

        agent.post('/api/books')
            .send(bookPost)
            //.expect(201)
            .end(function(err, res){
                console.log("Results: ", res);
                // res.body.read.should.not.equal(false);
                // res.body.should.have.property('_id');
                done();
            })
    });

    afterEach(function(done){
        Book.remove().exec();
        done();
    });
});