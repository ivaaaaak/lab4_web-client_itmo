import React from 'react';
// @ts-ignore
import formStyle from "../styles/form.module.css";

interface SelectProps {
    options: string[]
    value: any
    onChange: any
}

export default function Select({ options, value, onChange }: SelectProps) {
    return (
        <select className={formStyle.select} value={value} onChange={onChange}>
            {options.map(option =>
                <option key={option}>{option}</option>)
            }
        </select>
    );

}
