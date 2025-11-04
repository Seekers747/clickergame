export function bindActions(actions: Record<string, Function>, state: any, dispatch: any) {
  const bound: Record<string, Function> = {};

  for (const [name, fn] of Object.entries(actions)) {
    bound[name] = (...args: any[]) => fn(state, dispatch, ...args);
  }

  return bound;
}