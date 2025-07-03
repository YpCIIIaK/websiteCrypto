### *Green*

|Role|Dark-mode HEX|Light-mode HEX|Tailwind alias|Usage|
|---|---|---|---|---|
|**Brand (primary)**|`#174832`|`#1F6B48`|`brand`|Header bar, buttons, links, chart line default|
|**Brand-dark**|`#0F3322`|`#145239`|`brand-dark`|Sidebar bg, hover states|
|**Brand-light / accent**|`#2E6C4E`|`#3F9169`|`brand-light`|Charts secondary line, badge backgrounds|
|**Surface-0** (card)|`#0C1F18`|`#F8FFFC`|`surface`|Cards, modals|
|**Surface-1** (elevated)|`#122E24`|`#EBFAF2`|`surface-alt`|Hover / selected card|
|**Text-primary**|`#EAF7F0`|`#0C1F18`|`text-base`|Body copy|
|**Text-secondary**|`#94B6AA`|`#527A68`|`text-muted`|Labels, placeholders|
|**Success**|`#22C55E`|`#19934A`|`success`|Positive P/L, live bot chip|
|**Danger**|`#EF4444`|`#D93737`|`danger`|Negative P/L, errors|
|**Warning**|`#FACC15`|`#E0B100`|`warn`|High volatility badge|
|**Info / Accent blue**|`#3B82F6`|`#1D4ED8`|`info`|Links, active slider thumb|
|**Chart palette**|`#3B82F6`, `#A855F7`, `#F97316`, `#10B981`, `#EAB308`|same|—|Distinct series lines|
```tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand:        '#245135',
        'brand-dark': '#183923',
        'brand-light':'#2F7048',
        surface:      '#0E1C15',
        'surface-1':  '#142A1F',
        success:      '#22C55E',
        danger:       '#EF4444',
        info:         '#3B82F6',
        text: {
          base:   '#EAF7F0',
          muted:  '#A3BDB3'
        }
      }
    }
  },
  darkMode: 'class',
}

```

### *Blue*

|Role|Hex|RGB|Tailwind key|Typical use|
|---|---|---|---|---|
|Brand-primary|`#245135`|36 81 53|`brand`|header, CTA, slider track|
|Brand-light|`#2F7048`|47 112 72|`brand-light`|hovers, default chart line|
|Brand-dark|`#183923`|24 57 35|`brand-dark`|sidebar / card bg|
|**Accent-blue (info)**|**`#225E9A`**|34 94 154|`accent`|links, average thumb, 2nd chart series|
|Accent-blue-light|`#2F7AC6`|47 122 198|`accent-light`|hover on links, selected nav|
|Accent-blue-dark|`#17446D`|23 68 109|`accent-dark`|pressed button, tooltip bg|
|Success|`#22C55E`|34 197 94|`success`|gains, LIVE chip|
|Danger|`#EF4444`|239 68 68|`danger`|losses, errors|
|Surface-0|`#0E1C15`|14 28 21|`surface`|cards|
|Surface-1|`#142A1F`|20 42 31|`surface-alt`|hovered card|
|Text-primary|`#EAF7F0`|234 247 240|`text-base`|headings|
|Text-muted|`#A3BDB3`|163 189 179|`text-muted`|labels|
```tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand:        '#245135',
        'brand-light':'#2F7048',
        'brand-dark': '#183923',
        accent:        '#225E9A',
        'accent-light':'#2F7AC6',
        'accent-dark': '#17446D',
        surface:      '#0E1C15',
        'surface-alt':'#142A1F',
        success:      '#22C55E',
        danger:       '#EF4444',
        text: {
          base:   '#EAF7F0',
          muted:  '#A3BDB3'
        }
      }
    }
  },
  darkMode: 'class'
}

```