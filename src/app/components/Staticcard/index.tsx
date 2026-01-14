'use client';

import { useEffect } from "react";

export default function StatCard({ label, value }: { label: string; value: number }) {
    useEffect(() => {
        fetch("https://localhost:7180/api/students")
            .then((res) => res.json())
            .then((data) => {
                console.log('11data', data)
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    }, []);
    return (
        <div className="stat-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}