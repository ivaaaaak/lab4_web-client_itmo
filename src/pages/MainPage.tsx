import {Attempt} from "../models/model";
import {clearAllAttempts, getAllAttempts} from "../services/attempts_requests";
import React, {useEffect, useState} from "react";
import AttemptsTable from "../components/AttemptsTable";
import AttemptsForm from "../components/AttemptsForm";
import {Navigate} from 'react-router-dom';
import Graph from "../components/Graph";
// @ts-ignore
import mainPage from "../styles/mainPage.module.css";
// @ts-ignore
import common from "../styles/common.module.css";
import ErrorMessage from "../components/ErrorMessage";
import {store} from "../redux/store";

export default function MainPage() {

    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [loading, setLoading] = useState(true);
    const [axiosError, setAxiosError] = useState('');
    const [r, setR] = useState(1);

    function addAttempt(attempt: Attempt) {
        setAttempts(prevState => [ attempt, ...prevState]);
    }

    function getAttempts() {
        setLoading(true);
        setAxiosError('');
        getAllAttempts()
            .then(res => setAttempts(res.reverse()))
            .catch(err => setAxiosError(err.message))
            .finally(() => setLoading(false));
    }

    function clearAttempts(event: React.FormEvent) {
        event.preventDefault();
        setAxiosError('');
        clearAllAttempts()
            .then(() => setAttempts([]))
            .catch(err => setAxiosError(err.message))
    }

    useEffect(() => getAttempts(), []);

    return(
        <> { !store.getState().loggedIn ? <Navigate to="/login"/> :
            <div className={mainPage.container}>
                <div className={mainPage.formBlock}>
                    <Graph attempts={attempts} r={r} addAttempt={addAttempt} setAxiosError={setAxiosError}/>
                    <AttemptsForm addAttempt={addAttempt} clearAttempts={clearAttempts} setAxiosError={setAxiosError}
                                  r={r} setR={setR}/>
                </div>
                <div className={mainPage.tableBlock}>
                    <ErrorMessage error={axiosError}/>
                    {loading ? <p className={common.loading}>Loading...</p> : <AttemptsTable attempts={attempts}/>}
                </div>
            </div>
        }
        </>
    )
}
