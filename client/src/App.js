import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from '../src/components/Navbar'
import HomeScreen from '../src/Screens/HomeScreen'
import PatientScreen from '../src/Screens/PatientScreen'
import DailyInfoScreen from './Screens/DailyInfoScreen'
import MedicalCheckListScreen from './Screens/MedicalCheckListScreen'
import CreateMotivationalTipsScreen from './Screens/CreateMotivationalTipsScreen'
import GetMotivationalTipsScreen from './Screens/GetMotivationalTipsScreen'
import EmergencyAlertsScreen from '../src/Screens/EmergencyAlertsScreen'
import LoginScreen from '../src/Screens/LoginScreen'
import SignupScreen from '../src/Screens/SignupScreen'

function App() {
  return (
    <Router>
    <Navbar />
    <main>
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/patients' exact component={PatientScreen} />
        <Route path='/dailyinfo' exact component={DailyInfoScreen} />
        <Route path='/medicalChecklist' exact component={MedicalCheckListScreen} />
        <Route path='/createMotivationaltips' exact component={CreateMotivationalTipsScreen} />
        <Route path='/getMotivationaltips' exact component={GetMotivationalTipsScreen} />
        <Route path='/emergencyalerts' exact component={EmergencyAlertsScreen} />
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/signup' exact component={SignupScreen} />
      </Switch>
    </main>
  </Router>
  );
}

export default App;
