import React, { useState } from 'react';
import { generateMarketInsights } from '../services/gemini';
import { MarketInsightAnalysis, GuidanceResult, SalaryRange } from '../types';
import { SpinnerIcon, LinkIcon, ExclamationTriangleIcon, SparklesIcon, ChartPieIcon, WrenchScrewdriverIcon, BriefcaseIcon, TrendingUpIcon } from './Icons';

const SalaryBar: React.FC<{ value: number, max: number, label: string, color: string }> = ({ value, max, label, color }) => {
    const percentage = Math.max((value / max) * 100, 5); // min 5% width for visibility
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold text-gray-800">₹{(value / 100000).toFixed(1)} LPA</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                    className={`${color} h-4 rounded-full transition-all duration-500 ease-out`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}

const SalaryChart: React.FC<{ range: SalaryRange }> = ({ range }) => {
    const maxSalary = Math.max(range.high, 1);
    return (
        <div className="space-y-4">
            <SalaryBar value={range.low} max={maxSalary} label="Low End" color="bg-yellow-400" />
            <SalaryBar value={range.average} max={maxSalary} label="Average" color="bg-green-500" />
            <SalaryBar value={range.high} max={maxSalary} label="High End" color="bg-purple-600" />
        </div>
    );
};


const AnalysisResult: React.FC<{ result: MarketInsightAnalysis }> = ({ result }) => {
    const { insight, sources } = result;

    const demandColors: { [key: string]: { bg: string, text: string, ring: string } } = {
        'High': { bg: 'bg-green-100', text: 'text-green-800', ring: 'ring-green-200' },
        'Medium': { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-200' },
        'Low': { bg: 'bg-red-100', text: 'text-red-800', ring: 'ring-red-200' },
    };
    const demandColor = demandColors[insight.demandLevel] || { bg: 'bg-gray-100', text: 'text-gray-800', ring: 'ring-gray-200' };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-8 animate-fade-in-up space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Salary Information */}
                <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Average Entry-Level Salary (Per Annum)</h3>
                    <SalaryChart range={insight.averageSalaryRange} />
                </div>

                {/* Demand Level */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Market Demand</h3>
                        <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-lg ring-4 ${demandColor.bg} ${demandColor.text} ${demandColor.ring}`}>
                            {insight.demandLevel}
                        </div>
                        <p className="mt-4 text-gray-600">{insight.supplyVsDemand}</p>
                    </div>
                </div>
            </div>
            
            {/* Skills and Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><WrenchScrewdriverIcon className="h-6 w-6 text-purple-600" />Top Skills in Demand</h3>
                    <div className="flex flex-wrap gap-2">
                        {insight.keySkillsInDemand.map(skill => (
                            <span key={skill} className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1.5 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><BriefcaseIcon className="h-6 w-6 text-purple-600" />Top Hiring Locations</h3>
                     <div className="flex flex-wrap gap-2">
                        {insight.topHiringLocations.map(loc => (
                            <span key={loc} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full">{loc}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Growth Outlook */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2"><TrendingUpIcon className="h-6 w-6 text-purple-600" />Growth Outlook</h3>
                <p className="text-gray-600 leading-relaxed">{insight.growthOutlook}</p>
            </div>


            {sources.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <LinkIcon className="h-5 w-5 text-gray-500" />
                        <span>AI-Researched Sources</span>
                    </h3>
                    <ul className="space-y-2">
                        {sources.map((source, index) => (
                            <li key={index}>
                                <a
                                    href={source.web.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors group"
                                >
                                    <span className="truncate text-sm font-medium text-purple-700 group-hover:underline">{source.web.title}</span>
                                    <span className="truncate text-xs text-gray-500 block mt-1">{source.web.uri}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

interface LiveMarketInsightsTabProps {
    guidanceResult: GuidanceResult | null;
    onTakeSurvey: () => void;
}

const LiveMarketInsightsTab: React.FC<LiveMarketInsightsTabProps> = ({ guidanceResult, onTakeSurvey }) => {
    const [analysisResult, setAnalysisResult] = useState<MarketInsightAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateReport = async () => {
        if (!guidanceResult?.recommendedCareer) return;

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);
        try {
            const result = await generateMarketInsights(guidanceResult.recommendedCareer);
            setAnalysisResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!guidanceResult) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8 text-center animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-800">Get Live Market Insights for Your Career</h2>
                <p className="mt-2 text-gray-600 max-w-lg mx-auto">
                    Take the AI survey first. We'll use your recommended career path to generate a custom analysis of current salaries, demand, and required skills.
                </p>
                <button
                    onClick={onTakeSurvey}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 w-auto mx-auto"
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>Take the AI Survey</span>
                </button>
            </div>
        );
    }


    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 animate-fade-in-up">
                 <div className="flex items-center gap-4 mb-2">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                        <ChartPieIcon className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Live Market Insights</h1>
                        <p className="text-lg text-gray-600">
                            Get a real-time analysis of the job market for your recommended career: <span className="font-bold text-purple-600">{guidanceResult.recommendedCareer}</span>.
                        </p>
                    </div>
                </div>
                
                {!analysisResult && (
                     <button
                        onClick={handleGenerateReport}
                        disabled={isLoading}
                        className="mt-6 w-full md:w-auto flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors disabled:bg-purple-300"
                    >
                         {isLoading ? (
                            <>
                                <SpinnerIcon className="animate-spin h-5 w-5" />
                                <span>Analyzing Market...</span>
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="h-5 w-5" />
                                <span>Analyze Current Market</span>
                            </>
                        )}
                    </button>
                )}
            </div>
            
            <div className="mt-8">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center text-gray-600 min-h-[250px] p-8 bg-white rounded-xl shadow-lg">
                        <SpinnerIcon className="animate-spin h-10 w-10 text-purple-600 mb-4" />
                        <p className="font-semibold text-xl">Analyzing the job market for "{guidanceResult.recommendedCareer}"...</p>
                        <p className="text-base mt-1">Using Google Search to gather the latest salary and demand data.</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl flex flex-col items-center text-center gap-3">
                        <ExclamationTriangleIcon className="h-10 w-10" />
                        <div>
                            <h4 className="font-bold text-lg">Analysis Failed</h4>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                {analysisResult && <AnalysisResult result={analysisResult} />}
            </div>
        </div>
    );
};

export default LiveMarketInsightsTab;