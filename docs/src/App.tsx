import React from "react";
import "./App.css";
import { Cursor, Button, Link } from "../../lib";

function App() {
  return (
    <>
      <Cursor />
      <h1>Magic Cursor</h1>
      <div className="card">
        <div>
          <button>I am a regular button</button>
        </div>
        <div>
          <Button color="#FF0066">I am a magic button</Button>
        </div>
      </div>
      <div className="card">
        <div>
          <a>I am a regular link</a>
        </div>
        <div>
          <Link color="#FF0066">I am a magic link</Link>
        </div>
      </div>
      <p className="read-the-docs">
        Get the code on{" "}
        <Link color="#FF0066" href="https://github.com/NicoDos/magic-cursor">
          Github
        </Link>
      </p>
    </>
  );
}

export default App;
