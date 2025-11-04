import { roundNumber } from './utils'

export function upgradeButton(state: any, dispatch: any, baseCost: number, addMultiplier: number) {
    const actualCost = roundNumber(baseCost * state.upgradeCostMultiplier)

    if (state.count >= actualCost) {
        const newMultiplier = state.multiplier + addMultiplier
        const newUpgradeCostMultiplier = roundNumber(state.upgradeCostMultiplier * 1.15)
        dispatch({ 
            type: 'UPDATE_MULTIPLIER', 
            cost: actualCost, 
            amount: newMultiplier, 
            upgradeCostMultiplier: newUpgradeCostMultiplier 
        })
    }
}

export function buyAutoClicker(state: any, dispatch: any, cost: number) {
    if (state.count >= cost && !state.boughtAutoClicker) {
        dispatch({ type: 'TOGGLE_AUTO_CLICKER', cost, value: true })
    }
}

export function upgradeAutoClicker(state: any, dispatch: any, cost: number, newCooldown: number) {
    if (state.count >= cost && state.boughtAutoClicker) {
        dispatch({ type: 'UPDATE_AUTO_CLICKER_COOLDOWN', cost, amount: newCooldown })
    }
    if (newCooldown <= 100) {
        newCooldown = 100
        dispatch({ type: 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN', value: true })
        return
    }
}

export function rebirthButton(state: any, dispatch: any) {
    if (state.count >= state.rebirthCost) {
        dispatch({ type: 'REBIRTH', payload: { multiple: 1 } })
    }
}

export function multipleRebirthsButton(state: any, dispatch: any) {
    let possible = 0
    let tempCost = state.rebirthCost
    let tempCount = state.count

    while (tempCount >= tempCost) {
        tempCount -= tempCost
        tempCost = Math.floor(tempCost * 1.5)
        possible++
    }

    if (possible > 0) {
        dispatch({ type: 'REBIRTH', payload: { multiple: possible } })
    }
}

export function incrementButton(state: any, dispatch: any) {
    dispatch({ type: 'INCREMENT_COUNT', amount: 1 * state.multiplier * state.rebirthMultiplier })
}

export function autoClick (_state: any, dispatch: any) {
    dispatch({ type: 'AUTO_CLICK' })
}