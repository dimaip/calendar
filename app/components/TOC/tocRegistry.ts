export interface TOCItem {
    value: string;
    label: string;
    shortLabel: string;
    level?: number;
}

export interface TOCHeadingDefinition {
    label: string;
    level?: number;
    explicitId?: string;
}

type ScheduleCommit = (callback: () => void) => number;
type CancelCommit = (commitId: number) => void;
type IsIdOccupied = (id: string, registeredElements: ReadonlySet<HTMLElement>) => boolean;

const DOCUMENT_POSITION_PRECEDING = 2;
const DOCUMENT_POSITION_FOLLOWING = 4;

export const normalizeTOCLabel = (label: string): string => {
    const normalizedLabel = typeof label.normalize === 'function' ? label.normalize('NFKC') : label;
    let result = '';
    let pendingSeparator = false;

    for (const character of normalizedLabel.trim().toLowerCase()) {
        const isNumber = character >= '0' && character <= '9';
        const isLetter = character.toLowerCase() !== character.toUpperCase();

        if (isNumber || isLetter) {
            if (pendingSeparator && result) {
                result += '-';
            }
            result += character;
            pendingSeparator = false;
        } else {
            pendingSeparator = true;
        }
    }

    return result || 'section';
};

export class TOCRegistryController {
    private readonly registrations = new Map<HTMLElement, TOCHeadingDefinition>();
    private pendingCommitId: number | undefined;
    private disposed = false;

    constructor(
        private readonly publish: (items: TOCItem[]) => void,
        private readonly scheduleCommit: ScheduleCommit,
        private readonly cancelCommit: CancelCommit,
        private readonly isIdOccupied: IsIdOccupied
    ) {}

    register = (element: HTMLElement, definition: TOCHeadingDefinition): (() => void) => {
        const registration = { ...definition, label: definition.label.trim() };
        if (!registration.label) {
            return () => undefined;
        }

        this.registrations.set(element, registration);
        this.queueCommit();

        return () => {
            if (this.registrations.get(element) === registration) {
                this.registrations.delete(element);
                this.queueCommit();
            }
        };
    };

    dispose = (): void => {
        this.disposed = true;
        if (this.pendingCommitId !== undefined) {
            this.cancelCommit(this.pendingCommitId);
            this.pendingCommitId = undefined;
        }
        this.registrations.clear();
    };

    private queueCommit = (): void => {
        if (this.disposed || this.pendingCommitId !== undefined) {
            return;
        }

        this.pendingCommitId = this.scheduleCommit(() => {
            this.pendingCommitId = undefined;
            this.commit();
        });
    };

    private commit = (): void => {
        if (this.disposed) {
            return;
        }

        const registrations = Array.from(this.registrations.entries()).sort(([elementA], [elementB]) => {
            const position = elementA.compareDocumentPosition(elementB);
            if (position & DOCUMENT_POSITION_FOLLOWING) {
                return -1;
            }
            if (position & DOCUMENT_POSITION_PRECEDING) {
                return 1;
            }
            return 0;
        });
        const registeredElements = new Set(registrations.map(([element]) => element));
        const reservedIds = new Set(
            registrations
                .map(([, definition]) => definition.explicitId?.trim())
                .filter((id): id is string => Boolean(id))
        );
        const slugOccurrences = new Map<string, number>();
        const items = registrations.map(([element, definition]) => {
            const explicitId = definition.explicitId?.trim();
            let value = explicitId;

            if (!value) {
                const slug = normalizeTOCLabel(definition.label);
                let occurrence = (slugOccurrences.get(slug) || 0) + 1;
                value = `toc-${slug}-${occurrence}`;

                while (reservedIds.has(value) || this.isIdOccupied(value, registeredElements)) {
                    occurrence += 1;
                    value = `toc-${slug}-${occurrence}`;
                }
                slugOccurrences.set(slug, occurrence);
            }

            reservedIds.add(value);
            if (element.id !== value) {
                element.id = value;
            }

            return {
                value,
                label: definition.label,
                shortLabel: definition.label,
                level: definition.level,
            };
        });

        this.publish(items);
    };
}

export const getTOCSnapshotSignature = (items: TOCItem[]): string =>
    items.map(({ value, label, level }) => `${value}\u0000${label}\u0000${level || ''}`).join('\u0001');
