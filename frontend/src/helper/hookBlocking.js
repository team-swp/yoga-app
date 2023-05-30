import { useBlocker, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function YourComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBlocking, setIsBlocking] = useState(false);

  useBlocker(
    (tx) => {
      if (isBlocking) {
        tx.block('Are you sure you want to leave this page?');
      }
    },
    [isBlocking]
  );

  const handleFormChange = () => {
    setIsBlocking(true);
  };

  const handleFormSubmit = () => {
    // Perform form submission logic
    setIsBlocking(false);
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/other">Other Page</Link>
      </nav>

      <h1>Your Component</h1>

      <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
        {/* Form fields go here */}
      </form>

      <Outlet />
    </div>
  );
}
