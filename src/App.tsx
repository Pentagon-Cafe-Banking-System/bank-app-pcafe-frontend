import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import {isTokenExpired} from "./helpers/token-helper";
import Home from "./components/Home/Home";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import CustomerList from "./components/CustomerList/CustomerList";
import AddCustomer from "./components/AddCustomer/AddCustomer";
import AddBankAccount from "./components/AddBankAccount/AddBankAccount";
import BankAccountList from "./components/BankAccountList/BankAccountList";
import NotYetImplemented from "./components/NotYetImplemented/NotYetImplemented";

export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = React.useState<string>(localStorage.getItem('jwtToken') ?? '');

    useEffect(() => {
        document.title = "Bank App"

        const checkToken = () => {
            if (!token) return;
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                setToken('');
            }
        };
        checkToken();
    }, [token]);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Layout>
                <Routes>
                    <Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
                        <Route path="/employees" element={<EmployeeList/>}/>
                        <Route path="/employees/create" element={<AddEmployee/>}/>
                        <Route path="/employees/:id/edit" element={<NotYetImplemented/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['Employee']}/>}>
                        <Route path="/customers" element={<CustomerList/>}/>
                        <Route path="/customers/create" element={<AddCustomer/>}/>
                        <Route path="/customers/:id/edit" element={<NotYetImplemented/>}/>
                        <Route path="/customers/:id/accounts" element={<BankAccountList/>}/>
                        <Route path="/customers/:id/accounts/create" element={<AddBankAccount/>}/>

                        <Route path="/accounts/:id/edit" element={<NotYetImplemented/>}/>
                    </Route>

                    {token && <Route path="/" element={<Home/>}/>}
                    <Route path="/" element={<Login redirectTo="/"/>}/>

                    {!token && <Route path="/login" element={<Login redirectTo="/"/>}/>}
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;