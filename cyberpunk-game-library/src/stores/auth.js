import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, 
  }),
  actions: {
    async loginGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) console.error(error)
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
    async checkUser() {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        this.user = data.session.user
      }
    }
  }
})