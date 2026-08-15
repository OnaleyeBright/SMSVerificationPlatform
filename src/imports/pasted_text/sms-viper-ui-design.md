Design a complete, modern, production-quality SaaS web application UI for a virtual SMS and OTP number platform called SMS Viper.

PRODUCT OVERVIEW

SMS Viper allows users to obtain temporary virtual phone numbers for receiving SMS verification codes. Users can select a country and service, purchase an available number, wait for an incoming SMS, and view/copy the OTP directly from their dashboard.

The initial SMS provider is TigerSMS, but do not expose TigerSMS as the primary brand in the customer-facing interface. The architecture and UI should be provider-agnostic because additional providers may be added later.

The platform will eventually support:

One-time OTP number purchases
Temporary number rentals
Developer API access
Multiple SMS providers
Automated provider selection
BRAND IDENTITY

Brand name: SMS Viper

Tagline:
"Fast, reliable SMS verification numbers."

Brand personality:

Modern
Fast
Secure
Technical
Reliable
Professional
Bold

Create a minimal premium logo combining a subtle viper/snake head with a mobile phone or verification/check symbol. The logo must look professional and sophisticated, not cartoonish or aggressive.

Color Palette

Primary Blue: #2563EB
Dark Navy: #0F172A
Background: #F8FAFC
White: #FFFFFF
Success: #22C55E
Warning: #F59E0B
Error: #EF4444

Use blue as the main brand accent. Use dark navy for headings, navigation and important interface elements.

Do not overuse colors, gradients, illustrations or shadows.

DESIGN SYSTEM

Create a consistent design system across the entire application.

Use:

Inter, Geist, or another modern sans-serif font
Bold, clear headings
Medium-weight body text
Large readable numbers
10–14px rounded corners
Subtle borders
Minimal shadows
Spacious layouts
Professional data tables
Clean status badges
Simple line/bar charts
Minimal icons

The interface should feel comparable to a polished fintech/developer SaaS product.

Avoid:

Clutter
Excessive gradients
Excessive animations
Too many icons
Excessive text
Cartoon graphics
Gaming-style visuals
Generic dashboard templates
1. LANDING PAGE

Create a premium SaaS landing page.

Header

Logo:
SMS Viper

Navigation:

Home
How It Works
Countries
Pricing
FAQ

Right side:

Login
Get Started
Hero

Large headline:

SMS Verification. Fast. Simple. Reliable.

Supporting text:

"Get temporary virtual numbers and receive verification codes quickly from one secure platform."

Primary CTA:

Get a Number

Secondary CTA:

Explore Countries

On the right side, create a realistic product dashboard preview showing:

Selected country
Service
Available number
OTP received
Copy OTP button
Trust Section

Show:

Multiple Countries
Fast SMS Delivery
Secure Payments
Real-Time OTP
How It Works

Create four numbered steps:

01 — Choose a Country
02 — Select a Service
03 — Get Your Number
04 — Receive Your OTP

Supported Services

Create a clean grid of service cards for examples such as:

Google
Telegram
Discord
Facebook
Instagram
TikTok
Microsoft
X
WhatsApp

Use simple service icons.

Why SMS Viper

Create three or four feature cards:

Fast Delivery
Receive verification messages quickly.

Simple Pricing
Clear pricing before every purchase.

Reliable Numbers
Access numbers from multiple providers.

Secure Platform
Your transactions and account information are protected.

Final CTA

Headline:

Ready to receive your verification code?

Button:

Get Started

Footer

Include:

SMS Viper logo

Product:

Buy Number
Rentals
API
Pricing

Company:

About
Contact
FAQ

Legal:

Terms
Privacy
Acceptable Use
2. LOGIN PAGE

Create a minimal authentication page.

Logo at top.

Heading:

Welcome back

Subtext:

"Sign in to your SMS Viper account."

Fields:

Email
Password

Options:

Remember me
Forgot password?

Primary button:

Sign In

Below:

"Don't have an account? Create one"

3. REGISTRATION PAGE

Heading:

