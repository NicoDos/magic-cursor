import React from 'react';
import { MagicElement } from '../../lib';

const App = () => {
  return (
    <div className="example">
      <header>
        <h1>Magic Cursor 🪄</h1>
        <i>
          A cursor that follows your mouse and adapt its size and shape
          <br /> based on the hovered element.
        </i>
      </header>

      <section>
        <h2>Outline buttons</h2>
        <div className="m-4">
          <button>Regular button</button>
        </div>
        <div className="m-4">
          <MagicElement color="#FF0066">
            <button>Magic button</button>
          </MagicElement>
          <MagicElement color="#09b52c" className="mx-4">
            <button className="green">
              I am a <span className="green">green</span> magic button
            </button>
          </MagicElement>
        </div>
      </section>

      <section>
        <h2>Underline links</h2>
        <div>
          <div className="m-4">
            <a>Regular link</a>
          </div>
          <div className="flex m-4">
            <MagicElement color="#FF0066" type="underline" className="mx-4">
              <a href="#">Magic link</a>
            </MagicElement>
            <MagicElement color="#09b52c" type="underline" className="mx-4">
              <a href="#" className="green">
                Green magic link
              </a>
            </MagicElement>
          </div>
        </div>
      </section>

      <section>
        <h2>Any html tag</h2>

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
          <MagicElement color="#FF0066" offset={-8}>
            <div className="card-example">
              <h2>Magic inset card</h2>
              <p>I can be anything</p>
              <p>But I am a happy magic card 😁</p>
            </div>
          </MagicElement>
          <div>
            <MagicElement color="#FF0066" offset={4}>
              <div className="card-example">
                <h2>Magic offset card</h2>
                <p>I can be anything</p>
                <p>But I am a happy magic card 😁</p>
              </div>
            </MagicElement>
          </div>
        </div>
      </section>

      <section>
        <h2>Forms</h2>
        <div className="flex m-4">
          <MagicElement color="#09b52c" offset={1}>
            <input type="text" placeholder="Insert your name..." />
          </MagicElement>
          <MagicElement offset={1}>
            <input type="checkbox" id="checkbox" />
          </MagicElement>
          <label htmlFor="checkbox">Check me</label>
        </div>
        <div className="flex m-4">
          <MagicElement color="#FF0066" offset={1}>
            <select>
              <option value="1">Many choices</option>
              <option value="2">Make yours</option>
            </select>
          </MagicElement>
          <MagicElement color="#09b52c" offset={1} className="rounded-full">
            <input type="radio" id="radio" />
          </MagicElement>
          <label htmlFor="radio">Thick me</label>
        </div>
      </section>

      <footer>
        Get the code on{' '}
        <MagicElement color="#FF0066" type="underline">
          <a href="https://github.com/NicoDos/magic-cursor">Github</a>
        </MagicElement>
      </footer>
    </div>
  );
};

export default App;
