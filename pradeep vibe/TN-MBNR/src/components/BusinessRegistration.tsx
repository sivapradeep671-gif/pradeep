import React, { useState, useEffect } from 'react';
import { Shield, Save, AlertTriangle, CheckCircle, Loader, Building2, Upload } from 'lucide-react';
import type { Business, AnalysisResult } from '../types/types';
import { analyzeBusinessLogo } from '../services/geminiService';

interface BusinessRegistrationProps {
    existingBusinesses: Business[];
    onRegister: (business: Business) => void;
}

export const BusinessRegistration: React.FC<BusinessRegistrationProps> = ({ existingBusinesses, onRegister }) => {
    const [formData, setFormData] = useState<Partial<Business>>({
        legalName: '',
        tradeName: '',
        type: 'Sole Proprietorship',
        address: '',
        branchName: '',
        contactNumber: '',
        email: '',
        gstNumber: '',
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [termsError, setTermsError] = useState(false);
    const [draftFound, setDraftFound] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    useEffect(() => {
        const savedDraft = localStorage.getItem('tn_mbnr_registration_draft');
        if (savedDraft) {
            setDraftFound(true);
        }
    }, []);

    const loadDraft = () => {
        const savedDraft = localStorage.getItem('tn_mbnr_registration_draft');
        if (savedDraft) {
            const parsed = JSON.parse(savedDraft);
            setFormData(parsed.data);
            setDraftFound(false);
        }
    };

    const discardDraft = () => {
        localStorage.removeItem('tn_mbnr_registration_draft');
        setDraftFound(false);
    };

    const saveDraft = () => {
        const draft = {
            data: formData,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('tn_mbnr_registration_draft', JSON.stringify(draft));
        alert('Draft saved successfully!');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Duplicate Check
        const isDuplicateName = existingBusinesses.some(b =>
            b.legalName.toLowerCase() === formData.legalName?.toLowerCase() ||
            b.tradeName.toLowerCase() === formData.tradeName?.toLowerCase()
        );

        const isDuplicateGST = formData.gstNumber && existingBusinesses.some(b => b.gstNumber === formData.gstNumber);

        if (isDuplicateName || isDuplicateGST) {
            setTimeout(() => {
                setAnalysisResult({
                    isSafe: false,
                    riskLevel: 'High',
                    message: isDuplicateName ? 'Business Name already registered.' : 'GST Number already registered.',
                });
                setIsAnalyzing(false);
            }, 1500);
            return;
        }

        // AI Analysis
        if (logoFile && formData.tradeName) {
            try {
                const result = await analyzeBusinessLogo(logoFile, formData.tradeName);
                setAnalysisResult(result);
            } catch (error) {
                console.error(error);
                setAnalysisResult({
                    isSafe: false,
                    riskLevel: 'Medium',
                    message: 'Analysis failed due to an error.',
                });
            }
        } else {
            // Fallback Mock Analysis if no logo
            setTimeout(() => {
                const riskyNames = ['starbucks', 'a2b', 'dominos', 'kfc'];
                const isRisky = riskyNames.some(name => formData.tradeName?.toLowerCase().includes(name));

                setAnalysisResult({
                    isSafe: !isRisky,
                    riskLevel: isRisky ? 'High' : 'Low',
                    similarBrands: isRisky ? ['Famous Brand'] : [],
                    message: isRisky ? 'Potential trademark infringement detected.' : 'Trade name appears safe.',
                });
            }, 2000);
        }

        setIsAnalyzing(false);
    };

    const initiatePayment = () => {
        if (!termsAccepted) {
            setTermsError(true);
            return;
        }
        setTermsError(false);
        setIsPaymentProcessing(true);

        setTimeout(() => {
            setIsPaymentProcessing(false);
            const newBusiness: Business = {
                ...formData as Business,
                id: crypto.randomUUID(),
                status: 'Verified',
                registrationDate: new Date().toISOString(),
                riskScore: 10,
            };
            onRegister(newBusiness);
            localStorage.removeItem('tn_mbnr_registration_draft');
        }, 2000);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {draftFound && (
                <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Save className="h-5 w-5 text-blue-400 mr-3" />
                        <span className="text-blue-200">Found a saved draft from a previous session.</span>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={loadDraft} className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Load Draft</button>
                        <button onClick={discardDraft} className="text-sm text-slate-400 hover:text-white px-3 py-1">Discard</button>
                    </div>
                </div>
            )}

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
                <div className="flex items-center mb-8">
                    <Building2 className="h-8 w-8 text-yellow-500 mr-4" />
                    <h2 className="text-2xl font-bold text-white">Business Registration</h2>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Legal Name</label>
                            <input
                                type="text"
                                name="legalName"
                                value={formData.legalName}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                                placeholder="e.g., Sri Krishna Sweets Pvt Ltd"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Trade Name</label>
                            <input
                                type="text"
                                name="tradeName"
                                value={formData.tradeName}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                                placeholder="Name displayed on signboard"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Business Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                            >
                                <option>Sole Proprietorship</option>
                                <option>Partnership</option>
                                <option>Private Limited</option>
                                <option>Public Limited</option>
                                <option>LLP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">GST Number</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                                placeholder="Optional"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Business Logo</label>
                        <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files ? e.target.files[0] : null)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="h-10 w-10 text-slate-500 mx-auto mb-2" />
                            <p className="text-slate-400">{logoFile ? logoFile.name : "Upload Logo for AI Analysis"}</p>
                            <p className="text-xs text-slate-600 mt-1">Supports JPG, PNG</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                            placeholder="Full physical address"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Branch Name</label>
                            <input
                                type="text"
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                                placeholder="e.g., Main Branch, Anna Nagar"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                        <button
                            onClick={saveDraft}
                            className="text-slate-400 hover:text-white flex items-center transition-colors"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            Save Draft
                        </button>
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !formData.legalName || !formData.tradeName}
                            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold px-8 py-3 rounded-lg transition-all flex items-center"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-5 w-5 mr-2" />
                                    Verify & Proceed
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {analysisResult && (
                    <div className={`mt-8 p-6 rounded-xl border ${analysisResult.isSafe ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
                        <div className="flex items-start">
                            {analysisResult.isSafe ? (
                                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4" />
                            ) : (
                                <AlertTriangle className="h-6 w-6 text-red-500 mt-1 mr-4" />
                            )}
                            <div className="flex-1">
                                <h3 className={`text-lg font-bold mb-2 ${analysisResult.isSafe ? 'text-green-400' : 'text-red-400'}`}>
                                    {analysisResult.isSafe ? 'Verification Successful' : 'Risk Detected'}
                                </h3>
                                <p className="text-slate-300 mb-4">{analysisResult.message}</p>

                                {analysisResult.isSafe && (
                                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                                        <div className="mb-6">
                                            <div className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={termsAccepted}
                                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-yellow-500 focus:ring-yellow-500"
                                                />
                                                <label htmlFor="terms" className="ml-2 text-sm text-slate-300">
                                                    I agree to the <button onClick={() => setShowTerms(!showTerms)} className="text-yellow-500 hover:underline">Terms and Conditions</button>
                                                </label>
                                            </div>
                                            {showTerms && (
                                                <div className="bg-slate-950 p-4 rounded-lg text-xs text-slate-400 mb-2">
                                                    <p>1. I hereby declare that the information provided is true and correct.</p>
                                                    <p>2. I understand that falsification of data is a punishable offense.</p>
                                                    <p>3. I agree to the digital verification process.</p>
                                                </div>
                                            )}
                                            {termsError && (
                                                <p className="text-red-500 text-sm flex items-center mt-1">
                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                    Please agree to the Terms and Conditions to proceed.
                                                </p>
                                            )}
                                        </div>

                                        <div className="bg-slate-950 rounded-lg p-4 mb-6">
                                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                                <span>Registration Fee</span>
                                                <span>₹500.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                                <span>Blockchain Ledger Fee</span>
                                                <span>₹50.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                                <span>GST (18%)</span>
                                                <span>₹99.00</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-800">
                                                <span>Total Payable</span>
                                                <span>₹649.00</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={initiatePayment}
                                            disabled={isPaymentProcessing}
                                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center"
                                        >
                                            {isPaymentProcessing ? (
                                                <>
                                                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                                                    Processing Payment...
                                                </>
                                            ) : (
                                                'Proceed to Payment'
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
