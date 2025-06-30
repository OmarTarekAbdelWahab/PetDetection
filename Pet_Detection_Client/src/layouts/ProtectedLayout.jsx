import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import NavBar from "../components/NavBar";

const ProtectedLayout = () => {
    console.log(useAuth());
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">

      <NavBar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;