import Todo from '../models/Todo.model.js';

// @desc    Get all todos for logged-in user
// @route   GET /api/todos
// @access  Private
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required!' });
    }

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
    });

    res.status(201).json({ success: true, message: 'Todo created successfully', data: todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    // Pastikan todo milik user yang sedang login
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this todo!' });
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Todo updated successfully', data: todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found!' });
    }

    // Pastikan todo milik user yang sedang login
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this todo!' });
    }

    await todo.deleteOne();

    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};