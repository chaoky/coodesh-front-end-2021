import { createRouter, Route } from "type-route";

import patientList from "../pages/PatientList/params";

export const { RouteProvider, useRoute, routes, session } = createRouter({
  patientList,
});

export type PatientListRoute = Route<typeof routes.patientList>;
