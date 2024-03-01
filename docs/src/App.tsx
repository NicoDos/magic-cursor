import React from "react";
import { Cursor, Button, Link, Magnet } from "../../lib";

import "./App.css";

const App: React.FC<any> = () => {
  return (
    <div className="example">
      <Cursor />
      <h1>Magic Cursor 🪄</h1>
      <i>
        A cursor that follows your mouse and adapt its size and shape
        <br /> based on the hovered element.
      </i>
      <div className="card">
        <div>
          <button>I am a regular button</button>
        </div>
        <div>
          <Button color="#FF0066">I am a magic button</Button>
          <Magnet color="#89d205" className="mx-4">
            <button className="green">
              I am a <span className="green">green</span> magic button
            </button>
          </Magnet>
        </div>
        <div className="flex gap-4">
          <div>
            <div className="card-example">
              <h2>I am a card</h2>
              <p>I can be anything</p>
              <p>But I am just a regular card 😥</p>
            </div>
          </div>
          <div>
            <Magnet color="#FF0066">
              <div className="card-example">
                <h2>I am a magic card</h2>
                <p>I can be anything</p>
                <p>If I have a magic magnet</p>
              </div>
            </Magnet>
          </div>
        </div>
      </div>
      <div className="card">
        <div>
          <a>I am a regular link</a>
        </div>
        <div>
          <p>
            <Link color="#FF0066">
              <a href="#">I am a magic link</a>
            </Link>
          </p>
          <Magnet color="#89d205" type="underline">
            <a href="#" className="green">
              I am a green magic link
            </a>
          </Magnet>
        </div>
      </div>
      <div className="footer">
        <div>
          Get the code on{" "}
          <Link color="#FF0066">
            <a href="https://github.com/NicoDos/magic-cursor">Github</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
