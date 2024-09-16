# React Magic Cursor

A cursor that follows your mouse and adapt its size, shape and color based on the hovered element.

### Adapt cursor position while scrolling

- Adapt `window.addEventListener('pointermove', handlePointerMove);` so that we don't only update the position when pointer moves, but also when window scrolls
