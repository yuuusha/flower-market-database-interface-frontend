import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

// Функции для работы с API пользователей
const getUsers = () => axios.get('/super-admin-users', { params: { limit: -1, offset: 0 } });
const deleteUser = (userId) => axios.delete(`/super-admin-users/${userId}`);
const changeUserRights = (userId, newRole) => axios.post(`/super-admin-users/userRights/${userId}`, null, { params: { role: newRole } });

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError('Не удалось получить список пользователей');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const visibleUsers = users.filter(
      (user) => !user.is_deleted && Object.values(user).join(' ').toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(visibleUsers);
  }, [searchTerm, users]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleChangeRights = async (userId, newRole) => {
    try {
      await changeUserRights(userId, newRole);
      const updatedUsers = users.map((user) =>
        user.userId === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      setError('Не удалось изменить права пользователя');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = users.filter((user) => user.userId !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      setError('Не удалось удалить пользователя');
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return {
    users: filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage),
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage: handlePageChange,
    handleChangeRights,
    handleDelete,
    loading,
    error
  };
};

export default useUsers;