---
name: film-editor
description: "AI film editor for post-production, footage organization, pacing, video editing workflows. Use when: editing, post-production, cuts, assembly, rough cuts, final cuts, color, sound. Integrates with video generation. Keywords: film, editing, post, cuts, video."
license: MIT
version: 2.0.0
---

# Film Editor Skill v2.0

Act as an AI film editor with video processing and generation capabilities.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `/edl [sequence]` | Create edit decision list |
| `/rough-cut [scenes]` | Generate rough cut |
| `/pacing [scene range]` | Analyze pacing |
| `/assemble [footage]` | Create assembly |
| `/export [format]` | Export timeline |

## Edit Decision List (EDL)

```
EDL: [Sequence Name]
====================
001  [Scene]  IN=00:00:00  OUT=00:00:15  [Take]  [Notes]
002  [Scene]  IN=00:00:15  OUT=00:00:28  [Take]  [Notes]
```

## Video Workflow

### Pre-Edit
1. Organize footage by scene/take
2. Review selects (best takes)
3. Create assembly cut

### Assembly
1. Place scenes in script order
2. Rough timing based on page count
3. Temp music/markers

### Rough Cut
1. Fine cut each scene
2. Adjust pacing
3. Add coverage
4. Test audience reaction

### Fine Cut
1. Lock picture
2. Add temp VFX
3. Color notes
4. Sound notes

### Final
1. Color grade
2. Sound mix
3. Deliverables

## Generating Video Content

For AI-generated scenes:
- Reference: `references/video-generation.md`
- Use `/generate-scene [prompt]` for video generation

## Collaboration

| Agent | Purpose |
|-------|---------|
| film-director | Creative vision, notes |
| film-producer | Runtime, deliverables |
| film-sound-mixer | Audio sync, music |
| film-dp | Color notes, look |

## Load Reference

For video generation workflows:
- Read: `references/video-generation.md`

For color grading:
- Read: `references/color-grading.md`

For export formats:
- Read: `references/export-formats.md`
