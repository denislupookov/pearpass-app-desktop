# pearpass-app-desktop-tether

## UI: always use `@tetherto/pearpass-lib-ui-kit`

This app is mid-migration to a v2 design. All new UI and v2 redesigns **must** use components from `@tetherto/pearpass-lib-ui-kit`. Do not roll custom buttons, inputs, modals, typography, or icons.

**Before writing any UI, check the kit first.** The full component catalog, styling conventions, and reference files live in [.claude/skills/use-ui-kit/SKILL.md](.claude/skills/use-ui-kit/SKILL.md) — consult it when editing `.tsx`/`.jsx` files, creating modals/forms/buttons, or styling anything.

**Hard rules:**
- If a component exists in the kit, use it. If it does not, ask before creating a custom one.
- Do **not** add new variants under [src/lib-react-components/](src/lib-react-components/) — that directory is legacy (v1) and should not grow.
- Style with `useTheme()` + `rawTokens` from the kit. No hardcoded hex colors or px spacing.
- Import icons from `@tetherto/pearpass-lib-ui-kit/icons` (530 available). Do not add new SVGs under `src/`.

**When the kit applies:** the active design is controlled by the `DESIGN_VERSION` flag from `@tetherto/pearpass-lib-constants`. Currently `DESIGN_VERSION === 2`, so kit components are the default for all new UI.

**`V2` suffix is for migration coexistence only.** If a v1 file already exists for the component you're creating, add the `V2` suffix (e.g. `CardCreateMasterPasswordV2` alongside legacy `CardCreateMasterPassword`). If the component is net-new with no v1 sibling, use its natural name — **no suffix**.
