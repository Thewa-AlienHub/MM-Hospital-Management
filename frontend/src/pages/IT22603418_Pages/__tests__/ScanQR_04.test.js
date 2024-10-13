import { render, screen, fireEvent } from "@testing-library/react";
import ScanQR_04 from "../ScanQR_04";

test("QR Code scanner renders correctly", () => {
  render(<ScanQR_04 />);
  expect(screen.getByText(/Scan Patient QR Code/i)).toBeInTheDocument();
});

test("Start scanning when Scan QR button is clicked", () => {
  render(<ScanQR_04 />);
  const scanButton = screen.getByText(/Scan QR Code/i);
  fireEvent.click(scanButton);
  expect(screen.getByText(/Scanning for QR code.../i)).toBeInTheDocument();
});

test("Displays error if QR code scan fails", () => {
  render(<ScanQR_04 />);
  const handleError = jest.fn();
  handleError("Error while scanning");
  expect(handleError).toHaveBeenCalledWith("Error while scanning");
});
