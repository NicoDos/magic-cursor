import { fireEvent, render } from '@testing-library/react';
import Element from './Element';
import { useCursorApi } from '@/contexts/CursorContext';

jest.mock('@/contexts/CursorContext', () => ({
  useCursorApi: jest.fn(),
}));

describe('Element', () => {
  const outlineElement = jest.fn();
  const underlineElement = jest.fn();
  const leaveElement = jest.fn();

  beforeEach(() => {
    (useCursorApi as jest.Mock).mockReturnValue({
      outlineElement,
      underlineElement,
      leaveElement,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const screen = render(
      <Element>
        <div data-testid="child">Child</div>
      </Element>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('calls outlineElement on mouse enter with default type', () => {
    const screen = render(
      <Element>
        <div data-testid="child">Child</div>
      </Element>
    );

    const child = screen.getByTestId('child');
    fireEvent.mouseEnter(child);

    expect(outlineElement).toHaveBeenCalled();
    expect(underlineElement).not.toHaveBeenCalled();
  });

  it('calls underlineElement on mouse enter with non-default type', () => {
    const screen = render(
      <Element type="underline">
        <div data-testid="child">Child</div>
      </Element>
    );

    const child = screen.getByTestId('child');
    fireEvent.mouseEnter(child);

    expect(underlineElement).toHaveBeenCalled();
    expect(outlineElement).not.toHaveBeenCalled();
  });

  it('calls leaveElement on mouse leave', () => {
    const screen = render(
      <Element>
        <div data-testid="child">Child</div>
      </Element>
    );

    const child = screen.getByTestId('child');
    fireEvent.mouseLeave(child);

    expect(leaveElement).toHaveBeenCalled();
  });

  it('applies className to children', () => {
    const screen = render(
      <Element className="parent-class">
        <div data-testid="child" className="child-class">
          Child
        </div>
      </Element>
    );

    const child = screen.getByTestId('child');
    expect(child).toHaveClass('parent-class');
    expect(child).toHaveClass('child-class');
  });
});
