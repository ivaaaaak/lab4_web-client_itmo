import {sendNewAttempt} from "../services/attempts_requests";
import React, {useState} from "react";
import {Attempt} from "../models/model";
// @ts-ignore
import formStyle from "../styles/form.module.css";
// @ts-ignore
import common from "../styles/common.module.css";
// @ts-ignore
import mainPage from "../styles/mainPage.module.css";
import ErrorMessage from "./ErrorMessage";
import Select from "./Select";

interface AttemptsFormProps {
    r: number
    setR: any
    addAttempt: (newAttempt: Attempt) => void
    clearAttempts: (event: React.FormEvent) => void
    setAxiosError: any
}

interface ValidationError {
    y: string,
    r: string
}

export default function AttemptsForm({ addAttempt, clearAttempts, setAxiosError, r, setR }: AttemptsFormProps) {

    const [x, setX] = useState('-3');
    const [y, setY] = useState('0');
    const [validationError, setValidationError] = useState<ValidationError>({y: '', r: ''});

    function isValid(attempt: Attempt) {
        attempt.x = parseFloat(x);
        attempt.y = parseFloat(y);
        attempt.r = r;
        let validated = true;

        if (isNaN(attempt.y)) {
            setValidationError({...validationError, y: 'Y value must be number'});
            validated = false;
        } else if (attempt.y < -3 || attempt.y > 5) {
            setValidationError({...validationError, y: 'Y value must be from -3 to 5'});
            validated = false;
        }
        if (attempt.r <= 0) {
            validated = false;
        }
        return validated;
    }

    function sendAttempt(event: React.FormEvent) {
        event.preventDefault();
        const newAttempt: Attempt = {x:0, y:0, r:0};
        if (isValid(newAttempt)) {
            sendNewAttempt(newAttempt).then(res => addAttempt(res), err => setAxiosError(err.message));
        }
    }

    function onYChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValidationError({...validationError, y: ''});
        setY(event.target.value);
    }

    function onRadiusChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setValidationError({...validationError, r: ''});
        const r = parseFloat(event.target.value);
        if (r <= 0) {
            setValidationError({...validationError, r: 'R value must be greater than 0'});
        }
        setR(r);
    }

    function getSelectOptions(from: number, to: number) {
        let options: string[] = [];
        for (let i = from; i < to + 1; i++) {
            options.push(i.toString());
        }
        return options;
    }

    return(
        <div className={mainPage.formBlock}>
            <form className={formStyle.form}>
                <p>
                    <label className={formStyle.label}>Select X</label>
                    <Select options={getSelectOptions(-3, 5)} value={x} onChange={setX}/>
                </p>

                <p>
                    <label className={formStyle.label}>Type Y</label>
                    <input type="text"
                           className={formStyle.input}
                           placeholder="from -3 to 5"
                           value={y}
                           onChange={event => onYChange(event)}
                    />
                </p>
                <ErrorMessage error={validationError.y}/>

                <p>
                    <label className={formStyle.label}>Select R</label>
                    <Select options={getSelectOptions(-3, 5)} value={r} onChange={onRadiusChange}/>
                </p>
                <ErrorMessage error={validationError.r}/>

                <p>
                    <button className={common.button} onClick={sendAttempt}>Check</button>
                    <button className={common.button} onClick={clearAttempts}>Clear</button>
                </p>
            </form>
        </div>
    )
}