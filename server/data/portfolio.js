// EDIT YOUR INFO HERE. The React site and the Streamlit app both read this via the API.
export const profile = {
  name: "Anushka Shekar",
  first: "Anushka", last: "Shekar",
  roles: ["Full stack developer in the making.", "Building AI-powered apps.", "Automating workflows with n8n.", "Learning DSA and system design."],
  intro: "I am an Information Science Engineering student passionate about building practical software solutions that combine full-stack development, AI automation, and cybersecurity.",
  intro2: "I enjoy turning ideas into functional applications, exploring how systems work behind the scenes, and learning through hands-on projects.",
  learningNow: "Currently strengthening my foundations in Data Structures and Algorithms, backend development, system design, and applied AI.",
  goal: "To become a skilled software engineer with strong development, problem-solving, and system design fundamentals.",
  location: "Bengaluru, Karnataka, India",
  email: "anushkashekar239@gmail.com",                    // TODO: your email
  github: "https://github.com/Anushka-shekar",       // TODO: your GitHub
  linkedin: "https://www.linkedin.com/in/anushka-c-93374434a" // TODO: your LinkedIn
};
export const education = { degree:"Bachelor of Engineering, Information Science and Engineering", school:"Dayananda Sagar Academy of Technology and Management (DSATM)", place:"Bengaluru, Karnataka, India", year:"3rd Year (currently pursuing)", cgpa:"9.2" };
export const interests = ["Full stack development","AI-powered applications","API security","Workflow automation","Data structures and algorithms"];
export const skills = [
  ["Languages",["Python","Java","JavaScript"]],
  ["Frontend",["HTML","CSS","React.js","Streamlit"]],
  ["Backend",["Node.js","Express.js","REST APIs"]],
  ["Databases",["MongoDB","MongoDB Atlas","SQL fundamentals"]],
  ["AI & ML",["Pandas","NumPy","Matplotlib","Google Gemini API","Generative AI"]],
  ["Automation & tools",["n8n","Git","GitHub","VS Code"]]
];
export const projects = [
  { title:"Civic Issue Tracker", cat:"Full stack · Automation", file:"civic-tracker",
    desc:"A web app for reporting civic problems such as potholes, garbage accumulation, drainage issues and broken streetlights, with status tracking from report to resolution.",
    features:["Image-based complaint submission","User-entered location","Complaint status tracking","Duplicate image detection","Daily submission limits","Automated issue validation","n8n webhook and email notification workflow"],
    stack:["React.js","Node.js","Express.js","MongoDB Atlas","n8n"], github:"https://github.com/Anushka-shekar/civic-issue-" },
  { title:"AI Resume Critic: Tech Roast", cat:"Generative AI · Streamlit", file:"resume-critic",
    desc:"Checks an uploaded resume against a target job description and gives direct, recruiter-style feedback.",
    features:["PDF resume upload","Job description input","Missing keyword identification","Weak bullet point detection","Improved bullet suggestions","Resume gap identification"],
    stack:["Python","Streamlit","Google Gemini API","PyPDF","dotenv"], github:"https://github.com/Anushka-shekar/AI-Multiverse/tree/main/capstone_project" },
  { title:"AI Digital Wellbeing Dashboard", cat:"AI · Data analytics", file:"wellbeing-dashboard",
    desc:"Analyzes application usage data and turns it into readable insights about digital habits.",
    features:["Application usage tracking","Category-wise analysis","Data visualization","Usage summaries","AI-generated insights"],
    stack:["Python","Streamlit","Pandas","Google Gemini API"], github:"https://github.com/Anushka-shekar/AI-Multiverse/tree/main/wellbeing-dashboard" },
  { title:"AI Multiverse of Chatbots", cat:"Generative AI", file:"chatbot-multiverse",
    desc:"A chatbot app where each personality has its own system prompt and remembers the conversation within a session.",
    features:["Multiple chatbot personalities","Dynamic system prompts","Gemini API integration","Session-based memory","Interactive Streamlit interface"],
    stack:["Python","Streamlit","Google Gemini API"], github:"https://github.com/Anushka-shekar/AI-Multiverse" }
];
export const experience = [
  { org:"SkyForger Technologies", role:"Intern", domain:"Full stack development",
    points:["Worked on a civic issue tracking application.","Contributed to frontend and backend development.","Explored MongoDB integration.","Worked with automated workflows and webhook integrations."] },
  { org:"MirAI", role:"AI Winter Internship", domain:"AI & automation",
    points:["Explored Generative AI applications.","Worked with AI tools and prompt engineering.","Learned workflow automation using n8n.","Explored RAG concepts.","Built practical AI applications, including an AI Resume Critic."] }
];
export const learning = [
  ["Data structures & algorithms","Regular LeetCode practice to sharpen problem solving."],
  ["Backend architecture","Structuring services, data flow and error handling."],
  ["REST API development","Designing clear, consistent endpoints."],
  ["Authentication & authorization","Who a user is, and what they may do."],
  ["Application security","Validating input and limiting abuse."],
  ["AI integration","Putting LLM APIs into real product flows."],
  ["Building & deploying","Taking full-stack apps from laptop to live."]
];
export default { profile, education, interests, skills, projects, experience, learning };
