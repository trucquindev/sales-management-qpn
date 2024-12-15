// sign-in.tsx  
import { Button } from "@/components/ui/button";  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  
import { Checkbox } from "@/components/ui/checkbox";  
import { Input } from "@/components/ui/input";  
import { Link } from "react-router-dom";  
import { useDispatch, useSelector } from "react-redux";  
import { AppDispatch } from "@/redux/store";  
import { loginUserAPI, selectUserLoading, selectUserError } from "@/redux/user/userSlice";  
import { toast } from "react-toastify";  
import { useNavigate } from "react-router-dom";  
import { useState } from "react";  

export default function SignInComponent() {  
  const dispatch: AppDispatch = useDispatch();  
  const navigate = useNavigate();  

  const [valueEmail, setValueEmail] = useState<string>("");  
  const [valuePassword, setValuePassword] = useState<string>("");  

  const isLoading = useSelector(selectUserLoading);  
  const error = useSelector(selectUserError);  

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
     const data = {
       email: valueEmail, // Giả sử bạn dùng trường username thay cho email
       password: valuePassword,
     };  

    try {  
      const resultAction = await dispatch(loginUserAPI(data));  

      if (loginUserAPI.fulfilled.match(resultAction)) {  
        toast.success("Login successful!");  
        navigate("/");  
      } else {  
        const errorMessage = resultAction.error  
            ? resultAction.error.message || "Login failed. Please try again."  
            : "An unexpected error occurred.";   
        toast.error(errorMessage);  
      }  
    } catch (error) {  
      toast.error("An unexpected error occurred during login.");  
      console.error(error);  
    }  
  };  

  return (  
    <div className="min-h-screen bg-white">  
      {isLoading && (  
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">  
          <div className="text-white text-lg">Logging in...</div>  
        </div>  
      )}  

      <div className="container mx-auto px-4 py-6">  
        <div className="mx-auto mt-4 max-w-md">  
          <Card className="border border-gray-200 shadow-lg">  
            <CardHeader>  
              <CardTitle className="text-center text-2xl font-semibold">  
                Sign In  
              </CardTitle>  
            </CardHeader>  
            <CardContent>  
              <form className="space-y-4" onSubmit={handleSubmit}>  
                <div className="space-y-2">  
                  <Input  
                    placeholder="Email"  // Thay đổi placeholder thành Username  
                    type="text"  
                    value={valueEmail}  
                    onChange={(e) => setValueEmail(e.target.value)}  
                    required  
                  />  
                </div>  

                <div className="space-y-2">  
                  <Input  
                    placeholder="Password"  
                    type="password"  
                    value={valuePassword}  
                    onChange={(e) => setValuePassword(e.target.value)}  
                    required  
                  />  
                </div>  

                <div className="flex items-center justify-between">  
                  <div className="flex items-center space-x-2">  
                    <Checkbox id="remember" />  
                    <label className="text-sm text-gray-600" htmlFor="remember">  
                      Remember me  
                    </label>  
                  </div>  
                  <Link className="text-sm text-gray-500 hover:underline" to="/forgot-pass">  
                    Reset your password  
                  </Link>  
                </div>  

                <Button  
                  type="submit"  
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md"  
                  disabled={isLoading}  
                >  
                  {isLoading ? "Logging in..." : "Login"}  
                </Button>  

                {error && (  
                  <p className="text-red-500 text-sm text-center">{error}</p>  
                )}  

                <div className="text-center text-sm text-gray-600">  
                  {"Don't have an account? "}  
                  <Link className="text-green-500 hover:underline" to="/sign-up">  
                    Register  
                  </Link>  
                </div>  
              </form>  
            </CardContent>  
          </Card>  
        </div>  
      </div>  
    </div>  
  );  
}