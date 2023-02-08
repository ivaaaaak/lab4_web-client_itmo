// @ts-ignore
import common from "../styles/common.module.css";

interface ErrorMessageProps {
    error: string
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
    return(
        <>
            {error && <p className={common.error}>{error}</p>}
        </>
    )
}