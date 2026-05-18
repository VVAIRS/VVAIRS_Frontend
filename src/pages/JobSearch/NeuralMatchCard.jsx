import React from 'react';

export default function NeuralMatchCard({ job, index }) {
  // Format date
  const dateObj = job.posted_date ? new Date(job.posted_date) : null;
  const dateStr = dateObj ? dateObj.toLocaleDateString() : "Just now";
  
  const score = job.match_score ? Math.round(job.match_score) : 0;
  const roleSimilarity = job.role_similarity ? Math.round(job.role_similarity) : 0;
  
  // Safe parsing of matched skills
  const matchedSkills = job.matched_skills || [];
  const totalSkills = job.total_job_skills || matchedSkills.length;

  return (
    <article className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-md cursor-pointer group">
      <div className="flex justify-between items-start gap-md">
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary-container transition-colors">
            {job.title}
          </h4>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {job.company || "Confidential"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-xs">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            {score}% Match
          </span>
          <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm">
            {roleSimilarity}% Role Fit
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 font-body-md text-body-md text-on-surface-variant">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">location_on</span> 
          {job.location || "Remote"}
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">schedule</span> 
          {job.required_experience ? `${job.required_experience}+ Yrs Exp` : "Experience not specified"}
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">today</span> 
          Posted {dateStr}
        </div>
        <div className="flex items-center gap-1">
          <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-label-sm uppercase">
            {job.source || "External"}
          </span>
        </div>
      </div>
      
      <p className="font-body-md text-body-md text-on-surface line-clamp-2">
        {job.description ? job.description.replace(/<[^>]+>/g, '') : "No description provided."}
      </p>
      
      <div className="bg-surface-bright rounded-lg p-sm border border-outline-variant/50">
        <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">
          Matched {matchedSkills.length} of {totalSkills} key skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.map((skill, i) => (
            <span key={i} className="bg-surface-container-low text-on-surface-variant px-2 py-1 rounded-md font-label-sm text-label-sm border border-outline-variant/30">
              {skill}
            </span>
          ))}
          {/* Missing skills would go here with line-through if we had them in the API */}
        </div>
      </div>
      
      <div className="pt-sm mt-auto">
        <a 
          href={job.apply_url || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full md:w-auto text-center bg-surface-container-lowest text-primary-container border border-primary-container font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm active:scale-[0.98]"
        >
          Apply Now
        </a>
      </div>
    </article>
  );
}
