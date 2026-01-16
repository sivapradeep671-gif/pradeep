import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import FieldReportForm from './Forms/FieldReportForm';
import WeekendDataForm from './Forms/WeekendDataForm';

// Icons (Simple SVGs for portability)
const Icons = {
    Camera: () => <span className="text-xl">📷</span>,
    Check: () => <span className="text-xl">✅</span>,
    Clock: () => <span className="text-gray-400 text-xs">🕒</span>,
    Back: () => <span>←</span>,
    Sync: ({ synced }) => <span className={`text-xs ${synced ? 'text-green-200' : 'text-yellow-300'}`}>{synced ? '☁️ Synced' : '⚠️ Offline'}</span>
};

const FieldDashboard = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const handleLogout = () => navigate('/');

    const [filter, setFilter] = useState('All');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [showComplete, setShowComplete] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showFieldReport, setShowFieldReport] = useState(false);
    const [showWeekendReport, setShowWeekendReport] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };
    // Mock Tasks for "Hero" Demo
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Routine Inspection - TNJ001',
            location: 'Thanjavur Main Godown',
            priority: 'Normal',
            dueDate: '2025-12-15',
            status: 'Pending',
            riskReason: '',
            instructions: 'Verify stock position of Paddy (Common) and check for pest activity.',
            metrics: { stock: '12,400 MT', humidity: '13%', age: '24 Days' }
        },
        {
            id: 2,
            title: 'Urgent: Moisture Alert - TVR008',
            location: 'Mannargudi DPC',
            priority: 'Critical',
            dueDate: '2025-12-14',
            status: 'Pending',
            riskReason: 'IoT Sensor reported 18% Moisture',
            instructions: 'Inspect Stack 4 immediately. Check for roof leaks or improved ventilation needs.',
            metrics: { stock: '5,000 MT', humidity: '18% ⚠️', age: '12 Days' }
        },
        {
            id: 3,
            title: 'Stock Audit - MDU005',
            location: 'Madurai Kappalur',
            priority: 'High',
            dueDate: '2025-12-16',
            status: 'Pending',
            riskReason: 'Discrepancy in SAP vs Physical',
            instructions: 'Full physical weighment required for Wheat stock.',
            metrics: { stock: '12,000 MT', humidity: '11%', age: '45 Days' }
        },
        {
            id: 4,
            title: 'Safety Compliance Check',
            location: 'Coimbatore West',
            priority: 'Normal',
            dueDate: '2025-12-13',
            status: 'Completed',
            completedAt: '2025-12-13T10:30:00Z',
            remarks: 'All safety norms followed. Fire extinguishers refilled.',
            riskReason: '',
            metrics: { stock: '10,000 MT', humidity: '12%', age: '60 Days' }
        }
    ]);

    // Effect removed for Demo stability
    // useEffect(() => {
    //     fetch('/api/field-tasks')...
    // }, []);

    const filteredTasks = tasks.filter(t => {
        if (filter === 'All') return true;
        if (filter === 'Critical') return t.priority === 'Critical';
        if (filter === 'Pending') return t.status === 'Pending';
        if (filter === 'Completed') return t.status === 'Completed';
        return true;
    });

    // Actions
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(URL.createObjectURL(file));
        }
    };

    const submitCompletion = () => {
        // Optimistic UI Update
        const updatedTasks = tasks.map(t =>
            t.id === selectedTask.id
                ? { ...t, status: 'Completed', completedAt: new Date().toISOString(), remarks: remarks, photo: uploadedFile }
                : t
        );
        setTasks(updatedTasks);

        // Reset and Close
        setShowComplete(false);
        setShowUpload(false);
        setSelectedTask(null);
        setUploadedFile(null);
        setRemarks('');

        alert("Task Synced to HQ!");
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-green-700 text-white p-4 shadow flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg" alt="TN Emblem" className="w-10 h-10 brightness-0 invert" />
                    <div>
                        <h1 className="font-bold text-sm leading-tight uppercase tracking-wide">{t('tncscFull')}</h1>
                        <h2 className="font-bold text-lg text-emerald-100">{t('fieldOps')}</h2>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={toggleLanguage}
                        className="text-xs bg-green-800 px-3 py-1 rounded border border-green-600 font-bold"
                    >
                        {language === 'en' ? 'TA' : 'EN'}
                    </button>
                    <button onClick={handleLogout} className="text-xs bg-green-800 px-3 py-1 rounded border border-green-600">{t('signOut')}</button>
                </div>
            </header>

            {/* Action Buttons */}
            <div className="bg-white p-3 flex gap-3 border-b overflow-x-auto">
                <button
                    onClick={() => setShowFieldReport(true)}
                    className="flex-1 bg-blue-50 text-blue-700 text-xs font-bold py-2 px-4 rounded border border-blue-100 whitespace-nowrap"
                >
                    + {t('uploadReport')}
                </button>
                <button
                    onClick={() => setShowWeekendReport(true)}
                    className="flex-1 bg-orange-50 text-orange-700 text-xs font-bold py-2 px-4 rounded border border-orange-100 whitespace-nowrap"
                >
                    + {t('uploadWeekend')}
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-2 flex gap-2 overflow-x-auto shadow-sm border-b">
                {['All', 'Critical', 'Pending', 'Completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${filter === f ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredTasks.map(task => (
                    <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className={`bg-white p-4 rounded-lg shadow-sm border-l-4 cursor-pointer active:scale-95 transition-transform ${task.status === 'Completed' ? 'border-gray-400 opacity-60' :
                            task.priority === 'Critical' ? 'border-red-500' :
                                task.priority === 'High' ? 'border-orange-500' : 'border-blue-500'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{task.location}</span>
                            {task.status === 'Completed' ? (
                                <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">Done</span>
                            ) : (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white ${task.priority === 'Critical' ? 'bg-red-500' : task.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'
                                    }`}>
                                    {task.priority}
                                </span>
                            )}
                        </div>
                        <h3 className="font-bold text-gray-800">{task.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Icons.Clock />
                            <span>Due: {formatDate(task.dueDate)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* TASK DETAILS DRAWER (Overlay) */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                    <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
                        {/* Drawer Header */}
                        <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                            <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-gray-200 rounded-full">
                                <Icons.Back /> Back
                            </button>
                            <span className="font-bold text-gray-700">Task Details</span>
                            <div className="w-8"></div> {/* Spacer */}
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-5">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedTask.title}</h2>
                            <p className="text-gray-500 mb-4 flex items-center gap-2">
                                📍 {selectedTask.location}
                                <a href="#" className="text-blue-600 text-xs underline ml-2">View on Map</a>
                            </p>

                            {/* Risk Alert Box */}
                            <div className="bg-red-50 border border-red-200 p-3 rounded-md mb-6">
                                <h4 className="text-red-800 font-bold text-xs uppercase mb-1">Risk Factor</h4>
                                <p className="text-red-900 text-sm">{selectedTask.riskReason || 'Routine Inspection'}</p>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="bg-gray-50 p-3 rounded text-center border">
                                    <div className="text-xs text-gray-500">Stock</div>
                                    <div className="font-bold text-gray-800">{selectedTask.metrics?.stock}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded text-center border">
                                    <div className="text-xs text-gray-500">Humidity</div>
                                    <div className="font-bold text-gray-800">{selectedTask.metrics?.humidity}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded text-center border">
                                    <div className="text-xs text-gray-500">Age</div>
                                    <div className="font-bold text-gray-800">{selectedTask.metrics?.age}</div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="mb-8">
                                <h3 className="font-bold text-gray-700 mb-2">📋 Instructions</h3>
                                <p className="text-gray-600 text-sm leading-relaxed p-3 bg-blue-50 rounded border border-blue-100">
                                    {selectedTask.instructions || 'No specific instructions. Perform standard verify.'}
                                </p>
                            </div>

                            {/* Completed State */}
                            {selectedTask.status === 'Completed' && (
                                <div className="bg-green-50 p-4 rounded border border-green-200 mb-4">
                                    <p className="text-green-800 font-bold text-sm">✅ Completed on {new Date(selectedTask.completedAt).toLocaleTimeString()}</p>
                                    <p className="text-green-700 text-sm italic mt-1">"{selectedTask.remarks}"</p>
                                </div>
                            )}
                        </div>

                        {/* Drawer Actions */}
                        {selectedTask.status !== 'Completed' && (
                            <div className="p-4 border-t bg-white flex gap-3">
                                <button
                                    onClick={() => setShowUpload(true)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold border border-gray-300 flex items-center justify-center gap-2"
                                >
                                    <Icons.Camera /> Photo
                                </button>
                                <button
                                    onClick={() => setShowComplete(true)}
                                    className="flex-[2] bg-green-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-green-700"
                                >
                                    Mark Complete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* UPLOAD MODAL */}
            {showUpload && (
                <div className="fixed inset-0 z-[60] bg-black bg-opacity-70 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-xl p-6">
                        <h3 className="font-bold text-lg mb-4">Upload Evidence</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 mb-4 relative overflow-hidden">
                            {uploadedFile ? (
                                <img src={uploadedFile} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <>
                                    <span className="text-4xl opacity-20">📷</span>
                                    <p className="text-gray-400 text-sm mt-2">Tap to capture</p>
                                </>
                            )}
                            <input type="file" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-gray-500 font-bold">Cancel</button>
                            <button onClick={() => setShowUpload(false)} className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* COMPLETE MODAL */}
            {showComplete && (
                <div className="fixed inset-0 z-[60] bg-black bg-opacity-70 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-xl p-6">
                        <h3 className="font-bold text-lg mb-4">Complete Task</h3>
                        <p className="text-sm text-gray-500 mb-4">Please add a remark before closing this ticket.</p>
                        <textarea
                            className="w-full border rounded-lg p-3 text-sm h-24 mb-4 focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="e.g., Covered stack with tarpaulin..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowComplete(false)} className="px-4 py-2 text-gray-500 font-bold">Cancel</button>
                            <button onClick={submitCompletion} className="px-4 py-2 bg-green-600 text-white rounded font-bold">Submit Report</button>
                        </div>
                    </div>
                </div>
            )}
            {/* NEW REPORT FORMS */}
            {showFieldReport && <FieldReportForm onClose={() => setShowFieldReport(false)} />}
            {showWeekendReport && <WeekendDataForm onClose={() => setShowWeekendReport(false)} />}
        </div>
    );
};

export default FieldDashboard;
