import imports from './Apphelpers/imports'

export default function App() {
  const {
    useReducer: reactUseReducer, useEffect: reactUseEffect, useRef: reactUseRef,
    reducer: gameReducer, initialState: gameInitialState, formatNumber: gameFormatNum,
    icons: gameIcons,
    bindActions: bindActions , actions: gameActionsAndButtons,
    upgrades, UpgradeClickButton: UpgradeClickButton,
  } = imports

  const [state, dispatch] = reactUseReducer(gameReducer, gameInitialState)
  const actions = bindActions(gameActionsAndButtons, state, dispatch);
  const actionsRef = reactUseRef(actions);

  reactUseEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  reactUseEffect(() => {
    if (!state.boughtAutoClicker) return;

    const id = setInterval(() => {
      actionsRef.current.autoClick();
    }, state.autoClickerCooldown);

    return () => clearInterval(id);
  }, [state.boughtAutoClicker, state.autoClickerCooldown]);

  function MusicPlayer() {
    const audioRef = reactUseRef<HTMLAudioElement>(null);

    const handlePlay = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.play()
      }
    };

    const handlePause = () => {
      if (audioRef.current) audioRef.current.pause();
    }

    return (
      <>
        <div className="audio-container">
          <div className='sub-text'>Music</div>
          <div className="audio-player">
            <audio ref={audioRef} src="https://dn721901.ca.archive.org/0/items/05-underground/01%20Overworld%20Day.mp3" />
            <button onClick={handlePlay}>Play Music</button>
          </div>
          <div className='audio-pause'>
            <button onClick={handlePause}>Pause Music</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MusicPlayer/>
      <div className="coin">
        <button
          onClick={() =>
            actions.incrementButton()
          }
        />
      </div>

      <div className="info-box">
        <div><img src={gameIcons.coin} alt="coin icon"/>{gameFormatNum(state.count)}</div>
        <div><img src={gameIcons.multiplier} alt="multiplier icon"/>{gameFormatNum(state.multiplier * state.rebirthMultiplier)}</div>
        <div><img src={gameIcons.rebirth} alt="rebirth icon"/>{gameFormatNum(state.rebirths)}</div>
      </div>

      <div className="upgrades">
        <div className='sub-text'>Upgrades:</div>
        {upgrades.map((upgrade) => (
          <UpgradeClickButton 
            key={upgrade.cost} upgrade={upgrade} state={state} 
            actions={actions} gameIcons={gameIcons} gameFormatNum={gameFormatNum}
          />
        ))}
      </div>

      <div className="additional">
        <div className='sub-text'>Additional:</div>
        <button disabled={state.boughtAutoClicker} onClick={() => actions.buyAutoClicker(5000)}>
          {state.boughtAutoClicker ? 'Bought auto-clicker!' : `Buy Auto-Clicker ${gameFormatNum(5000)}`}
        </button>
        <button disabled={state.maxAutoClickerCooldown} onClick={() => actions.upgradeAutoClicker(15000, state.autoClickerCooldown - 100)}>
          {state.maxAutoClickerCooldown ? ('Auto-Clicker cooldown maxed!') : (<>Upgrade Auto-Clicker <img src={gameIcons.coin} alt="coin icon"/>{gameFormatNum(15000)} {state.autoClickerCooldown - 100}ms cooldown</>)}
        </button>
      </div>

      <div className="rebirth">
        <div className='sub-text'>Rebirths:</div>
        <button className='rebirth-button' onClick={() => actions.rebirthButton()}>
          <div><img src={gameIcons.coin} alt="coin icon"/>{gameFormatNum(state.rebirthCost)}</div>
          <div><img src={gameIcons.rebirth} alt="rebirth icon"/>+1</div>
        </button>
        <button className='rebirth-button' onClick={() => actions.multipleRebirthsButton()}>
          Max possible rebirths
        </button>
      </div>
    </>
  )
}