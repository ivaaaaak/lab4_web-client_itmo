import {Attempt} from "../models/model";

interface AttemptRowProps {
    attempt: Attempt
}

export default function AttemptRow({ attempt }: AttemptRowProps) {
    return(
        <tr>
            <td>{attempt.id}</td>
            <td>{attempt.x}</td>
            <td>{attempt.y}</td>
            <td>{attempt.r}</td>
            <td>{attempt.hit? <span>HIT</span> : <span>MISS</span>}</td>
        </tr>
    )
}