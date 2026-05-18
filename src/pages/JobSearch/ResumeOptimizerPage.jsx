import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { SuperDocEditor } from '@superdoc-dev/react';
import '@superdoc-dev/react/style.css';

import {
  rescoreResume,
  saveEditedDocx,
  convertPdfToDocx,
  uploadResumeForEdit,
} from './jobSearchApi';

function getHealthMeta(healthData) {
  const overall = Number(healthData?.overall_score ?? 0);
  const clamped = Math.max(0, Math.min(100, Number.isFinite(overall) ? overall : 0));

  let color = '#10b981';
  let tone = 'GREAT';
  if (clamped < 60) {
    color = '#ef4444';
    tone = 'LOW';
  } else if (clamped < 80) {
    color = '#f59e0b';
    tone = 'GOOD';
  }

  return { overall: clamped, color, tone };
}

function ScoreRing({ score, color, tone }) {
  const radius = 54;
  const stroke = 11;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center rotate-0">
        <div className="text-4xl font-bold text-on-surface leading-none">{Math.round(score)}</div>
        <div className="text-[10px] tracking-[0.16em] text-on-surface-variant mt-1">{tone}</div>
      </div>
    </div>
  );
}

function SectionCard({ title, hint, status = 'ok', children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  const statusStyle =
    status === 'ok'
      ? 'bg-green-100 text-green-700'
      : status === 'warn'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700';

  const statusIcon = status === 'ok' ? 'check' : status === 'warn' ? 'priority_high' : 'warning';

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full px-md py-md flex items-center justify-between hover:bg-surface-container-low transition-colors"
      >
        <div className="flex items-center gap-sm text-left">
          <span className={`w-8 h-8 rounded-lg inline-flex items-center justify-center ${statusStyle}`}>
            <span className="material-symbols-outlined text-base">{statusIcon}</span>
          </span>
          <div>
            <div className="font-semibold text-on-surface">{title}</div>
            {hint ? <div className="text-xs text-on-surface-variant">{hint}</div> : null}
          </div>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant">{open ? 'expand_less' : 'expand_more'}</span>
      </button>
      {open ? <div className="px-md pb-md border-t border-outline-variant text-on-surface-variant text-sm">{children}</div> : null}
    </div>
  );
}

