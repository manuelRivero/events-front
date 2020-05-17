import React, {useState} from "react";

const InterfaceContext = React.createContext({
    mainContextAlert:null
})


export default function InterfaceContextProvider(props) {
    const [mainAlert, setMainAlert] = useState(null);

    const setMAinAlert = (message) => {
        setMainAlert(message);
    }
    const dismissMainAlert = () => {
        setMainAlert(null);
    }
    return (
        <InterfaceContext value = {{mainAlert, setMAinAlert, dismissMainAlert}}>
            {props.children}
        </InterfaceContext>
    )
}
