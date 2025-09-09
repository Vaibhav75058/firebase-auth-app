// src/PrivateRoute.jsx
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [ready, setReady] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setReady(true);
    });
    return unsub;
  }, []);

  if (!ready) return null;
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}
