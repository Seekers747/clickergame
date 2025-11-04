import { useReducer, useEffect, useRef } from 'react';
import '../App.css';
import { reducer, initialState } from './init';
import { formatNumber } from './utils';
import * as actions from './actions';
import { bindActions } from './bind';
import * as icons from "../assets";
import { upgrades } from '../Upgrades/upgrades';
import UpgradeClickButton from '../Upgrades/UpgradeClickButton';

const imports = {
  useReducer,
  useEffect,
  useRef,
  reducer,
  initialState,
  formatNumber,
  icons,
  bindActions,
  actions,
  upgrades,
  UpgradeClickButton
};

export default imports;