import { Box, Container, Typography, Divider } from "@mui/material";

const sections = [
  {
    title: "1. Scope",
    content:
      "This Privacy Policy applies to the EmpikaAI platform, including related websites, APIs, job and resume processing features, authentication flows, support communications, and payment-related integrations.",
  },
  {
    title: "2. Information We Collect",
    content: "",
    subsections: [
      {
        sub: "A. Account and Identity Information",
        text: "Name or username, email address, password hash and authentication-related records, verification and password reset details.",
      },
      {
        sub: "B. Recruitment and Resume Data",
        text: "Resume and CV files, job descriptions, candidate information extracted from resumes such as name, email, phone, skills, work history, projects, education, location, and scoring outputs.",
      },
      {
        sub: "C. Usage and Operational Information",
        text: "Job creation and processing records, resume processing activity, platform-generated logs for security and debugging, and user-submitted bug reports and reviews.",
      },
      {
        sub: "D. Payment Information",
        text: "Payment status and transaction identifiers, subscription details. EmpikaAI does not store full payment card details. Card data is handled by Razorpay.",
      },
      {
        sub: "E. Support and Communications Data",
        text: "Emails sent to or from support, demo requests, and operational communications such as account verification and password reset.",
      },
    ],
  },
  {
    title: "3. How We Collect Information",
    content:
      "We collect information directly from you when you create an account, upload resumes, create jobs, submit reviews, report bugs, contact support, or make payments. We also collect information automatically through service operation and from payment and communication service providers.",
  },
  {
    title: "4. How We Use Information",
    content:
      "We use information to create and manage accounts, authenticate users, process resumes and job descriptions, generate screening outputs, store files, provide operational emails, process payments, respond to support requests, maintain service performance and security, and comply with legal obligations. We do not use customer resume or job data for marketing.",
  },
  {
    title: "5. AI Processing and Model Use",
    content:
      "EmpikaAI uses AI services hosted within Microsoft Azure infrastructure. Customer data submitted for processing is not used by us to train public or shared foundation models for unrelated purposes. Resume and hiring content is submitted to our AI processing workflow to produce matching, scoring, and extraction outputs.",
  },
  {
    title: "6. Cloud Storage and Infrastructure",
    content:
      "Uploaded files and workflow data may be stored in cloud infrastructure including Azure Blob Storage. We primarily configure our infrastructure in the India region.",
  },
  {
    title: "7. Sharing of Information",
    content:
      "We do not sell personal information. We may share information with cloud hosting providers (Azure), AI processing infrastructure, email service providers, payment processor Razorpay, legal or regulatory authorities where required by law, and professional advisors under confidentiality obligations.",
  },
  {
    title: "8. Data Retention and Deletion",
    content:
      "We retain data as long as needed to operate the service, maintain user access, satisfy legal obligations, resolve disputes, or enforce our rights. Users can delete job-related data through the product. Associated files and records are intended to be removed from active systems as part of that deletion workflow.",
  },
  {
    title: "9. User Rights",
    content:
      "Subject to applicable law, users may have rights to access, correct, delete, or export their personal information, withdraw consent, and contact us with privacy concerns. To exercise these rights, contact support@empikaai.com.",
  },
  {
    title: "10. Children's Privacy",
    content:
      "EmpikaAI is not intended for children under 18. If we become aware that personal information from a child has been collected, we will take reasonable steps to delete it.",
  },
  {
    title: "11. Communications",
    content:
      "We may send operational communications including email verification, password reset, account and support communications, and service-related notices. We do not send marketing emails as part of the current service model.",
  },
  {
    title: "12. Payments",
    content:
      "Payments are processed through Razorpay. Transaction identifiers and status information may be stored for billing, fraud prevention, and account-crediting purposes. Payment card details are handled by Razorpay.",
  },
  {
    title: "13. Security Measures",
    content:
      "We use reasonable technical and organizational safeguards including authentication controls and cloud infrastructure protections. No method of transmission or storage is completely secure. Users are responsible for maintaining the confidentiality of their account credentials.",
  },
  {
    title: "14. Changes to This Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time. When we make material changes, we may update the effective date and take reasonable steps to provide notice. Continued use after an updated policy becomes effective may constitute acceptance.",
  },
];

export default function PrivacyPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Effective Date: [To be added]
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          EmpikaAI is committed to protecting the privacy and security of your information. This Privacy Policy explains how we collect, use, store, disclose, and protect personal information when you access or use EmpikaAI's resume screening and recruitment workflow platform.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          EmpikaAI is operated in India. By using the platform, you acknowledge that you have read and understood this Privacy Policy.
        </Typography>

        {sections.map((s, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 3, mb: 1 }}>
              {s.title}
            </Typography>
            {s.content && (
              <Typography variant="body1" color="text.secondary" paragraph>
                {s.content}
              </Typography>
            )}
            {s.subsections?.map((sub, j) => (
              <Box key={j} sx={{ ml: 2, mb: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                  {sub.sub}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sub.text}
                </Typography>
              </Box>
            ))}
            {i < sections.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}

        <Box sx={{ mt: 4, p: 3, bgcolor: "grey.100", borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Contact:</strong><br />
            EmpikaAI<br />
            Email: support@empikaai.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
