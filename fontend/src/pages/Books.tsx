import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import api from "@/core/axios";
import { Item } from "@radix-ui/react-context-menu";
import React, { type ChangeEvent } from "react";

interface BookItem {
  book_id: number;
  title: string;
  description: string;
  status: string;
  price: number;
  amount: number;
  created_at: Date;
  image_url: string;
  category_name: string;
  category_id: number;
}

interface BookByCategoryType {
  category: string;
  items: BookItem[];
}

interface CountCategoryType {
  category_name: string;
  category_count: number;
  category_id: number;
}

export default function Books() {
  const [newBooks, setNewBooks] = React.useState<BookItem[]>([]);
  const [books, setBooks] = React.useState<BookByCategoryType[]>([]);
  const [countCategory, setCountCategory] = React.useState<CountCategoryType[]>(
    []
  );
  const [categories, setCategories] = React.useState<string[]>([]);
  const [filter, setFilter] = React.useState<String[]>([]);
  React.useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const response = await api.get("/books/new");
        const data: BookItem[] = response.data.data;
        setNewBooks(data);
        const categories = [...new Set(data.map((item) => item.category_name))];
        setCategories(categories);
      } catch (error) {
        console.error("Fetch books failed:", error);
      }
    };
    const fetchCountCategory = async () => {
      try {
        const response = await api.get("/category/count");
        const data: CountCategoryType[] = response.data;
        setCountCategory(data);
      } catch (error) {
        console.error("Fetch books failed:", error);
      }
    };
    const fetchAllBooks = async () => {
      try {
        const response = await api.get("/books/category");
        const data: BookByCategoryType[] = response.data.data;
        setBooks(data);
      } catch (error) {
        console.error("Fetch books failed:", error);
      }
    };
    fetchNewBooks();
    fetchCountCategory();
    fetchAllBooks();
  }, []);

  const filterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setFilter((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  const filteredBooks =
    filter.length > 0
      ? books.filter((book) => filter.includes(book.category))
      : books;

  return (
    <div>
      <Carousel books={newBooks}/>
      <Search categories={categories} />

      <div className="p-4 flex bg-gray-100 px-16 gap-4">
        <div className="flex-1/4  flex justify-center p-4">
          <div className="rounded-xl bg-white w-3/4 h-fit p-2 ">
            {countCategory &&
              countCategory.map((item, index) => (
                <div
                  className="rounded-2xl  my-4 p-2 flex gap-4 justify-between"
                  key={index}
                >
                  <input
                    type="checkbox"
                    className=""
                    value={item.category_name}
                    onChange={filterChange}
                    checked={filter.includes(item.category_name)}
                  />
                  <p className="text-left">{item.category_name}</p>
                  <div className="px-1 rounded-full bg-white border ">
                    {item.category_count}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex-3/4 ">
          {filteredBooks && books.length > 0
            ? filteredBooks.map((item, index) => (
                <div className="bg-white rounded-2xl">
                  <Gallery
                    category={item.category}
                    items={item.items}
                    key={index}
                  />
                  <hr />
                </div>
              ))
            : "not have data"}
        </div>
      </div>
    </div>
  );
}
