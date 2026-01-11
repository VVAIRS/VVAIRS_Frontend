import React from 'react';

// Placeholder image - replace with your actual import
const AI_RESUME_FLOW_IMAGE = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop';

const AboutSection = () => {
    return (
        <section
            id="about"
            style={{
                padding: '6rem 0',
                background: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 2rem',
                position: 'relative',
                zIndex: 1
            }}>

                {/* CENTERED HEADING */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{
                        fontWeight: 900,
                        color: 'black',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        marginBottom: '1rem'
                    }}>
                        About ResumeZai
                    </h2>
                    <div style={{
                        width: '80px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #ffd89b 0%, #19547b 100%)',
                        margin: '0 auto',
                        borderRadius: '2px'
                    }} />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center'
                }}>

                    {/* CONTENT - LEFT */}
                    <div>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '1.5rem',
                            padding: '2.5rem',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
                            }}>
                            <p style={{
                                fontSize: '1.125rem',
                                color: '#1a202c',
                                lineHeight: 1.8,
                                marginBottom: '1.5rem'
                            }}>
                                ResumeZai AI Resume Screening is an intelligent recruitment assistant that automates resume processing and candidate shortlisting.
                            </p>

                            <p style={{
                                fontSize: '1.125rem',
                                color: '#4a5568',
                                lineHeight: 1.8,
                                marginBottom: 0
                            }}>
                                Designed for HR teams and recruiters, ResumeZai saves hours of manual work by analyzing bulk resumes, comparing them against job descriptions, and generating accurate candidate scores — all within seconds.
                            </p>

                            <div style={{
                                marginTop: '2rem',
                                paddingTop: '1.5rem',
                                borderTop: '2px solid #e2e8f0'
                            }}>
                                <p style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#667eea',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    margin: 0
                                }}>
                                    ⚡ Smart • Fast • Accurate
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* IMAGE - RIGHT */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        perspective: '1000px'
                    }}>
                        <div style={{
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 25px 70px rgba(0,0,0,0.4)',
                            width: '100%',
                            maxWidth: '550px',
                            position: 'relative',
                            transition: 'transform 0.5s ease'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'rotateY(5deg) rotateX(2deg) scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'rotateY(0) rotateX(0) scale(1)';
                            }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
                                pointerEvents: 'none',
                                zIndex: 1
                            }} />
                            <img
                                src={AI_RESUME_FLOW_IMAGE}
                                alt="3D illustration of resumes flowing into an AI system"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default AboutSection;