import './App.css';
import { Calendar } from './components/Calendar';
import { CompanyList } from './components/CompanyList';
import { CompletedProjectList } from './components/CompletedProjectList';
import { Header } from './components/Header';
import { ProjectEdit } from './components/ProjectEdit';
import { ProjectInput } from './components/ProjectInput';
import { ProjectList } from './components/ProjectList';
import { InvoiceForm } from './components/InvoiceForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="body">
        <Header />
        <Routes>
          <Route path="/" element={<ProjectList />}/>
          <Route path="/completed_project" element={<CompletedProjectList />}/>
          <Route path="/company" element={<CompanyList />}/>
          <Route path="/calendar" element={<Calendar />}/>
          <Route path="/project_input" element={<ProjectInput />}/>
          <Route path="/project_edit" element={<ProjectEdit />}/>
          <Route path="/invoice_form" element={<InvoiceForm />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
