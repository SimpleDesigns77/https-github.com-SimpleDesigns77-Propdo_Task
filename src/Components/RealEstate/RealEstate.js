import React, { useState, useEffect } from 'react'
import './RealEstate.scss'
import house from '../../Assets/Images/prop4.jpg'
import MotionWrap from '../Wrapper/MotionWrap';
import transactions from '../../Data/transactions.json'

const RealEstate = () => {
    const API_URL = 'http://localhost:3500/properties';
    const [records, setRecords] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [query, setQuery] = useState('');
    const [numOfRooms, setNumOfRooms] = useState('');

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw Error('Did not get the data');
                }
                const records = await response.json();
                setRecords(records);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
                //since I am using a dev mock server to simulate api calls, I'm adding this section to handle a case where the mock server is not available
                // To test this code with the mock server, please use 
                // npx json-server -p 3500 -w src\Data\transactions.json
                const records = transactions.properties
                setRecords(records)
            }
        }
        fetchRecords()
    }, [])

    const search = (data) => {
        if (query === "" && numOfRooms === "") {
            return data;
        }
        else if (numOfRooms === "") {
            console.log(data);
            return data.filter((item) => decodeURIComponent(JSON.parse(`"${item.address}"`)).includes(query));
        }
        else if (numOfRooms !== "" & query !== "") {
            return data.filter((item) => decodeURIComponent(JSON.parse(`"${item.address}"`)).includes(query)).filter((item) => item.num_rooms === parseInt(numOfRooms));

        } else if (numOfRooms !== "" && query === "") {
            return data.filter((item) => item.num_rooms === parseInt(numOfRooms))
        }
    }

    return (
        <div>
            <div className='search_container'>
                <input type="text" placeholder="search" className='search' value={query} onChange={(e) => setQuery(e.target.value)} />
                {fetchError && <p style={{ marginTop: "10px", color: "red" }}>{`Error: ${fetchError}`}</p>}
                <div className='rooms'>
                    <p>number of rooms</p>
                    <input type="text" placeholder="choose number of rooms" className='search' value={numOfRooms} onChange={(e) => {
                        setNumOfRooms(e.target.value)
                        console.log(numOfRooms)
                    }} />
                </div>
            </div>
            <div className='card_container'>
                {search(records).sort((a, b) => a.price > b.price ? -1 : 1).map((record, index) => (
                    <div key={index} className='card'>

                        <div className="cardItem?">
                            <div className="card__image">
                                <img src={house} alt='house' />
                            </div>
                            <div className="card__copy">
                                <h1>{decodeURIComponent(JSON.parse(`"${record.address}"`))}</h1>
                                <h3>{`Price: ${record.price} NIS`}</h3>
                                <p>
                                    {`Sqm: ${record.sqm} `}
                                </p>
                                <p>
                                    {`Parking spots: ${record.parking} `}

                                </p>
                                <p>
                                    {`Number of rooms: ${record.num_rooms} `}
                                </p>
                                <p>
                                    {`Number of floors: ${record.num_floors} `}
                                </p>
                                <p>
                                    {`Elevators: ${record.elevator} `}
                                </p>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    )
}


export default
    MotionWrap(RealEstate, "app__works");
