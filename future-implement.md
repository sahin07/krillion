# Future implement — keyword track

Implementation backlog driven by Google keyword interest (rising + breakout).  
Work top-down by priority. Mark items `[x]` when shipped.

Source snapshot: Search interest + % change / Breakout (rising 1–50 + breakout 1–30 where available).  
Refresh: **2026-11-19** — rising 1–10 + rising-breakout 1–10; only **new** query strings appended below (already-listed phrases are not duplicated).

---

## Priority legend

| Tier | Meaning |
|------|---------|
| P0 | Brand / core product — protect & expand existing pages |
| P1 | High-intent rising queries — SEO + UX this sprint cycle |
| P2 | Breakout game names — new modes / landing pages |
| P3 | Adjacent / discovery / typos / competitor names |
| SKIP | Likely unrelated or non-product (validate before build) |

---

## Track A — Rising searches (brand & modes)

### A1 — Queries 1–10

| # | Query | Interest | Change | Tier | Status | Planned work |
|---|-------|----------|--------|------|--------|--------------|
| 1 | `krillion game` | south | −20% | P0 | [x] | Homepage + `/games` title/H1/meta reinforce “Krillion game”; internal links |
| 2 | `krillion games` | north | +20% | P0 | [x] | `/games` hub (packs + modes); schema `ItemList`; nav label “Krillion Games” |
| 3 | `one in a krillion` | north | +30% | P0 | [x] | Live: `/one-in-a-krillion` dedicated landing + home/FAQ copy |
| 4 | `a krillion game` | north | +40% | P1 | [x] | Meta variants + FAQ “What is a Krillion game?”; soft match copy on home |
| 5 | `wordle` | north | +10% | P3 | [x] | Mentioned on `/games-like-krillion` word-guessing card; avoid trademark abuse in titles |
| 6 | `one in a krillion game` | north | +30% | P1 | [x] | Live: `/one-in-a-krillion` title/desc/FAQ exact-match |
| 7 | `unlimited krillion` | north | +20% | P0 | [x] | Live: `/unlimited-krillion` — keep SEO + related-games links |
| 8 | `krillion unlimited` | north | +20% | P0 | [x] | Alias: redirect deferred; phrase in Unlimited meta/keywords + hub copy |
| 9 | `games like krillion` | north | +30% | P1 | [x] | New page `/games-like-krillion` — similar games + our modes CTA |
| 10 | `the krillion` | north | +10% | P1 | [x] | Brand FAQ / about copy; optional `/the-krillion` → home |

### A2 — Queries 11–20

| # | Query | Interest | Change | Tier | Status | Planned work |
|---|-------|----------|--------|------|--------|--------------|
| 11 | `daily krillion` | south | −3% | P0 | [x] | Strengthen daily CTA copy (“Daily Krillion”); `/daily-challenge` meta |
| 12 | `krillion pokemon` | north | +60% | P1 | [x] | Live: `/pokemon-krillion` (fan-made disclaimer) |
| 13 | `pokemon krillion` | north | +40% | P1 | [x] | Same page; dual title/H2 + FAQ coverage |
| 14 | `noillirk` | north | +500% | P1 | [x] | Live: `/noillirk` + `/reverse-krillion` — common answers win |
| 15 | `krillion unlimited game` | north | +4% | P0 | [x] | Unlimited page title/desc include “Krillion unlimited game” |
| 16 | `the krillion game` | south | −10% | P0 | [x] | Home/about exact phrase; redirect `/the-krillion-game` → `/` |
| 17 | `daily games` | south | −20% | P3 | [ ] | Soft discovery copy on daily page (“daily games like Krillion”); avoid thin doorway pages |
| 18 | `krillion multiplayer` | north | +30% | P2 | [ ] | Product: async/shared dive or rooms; landing `/multiplayer` (spec first) |
| 19 | `long shot` | Breakout | P2 | [x] | Live: `/long-shot-krillion` |
| 20 | `poople` | north | +2% | P3 | [ ] | Competitor/adjacent; optional mention on `/games-like-krillion` only |

### A3 — Queries 31–50

