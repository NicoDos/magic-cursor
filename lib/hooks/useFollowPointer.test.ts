import { act, renderHook } from '@testing-library/react';
import { useFollowPointer } from './useFollowPointer';
import { useWindowScroll } from './useWindowScroll';

jest.mock('./useWindowScroll', () => ({
  useWindowScroll: jest.fn(),
}));

describe('useFollowPointer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should update point coordinates when pointer is moved', () => {
    const scrollX = 100;
    const scrollY = 200;
    const clientX = 50;
    const clientY = 75;

    (useWindowScroll as jest.Mock).mockReturnValue({ scrollX, scrollY });

    const { result } = renderHook(() => useFollowPointer());

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      window.dispatchEvent(new MouseEvent('pointermove', { clientX, clientY }));
    });

    expect(result.current).toEqual({
      x: clientX + scrollX,
      y: clientY + scrollY,
    });
  });

  test('should remove event listener on unmount', () => {
    const removeEventListenerMock = jest.spyOn(window, 'removeEventListener');

    (useWindowScroll as jest.Mock).mockReturnValue({ scrollX: 0, scrollY: 0 });

    const { unmount } = renderHook(() => useFollowPointer());

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith('pointermove', expect.any(Function));
  });
});
