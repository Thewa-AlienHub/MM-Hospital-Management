// tests/__mocks__/mongoose.js
const mongoose = jest.createMockFromModule('mongoose');

// Mock the ObjectId method
mongoose.Types.ObjectId = jest.fn().mockReturnValue('mocked-object-id');

export default mongoose;
