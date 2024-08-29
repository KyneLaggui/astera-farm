import { supabase } from '@src/supabase/config'

const fetchUserEmail = async() => {
    const { data: { session } } = await supabase.auth.getUser();
 
    return session.user.email
}

export default fetchUserEmail