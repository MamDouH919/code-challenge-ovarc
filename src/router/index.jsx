import { createBrowserRouter, Outlet } from "react-router";

import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import ThemeProviderMUI from "../Components/MuiThem";
import Home from "../Pages/Home";
import NotFound from "../Components/NotFound";
import ShopBooks from "../Pages/ShopBooks";
import StoresList from "../Pages/Stores/StoresList";
import AuthorsList from "../Pages/Authors/AuthorsList";
import BooksList from "../Pages/Books/BooksList";
import CoverDiscovery from "../Pages/CoverDiscovery/CoverDiscovery";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ThemeProviderMUI>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </ThemeProviderMUI>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'shop',
                element: <Home />,
            },
            {
                path: 'shop/books',
                element: <ShopBooks />,
            },
            {
                path: 'stores',
                element: <StoresList />,
            },
            {
                path: 'author',
                element: <AuthorsList />,
            },
            {
                path: 'books',
                element: <BooksList />,
            },
            { path: 'stores/cover-discovery', element: <CoverDiscovery /> },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },

]);