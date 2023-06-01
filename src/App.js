import "./App.css";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sidebar";
import { useEffect } from "react";
import { useStore } from "./store";
import Modal from "./components/modal";

function App() {
  const [state, dispatch] = useStore();
  const { isShowModal } = state;
  console.log(state)

  useEffect(() => {
    document.title = "Dashboad - Admin"
  }, []);

  return (
    <>
      <div className="content-page">
        <SideBar />
        <div className="show-info">
          <Outlet />
        </div>
      </div>
      {isShowModal && <Modal />}

    </>
  );
}

export default App;
