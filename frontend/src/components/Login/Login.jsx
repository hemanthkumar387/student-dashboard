import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './Login.css';

const Login = ({ user, setUser }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      setUser(userCredential.user);
      navigate('/students');
    } catch (error) {
      console.error('Login failed:', error.code, error.message);
      setLoginError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/students');
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className='main'>
      <h1 className='title'>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        {loginError && <div className="login-error">{loginError}</div>}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
