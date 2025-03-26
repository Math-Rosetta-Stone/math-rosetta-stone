"use client";

import React, { useEffect, useState } from "react";
import { withAdmin } from "@/lib/withAdmin";

interface Branch {
    branch_no: number;
    map_name: string;
}

interface Chapter {
    chapter_no: number;
    branch_no: number;
    no_of_minigames: number;
}

const AdminDataPage: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [totalBranches, setTotalBranches] = useState<number>(0);
    const [totalChapters, setTotalChapters] = useState<number>(0);

    useEffect(() => {
        // Fetch branch data from the API
        const fetchBranches = async () => {
            try {
                const response = await fetch("/api/branches");
                const data = await response.json();
                if (response.ok) {
                    setBranches(data.payload);
                    setTotalBranches(data.payload.length);
                } else {
                    console.error("Failed to fetch branches:", data.error);
                }
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        // Fetch chapter data from the API
        const fetchChapters = async () => {
            try {
                const response = await fetch("/api/chapters");
                const data = await response.json();
                if (response.ok) {
                    setChapters(data.payload);
                    setTotalChapters(data.payload.length);
                } else {
                    console.error("Failed to fetch chapters:", data.error);
                }
            } catch (error) {
                console.error("Error fetching chapters:", error);
            }
        };

        fetchBranches();
        fetchChapters();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Page Header */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Data Viewer</h1>
                <p className="text-gray-600">View and manage data from the database.</p>
            </header>

            {/* Total Branches and Chapters */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Total Branches: {totalBranches}
                </h2>
                <h2 className="text-xl font-semibold text-gray-800">
                    Total Chapters: {totalChapters}
                </h2>
            </section>

            {/* Branch Data Table */}
            <section className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Branches</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Branch No</th>
                            <th className="border border-gray-300 px-4 py-2">Branch Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map((branch) => (
                            <tr key={branch.branch_no}>
                                <td className="border border-gray-300 px-4 py-2">{branch.branch_no}</td>
                                <td className="border border-gray-300 px-4 py-2">{branch.map_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Chapter Data Table */}
            <section className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Chapters</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Chapter No</th>
                            <th className="border border-gray-300 px-4 py-2">Branch No</th>
                            <th className="border border-gray-300 px-4 py-2">No. of Minigames</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((chapter) => (
                            <tr key={`${chapter.branch_no}-${chapter.chapter_no}`}>
                                <td className="border border-gray-300 px-4 py-2">{chapter.chapter_no}</td>
                                <td className="border border-gray-300 px-4 py-2">{chapter.branch_no}</td>
                                <td className="border border-gray-300 px-4 py-2">{chapter.no_of_minigames}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default withAdmin(AdminDataPage);