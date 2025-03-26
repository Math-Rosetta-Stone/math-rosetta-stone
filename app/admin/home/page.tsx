
"use client";

import React from "react";
import { withAdmin } from "@/lib/withAdmin";

const Home: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Hello Admin</h1>
        </div>
    );
};

export default withAdmin(Home);
// export default Home;