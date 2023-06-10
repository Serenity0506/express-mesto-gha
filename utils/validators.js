const validateUrl = (text) => /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(text);

module.exports = { validateUrl };
