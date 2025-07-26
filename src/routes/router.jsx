import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Quiz from "../pages/Quiz";
import Tickets from "../pages/Tickets";
import TicketQuiz from "../pages/TicketQuiz";
import Select from "../pages/Select";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/quiz", element: <Quiz /> },
  { path: "/tickets", element: <Tickets /> },
  { path: "/ticket/:ticketIndex", element: <TicketQuiz /> },
  { path: "/select", element: <Select /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);
