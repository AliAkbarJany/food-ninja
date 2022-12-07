import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
// import Loading from "../../components/Shared/Loading/Loading";
import auth from "../../firebase.init";
import useVendorAccess from "../../hooks/useVendor";
import Loading from "../../shared/Loading/Loading";

const RequireVendor = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [vendorAdmin, vendorAdminLoader] = useVendorAccess(user);
  const location = useLocation();

  if (loading || vendorAdminLoader) {
    return <Loading></Loading>;
  }

  if (!user || !vendorAdmin) {
    signOut(auth);
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireVendor;
