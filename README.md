# React Portfolio + Task Manager

Vite + React + Tailwind CSS front end, Vercel serverless functions in `/api`, Neon Postgres database.

## 1. Fill in your content (required)
Edit `src/data/profile.js`, `projects.js`, `skills.js`. Put real screenshots in `public/screenshots/`. Every `TODO` must be replaced.

## 2. Database
1. Create a free Postgres database at https://neon.tech (or Vercel Storage > Neon).
2. Run `db/schema.sql` in the Neon SQL editor.
3. Copy the connection string.

## 3. Run locally
```bash
npm install
cp .env.example .env      # paste DATABASE_URL
npm i -g vercel
vercel dev                # runs the front end AND /api functions
```
(`npm run dev` alone serves only the front end; `/api` will not work.)

## 4. Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Vercel > Add New Project > import the repo (framework: Vite, defaults are fine).
3. Settings > Environment Variables: add `DATABASE_URL`.
4. Deploy, then open the URL and test `/tasks` and the contact form.

Contact messages are stored in the `messages` table (view them in the Neon SQL editor: `SELECT * FROM messages ORDER BY created_at DESC;`).

## API
| Method | Path | Notes |
|---|---|---|
| GET/POST | `/api/tasks` | list / create `{title, priority: low\|high}` |
| PUT/PATCH/DELETE | `/api/tasks/:id` | edit / change priority / delete |
| POST | `/api/contact` | `{name, email, message}`; honeypot + 5/hour per email |

## QA checklist (fill in with evidence)
- [ ] All nav, project and external links work
- [ ] Contact form: valid submit saves a row; invalid data shows errors; stopping the DB shows an error, not success
- [ ] Phone / tablet / desktop widths, no horizontal scroll
- [ ] Console has no errors
- [ ] Loading and error states on /tasks and contact form
- [ ] Keyboard-only navigation; alt text; labels linked to inputs
- [ ] Lighthouse before/after, images optimised
- [ ] Production URL tested
