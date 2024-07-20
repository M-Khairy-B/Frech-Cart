import React from "react";
import { Helmet } from 'react-helmet-async';
import iconimage from "../../image/avataaars.svg";
import RecentCategorie from "../RecentCategorie/RecentCategorie";
export default function Categories() {

    return (<React.Fragment>
        <Helmet>
            <link rel="icon" href={iconimage} />
            <title>Categories</title>
        </Helmet>
        <div className='flex flex-wrap mx-auto container py-8'>
            <RecentCategorie></RecentCategorie>
        </div>
    </React.Fragment>
    )
}

