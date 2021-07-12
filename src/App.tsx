import React from "react";

import { RouteProvider, useRoute } from "./hooks/router";
import PatientList from "./pages/PatientList/PatientList";

export function Router() {
  const route = useRoute();
  //TODO add 404 page
  return (
    <div>
      {route.name == "patientList" ? <PatientList route={route} /> : 404}
    </div>
  );
}

export default function App() {
  return (
    <RouteProvider>
      <Router />
    </RouteProvider>
  );
}
