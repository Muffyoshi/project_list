import './App.css';
import { Calendar } from './components/Calendar';
import { CompanyList } from './components/CompanyList';
import { CompletedProjectList } from './components/CompletedProjectList';
import { Header } from './components/Header';
import { ProjectInput } from './components/ProjectInput';
import { ProjectList } from './components/ProjectList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="body">
        <Header />
        <div>テストです。</div>
        <Routes>
          <Route path="/" element={<ProjectList />}/>
          <Route path="/completed_project" element={<CompletedProjectList />}/>
          <Route path="/company" element={<CompanyList />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/project_input" element={<ProjectInput />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
