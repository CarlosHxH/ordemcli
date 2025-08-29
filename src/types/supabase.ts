export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          ordercli: string
          cliente: 'Natura' | 'Avon'
          previsao_chegada: string
          qtde_pedidos: number
          qtde_volumes: number
          chegou_na_base: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ordercli: string
          cliente: 'Natura' | 'Avon'
          previsao_chegada: string
          qtde_pedidos: number
          qtde_volumes: number
          chegou_na_base?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ordercli?: string
          cliente?: 'Natura' | 'Avon'
          previsao_chegada?: string
          qtde_pedidos?: number
          qtde_volumes?: number
          chegou_na_base?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type User = {
  id: string;
  email: string;
}