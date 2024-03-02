import { render, screen } from "@testing-library/react";
import CursorProvider from "./CursorProvider";

describe("CursorProvider", () => {
  it("renders children", () => {
    render(
      <CursorProvider>
        <div>Child Component</div>
      </CursorProvider>
    );

    const childComponent = screen.getByText("Child Component");
    expect(childComponent).toBeInTheDocument();
  });
});
