import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUserAPI } from '@/redux/user/userSlice'; // Đảm bảo action updateUserAPI có sẵn
import { AppDispatch } from '@/redux/store'; // Đảm bảo dispatch được định nghĩa đúng
import { RootState } from "@/redux/store"; // Đảm bảo đường dẫn đúng

const Settings = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>(); // Sử dụng dispatch với kiểu chính xác

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // Thêm trạng thái lỗi
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái loading để disable nút khi đang gửi yêu cầu

  // Điền thông tin vào form khi người dùng đã đăng nhập
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address || '');
      setPhone(user.phone || ''); 
    }
  }, [user]);

  // Xử lý sự kiện lưu thay đổi
  const handleSaveChanges = async () => {
    if (!name || !email || !phone || !address) {
      setErrorMessage('All fields are required'); // Kiểm tra các trường rỗng
      return;
    }

    if (user) {
      const updatedUser = { id: user.id, name, email, phone, address };
      try {
        setIsLoading(true); // Bắt đầu loading
        await dispatch(updateUserAPI(updatedUser));

        // Hiển thị thông báo thành công
        setSuccessMessage('Your changes have been saved successfully!');
        setErrorMessage(''); // Reset thông báo lỗi

        // Reset thông báo thành công sau vài giây (optional)
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error('Error updating user:', error);
        setErrorMessage('Failed to update information. Please try again later.');
      } finally {
        setIsLoading(false); // Dừng loading
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            disabled={isLoading} // Disable input khi đang loading
          />
        </div>
        <div className="space-y-2"><Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading} // Disable input khi đang loading
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            disabled={isLoading} // Disable input khi đang loading
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            disabled={isLoading} // Disable input khi đang loading
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button 
            className="bg-green-500 hover:bg-green-600"
            onClick={handleSaveChanges}
            disabled={isLoading} // Disable button khi đang loading
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Hiển thị thông báo thành công nếu có */}
        {successMessage && (
          <div className="mt-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;