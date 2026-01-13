import React, { useEffect } from 'react';
import { Container, Box, Typography, Grid, Card, Stack, Chip, Button as MuiButton } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';

import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import IconBadge from '../components/common/IconBadge';
import SectionHeading from '../components/common/SectionHeading';
import LucideIcon from '../components/common/LucideIcon';

function AboutHero({ onDemo }) {
    const navigate = useNavigate();

    return (
        <Box component="section" sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 8, sm: 10 }, pb: 8 }} id="about">
            {/* Background Effects */}
            <Box sx={{ position: 'absolute', top: -96, right: -96, width: 288, height: 288, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.1, filter: 'blur(40px)', zIndex: -1 }} />

            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} lg={6}>
                        <Chip
                            icon={<LucideIcon name="users" size={16} />}
                            label="Recruiter-first product team"
                            sx={{ bgcolor: 'rgba(37,99,235,0.1)', color: 'primary.main', fontWeight: 600, mb: 3 }}
                        />
                        <Typography variant="h3" component="h1" fontWeight={800} gutterBottom sx={{ color: 'text.primary' }}>
                            Who We Are
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.125rem', mb: 4 }}>
                            We are a technology-driven team focused on transforming the hiring process using Artificial Intelligence. Our platform helps organizations identify the right talent faster and more accurately.
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button variant="primary" onClick={onDemo} iconClass="icon-message-square-text">
                                Request Demo
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/pricing')} iconClass="icon-arrow-right">
                                View Pricing
                            </Button>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Card sx={{ overflow: 'hidden', boxShadow: 3 }}>
                            <Box p={3} borderBottom={1} borderColor="divider" display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">Our principles</Typography>
                                    <Typography variant="caption" color="text.secondary">How we build trustworthy AI hiring workflows</Typography>
                                </Box>
                                <Badge text="Security-first" tone="primary" iconClass="icon-shield-check" />
                            </Box>

                            <Box p={3} display="flex" flexDirection="column" gap={2}>
                                {[{
                                    title: 'Privacy by design',
                                    desc: 'Self-hosted models and strict isolation keep candidate information confidential.',
                                    icon: 'lock'
                                }, {
                                    title: 'Practical automation',
                                    desc: 'Automate the repetitive tasks while maintaining recruiter control and transparency.',
                                    icon: 'wand-sparkles'
                                }, {
                                    title: 'Consistency & fairness',
                                    desc: 'Use configurable scoring to reduce bias and apply consistent criteria across candidates.',
                                    icon: 'scale'
                                }].map((p, i) => (
                                    <Box key={i} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50', display: 'flex', gap: 2 }}>
                                        <IconBadge iconClass={p.icon} tone="primary" />
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">{p.title}</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: 'block', mt: 0.5 }}>
                                                {p.desc}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

function AboutContent() {
    const blocks = [
        {
            title: 'Our Mission',
            iconClass: 'icon-target',
            content: 'To simplify and accelerate recruitment by leveraging secure, scalable, and intelligent AI solutions.'
        },
        {
            title: 'Our Vision',
            iconClass: 'icon-globe',
            content: 'To become a trusted AI hiring partner for companies across the globe.'
        }
    ];

    const differentiators = [
        'Self-hosted AI models',
        'No sharing of resume data with external APIs',
        'Built for compliance and privacy',
        'Highly scalable cloud infrastructure',
        'Recruiter-first design approach'
    ];

    return (
        <Box component="section" sx={{ py: { xs: 8, sm: 10 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {blocks.map((b, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <Card sx={{ p: 3, height: '100%' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                    <IconBadge iconClass={b.iconClass} tone="primary" />
                                    <Badge text="Core" tone="neutral" iconClass="icon-circle-check" />
                                </Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>{b.title}</Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {b.content}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}

                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3, height: '100%' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                <IconBadge iconClass="icon-shield-check" tone="primary" />
                                <Badge text="Compliance" tone="primary" iconClass="icon-lock" />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>Security & Privacy</Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                We prioritize data security. All resumes and job data are processed using our own cloud-hosted AI models.
                            </Typography>
                            <Box sx={{ p: 2, bgcolor: 'grey.50', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                                <Typography variant="caption" color="text.secondary" display="block">What this means for you</Typography>
                                <Typography variant="subtitle2">Resume data stays inside your environment.</Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={6} mt={4}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 4, height: '100%' }}>
                            <SectionHeading
                                title="What makes us different"
                                subtitle="We optimize for trust, control, and a better recruiter experience."
                                align="left"
                            />
                            <Stack spacing={2} mt={4}>
                                {differentiators.map((t, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', gap: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                                            <LucideIcon name="circle-check" size={20} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">{t}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {idx === 0 ? 'Operate dedicated models without sharing data externally.' :
                                                    idx === 1 ? 'Avoid sending resumes to third-party AI endpoints.' :
                                                        idx === 2 ? 'Support compliance requirements and internal policies.' :
                                                            idx === 3 ? 'Handle volume reliably during hiring spikes.' :
                                                                'Built with recruiter workflows in mind.'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 4, height: '100%' }}>
                            <SectionHeading
                                title="How we help teams"
                                subtitle="A clear workflow that moves from job requirements to ranked candidates."
                                align="left"
                            />
                            <Stack spacing={2} mt={4}>
                                {[
                                    { title: 'Define role requirements', iconClass: 'icon-file-text' },
                                    { title: 'Upload resumes in bulk', iconClass: 'icon-folder-up' },
                                    { title: 'Score candidates transparently', iconClass: 'icon-chart-bar' },
                                    { title: 'Automate shortlist & outreach', iconClass: 'icon-mail' }
                                ].map((s, idx) => (
                                    <Box key={idx} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                            <LucideIcon name={s.iconClass} size={20} />
                                        </Box>
                                        <Typography variant="subtitle2" fontWeight="bold">{s.title}</Typography>
                                        <Box ml="auto">
                                            <LucideIcon name="chevron-right" size={20} color="#94a3b8" />
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>

                            <Box mt={4} p={2} border={1} borderColor="divider" borderRadius={2} bgcolor="common.white">
                                <Typography variant="caption" color="text.secondary" fontWeight="bold" textTransform="uppercase">Tip</Typography>
                                <Typography variant="body2" color="text.primary" mt={0.5}>
                                    If you're evaluating tools for enterprise use, start with security and data flow. We'll walk you through both.
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default function About() {
    const { openDemo } = useOutletContext();

    return (
        <Box>
            <AboutHero onDemo={openDemo} />
            <AboutContent />
        </Box>
    );
}
