// Import Models =========================================================================
var Todo = require('./models/todo');

// Expose routes =========================================================================
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // Get all todos
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {

            // If there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err);

            res.json(todos); // return all todos in JSON format
        });
    });

    // Create new
    app.post('/api/todos', function(req, res) {

        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {

            if (err) res.send(err);

            // Get and return all the todos after creating
            Todo.find(function(err, todos) {
                if (err) res.send(err);
                res.json(todos);
            });
        });

    });

    // Delete by id
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({ _id: req.params.todo_id }, function(err) {

            if (err) res.send(err);

            // Get and return all the todos after removing
            Todo.find(function(err, todos) {

                if (err) res.send(err);

                res.json(todos);
            });
        });
    });
};