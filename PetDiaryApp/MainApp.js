import React from "react";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuth } from "./components/AuthContext";

const MainApp = () => {
  const { isUserLoggedIn } = useAuth();

  return <>{isUserLoggedIn ? <AppStack /> : <AuthStack />}</>;
};

export default MainApp;
