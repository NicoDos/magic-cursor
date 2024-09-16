import { act, render } from '@testing-library/react';
import CursorProvider from './CursorProvider';
import { useApiCursor, useDataCursor } from '@/contexts/CursorContext';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
} from '@/constants';
import { IApiCursorContext, IDataCursorContext } from '@/index.d';
import React from 'react';

let contextData: IDataCursorContext;
let contextApi: IApiCursorContext;

const WIDTH = 120;
const HEIGHT = 60;
const BORDER_RADIUS = 5;
const boundingClientRect = {
  width: WIDTH,
  height: HEIGHT,
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  toJSON: () => {},
};

jest.spyOn(React, 'useRef').mockReturnValue({
  current: document.createElement('div'),
});

const TestComponent = () => {
  contextData = useDataCursor();
  contextApi = useApiCursor();

  return (
    <div data-testid="element" style={{ borderRadius: `${BORDER_RADIUS}px` }}>
      Element
    </div>
  );
};

describe('CursorProvider', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeAll(() => {
    Element.prototype.getBoundingClientRect = () => boundingClientRect;
  });

  afterAll(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('renders children', () => {
    const screen = render(
      <CursorProvider>
        <div>Child Component</div>
      </CursorProvider>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  it('provides default cursor context values', () => {
    render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    expect(contextData.cursorPositions).toEqual({ x: 0, y: 0 });
    expect(contextData.cursorSizes).toEqual({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
    expect(contextData.cursorStyles).toEqual({
      borderColor: DEFAULT_COLOR,
      borderWidth: DEFAULT_THICKNESS,
      borderRadius: DEFAULT_RADIUS,
    });
  });

  it('updates cursor context values when outlineElement is called', () => {
    const screen = render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    const element = screen.getByTestId('element').getBoundingClientRect();
    const elementStyles = getComputedStyle(screen.getByTestId('element'));

    act(() => {
      contextApi.outlineElement(element, elementStyles);
    });

    expect(contextData.cursorPositions).not.toEqual({ x: 0, y: 0 });
    expect(contextData.cursorSizes).toEqual({
      width: WIDTH - DEFAULT_THICKNESS / 2,
      height: HEIGHT - DEFAULT_THICKNESS / 2,
    });
    expect(contextData.cursorStyles).toEqual({
      borderColor: DEFAULT_COLOR,
      borderWidth: DEFAULT_THICKNESS,
      borderRadius: BORDER_RADIUS + DEFAULT_THICKNESS * 2,
    });
  });

  it('updates cursor context values when underlineElement is called', () => {
    const screen = render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    const element = screen.getByTestId('element').getBoundingClientRect();

    act(() => {
      contextApi.underlineElement(element);
    });

    expect(contextData.cursorPositions).not.toEqual({ x: 0, y: 0 });
    expect(contextData.cursorSizes).toEqual({ width: WIDTH, height: 0 });
    expect(contextData.cursorStyles).toEqual({
      borderColor: DEFAULT_COLOR,
      borderWidth: DEFAULT_THICKNESS / 2,
      borderRadius: DEFAULT_RADIUS,
    });
  });

  it('resets cursor context values when reset is called', () => {
    const screen = render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    const element = screen.getByTestId('element').getBoundingClientRect();
    const elementStyles = getComputedStyle(screen.getByTestId('element'));

    act(() => {
      contextApi.outlineElement(element, elementStyles);
      contextApi.reset();
    });

    expect(contextData.cursorPositions).toEqual({ x: 0, y: 0 });
    expect(contextData.cursorSizes).toEqual({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
    expect(contextData.cursorStyles).toEqual({
      borderColor: DEFAULT_COLOR,
      borderWidth: DEFAULT_THICKNESS,
      borderRadius: DEFAULT_RADIUS,
    });
  });
});
