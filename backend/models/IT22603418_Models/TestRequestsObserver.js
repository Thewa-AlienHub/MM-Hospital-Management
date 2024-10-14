class TestRequestObserver {
  // This method will be triggered when a new lab test is added.
  update(labTest) {
    throw new Error("Method 'update' must be implemented.");
  }
}

export default TestRequestObserver;
