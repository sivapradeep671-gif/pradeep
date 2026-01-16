import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { api } from '../../services/api';
import { FileText, Download, Loader } from 'lucide-react';

const AuditGenerator = () => {
    const [loading, setLoading] = useState(false);

    const generatePDF = async () => {
        setLoading(true);
        try {
            const res = await api.get('/reports/cag-audit');
            if (res.success) {
                const data = res.data;
                const doc = new jsPDF();

                // HEADER
                doc.setFontSize(18);
                doc.setFont('helvetica', 'bold');
                doc.text('TNCSC - Audit & Compliance Report', 14, 20);

                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text(`Generated On: ${new Date(data.date).toLocaleString()}`, 14, 28);
                doc.line(14, 32, 196, 32); // Horizontal Line

                // EXECUTIVE SUMMARY
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('1. Executive Summary', 14, 45);

                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                const summary = [
                    ['Total Capacity', `${data.stats.totalCapacity} MT`],
                    ['Current Stock', `${data.stats.currentStock} MT`],
                    ['Utilization', `${data.stats.utilization}%`],
                    ['Est. Loss Value', `Rs. ${data.stats.lossValue}`]
                ];

                autoTable(doc, {
                    startY: 50,
                    head: [['Metric', 'Value']],
                    body: summary,
                    theme: 'striped',
                    headStyles: { fillColor: [41, 128, 185] }
                });

                // ANOMALIES
                const lastY = doc.lastAutoTable.finalY; // Get Y position of previous table
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('2. Detected Loss Anomalies', 14, lastY + 20);

                const anomalyRows = data.anomalies.map(a => [a.godown, a.month, a.loss, a.status]);

                autoTable(doc, {
                    startY: lastY + 25,
                    head: [['Godown', 'Period', 'Loss %', 'Risk Status']],
                    body: anomalyRows,
                    theme: 'grid',
                    headStyles: { fillColor: [192, 57, 43] },
                    didParseCell: function (data) {
                        if (data.section === 'body' && data.column.index === 3) {
                            if (data.cell.raw === 'Critical') {
                                data.cell.styles.textColor = [192, 57, 43];
                                data.cell.styles.fontStyle = 'bold';
                            }
                        }
                    }
                });

                // CRITICAL INCIDENTS
                const lastY2 = doc.lastAutoTable.finalY;
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text('3. Open Critical Incidents', 14, lastY2 + 20);

                const incidentRows = data.criticalIncidents.map(i => [i.id, i.title, i.type, i.status]);

                autoTable(doc, {
                    startY: lastY2 + 25,
                    head: [['ID', 'Title', 'Type', 'Status']],
                    body: incidentRows,
                    theme: 'striped'
                });

                // FOOTER
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text('This is a system-generated report for CAG Audit purposes.', 14, 280);

                doc.save('TNCSC_CAG_Audit_Report.pdf');
                alert('Report Generated Successfully');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to generate report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 text-center max-w-sm mx-auto mt-10">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">CAG Audit Report</h3>
            <p className="text-sm text-slate-500 mb-6">Generate official compliance PDF including inventory stats, loss anomalies, and incident logs.</p>

            <button
                onClick={generatePDF}
                disabled={loading}
                className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
                {loading ? <Loader className="animate-spin" size={20} /> : <Download size={20} />}
                Download PDF
            </button>
        </div>
    );
};

export default AuditGenerator;
