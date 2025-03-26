"use client";

import React, { useState } from "react";
import { withAdmin } from "@/lib/withAdmin";

const AddTermPage: React.FC = () => {
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [branchNo, setBranchNo] = useState<number | null>(null);
    const [rank, setRank] = useState<number | null>(null);
    const [example, setExample] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!term || !definition || !branchNo || !rank || !example) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("/api/terms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    term,
                    definition,
                    branch_no: branchNo,
                    rank,
                    example,
                }),
            });

            if (response.ok) {
                setMessage("Term added successfully!");
                setTerm("");
                setDefinition("");
                setBranchNo(null);
                setRank(null);
                setExample("");
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error adding term:", error);
            setMessage(`An error occurred: ${error.message || "Unknown error"}`);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Add New Term</h1>
                <p className="text-gray-600">Fill in the details below to add a new term.</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Term</label>
                    <input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter term"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Definition</label>
                    <textarea
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter definition"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Branch No</label>
                    <input
                        type="number"
                        value={branchNo || ""}
                        onChange={(e) => setBranchNo(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter branch number"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Rank</label>
                    <input
                        type="number"
                        value={rank || ""}
                        onChange={(e) => setRank(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter rank"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Example</label>
                    <textarea
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter example"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Term
                </button>
            </form>

            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default withAdmin(AddTermPage);