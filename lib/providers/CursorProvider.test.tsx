import { render } from '@testing-library/react';
import CursorProvider from './CursorProvider';
import { DataCursorContext } from '../contexts/CursorContext';
import { useContext } from 'react';
import {
  DEFAULT_COLOR,
  DEFAULT_HEIGHT,
  DEFAULT_RADIUS,
  DEFAULT_THICKNESS,
  DEFAULT_WIDTH,
} from '../constants';

describe('CursorProvider', () => {
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
    let contextValues;

    const TestComponent = () => {
      contextValues = useContext(DataCursorContext);
      return null;
    };

    render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    expect(contextValues.x).toBe(0);
    expect(contextValues.y).toBe(0);
    expect(contextValues.height).toBe(DEFAULT_HEIGHT);
    expect(contextValues.width).toBe(DEFAULT_WIDTH);
    expect(contextValues.cursorStyles.borderColor).toBe(DEFAULT_COLOR);
    expect(contextValues.cursorStyles.borderWidth).toBe(DEFAULT_THICKNESS);
    expect(contextValues.cursorStyles.borderRadius).toBe(DEFAULT_RADIUS);
  });

  it('updates cursor context values when outlineElement is called', () => {
    let contextValues;

    const TestComponent = () => {
      contextValues = useContext(DataCursorContext);
      return (
        <div data-testid="element" style={{ borderRadius: '5px' }}>
          Element
        </div>
      );
    };

    const screen = render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    const element = screen.getByTestId('element');
    contextValues.outlineElement(element);

    expect(contextValues.x).not.toBe(0);
    expect(contextValues.y).not.toBe(0);
    expect(contextValues.height).not.toBe(DEFAULT_HEIGHT);
    expect(contextValues.width).not.toBe(DEFAULT_WIDTH);
    expect(contextValues.cursorStyles.borderColor).toBe(DEFAULT_COLOR);
  });

  it('resets cursor context values when reset is called', () => {
    let contextValues;

    const TestComponent = () => {
      contextValues = useContext(DataCursorContext);
      return (
        <div data-testid="element" style={{ borderRadius: '5px' }}>
          Element
        </div>
      );
    };

    const screen = render(
      <CursorProvider>
        <TestComponent />
      </CursorProvider>
    );

    const element = screen.getByTestId('element');
    contextValues.outlineElement(element);
    contextValues.reset();

    expect(contextValues.x).toBe(0);
    expect(contextValues.y).toBe(0);
    expect(contextValues.height).toBe(DEFAULT_HEIGHT);
    expect(contextValues.width).toBe(DEFAULT_WIDTH);
    expect(contextValues.cursorStyles.borderColor).toBe(DEFAULT_COLOR);
    expect(contextValues.cursorStyles.borderWidth).toBe(DEFAULT_THICKNESS);
    expect(contextValues.cursorStyles.borderRadius).toBe(DEFAULT_RADIUS);
  });
});
