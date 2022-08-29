import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import ParkSummaryModal from '../components/ParkSummaryModal'
import AddParkForm from '../components/AddParkForm'

const ParkTable = dynamic(() => import('../components/ParkTable'))

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [regNo, setRegNo] = useState('');

  const handleAddPark = async (regNo) => {
    console.log(regNo)
    const response = await fetch('/api/parking/post', {
      method: 'POST',
      body: JSON.stringify({regNo})
    })
    

    var result = await response.json()
    console.log(result);
  }

  const handleOnItemSummaryClick = (selected) => {
    console.log(selected);
    selected.time_range = '120 Minutes';
    setSelected(selected);
    setShowSummary(true);

  }
  return (
    <div>
      <Head>
        <title>Parking</title>
        <meta name="description" content="Lentera App Test" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      </Head>
      <div className="container">
        <Header />
        <div className="box">
          <div className="tabs is-centered">
            <ul>
              <li className={activeTab == 1 ? 'is-active' : null}><a onClick={() => setActiveTab(1)}>Daftar Parkir</a></li>
              <li className={activeTab == 2 ? 'is-active' : null}><a onClick={() => setActiveTab(2)}>History</a></li>
            </ul>
          </div>
          {activeTab == 1 ? <div>
            <AddParkForm regNo={''} onSubmit={handleAddPark} />
            <ParkTable parkings={[{ id: 1, car_reg_no: 'B12345HH', arrival_at: '8/29/2022, 2:19:24 PM', depart_at: '-', status: 'PARKED', bill: '-' }]}
              onItemSummaryClick={handleOnItemSummaryClick}
              hiddenColumns={["BILL", "TIME"]}
            /></div> : null}

          {activeTab == 2 ? <ParkTable parkings={[{ id: 1, car_reg_no: 'B12345HH', arrival_at: '8/29/2022, 2:19:24 PM', depart_at: '8/29/2022, 2:19:24 PM', status: 'PARKED', time_range: '2 Jam', bill: '8000' }]}
            onItemSummaryClick={handleOnItemSummaryClick}
            hiddenColumns={["ACTION"]}
          /> : null}

        </div>
        <ParkSummaryModal data={selected} show={showSummary} onClose={() => { setShowSummary(false) }} />
      </div>

    </div>
  )
}
