import { Button } from "@/components/ui/button";  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  
import { Checkbox } from "@/components/ui/checkbox";  
import { Input } from "@/components/ui/input";  
import { Link, useNavigate } from "react-router-dom";  
import { useDispatch, useSelector } from "react-redux";  
import { AppDispatch } from "@/redux/store"; // Import AppDispatch  
import { registerUserAPI, selectUserLoading, selectUserError } from "@/redux/user/userSlice"; // Import the registerUserAPI thunk and selectors  
import { toast } from "react-toastify";  
import { useState } from "react";  

export default function SignUpComponent() {  
  const dispatch: AppDispatch = useDispatch(); // Using AppDispatch for dispatch  
  const navigate = useNavigate();  

  // State for email, password, confirm password, terms acceptance, and name  
  const [valueEmail, setValueEmail] = useState<string>("");  
  const [valuePassword, setValuePassword] = useState<string>("");  
  const [valueConfirmPassword, setValueConfirmPassword] = useState<string>("");  
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);  
  const [valueName, setValueName] = useState<string>(""); // Added state for name  

  // Get loading and error status from Redux  
  const isLoading = useSelector(selectUserLoading);  
  const error = useSelector(selectUserError);  

  // Data to be sent to the API  
  const data = {  
    email: valueEmail || "",  
    password: valuePassword || "",  
    name: valueName || "", // Include name in the data sent to the API  
    // confirmPassword is handled on the frontend only  
  };  

  // Handle form submit  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  

    // Validate password match  
    if (valuePassword !== valueConfirmPassword) {  
      toast.error("Passwords do not match!"); // Show error if passwords don't match  
      return;  
    }  

    // Validate terms acceptance  
    if (!acceptedTerms) {  
      toast.error("You must accept the terms and conditions!"); // Show error if terms are not accepted  
      return;  
    }  

    try {  
      // Dispatch the registration action with the user data  
      const resultAction = await dispatch(registerUserAPI(data));  

      if (registerUserAPI.fulfilled.match(resultAction)) {  
        // Save user ID in local storage  
        const userId = resultAction.payload.id; // Assuming response contains id  
        localStorage.setItem("userId", userId); // Store user ID  

        toast.success("Account created successfully!"); // Show success message  
        navigate("/sign-in"); // Redirect to the sign-in page  
      } else {  
        toast.error(resultAction.payload || "Account creation failed. Please try again."); // Show error message  
      }  
    } catch (error) {toast.error("An unexpected error occurred during account creation."); // Handle unexpected errors  
      console.error(error);  
    }  
  };  

  return (  
    <div className="min-h-screen bg-white">  
      {/* Sign-Up Card */}  
      <div className="container mx-auto px-4 py-6">  
        <div className="mx-auto mt-4 max-w-md">  
          <Card className="border border-gray-200 shadow-lg">  
            <CardHeader>  
              <CardTitle className="text-center text-2xl font-semibold">Create Account</CardTitle>  
            </CardHeader>  
            <CardContent>  
              <form className="space-y-4" onSubmit={handleSubmit}>  
                {/* Name Input */}  
                <div className="space-y-2">  
                  <Input  
                    placeholder="Name"  
                    type="text"  
                    value={valueName}  
                    onChange={(e) => setValueName(e.target.value)} // Handling name input change  
                    required  
                  />  
                </div>  

                {/* Email Input */}  
                <div className="space-y-2">  
                  <Input  
                    placeholder="Email"  
                    type="email"  
                    value={valueEmail}  
                    onChange={(e) => setValueEmail(e.target.value)}  
                    required  
                  />  
                </div>  

                {/* Password Input */}  
                <div className="space-y-2">  
                  <Input  
                    placeholder="Password"  
                    type="password"  
                    value={valuePassword}  
                    onChange={(e) => setValuePassword(e.target.value)}  
                    required  
                  />  
                </div>  

                {/* Confirm Password Input */}  
                <div className="space-y-2">  
                  <Input  
                    placeholder="Confirm Password"  
                    type="password"  
                    value={valueConfirmPassword}  
                    onChange={(e) => setValueConfirmPassword(e.target.value)}  
                    required  
                  />  
                </div>  

                {/* Terms and Conditions Checkbox */}  
                <div className="flex items-center justify-between">  
                  <div className="flex items-center space-x-2">  
                    <Checkbox  
                      id="acceptTerms"  
                      checked={acceptedTerms}  
                      onClick={() => setAcceptedTerms((prev) => !prev)}  
                    />  
                    <label className="text-sm text-gray-600" htmlFor="acceptTerms">  
                      Accept all terms & conditions  
                    </label>  
                  </div>  
                </div>  

                {/* Submit Button */}  
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md"  
                  type="submit"  
                  disabled={isLoading}  
                >  
                  {isLoading ? "Creating Account..." : "Create Account"}  
                </Button>  

                {/* Error Message */}  
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}  

                {/* Login Link */}  
                <div className="text-center text-sm text-gray-600">  
                  {"Already have an account? "}  
                  <Link className="text-green-500 hover:underline" to="/sign-in">  
                    Login  
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