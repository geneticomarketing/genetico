# Archive

Earlier design passes, kept so their ideas and code can be looked up. **Nothing here is built,
routed, type-checked or linted** (see `tsconfig.json` and `eslint.config.mjs`), so it may not
compile against the current CMS schema — treat it as a snapshot, not a library.

| Folder        | What it was                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `routes/`     | The preview pages `/home-v2`, `/home-v3`, `/home-v4` and `/about-v2`.          |
| `components/` | Their sections, and the home components the earlier designs shared (`home/`).  |
| `content/`    | Their copy.                                                                    |
| `lib/`        | The CMS loaders and defaults from before the final CMS setup (September 2026). |
| `paths.ts`    | Where the previews used to live.                                               |

The preview URLs now redirect to the live page each one drafted (`next.config.ts`), so old links
still land somewhere sensible and none of them can be indexed.

To look at one of these designs again, the matching HTML prototype is in
`design_handoff_genetico_site/`, and the git history has the commit where each preview was live.