| # | Query | Interest | Change | Tier | Status | Planned work |
|---|-------|----------|--------|------|--------|--------------|
| 31 | `krillion too clever` | north | +250% | P1 | [x] | Live: `/guides/too-clever` scoring tips + FAQ |
| 32 | `krillon game` | north | +30% | P1 | [ ] | Typo of Krillion — soft redirect `/krillon` → home |
| 33 | `globle` | south | −40% | P3 | [ ] | Adjacent geography daily; list on `/games-like-krillion` only |
| 34 | `farflung` | Breakout | P2 | [x] | Live: `/farflung` cosmic rare-answer exploration |
| 35 | `worldle` | south | −30% | P3 | [ ] | Adjacent; discovery page mention (with Wordle/Globle) |
| 36 | `krillion 1v1` | north | +60% | P2 | [ ] | Multiplayer duel mode; `/1v1` under multiplayer spike |
| 37 | `cosmillion` | Breakout | P2 | [x] | Live: `/cosmillion` Classic Moonshot |
| 38 | `krillion type games` | north | +180% | P1 | [x] | Covered via `/games-like-krillion` type cards + `/games` hub |
| 39 | `wonderhop` | Breakout | P2 | [ ] | See Track B — Wonderhop |
| 40 | `puffer party krillion` | Breakout | P2 | [x] | Live: `/puffer-party-krillion` Don’t Fall party mode |
| 41 | `size it up` | south | −50% | P3 | [ ] | Adjacent sizing game; discovery mention or SKIP |
| 42 | `puffer party` | Breakout | P2 | [x] | Covered by `/puffer-party-krillion` |
| 43 | `sports krillion` | south | −10% | P1 | [x] | Live: `/sports-krillion` sports games listing hub |
| 44 | `plain` | Breakout | P3 | [ ] | See Track B — Plain |
| 45 | `nba krillion` | north | +140% | P1 | [x] | Live: `/nba-krillion` (same pack, NBA naming) |
| 46 | `infinite krillion` | south | −20% | P0 | [x] | Alias redirect deferred; phrase in Unlimited meta (“Infinite Krillion practice”) |
| 47 | `plain game` | Breakout | P2 | [ ] | See Track B — Plain |
| 48 | `krillion answers today` | north | +50% | P1 | [x] | Live: `/guides/answers-today` hints only — no spoilers |
| 49 | `1 in a krillion` | south | −3% | P0 | [x] | Live: `/1-in-a-krillion` → `/one-in-a-krillion`; copy + FAQ |
| 50 | `worlde` | south | −10% | P3 | [ ] | Typo of Wordle/Worldle — discovery page only |

### A4 — New from 2026-11-19 rising 1–10 (not already listed)

| # | Query | Interest | Change | Tier | Status | Planned work |
|---|-------|----------|--------|------|--------|--------------|
| A4.1 | `what is krillion` | north | +10% | P0 | [x] | Home guide H2 + FAQ JSON-LD; About section (reworded, not copy-paste) |
| A4.2 | `krillion io` | south | −80% | SKIP | [x] | Competitor domain — do not mention or target; ignore |
| A4.3 | `connections` | north | +60% | P3 | [ ] | NYT Connections–adjacent; optional `/games-like-krillion` mention only (no trademark in title) |

> Already covered in A1–A3 (skipped): `krillion game`, `the krillion`, `unlimited krillion`, `krillion unlimited`, `wordle`, `one in a krillion`, `krillion games`.

### Track A delivery order

1. **Aliases & redirects** — `krillion-unlimited`, `one-in-a-krillion`, `1-in-a-krillion`, `the-krillion`, `the-krillion-game`, `infinite-krillion`, typos `krillon` / `kirllion` / `keillion`
2. **Copy/SEO pass** — home, games hub, unlimited, daily (1–4, 6, 10–11, 15–16, 46, 49)
3. **Discovery page** — `/games-like-krillion` + **krillion type games** (9, 38) + Wordle/Worldle/Globle/poople/size-it-up (5, 17, 20, 33, 35, 41, 50)
4. **Help / anti-spoiler** — `krillion too clever` tips (31); `krillion answers today` hints-only (48)
5. **Theme packs** — Pokémon (12–13); Sports / NBA (43, 45)
6. **Reverse mode** — Noillirk / reverse Krillion (14 + breakout reverse cluster)
7. **Multiplayer / 1v1** — spec + MVP for 18 + 36
8. **Breakout modes** — Farflung, Cosmillion, Wonderhop, Puffer Party, Plain (34, 37, 39–40, 42, 44, 47)
9. **Measure** — Search Console impressions after each ship

