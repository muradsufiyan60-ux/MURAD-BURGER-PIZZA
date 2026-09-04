import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Helper to fetch all registered users from localStorage
  const getRegisteredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('registeredUsers')) || [];
    } catch {
      return [];
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeUserEmail');
    setIsLoggedIn(false);
    setUser(null);
  };

  // Check current session on load
  useEffect(() => {
    const activeEmail = localStorage.getItem('activeUserEmail');
    const savedStatus = localStorage.getItem('isLoggedIn') === 'true';

    if (savedStatus && activeEmail) {
      const registeredUsers = getRegisteredUsers();
      const currentUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === activeEmail.toLowerCase()
      );
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        logout();
      }
    }
  }, []);

  // SIGN UP: Register a new separate profile
  const signup = (userData) => {
    try {
      const registeredUsers = getRegisteredUsers();
      const normalizedEmail = userData.email.trim().toLowerCase();

      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === normalizedEmail
      );

      if (existingUser) {
        return { success: false, message: 'Account already exists. Please sign in.' };
      }

      const newUser = {
        name: userData.name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        phone: userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || '',
        avatar: userData.avatar || '',
        password: userData.password || ''
      };

      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      // Log the new user in
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('activeUserEmail', newUser.email);
      setIsLoggedIn(true);
      setUser(newUser);

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Failed to register account. Storage may be full.' };
    }
  };

  // SIGN IN: Restrict access unless user exists
  const login = (credentials) => {
    const email = (typeof credentials === 'object' ? credentials.email : credentials)?.trim().toLowerCase();
    const password = typeof credentials === 'object' ? credentials.password : null;

    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email
    );

    if (!foundUser) {
      return { success: false, message: 'Account not found. Please sign up first!' };
    }

    if (password && foundUser.password && foundUser.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }

    // Set logged-in state for this specific user
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('activeUserEmail', foundUser.email);
    setIsLoggedIn(true);
    setUser(foundUser);

    return { success: true };
  };

  // UPDATE PROFILE: Modifies active user & updates sign-in password in localStorage
  const updateProfile = (updatedDetails) => {
    if (!user) {
      return { success: false, message: 'No active user session found.' };
    }

    try {
      const registeredUsers = getRegisteredUsers();
      const currentEmail = user.email.toLowerCase();

      // Determine correct password value
      const updatedPassword = updatedDetails.newPassword 
        ? updatedDetails.newPassword 
        : (user.password || '');

      // Build updated user object
      const updatedUser = {
        ...user,
        ...updatedDetails,
        email: user.email, // Preserve original account email key
        password: updatedPassword
      };

      // Remove temporary form fields from saved profile state
      delete updatedUser.newPassword;
      delete updatedUser.confirmPassword;

      // Update registeredUsers array immutably
      let exists = false;
      const updatedRegisteredUsers = registeredUsers.map((u) => {
        if (u.email.toLowerCase() === currentEmail) {
          exists = true;
          return updatedUser;
        }
        return u;
      });

      if (!exists) {
        updatedRegisteredUsers.push(updatedUser);
      }

      // Save back to localStorage
      localStorage.setItem('registeredUsers', JSON.stringify(updatedRegisteredUsers));
      localStorage.setItem('activeUserEmail', updatedUser.email);

      // Update React State
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      console.error('Failed to update profile:', error);

      if (error.name === 'QuotaExceededError' || error.code === 22) {
        return {
          success: false,
          message: 'Storage full! The uploaded image is too large. Try a smaller photo.'
        };
      }

      return { success: false, message: 'Failed to update profile changes.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        updateProfile,
        updateUser: updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);