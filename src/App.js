import './App.scss';
import { Route, Routes, Link } from 'react-router-dom';
import RealEstate from './Components/RealEstate/RealEstate'
import MyMap from './Components/MyMap/MyMap.js'




function App() {
  return (
    <div>
      <div className='nav'>
        <h1><Link style={{ color: 'blue' }} to="/MyMap">Visit the map</Link></h1>
        <h1><Link style={{ color: 'blue' }} to="/RealEstate">Assets</Link></h1>
      </div>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route path="RealEstate" element={<RealEstate />} />
        <Route path="MyMap" element={<MyMap />} />
        <Route path="*" element={<MyMap />} />
        {/* </Route> */}
      </Routes>

    </div>
  );
}

export default App;
