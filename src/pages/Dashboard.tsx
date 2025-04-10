
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StudentDashboard from '@/components/Dashboard/StudentDashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status from localStorage (mock auth)
    const authStatus = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setIsAdmin(userRole === 'admin');
      setLoading(false);
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
