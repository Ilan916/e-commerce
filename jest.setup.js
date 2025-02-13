jest.setTimeout(10000);

afterAll(async () => {
  // Clean up any remaining handles
  await new Promise(resolve => setTimeout(resolve, 500));
});
