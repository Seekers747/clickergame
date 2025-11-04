export interface Upgrade {
  cost: number;
  add: number;
}

export const upgrades: Upgrade[] = [
  { cost: 10, add: 1 },
  { cost: 50, add: 5 },
  { cost: 100, add: 10 },
  { cost: 500, add: 50 },
  { cost: 1000, add: 100 },
  { cost: 5000, add: 500 },
  { cost: 10000, add: 1000 },
  { cost: 50000, add: 5000 },
  { cost: 100000, add: 10000 },
  { cost: 500000, add: 50000 },
];