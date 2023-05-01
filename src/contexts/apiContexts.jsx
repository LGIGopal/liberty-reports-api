import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config/config";

const APIContext = createContext();

export function APIContextProvider({children}) {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const getAllReports = async () => {
      await axios.get(`${config.apiUrl}/getAllReports`).then((data) => {
        console.log(data);
        setReports(data);
      });
    };
    getAllReports();
  }, []);

  return (
    <APIContext.Provider
      value={{
        reports,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
