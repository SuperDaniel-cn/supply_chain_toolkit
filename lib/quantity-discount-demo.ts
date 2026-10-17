export type QuantityDiscountBreakdown = {
  q: number;
  price: number;
  purchaseCost: number;
  orderingCost: number;
  holdingCost: number;
  totalCost: number;
  deltaVsOptimal: number;
  tierIndex: number;
};

/** 快消包装纸箱演示：全单位折扣，持有成本按固定单件年持有成本。 */
export const DEMO = {
  annualDemand: 60_000,
  orderingCost: 380,
  holdingCostPerUnit: 0.55,
  qConservative: 3_000,
  qFirstBreak: 5_000,
  qTier1Eoq: 9_105,
  qOptimal: 20_000,
  qOverstock: 35_000,
  sliderMin: 2_000,
  sliderMax: 40_000,
  sliderStep: 250,
} as const;

const TIERS = [
  { minQty: DEMO.qOptimal, price: 2.6, index: 2 },
  { minQty: DEMO.qFirstBreak, price: 2.85, index: 1 },
  { minQty: 0, price: 3.2, index: 0 },
] as const;

function costsAt(q: number) {
  const tier = TIERS.find((candidate) => q >= candidate.minQty) ?? TIERS[TIERS.length - 1];
  const purchaseCost = DEMO.annualDemand * tier.price;
  const orderingCost = (DEMO.annualDemand / q) * DEMO.orderingCost;
  const holdingCost = (q / 2) * DEMO.holdingCostPerUnit;
  return {
    q,
    price: tier.price,
    purchaseCost,
    orderingCost,
    holdingCost,
    totalCost: purchaseCost + orderingCost + holdingCost,
    tierIndex: tier.index,
  };
}

const OPTIMAL_TOTAL_COST = costsAt(DEMO.qOptimal).totalCost;

export function computeCartonDiscount(q: number): QuantityDiscountBreakdown {
  const costs = costsAt(q);
  return { ...costs, deltaVsOptimal: costs.totalCost - OPTIMAL_TOTAL_COST };
}

export const CONSERVATIVE = computeCartonDiscount(DEMO.qConservative);
export const FIRST_BREAK = computeCartonDiscount(DEMO.qFirstBreak);
export const TIER1_EOQ = computeCartonDiscount(DEMO.qTier1Eoq);
export const OPTIMAL = computeCartonDiscount(DEMO.qOptimal);

export function formatQty(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

export function formatYuan(n: number) {
  return `¥${formatQty(n)}`;
}

export function formatPrice(n: number) {
  return `¥${n.toFixed(2)}`;
}
