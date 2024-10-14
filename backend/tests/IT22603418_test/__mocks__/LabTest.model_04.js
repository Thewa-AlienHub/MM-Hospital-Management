// tests/__mocks__/LabTest.model_04.js
const LabTest = jest.fn();
LabTest.mockImplementation(() => {
  return {
    save: jest.fn(),
  };
});

export default LabTest;
