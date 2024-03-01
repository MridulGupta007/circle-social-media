import React, { useState } from "react";
import Header from "./Components/Header";
import Logo from "./assets/circle-logo.png";
import pfp from "./assets/bear.png";
function App() {
  const [length, setLength] = useState(0);
  const [joke, setJoke] = useState("");
  const [jokes, setJokes] = useState([])
  const [address, setAddress] = useState(
    "0xc707B5466Af7E156d97B3dF59FdbdC4C8F4744cC"
  );

  const addJoke = () => {
    // add user address here
    setJokes(prev => [...prev, {user: address, joke: joke} ])
  }
  return (
    <div className="flex">
      <Header />
      <div className="overflow-y-auto overflow-x-hidden overscroll-y-contain w-[85%] h-[100vh] px-10">
        {/* Default Post Box */}
        <div className="border-b flex py-10 justify-center">
          <img src={Logo} alt="default-profile" className="w-16 self-start" />
          <div className="flex flex-col gap-y-1 justify-center">
            <textarea
              className="border relative px-5 py-3 resize-none focus:outline-none outline-none"
              cols={50}
              rows={5}
              maxLength={100}
              placeholder="Let's have a laugh together?!"
              onChange={(event) => {
                setJoke(event.target.value);
                setLength(event.target.value.length);
              }}
            ></textarea>
            <div className="flex relative left-[430px] bottom-10">
              <span className="relative self-end bottom-2 right-24 text-[10px] text-slate-500">
                {length}/100
              </span>
              <button className="bg-black self-end px-3 py-2 text-white rounded-md relative right-[90px] bottom-2"
              onClick={() => {
                addJoke()
              }}>
                Post
              </button>
            </div>
          </div>
        </div>
        {/* Default Post Box ends */}

        {/* rendering of jokes starts here */}

        <div>
          {jokes.length > 0 ? (jokes.map((elem, index) => {
            return(
              <div className="flex py-10 justify-center gap-x-5" key={index}>
              <img
                src={pfp}
                alt="profile-pic"
                className="w-16 self-start rounded-full"
              />
              <div className="flex flex-col justify-center gap-y-1">
                <span>
                  {elem.user.slice(0, 5)}....
                  {elem.user.slice(address.length - 5, address.length)}
                </span>
                <textarea
                  className="border relative px-5 py-3 resize-none focus:outline-none outline-none"
                  cols={50}
                  rows={5}
                  placeholder={elem.joke}
                ></textarea>
    
                <button className="bg-black self-end px-3 py-2 text-white rounded-md relative right-2 bottom-12">
                  Subscribe
                </button>
              </div>
            </div>
            )
          })) : (
            <div className="text-center text-[20px] font-light">
              Sorry no jokes at the moment
            </div>
          )}
        </div>
 


      </div>
    </div>
  );
}

export default App;
