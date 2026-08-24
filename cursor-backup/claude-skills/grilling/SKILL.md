---
name: grilling
description: >
  Grill the user relentlessly about a plan or design. Use when the user wants
  to stress-test a plan before building, or uses any grill trigger (/grill-me,
  /grilling, grill me).
---

# Grilling

Interview the user relentlessly about every aspect of this plan until we reach a
shared understanding. Walk down each branch of the design tree, resolving
dependencies between decisions one-by-one. For each question, provide your
recommended answer.

Ask the questions one at a time, waiting for feedback on each question before
continuing. Asking multiple questions at once is bewildering.

If a fact can be found by exploring the codebase, look it up rather than asking.
The decisions, though, are the user's — put each one to them and wait for an
answer.

Do not enact the plan until the user confirms shared understanding.

Exception: when the user also orders an immediate fix of a known broken rule or
config (facts already in repo), apply that fix first, then continue grilling on
remaining open decisions.