---

## Track B — Breakout searches (new games / modes)

Treat as product + SEO opportunities. Group by **cluster** (one build covers many queries).

### B1 — Queries 1–10

| # | Query | Signal | Tier | Status | Planned work |
|---|-------|--------|------|--------|--------------|
| 1 | `long shot` | Breakout | P2 | [x] | Live: Long Shot Krillion `/long-shot-krillion` |
| 2 | `long shot game` | Breakout | P2 | [x] | Covered by `/long-shot-krillion` meta/title |
| 3 | `long shot game krillion` | Breakout | P2 | [x] | Hub + Sports listing cross-links |
| 4 | `long shot krillion game` | Breakout | P2 | [x] | Brand: Long Shot Krillion + keywords |
| 5 | `farflung` | Breakout | P2 | [x] | Live: `/farflung` cosmic rare-answer exploration |
| 6 | `cosmillion` | Breakout | P2 | [x] | Live: `/cosmillion` Classic Moonshot (bots) |
| 7 | `wonderhop` | Breakout | P2 | [ ] | Mode **Wonderhop**; `/wonderhop` |
| 8 | `puffer party krillion` | Breakout | P2 | [x] | Live: `/puffer-party-krillion` (KrillionPro Don’t Fall party) |
| 9 | `puffer party` | Breakout | P2 | [x] | Same page |
| 10 | `plain` | Breakout | P3 | [ ] | See `plain game` / `plane game` — validate intent |

### B2 — Queries 11–20

| # | Query | Signal | Tier | Status | Planned work |
|---|-------|--------|------|--------|--------------|
| 11 | `plain game` | Breakout | P2 | [ ] | Mode **Plain** (simple classic dive) if intent holds; `/plain-game` |
| 12 | `dartle` | Breakout | P3 | [ ] | Adjacent daily game; list on `/games-like-krillion` or skip |
| 13 | `kirllion` | Breakout | P1 | [ ] | Typo of Krillion — soft 404 → home + “Did you mean Krillion?” |
| 14 | `moonshot` | Breakout | P2 | [x] | Covered by `/cosmillion` Moonshot mode (alias deferred) |
| 15 | `minecraft krillion game` | Breakout | P0 | [x] | Live: `/minecraft-krillion-game` — tighten title/meta to exact query |
| 16 | `plane game` | Breakout | P3 | [ ] | Likely typo/misspell of `plain game` — redirect or shared landing |
| 17 | `krillion backwards game` | Breakout | P1 | [x] | Covered by `/noillirk` + Reverse SEO FAQ |
| 18 | `opposite of krillion` | Breakout | P1 | [x] | Covered by `/reverse-krillion` + FAQ |
| 19 | `farflung game` | Breakout | P2 | [x] | Covered by `/farflung` title/keywords |
| 20 | `stranger things characters` | Breakout | P2 | [x] | Live: `/stranger-things-krillion` Upside Down challenge (fan-made) |

### B3 — Queries 21–30

