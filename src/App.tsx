import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HomePageEN from './pages/HomePageEN'
import FormationSystemeAgentique from './pages/FormationSystemeAgentique'
import FormationSystemeAgentiqueEN from './pages/FormationSystemeAgentiqueEN'
import QuestionnaireFormation from './pages/QuestionnaireFormation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── FRENCH ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/ecosystem/formationsystemeagentique" element={<FormationSystemeAgentique />} />
        <Route path="/ecosystem/formationsystemeagentique/questionnaire" element={<QuestionnaireFormation />} />

        {/* ── ENGLISH ── */}
        <Route path="/US" element={<HomePageEN />} />
        <Route path="/ecosystem/IAagenticsystemtraining" element={<FormationSystemeAgentiqueEN />} />
        <Route path="/ecosystem/IAagenticsystemtraining/apply" element={<QuestionnaireFormation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
