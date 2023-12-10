import React from "react";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuth } from "./components/AuthContext";

const MainApp = () => {
  const { user, isUserLoggedIn } = useAuth();

  return <>{user && isUserLoggedIn ? <AppStack /> : <AuthStack />}</>;
};

export default MainApp;
