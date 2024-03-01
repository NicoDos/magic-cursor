import React from "react";
import { Cursor, Button, Link, Magnet } from "../../lib";

import "./App.css";

const App: React.FC<any> = () => {
  return (
    <div className="example">
      <Cursor />
      <h1>Magic Cursor</h1>
      <div className="card">
        <div>
          <button>I am a regular button</button>
        </div>
        <div>
          <Button color="#FF0066">I am a magic button</Button>
        </div>
        <div className="flex gap-4">
          <div>
            <div className="card-example">
              <h2>I am a card</h2>
              <p>I can be anything</p>
              <p>But I am just a regular card</p>
            </div>
          </div>
          <div>
            <Magnet color="#FF0066">
              <div className="card-example">
                <h2>I am a card</h2>
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
          <Link color="#FF0066">
            <a href="#">I am a magic link</a>
          </Link>
        </div>
      </div>
      <p className="read-the-docs">
        Get the code on{" "}
        <Link color="#FF0066">
          <a href="https://github.com/NicoDos/magic-cursor">Github</a>
        </Link>
      </p>
    </div>
  );
};

export default App;
