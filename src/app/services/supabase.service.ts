import { Injectable } from '@angular/core';
import { createClient , PostgrestError} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jwsysdaxjhuatexfffbe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3c3lzZGF4amh1YXRleGZmZmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1ODY4ODAsImV4cCI6MjA0ODE2Mjg4MH0.9mfMAu1EPjlS7X76jt9FX4RpT9kNqyKSuu1N7opJKIc';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase = createClient(SUPABASE_URL, SUPABASE_KEY, );
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  private handleError(error: PostgrestError | null, operation: string): void {
    if (error) {
      console.error(`Error en la operación "${operation}": ${error.message}`);
      throw new Error(`Operación fallida (${operation}): ${error.message}`);
    }
  }
  async registerUser(password: string, name: string) {
    const { data, error } = await this.supabase.from('users').insert([
      { password, name },
    ]);
    if (error) throw new Error(error.message);
    return data;
 
  }
  async login(name: string, password: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .eq('password', password)
      .single();
  
    if (error || !data) {
      console.error('Error al iniciar sesión:', error?.message || 'Usuario o contraseña incorrectos');
      return null;
    }
    localStorage.setItem('Id', data.id);

    const storedId = localStorage.getItem('Id');
    console.log('ID guardado en localStorage:', storedId);

    console.log('Login exitoso:', data);
    return data; // Retorna los datos del usuario si el login es exitoso
  }
  async getSaldo(Id: string): Promise<number | null> {
    const { data, error } = await this.supabase
      .from('saldo') // Nombre de tu tabla de saldos
      .select('saldo')
      .eq('id', Id)
      .single(); // Devuelve un único registro
  
    if (error) {
      console.error('Error al consultar el saldo:', error);
      return null;
    }
    return data ? data.saldo : null;
  }
  async doesUserExist(usuario: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('name')
      .eq('name', usuario)
      .single();
    this.handleError(error, 'verificar existencia de usuario');
    return !!data;
  }
  async updatePassword(usuario: string, nuevaContrasena: string): Promise<void> {
    const { error } = await this.supabase
      .from('users')
      .update({ password: nuevaContrasena })
      .eq('name', usuario);
    this.handleError(error, 'actualizar contraseña');
  }
  
}

