import './Navbar.css';

const Navbar = ({onToggleForm, activeView, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-user">Student Dashboard</span>
      </div>
      <div className="navbar-right">
        <button onClick={onToggleForm} className="navbar-button primary">
          {activeView === 'list' ? 'Add Student' : 'Details'}
        </button>
        <button onClick={onLogout} className="navbar-button danger">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
