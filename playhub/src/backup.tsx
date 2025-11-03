// import { useState, useRef, useEffect, useReducer } from 'react'
// import './App.css'
// import coinIcon from "./assets/coin.png"
// import multiplierIcon from "./assets/multiplier.webp"

// function App() {
//   const [count, setCount] = useState(0)
//   const [multiplier, setMultiplier] = useState(1)
//   const [boughtAutoClicker, setBoughtAutoClicker] = useState(false)
//   const [AutoClickerCooldown, setAutoClickerCooldown] = useState(1000)
//   const multiplierRef = useRef(multiplier)
//   const [rebirthCost, setRebirthCost] = useState(10000)
//   const [rebirthMultiplier, setRebirthMultiplier] = useState(1)
//   const [rebirths, setRebirths] = useState(0)
//   const intervalRef = useRef<number | null>(null)
//   const [maxAutoClickerCooldown, setMaxAutoClickerCooldown] = useState(false)

//   const initialState = {
//     count: 0,
//     multiplier: 1,
//     boughtAutoClicker: false,
//     AutoClickerCooldown: 1000,
//     rebirthCost: 10000,
//     rebirthMultiplier: 1,
//     rebirths: 0,
//     maxAutoClickerCooldown: false,
//   }

//   function reducer(state, action) {
//     switch (action.type) {
//       case 'INCREMENT_COUNT':
//         return { ...state, count: state.count + action.amount }
//       case 'UPDATE_MULTIPLIER':
//         return { ...state, multiplier: action.amount }
//       case 'TOGGLE_AUTO_CLICKER':
//         return { ...state, boughtAutoClicker: action.value }
//       case 'UPDATE_AUTO_CLICKER_COOLDOWN':
//         return { ...state, AutoClickerCooldown: action.amount }
//       case 'UPDATE_REBIRTH_COST':
//         return { ...state, rebirthCost: action.amount }
//       case 'UPDATE_REBIRTH_MULTIPLIER':
//         return { ...state, rebirthMultiplier: action.amount }
//       case 'INCREMENT_REBIRTHS':
//         return { ...state, rebirths: state.rebirths + action.amount }
//       case 'TOGGLE_MAX_AUTO_CLICKER_COOLDOWN':
//         return { ...state, maxAutoClickerCooldown: action.value }
//       default:
//         return state
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, initialState)

//   useEffect(() => {
//     multiplierRef.current = multiplier
//   }, [multiplier])

//   const upgrades = [
//     { cost: 10, add: 1 },
//     { cost: 50, add: 5 },
//     { cost: 100, add: 10 },
//     { cost: 500, add: 50 },
//     { cost: 1000, add: 100 },
//   ]

//   const roundNumber = (num: number) => parseFloat(num.toFixed(2))

//   function formatNumber(num: number): string {
//     if (num < 1000) return num.toFixed(2).replace(/\.00$/, '');
//     const units = ['K', 'M', 'B', 'T', 'Q'];
//     let unitIndex = -1;
//     while (num >= 1000 && unitIndex < units.length - 1) {
//       num /= 1000;
//       unitIndex++;
//     }
//     return `${num.toFixed(2).replace(/\.00$/, '')}${units[unitIndex]}`;
//   }

//   function upgradeButton(cost: number, addMultiplier: number) {
//     cost *= multiplier
//     if (count >= cost) {
//       const newMultiplier = multiplier + addMultiplier
//       setCount(roundNumber(count - cost))
//       setMultiplier(roundNumber(newMultiplier))
//     }
//   }

//   function buyAutoClicker(cost: number) {
//     if (count >= cost && !boughtAutoClicker) {
//       setCount(roundNumber(count - cost))
//       setBoughtAutoClicker(true)
//       intervalRef.current = window.setInterval(() => {
//         setCount((count) =>
//           roundNumber(count + 1 * multiplierRef.current * rebirthMultiplier)
//         )
//       }, AutoClickerCooldown)
//     }
//   }

