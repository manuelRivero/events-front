import React, {useState} from "react";

export const InterfaceContext = React.createContext({
    mainContextAlert:null,
    onsetMainAlert: (message)=>{},
    ondismissMainAlert : ()=>{}
})


export default function InterfaceContextProvider(props) {
    const [mainAlert, setMainAlert] = useState(null);

    const mainAlertHandler = (message) => {
        setMainAlert(message);
    }
    const dismissMainAlertHandler = () => {
        setMainAlert(null);
    }
    return (
        <InterfaceContext.Provider value = {{mainContextAlert:mainAlert, onsetMainAlert:mainAlertHandler, ondismissMainAlert:dismissMainAlertHandler}}>
            {props.children}
        </InterfaceContext.Provider>
    )
}
