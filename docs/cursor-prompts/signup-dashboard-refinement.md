# Cursor Prompt: Signup + Dashboard Refinement (Frontend-Only)

You are working in a React + Tailwind + shadcn codebase for an Arabic learning platform.  
Do **not** implement backend/API calls. Use mock data and UI state only.

## Context
- Product has 3 user roles: `teacher`, `student`, `admin`.
- Existing pages/routes/layouts already exist.
- Goal is to improve UX quality and information architecture using research-backed patterns.

## Research-backed constraints to apply
1. **Signup UX should minimize friction**
   - Keep only essential fields.
   - Show clear validation and password expectations.
   - Make role selection explicit and understandable.
   - Confirm this is a prototype/no-server flow.

2. **Teacher dashboard should prioritize actionability**
   - Put immediate teaching actions first (upcoming sessions, quick actions).
   - Surface “attention needed” signals (e.g., cancelled sessions, low completion).
   - Keep high-level summary metrics visible.

3. **Student dashboard should support motivation + self-regulation**
   - Show near-term actions (next session / join flow).
   - Show progress in a simple, interpretable way.
   - Keep interface clean and low cognitive load.

4. **Admin dashboard should highlight operational KPIs**
   - Avoid vanity-only numbers.
   - Include at-risk indicators (inactive learners/teachers, cancellations).
   - Keep a concise snapshot of platform health with clear prioritization.

## Implementation tasks
1. Refine `SignUpPage`:
   - Keep frontend-only submission.
   - Improve validation clarity and role intent.
   - Add an obvious next step after successful local validation.

2. Refine `TeacherDashboard`:
   - Add a compact “priority/attention” summary block.
   - Keep session list + quick actions easy to scan.
   - Ensure charts/metrics reinforce planning decisions.

3. Refine `StudentDashboard`:
   - Add a “next session” spotlight block.
   - Add an interpretable progress metric (e.g., completion ratio/rate).
   - Preserve simple path to join upcoming sessions.

4. Refine `AdminDashboard`:
   - Replace static KPI assumptions with values computed from mock data.
   - Add at-risk signal(s) in top-level stats.
   - Keep summary + activity readable and decision-oriented.

## UX/Design constraints
- Do not break current desktop layout system.
- Keep components responsive and consistent with existing style.
- Do not add heavy new dependencies.
- Keep copy concise and product-appropriate.

## Done criteria
- No backend calls added.
- All changes compile and lint clean.
- Signup + all 3 dashboards feel more purposeful and role-specific.
