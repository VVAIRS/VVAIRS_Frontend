import { Box, Container, Typography, Divider } from "@mui/material";

const sections = [
  {
    title: "1. About EmpikaAI",
    content:
      "EmpikaAI is a recruitment workflow and resume screening platform designed to help users automate parts of hiring and candidate review workflows using software and AI-assisted tools. EmpikaAI is operated from India.",
  },
  {
    title: "2. Eligibility and Use",
    content:
      "EmpikaAI is intended for use by recruiters, hiring teams, businesses, consultants, and other users with a legitimate professional need for the Services. You may use the Services only in compliance with these Terms and all applicable laws.",
  },
  {
    title: "3. Account Responsibilities",
    content:
      "When you create an account, you are responsible for providing accurate account information, maintaining the confidentiality of your login credentials, all activity that occurs under your account, and promptly notifying us of unauthorized access or misuse.",
  },
  {
    title: "4. Permitted Use",
    content:
      "You may use EmpikaAI only for lawful business and hiring-related purposes. You agree not to use the Services for unlawful, fraudulent, or abusive activity; upload false or misleading content; abuse free trial access or pricing; interfere with service security; reverse engineer or scrape the platform; or violate the privacy or legal rights of others.",
  },
  {
    title: "5. User Content",
    content:
      "You are responsible for the content you upload, including resumes, job descriptions, and contact information. You retain ownership of your content. By using EmpikaAI, you grant us a limited right to host, store, transmit, process, analyze, and display your content solely for providing the Services.",
  },
  {
    title: "6. AI-Assisted Results and User Responsibility",
    content:
      "EmpikaAI provides AI-assisted outputs including extraction, scoring, ranking, and screening suggestions. These outputs support workflow automation, not human judgment replacement. AI outputs may contain errors. Hiring decisions must be reviewed and confirmed by the user. EmpikaAI is not responsible for employment decisions made based on platform outputs.",
  },
  {
    title: "7. Storage, Deletion, and Service Operation",
    content:
      "EmpikaAI may store uploaded files and related data as part of providing the Services. Users may delete job-related data through the product where deletion functionality is available. Credits and usage balances may remain on an account until used.",
  },
  {
    title: "8. Pricing, Payments, and Credits",
    content:
      "Certain features require payment. Pricing and plan structure are presented through the product interface. Payments are processed through Razorpay. EmpikaAI does not store full payment card details. Successfully completed payments are non-refundable from EmpikaAI's side.",
  },
  {
    title: "9. Refund Policy",
    content:
      "All payments are non-refundable once services have been used or partially used. Refunds may be considered for duplicate transactions, failed payments where funds were deducted but services not credited, or cases required under applicable law.",
  },
  {
    title: "10. Free Trial and Abuse Prevention",
    content:
      "EmpikaAI may provide free trial access or promotional usage. We reserve the right to restrict or revoke free-trial access where we reasonably believe a user is abusing the trial or misusing the platform.",
  },
  {
    title: "11. Suspension and Termination",
    content:
      "We may suspend or terminate access if you violate these Terms, misuse the Services, engage in fraud or abuse, or create security or legal risk.",
  },
  {
    title: "12. Availability and Service Changes",
    content:
      "We do not guarantee uninterrupted availability. We may update, modify, or discontinue parts of the Services. If we stop operating, we intend to provide prior notice where reasonably possible.",
  },
  {
    title: "13. Data Security and Processing",
    content:
      "We implement reasonable security measures. Data may be stored and processed using trusted third-party infrastructure including Microsoft Azure. No system is completely secure, and users acknowledge the inherent risks of electronic storage and internet transmission.",
  },
  {
    title: "14. Intellectual Property",
    content:
      "All rights in the Services remain the property of EmpikaAI or its licensors. You may not copy, modify, or distribute the Services except as expressly permitted.",
  },
  {
    title: "15. Privacy",
    content:
      "Your use of EmpikaAI is also governed by our Privacy Policy, which describes how we collect, use, and protect your information.",
  },
  {
    title: "16. No Employment Relationship or Hiring Liability",
    content:
      "EmpikaAI is a software tool and does not act as an employer or hiring authority. All hiring decisions are solely the responsibility of the user.",
  },
  {
    title: "17. Disclaimer of Warranties",
    content:
      "The Services are provided on an 'as is' and 'as available' basis. EmpikaAI disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
  },
  {
    title: "18. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, EmpikaAI's total aggregate liability shall not exceed the amount paid by the user in the twelve months preceding the claim or INR 10,000, whichever is less.",
  },
  {
    title: "19. Force Majeure",
    content:
      "EmpikaAI shall not be liable for failures caused by events beyond reasonable control, including natural disasters, government actions, internet outages, cloud service failures, or payment network issues.",
  },
  {
    title: "20. Indemnity",
    content:
      "You agree to indemnify EmpikaAI from claims arising from your use or misuse of the Services, your uploaded content, or your violation of these Terms.",
  },
  {
    title: "21. Governing Law and Jurisdiction",
    content:
      "These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.",
  },
  {
    title: "22. Changes to These Terms",
    content:
      "We may revise these Terms from time to time. Continued use after revised Terms become effective constitutes acceptance.",
  },
];

export default function TermsPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Effective Date: [To be added]
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          These Terms and Conditions ("Terms") govern access to and use of EmpikaAI, including our website, APIs, resume screening tools, job workflow features, payment features, and related services (collectively, the "Services").
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          By accessing or using EmpikaAI, you agree to be bound by these Terms. If you do not agree, you must not use the Services.
        </Typography>

        {sections.map((s, i) => (
          <Box key={i} sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 3, mb: 1 }}>
              {s.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {s.content}
            </Typography>
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
