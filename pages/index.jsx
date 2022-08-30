import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
// import ParkSummaryModal from '../components/ParkSummaryModal'
import AddParkForm from '../components/AddParkForm'
import { format } from 'date-fns'

const ParkTable = dynamic(() => import('../components/ParkTable'))
const ParkSummaryModal = dynamic(() => import('../components/ParkSummaryModal'))

const fetcher = url => fetch(url).then(r => r.json());

const MAX_PARK = 5;

export default function Home() {
  const [totalAvailablePark, setTotalAvailablePark] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data: parkeds, error: errorParked, mutate: mutateParked } = useSWR('/api/parking/getparked', fetcher);
  const { data: lefts, mutate: mutateLefts } = useSWR('/api/parking/getleft', fetcher);

  const handleAddPark = async (regNo) => {
    console.log(regNo)
    const response = await fetch('/api/parking/post', {
      method: 'POST',
      body: JSON.stringify({regNo})
    })
    

    var result = await response.json()
    console.log(result);
    mutateParked();
  }

  const handleOnItemSummaryClick = async (selected) => {
    console.log(selected);
    setSelected(selected);
    setShowSummary(true);
    
  }

  const handleDepart = async (data) => {
    console.log(data);
    const response = await fetch('/api/parking/depart', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    var result = await response.json()
    console.log(result);
    mutateLefts();
    mutateParked();
    setSelected(null);
    setShowSummary(false);
  }

  if (errorParked) return <div>failed to load</div>
  if (!parkeds || !lefts) return <div>loading...</div>
  console.log(parkeds)
  return (
    <div>
      <Head>
        <title>Parking</title>
        <meta name="description" content="Lentera App Test" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      </Head>
      <div className="container">
        <Header subtitle={`AVAILABLE : ${MAX_PARK-parkeds.result.length}`} />
        <div className="box">
          <div className="tabs is-centered">
            <ul>
              <li className={activeTab == 1 ? 'is-active' : null}><a onClick={() => setActiveTab(1)}>Daftar Parkir </a></li>
              <li className={activeTab == 2 ? 'is-active' : null}><a onClick={() => setActiveTab(2)}>History</a></li>
            </ul>
          </div>
          {activeTab == 1 ? <div>
            <AddParkForm 
                regNo={''} 
                onSubmit={handleAddPark} 
                disabled={(MAX_PARK == parkeds.result.length)}
                submitButtonText={(MAX_PARK == parkeds.result.length)? 'NO AVAILABLE PARK SPACE': 'Park Car'} />
            <ParkTable parkings={parkeds.result}
              onItemSummaryClick={handleOnItemSummaryClick}
              hiddenColumns={["BILL", "TIME"]}
            /></div> : null}

          {activeTab == 2 ? <ParkTable parkings={lefts.result}
            onItemSummaryClick={handleOnItemSummaryClick}
            hiddenColumns={["ACTION"]}
          /> : null}

        </div>
        {showSummary && <ParkSummaryModal data={selected} onClose={() => { setShowSummary(false) }} onSaveChanges={handleDepart} />}
        
      </div>

    </div>
  )
}
