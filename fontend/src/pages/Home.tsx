import React from "react";
import Hero from "@/components/Hero";

import api from "../core/axios";
import Search from "@/components/Search";
import Blog from "@/components/Blog";

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

interface CountCategoryType {
  category_name : string;
  category_count : number;
}

export default function Home() {
  const [books, setBooks] = React.useState<BookItem[]>([]);
  const [countCategory, setCountCategory] = React.useState<CountCategoryType[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        const data: BookItem[] = response.data.data;
        setBooks(data);
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
    fetchBooks();
    fetchCountCategory()
  }, []);

  return (
    <div>
      <Hero
        heading="Welcome To Books Store"
        description="Discover a wide selection of books across various genres. Whether you re looking for history, fantasy, or something new, our store has something for every reader."
        buttons={{ primary: { text: "Let See!!", url: "fds" } }}
        image={{
          src: "https://writology.com/wp-content/uploads/2016/05/146099736590d11ed427dz-1200x675.jpg",
          alt: "book_bg",
        }}
      />

      <Search categories={categories} />

      <Blog books={books} category={countCategory}/>

      {/* <Gallery /> */}
      {/* <div className=" flex px-24 py-16 bg-gray-100">
        <div className="flex-1/4  ">
          <div className="flex bg-white flex-col px-16 py-8 w-fit justify-center item-center border-2 rounded-3xl">
            <div className="category-group">
              <label htmlFor="history">history</label>
              <input type="checkbox" />
            </div>
            <div className="category-group">
              <label htmlFor="Fantasy">Fantasy</label>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div className="flex-3/4 ">
          {data &&
            data.map((item, index) => (
              <Gallery
                category={item.category}
                items={item.items}
                key={index}
              />
            ))}
        </div>
      </div> */}
    </div>
  );
}
