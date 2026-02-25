const calculateValue = (price, stock) => {
    if (price < 0 || stock < 0) {
        return 0;
    }
    return price * stock;
};

const applyTax = (price, taxPercent) => {
    if (price < 0 || taxPercent < 0) {
        return 0;
    }
    return price + (price * taxPercent / 100);
};

module.exports = {
    calculateValue,
    applyTax
};