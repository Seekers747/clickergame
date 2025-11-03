import { roundNumber } from './utils'

export type State = {
    count: number,
    multiplier: number,
    boughtAutoClicker: boolean,
    autoClickerCooldown: number,
    rebirthCost: number,
    rebirthMultiplier: number,
    rebirths: number,
    maxAutoClickerCooldown: boolean,
}

export type Action =
    | { type: 'INCREMENT_COUNT'; amount: number }
    | { type: 'UPDATE_MULTIPLIER'; cost: number, amount: number }
    | { type: 'TOGGLE_AUTO_CLICKER'; cost: number, value: boolean }
    | { type: 'UPDATE_AUTO_CLICKER_COOLDOWN'; cost: number, amount: number }
    | { type: 'UPDATE_REBIRTH_COST'; amount: number }
    | { type: 'UPDATE_REBIRTH_MULTIPLIER'; amount: number }
    | { type: 'INCREMENT_REBIRTHS'; amount: number }
    | { type: 'REBIRTH';payload?: { multiple?: number } }
    | { type: 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN'; value: boolean }
    | { type: 'AUTO_CLICK' }

export const initialState: State = {
    count: 0,
    multiplier: 1,
    boughtAutoClicker: false,
    autoClickerCooldown: 1000,
    rebirthCost: 10000,
    rebirthMultiplier: 1,
    rebirths: 0,
    maxAutoClickerCooldown: false,
}

export function reducer(state: State, action: Action): State {
switch (action.type) {
    case 'INCREMENT_COUNT':
    return { ...state, count: state.count + action.amount }
    case 'UPDATE_MULTIPLIER':
    return { ...state, count: state.count - action.cost, multiplier: action.amount }
    case 'TOGGLE_AUTO_CLICKER':
    return { ...state, count: state.count - action.cost, boughtAutoClicker: action.value }
    case 'UPDATE_AUTO_CLICKER_COOLDOWN':
    return { ...state, count: state.count - action.cost, autoClickerCooldown: action.amount }
    case 'UPDATE_REBIRTH_COST':
    return { ...state, rebirthCost: action.amount }
    case 'UPDATE_REBIRTH_MULTIPLIER':
    return { ...state, rebirthMultiplier: action.amount }
    case 'INCREMENT_REBIRTHS':
    return { ...state, rebirths: state.rebirths + action.amount }
    case 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN':
    return { ...state, maxAutoClickerCooldown: action.value }
    case 'AUTO_CLICK':
    return { ...state, count: state.count + state.multiplier * state.rebirthMultiplier }
    case 'REBIRTH':
    let rebirthsToAdd = action.payload?.multiple ?? 1
    let newRebirths = state.rebirths + rebirthsToAdd
    let newRebirthMultiplier = roundNumber(state.rebirthMultiplier * Math.pow(1.2, rebirthsToAdd))
    let newRebirthCost = Math.floor(state.rebirthCost * Math.pow(1.5, rebirthsToAdd))

    return {
        ...state,
        count: 0,
        multiplier: 1,
        rebirths: newRebirths,
        rebirthMultiplier: newRebirthMultiplier,
        rebirthCost: newRebirthCost,
        boughtAutoClicker: false,
        autoClickerCooldown: 1000,
        maxAutoClickerCooldown: false,
    }
    default:
    return state
}
}