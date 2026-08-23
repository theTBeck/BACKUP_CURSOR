# Export Formats & Deliverables

## Common Export Formats

### Video Codecs

| Codec | Use Case | Pros | Cons |
|-------|----------|------|------|
| H.264 | Web, social | Universal | Lossy |
| H.265/HEVC | 4K, HDR | Efficient | Slow encode |
| ProRes 422 | Editing, broadcast | Lossless | Large files |
| ProRes 4444 | VFX, transparency | Alpha support | Very large |
| DNxHD/HR | Broadcast | Stable | Large files |
| VP9 | WebM | Free | Limited support |
| AV1 | Future proof | Efficient | Slow encode |

### Containers

| Container | Video | Audio | Use |
|-----------|-------|-------|-----|
| MP4 | H.264/H.265 | AAC | Universal |
| MOV | ProRes/DNx | PCM/AAC | Editing |
| MKV | Any | Any | Archival |
| WebM | VP9/AV1 | Opus | Web |

## Delivery Formats

### Cinema DCP
```
Resolution: 4096x2160 (4K) or 2048x1080 (2K)
Frame Rate: 24/25/30 fps
Bit Depth: 12-bit
Color Space: XYZ (DCI-P3)
Audio: 16/24 ch PCM
```

### Broadcast (TV)
```
HD 1080i: 1920x1080 @ 25/29.97 fps
HD 1080p: 1920x1080 @ 25/29.97/50/59.94 fps
UHD: 3840x2160 @ 50/59.94 fps
Codec: H.264 or H.265
Audio: AAC 48kHz stereo/5.1
```

### Streaming Platforms

| Platform | Resolution | Bitrate | Codec |
|----------|------------|---------|-------|
| YouTube | Up to 4K | 20-68 Mbps | H.264 |
| Netflix | 4K HDR | 15-25 Mbps | H.265 |
| Vimeo | Up to 4K | 10-60 Mbps | H.264 |
| Amazon | Up to 4K | Up to 35 Mbps | H.265 |

### Social Media

| Platform | Aspect | Resolution | Duration |
|----------|--------|------------|----------|
| Instagram Feed | 1:1/4:5 | 1080x1080 | 60s |
| Instagram Reels | 9:16 | 1080x1920 | 90s |
| TikTok | 9:16 | 1080x1920 | 10min |
| YouTube Shorts | 9:16 | 1080x1920 | 60s |
| Twitter/X | 16:9 | 1280x720 | 140s |

## Recommended Settings

### High Quality Archive
```
Codec: ProRes 4444
Container: MOV
Resolution: Native
Frame Rate: Native
Audio: PCM 48kHz 24-bit
```

### Web/Master
```
Codec: H.264/H.265
Container: MP4
Resolution: 1920x1080 or 3840x2160
Bitrate: 20-50 Mbps
Audio: AAC 320kbps 48kHz
```

### Social Preview
```
Codec: H.264
Container: MP4
Resolution: 1080x1920 (vertical) or 1080x1080 (square)
Bitrate: 8-15 Mbps
```

## Export Checklist

- [ ] Color space correct (sRGB/Rec.709/Rec.2020)
- [ ] Resolution matches delivery spec
- [ ] Frame rate matches project
- [ ] Bitrate adequate for platform
- [ ] Audio synced and mixed
- [ ] No dropped frames
- [ ] Test playback on target device
