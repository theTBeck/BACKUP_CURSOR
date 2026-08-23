---
name: film-image-generator
description: "AI image generator for film scenes, concept art, storyboards, visual references. Use when: generating images, concept art, storyboards, visual references, scene visualization. Uses MiniMax for image generation. Keywords: image, art, concept, storyboard, visual, generate."
license: MIT
version: 2.0.0
---

# Film Image Generator Skill v2.0

Generate cinematic images for film production using MiniMax.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `/image [prompt]` | Generate scene image |
| `/concept [description]` | Concept art |
| `/storyboard [scene]` | Storyboard frame |
| `/portrait [character]` | Character portrait |

## Image Prompt Structure

```
[Subject], [action], [setting], [camera angle], [lighting], [mood], [style], [aspect ratio]
```

## Prompt Examples

### Scene: Abandoned Warehouse
```
Two figures in a dimly lit abandoned warehouse, tense
confrontation, single overhead light creating dramatic
chiaroscuro shadows, film noir aesthetic, cinematic
2.39:1 aspect ratio, photorealistic, 35mm film grain
```

### Character Portrait
```
Close-up portrait of中年男子, weathered face, intense
eyes, dramatic side lighting, shallow depth of field,
cinematic color grading, moody atmosphere, 85mm lens
```

### Establishing Shot
```
Wide aerial view of city skyline at dusk, golden hour
light, silhouetted buildings against orange sky,
epic scale, cinematic composition, 24mm wide angle,
2.39:1 aspect ratio
```

### Storyboard Frame
```
Medium shot, man entering doorway, door on right third
of frame, motion blur on feet, tension in body posture,
overcast lighting, suspenseful mood, cinematic framing,
blue-gray color palette, storyboard style
```

## Aspect Ratios

| Ratio | Use Case |
|-------|----------|
| 2.39:1 | Cinematic widescreen |
| 1.85:1 | Standard cinema |
| 16:9 | TV/Digital |
| 1:1 | Square |
| 9:16 | Vertical/Shorts |
| 4:3 | Vintage |

## Style Presets

| Style | Keywords |
|-------|----------|
| Cinematic | film grain, 35mm, anamorphic, 2.39:1 |
| Noir | high contrast, shadows, black & white |
| Vintage | warm tones, grain, light leaks |
| Modern | clean, sharp, digital |
| Gritty | desaturated, handheld feel |
| Dreamlike | soft focus, ethereal, surreal |

## Lighting Keywords

| Type | Effect |
|------|--------|
| Chiaroscuro | High contrast, dramatic shadows |
| Golden Hour | Warm, soft, nostalgic |
| Blue Hour | Cool, moody, twilight |
| Rim Light | Edge highlight, separation |
| Practical | From visible light sources |
| Neon | Cyberpunk, urban, colorful |
| Softbox | Beauty, even, gentle |

## Using with Scripts

1. Generate script with `film-script-generator`
2. Extract key scenes
3. Generate reference images for each scene
4. Use images to guide video generation
5. Include in presentation/pitch deck

## Reference

- Full prompt guide: `references/prompt-guide.md`
- Style references: `references/style-guide.md`
- Scene templates: `templates/shot-prompts.md`
