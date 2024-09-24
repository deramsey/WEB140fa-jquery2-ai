$(document).ready(function() {
    // Load existing tasks from localStorage
    loadTodos();

    // Add task
    $('#add-todo').click(function() {
        const task = $('#todo-input').val();
        const importance = $('#importance-select').val();
        if (task) {
            addTodo(task, importance);
            $('#todo-input').val('');
        }
    });

    // Add event listener for marking tasks as completed
    $('li').on('click', function() {
        console.log('Item clicked:', $(this).text());
        $(this).toggleClass('completed');
        saveTodos();
    });

    function addTodo(task, importance) {
        $('#todo-list').append(`<li data-importance="${importance}" class="">${task} (${importance})</li>`);
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        $('#todo-list li').each(function() {
            todos.push({
                task: $(this).text(),
                completed: $(this).hasClass('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = $(`<li>${todo.task}</li>`);
            if (todo.completed) {
                li.addClass('completed');
            }
            $('#todo-list').append(li);
        });
    }
});
