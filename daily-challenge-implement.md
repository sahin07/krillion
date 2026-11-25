# Daily Challenge — product implement track

Source: KrillionPro Daily Challenge page brief.  
Route: `/daily-challenge`  
Keep **Daily** and **Unlimited** separate.

---

## Product rules

| | Daily Challenge | Unlimited Mode |
|--|-----------------|----------------|
| Questions | Same eight for everyone | New sets anytime |
| Timer | 20s each | 20s each (own packs) |
| Cadence | Once per shared UTC day | Endless |
| Why return | Daily competition | Unlimited entertainment |

Build complete **gameplay + results** before leaderboards / multiplayer.

---

## Page layout (order)

| # | Section | Status | Notes |
|---|---------|--------|-------|
| 1 | Hero — Today’s Challenge | [x] | Date, Daily Dive, stats (06 / 20s / ∞), CTA |
| 2 | Start Challenge | [x] | Scrolls into viewport; starts music |
| 3 | Gameplay interface | [x] | Prompt, timer, input, submit/pass, progress, depth |
| 4 | Answer reveal + scoring | [x] | Valid / rarity / points / dive deeper |
| 5 | Final results | [x] | Score, depth, valid count, rarest, share, Unlimited CTA |
| 6 | Today’s leaderboard | [x] | Device board + diver name (localStorage) |
| 7 | Previous challenges | [x] | 14-day archive · `?date=` practice |
| 8 | How scoring works | [x] | Tier table |
| 9 | Daily streak | [x] | Device streak + best (localStorage) |
| 10 | Challenge rules | [x] | Timer + validity |
| 11 | Share challenge | [x] | Link + in-game share results |
| 12 | FAQ | [x] | Daily-specific |

---

## Gameplay checklist

- [x] Question prompt  
- [x] Countdown timer  
- [x] Answer input + submit  
- [x] Question progress  
- [x] Current depth + zone  
- [x] Points earned  
- [x] Underwater atmosphere  
- [x] Continuous music until user mutes  
- [ ] Animated depth transitions (enhance later)  
- [x] Device ranking after finish  
- [ ] Global shared leaderboard (needs server DB)  
- [ ] “Best answer of the day” global (needs aggregation)

---

## Files

- `components/dive/DailyDiveGame.tsx` — hero + viewport  
- `components/dive/DailyChallengeSections.tsx` — below-fold  
- `app/daily-challenge/page.tsx` — page shell  
- `lib/dive/types.ts` — `DAILY_PROMPTS_PER_DIVE = 8`, `DAILY_PROMPT_SECONDS = 20`  
- `data/dives/daily-01` … `daily-05.json` — 8 prompts each (5 rotating packs)  

---

## Next (priority)

1. Persist daily run + optional nickname → today’s leaderboard  
2. Previous daily archive  
3. Streak (localStorage first, then accounts)  
4. Multiplayer / 1v1 (see `future-implement.md`)  
