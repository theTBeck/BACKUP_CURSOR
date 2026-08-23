#!/usr/bin/env python3
"""
Film production budget tracker.
Usage: python budget_tracker.py --add --category "Cinematography" --item "Camera Rental" --amount 5000
"""

import argparse
import json
import csv
from datetime import datetime
from typing import List, Dict
from pathlib import Path

BUDGET_FILE = "production_budget.json"

def load_budget() -> Dict:
    """Load budget from file."""
    if Path(BUDGET_FILE).exists():
        with open(BUDGET_FILE, 'r') as f:
            return json.load(f)
    return {
        'production': 'Untitled',
        'total_budget': 0,
        'categories': {},
        'line_items': []
    }

def save_budget(budget: Dict):
    """Save budget to file."""
    with open(BUDGET_FILE, 'w') as f:
        json.dump(budget, f, indent=2)

def add_expense(category: str, item: str, amount: float, vendor: str = ""):
    """Add an expense to the budget."""
    budget = load_budget()

    if category not in budget['categories']:
        budget['categories'][category] = {'allocated': 0, 'spent': 0}

    budget['categories'][category]['spent'] += amount
    budget['line_items'].append({
        'date': datetime.now().isoformat(),
        'category': category,
        'item': item,
        'amount': amount,
        'vendor': vendor
    })

    save_budget(budget)
    print(f"Added: {item} - ${amount:,.2f} to {category}")

def set_allocation(category: str, amount: float):
    """Set budget allocation for a category."""
    budget = load_budget()

    if category not in budget['categories']:
        budget['categories'][category] = {'allocated': 0, 'spent': 0}

    budget['categories'][category]['allocated'] = amount
    save_budget(budget)
    print(f"Set {category} allocation: ${amount:,.2f}")

def get_summary() -> str:
    """Get budget summary."""
    budget = load_budget()

    lines = [
        "=" * 60,
        f"PRODUCTION BUDGET: {budget['production']}",
        "=" * 60,
        "",
        f"Total Budget: ${budget['total_budget']:,.2f}",
        "",
        "Category Breakdown:",
        "-" * 60,
        f"{'Category':<25} {'Allocated':>12} {'Spent':>12} {'Remaining':>12}",
    ]

    total_allocated = 0
    total_spent = 0

    for cat, data in budget['categories'].items():
        allocated = data['allocated']
        spent = data['spent']
        remaining = allocated - spent
        total_allocated += allocated
        total_spent += spent

        lines.append(
            f"{cat:<25} ${allocated:>10,.2f} ${spent:>10,.2f} ${remaining:>10,.2f}"
        )

    lines.extend([
        "-" * 60,
        f"{'TOTAL':<25} ${total_allocated:>10,.2f} ${total_spent:>10,.2f} ${total_allocated - total_spent:>10,.2f}",
        "",
        f"Overall % Used: {(total_spent/total_budget*100):.1f}%" if budget['total_budget'] else "",
        "=" * 60,
    ])

    return "\n".join(lines)

def export_csv(filename: str = "budget_export.csv"):
    """Export budget to CSV."""
    budget = load_budget()

    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Date', 'Category', 'Item', 'Amount', 'Vendor'])

        for item in budget['line_items']:
            writer.writerow([
                item['date'],
                item['category'],
                item['item'],
                item['amount'],
                item['vendor']
            ])

    print(f"Exported to {filename}")

def main():
    parser = argparse.ArgumentParser(description='Film production budget tracker')
    parser.add_argument('--production', help='Set production name')
    parser.add_argument('--total', type=float, help='Set total budget')
    parser.add_argument('--add', action='store_true', help='Add expense')
    parser.add_argument('--category', help='Expense category')
    parser.add_argument('--item', help='Expense item name')
    parser.add_argument('--amount', type=float, help='Expense amount')
    parser.add_argument('--vendor', default='', help='Vendor name')
    parser.add_argument('--allocate', action='store_true', help='Set category allocation')
    parser.add_argument('--summary', action='store_true', help='Show budget summary')
    parser.add_argument('--export', help='Export to CSV')

    args = parser.parse_args()

    budget = load_budget()

    if args.production:
        budget['production'] = args.production
        save_budget(budget)
        print(f"Production name set to: {args.production}")

    if args.total:
        budget['total_budget'] = args.total
        save_budget(budget)
        print(f"Total budget set to: ${args.total:,.2f}")

    if args.add:
        if not all([args.category, args.item, args.amount]):
            print("Error: --add requires --category, --item, and --amount")
            return
        add_expense(args.category, args.item, args.amount, args.vendor)

    if args.allocate:
        if not all([args.category, args.amount]):
            print("Error: --allocate requires --category and --amount")
            return
        set_allocation(args.category, args.amount)

    if args.summary:
        print(get_summary())

    if args.export:
        export_csv(args.export)

if __name__ == "__main__":
    main()