| # | Query | Signal | Tier | Status | Planned work |
|---|-------|--------|------|--------|--------------|
| 21 | `long shot hoops game` | Breakout | P2 | [x] | Covered: sports/hoops prompts + FAQ on `/long-shot-krillion` |
| 22 | `long shot hoops` | Breakout | P2 | [x] | Same as 21 |
| 23 | `krillion.io` | Breakout | SKIP | [x] | Competitor site — do not mention, link, or SEO-target |
| 24 | `keillion` | Breakout | P1 | [ ] | Typo → home (“Did you mean Krillion?”) |
| 25 | `longshot game` | Breakout | P2 | [x] | Keyword on `/long-shot-krillion` (redirect deferred in dev) |
| 26 | `eraly` | Breakout | P3 | [ ] | Validate intent; likely unrelated / typo — SKIP until GSC confirms |
| 27 | `perceptle` | Breakout | P3 | [ ] | Adjacent game; `/games-like-krillion` only |
| 28 | `reverse krillion` | Breakout | P1 | [x] | Live: `/reverse-krillion` |
| 29 | `spotle` | Breakout | P3 | [ ] | Adjacent; discovery page mention only |
| 30 | `great ape species` | Breakout | P2 | [ ] | Dedicated mode `/great-ape-krillion` (apes only — not the general animal pack) |

### B4 — New from 2026-11-19 rising-breakout 1–10 (not already listed)

| # | Query | Signal | Tier | Status | Planned work |
|---|-------|--------|------|--------|--------------|
| B4.1 | `krillion noillirk` | Breakout | P1 | [x] | Live: `/noillirk` + `/reverse-krillion` — add phrase to Reverse meta/FAQ |
| B4.2 | `krillion answers` | Breakout | P1 | [x] | Covered by `/guides/answers-today` (hints only) — broaden keywords beyond “today” |
| B4.3 | `krillion sports` | Breakout | P1 | [x] | Live: `/sports-krillion` — dual phrasing with `sports krillion` in hub meta |
| B4.4 | `krillion puffer party` | Breakout | P2 | [x] | Live: `/puffer-party-krillion` |
| B4.5 | `krillion opposite` | Breakout | P1 | [x] | Covered by Reverse / Noillirk — FAQ “Krillion opposite” phrasing |
| B4.6 | `opposite krillion` | Breakout | P1 | [x] | Same as B4.5 / `opposite of krillion` |

> Already covered in Track A / B1–B3 (skipped): `noillirk`, `sports krillion`, `puffer party krillion`, `puffer party`.

### Track B clusters → one ship each

| Cluster | Queries covered | Route(s) | Phase |
|---------|-----------------|----------|-------|
| **Long Shot** | breakout 1–4, 21–22, 25; rising 19 | `/long-shot-krillion` | B1 |
| **Puffer Party** | breakout 8–9; rising 40, 42; B4.4 | `/puffer-party-krillion` Don’t Fall party (own mode) | B2 |
| **Cosmillion / Moonshot** | breakout 6, 14; rising 37 | `/cosmillion` Classic Moonshot (bots); `/moonshot` alias deferred | B3 |
| **Farflung** | breakout 5, 19; rising 34 | `/farflung` | B4 |
| **Wonderhop** | breakout 7; rising 39 | `/wonderhop` | B5 |
| **Plain / Plane** | breakout 10–11, 16; rising 44, 47 | `/plain-game` (+ plane alias) | B6 |
| **Reverse / Noillirk** | rising 14; breakout 17–18, 28; B4.1/5/6 (`krillion noillirk`, opposite variants) | `/reverse-krillion`, `/noillirk` | B7 (P1 — high +500%) |
| **Pokémon** | rising 12–13 | `/pokemon-krillion` | B8 |
| **Sports / NBA** | rising 43, 45; B4.3 `krillion sports` | `/sports-krillion` listing → `/nba-krillion` + more packs | B8b |
| **Stranger Things** | breakout 20 | `/stranger-things-krillion` | B9 |
| **Animal Krillion** | wildlife rare-answer; art: jungle safari splash; tagline “Think beyond the animal kingdom!”; scoring Common→Animal Legend (10/20/40/60/80/100) | `/krillion-animal` (outline also listed `/animal-krillion` — alias deferred) | B9b [x] |
| **Wordplay Krillion** | word / rhyme / language rare-answer; fantasy wonderland + glowing book; 7×45s; Common→Wordplay Legend | `/wordplay-krillion` | B9c [x] |
| **Science Krillion** | STEM rare-answer; futuristic lab; curated science banks; Common Discovery→Scientific Legend | `/science-krillion` | B9d [x] |
| **Medical Krillion** | medical / anatomy / clinical trivia rare-answer; curated banks; Common Knowledge→Medical Legend | `/medical-krillion` | B10 [x] |
| **Great Ape** | breakout 30; jungle waterfall; curated great-ape banks; Common→Ape Legend | `/great-ape-krillion` | B10b [x] |
| **Too clever / answers** | rising 31, 48; B4.2 `krillion answers` | guides (no spoilers) | B0 |
| **Typos** | `kirllion`, `keillion`, `krillon` | redirects / soft suggest | B0 (cheap) |
| **Infinite → Unlimited** | rising 46 | `/infinite-krillion` → unlimited | B0 |
| **What is Krillion** | A4.1 | home / about / FAQ | B0 |
| **Connections (adjacent)** | A4.3 | `/games-like-krillion` mention only | P3 |
| **Minecraft** | breakout 15 | already live | done |
| **Krillion-type / discovery** | rising 9, 38 | `/games-like-krillion` | P1 |
| **Adjacent only** | dartle, poople, perceptle, spotle, eraly, globle, worldle, worlde, size it up | discovery / SKIP | — |
| **Multiplayer / 1v1** | rising 18, 36 | `/multiplayer`, `/1v1` | product spike |

