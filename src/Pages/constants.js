const API_SERVICE_CHARGES = 150
const BASE = 1800


const MEDIUM_TAX = 20 / 100                   // 20% extra charges at Medium Comlexity Level
const HIGH_TAX = 40 / 100                    // 40% extra charges at High Comlexity Level

export const BASE_PRICE = BASE + API_SERVICE_CHARGES

const MEDIUM_EXTRA_CHARGES = (BASE * MEDIUM_TAX)
export const MEDIUM_PRICE = BASE + MEDIUM_EXTRA_CHARGES + API_SERVICE_CHARGES

const HIGH_EXTRA_CHARGES = (BASE * HIGH_TAX)
export const HIGH_PRICE = BASE + HIGH_EXTRA_CHARGES + API_SERVICE_CHARGES
