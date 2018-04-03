var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Book = function(book){
                this.save = function(){}
            };

            var req = {
                body: {
                    author: 'John Doe'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../controllers/bookController.js')(Book);
            bookController.post(req, res);
            
            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status );
            res.send.calledWith('Title is required').should.equal(true);
            console.log("Res: ", res.status);
        })
    });
});