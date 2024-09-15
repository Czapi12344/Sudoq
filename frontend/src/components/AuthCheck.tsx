import React, { ReactNode } from "react";
import { useKeycloak } from "@react-keycloak/web";

type AuthCheckProps = {
  children: ReactNode;
};

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { keycloak } = useKeycloak();

  if (keycloak && keycloak.authenticated) {
    return <>{children}</>;
  } else {
    return (
      <div className="flex flex-col items-center mt-8">
        <p className="mb-4">You need to be logged in to play Sudoku.</p>
        <button
          onClick={() => keycloak.login()}
          className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </div>
    );
  }
};

export default AuthCheck;

export {};