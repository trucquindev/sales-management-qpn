import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { forgotPasswordAPI, selectUserLoading, selectUserError } from "@/redux/user/userSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const [valueName, setValueName] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valueNewPassword, setValueNewPassword] = useState<string>("");
  const [valueConfirmPassword, setValueConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường đã được nhập
    if (!valueName || !valueEmail || !valueNewPassword || !valueConfirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (valueNewPassword !== valueConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const resultAction = await dispatch(
        forgotPasswordAPI({
          name: valueName,
          email: valueEmail,
          password: valueNewPassword,
        })
      );

      if (forgotPasswordAPI.fulfilled.match(resultAction)) {
        toast.success("Password successfully reset.");
        // Reset các trường
        setValueName("");
        setValueEmail("");
        setValueNewPassword("");
        setValueConfirmPassword("");
      } else {
        const errorMessage =
          (resultAction.payload && typeof resultAction.payload === "string" && resultAction.payload) ||
          "An error occurred. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error during forgot password API call:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto mt-4 max-w-md">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">Reset Your Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your name"
                    value={valueName} onChange={(e) => setValueName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={valueEmail}
                    onChange={(e) => setValueEmail(e.target.value)}
                    required
                  />
                </div>

                {/* New Password Input */}
                <div className="space-y-2">
                  <Input
                    placeholder="Enter your new password"
                    type="password"
                    value={valueNewPassword}
                    onChange={(e) => setValueNewPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Confirm New Password Input */}
                <div className="space-y-2">
                  <Input
                    placeholder="Confirm your new password"
                    type="password"
                    value={valueConfirmPassword}
                    onChange={(e) => setValueConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>

                {/* Error Display */}
                {error && (
                  <div className="text-center text-sm text-red-500 mt-2">
                    {error}
                  </div>
                )}

                {/* Back to Login Link */}
                <div className="text-center text-sm text-gray-600">
                  {"Remembered your password? "}
                  <Link className="text-blue-500 hover:underline" to="/sign-in">
                    Back to Login
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