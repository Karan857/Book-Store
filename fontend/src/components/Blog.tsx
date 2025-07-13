import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Calendar,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Technology",
    totalPosts: 10,
    icon: Cpu,
    background: "bg-indigo-500",
    color: "text-indigo-500",
  },
  {
    name: "Business",
    totalPosts: 5,
    icon: BriefcaseBusiness,
    background: "bg-amber-500",
    color: "text-amber-500",
  },
  {
    name: "Finance",
    totalPosts: 8,
    icon: BadgeDollarSign,
    background: "bg-emerald-500",
    color: "text-emerald-500",
  },
  {
    name: "Health",
    totalPosts: 12,
    icon: HeartPulse,
    background: "bg-rose-500",
    color: "text-rose-500",
  },
  {
    name: "Lifestyle",
    totalPosts: 15,
    icon: BookHeart,
    background: "bg-cyan-500",
    color: "text-cyan-500",
  },
  {
    name: "Politics",
    totalPosts: 20,
    icon: Scale,
    background: "bg-teal-500",
    color: "text-teal-500",
  },
  {
    name: "Science",
    totalPosts: 25,
    icon: FlaskRound,
    background: "bg-purple-500",
    color: "text-purple-500",
  },
  {
    name: "Sports",
    totalPosts: 30,
    icon: Bike,
    background: "bg-cyan-500",
    color: "text-cyan-500",
  },
];

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

interface CategoryType {
  category_name: string;
  category_count: number;
}

interface BlogType {
  books: BookItem[];
  category: CategoryType[];
}

const Blog = ({ books, category }: BlogType) => {
  const formatted = (createdAt: Date) => {
    return new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  console.log(category);
  return (
    <div className="bg-gray-100 w-full  py-10 lg:py-16 px-24 ">
      <div className="flex flex-col lg:flex-row items-start gap-12 ">
        <div className="flex-2/3">
          <h2 className="text-3xl font-bold tracking-tight">News</h2>

          <div className="mt-4 space-y-12">
            {books &&
              books.map((item, index) => (
                <Card
                  key={index}
                  className="ps-4 flex flex-col sm:flex-row  sm:items-center shadow-none overflow-hidden rounded-md border-none"
                >
                  <CardHeader className="px-0 sm:p-0 flex-1/4">
                    <div className="aspect-video sm:w-56  bg-muted rounded-lg">
                      <img src={item.image_url} alt={item.title} />
                    </div>
                  </CardHeader>
                  <CardContent className="px-0 sm:px-6 py-0 flex flex-col flex-3/4">
                    <div className="flex items-center gap-6">
                      <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                        {item.category_name != null
                          ? item.category_name
                          : "unknow"}
                      </Badge>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                      {item.title}{" "}
                    </h3>
                    <p className="mt-2 text-muted-foreground line-clamp-3 text-ellipsis">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                      {/* <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" /> 5 min read
                    </div> */}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />{" "}
                        {formatted(item.created_at)}
                      </div>
                      <Button className="flex items-center gap-2">
                        <Link to={`/book/${item.book_id}`}>รายละเอียด</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
        <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full flex-1/3">
          <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
            {category &&
              category.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2  p-3 rounded-md bg-opacity-15 dark:bg-opacity-25 bg-white "
                >
                  <div className="flex items-center gap-3">
                    {/* <category.icon className={"h-5 w-5"} /> */}
                    <span className="font-medium">{item.category_name}</span>
                  </div>
                  <Badge className="px-1.5 rounded-full">
                    {item.category_count}
                  </Badge>
                </div>
              ))}
          </div>
        </aside>
      </div>
      <Button className="bg-white text-black mt-12 w-4/5 mx-auto flex justify-center">
              <Link to="/books">ดูทั้งหมด</Link>
      </Button>
    </div>
  );
};

export default Blog;
