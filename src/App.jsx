import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileSideBar from "./components/ProfileSideBar";
import RightSideSideBar from "./components/RightSideBar";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import MobileMenuBar from "./components/MobileMenuBar";
import "./App.css";
import { useState } from "react";
import EditProfileModal from "./components/EditProfileModal";
import SharePost from "./components/SharePost";
function App() {
  const [auth, setAuth] = useState(true);

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  function toggle2() {
    setOpen2(!open2);
  }

  return (
    <Router>
      {auth ? (
        <div>
          <MobileMenuBar />
          {open && <EditProfileModal close={toggle} />}
          {open2 && <SharePost close={toggle2} />}
          <div className="overflow-hidden p-2 text-black bg-background relative mt-12 md:mt-0">
            <div className="grid md:grid-cols-[18rem_auto_20rem] gap-1 relative">
              <ProfileSideBar toggle={toggle} />
              <Routes>
                <Route path="/" element={<Home content="Home Page" />} />
              </Routes>
              <Routes>
                <Route
                  path="/profile"
                  element={<Profile content="Profile Page" toggle={toggle} />}
                />
              </Routes>

              <RightSideSideBar toggle2={toggle2} />
            </div>
            {/* GLOWS */}
            <div className="absolute -top-6 right-0 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
            <div className="absolute -left-6 top-52 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Routes>
            <Route path="/" element={<Auth content="Login" />} />
          </Routes>

          <div className="absolute -top-6 right-0 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
          <div className="absolute -left-6 top-52 w-[22rem] h-[14rem] rounded-[50%] bg-[#a6ddf0] blur-3xl"></div>
        </div>
      )}
    </Router>
  );
}

export default App;
