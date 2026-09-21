import { createContext } from 'react';

interface ServiceContextValue {
    serviceId?: string;
}

export const ServiceContext = createContext<ServiceContextValue | null>(null);
