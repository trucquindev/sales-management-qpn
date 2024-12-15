// sign-up.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  registerUserAPI,
  selectUserLoading,
  selectUserError,
} from '@/redux/user/userSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function SignUpComponent() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const [valueEmail, setValueEmail] = useState<string>('');
  const [valuePassword, setValuePassword] = useState<string>('');
  const [valueConfirmPassword, setValueConfirmPassword] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [valueName, setValueName] = useState<string>('');

  // Selectors
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: valueEmail,
      password: valuePassword,
      name: valueName,
    };
    if (valuePassword !== valueConfirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!acceptedTerms) {
      toast.error('You must accept the terms and conditions!');
      return;
    }

    try {
      const resultAction = await dispatch(registerUserAPI(data));
      if (registerUserAPI.fulfilled.match(resultAction)) {
        toast.success('Account created successfully!');
        navigate('/sign-in');
      } else {
        const errorMessage =
          resultAction.payload || 'Account creation failed. Please try again.';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during account creation.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto mt-4 max-w-md">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Input
                    placeholder="Name"
                    type="text"
                    value={valueName}
                    onChange={(e) => setValueName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Email"
                    type="email"
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
                <div className="space-y-2">
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={valueConfirmPassword}
                    onChange={(e) => setValueConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={acceptedTerms}
                      onClick={() => setAcceptedTerms((prev) => !prev)}
                    />
                    <label
                      className="text-sm text-gray-600"
                      htmlFor="acceptTerms"
                    >
                      Accept all terms & conditions
                    </label>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <div className="text-center text-sm text-gray-600">
                  {'Already have an account? '}
                  <Link
                    className="text-green-500 hover:underline"
                    to="/sign-in"
                  >
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
