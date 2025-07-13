import React from "react";
import { useParams } from "react-router";
import ClassicOverview from "@/components/classic-overview";
import api from "@/core/axios";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";

interface BookType {
  id: number;
  title: string;
  description: string;
  status: string;
  price: number;
  amount: number;
  created_at: Date;
  image_url: string;
  category_id: number;
  category_name: string;
}

export default function BookDetail() {
  const [book, setBook] = React.useState<BookType>();
  const { id } = useParams();

  React.useEffect(() => {
    const fetchBookById = async () => {
      const response = await api.get(`books/${id}`);
      setBook(response.data.data);
    };

    fetchBookById();
  }, []);

  console.log(book);
  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-100">
      <Button size="lg" className="flex float-right ">
        <Link to="/">Go Back</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={book?.image_url}
            alt="Modern watch with leather strap"
            className="object-cover w-full h-full"
            width={700}
            height={700}
          />
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {book.category_name}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-bold">{book.price}</span>
            <span className="text-lg text-muted-foreground line-through">
              {book.price + 20}
            </span>
            <span className="text-sm font-medium text-green-600">
              Save 20 THB
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{book?.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>{book!.amount > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>
          </div>

          {/* <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Color</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                <button className="w-8 h-8 rounded-full bg-brown-500"></button>
                <button className="w-8 h-8 rounded-full bg-slate-200"></button>
              </div>
            </div>
          </div> */}

          <div className="flex gap-4 mt-8 ">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
