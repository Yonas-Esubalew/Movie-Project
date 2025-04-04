import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import Navigation from "./pages/Auth/Navigation";
function App() {
  return (
    <>
      <ToastContainer />
      <Navigation/>
      <main className="py-3">
        <Outlet/>
      </main>
    </>
  );
}

export default App;
