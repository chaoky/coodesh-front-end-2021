import React, { useState } from "react";

import PatientList from "./pages/PatientList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <PatientList />
    </div>
  );
}

export default App;
