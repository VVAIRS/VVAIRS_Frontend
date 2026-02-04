import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Chip,
} from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";

import FeatureCard from "../components/common/FeatureCard";
import PricingTeaser from "../components/common/PricingTeaser";
import ChartCard from "../components/common/ChartCard";
import Badge from "../components/common/Badge";
import IconBadge from "../components/common/IconBadge";
import LucideIcon from "../components/common/LucideIcon";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";

function HomeHero({ onPrimary, onSecondary }) {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, sm: 10 },
        pb: { xs: 6, sm: 8 },
      }}
      id="home"
    >
      {/* Background Effects */}
      <Box
        sx={{
          position: "absolute",
          top: -96,
          right: -96,
          width: 288,
          height: 288,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.15,
          filter: "blur(40px)",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -96,
          left: -96,
          width: 288,
          height: 288,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.1,
          filter: "blur(40px)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Chip
              icon={<LucideIcon name="shield-check" size={16} />}
              label="Enterprise-ready, privacy-first AI"
              sx={{
                bgcolor: "rgba(37,99,235,0.1)",
                color: "primary.main",
                fontWeight: 600,
                mb: 3,
              }}
            />
            <Typography
              variant="h2"
              component="h1"
              fontWeight={800}
              gutterBottom
              sx={{ lineHeight: 1.1 }}
            >
              AI-Powered Resume Screening. Faster. Smarter. Secure.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.125rem", mb: 4 }}
            >
              Automate resume shortlisting, generate job descriptions, and hire
              the right talent using your own secure AI models.
            </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={5}>
                            <Button
                                variant="primary"
                                onClick={() => navigate("/jobs")}
                                iconClass="icon-arrow-right"
                            >
                                Get Started
                                
                            </Button>
                            <Button variant="secondary" onClick={onSecondary} iconClass="icon-message-square-text">Request Demo</Button>
                        </Stack>

            <Grid container spacing={2}>
              {[
                { label: "Time to shortlist", value: "< 2 minutes" },
                { label: "Bulk uploads", value: "100s at once" },
                { label: "Security", value: "Self-hosted AI" },
                { label: "Compliance", value: "Data isolation" },
              ].map((m, i) => (
                <Grid item xs={6} sm={3} key={i}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 1.5,
                      border: 1,
                      borderColor: "divider",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {m.label}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {m.value}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Stack
              direction="row"
              spacing={1}
              mt={3}
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="caption" color="text.secondary">
                No external APIs for resume processing.
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                •
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Bring your own scoring logic.
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ overflow: "hidden", boxShadow: 3 }}>
              <Box
                p={2}
                borderBottom={1}
                borderColor="divider"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Screening Dashboard (Preview)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Candidate scores across multiple criteria
                  </Typography>
                </Box>
                <Badge
                  text="Live demo"
                  tone="primary"
                  iconClass="icon-circle-play"
                />
              </Box>
              <Box p={2} display="flex" flexDirection="column" gap={2}>
                <ChartCard
                  title="Skill match distribution"
                  chartId="home-skill-chart"
                  type="bar"
                  iconClass="icon-chart-bar"
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <ChartCard
                      title="Screening throughput"
                      subtitle="Resumes/hr"
                      chartId="home-throughput-chart"
                      type="line"
                      iconClass="icon-chart-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 2, height: "100%" }}>
                      <Box display="flex" justifyContent="space-between">
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Shortlist automation
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            72%
                          </Typography>
                        </Box>
                        <IconBadge
                          iconClass="icon-wand-sparkles"
                          tone="primary"
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        mt={1}
                      >
                        Consistent screening decisions with configurable
                        scoring.
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box
          mt={6}
          pt={4}
          borderTop={1}
          borderColor="divider"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box>
            <Typography
              variant="caption"
              fontWeight="bold"
              color="text.secondary"
              display="block"
              mb={1}
              textTransform="uppercase"
            >
              Trusted by teams scaling hiring
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {["users", "briefcase", "building-2", "rocket"].map((icon, i) => (
                <Chip
                  key={i}
                  size="small"
                  icon={<LucideIcon name={icon} size={14} />}
                  label={
                    ["HR Teams", "Recruiters", "Enterprises", "Startups"][i]
                  }
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function WhyChooseUs({ items }) {
  return (
    <Box component="section" sx={{ py: { xs: 8, sm: 10 } }} id="why">
      <Container maxWidth="lg">
        <SectionHeading
          title="Why teams choose us"
          subtitle="A secure, enterprise-ready approach to automate screening at scale."
          align="left"
        />
        <Grid container spacing={6} mt={4}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ p: 4, height: "100%" }}>
              <Stack direction="row" spacing={3} alignItems="flex-start">
                <IconBadge iconClass="icon-shield-check" tone="primary" />
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Built for privacy & compliance
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    We run self-hosted AI models with strict data isolation, so
                    your resumes never get shared with third-party AI providers.
                  </Typography>

                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={6}>
                      <Box
                        p={2}
                        border={1}
                        borderColor="divider"
                        borderRadius={2}
                        bgcolor="grey.50"
                      >
                        <Typography variant="caption" color="text.secondary">
                          Data flow
                        </Typography>
                        <Typography variant="subtitle2">
                          Private by default
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        p={2}
                        border={1}
                        borderColor="divider"
                        borderRadius={2}
                        bgcolor="grey.50"
                      >
                        <Typography variant="caption" color="text.secondary">
                          Controls
                        </Typography>
                        <Typography variant="subtitle2">
                          Custom scoring logic
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={1} mt={3} alignItems="center">
                    <LucideIcon name="lock" size={16} color="disabled" />
                    <Typography variant="caption" color="text.secondary">
                      Designed for high-volume hiring with enterprise
                      safeguards.
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              {items.map((t, idx) => (
                <Card key={idx} sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LucideIcon name="circle-check" size={24} color="#fff" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {t}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {
                          [
                            "Keep hiring data internal with isolated compute.",
                            "Process hundreds of resumes in one batch.",
                            "Reduce noise with consistent AI scoring.",
                            "Tune scoring to match each role and team.",
                            "Designed to match compliance expectations for enterprises.",
                          ][idx]
                        }
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function UseCases({ items }) {
  const icons = [
    "rocket",
    "graduation-cap",
    "users",
    "briefcase",
    "building-2",
  ];
  const descs = [
    "Screen your pipeline quickly and stay focused on interviews.",
    "Handle large applicant pools with consistent scoring.",
    "Automate shortlisting for mass recruitment campaigns.",
    "Deliver ranked candidates to clients with transparent scoring.",
    "Integrate with hiring operations and maintain strict compliance.",
  ];

  return (
    <Box component="section" sx={{ pb: { xs: 8, sm: 10 } }} id="usecases">
      <Container maxWidth="lg">
        <SectionHeading
          title="Use cases"
          subtitle="From fast-growing startups to high-volume hiring drives."
          align="left"
          mb={4}
        />
        <Grid container spacing={3}>
          {items.map((label, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={idx}>
              <Card sx={{ p: 3, height: "100%" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <LucideIcon name={icons[idx]} size={24} color="#fff" />
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {descs[idx]}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function FinalCTA({ onClick, onViewPricing }) {
  const navigate = useNavigate();
  return (
    <Box component="section" sx={{ pb: 8 }}>
      <Container maxWidth="lg">
        <Card
          sx={{
            p: { xs: 4, sm: 8 },
            bgcolor: "secondary.main",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -64,
              right: -64,
              width: 256,
              height: 256,
              borderRadius: "50%",
              bgcolor: "common.white",
              opacity: 0.1,
              filter: "blur(40px)",
            }}
          />

          <Grid container spacing={4} alignItems="center" position="relative">
            <Grid item xs={12} lg={7}>
              <Chip
                icon={<LucideIcon name="sparkles" size={16} color="#fff" />}
                label="Ready to modernize hiring?"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  mb: 2,
                  "& .MuiChip-icon": { color: "white" },
                }}
              />
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Hire Smarter with AI
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Build a faster screening workflow with secure self-hosted AI,
                bulk uploads, scoring, and automated outreach.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={5}
              display="flex"
              justifyContent="flex-end"
              gap={2}
            >
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/jobs");
                  console.log("Navigate to jobs");
                }}
                style={{ backgroundColor: "#fff", color: "#0f172a" }}
              >
                Start Screening
              </Button>
              <Button
                variant="secondary"
                onClick={onViewPricing}
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
              >
                View Pricing
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

export default function Home() {
  const { openDemo, pushToast } = useOutletContext();
  const navigate = useNavigate();

  // Fallbacks if not provided (shouldn't happen if properly setup in App)
  const onPrimary = () => {
    if (pushToast)
      pushToast({
        tone: "success",
        title: "Next step",
        message: "Thanks! We’ll open the demo request form.",
      });
    if (openDemo) openDemo();
  };

  const onSecondary = () => {
    if (openDemo) openDemo();
  };

  const features = [
    {
      title: "AI Job Description Generator",
      description:
        "Generate accurate and role-specific job descriptions instantly.",
      iconClass: "icon-file-text",
    },
    {
      title: "Bulk Resume Screening",
      description:
        "Upload hundreds of resumes at once and let our AI analyze and rank.",
      iconClass: "icon-folder-up",
    },
    {
      title: "AI-Based Resume Scoring",
      description:
        "Diff-check skills, experience, and relevance against the JD.",
      iconClass: "icon-chart-bar",
    },
    {
      title: "Automated Shortlisting",
      description: "Easily segregate shortlisted and rejected candidates.",
      iconClass: "icon-square-check",
    },
    {
      title: "Custom Email Communication",
      description: "Send personalized emails to candidates directly.",
      iconClass: "icon-mail",
    },
    {
      title: "Enterprise-Grade Security",
      description: "Self-hosted AI models with strict data isolation.",
      iconClass: "icon-lock",
    },
  ];

  const whyChoose = [
    "We use self-hosted AI models — no third-party data leakage",
    "Designed for high-volume hiring",
    "Fast, accurate, and unbiased resume screening",
    "Customizable scoring logic",
    "Built with enterprise security standards",
  ];

  const useCases = [
    "Startup hiring",
    "Campus recruitment",
    "Mass hiring drives",
    "Recruitment agencies",
    "Enterprise HR automation",
  ];

  return (
    <Box>
      <HomeHero onPrimary={onPrimary} onSecondary={onSecondary} />

      <Box component="section" sx={{ py: 8 }} id="features">
        <Container maxWidth="lg">
          <SectionHeading
            title="Everything you need to screen at scale"
            subtitle="Automate the repetitive work while keeping control of quality, security, and scoring."
            align="center"
          />
          <Grid container spacing={3} mt={4}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <FeatureCard {...f} />
              </Grid>
            ))}
          </Grid>
          <Box mt={6}>
            <PricingTeaser onAction={() => navigate("/pricing")} />
          </Box>
        </Container>
      </Box>

      <WhyChooseUs items={whyChoose} />
      <UseCases items={useCases} />
      <FinalCTA
        onClick={onSecondary}
        onViewPricing={() => navigate("/pricing")}
      />
    </Box>
  );
}
