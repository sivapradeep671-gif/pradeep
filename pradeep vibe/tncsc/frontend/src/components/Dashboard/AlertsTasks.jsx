import React, { useState } from 'react';
import {
    AlertTriangle,
    Clock,
    MapPin,
    User,
    CheckCircle2,
    Circle,
    MessageSquare,
    Send,
    MoreVertical,
    Filter
} from 'lucide-react';
import { api } from '../../services/api';

const AlertItem = ({ title, location, date, priority, onClick, isActive }) => {
    const priorityColors = {
        Critical: 'bg-red-50 text-red-700 border-red-100',
        High: 'bg-orange-50 text-orange-700 border-orange-100',
        Medium: 'bg-yellow-50 text-yellow-700 border-yellow-100'
    };

    const iconColors = {
        Critical: 'text-red-600',
        High: 'text-orange-600',
        Medium: 'text-yellow-600'
    };

    return (
        <div
            onClick={onClick}
            className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${isActive ? 'bg-blue-50/50' : ''}`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityColors[priority]}`}>
                    {priority}
                </div>
                <span className="text-xs text-slate-400">{date}</span>
            </div>
            <div className="flex items-start gap-3">
                <AlertTriangle size={18} className={`mt-0.5 ${iconColors[priority]}`} />
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">{title}</h4>
                    <div className="flex items-center text-xs text-slate-500 gap-1 mb-2">
                        <MapPin size={12} />
                        <span>{location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskItem = ({ title, assignee, status }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
                {status === 'Resolved' ? <CheckCircle2 className="text-green-500" size={20} /> : <Circle className="text-slate-300" size={20} />}
                <div>
                    <p className={`text-sm font-medium ${status === 'Resolved' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</p>
                    <p className="text-xs text-slate-500">Assigned to: {assignee}</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

const AlertsTasks = () => {
    const [activeAlert, setActiveAlert] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await api.get('/alerts');
                if (res.success && res.data) {
                    setAlerts(res.data.alerts || []);
                    setTasks(res.data.tasks || []);
                    if (res.data.alerts && res.data.alerts.length > 0) {
                        setActiveAlert(res.data.alerts[0].id);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch alerts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlerts();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Alerts...</div>;

    // Find active alert details
    const activeDetails = alerts.find(a => a.id === activeAlert);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Left Column: Alert List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="font-bold text-slate-800">Alerts</h2>
                    <button className="text-slate-400 hover:text-slate-600">
                        <Filter size={18} />
                    </button>
                </div>
                <div className="overflow-y-auto flex-1">
                    {alerts.map(alert => (
                        <AlertItem
                            key={alert.id}
                            {...alert}
                            isActive={activeAlert === alert.id}
                            onClick={() => setActiveAlert(alert.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Right Column: Detail & Tasks */}
            <div className="lg:col-span-2 flex flex-col gap-6 h-full overflow-y-auto">
                {activeDetails ? (
                    <>
                        {/* Alert Detail Card */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${activeDetails.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {activeDetails.priority} Alert
                                        </span>
                                        <span className="text-slate-400 text-sm">#{activeDetails.id}</span>
                                    </div>
                                    <h1 className="text-xl font-bold text-slate-900">{activeDetails.title}</h1>
                                    <p className="text-slate-500 mt-1 flex items-center gap-1">
                                        <MapPin size={14} /> {activeDetails.location} • Reported by IoT Sensor System
                                    </p>
                                </div>
                                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg mb-6 text-sm text-slate-700 leading-relaxed border border-slate-100">
                                <p>System detected {activeDetails.type} issue at {activeDetails.location}. Immediate attention required.</p>
                            </div>

                            <div className="flex gap-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Assign Inspection</button>
                                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Mark as False Alarm</button>
                            </div>
                        </div>

                        {/* Tasks Section */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800">Related Tasks</h3>
                                <button className="text-blue-600 text-sm font-medium hover:underline">+ New Task</button>
                            </div>
                            <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                                {tasks.map(task => (
                                    <TaskItem key={task.id} {...task} />
                                ))}
                            </div>
                            {/* Comment Section placeholder (static for now) */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Comments</h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        className="w-full pl-4 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700">
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">Select an alert to view details</div>
                )}
            </div>
        </div>
    );
};

export default AlertsTasks;