Each new mode should reuse the dive chrome pattern:

- `GamePageIntro` (title, short desc, related games)
- Play viewport (depth/zone HUD, sound, music, pass/dive)
- Continuous music until user mutes
- SEO article + FAQ targeting the keyword cluster
- Fan-theme disclaimer where needed (Pokémon, Stranger Things, Minecraft)
- Entry in `RELATED_GAMES` + header/footer

---

## Track C — Shared infrastructure (supports A + B)

| Item | Status | Notes |
|------|--------|-------|
| Keyword → route map in CMS/config | [ ] | Single source for redirects + nav |
| Typo redirects (`kirllion`, `keillion`, `krillon`) | [ ] | Soft landing → home |
| Related games includes new modes | [ ] | Update `lib/game-pages.ts` per ship |
| Sitemap + `robots` for new routes | [ ] | Every new landing |
| Canonical + redirects for aliases | [ ] | Avoid duplicate content |
| Fan-content legal disclaimers | [ ] | Pokémon / ST / Minecraft / NBA templates |
| Anti-spoiler policy for “answers today” | [x] | `/guides/answers-today` — hints only, never answer lists |
| Search Console monitoring sheet | [ ] | Rising 1–50 + breakout 1–30 monthly |
| Multiplayer / 1v1 tech spike doc | [ ] | Rooms, duels, async scores |

---

## Already live (do not rebuild)

| Surface | Route | Keywords covered |
|---------|-------|------------------|
| Daily Dive | `/` · `/daily-challenge` | krillion game, daily krillion (partial) |
| One in a Krillion | `/one-in-a-krillion` · `/1-in-a-krillion` → | Playable 7×25s dive + rarity rank; keywords: one in a krillion game |
| Unlimited Krillion | `/unlimited-krillion` · `/unlimited` | unlimited krillion, krillion unlimited, infinite krillion (aliases pending) |
| Minecraft Krillion | `/minecraft-krillion-game` | `minecraft krillion game` |
| Games hub | `/games` | krillion games (partial) · `/game-packs` removed |

---

## Implementation checklist (use as sprint board)

### Sprint — cheap wins (typos, aliases, live SEO)

- [ ] Redirect `/krillion-unlimited` → `/unlimited-krillion`
- [ ] Redirect `/infinite-krillion` → `/unlimited-krillion`
- [x] Dedicated `/one-in-a-krillion` landing (not thin redirect) — brand + top-tier guide
- [x] Redirect `/1-in-a-krillion` → `/one-in-a-krillion`
- [ ] Redirect `/the-krillion` → `/`
- [ ] Redirect `/the-krillion-game` → `/`
- [ ] Redirect `/longshot` / `/long-shot` → `/long-shot-krillion` (when asked)
- [ ] Soft redirects: `/kirllion`, `/keillion`, `/krillon` → home
- [ ] Tighten Minecraft title/meta for `minecraft krillion game`
- [ ] Unlimited copy for `krillion unlimited game` / `infinite krillion`
- [ ] Daily copy for `daily krillion`
- [x] Do not mention competitor `krillion.io` / `krillion io` (SKIP)

