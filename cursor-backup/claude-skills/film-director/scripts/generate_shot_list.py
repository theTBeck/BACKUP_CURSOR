#!/usr/bin/env python3
"""
Generate a shot list for a scene.
Usage: python generate_shot_list.py --scene "1" --description "INT. WAREHOUSE - DAY"
"""

import argparse
import csv
import json
from typing import List, Dict

SHOT_TYPES = [
    'EWS', 'WS', 'MWS', 'MS', 'MCU', 'CU', 'ECU',
    'OTS', 'POV', 'INSERT', 'TWO', 'OTHER'
]

def parse_shots(shots_str: str) -> List[Dict]:
    """Parse shot list from JSON string."""
    if shots_str:
        return json.loads(shots_str)
    return []

def generate_shot_list(
    scene_number: str,
    description: str,
    shots: List[Dict] = None,
    director: str = "",
    dp: str = ""
) -> str:
    """Generate a formatted shot list."""

    if shots is None:
        shots = []

    lines = [
        "=" * 80,
        f"SHOT LIST - SCENE {scene_number}",
        "=" * 80,
        f"Description: {description}",
        f"Director: {director}",
        f"DP: {dp}",
        "",
        "Shot | Type | Camera | Description",
        "-" * 80,
    ]

    for i, shot in enumerate(shots, 1):
        shot_type = shot.get('type', 'MS')
        camera = shot.get('camera', 'A')
        desc = shot.get('description', '')
        duration = shot.get('duration', '3s')
        notes = shot.get('notes', '')

        lines.append(
            f"{i:>3}  | {shot_type:<6} | {camera:<6} | {desc:<40} | {duration} | {notes}"
        )

    lines.extend([
        "",
        "-" * 80,
        f"Total Shots: {len(shots)}",
    ])

    return "\n".join(lines)

def generate_csv(
    scene_number: str,
    description: str,
    shots: List[Dict] = None,
    output: str = "shot_list.csv"
):
    """Generate shot list as CSV."""
    if shots is None:
        shots = []

    with open(output, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Shot', 'Type', 'Camera', 'Description', 'Duration', 'Notes', 'Image Prompt'])

        for i, shot in enumerate(shots, 1):
            writer.writerow([
                i,
                shot.get('type', 'MS'),
                shot.get('camera', 'A'),
                shot.get('description', ''),
                shot.get('duration', '3s'),
                shot.get('notes', ''),
                shot.get('image_prompt', '')
            ])

    print(f"CSV saved to {output}")

def main():
    parser = argparse.ArgumentParser(description='Generate a shot list')
    parser.add_argument('--scene', required=True, help='Scene number')
    parser.add_argument('--description', required=True, help='Scene description')
    parser.add_argument('--director', default='', help='Director name')
    parser.add_argument('--dp', default='', help='Director of Photography')
    parser.add_argument('--shots', help='JSON array of shots')
    parser.add_argument('--output', help='Output file path')
    parser.add_argument('--csv', action='store_true', help='Output as CSV')

    args = parser.parse_args()

    shots = parse_shots(args.shots) if args.shots else []

    if args.csv:
        generate_csv(args.scene, args.description, shots, args.output or "shot_list.csv")
    else:
        shot_list = generate_shot_list(
            args.scene,
            args.description,
            shots,
            args.director,
            args.dp
        )

        if args.output:
            with open(args.output, 'w') as f:
                f.write(shot_list)
            print(f"Shot list saved to {args.output}")
        else:
            print(shot_list)

if __name__ == "__main__":
    main()
