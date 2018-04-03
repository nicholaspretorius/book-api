var bookController = function(Book){

    var get = function(req, res, next){    
        var query = {};
    
        if(req.query.genre) {
            query.genre = req.query.genre;
        }
    
        Book.find(query, function(err, books){
            if(err) {
                res.status(500);
                res.send(err);
            } else {
                var returnBooks = [];
                books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.status(200);
                res.json(returnBooks);
            }
        });
    };

    var post = function (req, res, next) {    
        var book = new Book(req.body);

        if(!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            //var book = Book(req.body);
            //console.log("Book: ", req.body);
            book.save(function(err, book){
                if(err) {
                    res.json(err)
                } else {
                    res.status(201);
                    res.send(book);
                }
            });
            // book.save();
            // res.status(201);
            // res.send(book);
        }
    }
    
    return {
        post: post,
        get: get,
    };

};

module.exports = bookController;