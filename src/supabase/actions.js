import { supabase } from "./config";

export const signUpWithEmailAndPassword = async (
    email,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    phoneNumber
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
              first_name: firstName,
              middle_name: middleName,
              last_name: lastName,
              phone_number: phoneNumber
            }
          }
        }
      )

    return data;
}

export const signInWithEmailAndPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data
};

export const signOut = async () => {
  await supabase.auth.signOut();
};