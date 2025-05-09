import './Main.css';

const WelcomePage = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to the Student Portal</h1>
      <button className="view-button" onClick={onStart}>
        View Details
      </button>
    </div>
  );
};

export default WelcomePage;
