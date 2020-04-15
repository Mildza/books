const CacheData = (function () {
  let cache = {};

  const getCache = function () {
    return cache; // Or pull this from cookie/localStorage
  };

  const setCache = function (input) {
    cache = input;
    // Also set this in cookie/localStorage
  };
  let status = 500;

  const getStatus = function () {
    return status;
  };

  const setStatus = function (input) {
    status = input;
  };

  let numPages = 0;

  const getNumPages = function () {
    return numPages;
  };

  const setNumPages = function (input) {
    numPages = input;
  };

  let activeStep = 0;

  const getActiveStep = function () {
    return activeStep;
  };

  const setActiveStep = function (input) {
    activeStep = input;
  };

  return {
    getCache,
    setCache,
    getStatus,
    setStatus,
    getNumPages,
    setNumPages,
    getActiveStep,
    setActiveStep,
  };
})();

export default CacheData;
