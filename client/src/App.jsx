
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Mains from './components/Main';
import Login from './components/Login';
import UserRegister from './components/userRegister';
import UserHome from './components/UserHome';
import MyCampaign from './components/MyCampaign';
import Profile from './components/Profile';
import TransactionHistory from './components/TransactionHistory'
import AddCampaign from './components/Addcampaign'
import ViewCampaign from './components/ViewCampaign';
import AdminHome from './components/AdminHome';
import AdminUsermanage from './components/AdminUsermanage';
import AdminCampaignManage from './components/AdminCampaignManage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mains/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/userhome' element={<UserHome/>}/>
        <Route path='/myCampaign' element={<MyCampaign/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/history' element={<TransactionHistory/>}/>
        <Route path='/addcampaign' element={<AddCampaign/>}/>
        <Route path='/viewCampaign/:campaignId' element={<ViewCampaign/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/adminusermanage' element={<AdminUsermanage/>}/>
        <Route path='/admincampaignmanage' element={<AdminCampaignManage/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
