import { createBrowserRouter } from "react-router-dom";

import HomePage from "../../design-system/pages/HomePage";
import ExamPage from "../../design-system/pages/ExamPage";
import PracticePage from "../../design-system/pages/PracticePage";
import TicketSessionPage from "../../design-system/pages/TicketSessionPage";
import ResultPage from "../../design-system/pages/ResultPage";

export const appRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/exam", element: <ExamPage /> },
  { path: "/practice", element: <PracticePage /> },
  { path: "/practice/:id", element: <TicketSessionPage /> },
  { path: "/result", element: <ResultPage /> },
]);
