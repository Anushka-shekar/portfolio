# Anushka Shekar | Portfolio (React + Node.js + Express + MongoDB + Streamlit)

Requires Node 18+ and Python 3.9+.

## Run it
1. `npm run setup`                       (installs root, server and client)
2. `npm run dev`                         (API on :5000, site on :5173)
3. In a second terminal:
   `pip install -r streamlit/requirements.txt`
   `streamlit run streamlit/app.py`      (Streamlit on :8501, shown in the "Project explorer" section)

Open http://localhost:5173

## Edit your info
All details live in `server/data/portfolio.js` (name, email, links, skills, projects, internships).
Both the React site and the Streamlit app read it through `GET /api/portfolio`.

