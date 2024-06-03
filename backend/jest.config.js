module.exports = {
    // Indicates which environment Jest should use for testing
    testEnvironment: 'node', // 'jsdom' if testing React components
    
    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.test.js'], // Adjust this pattern according to your test file naming and directory structure
    
    // An array of file extensions Jest will look for when resolving modules
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  
    // Other configurations can be added based on your project's requirements
  };
  