//   function upgradeAutoClicker(cost: number, newCooldown: number) {
//     if (count >= cost && boughtAutoClicker) {
//       setCount(roundNumber(count - cost))
//       setAutoClickerCooldown(newCooldown)
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//       }
//       intervalRef.current = window.setInterval(() => {
//         setCount((count) =>
//           roundNumber(count + 1 * multiplierRef.current * rebirthMultiplier)
//         )
//       }, newCooldown)
//     }
//     if (newCooldown < 100) {
//       newCooldown = 100
//       setMaxAutoClickerCooldown(true)
//       return
//     }
//   }

//   function rebirthButton() {
//     if (count >= rebirthCost) {
//       setCount(0)
//       setMultiplier(1)
//       setAutoClickerCooldown(1000)
//       setMaxAutoClickerCooldown(false)
//       setBoughtAutoClicker(false)
//       setRebirthMultiplier(roundNumber(rebirthMultiplier * 1.2))
//       setRebirths(rebirths + 1)
//       setRebirthCost(Math.floor(rebirthCost * 1.5))
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//         intervalRef.current = null
//       }
//     }
//   }

//   function multipleRebirthsButton() {
//     if (count >= rebirthCost) {
//       let newRebirths = rebirths
//       let newRebirthCost = rebirthCost
//       let newCount = count
//       let newRebirthMultiplier = rebirthMultiplier
//       while (newCount >= newRebirthCost) {
//         newCount = roundNumber(newCount - newRebirthCost)
//         newRebirths += 1
//         newRebirthCost = Math.floor(newRebirthCost * 1.5)
//         newRebirthMultiplier = roundNumber(newRebirthMultiplier * 1.2)
//       }
//       setCount(0)
//       setMultiplier(1)
//       setAutoClickerCooldown(1000)
//       setMaxAutoClickerCooldown(false)
//       setBoughtAutoClicker(false)
//       setRebirthMultiplier(roundNumber(newRebirthMultiplier))
//       setRebirths(newRebirths)
//       setRebirthCost(newRebirthCost)
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current)
//         intervalRef.current = null
//       }
//     }
//   }

//   return (
//     <>
//       <div className="card">
//         <button
//           onClick={() =>
//             setCount((count) =>
//               roundNumber(count + 1 * multiplier * rebirthMultiplier)
//             )
//           }
//         >
//           <img src={coinIcon} alt="coin icon"/>
//           {formatNumber(count)}
//         </button>
//       </div>

//       <div className="multiplier"><img src={multiplierIcon} alt="multiplier icon"/>{formatNumber(multiplier * rebirthMultiplier)}</div>

//       <div className="upgrades">
//         {upgrades.map((upgrade) => (
//           <button
//             key={upgrade.cost}
//             className="upgrade-button"
//             onClick={() => upgradeButton(upgrade.cost, upgrade.add)}
//           >
//             <div><img src={coinIcon} alt="coin icon"/>{formatNumber(upgrade.cost * multiplier)}</div>
//             <div><img src={multiplierIcon} alt="multiplier icon"/>+{formatNumber(upgrade.add * rebirthMultiplier)}</div>
//           </button>
//         ))}
//       </div>

//       <div className="additional">
//         <div className='sub-text'>Additional:</div>
//         {!boughtAutoClicker ? (
//           <button onClick={() => buyAutoClicker(5000)}>
//             Buy Auto-Clicker <img src={coinIcon} alt="coin icon"/>{formatNumber(5000)}
//           </button>
//         ) : (
//           <>
//             <button disabled>bought auto clicker!</button>
//           </>
//         )}
//         {!maxAutoClickerCooldown ? (
//           <button onClick={() => upgradeAutoClicker(15000, AutoClickerCooldown - 100)}>
//             Upgrade Auto-Clicker <img src={coinIcon} alt="coin icon"/>{formatNumber(15000)} {AutoClickerCooldown - 100}ms cooldown
//           </button>
//         ) : (
//           <button disabled>Auto-Clicker cooldown maxed!</button>
//         )}
//       </div>

      
//       <div className="rebirth">
//         <div className='sub-text'>Rebirths: {formatNumber(rebirths)}</div>
//         <button className='rebirth-button' onClick={rebirthButton}>
//           Rebirth <img src={coinIcon} alt="coin icon"/>{formatNumber(rebirthCost)}
//         </button>
//         <button className='rebirth-button' onClick={multipleRebirthsButton}>
//           Max possible rebirths
//         </button>
//       </div>
//     </>
//   )
// }

// export default App
