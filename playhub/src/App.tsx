import { useReducer, useEffect, useRef } from 'react'
import './App.css'
import { coinIcon, multiplierIcon, rebirthIcon } from "./assets";

function App() {

  type State = {
    count: number,
    multiplier: number,
    boughtAutoClicker: boolean,
    AutoClickerCooldown: number,
    rebirthCost: number,
    rebirthMultiplier: number,
    rebirths: number,
    maxAutoClickerCooldown: boolean,
  }

  type Action =
    | { type: 'INCREMENT_COUNT'; amount: number }
    | { type: 'UPDATE_MULTIPLIER'; amount: number }
    | { type: 'TOGGLE_AUTO_CLICKER'; value: boolean }
    | { type: 'UPDATE_AUTO_CLICKER_COOLDOWN'; amount: number }
    | { type: 'UPDATE_REBIRTH_COST'; amount: number }
    | { type: 'UPDATE_REBIRTH_MULTIPLIER'; amount: number }
    | { type: 'INCREMENT_REBIRTHS'; amount: number }
    | { type: 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN'; value: boolean }
    | { type: 'REBIRTH';payload?: { multiple?: number } }

  const initialState: State = {
    count: 0,
    multiplier: 1,
    boughtAutoClicker: false,
    AutoClickerCooldown: 1000,
    rebirthCost: 10000,
    rebirthMultiplier: 1,
    rebirths: 0,
    maxAutoClickerCooldown: false,
  }

  
  const roundNumber = (num: number) => parseFloat(num.toFixed(2))

  function formatNumber(num: number): string {
    if (num < 1000) return num.toFixed(2).replace(/\.00$/, '');
    const units = ['K', 'M', 'B', 'T', 'Q'];
    let unitIndex = -1;
    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }
    return `${num.toFixed(2).replace(/\.00$/, '')}${units[unitIndex]}`;
  }

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'INCREMENT_COUNT':
        return { ...state, count: state.count + action.amount }
      case 'UPDATE_MULTIPLIER':
        return { ...state, multiplier: action.amount }
      case 'TOGGLE_AUTO_CLICKER':
        return { ...state, boughtAutoClicker: action.value }
      case 'UPDATE_AUTO_CLICKER_COOLDOWN':
        return { ...state, AutoClickerCooldown: action.amount }
      case 'UPDATE_REBIRTH_COST':
        return { ...state, rebirthCost: action.amount }
      case 'UPDATE_REBIRTH_MULTIPLIER':
        return { ...state, rebirthMultiplier: action.amount }
      case 'INCREMENT_REBIRTHS':
        return { ...state, rebirths: state.rebirths + action.amount }
      case 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN':
        return { ...state, maxAutoClickerCooldown: action.value }
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
          AutoClickerCooldown: 1000,
          maxAutoClickerCooldown: false,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    if (!state.boughtAutoClicker) return

    const id = setInterval(() => {
      const { multiplier, rebirthMultiplier } = stateRef.current
      dispatch({ type: 'INCREMENT_COUNT', amount: 1 * multiplier * rebirthMultiplier })
    }, state.AutoClickerCooldown)

    return () => clearInterval(id)
  }, [state.boughtAutoClicker, state.AutoClickerCooldown])

  const upgrades = [
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
  ]

  function upgradeButton(cost: number, addMultiplier: number) {
    cost *= state.multiplier
    if (state.count >= cost) {
      const newMultiplier = state.multiplier + addMultiplier
      dispatch({ type: 'INCREMENT_COUNT', amount: -cost })
      dispatch({ type: 'UPDATE_MULTIPLIER', amount: newMultiplier })
    }
  }

  function buyAutoClicker(cost: number) {
    if (state.count >= cost && !state.boughtAutoClicker) {
      dispatch({ type: 'INCREMENT_COUNT', amount: -cost })
      dispatch({ type: 'TOGGLE_AUTO_CLICKER', value: true })
    }
  }

  function upgradeAutoClicker(cost: number, newCooldown: number) {
    if (state.count >= cost && state.boughtAutoClicker) {
      dispatch({ type: 'INCREMENT_COUNT', amount: -cost })
      dispatch({ type: 'UPDATE_AUTO_CLICKER_COOLDOWN', amount: newCooldown })
    }
    if (newCooldown <= 100) {
      newCooldown = 100
      dispatch({ type: 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN', value: true })
      return
    }
  }

  function rebirthButton() {
    if (state.count >= state.rebirthCost) {
      dispatch({ type: 'REBIRTH', payload: { multiple: 1 } })
    }
  }

  function multipleRebirthsButton() {
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

  return (
    <>
      <div className="coin">
        <button
          onClick={() =>
            dispatch({ type: 'INCREMENT_COUNT', amount: 1 * state.multiplier * state.rebirthMultiplier })
          }
        />
      </div>

      <div className="info-box">
        <div><img src={coinIcon} alt="coin icon"/>{formatNumber(state.count)}</div>
        <div><img src={multiplierIcon} alt="multiplier icon"/>{formatNumber(state.multiplier * state.rebirthMultiplier)}</div>
        <div><img src={rebirthIcon} alt="rebirth icon"/>{formatNumber(state.rebirths)}</div>
      </div>

      <div className="upgrades">
        <div className='sub-text'>Upgrades:</div>
        {upgrades.map((upgrade) => (
          <button
            key={upgrade.cost}
            className="upgrade-button"
            onClick={() => upgradeButton(upgrade.cost, upgrade.add)}
          >
            <div><img src={coinIcon} alt="coin icon"/>{formatNumber(upgrade.cost * state.multiplier)}</div>
            <div><img src={multiplierIcon} alt="multiplier icon"/>+{formatNumber(upgrade.add * state.rebirthMultiplier)}</div>
          </button>
        ))}
      </div>

      <div className="additional">
        <div className='sub-text'>Additional:</div>
        {!state.boughtAutoClicker ? (
          <button onClick={() => buyAutoClicker(5000)}>
            Buy Auto-Clicker <img src={coinIcon} alt="coin icon"/>{formatNumber(5000)}
          </button>
        ) : (
          <>
            <button disabled>bought auto clicker!</button>
          </>
        )}
        {!state.maxAutoClickerCooldown ? (
          <button onClick={() => upgradeAutoClicker(15000, state.AutoClickerCooldown - 100)}>
            Upgrade Auto-Clicker <img src={coinIcon} alt="coin icon"/>{formatNumber(15000)} {state.AutoClickerCooldown - 100}ms cooldown
          </button>
        ) : (
          <button disabled>Auto-Clicker cooldown maxed!</button>
        )}
      </div>

      
      <div className="rebirth">
        <div className='sub-text'>Rebirths:</div>
        <button className='rebirth-button' onClick={rebirthButton}>
          <div><img src={coinIcon} alt="coin icon"/>{formatNumber(state.rebirthCost)}</div>
          <div><img src={rebirthIcon} alt="rebirth icon"/>+1</div>
        </button>
        <button className='rebirth-button' onClick={multipleRebirthsButton}>
          Max possible rebirths
        </button>
      </div>
    </>
  )
}

export default App