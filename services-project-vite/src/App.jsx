import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Error from "./components/Error.jsx";
import Footer from "./components/Footer.jsx";
import ServiceDetails from "./components/ServiceDetails.jsx";
import Admin from "./components/Admin.jsx";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services/:sname",
        element: <ServiceDetails />,
      },
      {
        path: "/contact/service/:serviceName",
        element: <Contact />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
    // errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={appRouter}>
      <AppLayout />
    </RouterProvider>
  );
};

export default App;
