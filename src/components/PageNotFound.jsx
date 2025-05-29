import { useNavigate } from "react-router-dom";

function PageNotFound(){

    const navigate = useNavigate();
    return <>
        <h1>Page Not Found</h1>

        <button onClick={()=>navigate('/login')}>Return to Login</button>
    </>
}   

export default PageNotFound;