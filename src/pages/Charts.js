import useDashboard from "../hooks/useDashBoard";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import useCandidates from "../hooks/useCandidates";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Charts() {
    const { fetchJobById, jobData } = useDashboard();
    const { candidatesData, initCandidates } = useCandidates();
    const { jobId } = useParams();

    useEffect(() => {
        fetchJobById(jobId);
        initCandidates(jobId);
    }, [jobId]);

    /* ---------------- CANDIDATE STATUS COUNTS ---------------- */
    const statusCounts = useMemo(() => {
        const counts = { shortlisted: 0, pending: 0, rejected: 0 };
        candidatesData?.forEach((c) => {
            const status = c.status?.toLowerCase();
            if (counts[status] !== undefined) counts[status]++;
        });
        return counts;
    }, [candidatesData]);

    if (!jobData) return <p>Loading...</p>;

    /* ---------------- DATA ---------------- */
    const tokenData = {
        labels: ["Prompt Tokens", "Completion Tokens"],
        datasets: [
            {
                label: "Token Usage",
                data: [jobData.prompt_tokens, jobData.completion_tokens],
                backgroundColor: ["#1976d2", "#9c27b0"],
                borderRadius: 10,
                barThickness: 22,
            },
        ],
    };

    const statusData = {
        labels: ["Shortlisted", "Pending", "Rejected"],
        datasets: [
            {
                label: "Candidates",
                data: [
                    statusCounts.shortlisted,
                    statusCounts.pending,
                    statusCounts.rejected,
                ],
                backgroundColor: ["#2e7d32", "#ed6c02", "#d32f2f"],
                borderRadius: 10,
                barThickness: 22,
            },
        ],
    };

    /* ---------------- OPTIONS (ADVANCED) ---------------- */
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y", // 🔥 Horizontal bar chart
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 10,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#666" },
            },
            y: {
                grid: { display: false },
                ticks: { color: "#444", font: { weight: "500" } },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom" },
            tooltip: {
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
    };

    /* ---------------- STYLES ---------------- */
    const sectionStyle = {
        padding: "20px 0",
    };

    const chartsRowStyle = {
        display: "flex",
        alignItems: "stretch",
        gap: "50px",
    };

    const chartContainer = {
        height: "260px",
        width: "100%",
    };

    const verticalDivider = {
        width: "1px",
        backgroundColor: "#e0e0e0",
    };

    const sectionTitle = {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "#333",
    };

    const chartTitle = {
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "10px",
        color: "#555",
    };

    return (
        <div style={{ width: "100%", maxWidth: "1600px", margin: "30px auto" }}>

            {/* TOKEN ANALYTICS */}
            <div style={sectionStyle}>
                <div style={sectionTitle}>Token Usage Analytics</div>

                <div style={chartsRowStyle}>
                    <div style={{ flex: 1 }}>
                        <div style={chartTitle}>Token Usage </div>
                        <div style={chartContainer}>
                            <Bar data={tokenData} options={barOptions} />
                        </div>
                    </div>

                    <div style={verticalDivider}></div>

                    <div style={{ flex: 1 }}>
                        <div style={chartTitle}>Token Distribution </div>
                        <div style={chartContainer}>
                            <Pie data={tokenData} options={pieOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <hr
                style={{
                    width: "100%",
                    margin: "25px 0",
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                }}
            />

            {/* CANDIDATE ANALYTICS */}
            <div style={sectionStyle}>
                <div style={sectionTitle}>Candidate Status Analytics</div>

                <div style={chartsRowStyle}>
                    <div style={{ flex: 1 }}>
                        <div style={chartTitle}>Candidate Status</div>
                        <div style={chartContainer}>
                            <Bar data={statusData} options={barOptions} />
                        </div>
                    </div>

                    <div style={verticalDivider}></div>

                    <div style={{ flex: 1 }}>
                        <div style={chartTitle}>Candidate Distribution</div>
                        <div style={chartContainer}>
                            <Pie data={statusData} options={pieOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
