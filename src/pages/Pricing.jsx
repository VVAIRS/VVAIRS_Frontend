import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Chip,
  Button as MuiButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import NotificationContext from "../context/NotificationContext";
import { useOutletContext, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import IconBadge from "../components/common/IconBadge";
import SectionHeading from "../components/common/SectionHeading";
import LucideIcon from "../components/common/LucideIcon";
import { useRazorpay } from "../hooks/useRazorpay"; // adjust path as needed
import { useAuthContext } from "../context/AuthContext";

const PROFESSIONAL_PLAN_USD = 10; // amount in USD sent to backend

function PricingHero({ onDemo }) {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, sm: 10 },
        pb: 8,
      }}
      id="pricing"
    >
      <Box
        sx={{
          position: "absolute",
          top: -96,
          right: -96,
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
              icon={<LucideIcon name="badge-check" size={16} />}
              label="Simple & transparent"
              sx={{
                bgcolor: "rgba(37,99,235,0.1)",
                color: "primary.main",
                fontWeight: 600,
                mb: 3,
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              fontWeight={800}
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Simple &amp; Transparent Pricing
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.125rem", mb: 4 }}
            >
              Choose a plan that fits your hiring needs.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="primary"
                onClick={onDemo}
                iconClass="icon-message-square-text"
              >
                Request Demo
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/#features")}
                iconClass="icon-arrow-right"
              >
                Explore Features
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ overflow: "hidden", boxShadow: 3 }}>
              <Box
                p={3}
                borderBottom={1}
                borderColor="divider"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    What you get
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Capability tiers built for teams of different sizes
                  </Typography>
                </Box>
                <Badge
                  text="Compare plans"
                  tone="primary"
                  iconClass="icon-chart-bar"
                />
              </Box>

              <Box p={3} display="flex" flexDirection="column" gap={2}>
                {[
                  {
                    label: "Resume uploads",
                    starter: "Limited",
                    pro: "Bulk",
                    ent: "Unlimited",
                  },
                  {
                    label: "AI scoring",
                    starter: "Basic",
                    pro: "Advanced",
                    ent: "Custom logic",
                  },
                  {
                    label: "Email automation",
                    starter: "Email support",
                    pro: "Automation",
                    ent: "Workflow + SLA",
                  },
                  {
                    label: "Security",
                    starter: "Standard",
                    pro: "Enhanced",
                    ent: "Enterprise + isolation",
                  },
                ].map((row, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                      bgcolor: "grey.50",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        color: "text.secondary",
                        fontWeight: "bold",
                      }}
                    >
                      {row.label}
                    </Typography>
                    <Grid container spacing={1} mt={1}>
                      {[
                        { label: "Starter", value: row.starter },
                        { label: "Professional", value: row.pro },
                        { label: "Enterprise", value: row.ent },
                      ].map((col) => (
                        <Grid item xs={4} key={col.label}>
                          <Box
                            p={1}
                            bgcolor="white"
                            border={1}
                            borderColor="divider"
                            borderRadius={1}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {col.label}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {col.value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
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

// ---------------------------------------------------------------------------
// PlanCard
// ---------------------------------------------------------------------------
function PlanCard({ plan, featured, onAction, loading }) {
  return (
    <Card
      sx={{
        p: 3,
        height: "100%",
        position: "relative",
        overflow: "hidden",
        boxShadow: featured ? 6 : 1,
        border: featured ? 2 : 1,
        borderColor: featured ? "primary.main" : "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
      >
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {plan.name}
          </Typography>
          <Typography variant="h4" fontWeight={800} color="text.primary" mt={1}>
            {plan.price}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {plan.name === "Starter"
              ? "Good for evaluation & pilots."
              : plan.name === "Professional"
                ? "For active recruiting teams."
                : "For enterprise deployments."}
          </Typography>
        </Box>
        <IconBadge
          iconClass={plan.iconClass}
          tone={featured ? "primary" : "neutral"}
        />
      </Box>

      <Stack spacing={1.5} mt={3} mb={3} flex={1}>
        {plan.features.map((f, idx) => (
          <Box key={idx} display="flex" alignItems="center" gap={1}>
            <LucideIcon
              name="circle-check"
              size={16}
              color={featured ? "#2563eb" : "#64748b"}
            />
            <Typography variant="body2" color="text.primary">
              {f}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box mt="auto">
        <Button
          variant={featured ? "primary" : "secondary"}
          onClick={onAction}
          iconClass={loading ? undefined : "icon-arrow-right"}
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={16} color="inherit" />
              Processing…
            </Box>
          ) : (
            plan.cta
          )}
        </Button>
      </Box>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Pricing page
// ---------------------------------------------------------------------------
export default function Pricing() {
  const { openDemo, pushToast } = useOutletContext();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { success, error, info } = useContext(NotificationContext);
  const [faqOpen, setFaqOpen] = useState(0);

  // ---------------------------------------------------------------------------
  // Razorpay hook – wired to Professional plan
  // ---------------------------------------------------------------------------
  const { initiate: initiatePayment, loading: paymentLoading } = useRazorpay({
    amount: PROFESSIONAL_PLAN_USD,
    currency: "usd",
    name: "HireAI",
    description: "Professional Plan – Monthly",
    // prefill: { name: user.name, email: user.email, contact: user.phone },
    onSuccess: (data) => {
      success("🎉 Payment successful! Your Professional plan is now active.");
    },
    onError: (err) => {
      if (err.message === "Payment cancelled by user.") {
        info("Payment cancelled.");
      } else {
        error(`Payment failed: ${err.message}`);
      }
    },
  });

  // ---------------------------------------------------------------------------
  // Plan definitions
  // ---------------------------------------------------------------------------
  const plans = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Limited resume uploads",
        "Basic AI scoring",
        "Job description generator",
        "Email support",
      ],
      cta: "Get Started",
      iconClass: "sparkles",
    },
    {
      name: "Professional",
      price: "₹500 / month",
      features: [
        "Bulk resume uploads",
        "Advanced AI scoring",
        "Custom job descriptions",
        "Email automation",
        "Priority support",
      ],
      cta: "Subscribe",
      iconClass: "scale",
    },
    {
      name: "Enterprise",
      price: "Custom Pricing",
      features: [
        "Unlimited resume screening",
        "Dedicated AI models",
        "Custom scoring logic",
        "API access",
        "Dedicated account manager",
        "Enterprise security & SLA",
      ],
      cta: "Contact Sales",
      iconClass: "shield-check",
    },
  ];

  // Map plan index → action
  const handlePlanAction = (index) => {
    // Guard: require login for paid plans
    if (!isAuthenticated && index !== 2) {
      error("Please log in to continue.");
      return;
    }
    if (index === 0) {
      navigate("/signup");
      return;
    }
    if (index === 1) {
      // Professional – trigger Razorpay
      initiatePayment();
      return;
    }
    if (index === 2) {
      // Enterprise – open demo / contact sales
      openDemo();
    }
  };

  const faqs = [
    {
      question: "Is my resume data secure?",
      answer:
        "Yes, all data is processed using our own secure AI models hosted in the cloud.",
    },
    {
      question: "Can I customize scoring criteria?",
      answer:
        "Yes, professional and enterprise plans allow customized scoring.",
    },
  ];

  return (
    <Box>
      <PricingHero onDemo={openDemo} />

      {/* Plans */}
      <Box component="section" sx={{ pb: 8 }}>
        <Container maxWidth="lg">
          <SectionHeading
            title="Plans"
            subtitle="Start free, scale up when you need bulk screening and advanced automation."
            align="center"
          />

          <Grid container spacing={4} mt={4}>
            {plans.map((p, i) => (
              <Grid item xs={12} md={4} key={i}>
                <PlanCard
                  plan={p}
                  featured={i === 1}
                  onAction={() => handlePlanAction(i)}
                  // Only show loading spinner on the Professional card
                  loading={i === 1 && paymentLoading}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" sx={{ pb: 8 }}>
        <Container maxWidth="md">
          <SectionHeading
            title="FAQ"
            subtitle="Common questions from HR teams and recruiters."
            align="left"
          />

          <Box mt={4}>
            {faqs.map((f, i) => (
              <Accordion
                key={i}
                expanded={faqOpen === i}
                onChange={() => setFaqOpen(faqOpen === i ? -1 : i)}
                elevation={0}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  mb: 1,
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold" color="text.secondary">
                    {f.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{f.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Talk to sales CTA */}
          <Card sx={{ mt: 6, p: 4, bgcolor: "secondary.main", color: "white" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Talk to sales
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Get guidance on security, setup, and rollout for your team.
                </Typography>
              </Box>
              <MuiButton
                variant="contained"
                onClick={openDemo}
                sx={{
                  bgcolor: "white",
                  color: "secondary.main",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                Request Demo
              </MuiButton>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
