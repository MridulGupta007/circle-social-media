import React, { useState } from "react";
import Header from "./Components/Header";
import Logo from "./assets/circle-logo.png";
import pfp from "./assets/bear.png";
import Profile from "./Components/Profile";
import AddTweets from "./Components/AddTweets";
import Feed from "./Components/Feed";
import { Outlet } from "react-router-dom";
function App() {





  return (
    <div className="flex bg-[#F6F5F5]">
      <Header />
      <div className="overflow-y-auto overflow-x-hidden overscroll-y-contain w-[85%] h-[100vh] px-10">
        
      <Outlet />
      </div>
    </div>
  );
}

export default App;