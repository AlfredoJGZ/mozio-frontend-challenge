import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

export const renderWithRouter = (ui: JSX.Element, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe("App Navigation", () => {
  afterEach(cleanup);
  it("Home page should renders travel detail form", () => {
    renderWithRouter(<App />);
    expect(
      screen.getByText("Fill the details of your travel below")
    ).toBeInTheDocument();
  });
  it("Results page should render travel distance", () => {
    renderWithRouter(<App />, { route: "/results" });
    expect(screen.getByText("Your travel")).toBeInTheDocument();
  });
});
