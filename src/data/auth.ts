export interface UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'epure_users_db';
const ACTIVE_USER_KEY = 'epure_active_user';

export const getUsers = (): UserAccount[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const registerUser = (userData: Omit<UserAccount, 'id' | 'createdAt'>): { success: boolean; message: string; user?: UserAccount } => {
  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  
  if (existing) {
    return { success: false, message: 'An account with this email already exists. Please sign in.' };
  }

  const newUser: UserAccount = {
    ...userData,
    id: `USER-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  setActiveUser(newUser);

  return { success: true, message: 'Account successfully created!', user: newUser };
};

export const loginUser = (email: string, _password?: string): { success: boolean; message: string; user?: UserAccount } => {
  const users = getUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!found) {
    // Si premier test sans inscription préalable, on crée un compte instantané pour le confort de test
    const autoUser: UserAccount = {
      id: `USER-${Date.now()}`,
      firstName: email.split('@')[0],
      lastName: 'Member',
      email: email,
      createdAt: 'Today'
    };
    users.push(autoUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    setActiveUser(autoUser);
    return { success: true, message: 'Welcome back!', user: autoUser };
  }

  setActiveUser(found);
  return { success: true, message: 'Signed in successfully!', user: found };
};

export const getActiveUser = (): UserAccount | null => {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setActiveUser = (user: UserAccount | null) => {
  if (user) {
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(ACTIVE_USER_KEY);
  }
};