Create your SMS Viper account

Fields:

Full Name
Email
Password
Confirm Password

Checkbox:

"I agree to the Terms of Service and Privacy Policy."

Button:

Create Account

4. USER DASHBOARD

This is one of the most important screens.

Create a modern SaaS dashboard with a left sidebar.

Sidebar

SMS Viper logo

Navigation:

Dashboard
Buy Number
Active Orders
SMS Inbox
Wallet
Transactions
Rentals
API
Settings

Mark Rentals and API as "Coming Soon" if necessary.

Bottom:

User avatar
User name
Account menu
Logout

Top Navigation

Page title:

Dashboard

Include:

Search
Notifications
User profile

Statistics

Four cards:

Wallet Balance
$125.50

Active Orders
3

Completed Orders
128

Total Spent
$842.50

Quick Purchase

Create a prominent card titled:

Get a Verification Number

Fields:

Country
Service

Show:

Available numbers
Price

Button:

Get Number

Active Orders

Table:

Order ID
Service
Country
Number
Status
Time
Action

Example statuses:

Waiting for SMS
SMS Received
Completed
Expired

Recent Transactions

Show:

Deposit
Number Purchase
Refund

Use clear positive/negative financial indicators.

Activity Chart

Create a clean chart showing:

Orders over time
or
Spending over time

5. BUY NUMBER PAGE

This should be one of the strongest screens in the product.

Heading:

Get a Verification Number

Subheading:

"Choose a country and service to get started."

Create a simple four-step progress indicator:

1 Country → 2 Service → 3 Number → 4 Verification

Country Selection

Create a searchable country selector.

Each country should show:

Flag
Country name
Available numbers

Examples:

United States
United Kingdom
Canada
Nigeria
Germany
France
Australia
Netherlands

Service Selection

Create service cards:

Google
Telegram
Discord
Facebook
Instagram
TikTok
Microsoft
X
WhatsApp

Purchase Summary

Show:

Country
Service
Availability
Price
Wallet Balance

Primary button:

Get Number

Make the purchase button visually prominent.

6. PURCHASE CONFIRMATION MODAL

Create a confirmation modal before purchasing.

Title:

Confirm Number Purchase

Show:

Country
Service
Number price
Current wallet balance
Remaining balance

Primary button:

Confirm Purchase

Secondary:

Cancel

7. ACTIVE ORDER PAGE

Create a detailed order tracking interface.

Heading:

Order #VH-10248

Show:

Service
Country
Phone Number
Price
Order status
Time remaining

Number Card

Large display:

+1 202 555 0198

Button:

Copy Number

Waiting State

Show a live status:

Waiting for SMS...

Use a subtle animated/live indicator.

Text:

"Your verification message will appear here when received."

SMS Received State

When SMS arrives, transform the interface into:

SMS Received

Sender:

Telegram

Message:

"Your Telegram verification code is 482913."

Large OTP:

482913

Button:

Copy OTP

Actions:

Complete
Cancel

8. SMS INBOX

Create an inbox-style interface.

Left panel:

List of active/recent orders.

Each item shows:

Service icon
Phone number
Latest message
Time
Unread indicator

Right panel:

Selected conversation.

Show:

Service
Phone number
Sender
Messages
OTP

Actions:

Copy OTP
Refresh

Include search and filtering.

Make the interface feel similar to a modern email/chat inbox.

9. WALLET PAGE

Heading:

Wallet

Large balance card:

Available Balance

$125.50

Primary button:

Add Funds

Deposit Options

$5
$10
$25
$50
$100

Custom amount field.

Payment Methods

Create professional payment cards for:

Paystack
Flutterwave

Wallet Activity

Show:

Deposits
Purchases
Refunds

Include:

Date
Description
Amount
Status
Reference

10. TRANSACTIONS PAGE

Create a professional financial transaction table.

Heading:

Transactions

Filters:

All
Deposits
Purchases
Refunds

Search field.

Date filter.

Columns:

Date
Description
Type
Amount
Status
Reference

