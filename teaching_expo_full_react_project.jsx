/*
  Teaching Materials Exposition
  Single-file React app (App.jsx)

  Instructions:
  1. Create a new React app (Vite or CRA). Example with Vite:
     npm create vite@latest teaching-expo -- --template react
     cd teaching-expo
  2. Install dependencies:
     npm install react-router-dom framer-motion lucide-react
  3. Add Tailwind CSS (follow Tailwind + Vite guide). Minimal steps:
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     // add tailwind config and import './index.css' with @tailwind directives
  4. Replace src/App.jsx with this file and start dev server: npm run dev

  Notes:
  - This file is intentionally self-contained for preview and iteration.
  - Replace sample data with your real course materials and file URLs.
*/

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { Menu, FileText, BookOpen, Mail, User } from 'lucide-react';

// ---------- Sample data ----------
const SAMPLE_COURSES = [
  {
    id: 'ict101',
    title: 'Information & Communication Technology (ICT) - L1',
    short: 'Fundamentals of ICT, Microsoft Word, Excel basics and online tools.',
    semester: '2025 Spring',
    resources: [
      { id: 'r1', title: 'Lecture Slides: ICT Basics (PDF)', type: 'pdf', url: '#' },
      { id: 'r2', title: 'Word Templates (DOCX)', type: 'docx', url: '#' },
      { id: 'r3', title: 'Practical Exercises (ZIP)', type: 'zip', url: '#' }
    ]
  },
  {
    id: 'eng101',
    title: 'English for Communication - L1',
    short: 'Course materials for oral/written communication and vocabulary.',
    semester: '2025 Spring',
    resources: [
      { id: 'r4', title: 'Workbook (PDF)', type: 'pdf', url: '#' },
      { id: 'r5', title: 'Exam Revision Pack', type: 'pdf', url: '#' }
    ]
  }
];

// ---------- Utilities ----------
function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
  }, [key, state]);
  return [state, setState];
}

// ---------- Components ----------
function Nav() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold">Teaching Expo</Link>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
            <Link to="/courses" className="px-3 py-1 hover:bg-slate-50 rounded">Courses</Link>
            <Link to="/resources" className="px-3 py-1 hover:bg-slate-50 rounded">Resources</Link>
            <Link to="/about" className="px-3 py-1 hover:bg-slate-50 rounded">About</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="text-sm px-3 py-1 border rounded hover:bg-slate-50">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

