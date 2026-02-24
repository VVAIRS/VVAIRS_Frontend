import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import TokenIcon from "@mui/icons-material/Token";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAuthContext } from "../../context/AuthContext";

const StatCard = ({ icon, label, value, color = "primary.main" }) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 3,
      transition: "box-shadow 0.2s, transform 0.2s",
      "&:hover": {
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {value ?? "—"}
      </Typography>
    </CardContent>
  </Card>
);

const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" alignItems="center" spacing={2} py={1.5}>
    <Box
      sx={{
        color: "text.secondary",
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon}
    </Box>
    <Box flex={1}>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={500}
        display="block"
      >
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={600} color="text.primary">
        {value ?? "—"}
      </Typography>
    </Box>
  </Stack>
);

const Profile = () => {
  const { userData, userLoading } = useAuthContext();

  if (userLoading) {
    return (
      <Box
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : userData?.email
      ? userData.email[0].toUpperCase()
      : "?";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box mb={4}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            My Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Manage your account information and monitor your usage
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left — Identity Card */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                position: "sticky",
                top: 80,
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 88,
                  height: 88,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "primary.main",
                  fontSize: 28,
                  fontWeight: 700,
                  boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.15)",
                }}
              >
                {initials}
              </Avatar>
              {userData?.username && (
                <Typography variant="body2" color="text.secondary" mb={2}>
                  @{userData.username}
                </Typography>
              )}

              {userData?.role && (
                <Chip
                  label={userData.role}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600, mb: 3 }}
                />
              )}

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={0.5} divider={<Divider flexItem />}>
                {userData?.username && (
                  <InfoRow
                    icon={<AccountCircleIcon fontSize="small" />}
                    label="Full Name"
                    value={userData?.username}
                  />
                )}
                <InfoRow
                  icon={<EmailIcon fontSize="small" />}
                  label="Email / Username"
                  value={userData?.email}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* Right — Stats */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Usage Overview */}
              <Box>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={700}
                  letterSpacing={1}
                >
                  Usage Overview
                </Typography>
                <Grid container spacing={2} mt={0.5}>
                  <Grid item xs={12} sm={6}>
                    <StatCard
                      icon={<AssignmentTurnedInIcon fontSize="small" />}
                      label="Total Resumes Processed"
                      value={userData?.total_resumes_processed}
                      color="#1976d2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StatCard
                      icon={<TokenIcon fontSize="small" />}
                      label="Total Tokens Used"
                      value={
                        userData?.total_tokens_used != null
                          ? Number(userData.total_tokens_used).toLocaleString()
                          : null
                      }
                      color="#7b1fa2"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Credits & Limits */}
              <Box>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={700}
                  letterSpacing={1}
                >
                  Credits &amp; Limits
                </Typography>
                <Grid container spacing={2} mt={0.5}>
                  <Grid item xs={12} sm={4}>
                    <StatCard
                      icon={<HourglassEmptyIcon fontSize="small" />}
                      label="Free Trial Remaining"
                      value={userData?.free_trial_remaining}
                      color="#0288d1"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StatCard
                      icon={<CreditCardIcon fontSize="small" />}
                      label="Paid Credits"
                      value={userData?.paid_credits}
                      color="#2e7d32"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StatCard
                      icon={<DescriptionIcon fontSize="small" />}
                      label="Resumes Left"
                      value={userData?.resumes_left}
                      color="#ed6c02"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Account Status */}
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "rgba(25, 118, 210, 0.04)",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "success.main",
                    flexShrink: 0,
                    boxShadow: "0 0 0 3px rgba(46,125,50,0.2)",
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Account Active
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Your account is in good standing. All features are
                    available.
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
