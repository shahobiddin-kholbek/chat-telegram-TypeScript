import { useState } from "react"
import { UserAuth } from "../Type";
export default function Auth() {
//    const lc = JSON.parse(localStorage.getItem("user") || '')
    const [user, setUser] = useState<UserAuth>({password: ''});

    const onAuthChange = (value: string) => {
        setUser({password:value})
    }

    const onAuthClick = () => {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.reload()
    }

    return(
        <div>
            <input type="email" onChange={(e)=>onAuthChange(e.target.value)} />
            <input type="button" onClick={onAuthClick} value="Log up" />
        </div>
    )
}