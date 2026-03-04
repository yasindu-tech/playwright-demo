const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Write tests', completed: false }
];

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Todo App</title></head>
    <body>
      <h1>Todo App</h1>
      <input id="todoInput" placeholder="Enter a todo" />
      <button id="addBtn" onclick="addTodo()">Add</button>
      <ul id="todoList"></ul>

      <script>
        async function loadTodos() {
          const res = await fetch('/api/todos');
          const todos = await res.json();
          const list = document.getElementById('todoList');
          list.innerHTML = '';
          todos.forEach(t => {
            const li = document.createElement('li');
            li.textContent = t.title;
            li.setAttribute('data-testid', 'todo-item');
            list.appendChild(li);
          });
        }

        async function addTodo() {
          const input = document.getElementById('todoInput');
          await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: input.value })
          });
          input.value = '';
          loadTodos();
        }

        loadTodos();
      </script>
    </body>
    </html>
  `);
});

// API routes
app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const todo = { id: todos.length + 1, title: req.body.title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));
