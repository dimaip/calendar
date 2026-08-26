# Frontend State Ownership

Last reviewed: 2026-07-28

This document records the existing state boundaries that frontend modernization must preserve. It is an ownership guide, not a proposal to replace Recoil, React Query, Convex, or browser storage in one migration.

## Ownership rules

| State kind | Owner | Persistence | Examples |
| --- | --- | --- | --- |
| Temporary interaction state | Component state or feature-local context | None | Open menus, active editors, loader state |
| Cross-feature user preferences | Recoil | `recoil-persist`, with authenticated server synchronization | Language, theme, zoom, preferred translations |
| Public remote data | React Query | In-memory query cache; fetch responses may additionally use the frozen `cachedFetch` boundary | Calendar days, readings, saints, sermons, hymns |
| Authenticated habit data | Convex | Convex-managed | Prayer plans, completions, streak data |
| Login session | `oidc-client-ts` | Library-owned browser storage | OIDC user/session records |
| Per-document reader labels | Script editor feature | `ScriptEditor.<document id>` in local storage | Reader names in service text |
| Offline habit mutations | Habit tracker feature | `habitTracker_offlineQueue` in local storage | Completion mutations awaiting connectivity |
| Install/update/runtime capability state | Application shell or browser platform | Usually memory-only | Pending update, install prompt, online state |

New durable state must have one clear owner. Do not write the same value independently through two persistence systems without documenting reconciliation and migration behavior.

## Persisted Recoil contract

`SyncWithDB` stores persisted atoms inside the `recoil-persist` local-storage object. When a user is authenticated, the same item keys are synchronized with the existing settings API. These keys are therefore public compatibility contracts even though they are implemented in frontend code.

| Recoil key | Shape / purpose |
| --- | --- |
| `langState` | `{ lang, langA, langB }` language selection |
| `themeState` | `system`, light, or dark theme selection |
| `zoomState` | Reading text scale |
| `translationPriority` | Ordered scripture translation preferences |
| `troparionFavs` | Favorite troparion identifiers |
| `disabledPrayers` | Disabled prayer identifiers |
| `customPrayers` | Per-service custom prayer collections |
| `extraPrayers` | Per-service inserted prayer collections |
| `names` | Per-service commemorated names |
| `scriptVersions` | Per-service script version metadata |
| `currentScriptVersion` | Selected version per service |
| `scriptEditorIsActive` | Script-editor preference |
| `scriptEditorPromoDismissed` | Script-editor promotion dismissal |
| `iosPromptDismissed` | iOS installation prompt dismissal |
| `promoDismissed` | Promotion dismissal by promotion id |

Renaming a key, changing an atom-family parameter, or changing a serialized shape requires an explicit backward-compatible migration. A refactor must not clear or silently reinterpret existing values.

## Non-persisted Recoil state

The following keys are current-session UI or derived state and should remain non-durable unless a product requirement says otherwise:

- `TOC`
- `customPrayerEditIdState`
- `customPrayerInputState`
- `isParallel` and derived `isEffectivelyParallel`
- `menuShownState`
- `pendingUpdate`
- `scriptVersionSelectorIsActive`
- derived `currentScript`

## Context boundaries

| Context | Responsibility |
| --- | --- |
| `SessionContext` | Current OIDC session and auth actions |
| `LangContext` | Language currently rendering a service branch |
| `ServiceContext` | Current service rendering data |
| `MdxLoaderContext` | Nested MDX loading depth |
| `ZoomContext` | Reading zoom inherited by descendants |
| `DotsMenuContext` | Local menu coordination |

Contexts should carry stable feature dependencies or narrowly scoped composition state. Public server data belongs in the query layer; durable preferences belong in Recoil.

## Global compatibility surface

The existing application still exposes a small browser-global surface:

- `window.TOC` coordinates rendered headings with TOC navigation.
- `window.pullDownDisabled` coordinates open selectors with pull-to-refresh.
- `window.APP_LOADED` is a bootstrap signal.
- `window.dataLayer` is owned by analytics.
- `window.Sentry` is retained as a compatibility bridge.

New feature state must not be added to `window`. Existing globals should be retired only behind regression coverage because MDX content and platform bootstrap code may rely on them indirectly.

## Change checklist

Before changing state ownership or persistence:

1. Identify the current owner, key, serialized shape, and fallback.
2. Add a fixture containing the previous serialized value.
3. Prove the new code can read that fixture without data loss.
4. Keep query-cache changes separate from `cachedFetch`, service-worker, and precache changes.
5. Verify sign-in synchronization and signed-out local behavior independently.
6. Record any migration and rollback behavior in the relevant modernization work unit.
