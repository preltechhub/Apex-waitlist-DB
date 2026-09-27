import type { VerificationEmailTemplateInput } from "../email.types.js";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildVerificationEmail(input: VerificationEmailTemplateInput) {
  const safeFirstName = escapeHtml(input.firstName);

  const safeVerificationUrl = escapeHtml(input.verificationUrl);

  const subject = "Verify your email — Project APEX";

  const text = `
Hi ${input.firstName},

Thanks for joining Project APEX early access.

Please verify your email address using the link below:

${input.verificationUrl}

This verification link expires in ${input.expiresInMinutes} minutes.

If you did not request APEX early access, you can safely ignore this email.

PR-EL TECH × Project APEX
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${subject}</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background: #f5f7fb;
    color: #111827;
    font-family: Arial, Helvetica, sans-serif;
  "
>
  <div
    style="
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    "
  >
    <div
      style="
        background: #ffffff;
        border-radius: 16px;
        padding: 40px;
      "
    >
      <div
        style="
          margin-bottom: 28px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
        "
      >
        PR-EL TECH × PROJECT APEX
      </div>

      <h1
        style="
          margin: 0 0 18px;
          font-size: 28px;
          line-height: 1.2;
        "
      >
        Verify your email
      </h1>

      <p
        style="
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.7;
        "
      >
        Hi ${safeFirstName},
      </p>

      <p
        style="
          margin: 0 0 18px;
          font-size: 16px;
          line-height: 1.7;
        "
      >
        Thanks for joining the Project APEX early-access
        list. Please verify your email address to complete
        your registration.
      </p>

      <div style="margin: 32px 0;">
        <a
          href="${safeVerificationUrl}"
          style="
            display: inline-block;
            padding: 14px 22px;
            border-radius: 10px;
            background: #0a2d82;
            color: #ffffff;
            text-decoration: none;
            font-size: 15px;
            font-weight: 700;
          "
        >
          Verify My Email
        </a>
      </div>

      <p
        style="
          margin: 0 0 14px;
          font-size: 14px;
          line-height: 1.7;
          color: #4b5563;
        "
      >
        This verification link expires in
        ${input.expiresInMinutes} minutes.
      </p>

      <p
        style="
          margin: 24px 0 0;
          font-size: 13px;
          line-height: 1.7;
          color: #6b7280;
        "
      >
        If you did not request APEX early access,
        you can safely ignore this email.
      </p>

      <hr
        style="
          margin: 32px 0;
          border: 0;
          border-top: 1px solid #e5e7eb;
        "
      />

      <p
        style="
          margin: 0;
          font-size: 12px;
          line-height: 1.6;
          color: #9ca3af;
        "
      >
        PR-EL TECH × Project APEX
      </p>
    </div>
  </div>
</body>
</html>
`.trim();

  return {
    subject,
    html,
    text,
  };
}
