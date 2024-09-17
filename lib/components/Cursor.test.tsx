import { render } from '@testing-library/react';
import Cursor from './Cursor';
import { useCursorData } from '@/contexts/CursorContext';
import { useFollowPointer } from '@/hooks/useFollowPointer';

describe('Cursor Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation();

    (useFollowPointer as jest.Mock).mockReturnValue({ x: 0, y: 0 });

    (useCursorData as jest.Mock).mockReturnValue({
      cursorRef: null,
      cursorFrozenPosition: null,
      cursorSize: null,
      cursorStyles: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const screen = render(<Cursor />);
    const cursorElement = screen.getByTestId('cursor');
    expect(cursorElement).toBeInTheDocument();
  });

  it('applies initial styles correctly', () => {
    const screen = render(<Cursor />);
    const cursorElement = screen.getByTestId('cursor');
    expect(cursorElement).toHaveStyle({
      width: '0px',
      height: '0px',
      borderWidth: '0px',
      borderRadius: '0px',
    });
  });

  it('updates position on pointer move', () => {
    (useFollowPointer as jest.Mock).mockReturnValue({ x: 100, y: 100 });
    const screen = render(<Cursor />);
    const cursorElement = screen.getByTestId('cursor');
    expect(cursorElement).toHaveStyle({
      top: '100px',
      left: '100px',
    });
  });
});
