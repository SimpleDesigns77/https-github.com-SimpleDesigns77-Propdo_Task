import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [lat, setLat] = useState(32.08709336675098);
    const [lng, setLng] = useState(34.819433767338296)

    return (
        <DataContext.Provider value={{
            lat, setLat, lng, setLng
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;