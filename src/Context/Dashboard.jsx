import { useReducer } from "react";
import PropTypes from "prop-types";
import { DashboardContext } from "./DashboardContext"; // Import the context

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PAGE_NAME":
            return { ...state, pageName: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Initial state
const getInitialState = {
    pageName: ""
}

// Provider component
export const DashboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, getInitialState);

    return (
        <DashboardContext.Provider value={{ state, dispatch }}>
            {children}
        </DashboardContext.Provider>
    );
};

// Prop validation
DashboardProvider.propTypes = {
    children: PropTypes.node.isRequired,
};