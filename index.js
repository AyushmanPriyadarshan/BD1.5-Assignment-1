const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();

app.use(cors());

/**Server- side values */
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

const port = 3000;

/** solution:1 Calculating total cart amount */
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalCartValue = newItemPrice + cartTotal;
  res.send(totalCartValue.toString());
});

/** solution:2 Calculating membership discount */
app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice;

  if (isMember) {
    let discountedAmount = (cartTotal * discountPercentage) / 100;
    finalPrice = cartTotal - discountedAmount;
  } else {
    finalPrice = cartTotal;
  }

  res.send(finalPrice.toString());
});

/** solution:3 Calculating taxable amount */
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxableAmount;

  taxableAmount = (cartTotal * taxRate) / 100;

  res.send(taxableAmount.toString());
});

/** solution:4 Calculating Estimated deliver time in days */
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let requiredDeliveryDays;
  if (shippingMethod === 'Standard') {
    requiredDeliveryDays = Math.ceil(distance / 50);
    res.send(requiredDeliveryDays.toString());
  } else if (shippingMethod === 'Express') {
    requiredDeliveryDays = Math.ceil(distance / 100);
    res.send(requiredDeliveryDays.toString());
  } else {
    res.send(`Please select the shipping method`);
  }
});

/** solution:5 Calculating Estimated shipping cost */
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let baseWeight = 2;
  let shippingCost = weight * distance * 0.1;

  if (weight <= baseWeight) {
    shippingCost = weight * distance * 0.1;
    res.send(shippingCost.toString());
  } else {
    let additionalWeight = weight - baseWeight;
    let additionalShippingCost = additionalWeight * distance * 0.1;
    let totalShippingCost = shippingCost + additionalShippingCost;
    res.send(totalShippingCost.toString());
  }
});

/** solution:6 Calculating Estimated loyalty points */
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = Math.floor(purchaseAmount * loyaltyRate);
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
