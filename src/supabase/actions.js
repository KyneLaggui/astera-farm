import { supabase } from "./config";
import { toast } from "react-toastify";

export const signUpWithEmailAndPassword = async (
    email,
    password,
    confirmPassword,
    username
  ) => {
    if (password !== confirmPassword) {
      return null
    }
    const { data, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            data: {
              username: username
            }
          }
        }
      )
    
    if (data) {
      return data;
    } else {
      return null;
    }
}

export const signInWithEmailAndPassword = async (email, password) => {
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return result.data.user
};

export const signOut = async () => {
  toast.success("Logged out successfully!");
  await supabase.auth.signOut();
};

export const editProfile = async (email, username) => {
  const { data, error } = await supabase
  .from('profile')
  .update({
    username: username,
  })
  .eq('email', email)
  
  console.log(data)
  if (error) {
    return null
  } else {
    return true
  }

};