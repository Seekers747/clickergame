import imports from './Apphelpers/imports'

export default function App() {
  const {
    useReducer: reactUseReducer, useEffect: reactUseEffect, useRef: reactUseRef,
    reducer: gameReducer, initialState: gameInitialState, formatNumber: gameFormatNum,
    upgradeButton, buyAutoClicker, upgradeAutoClicker, rebirthButton, multipleRebirthsButton,
    coinIcon, multiplierIcon, rebirthIcon
  } = imports


  const [state, dispatch] = reactUseReducer(gameReducer, gameInitialState)
  const stateRef = reactUseRef(state)

  reactUseEffect(() => {
    stateRef.current = state
  }, [state])

  reactUseEffect(() => {
    if (!state.boughtAutoClicker) return

    const id = setInterval(() => {
      dispatch({ type: 'AUTO_CLICK' })
    }, state.autoClickerCooldown)

    return () => clearInterval(id)
  }, [state.boughtAutoClicker, state.autoClickerCooldown])

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

  const combinedMultiplier = state.multiplier * state.rebirthMultiplier

  return (
    <>
      <div className="coin">
        <button
          onClick={() =>
            dispatch({ type: 'INCREMENT_COUNT', amount: 1 * combinedMultiplier })
          }
        />
      </div>

      <div className="info-box">
        <div><img src={coinIcon} alt="coin icon"/>{gameFormatNum(state.count)}</div>
        <div><img src={multiplierIcon} alt="multiplier icon"/>{gameFormatNum(combinedMultiplier)}</div>
        <div><img src={rebirthIcon} alt="rebirth icon"/>{gameFormatNum(state.rebirths)}</div>
      </div>

      <div className="upgrades">
        <div className='sub-text'>Upgrades:</div>
        {upgrades.map((upgrade) => (
          <button
            key={upgrade.cost}
            className="upgrade-button"
            onClick={() => upgradeButton(state, dispatch, upgrade.cost, upgrade.add)}
          >
            <div><img src={coinIcon} alt="coin icon"/>{gameFormatNum(upgrade.cost * state.multiplier)}</div>
            <div><img src={multiplierIcon} alt="multiplier icon"/>+{gameFormatNum(upgrade.add * state.rebirthMultiplier)}</div>
          </button>
        ))}
      </div>

      <div className="additional">
        <div className='sub-text'>Additional:</div>
        <button disabled={state.boughtAutoClicker} onClick={() => buyAutoClicker(state, dispatch, 5000)}>
          {state.boughtAutoClicker ? 'Bought auto-clicker!' : `Buy Auto-Clicker ${gameFormatNum(5000)}`}
        </button>
        <button disabled={state.maxAutoClickerCooldown} onClick={() => upgradeAutoClicker(state, dispatch, 15000, state.autoClickerCooldown - 100)}>
          {state.maxAutoClickerCooldown ? ('Auto-Clicker cooldown maxed!') : (<>Upgrade Auto-Clicker <img src={coinIcon} alt="coin icon"/>{gameFormatNum(15000)} {state.autoClickerCooldown - 100}ms cooldown</>)}
        </button>
      </div>

      
      <div className="rebirth">
        <div className='sub-text'>Rebirths:</div>
        <button className='rebirth-button' onClick={() => rebirthButton(state, dispatch)}>
          <div><img src={coinIcon} alt="coin icon"/>{gameFormatNum(state.rebirthCost)}</div>
          <div><img src={rebirthIcon} alt="rebirth icon"/>+1</div>
        </button>
        <button className='rebirth-button' onClick={() => multipleRebirthsButton(state, dispatch)}>
          Max possible rebirths
        </button>
      </div>
    </>
  )
}