### Sprint — rising brand SEO

- [x] Homepage / games hub copy for `krillion game`, `krillion games` (natural, not duplicated walls of text)
- [x] FAQ / About: `what is krillion` (A4.1) — once per surface, different wording
- [x] Unlimited meta + one sentence for `unlimited krillion` / `krillion unlimited`
- [ ] Page `/games-like-krillion` targeting `games like krillion` + `krillion type games` (page live; Connections mention still open)
- [ ] Mentions: Connections (A4.3) on games-like
- [ ] Light “vs Wordle” FAQ (no trademark in title tag)
- [x] Guide: `krillion too clever` (+250%) — `/guides/too-clever`
- [x] `krillion answers today` / `krillion answers` — `/guides/answers-today` hints only (no spoiler dump)

### Sprint — Sports / NBA (+140%)

- [x] Listing hub `/sports-krillion` (sports games directory)
- [x] Playable `/nba-krillion` listed on the hub
- [x] Cover `sports krillion`, `nba krillion`, `krillion sports`

### Sprint — Reverse / Noillirk (+500%)

- [x] Design reverse rules (common answers win / altitude)
- [x] Routes `/reverse-krillion` + `/noillirk`
- [x] Cover: `noillirk`, `krillion noillirk`, `reverse krillion`, `krillion backwards game`, `opposite of krillion`, `krillion opposite`, `opposite krillion`

### Sprint — Long Shot cluster

- [x] Design Long Shot rules (rarer answers / 35s longer clock)
- [x] Validate `long shot hoops` intent (sports/hoops prompts + rare-answer mode)
- [x] Pack + judge data
- [x] Page `/long-shot-krillion` — **Long Shot Krillion** intro + viewport + SEO
- [x] Meta for long shot / long shot game / longshot / long shot krillion / hoops

### Sprint — theme packs

- [x] `/pokemon-krillion` (`krillion pokemon`, `pokemon krillion`)
- [x] `/stranger-things-krillion` Upside Down challenge (7×45s, rarity meter, fan-made)
- [x] `/krillion-animal` — Animal Krillion (wildlife rare-answer; jungle safari BG + wooden-sign HUD from splash art; 7 rounds)
- [x] `/wordplay-krillion` — Wordplay Krillion (fantasy wonderland BG; 7×45s; rhymes/synonyms/puzzles)
- [x] `/science-krillion` — Science Krillion (futuristic lab BG; 7×45s; curated STEM banks)
- [x] `/medical-krillion` — Medical Krillion (futuristic medical lab BG; 7×25s; curated clinical banks)
- [x] `/great-ape-krillion` — Great Ape Krillion (jungle waterfall BG; 7×45s; curated primate banks)
- [x] Remove `/game-packs` placeholder page (hub is `/games` only)

### Later breakout modes

- [x] `/puffer-party-krillion` Don’t Fall party mode (covers puffer party cluster)
- [x] `/cosmillion` Classic + Space Survival + Rare Answer Hunt (bots; real MP later; `/moonshot` alias deferred)
- [x] `/farflung` cosmic rare-answer exploration (7×45s, rarity meter)
- [ ] `/wonderhop`
- [ ] `/plain-game` (+ `plane game` alias if confirmed)
- [ ] Multiplayer MVP for `krillion multiplayer` + `krillion 1v1`

---

## Notes

- Prefer **one canonical URL** per mode; use redirects for keyword aliases and typos.
- Breakout names may be competitor or fan terms — validate intent in Search Console before heavy build.
- `plain` / `plane game` / `long shot hoops` / `eraly` need intent checks before full builds.
- Never ship full “answers today” lists — tips/hints only (query 48 + AdSense/integrity risk).
- Themed IPs (Pokémon, Stranger Things, NBA): fan-made disclaimers; no official affiliation claims.
- Keep AdSense / legal pages linked from every new game page footer.
- Music: loop game track until user mutes (same as Minecraft / Unlimited).

)
