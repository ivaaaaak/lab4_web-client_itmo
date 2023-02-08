import {Attempt} from "../models/model";
import AttemptRow from "./AttemptRow";
// @ts-ignore
import tableStyle from "../styles/table.module.css"

interface AttemptsTableProps {
    attempts: Attempt[]
}

export default function AttemptsTable({ attempts }: AttemptsTableProps) {
    return (
        <table className={tableStyle.table}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
            {
                attempts.map(a =>
                   <AttemptRow key={a.id} attempt={a}/>
                )
            }
            </tbody>
        </table>
    )
}