import CreativesList from "./creativesList/CreativesList";
import UpdateCreative from "./UpdateCreative/UpdateCreative";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import CreativeDetails from "./creativeDetails/CreativeDetails";

function App() {
  const [creativeId, setCreativeId] = useState("");
  return (
    <>  
      <Routes>
        <Route
          path="/"
          element={
            <CreativesList
              setCreativeId={setCreativeId}
              creativeId={creativeId}
            />
          }
        />
        <Route path="/creatives/:id" element={<CreativeDetails />} />
        <Route path="/update-creative/:id" element={<UpdateCreative />} />
      </Routes>
    </>
  );
}

export default App;
