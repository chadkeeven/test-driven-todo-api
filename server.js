// require express and other modules
var express = require('express'),
app = express(),
bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
{ _id: 1, task: 'Laundry', description: 'Wash clothes' },
{ _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
{ _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

 app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

 app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var search = req.query.q;
   //console.log(search);
   for (var i = 0; i < todos.length; i++) {
     var currentTask = search;
     if(search == currentTask){
       res.json(currentTask);
     }
   }
   res.json(search);
 });

 app.get('/api/todos', function index(req, res) {
  res.json({todos});
});


 var counter = 3;
 app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   counter ++;
   var newId = counter;
   var newTask = req.body.task;
   //console.log(newTask);
   var newDescription = req.body.description; 
   var newTodo ={_id: parseInt(newId) ,task: newTask,description: newDescription};
   //console.log(newTodo);
   todos.push(newTodo);
   res.json(newTodo);

 });

 app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var item = parseInt(req.params.id);
   for (var i = 0; i < todos.length; i++) {
    if(item === todos[i]._id){
    //  console.log(todos[i]._id);
    res.json(todos[i]);
  }
} 
});

 app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   console.log("Id to update: " + req.params.id);
   console.log("Before update: ");
   console.log(todos);
   var itemToUpdate = req.params.id;
   var updateIdFound = false;
   var amountInTodos = 0;
   var idParsed = parseInt(itemToUpdate);
   //console.log(todos[amountInTodos]);
   while(!updateIdFound){
//console.log(updateIdFound);
//console.log(todos[amountInTodos]);
     if(idParsed === todos[amountInTodos]._id){
      var updatedTask = req.body.task;
      var updatedDescription = req.body.description; 
      var updatedTodo = {_id: idParsed,task: updatedTask,description: updatedDescription};
      todos[amountInTodos] = updatedTodo;
      updateIdFound = true;
      console.log("After Update: ");
      console.log(todos);
      console.log(todos[itemToUpdate]);
     res.json(updatedTodo);
    }
    amountInTodos ++;
  }
});

 app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   var itemToDelete = parseInt(req.params.id);
   //console.log("id to delete:" + itemToDelete);
   var idFound = false;
   var amountInArr = 0;
   while(!idFound){
    //console.log(amountInArr);
    //console.log(itemToDelete === todos[amountInArr]._id);
    if(itemToDelete === todos[amountInArr]._id){
      //console.log(todos[amountInArr]);
      var spliceTodo = todos.splice(amountInArr, 1);
      idFound = true;
      res.json(todos);
    }
    amountInArr ++;
  }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
