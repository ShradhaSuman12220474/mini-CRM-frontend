import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api";
import { useNavigate } from "react-router-dom";

function GoogleLogin(){
    const navigate = useNavigate();
    const responseGoogle = async (authResult)=>{
        try{
            console.log("AuthResult : ",authResult);
            if(authResult['code']){
                const result = await googleAuth(authResult['code']);
                const {email, name, picture} = result.data.user;
                console.log(result.data.token);
                console.log(result.data.user);
                const token = result.data.token;
                const userObj = {email, name, picture,token};
                localStorage.setItem('user-info',JSON.stringify(userObj));

                navigate('/dashboard');
            }
        }catch(error){
            console.error("Error while requesting google code: ", error);

        }
    }
    const handleLogin = useGoogleLogin({
        
        onSuccess: responseGoogle,
        onError : responseGoogle,
        flow: 'auth-code',
    })
    return <>
        <div>
                
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
            
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                Sign In
            </button>
            <hr/>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                onClick={handleLogin}
            >
                Continue With Google
                
            </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? 
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
            </div>

            
        </div>
        </div>
    </div>
    </>
}

export default GoogleLogin;