import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.startsWith(path);
    function handleClick(){
        localStorage.removeItem("user-info");
        navigate('/');
        
    }
  return (
    <div className="min-h-screen w-64 bg-base-200 shadow-lg flex flex-col p-4">
      <h2 className="text-2xl font-bold text-primary mb-6">Mini CRM</h2>
      
      <ul className="menu space-y-1">
        <li>
          <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/campaigns-history" className={isActive('/campaigns-history') ? 'active' : ''}>
            📣 Campaigns History
          </Link>
        </li>
        <li>
          <Link to="/create-campaigns" className={isActive('/create-campaigns') ? 'active' : ''}>
            📣 Create Campaigns 
          </Link>
        </li>
        <li>
          <Link to="/segments" className={isActive('/segments') ? 'active' : ''}>
            🎯 Segments
          </Link>
        </li>
        <li>
          <Link to="/customers" className={isActive('/customers') ? 'active' : ''}>
            👤 Customers
          </Link>
        </li>
        <li>
          <Link to="/orders" className={isActive('/orders') ? 'active' : ''}>
            🧾 Orders
          </Link>
        </li>
        <li>
          <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
            ⚙️ Settings
          </Link>
        </li>
      </ul>

      <div className="mt-auto pt-6 border-t border-base-300">
        <button className="btn btn-sm btn-outline w-full" onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
}
