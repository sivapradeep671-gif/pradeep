import React, { useEffect, useState } from 'react';
import KPICards from './KPICards';
import RiskTrendChart from './RiskTrendChart';
import DistrictRiskChart from './DistrictRiskChart';
import AlertsQueue from './AlertsQueue';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [trend, setTrend] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [kpiRes, trendRes, distRes, alertsRes] = await Promise.all([
                    fetch('/api/analytics/kpi'),
                    fetch('/api/analytics/risk-trend'),
                    fetch('/api/analytics/district-stats'),
                    fetch('/api/analytics/alerts')
                ]);

                setStats(await kpiRes.json());
                setTrend(await trendRes.json());
                setDistricts(await distRes.json());
                setAlerts(await alertsRes.json());
                setLoading(false);
            } catch (err) {
                console.error("Failed to load analytics data", err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-12 text-center text-slate-500 animate-pulse">Loading Analytics Engine...</div>;
    if (!stats) return <div className="p-12 text-center text-red-500">Failed to load data. API offline?</div>;

    return (
        <div className="space-y-6 animate-slide-in">
            {/* KPI Row */}
            <KPICards data={stats} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RiskTrendChart data={trend} />
                <DistrictRiskChart data={districts} />
            </div>

            {/* Alerts Queue */}
            <div className="grid grid-cols-1">
                <AlertsQueue alerts={alerts} />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
