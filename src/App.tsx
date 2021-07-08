import React from "react";

import { useRoute } from "./hooks/router";
import PatientList from "./pages/PatientList";

export default function App() {
  const route = useRoute();
  //TODO add 404 page
  return (
    <div>{route.name == "userList" ? <PatientList route={route} /> : 404}</div>
  );
}
