import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import Spinner from '../componentes/Spinner/Spinner';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        let rol = 'user';
        try {
          const docUsuario = await getDoc(doc(db, 'usuarios', usuarioFirebase.uid));
          if (docUsuario.exists() && docUsuario.data().rol === 'admin') {
            rol = 'admin';
          }
        } catch (error) {
          console.error('No se pudo leer el rol del usuario:', error);
        }
        setUser({ uid: usuarioFirebase.uid, email: usuarioFirebase.email, rol });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const registro = async (email, password) => {
    const credencial = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'usuarios', credencial.user.uid), { email, rol: 'user' });
    return credencial;
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, registro, logout }}>
      {loading ? <Spinner texto="Iniciando..." /> : children}
    </AuthContext.Provider>
  );
};
