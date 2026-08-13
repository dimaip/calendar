type RecoveryAction = () => void;

const recoveryActions = new WeakMap<Error, Set<RecoveryAction>>();

export const registerErrorRecovery = (error: Error, recoveryAction: RecoveryAction): void => {
    const actions = recoveryActions.get(error);
    if (actions) {
        actions.add(recoveryAction);
        return;
    }
    recoveryActions.set(error, new Set([recoveryAction]));
};

export const recoverFromError = (error: Error): void => {
    const actions = recoveryActions.get(error);
    if (!actions) {
        return;
    }

    recoveryActions.delete(error);
    actions.forEach((recoveryAction) => recoveryAction());
};
