# Color Grading Reference

## Color Workflow

### On-Set (Production)
- Monitor calibration
- LUT application (Log footage)
- Exposure verification

### Dailies
- Organization by scene/day
- Primary correction
- Shot matching

### Assembly
- Temp color for review
- Mood setting
- Director/DP collaboration

### Final Grade
- Primary: Lift/Gamma/Gain
- Secondary: Power windows
- Qualifiers: Skin tones
- Creative: Looks

## Color Looks

| Look | Description | Used For |
|------|-------------|----------|
| Neutral | Log footage look | Dailies |
| Natural | Slight warmth | Drama |
| Bleach Bypass | Desaturated, high contrast | Gritty |
| Teal Orange | Split toning | Blockbusters |
| Film Noir | High contrast B&W | Crime |
| Warm Vintage | Sepia/warm highlights | Period |
| Cool Modern | Blue shadows | Thriller |
| High Key | Bright, low contrast | Comedy |
| Low Key | Dark, dramatic | Horror |

## Primary Correction

### Exposure
```
Lift: Shadows (0.00 - 1.00)
Gamma: Midtones (1.00)
Gain: Highlights (1.00)
```

### Temperature
```
Kelvin shift: -100 (cool) to +100 (warm)
```

### Tint
```
Green to Magenta: -100 to +100
```

## Secondary Correction

### Power Windows

| Shape | Use |
|-------|-----|
| Circle | Face isolation |
| Rectangle | Sky replacement |
| Polygon | Building edges |
| Ellipse | Eye highlight |

### Qualifiers

| Qualifier | Target |
|-----------|--------|
| Hue | Specific colors |
| Luminance | Bright/dark areas |
| Saturation | Color intensity |

## Color Harmony

### Complementary Colors
- Blue ↔ Orange (sunset)
- Red ↔ Green (nature)
- Yellow ↔ Purple (contrast)

### Analogous Colors
- Blue, Blue-Green, Green
- Warm, cohesive look

### Triadic
- Red, Yellow, Blue
- Vibrant, balanced

## Export for Delivery

| Platform | Color Space | Bit Depth |
|----------|-------------|-----------|
| Cinema DCP | XYZ | 12-bit |
| Broadcast | Rec.709 | 10-bit |
| HDR | Rec.2020/PQ | 10-bit |
| Web | sRGB | 8-bit |

## Common Looks (LUT Presets)

```
/grade "cinematic" → Teal shadows, warm highlights
/grade "bleach" → Desaturated, high contrast
/grade "golden" → Warm, soft, nostalgic
/grade "noir" → Black & white, high contrast
```
