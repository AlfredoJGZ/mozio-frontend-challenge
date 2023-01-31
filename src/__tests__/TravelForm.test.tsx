import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter, useParams } from "react-router-dom";
import TravelForm from "../components/TravelForm";
import { renderWithRouter } from "./App.test";

describe("TravelForm Component Tests", () => {
  afterEach(cleanup);

  it("should render city of origin field", async () => {
    renderWithRouter(<TravelForm />);
    screen.getByLabelText("Origin");
  });

  it("should render intermediate field", () => {
    renderWithRouter(<TravelForm />);
    screen.getByLabelText("Intermediate");
  });

  it("should render destination field", () => {
    renderWithRouter(<TravelForm />);
    screen.getByLabelText("Destination");
  });

  it("should render passengers field", () => {
    renderWithRouter(<TravelForm />);
    screen.getByLabelText("Passengers");
  });

  it("should render date field", () => {
    renderWithRouter(<TravelForm />);
    screen.getByLabelText("Date");
  });

  it("should render submit button", () => {
    renderWithRouter(<TravelForm />);
    screen.getByText("Submit");
  });

  it("Field should have URL param value", async () => {
    renderWithRouter(<TravelForm />, { route: "/?origin=Paris" });
    await waitFor(() => {
      expect(screen.getByLabelText("Origin")).toHaveValue("Paris");
    });
  });

  it.only("On input change should add params to URL", async () => {
    render(<TravelForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Origin"), "Paris");
    await userEvent.keyboard("enter");
    expect(window.location.search).toBe("?origin=Paris");
  });
});
