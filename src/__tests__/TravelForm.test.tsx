import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import TravelForm from "../components/TravelForm";

describe.only("TravelForm Component Tests", () => {
  afterEach(cleanup);

  it("should render city of origin field", () => {
    render(<TravelForm />);
    screen.getByLabelText("Origin");
  });

  it("should render intermediate field", () => {
    render(<TravelForm />);
    screen.getByLabelText("Intermediate");
  });

  it("should render destination field", () => {
    render(<TravelForm />);
    screen.getByLabelText("Destination");
  });

  it("should render passengers field", () => {
    render(<TravelForm />);
    screen.getByLabelText("Passengers");
  });

  it("should render date field", () => {
    render(<TravelForm />);
    screen.getByLabelText("Date");
  });

  it("should render submit button", () => {
    render(<TravelForm />);
    screen.getByText("Submit");
  });
});
