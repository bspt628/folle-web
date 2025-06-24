export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			concerts: {
				Row: {
					id: string;
					title: string | null;
					concert_date: string;
					doors_open_time: string | null;
					start_time: string | null;
					venue_id: string | null;
					poster_image_url: string | null;
					poster_image_width: number | null;
					poster_image_height: number | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					title?: string | null;
					concert_date: string;
					doors_open_time?: string | null;
					start_time?: string | null;
					venue_id?: string | null;
					poster_image_url?: string | null;
					poster_image_width?: number | null;
					poster_image_height?: number | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					title?: string | null;
					concert_date?: string;
					doors_open_time?: string | null;
					start_time?: string | null;
					venue_id?: string | null;
					poster_image_url?: string | null;
					poster_image_width?: number | null;
					poster_image_height?: number | null;
					created_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "concerts_venue_id_fkey";
						columns: ["venue_id"];
						isOneToOne: false;
						referencedRelation: "venues";
						referencedColumns: ["id"];
					}
				];
			};
			concert_programs: {
				Row: {
					id: string;
					concert_id: string;
					piece_id: string | null;
					performance_order: number;
					created_at: string;
				};
				Insert: {
					id?: string;
					concert_id: string;
					piece_id?: string | null;
					performance_order: number;
					created_at?: string;
				};
				Update: {
					id?: string;
					concert_id?: string;
					piece_id?: string | null;
					performance_order?: number;
					created_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "concert_programs_concert_id_fkey";
						columns: ["concert_id"];
						isOneToOne: false;
						referencedRelation: "concerts";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "concert_programs_piece_id_fkey";
						columns: ["piece_id"];
						isOneToOne: false;
						referencedRelation: "pieces";
						referencedColumns: ["id"];
					}
				];
			};
			pieces: {
				Row: {
					id: string;
					composer: string | null;
					title: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					composer?: string | null;
					title?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					composer?: string | null;
					title?: string | null;
					created_at?: string;
				};
				Relationships: [];
			};
			ticket_types: {
				Row: {
					id: string;
					concert_id: string;
					category: string;
					price: number;
					display_order: number;
					created_at: string;
				};
				Insert: {
					id?: string;
					concert_id: string;
					category: string;
					price: number;
					display_order: number;
					created_at?: string;
				};
				Update: {
					id?: string;
					concert_id?: string;
					category?: string;
					price?: number;
					display_order?: number;
					created_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "ticket_types_concert_id_fkey";
						columns: ["concert_id"];
						isOneToOne: false;
						referencedRelation: "concerts";
						referencedColumns: ["id"];
					}
				];
			};
			venues: {
				Row: {
					id: string;
					name: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					name?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					name?: string | null;
					created_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
