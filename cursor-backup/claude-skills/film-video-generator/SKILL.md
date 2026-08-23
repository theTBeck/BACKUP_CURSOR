---
name: film-video-generator
description: "AI video generator for film scenes, motion clips, visual sequences. Use when: generating video, motion clips, scene animations, video sequences, film content. Uses MiniMax for video generation. Keywords: video, film, clip, motion, generate, scene."
license: MIT
version: 2.0.0
---

# Film Video Generator Skill v2.0

Generate cinematic video clips for film production using MiniMax.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `/video [prompt]` | Generate video clip |
| `/scene-video [scene]` | Generate from scene |
| `/transition [type]` | Generate transition |

## Video Prompt Structure

```
[Scene description], [character actions], [camera movement],
[setting details], [mood], [duration seconds]
```

## Prompt Examples

### Scene: Entering Room
```
Medium shot of figure entering through doorway, pauses
at threshold, looks around cautiously, cinematic lighting
from window creating volumetric light rays, smooth
tracking camera movement, tension in body language,
10 seconds, film quality
```

### Scene: Confrontation
```
Wide shot of two figures facing each other in warehouse,
slow motion as one reaches for gun, dramatic shadows,
cinematic color grading, intense atmosphere, 15 seconds,
action movie style
```

### Scene: Establishing
```
Drone aerial shot flying forward over city skyline at
sunset, golden hour light, epic scale, smooth camera
movement, cinematic 2.39:1, establishing shot style,
8 seconds
```

### Scene: Emotion
```
Close-up of woman's face, tears forming in eyes,
camera slowly pushing in, soft natural lighting from
window, intimate moment, emotional depth, cinematic
look, 10 seconds, drama style
```

## Video Generation Parameters

### Duration
| Duration | Use |
|----------|-----|
| 3-5 sec | Transitions, inserts |
| 5-10 sec | Standard scenes |
| 10-20 sec | Complex scenes |
| 20-30 sec | Feature scenes |

### Aspect Ratios
| Ratio | Use |
|-------|-----|
| 16:9 | Standard video |
| 9:16 | Vertical/Shorts |
| 1:1 | Square |

### Frame Rates
| FPS | Use |
|-----|-----|
| 24 | Cinematic |
| 30 | Standard video |
| 60 | Smooth action |

## Types of Video Content

### 1. Scene Clips
Individual scenes from screenplay:
```
/video: INT. COFFEE SHOP - DAY. Woman enters, scans
room, spots man in corner, walks toward him with
purpose, medium shot, cinematic lighting, 12 seconds
```

### 2. Transitions
Bridges between scenes:
```
/video: Cross-dissolve from close-up eyes to wide
establishing shot, dreamlike quality, soft focus,
5 seconds
```

### 3. Action Sequences
Dynamic movement:
```
/video: Handheld camera following runner through
crowded market, quick cuts, tense music energy,
documentary action style, 15 seconds
```

### 4. B-Roll
Supplementary footage:
```
/video: Slow motion water droplets on window with
city lights in background, rain on glass effect,
meditative, 8 seconds
```

## Integration with Pipeline

### Stage 1: Script
Write scenes with `film-script-generator`

### Stage 2: Images
Generate reference images with `film-image-generator`

### Stage 3: Video
Generate scene videos:
```
/video: [Detailed scene description from script]
```

### Stage 4: Assembly
Combine in timeline with `film-editor`

## Workflow

```
1. Write Script
   ↓
2. Create Shot List
   ↓
3. Generate Reference Images
   ↓
4. Generate Scene Videos
   ↓
5. Assemble Timeline
   ↓
6. Add Audio
   ↓
7. Export
```

## Quality Tips

1. **Be specific** - Include camera, lighting, mood
2. **Duration** - Keep clips 5-15 seconds for best results
3. **Action** - Include movement for dynamic scenes
4. **Reference** - Use images from `film-image-generator` as guides
5. **Iterate** - Generate multiple versions, pick best

## Reference

- Full video guide: `references/video-prompts.md`
- Scene templates: `templates/scene-video-template.md`
