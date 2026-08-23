# Video Generation Workflow

## Generating Scene Videos

### Using MiniMax Video Generation

Request video generation via `/video` command:

```
/video [detailed scene description]
```

### Prompt Structure for Video

```
[Scene description], [character actions], [camera movement], [setting details], [mood], [duration]
```

### Example Video Prompts

#### Action Scene
```
Two figures in a dimly lit warehouse, one chasing the other, sprinting through industrial space, handheld camera following, dramatic shadows, tense atmosphere, 10 seconds
```

#### Dialogue Scene
```
Close-up conversation between two people in a coffee shop, natural lighting from window, soft focus background, intimate mood, subtle camera push-in, 15 seconds
```

#### Establishing Shot
```
Wide aerial shot flying over city skyline at sunset, golden hour light, cinematic color grading, epic scale, smooth drone movement, 8 seconds
```

#### Transition
```
Slow motion shot of water rippling, cross-dissolve to next scene, dreamlike quality, 5 seconds
```

## Video Generation Tools

### MiniMax Integration
- Use: `/video [prompt]`
- Duration: 3-30 seconds
- Aspect ratios: 16:9, 9:16, 1:1

### Image to Video
```
/video [image description] --from-image [image_path]
```

### Video Editing Pipeline

1. **Generate scenes** → Individual video clips
2. **Assemble timeline** → Combine in editor
3. **Add transitions** → Cuts, dissolves
4. **Sound sync** → Dialogue, music, SFX
5. **Color grade** → Match shots
6. **Export** → Deliverable format

## Timeline Assembly

### Structure
```
[Scene 1 - Wide] → [Scene 1 - CU] → [Scene 2 - OTS] → [Scene 2 - CU]
```

### Transitions

| Transition | Use |
|------------|-----|
| Cut | Standard, immediate |
| Dissolve | Time passage, dreamy |
| Fade | Scene change, ending |
| Wipe | Directional, stylized |
| L Cut | Audio continues, video changes |
| J Cut | Video continues, audio changes |

## Frame Rates

| Project | FPS | Use |
|---------|-----|-----|
| Film | 24 | Cinematic |
| TV | 24/25 | Broadcast |
| Social | 30/60 | Digital |
| Slow-Mo | 60/120/240 | Detail shots |
| Timelapse | Variable | Effect |

## Aspect Ratios

| Ratio | Use | Platform |
|-------|-----|----------|
| 2.39:1 | Anamorphic cinema | Film |
| 1.85:1 | Flat cinema | Film |
| 16:9 | Standard TV | TV, Digital |
| 4:3 | Vintage TV | Archive |
| 9:16 | Vertical | TikTok, Reels |
| 1:1 | Square | Instagram |
