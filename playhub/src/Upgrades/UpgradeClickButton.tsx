import type { Upgrade } from './upgrades';

interface UpgradeClickButtonProps {
  upgrade: Upgrade,
  actions: any,
  state: any,
  gameIcons: any,
  gameFormatNum: Function,
}

export default function UpgradeClickButton({upgrade, actions, state, gameIcons, gameFormatNum}: UpgradeClickButtonProps) {
  return (
    <button
      key={upgrade.cost}
      className="upgrade-button"
      onClick={() => actions.upgradeButton(upgrade.cost, upgrade.add)}
    >
      <div><img src={gameIcons.coin} alt="coin icon"/>{gameFormatNum(upgrade.cost * state.upgradeCostMultiplier)}</div>
      <div><img src={gameIcons.multiplier} alt="multiplier icon"/>+{gameFormatNum(upgrade.add * state.rebirthMultiplier)}</div>
    </button>
  )
}