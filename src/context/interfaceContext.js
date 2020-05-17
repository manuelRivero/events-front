import React, {useState} from "react";

const interfaceContext = React.createContext({
    mainContextAlert:null
})


export default function interfaceContext(props) {
    const [mainAlert, setMainAlert] = useState(null);

    const setMAinAlert = (message) => {
        setMainAlert(message);
    }
    const dismissMainAlert = () => {
        setMainAlert(null);
    }
    return (
        <interfaceContext value = {{mainAlert, setMAinAlert, dismissMainAlert}}>
            {props.children}
        </interfaceContext>
    )
}
