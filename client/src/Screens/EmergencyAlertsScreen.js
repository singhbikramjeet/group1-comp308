import { useSelector } from 'react-redux'

// Components
import EmergencyAlertForm from '../components/EmergencyAlertForm'
import EmergencyAlertList from '../components/EmergencyAlertList'

function EmergencyAlertsScreen() {

  const profile = useSelector(state => state.user.profile)
  return (
    <>
      {profile ? (
        profile.role === 0 ? (
          <EmergencyAlertForm />
        ) : (
          <EmergencyAlertList />
        )
      ) : ''
      }

    </>
  )
}

export default EmergencyAlertsScreen
