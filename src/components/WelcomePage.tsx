import React from 'react';
import '../styles/WelcomePage.css';

const WelcomePage: React.FC = () => {
  const handleSignUpClick = () => {
    window.location.href = '/get-started';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  return (
    <div className="notion-layout">
      {/* Header */}
      <header className="header">
        <div className="logo">ReviseMe</div>
        <nav className="navigation">
        </nav>
        <div className="auth-buttons">
          <button className="login-button" onClick={handleLoginClick}>Log in</button>
          <button className="signup-button" onClick={handleSignUpClick}>Sign in for Free</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <section className="text-section">
          <h1>Write, plan, share. <br /> With AI at your side.</h1>
          <p>ReviseMe: Your personal learning hub for smarter, more efficient study.</p>
          <button className="cta-button" onClick={handleSignUpClick}>
            Get ReviseMe free →
          </button>
        </section>

        <section className="illustration-section">
          <img src="/assets/images/welcome.jpeg" alt="Illustration" />
        </section>
      </main>

      {/* Features */}
      <section className="features-section">
        <div className="feature">
          <img src="/assets/images/ai-icon.png" alt="AI" />
          <p>AI</p>
        </div>
        <div className="feature">
          <img src="/assets/images/wiki-icon.png" alt="Wikis" />
          <p>Wikis</p>
        </div>
        <div className="feature">
          <img src="/assets/images/projects-icon.png" alt="Projects" />
          <p>Projects</p>
        </div>
        <div className="feature">
          <img src="/assets/images/docs-icon.png" alt="Docs" />
          <p>Docs</p>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
