import React from 'react';
import { MagicElement } from '../../lib';

const App = () => {
  return (
    <div className="example">
      <h1>Magic Cursor 🪄</h1>
      <i>
        A cursor that follows your mouse and adapt its size and shape
        <br /> based on the hovered element.
      </i>
      <div>
        <div className="m-4">
          <button>I am a regular button</button>
        </div>
        <div className="m-4">
          <MagicElement color="#FF0066">
            <button>I am a magic button</button>
          </MagicElement>
          <MagicElement color="#89d205" className="mx-4">
            <button className="green">
              I am a <span className="green">green</span> magic button
            </button>
          </MagicElement>
        </div>
        <div className="flex m-4">
          <div className="card-example">
            <h2>Simple card</h2>
            <p>I can be anything</p>
            <p>But I am just a regular card 😥</p>
          </div>
          <div>
            <MagicElement color="#FF0066">
              <div className="card-example">
                <h2>Magic card</h2>
                <p>I can be anything</p>
                <p>But I am a happy magic card 😁</p>
              </div>
            </MagicElement>
          </div>
        </div>
        <div className="flex">
          <MagicElement color="#FF0066" offset={-10}>
            <div className="card-example">
              <h2>Magic inset card</h2>
              <p>I can be anything</p>
              <p>But I am a happy magic card 😁</p>
            </div>
          </MagicElement>
          <div>
            <MagicElement color="#FF0066" offset={10}>
              <div className="card-example">
                <h2>Magic offset card</h2>
                <p>I can be anything</p>
                <p>But I am a happy magic card 😁</p>
              </div>
            </MagicElement>
          </div>
        </div>
      </div>
      <div>
        <div className="m-4">
          <a>I am a regular link</a>
        </div>
        <div className="flex m-4">
          <MagicElement color="#FF0066" type="underline" className="mx-4">
            <a href="#">I am a magic link</a>
          </MagicElement>
          <MagicElement color="#89d205" type="underline" className="mx-4">
            <a href="#" className="green">
              I am a green magic link
            </a>
          </MagicElement>
        </div>
      </div>
      <div className="footer">
        <div>
          Get the code on{' '}
          <MagicElement color="#FF0066" type="underline">
            <a href="https://github.com/NicoDos/magic-cursor">Github</a>
          </MagicElement>
        </div>
      </div>
    </div>
  );
};

export default App;