Use clean status badges.

11. RENTALS PAGE

This is a future feature.

Create a polished "Coming Soon" experience.

Heading:

Rent a Number

Subheading:

"Keep a dedicated virtual number for longer periods and receive SMS throughout your rental."

Create three pricing cards:

1 Day

Short-term rental

7 Days

Extended rental

30 Days

Long-term rental

Add:

Coming Soon

CTA:

Notify Me

12. API PAGE

Create a developer-focused interface.

Heading:

Build with SMS Viper

Subheading:

"Integrate virtual numbers and SMS verification directly into your application."

Show:

API Status
API Requests
API Usage
API Key

Create a masked API key field.

Buttons:

Copy API Key
Regenerate Key

Create a small code example:

POST /api/v1/numbers/purchase

Show syntax-highlighted code.

Include:

Documentation
API Usage
Webhooks

Mark advanced API functionality as Coming Soon if necessary.

13. SETTINGS PAGE

Create a clean settings interface.

Tabs:

Profile
Security
Notifications
API

Profile

Full Name
Email
Country

Security

Change Password
Two-Factor Authentication

Notifications

SMS received
Order updates
Wallet deposits
Promotional notifications

Use toggle switches.

14. ADMIN DASHBOARD

Create a completely separate professional admin interface.

Sidebar:

Overview
Users
Orders
Numbers
Countries
Services
Providers
Pricing
Payments
Transactions
SMS Activity
Analytics
Settings

Overview

Statistics:

Total Users
Active Users
Orders Today
Revenue
Provider Costs
Gross Profit
SMS Received

Analytics

Create charts for:

Orders over time
Revenue
Profit
Top countries
Top services
Provider performance

Use a clean enterprise SaaS design.

15. ADMIN USER MANAGEMENT

Create a professional table.

Columns:

User
Email
Wallet Balance
Orders
Status
Joined
Actions

Actions:

View
Suspend
Activate

Add search and filters.

16. ADMIN ORDER MANAGEMENT

Columns:

Order ID
User
Service
Country
Number
Provider
Provider Cost
Customer Price
Status
Created
Actions

Filters:

Provider
Country
Service
Status
Date

Include order details drawer/modal.

17. ADMIN PROVIDER MANAGEMENT

Create a provider management page.

Primary provider:

TigerSMS

Show:

Connection Status
API Status
Provider Balance
Available Numbers
Success Rate
Last Sync

Button:

Add Provider

Design the interface so additional providers such as 5SIM, SMSPool and others can be added later.

18. ADMIN PRICING

Create pricing management.

Table:

Country
Service
Provider
Provider Cost
Markup
Customer Price
Availability

Controls:

Fixed Markup
Percentage Markup
Country Markup
Service Markup

Add:

Save Pricing

19. ADMIN SMS ACTIVITY

Create a real-time monitoring screen.

Show:

Time
Order ID
User
Country
Service
Sender
OTP
Provider
Status

Include filters and search.

Use clear status indicators.

20. RESPONSIVE DESIGN

The entire UI must be responsive.

Desktop:
Full sidebar + spacious dashboard.

Tablet:
Collapsible sidebar.

Mobile:
Compact header + bottom navigation or collapsible menu.

Tables should transform into cards on mobile where appropriate.

The Buy Number, Active Order and SMS Inbox screens must be especially optimized for mobile.

21. UX PRINCIPLES

Prioritize:

Trust
Speed
Simplicity
Clear pricing
Clear order status
Easy number copying
Easy OTP copying
Real-time SMS visibility
Professional financial UX
Minimal friction

Every important action should have clear feedback.

Use:

Loading states
Empty states
Error states
Success states
Confirmation dialogs
Toast notifications
Skeleton loaders where appropriate

Create realistic sample data so the UI looks like a functioning product rather than an empty template.

The final design should feel like a premium fintech/developer SaaS platform, with SMS Viper's own distinctive identity rather than copying an existing product.

Generate all major screens while maintaining a consistent design system, spacing system, typography, component style and brand identity across the entire application.