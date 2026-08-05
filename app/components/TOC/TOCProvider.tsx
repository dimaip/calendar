import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { getTOCSnapshotSignature, TOCHeadingDefinition, TOCItem, TOCRegistryController } from './tocRegistry';

const TOCRegistrationContext = createContext<TOCRegistryController['register'] | null>(null);
const TOCItemsContext = createContext<TOCItem[]>([]);
const TOC_READY_DELAY_MS = 500;

export const TOCProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [items, setItems] = useState<TOCItem[]>([]);
    const publishRef = useRef(setItems);
    publishRef.current = setItems;

    const controllerRef = useRef<TOCRegistryController>();
    if (!controllerRef.current) {
        controllerRef.current = new TOCRegistryController(
            (nextItems) => publishRef.current(nextItems),
            (callback) => window.requestAnimationFrame(callback),
            (commitId) => window.cancelAnimationFrame(commitId),
            (id, registeredElements) => {
                const existingElement = document.getElementById(id);
                return Boolean(existingElement && !registeredElements.has(existingElement));
            }
        );
    }

    const register = controllerRef.current.register;
    const lastMarkedSignatureRef = useRef('');

    useEffect(() => {
        if (typeof window.performance?.clearMarks === 'function') {
            window.performance.clearMarks('service_toc_ready');
        }

        return () => {
            controllerRef.current?.dispose();
        };
    }, []);

    useEffect(() => {
        if (!items.length) {
            return undefined;
        }

        const signature = getTOCSnapshotSignature(items);
        if (signature === lastMarkedSignatureRef.current) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            if (typeof window.performance?.mark === 'function') {
                window.performance.clearMarks('service_toc_ready');
                window.performance.mark('service_toc_ready');
            }
            lastMarkedSignatureRef.current = signature;
        }, TOC_READY_DELAY_MS);

        return () => window.clearTimeout(timeoutId);
    }, [items]);

    return (
        <TOCRegistrationContext.Provider value={register}>
            <TOCItemsContext.Provider value={items}>{children}</TOCItemsContext.Provider>
        </TOCRegistrationContext.Provider>
    );
};

export const useTOCItems = (): TOCItem[] => useContext(TOCItemsContext);

export const useTOCHeading = (definition: TOCHeadingDefinition): React.RefCallback<HTMLHeadingElement> => {
    const register = useContext(TOCRegistrationContext);
    const unregisterRef = useRef<(() => void) | undefined>();
    const { explicitId, label, level } = definition;

    return useCallback(
        (element) => {
            unregisterRef.current?.();
            unregisterRef.current = element && register ? register(element, { explicitId, label, level }) : undefined;
        },
        [explicitId, label, level, register]
    );
};