export default function ResumeOptimizerPage() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isRescoring, setIsRescoring] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [file, setFile] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);

  const [docxFile, setDocxFile] = useState(null);
  const [docUrl, setDocUrl] = useState(null);
  const [plainText, setPlainText] = useState('');

  const healthMeta = useMemo(() => getHealthMeta(healthData), [healthData]);

  const handleFileDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (!droppedFile) return;

    if (!droppedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      return;
    }

    setFile(droppedFile);
    setIsScanning(true);
    setError(null);

    try {
      const uploadData = await uploadResumeForEdit(droppedFile);
      setHealthData(uploadData.health_score || null);

      const docxBlob = await convertPdfToDocx(droppedFile);
      const converted = new File(
        [docxBlob],
        droppedFile.name.replace(/\.pdf$/i, '.docx'),
        { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
      );
      setDocxFile(converted);
      setDocUrl(URL.createObjectURL(converted));
      setIsEditing(true);
    } catch (err) {
      setError(err.message || 'Failed to process resume. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleEditedDocxUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith('.docx')) {
      setError('Please upload a DOCX file.');
      return;
    }
    setDocxFile(f);
    setDocUrl(URL.createObjectURL(f));
    setError(null);
  };

  const handleRescore = async () => {
    if (!plainText.trim()) {
      setError('Paste resume text to re-score.');
      return;
    }
    setIsRescoring(true);
    setError(null);
    try {
      const data = await rescoreResume(plainText);
      setHealthData(data.health_score || null);
    } catch (err) {
      setError(err.message || 'Failed to re-score resume');
    } finally {
      setIsRescoring(false);
    }
  };

  const handleSaveAndSearch = async () => {
    if (!docxFile) {
      setError('Upload the edited DOCX before saving.');
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await saveEditedDocx(docxFile);
      navigate('/job-search', { state: { performSearch: true } });
    } catch (err) {
      setError(err.message || 'Failed to save and search jobs');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <main className="flex-1 p-md lg:p-xl flex flex-col gap-xl max-w-[1440px] mx-auto w-full">
        <div className="pt-4 md:pt-0">
          <h2 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-xs font-bold text-primary">Resume Optimizer</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">Upload your PDF resume to start editing and optimize it for job matching.</p>
        </div>

        {error ? <div className="p-4 bg-error-container text-on-error-container rounded-lg">{error}</div> : null}

        <label
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-primary bg-surface rounded-xl flex flex-col items-center justify-center text-center p-xl min-h-[300px] cursor-pointer"
        >
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileDrop} disabled={isScanning} />
          {isScanning ? (
            <div className="flex flex-col items-center gap-sm">
              <CircularProgress size={40} />
              <p>Processing resume...</p>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>upload_file</span>
              <h4 className="font-headline-sm font-semibold text-on-surface">Drop a PDF or click to upload</h4>
              <p className="font-body-sm text-on-surface-variant">The file is converted to DOCX for in-app editing.</p>
            </>
          )}
        </label>
      </main>
    );
  }

  return (
    <main className="flex-1 h-full bg-background overflow-hidden flex flex-col">
      <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm px-md lg:px-lg h-16 shrink-0 z-30 flex items-center justify-between gap-md">
        <div className="flex items-center gap-md min-w-0">
          <button
            onClick={() => setIsEditing(false)}
            className="text-on-surface-variant hover:bg-surface-container-low p-sm rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">{file?.name || 'Resume Optimizer'}</h1>
        </div>

        <div className="flex items-center gap-sm shrink-0">
          <button
            onClick={handleRescore}
            disabled={isRescoring}
            className="flex items-center gap-sm px-sm lg:px-md py-sm rounded-lg border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-low transition-colors disabled:opacity-50"
          >
            {isRescoring ? <CircularProgress size={16} /> : <span className="material-symbols-outlined">refresh</span>}
            <span className="hidden sm:inline">Re-Score</span>
          </button>
          <button
            onClick={handleSaveAndSearch}
            disabled={isSaving}
            className="flex items-center gap-sm px-sm lg:px-md py-sm rounded-lg bg-primary-container text-on-primary-container font-label-md hover:bg-surface-tint transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? <CircularProgress size={16} /> : <span className="material-symbols-outlined">save</span>}
            <span className="hidden sm:inline">Save & Search Jobs</span>
          </button>
        </div>
      </header>

      <div className="p-xs lg:p-sm flex-1 min-h-0 flex flex-col lg:flex-row gap-sm overflow-hidden">
        <section className="w-full lg:flex-1 min-w-0 h-full bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
          <div className="px-sm py-xs border-b border-outline-variant bg-[#F8FAFC] shrink-0">
            <div className="flex flex-col gap-xs md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-on-surface-variant truncate">
                Edit in Superdoc. Export/download DOCX, upload the edited file below, then save.
              </div>
              <div className="flex items-center gap-xs min-w-0">
                <label className="text-xs text-on-surface-variant shrink-0">Edited DOCX</label>
                <input type="file" accept=".docx" onChange={handleEditedDocxUpload} className="text-xs max-w-[180px]" />
                <span className="text-xs text-on-surface-variant truncate max-w-[220px]">{docxFile?.name || 'No DOCX selected'}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {docUrl ? <SuperDocEditor document={docUrl} documentMode="editing" onReady={() => {}} /> : null}
          </div>
        </section>

        <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 h-full min-h-0 flex flex-col gap-sm overflow-hidden">
          <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm shrink-0">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-sm">Resume Score</h3>
            <div className="relative flex justify-center mb-sm">
              <ScoreRing score={healthMeta.overall} color={healthMeta.color} tone={healthMeta.tone} />
            </div>
            <p className="font-body-md text-on-surface-variant text-center text-sm">
              Your resume is optimized for role matching. Keep improving keyword relevance and clarity.
            </p>
          </div>

          <SectionCard
            title="Keywords Match"
            hint={healthData?.sections?.length ? `${healthData.sections.length} sections analyzed` : 'No sections yet'}
            status="ok"
            defaultOpen={true}
          >
            <div className="pt-sm">Use re-score after updating resume text to refresh keyword/section analysis.</div>
          </SectionCard>

          <SectionCard title="Action Verbs" hint="Improve impact statements" status="warn" defaultOpen={false}>
            <div className="pt-sm">Use stronger action verbs in experience bullets for better clarity.</div>
          </SectionCard>

          <div className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm flex-1 min-h-0 flex flex-col">
            <h4 className="font-semibold text-on-surface mb-sm">AI Re-Score Input</h4>
            <textarea
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Paste edited resume text here for re-score"
              className="w-full flex-1 min-h-[120px] p-sm border border-outline-variant rounded-lg bg-surface text-sm resize-none"
            />
          </div>

          {error ? <div className="p-sm bg-error-container text-on-error-container rounded-lg">{error}</div> : null}
        </aside>
      </div>
    </main>
  );
}
