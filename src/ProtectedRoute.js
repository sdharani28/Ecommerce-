import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user");

    if (user) {
        return children;
    }
    else {
        return <Navigate to={'/login'} />
    }
}

export default ProtectedRoute;

