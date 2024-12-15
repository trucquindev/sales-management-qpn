import { useState, useEffect } from 'react';
import { UserTable } from './components/user-table';
import { UserForm } from './components/user-form';
import { DeleteConfirmation } from './components/delete-confirmation';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  useEffect(() => {
    // Fetch users from API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // In a real application, you would fetch users from your API
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    ];
    setUsers(mockUsers);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteConfirmationOpen(true);
  };

  const handleFormSubmit = async (user: User) => {
    // In a real application, you would update or create the user via API
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([
        ...users,
        { ...user, id: Math.max(...users.map((u) => u.id)) + 1 },
      ]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      // In a real application, you would delete the user via API
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setIsDeleteConfirmationOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Button onClick={handleAddUser} className="mb-4">
        Add User
      </Button>
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      {isDeleteConfirmationOpen && (
        <DeleteConfirmation
          user={selectedUser}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
        />
      )}
    </div>
  );
}
