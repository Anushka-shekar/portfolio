"""Project Explorer: a Streamlit dashboard that reads the same data as the React site."""
import os
import pandas as pd
import requests
import streamlit as st

#API = os.getenv("OPENAI_API_KEY")
API = os.getenv("PORTFOLIO_API", "http://localhost:5000/api/portfolio")
st.set_page_config(page_title="Project Explorer", page_icon="🧭", layout="wide")

@st.cache_data(ttl=60)
def load():
    return requests.get(API, timeout=5).json()

try:
    data = load()
except Exception:
    st.error(f"Could not reach the API at {API}. Start the Express server first (npm run dev).")
    st.stop()

projects = data["projects"]
st.title("Project Explorer")
st.caption("Pick a project to see what it does and what it is built with.")

name = st.selectbox("Project", [p["title"] for p in projects])
p = next(x for x in projects if x["title"] == name)
left, right = st.columns([3, 2])
with left:
    st.subheader(p["title"])
    st.write(p["desc"])
    st.markdown("**Features**\n" + "\n".join(f"- {f}" for f in p["features"]))
with right:
    st.markdown("**Tech stack**")
    st.write(" · ".join(p["stack"]))

st.divider()
st.subheader("Technologies across all projects")
counts = pd.Series([t for x in projects for t in x["stack"]]).value_counts().rename("projects using it")
st.bar_chart(counts)
st.caption("Counted directly from the project list, not self-rated.")
