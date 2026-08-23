---
name: film-team-orchestrator
description: "AI film production pipeline orchestrator for end-to-end content creation. Use when: coordinating production pipeline, generating scripts to film, orchestrating team, production planning, full workflow from concept to final edit. Keywords: film, pipeline, orchestrator, production, workflow."
license: MIT
version: 3.0.0
---

# Film Team Orchestrator v3.0

The master skill that orchestrates the entire AI film production pipeline.

## Pipeline Overview

```
CONCEPT → SCRIPT → SCENES → IMAGES → VIDEO → EDIT → DELIVER
```

## Pipeline Stages

### Stage 1: Concept & Planning
- Define project scope
- Create beat sheet
- Develop characters

### Stage 2: Script Generation
- Write scenes (film-script-generator)
- Generate dialogue
- Format screenplay

### Stage 3: Pre-Visualization
- Create shot lists (film-director)
- Generate image references
- Design visual style

### Stage 4: Asset Generation
- Generate scene images (MiniMax)
- Generate scene videos (MiniMax)
- Create sound/music elements

### Stage 5: Assembly
- Organize footage
- Create timeline
- Add transitions
- Sync audio

### Stage 6: Post-Production
- Color grade (film-editor)
- Sound design (film-sound-mixer)
- Final edit (film-editor)

### Stage 7: Delivery
- Export formats
- Quality check
- Deliverables

## Commands

| Command | Stage | Description |
|---------|-------|-------------|
| `/pipeline [concept]` | All | Run full pipeline |
| `/script [logline]` | 2 | Generate script |
| `/generate-scenes [script]` | 3-4 | Generate images/videos |
| `/assemble [clips]` | 5 | Build timeline |
| `/final-cut` | 6 | Complete edit |

## Workflow 1: Full Pipeline

```
/pipeline: A heist film where a team of specialists
steals a priceless painting from an upscale gallery.
Genre: Thriller. Duration: 5 minutes.
```

The orchestrator will:
1. Generate beat sheet
2. Write screenplay (8-10 scenes)
3. Create shot lists for each scene
4. Generate image references
5. Generate video clips (using MiniMax)
6. Assemble rough cut
7. Complete final edit

## Workflow 2: Script to Screen

```
/script: INT. ROOFTOP - NIGHT. Two snipers on
opposite buildings. One is the hero, one is the villain.
Tense standoff.
```

## Workflow 3: Generate Visual Assets

```
/generate-scenes: Create 5 key scenes from the script
with cinematic images and 10-second video clips.
```

## Workflow 4: Assembly

```
/assemble: Combine the 5 generated clips into a
cohesive sequence with transitions and music.
```

## Integration with Skills

| Stage | Primary Skill | Support Skills |
|-------|---------------|----------------|
| Concept | film-team-orchestrator | film-director |
| Script | film-script-generator | - |
| Scenes | film-director | film-dp |
| Images | film-director | film-team-orchestrator |
| Video | film-editor | film-director |
| Edit | film-editor | film-sound-mixer |
| Sound | film-sound-mixer | - |

## Output Formats

### Project Structure
```
project/
├── scripts/
│   ├── beat-sheet.md
│   ├── screenplay.pdf
│   └── scene-list.md
├── assets/
│   ├── images/
│   ├── videos/
│   └── audio/
├── timeline/
│   ├── rough-cut.mp4
│   └── final-cut.mp4
└── deliverables/
    ├── master-4k.mov
    └── social-reels.mp4
```

## MiniMax Integration

For image generation:
```
Use: /image [detailed scene description]
```

For video generation:
```
Use: /video [scene description with action]
Duration: 5-30 seconds
```

## Collaboration Protocol

When orchestrating multiple agents:

1. **Clarify roles** - Each agent has clear responsibility
2. **Share context** - Pass relevant info between agents
3. **Track progress** - Monitor each stage
4. **Flag issues** - Surface blockers early
5. **Quality gates** - Review before advancing

## Quality Checklist

- [ ] Script is production-ready
- [ ] All scenes have shot lists
- [ ] Images match script vision
- [ ] Videos are in correct order
- [ ] Audio is synced
- [ ] Color is consistent
- [ ] Exports meet spec

## Reference Materials

- Full pipeline: `references/pipeline-guide.md`
- Integration details: `references/integration.md`
- Templates: `templates/project-template.md`
