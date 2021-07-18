import { lazy, Suspense, useMemo } from "react";

import { RouteProvider, useRoute } from "./hooks/router";

export function Router() {
  const route = useRoute();
  //TODO better 404 page
  //TODO make first random user call here to avoid a second loading screen or use ssr
  const PatientList = useMemo(
    () => lazy(() => import("./pages/PatientList/PatientList")),
    [route.name]
  );

  return (
    <Suspense fallback={<Loading />}>
      {route.name == "patientList" ? <PatientList route={route} /> : 404}
    </Suspense>
  );
}

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      Loading...
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
