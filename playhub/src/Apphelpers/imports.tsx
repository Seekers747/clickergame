import { useReducer, useEffect, useRef } from 'react';
import '../App.css';
import { reducer, initialState } from './init';
import { formatNumber } from './utils';
import { upgradeButton, buyAutoClicker, upgradeAutoClicker, rebirthButton, multipleRebirthsButton } from './buttons';
import { coinIcon, multiplierIcon, rebirthIcon } from "../assets";

const imports = {
  useReducer,
  useEffect,
  useRef,
  reducer,
  initialState,
  formatNumber,
  upgradeButton,
  buyAutoClicker,
  upgradeAutoClicker,
  rebirthButton,
  multipleRebirthsButton,
  coinIcon,
  multiplierIcon,
  rebirthIcon,
};

export default imports;