import { renderHook, fireEvent } from '@testing-library/react';
import { useWindowScroll } from '/Users/nsandron/Documents/GitHub/magic-cursor/lib/hooks/useWindowScroll';

describe('useWindowScroll', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should update scrollX and scrollY when window is scrolled', () => {
    const { result } = renderHook(() => useWindowScroll());

    expect(result.current.scrollX).toBe(0);
    expect(result.current.scrollY).toBe(0);

    fireEvent.scroll(window, { target: { scrollX: 100, scrollY: 200 } });

    expect(result.current.scrollX).toBe(100);
    expect(result.current.scrollY).toBe(200);
  });
});
