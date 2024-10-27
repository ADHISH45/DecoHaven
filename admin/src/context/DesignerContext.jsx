
import { createContext } from "react";

export const DesignerContext = createContext()

const DesignerContextProvider = (props) => {
    const value = {

    }

    return (
        <DesignerContext.Provider value={value}>
           {props.children}
        </DesignerContext.Provider>
    )
}

export default DesignerContextProvider