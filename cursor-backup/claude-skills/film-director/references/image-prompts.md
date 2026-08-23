# Scene Image Prompt Guide

## Prompt Structure

```
[Scene description], [camera angle], [lighting mood], [color palette], [style]
```

## Camera Angles

| Angle | Use Case |
|-------|----------|
| Extreme Wide Shot (EWS) | Establishing, epic scale |
| Wide Shot (WS) | Full body, environmental context |
| Medium Shot (MS) | Waist up, conversation |
| Medium Close-Up (MCU) | Chest up, tension |
| Close-Up (CU) | Face, emotion |
| Extreme Close-Up (ECU) | Details, intensity |
| Over-the-Shoulder (OTS) | Conversation, reaction |
| Point of View (POV) | Character perspective |
| Dutch Angle | Unease, disorientation |
| Bird's Eye | Vulnerability, pattern |
| Worm's Eye | Power, intimidation |

## Lighting Moods

| Mood | Description |
|------|-------------|
| Chiaroscuro | High contrast, dramatic shadows |
| Film Noir | Low key, dramatic |
| Golden Hour | Warm, nostalgic |
| Blue Hour | Cool, melancholy |
| High Key | Bright, optimistic |
| Low Key | Dark, mysterious |
| Natural | Documentary feel |
| Neon Noir | Cyberpunk, urban |
| Softbox | Beauty, gentle |
| Rembrandt | Classic portrait |

## Style References

| Style | Description |
|-------|-------------|
| Cinematic | 2.39:1 aspect ratio, film grain |
| Anamorphic | Cinematic blur, blue bokeh |
| Vintage 35mm | Warm, grain, light leaks |
| Modern Digital | Clean, high resolution |
| Black & White | Timeless, dramatic |
| Sepia | Historical, memory |
| desaturated | Gritty, realistic |
| Oversaturated | Dreamlike |

## Example Prompts

### Confrontation Scene
```
A tense confrontation between two figures in a dimly lit warehouse, medium close-up from low angle, dramatic side lighting with deep shadows, desaturated blue tones, cinematic 2.39:1 aspect ratio, film grain, 35mm analog look
```

### Romantic Scene
```
Golden hour light streaming through window onto couple, soft warm tones, shallow depth of field, romantic atmosphere, lens flare, cinematic color grading, 85mm portrait style
```

### Action Scene
```
Dynamic action shot of figure leaping across rooftops, wide angle, motion blur, neon city lights in background, night scene, Hong Kong cinema style, dynamic framing
```

### Horror Scene
```
Dark hallway with single flickering light, low angle tracking shot, extreme shadows, greenish tint, film noir tension, handheld camera feel, abandoned asylum aesthetic
```

## Image Generation Tools

### MiniMax Integration
Use `/image` command for MiniMax image generation.

### Midjourney Compatible
Prompts work with MJ when formatted as:
```
/imagine prompt: [description], --ar 2.39:1 --style cinematic --film
```

## Aspect Ratios

| Ratio | Use |
|-------|-----|
| 2.39:1 | Cinematic widescreen |
| 1.85:1 | Standard cinema |
| 16:9 | TV/Digital |
| 4:3 | Vintage/TV |
| 1:1 | Social/Instagram |
| 9:16 | Vertical/Shorts |
