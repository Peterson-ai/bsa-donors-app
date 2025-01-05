import { supabase } from './client';
import { NetworkError } from './errors';

interface ConnectionState {
  isConnected: boolean;
  lastChecked: Date | null;
  error: Error | null;
  retryCount: number;
  isChecking: boolean;
}

let state: ConnectionState = {
  isConnected: false,
  lastChecked: null,
  error: null,
  retryCount: 0,
  isChecking: false
};

export async function checkConnection(): Promise<boolean> {
  if (state.isChecking) {
    return state.isConnected;
  }

  state.isChecking = true;

  try {
    const { error } = await supabase.from('profiles')
      .select('*', { count: 'exact', head: true })
      .limit(1);
    
    if (error) throw error;

    state = {
      ...state,
      isConnected: true,
      lastChecked: new Date(),
      error: null,
      retryCount: 0,
      isChecking: false
    };

    return true;
  } catch (error) {
    console.error('Connection check failed:', error);
    
    state = {
      ...state,
      isConnected: false,
      lastChecked: new Date(),
      error: error instanceof Error ? error : new Error('Unknown error'),
      isChecking: false
    };
    
    throw new NetworkError('Failed to connect to Supabase');
  }
}

export function getConnectionState(): ConnectionState {
  return { ...state };
}

export function resetConnectionState(): void {
  state = {
    isConnected: false,
    lastChecked: null,
    error: null,
    retryCount: 0,
    isChecking: false
  };
}