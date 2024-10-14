import TestRequest from '../../models/IT22084668_Models/TestRequest.model.js'

export const getAllTests = async (req, res, next) => {
    try {
      const tests = await TestRequest.find();  // Fetch all test requests
  
      if (tests.length > 0) {
        res.status(200).send({
          success: true,
          message: 'Test requests fetched successfully',
          count: tests.length,
          data: tests
        });
      } else {
        res.status(404).send({
          success: false,
          message: 'No test requests found'
        });
      }
  
    } catch (error) {
      next(error);  // Pass the error to the next middleware (usually the error handler)
    }
  };

  export const getTestById = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
      const testRequest = await TestRequest.findOne({ ID:id }); // Ensure you are using the ID field
  
      if (!testRequest) {
        return res.status(404).json({
          success: false,
          message: 'Test request not found',
        });
      }
  
      res.status(200).json({
        success: true,
        data: testRequest,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  