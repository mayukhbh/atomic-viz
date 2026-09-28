# Analytics events

AtomicViz ships no analytics provider. `src/engine/analytics.js` dispatches each event as a
`CustomEvent` named `atomicviz:analytics` on `window`, with `detail = { name, props, at }`.
Nothing leaves the browser unless a provider is wired up. To connect one later:

```js
window.addEventListener('atomicviz:analytics', (e) => provider.track(e.detail.name, e.detail.props));
```

| Event | Fired when | Props | Source |
|---|---|---|---|
| `atom_deeplink_opened` | The page loads with a valid `?el=` symbol. Fired once per page load. Invalid or missing symbols fall back to Carbon and fire nothing. | `element`: canonical symbol, e.g. `"Au"` | `src/features/atom-explorer/useElementDeepLink.js` |
| `atom_share_clicked` | The Share button in the Atom view is pressed, before the share sheet or clipboard runs. | `element`: symbol; `method`: `"native"` (share sheet) or `"clipboard"` | `src/features/atom-explorer/shareAtom.js` |

Notes

- `atom_share_clicked` measures intent. A dismissed share sheet still counts as a click.
- `atom_deeplink_opened` cannot tell a shared link from a bookmark or a reload of a URL
  the app itself wrote. Pair it with the referrer in your provider if that matters.
