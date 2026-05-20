# Bau Job AG — Website

Statische One-Pager-Website für **Bau Job AG**, Schweizer Personalvermittlung im Baugewerbe (Temporär & Festanstellung).

🌐 **Live:** _wird nach Vercel-Deployment hier verlinkt_

---

## Übersicht

Eine impeccable gestaltete Single-Page-Website mit dem Charakter einer Schweizer Baustelle: präzise, klar, kompromisslos. Schwarz, Weiss und das Bau-Job-Gelb (#FDB515) — eingesetzt wie Bauwarnband: selten, aber laut.

### Inhaltsbereiche

1. **Hero** — Headline, Logo-Animation, Trade-Rail, dual CTA
2. **Marquee** — laufende Liste der Berufsgruppen (Maurer, Polier, Bauführer, …)
3. **Leistungen** — Temporär · Festanstellung · Try & Hire
4. **Für Unternehmen / Für Fachkräfte** — Split-Section, zwei Zielgruppen, eine Sprache
5. **Stats** — animierte Zähler mit Schweizer Zahlenformat (1'247+)
6. **Prozess** — vom Anruf zur Mannschaft in vier Schritten
7. **Testimonial** — Stimme aus der Praxis
8. **Kontakt** — Adresse, Telefon, E-Mail, Anfrageformular

---

## Tech

| Schicht | Wahl |
|---|---|
| Markup | Semantisches HTML5 |
| Stil | Vanilla CSS — OKLCH-Farbsystem, fluide Typografie, 4-pt Spacing-Scale |
| Interaktion | Vanilla JS — `IntersectionObserver` für Reveals, Smooth-Scroll, Counter |
| Fonts | Bricolage Grotesque + Geist + Geist Mono (Google Fonts) |
| Hosting | Vercel (Statisch) |

**Keine Frameworks. Keine Build-Schritte.** Drei Dateien, eine Assets-Ordner, das war's.

---

## Brand-Tokens

```css
--c-ink:    oklch(0.13 0.012 250)   /* Tiefes Schwarz, kühl getönt */
--c-paper:  oklch(0.98 0.003 240)   /* Off-White */
--c-accent: oklch(0.82 0.175 82)    /* Job-Gold ≈ #FDB515 */
```

Logo-Schutzraum, Schriftpaarung und Farbgewichtung folgen dem [Bau Job AG Brand Manual](./bau_job_ag_brand_package%202/02_Brand_Guidelines/Bau_Job_AG_Brand_Guide.pdf).

---

## Lokale Entwicklung

```bash
# In den Projektordner wechseln
cd website

# Statischen Server starten
python3 -m http.server 4733

# Im Browser öffnen
open http://localhost:4733
```

---

## Animation

Sanft, intentioniert, immer mit `prefers-reduced-motion`-Fallback:

- Logo-Polygone erscheinen gestaffelt (`pop`)
- Headline rollt zeilenweise aus einer Maske (`reveal-up`)
- Highlight wischt unter dem Wort "Karrieren" durch
- Marquee läuft endlos linear
- Zähler animieren mit Quart-Easing
- Hover-States füllen Buttons von links nach rechts mit Gelb
- Maus-Parallax auf dem Hero-Logo (nur Desktop, nur `pointer: fine`)

---

## Deployment

Auto-Deployment via Vercel + GitHub:

- `main`-Branch → Production
- PR-Branches → Preview-URLs

Manueller Deploy:

```bash
vercel deploy --prod
```

---

## Lizenz

Markenrechte, Logo und Brand-Package liegen bei **Bau Job AG**. Quellcode der Website: privat / firmeneigen.
