import React, { useState } from 'react';

const steps = [
  { id: 'info', title: 'Basic Info' },
  { id: 'service', title: 'Service Type' },
  { id: 'details', title: 'Project Details' },
  { id: 'upload', title: 'Upload Files' },
];

export default function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'machining',
    description: '',
    tolerance: 'standard',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden group">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center border-2 mb-2 transition-colors ${
                index <= currentStep ? 'bg-safety-orange border-safety-orange text-charcoal' : 'bg-charcoal border-white/10 text-white/40'
              }`}>
                <span className="mono text-xs font-black">{index + 1}</span>
              </div>
              <span className={`hidden md:block mono text-[9px] uppercase tracking-widest font-black ${
                index <= currentStep ? 'text-safety-orange' : 'text-white/20'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-3xl font-black mb-8 leading-none">TELL US WHO YOU ARE.</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="mono text-[10px] uppercase tracking-widest text-white/40 block">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-safety-orange text-white mono"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mono text-[10px] uppercase tracking-widest text-white/40 block">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-safety-orange text-white mono"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="mono text-[10px] uppercase tracking-widest text-white/40 block">Company (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-safety-orange text-white mono"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-3xl font-black mb-8 leading-none">SELECT A SERVICE.</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['CNC Machining', 'Hydraulics', 'Fabrication', 'Repair', 'Design/CAD', 'Consulting'].map((service) => (
                  <button
                    key={service}
                    onClick={() => setFormData({...formData, service})}
                    className={`p-6 border-2 mono text-xs uppercase tracking-widest font-black transition-all ${
                      formData.service === service ? 'bg-safety-orange border-safety-orange text-charcoal' : 'bg-white/5 border-white/10 text-white hover:border-safety-orange/50'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-3xl font-black mb-8 leading-none">PROJECT DETAILS.</h3>
              <div className="space-y-2">
                <label className="mono text-[10px] uppercase tracking-widest text-white/40 block">Description of Work</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-safety-orange text-white mono min-h-[150px]"
                  placeholder="Describe the parts, quantities, and material requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="mono text-[10px] uppercase tracking-widest text-white/40 block">Required Tolerance</label>
                <select 
                   className="w-full bg-charcoal border border-white/10 p-4 focus:outline-none focus:border-safety-orange text-white mono appearance-none cursor-pointer"
                   value={formData.tolerance}
                   onChange={(e) => setFormData({...formData, tolerance: e.target.value})}
                >
                  <option value="standard">± 0.005" (Standard)</option>
                  <option value="precision">± 0.001" (Precision)</option>
                  <option value="ultra">± 0.0005" (Ultra-Precision)</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-3xl font-black mb-8 leading-none">UPLOAD SPECS.</h3>
              <div className="border-2 border-dashed border-white/10 p-12 text-center group-hover:border-safety-orange transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6 text-white/20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <p className="mono text-xs uppercase tracking-widest font-black mb-2 text-white">Drag & Drop Files</p>
                <p className="text-white/40 text-sm">PDF, STEP, DXF, or PNG (Max 50MB)</p>
                <button className="mt-8 bg-white/10 text-white px-6 py-3 text-[10px] mono uppercase tracking-widest font-black hover:bg-safety-orange hover:text-charcoal transition-colors">
                  Browse Files
                </button>
              </div>
              <p className="text-[10px] mono text-white/40 text-center uppercase tracking-widest">Your data is secured with industrial-grade encryption.</p>
            </div>
          )}
        </div>

        <div className="mt-12 pt-12 border-t border-white/5 flex justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center mono text-xs uppercase tracking-widest font-black ${
              currentStep === 0 ? 'text-white/10 cursor-not-allowed' : 'text-white hover:text-safety-orange'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back
          </button>
          
          <button 
            onClick={currentStep === steps.length - 1 ? () => alert('Request Submitted!') : nextStep}
            className="bg-safety-orange text-charcoal px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center"
          >
            {currentStep === steps.length - 1 ? 'Submit Quote' : 'Next Step'}
            {currentStep !== steps.length - 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
