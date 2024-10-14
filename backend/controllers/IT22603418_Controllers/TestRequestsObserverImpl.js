import TestRequest from "../../models/IT22084668_Models/TestReq.models_02.js";
import TestRequestObserver from "../../models/IT22603418_Models/TestRequestsObserver.js";

class TestRequestObserverImplementation extends TestRequestObserver {
  async update(labTest) {
    const { patientId, tests } = labTest;

    // Create a TestRequest object with the corresponding boolean fields
    const newTestRequest = {
      ID: patientId.toString(), // or any unique ID if you have a different identifier
      Name: "Lab Test for Patient", // You can adjust this as needed.
      isBlood: tests.some(
        (test) => test.testType.toLowerCase() === "blood test"
      ),
      isCholesterol: tests.some(
        (test) => test.testType.toLowerCase() === "cholesterol"
      ),
      isUrinals: tests.some(
        (test) => test.testType.toLowerCase() === "urine test"
      ),
      isAngiography: tests.some(
        (test) => test.testType.toLowerCase() === "angiography"
      ),
      isBloodPressure: tests.some(
        (test) => test.testType.toLowerCase() === "blood pressure"
      ),
      isMri: tests.some((test) => test.testType.toLowerCase() === "mri"),
      isXray: tests.some((test) => test.testType.toLowerCase() === "x-ray"),
    };

    try {
      // Create a new entry in the TestRequest collection
      await TestRequest.create(newTestRequest);
      console.log("Test request updated successfully.");
    } catch (error) {
      console.error("Error updating test request:", error);
    }
  }
}

export default TestRequestObserverImplementation;
