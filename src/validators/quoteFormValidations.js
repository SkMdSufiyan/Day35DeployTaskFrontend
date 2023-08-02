export const quoteFormValidations = {};
quoteFormValidations.validateAuthor = (value) => {
    return value.length >= 3;
}

quoteFormValidations.validateQuote = (value) => {
    return value.length >= 10;
}