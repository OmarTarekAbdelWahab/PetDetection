import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const ProtectedLayout = () => {
    console.log(useAuth());
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* <NavBar /> */}
      <main className="flex-1 overflow-auto mt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;