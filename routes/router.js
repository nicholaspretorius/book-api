var express = require('express');
var router = express.Router();
var Book = require('../models/bookModel.js');
var bookController = require('../controllers/bookController.js')(Book);

router.use('/books/:bookId', function(req, res, next){
    Book.findById(req.params.bookId, function(err, book){
        if(err) {
            res.status(500).json(err);
        } else if (!book) {
            res.status(404).json(err);
        } else {
            req.book = book;
            next();
        }
    });
});

// base route
router.get('/', function(req, res, next) {
    res.json({
        response: "Welcome to the Books and Authors API."
    })
});

// GET all books and query genre
router.get("/books", bookController.get);

// GET a book by id
router.get("/books/:bookId", function(req, res) {
    var returnBook = req.book.toJSON();
    returnBook.links = {};
    var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
    returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
    //res.status(200).json(req.book);
    res.status(200).json(returnBook);
    // Book.findById(req.params.bookId, function(err, book){
    //     if(err) {
    //         res.status(404).json(err);
    //     } else {
    //         res.status(200).json(book);
    //     }
    // });
});

// POST a book
router.post("/books", bookController.post);

// DELETE a book
router.delete("/books/:bookId", function(req, res, next){
    Book.findByIdAndRemove(req.params.bookId, function(err, book){
        //console.log("Book to be removed: ", book, " id to be deleted: ", req.params.bookId);
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(204).json(book);
        }
    });
});

// UPDATE a book
router.put("/books/:bookId", function(req, res, next){
    Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true }, function(err, book){
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(book);
        }
    });
});

// PATCH a book
router.patch("/books/:bookId", function(req, res, next) {
    if(req.body._id){
        delete require.body._id;
    }
    for(var key in req.body) {
        req.book[key] = req.body[key];
    }
    req.book.save(function(err){
        if(err) {
            res.status(500).json(err)
        } else {
            res.json(req.book);
        }
    });
});

module.exports = router;