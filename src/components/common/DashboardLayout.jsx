import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function NeuralDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isOptimizer = location.pathname.includes('resume-optimizer');
  const isJobMatcher = location.pathname.includes('job-search');
  const sidebarWidth = sidebarOpen ? 280 : 72;

  return (
    <div className="bg-background text-on-surface font-body-md h-screen flex antialiased overflow-hidden">
      {/* Desktop SideNavBar */}
      <nav
        className={`hidden md:flex flex-col h-screen shrink-0 bg-surface-container-lowest border-r border-outline-variant py-md z-40 transition-all duration-200 relative ${sidebarOpen ? 'px-md' : 'px-sm'}`}
        style={{ width: sidebarWidth }}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen((value) => !value)}
          className="absolute -right-3 top-20 z-50 h-7 w-7 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant shadow-sm hover:bg-surface-container flex items-center justify-center transition-colors"
          title={sidebarOpen ? 'Collapse menu' : 'Expand menu'}
        >
          <span className="material-symbols-outlined text-[18px]">{sidebarOpen ? 'chevron_left' : 'chevron_right'}</span>
        </button>
        <div className="flex-1">
          <div className={`flex items-center gap-md mb-lg ${sidebarOpen ? 'px-md' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
            </div>
            <div className={sidebarOpen ? 'block' : 'hidden'}>
              <div className="font-headline-sm text-headline-sm font-bold text-primary">CareerFocus</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">Pro Plan</div>
            </div>
          </div>
          <ul className="space-y-sm">
            <li>
              <a href="#" title="Dashboard" className={`flex items-center gap-md text-on-surface-variant px-md py-sm rounded-lg hover:bg-surface-container transition-all duration-200 ease-in-out ${sidebarOpen ? '' : 'justify-center px-0'}`}>
                <span className="material-symbols-outlined">dashboard</span>
                <span className={`font-label-md text-label-md ${sidebarOpen ? 'inline' : 'hidden'}`}>Dashboard</span>
              </a>
            </li>
            <li>
              <button 
                onClick={() => navigate('/resume-optimizer')}
                title="Resume Optimizer"
                className={`w-full flex items-center gap-md px-md py-sm transition-all duration-200 ease-in-out ${sidebarOpen ? '' : 'justify-center px-0'} ${isOptimizer ? 'bg-secondary-container text-on-secondary-container rounded-full border-l-4 border-primary' : 'text-on-surface-variant rounded-lg hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined" style={isOptimizer ? { fontVariationSettings: "'FILL' 1" } : {}}>description</span>
                <span className={`font-label-md text-label-md ${sidebarOpen ? 'inline' : 'hidden'}`}>Resume Optimizer</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/job-search')}
                title="Job Matcher"
                className={`w-full flex items-center gap-md px-md py-sm transition-all duration-200 ease-in-out ${sidebarOpen ? '' : 'justify-center px-0'} ${isJobMatcher ? 'bg-secondary-container text-on-secondary-container rounded-full border-l-4 border-primary' : 'text-on-surface-variant rounded-lg hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined" style={isJobMatcher ? { fontVariationSettings: "'FILL' 1" } : {}}>auto_awesome</span>
                <span className={`font-label-md text-label-md ${sidebarOpen ? 'inline' : 'hidden'}`}>Job Matcher</span>
              </button>
            </li>
            <li>
              <a href="#" title="Applications" className={`flex items-center gap-md text-on-surface-variant px-md py-sm rounded-lg hover:bg-surface-container transition-all duration-200 ease-in-out ${sidebarOpen ? '' : 'justify-center px-0'}`}>
                <span className="material-symbols-outlined">work</span>
                <span className={`font-label-md text-label-md ${sidebarOpen ? 'inline' : 'hidden'}`}>Applications</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className={`mb-lg ${sidebarOpen ? 'px-md' : 'hidden'}`}>
            <button className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-sm rounded-lg hover:bg-primary transition-colors shadow-sm">Upgrade to Premium</button>
          </div>
          <ul className="space-y-sm pt-md border-t border-outline-variant">
            <li>
              <a href="#" title="Help" className={`flex items-center gap-md text-on-surface-variant px-md py-sm rounded-lg hover:bg-surface-container transition-all duration-200 ease-in-out ${sidebarOpen ? '' : 'justify-center px-0'}`}>
                <span className="material-symbols-outlined">help</span>
                <span className={`font-label-md text-label-md ${sidebarOpen ? 'inline' : 'hidden'}`}>Help</span>
              </a>
            </li>
            <li>
              <button onClick={() => navigate('/login')} title="Logout" className={`w-full flex items-center gap-md text-on-surface-variant px-md py-sm rounded-lg hover:bg-surface-container transition-all duration-200 ease-in-out ${sidebarOpen ? '' : 'justify-center px-0'}`}>
                <span className="material-symbols-outlined">logout</span>
                <span className={`font-label-md text-label-md ${sidebarOpen ? 'inline' : 'hidden'}`}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen pb-[56px] md:pb-0 min-w-0 overflow-hidden">
        <Outlet />
      </div>

      {/* Mobile BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 h-[56px] bg-surface-container-lowest border-t border-outline-variant shadow-lg flex justify-around items-center px-sm pb-safe">
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 transition-transform duration-150 active:scale-90 rounded-xl">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm mt-1">Dashboard</span>
        </a>
        <button onClick={() => navigate('/resume-optimizer')} className={`flex flex-col items-center justify-center px-4 py-1 transition-transform duration-150 active:scale-90 rounded-xl ${isOptimizer ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={isOptimizer ? { fontVariationSettings: "'FILL' 1" } : {}}>description</span>
          <span className="font-label-sm mt-1">Optimize</span>
        </button>
        <button onClick={() => navigate('/job-search')} className={`flex flex-col items-center justify-center px-4 py-1 transition-transform duration-150 active:scale-90 rounded-xl ${isJobMatcher ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={isJobMatcher ? { fontVariationSettings: "'FILL' 1" } : {}}>auto_awesome</span>
          <span className="font-label-sm mt-1">Matcher</span>
        </button>
        <a href="#" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 transition-transform duration-150 active:scale-90 rounded-xl">
          <span className="material-symbols-outlined">work</span>
          <span className="font-label-sm mt-1">Apps</span>
        </a>
      </nav>
    </div>
  );
}
