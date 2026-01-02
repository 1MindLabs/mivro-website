export default function PrivacyPolicyComponent() {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative pb-10 pt-32 md:pb-16 md:pt-40">
          <div className="mx-auto max-w-3xl pb-12 text-left text-gray-800 md:pb-16">
            <h1
              className="mb-12 text-5xl font-medium text-primary-700"
              data-aos="fade-up"
            >
              Privacy Policy
            </h1>
            <div className="space-y-6 text-base leading-relaxed">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> December 25, 2025
              </p>

              <div>
                <p>
                  Mivro ("we," "our," or "us") is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you use our
                  mobile application, website, and services (collectively, the
                  "Services").
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  1. Information We Collect
                </h2>

                <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-800">
                  1.1 Information You Provide
                </h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Account Information:</strong> Email address,
                    password (encrypted), display name, profile photo, and phone
                    number.
                  </li>
                  <li>
                    <strong>Health Profile:</strong> Age, gender, height,
                    weight, BMI, allergies, dietary preferences, and medical
                    conditions.
                  </li>
                  <li>
                    <strong>User-Generated Content:</strong> Chat messages with
                    our AI assistants (Lumi, Savora, Swapr), uploaded images,
                    and files.
                  </li>
                </ul>

                <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-800">
                  1.2 Automatically Collected Information
                </h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Product Scan Data:</strong> Barcode numbers and
                    product information from scanned items.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Search queries, scan history,
                    favorite products, and interaction patterns.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> Device type, browser
                    information, IP address, and session data.
                  </li>
                </ul>

                <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-800">
                  1.3 Third-Party Data
                </h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Product Information:</strong> We retrieve product
                    data from OpenFoodFacts API based on barcode scans.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  2. How We Use Your Information
                </h2>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Service Provision:</strong> To analyze product
                    nutritional content, provide personalized health
                    recommendations, and generate AI-powered recipe suggestions.
                  </li>
                  <li>
                    <strong>Personalization:</strong> To tailor product
                    recommendations and health insights based on your health
                    profile and dietary preferences.
                  </li>
                  <li>
                    <strong>Account Management:</strong> To create and manage
                    your account, authenticate access, and enable profile
                    updates.
                  </li>
                  <li>
                    <strong>Service Improvement:</strong> To analyze usage
                    patterns, identify products not found in our database, and
                    enhance our AI models.
                  </li>
                  <li>
                    <strong>Communication:</strong> To send password reset
                    emails and account-related notifications.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  3. Data Storage and Security
                </h2>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Cloud Storage:</strong> Your data is stored using
                    Firebase Firestore, a secure cloud database service provided
                    by Google.
                  </li>
                  <li>
                    <strong>Local Storage:</strong> The mobile app stores
                    authentication status and session data locally on your
                    device using SharedPreferences.
                  </li>
                  <li>
                    <strong>Encryption:</strong> Passwords are hashed using
                    industry-standard encryption (Werkzeug security).
                  </li>
                  <li>
                    <strong>Access Control:</strong> API requests require
                    authentication via email and password headers for protected
                    routes.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  4. Third-Party Services
                </h2>
                <p className="mb-2">
                  We use the following third-party services:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Firebase (Google):</strong> Authentication and
                    database services.
                  </li>
                  <li>
                    <strong>Google Gemini AI:</strong> AI-powered nutrient
                    analysis, recipe generation, and product recommendations.
                  </li>
                  <li>
                    <strong>OpenFoodFacts:</strong> Product information database
                    (public API).
                  </li>
                </ul>
                <p className="mt-2">
                  These services may collect information as described in their
                  respective privacy policies.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  5. Data Sharing and Disclosure
                </h2>
                <p className="mb-2">
                  We do not sell your personal information. We may share data
                  only in the following circumstances:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>AI Processing:</strong> Your health profile and
                    product data are sent to Google Gemini AI for analysis and
                    recommendations.
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> When required by law or
                    to protect our rights and safety.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> With trusted partners
                    who assist in operating our Services (Firebase, Google
                    Cloud).
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  6. Your Rights and Choices
                </h2>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Access and Update:</strong> You can view and update
                    your profile information through the app settings.
                  </li>
                  <li>
                    <strong>Delete Data:</strong> You can delete your scan
                    history, favorite products, chat history, and flagged
                    products through the app.
                  </li>
                  <li>
                    <strong>Account Deletion:</strong> You can permanently
                    delete your account, which will remove all associated data
                    from our database.
                  </li>
                  <li>
                    <strong>Email Updates:</strong> You can update your email
                    address through account settings.
                  </li>
                  <li>
                    <strong>Logout:</strong> You can log out at any time to end
                    your session.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  7. Data Retention
                </h2>
                <p>
                  We retain your information for as long as your account is
                  active or as needed to provide Services. When you delete your
                  account, we permanently remove all your data from our
                  database, including scan history, chat history, health
                  profile, favorite products, and all personal information. No
                  data is retained after account deletion.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  8. Children's Privacy
                </h2>
                <p>
                  Our Services are not intended for users under 13 years of age.
                  We do not knowingly collect personal information from children
                  under 13. If you believe we have collected such information,
                  please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  9. International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place through our use of Firebase and Google
                  Cloud services, which comply with international data
                  protection standards.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  10. Cookies and Tracking
                </h2>
                <p>
                  Our website uses cookies and similar technologies for
                  authentication, session management, and analytics. The mobile
                  app uses local storage for session persistence. You can
                  control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  11. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy periodically. We will notify
                  you of significant changes by updating the "Last Updated"
                  date. Continued use of our Services after changes constitutes
                  acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  12. Open Source
                </h2>
                <p>
                  Mivro is an open-source project. Our source code is publicly
                  available on GitHub. While the code is open, user data remains
                  private and protected as described in this policy.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                  13. Contact Us
                </h2>
                <p>
                  If you have questions or concerns about this Privacy Policy or
                  our data practices, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@mivro.org
                  <br />
                  <strong>GitHub:</strong>{" "}
                  <a
                    href="https://github.com/1MindLabs"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/1MindLabs
                  </a>
                </p>
              </div>

              <div className="border-t border-gray-300 pt-6">
                <p className="text-sm text-gray-600">
                  By using Mivro, you acknowledge that you have read and
                  understood this Privacy Policy and agree to its terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
