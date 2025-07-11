import { supabase } from "../supabase";
import { Book } from "../types/Book";

const table = "books";

export const getAllBooks = async () => {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;
  return data;
};