function Home({ courses }) {
  return (
    <MotionConfig>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto px-6 py-10">
        <header className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Teaching Materials Exposition</h1>
            <p className="mt-4 text-slate-700">A curated hub of course materials, lecture slides, exercises and templates for university students. Designed to be clean, accessible and ready for classroom distribution.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/courses" className="px-4 py-2 bg-slate-800 text-white rounded shadow-sm">Explore Courses</Link>
              <Link to="/resources" className="px-4 py-2 border rounded">Browse Resources</Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-lg border">
            <h3 className="font-semibold">Quick Course Overview</h3>
            <ul className="mt-4 space-y-3">
              {courses.map(c => (
                <li key={c.id} className="p-3 border rounded hover:shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-sm text-slate-600">{c.short}</div>
                    </div>
                    <div className="text-xs text-slate-500">{c.semester}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Why this hub?</h2>
          <div className="mt-4 text-slate-700">Centralizing materials helps students access content quickly, allows colleagues to reuse and adapt your resources, and presents your teaching practice professionally for applications and collaborations.</div>
        </section>
      </motion.div>
    </MotionConfig>
  );
}

function Courses({ courses }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Courses</h2>
        <button onClick={() => navigate('/courses/new')} className="text-sm px-3 py-2 border rounded">Add course</button>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {courses.map(c => (
          <div key={c.id} className="p-4 border rounded-lg shadow-sm hover:shadow">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-slate-600 mt-1">{c.short}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen size={16} /> <span>{c.resources.length} resources</span>
                  <span className="ml-4">{c.semester}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link to={`/courses/${c.id}`} className="text-sm px-3 py-1 border rounded">View</Link>
                <button className="text-sm px-3 py-1 border rounded">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseDetail({ courses }) {
  const { pathname } = window.location;
  const id = pathname.split('/').pop();
  const course = courses.find(c => c.id === id) || courses[0];
  if (!course) return <div className="p-6">Course not found.</div>;
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header>
        <h2 className="text-2xl font-semibold">{course.title}</h2>
        <p className="text-slate-600 mt-2">{course.short}</p>
      </header>
      <section className="mt-6">
        <h3 className="font-semibold">Resources</h3>
        <ul className="mt-4 space-y-3">
          {course.resources.map(r => (
            <li key={r.id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-sm text-slate-500">Type: {r.type}</div>
              </div>
              <div className="flex gap-2">
                <a href={r.url} className="text-sm px-3 py-1 border rounded">Download</a>
                <button className="text-sm px-3 py-1 border rounded">Preview</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Resources({ courses }) {
  const all = courses.flatMap(c => c.resources.map(r => ({ ...r, courseTitle: c.title })));
  const [q, setQ] = useState('');
  const filtered = all.filter(r => r.title.toLowerCase().includes(q.toLowerCase()) || r.courseTitle.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold">All Resources</h2>
      <div className="mt-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search resources or course..." className="w-full md:w-1/2 p-2 border rounded" />
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {filtered.map(r => (
          <div key={r.id + r.courseTitle} className="p-4 border rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-slate-500">{r.courseTitle} • {r.type}</div>
            </div>
            <div className="flex gap-2">
              <a href={r.url} className="px-3 py-1 border rounded text-sm">Download</a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-6 text-slate-600">No resources match your search.</div>}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold">About</h2>
      <div className="mt-4 text-slate-700">
        <p><strong>Zineb Djihane Agli</strong> — Lecturer & curriculum designer. This hub showcases course materials, structured notes and practical exercises for undergraduate courses. Use this section to add your academic bio, publications, and teaching philosophy.</p>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h4 className="font-semibold">Teaching Philosophy</h4>
          <p className="text-sm text-slate-600 mt-2">Learner-centred, skills-focused, and practical — assessments and labs reinforce theory with immediate application.</p>
        </div>
        <div className="p-4 border rounded">
          <h4 className="font-semibold">Academic Profile</h4>
          <p className="text-sm text-slate-600 mt-2">Replace this with degrees, institutions, and links to your publications or ORCID.</p>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useLocalStorage('teaching_contact', { name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  function submit(e) {
    e.preventDefault();
    // in production, hook this to an email service or serverless function
    setSent(true);
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <p className="text-slate-600 mt-2">Questions, requests for materials or collaboration inquiries — send a message.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Your name" className="w-full p-2 border rounded" />
        <input required value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="Your email" className="w-full p-2 border rounded" />
        <textarea required value={form.message} onChange={e=>setForm({...form, message: e.target.value})} placeholder="Message" className="w-full p-2 border rounded h-32" />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">Send</button>
          <button type="button" onClick={()=>{setForm({name:'',email:'',message:''}); setSent(false);}} className="px-4 py-2 border rounded">Reset</button>
        </div>
        {sent && <div className="text-green-600">Message stored locally (configure server to send emails).</div>}
      </form>
    </div>
  );
}

// ---------- Main App ----------
export default function App() {
  const [courses, setCourses] = useLocalStorage('teaching_courses', SAMPLE_COURSES);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <Nav />
        <Routes>
          <Route path="/" element={<Home courses={courses} />} />
          <Route path="/courses" element={<Courses courses={courses} />} />
          <Route path="/courses/:id" element={<CourseDetail courses={courses} />} />
          <Route path="/courses/:id/*" element={<CourseDetail courses={courses} />} />
          <Route path="/resources" element={<Resources courses={courses} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="p-8">Page not found. <Link to="/">Return home</Link></div>} />
        </Routes>

        <footer className="mt-12 border-t bg-white">
          <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-slate-600">
            <div>© {new Date().getFullYear()} Zineb Djihane Agli — Teaching Materials Exposition</div>
            <div>Built with React • Tailwind • Framer Motion</div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

