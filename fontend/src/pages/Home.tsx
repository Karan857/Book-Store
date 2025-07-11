import React from 'react'
import Banner from '../components/Banner'
import TableListBook from '../components/TableListBook'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'

interface GalleryItem {
    id: string;
    title: string;
    price: number;
    amount: number;
    image: string;
}

interface Gallery6Props {
    heading: string;
    items: GalleryItem[];
}

export default function Home() {
    const mockGalleryItems: Gallery6Props = {
        "heading": "fantazy",
        "items": [


            {
                id: "1",
                title: "Sunset Overdrive",
                price: 1200,
                amount: 5,
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            },
            {
                id: "2",
                title: "Mountain Escape",
                price: 950,
                amount: 3,
                image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
            },
            {
                id: "3",
                title: "City Lights",
                price: 1500,
                amount: 2,
                image: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
            },
            {
                id: "4",
                title: "Forest Walk",
                price: 800,
                amount: 7,
                image: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0",
            },
            {
                id: "5",
                title: "Ocean Breeze",
                price: 1100,
                amount: 4,
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            }]
    };
    return (
        <div>
            <Hero
                heading='Welcome To Books Store'
                description='Discover a wide selection of books across various genres. Whether you re looking for history, fantasy, or something new, our store has something for every reader.'
                buttons={{ primary: { text: "Let See!!", url: "fds" } }}
                image={{ src: "https://writology.com/wp-content/uploads/2016/05/146099736590d11ed427dz-1200x675.jpg", alt: "book_bg" }}
            />
            {/* <Gallery /> */}
            <div className="bg-white h-32">

            </div>

            <div className=" flex px-24 py-16 bg-gray-100">
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

                    <Gallery heading={mockGalleryItems.heading} items={mockGalleryItems.items} />
                </div>

            </div>
        </div>
    )
}
