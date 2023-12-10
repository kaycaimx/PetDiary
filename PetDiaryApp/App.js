import React from "react";

import { AuthProvider } from "./components/AuthContext";
import MainApp from "./MainApp";

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
