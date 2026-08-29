import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  // Proteksi halaman: kalau nggak ada user/token, lempar balik ke login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await API.get('/todos');
      setTodos(response.data.data);
    } catch (err) {
      console.error('Gagal mengambil data todo:', err);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await API.post('/todos', { title, description });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat todo');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (err) {
      console.error('Gagal mengupdate status todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Yakin ingin menghapus tugas ini?')) return;

    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Gagal menghapus todo:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex justify-between items-center mb-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl font-bold">Todo Dashboard 🔥</h1>
            <p className="text-slate-400 text-sm mt-1">Selamat datang, <span className="text-indigo-400 font-semibold">{user?.username}</span>!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-4 py-2 rounded-lg text-sm font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Form Tambah Todo */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl mb-8">
          <h2 className="text-lg font-semibold mb-4">Tambah Tugas Baru</h2>
          {error && <div className="mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm">{error}</div>}
          
          <form onSubmit={handleCreateTodo} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Judul tugas..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <textarea
                placeholder="Deskripsi tugas (opsional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="2"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-lg font-semibold text-white transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Menambahkan...' : 'Tambah Tugas'}
            </button>
          </form>
        </div>

        {/* Daftar Todo */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Daftar Tugas Anda ({todos.length})</h2>
          
          {todos.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Belum ada tugas. Yuk buat tugas pertamamu! 🚀</p>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`flex items-start justify-between p-4 rounded-xl border transition duration-200 ${
                    todo.completed ? 'bg-slate-900/50 border-slate-800 opacity-60' : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-3 cursor-pointer flex-1" onClick={() => handleToggleComplete(todo)}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo)}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div>
                      <h3 className={`font-medium ${todo.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`text-sm mt-1 ${todo.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="text-slate-500 hover:text-red-400 p-1 transition duration-200 ml-4"
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}