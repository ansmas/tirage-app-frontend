import { Routes, Route } from "react-router-dom";
import { CreateSession } from "./pages/CreateSession/CreateSession";
import { JoinSession } from "./pages/JoinSession/JoinSession";
import { Draw } from "./pages/Draw/Draw";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateSession />} />
      <Route path="/join" element={<JoinSession />} />
      <Route path="/draw/:sessionId" element={<Draw />} />
    </Routes>
  );
}
