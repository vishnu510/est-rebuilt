/**
 * EST Brand Services - Admin Dashboard Application Script
 * Full CRUD, LocalStorage Sync, Modal System, Dynamic View Routing
 */

(function () {
  'use strict';

  // =========================================================================
  // SEED / INITIAL DATABASE
  // =========================================================================
  const DEFAULT_DB = {
    clients: [
      {
        id: "c1",
        name: "ACPL Systems",
        category: "Technology",
        partnershipYear: "2018",
        logoUrl: "storage/clients/all-logos/01JZT7BZXA4VA77AJE5S3FGNK9.jpg",
        status: "Active",
        projectsCount: 15
      },
      {
        id: "c2",
        name: "Adobe",
        category: "Technology",
        partnershipYear: "2019",
        logoUrl: "storage/clients/all-logos/01JZT7DKZPCEVYQ49KXZ72W0DN.jpg",
        status: "Active",
        projectsCount: 28
      },
      {
        id: "c3",
        name: "AMD",
        category: "Technology",
        partnershipYear: "2020",
        logoUrl: "storage/clients/all-logos/01JZT7E9X8WE3FAG84PMENQYW7.jpg",
        status: "Active",
        projectsCount: 22
      },
      {
        id: "c4",
        name: "AVEDA",
        category: "Consumer & Retail",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT7FXEK89XNP9QHDRM9HDQA.jpg",
        status: "Active",
        projectsCount: 14
      },
      {
        id: "c5",
        name: "BenQ",
        category: "Hardware & Print",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT7GHG1FG4GHCAY441MGQRE.jpg",
        status: "Active",
        projectsCount: 19
      },
      {
        id: "c6",
        name: "Brigade Group",
        category: "Real Estate & Infrastructure",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT7H8NRXQ34NZ7Y9NSCAM8T.jpg",
        status: "Active",
        projectsCount: 12
      },
      {
        id: "c7",
        name: "Builder.ai",
        category: "Technology",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT7J7WDT0YFT6W8FJ9E0Z6V.jpg",
        status: "Active",
        projectsCount: 16
      },
      {
        id: "c8",
        name: "CAST Software",
        category: "Enterprise IT",
        partnershipYear: "2020",
        logoUrl: "storage/clients/all-logos/01JZT7K0CH1NW2F3CKBNRPW48D.jpg",
        status: "Active",
        projectsCount: 11
      },
      {
        id: "c9",
        name: "Croma",
        category: "Consumer & Retail",
        partnershipYear: "2018",
        logoUrl: "storage/clients/all-logos/01JZT7KN0BE99VDQ32KKP195T0.jpg",
        status: "Active",
        projectsCount: 24
      },
      {
        id: "c10",
        name: "Elekore",
        category: "Energy & Infrastructure",
        partnershipYear: "2019",
        logoUrl: "storage/clients/all-logos/01JZT7MBTFNKPYNB20TZKSPF1X.jpg",
        status: "Active",
        projectsCount: 9
      },
      {
        id: "c11",
        name: "Embee Software",
        category: "Enterprise IT",
        partnershipYear: "2020",
        logoUrl: "storage/clients/all-logos/01JZT7NEVMSY3JK82A65X5BMZF.jpg",
        status: "Active",
        projectsCount: 17
      },
      {
        id: "c12",
        name: "Eros Group",
        category: "Real Estate & Infrastructure",
        partnershipYear: "2019",
        logoUrl: "storage/clients/all-logos/01JZT7P6KV6JCS3E7RBGDCRGPW.jpg",
        status: "Active",
        projectsCount: 13
      },
      {
        id: "c13",
        name: "Softline",
        category: "Enterprise IT",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT7RWJABEVAZDF71CR2NDRG.jpg",
        status: "Active",
        projectsCount: 15
      },
      {
        id: "c14",
        name: "GAP",
        category: "Consumer & Retail",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT7SK5P2PMBT0KFRHYKK637.jpg",
        status: "Active",
        projectsCount: 18
      },
      {
        id: "c15",
        name: "Harvest Gold",
        category: "Consumer & Retail",
        partnershipYear: "2020",
        logoUrl: "storage/clients/all-logos/01JZT7T80Y7H2JKCT170BH1AH9.jpg",
        status: "Active",
        projectsCount: 21
      },
      {
        id: "c16",
        name: "Moët Hennessy",
        category: "Consumer & Retail",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT7VQWBT95S84FXR88CTGFE.jpg",
        status: "Active",
        projectsCount: 14
      },
      {
        id: "c17",
        name: "Kingfisher",
        category: "Consumer & Retail",
        partnershipYear: "2018",
        logoUrl: "storage/clients/all-logos/01JZT7WF76VXZHB4GG7P45V92M.jpg",
        status: "Active",
        projectsCount: 30
      },
      {
        id: "c18",
        name: "Lighthouse Canton",
        category: "BFSI",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT7YSVGN5FDXAH4GJ79FK3Z.jpg",
        status: "Active",
        projectsCount: 8
      },
      {
        id: "c19",
        name: "Mother Dairy",
        category: "Consumer & Retail",
        partnershipYear: "2019",
        logoUrl: "storage/clients/all-logos/01JZT7ZNEHHZWXDKF4EKQ5RZ9C.jpg",
        status: "Active",
        projectsCount: 26
      },
      {
        id: "c20",
        name: "Neovantage Innovation Parks",
        category: "Real Estate & Infrastructure",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT80FCSTB105P5C67VAGXJW.jpg",
        status: "Active",
        projectsCount: 10
      },
      {
        id: "c21",
        name: "Noventiq",
        category: "Enterprise IT",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT81GDVN0MCC8EA7CZEKTQ4.jpg",
        status: "Active",
        projectsCount: 16
      },
      {
        id: "c22",
        name: "Puravankara",
        category: "Real Estate & Infrastructure",
        partnershipYear: "2020",
        logoUrl: "storage/clients/all-logos/01JZT827C4AVD8Y2AYD2BAXHFC.jpg",
        status: "Active",
        projectsCount: 15
      },
      {
        id: "c23",
        name: "Quess Corp",
        category: "Enterprise IT",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT82YYDAQZB9Y6CDHQVC0DB.jpg",
        status: "Active",
        projectsCount: 18
      },
      {
        id: "c24",
        name: "Savex Technologies",
        category: "Technology",
        partnershipYear: "2019",
        logoUrl: "storage/clients/all-logos/01JZT83NV8Z8P2S3FEN4N3J56H.jpg",
        status: "Active",
        projectsCount: 25
      },
      {
        id: "c25",
        name: "Sephora",
        category: "Consumer & Retail",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT85CC1MZWCB0CNKGE7QKHT.jpg",
        status: "Active",
        projectsCount: 12
      },
      {
        id: "c26",
        name: "Shalimar Paints",
        category: "Consumer & Retail",
        partnershipYear: "2018",
        logoUrl: "storage/clients/all-logos/01JZT865DQ6G2WK9FJH8E16RM7.jpg",
        status: "Active",
        projectsCount: 14
      },
      {
        id: "c27",
        name: "Siemens",
        category: "Technology",
        partnershipYear: "2019",
        logoUrl: "storage/clients/all-logos/01JZT86X7SDV30D6NGF4G42S4G.jpg",
        status: "Active",
        projectsCount: 20
      },
      {
        id: "c28",
        name: "Taylor & Francis Group",
        category: "Enterprise IT",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT87JQVNA4D8MYQCKG8RT2V.jpg",
        status: "Active",
        projectsCount: 11
      },
      {
        id: "c29",
        name: "Tech Data",
        category: "Technology",
        partnershipYear: "2020",
        logoUrl: "storage/clients/all-logos/01JZT88F4AED61YS8PCWGDY9J6.jpg",
        status: "Active",
        projectsCount: 22
      },
      {
        id: "c30",
        name: "Umbrella Infocare",
        category: "Enterprise IT",
        partnershipYear: "2022",
        logoUrl: "storage/clients/all-logos/01JZT89479VPRSW9BFHX9DJETC.jpg",
        status: "Active",
        projectsCount: 13
      },
      {
        id: "c31",
        name: "Varchas Spirits",
        category: "Consumer & Retail",
        partnershipYear: "2023",
        logoUrl: "storage/clients/all-logos/01JZT89SQHE0RJT87RK952PTD7.jpg",
        status: "Active",
        projectsCount: 9
      },
      {
        id: "c32",
        name: "Western Digital",
        category: "Technology",
        partnershipYear: "2021",
        logoUrl: "storage/clients/all-logos/01JZT8ADQ14TWK41XRBWP0KXTR.jpg",
        status: "Active",
        projectsCount: 27
      }
    ],

    services: [
      { id: 's1', title: 'Experiential Marketing', icon: 'bi-stars', slug: 'experiential-marketing.html', category: 'Experiential', status: 'Active', desc: 'Immersive tactile brand activations and pop-ups that create lasting enterprise connections.' },
      { id: 's2', title: 'Marketing Consulting', icon: 'bi-compass', slug: 'marketing-consulting.html', category: 'Strategy', status: 'Active', desc: 'Full-funnel GTM architecture, market penetration models, and ICP demand planning.' },
      { id: 's3', title: 'BTL Brand Activation', icon: 'bi-megaphone', slug: 'btl-activation.html', category: 'Experiential', status: 'Active', desc: 'Pan-India on-ground roadshows, corporate park activations, and direct engagement.' },
      { id: 's4', title: 'Corporate Travel & MICE', icon: 'bi-airplane', slug: 'corporate-travel.html', category: 'Corporate', status: 'Active', desc: 'End-to-end offsites, global leadership summits, incentives, and luxury corporate itineraries.' },
      { id: 's5', title: 'Exhibition & Pavilions', icon: 'bi-building-gear', slug: 'exhibition.html', category: 'Exhibition', status: 'Active', desc: 'Award-winning bespoke 3D stalls, custom fabrication, and interactive trade booths.' },
      { id: 's6', title: 'Demand Generation & ABM', icon: 'bi-funnel', slug: 'demand-generation.html', category: 'Growth', status: 'Active', desc: 'High-intent B2B lead generation, C-level executive roundtables, and pipeline acceleration.' },
      { id: 's7', title: 'Digital Marketing', icon: 'bi-graph-up-arrow', slug: 'digital-marketing.html', category: 'Digital', status: 'Active', desc: 'Performance marketing, LinkedIn thought leadership, content syndication, and SEO.' },
      { id: 's8', title: 'Retail & Brand Merchandising', icon: 'bi-shop', slug: 'retail-branding.html', category: 'Branding', status: 'Active', desc: 'Store-in-store fixtures, POSM visibility, retail rollouts, and experiential zones.' },
      { id: 's9', title: 'Event Management', icon: 'bi-calendar2-event', slug: 'event-management.html', category: 'Events', status: 'Active', desc: 'Turnkey technical production, stage design, AV orchestration, and delegate workflows.' }
    ],

    blogPosts: [
      {
        id: 'b1',
        title: 'The Evolution of B2B Experiential Marketing in India 2026',
        author: 'Satya Narayan',
        authorRole: 'Managing Director & Strategic Consultant',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        category: 'Industry Insights',
        date: '2026-03-10',
        readTime: '5 min read',
        views: '2,420',
        status: 'Published',
        isFeatured: true,
        coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
        excerpt: 'How enterprise brands are moving from passive displays to tactile, data-driven activations that accelerate pipeline conversion.',
        tags: ['Experiential Marketing', 'B2B Strategy', 'Demand Gen', 'India 2026'],
        content: `<h2>The Paradigm Shift in Enterprise Engagement</h2>
<p>In 2026, the B2B marketing landscape in India has reached an inflection point. Decision-makers at Fortune 500 enterprises, hyper-scale GCCs, and high-growth scale-ups are no longer swayed by generic whitepapers or static webinar decks. They demand immersive, tactile experiences that contextualize enterprise value in real time.</p>

<p>Experiential marketing is no longer viewed as a fringe line item reserved for annual brand vanity; it is now the cornerstone of high-intent account-based revenue operations.</p>

<div class="article-callout">
  <i class="bi bi-lightbulb-fill"></i>
  <div>
    <strong>Key Executive Takeaway:</strong> High-intent experiential intercepts reduce the average enterprise sales cycle by 38% compared to purely digital inbound funnels.
  </div>
</div>

<h2>1. From Passive Booths to Multi-Sensory Demo Hubs</h2>
<p>Modern enterprise delegates want hands-on validation. At recent technology summits in Gurgaon and Bengaluru, we observed a 4x increase in delegate dwell time at booths equipped with interactive AR topology maps and bespoke hands-on workflow simulators over conventional backdrop walls.</p>

<blockquote>
  "The goal is not just to attract footfall, but to facilitate structured C-suite conversations where product value is experienced within 90 seconds."
</blockquote>

<h2>2. Real-Time Lead Scoring & RFID Badge Analytics</h2>
<p>Gone are the days of collecting physical business cards that gather dust in post-event spreadsheets. EST's integrated badge analytics and telemetry kiosks capture real-time dwell metrics, session attendance, and interactive touchpoints, streaming qualified intent data straight into client CRMs (Salesforce & HubSpot) within 15 minutes of delegate interactions.</p>

<h2>3. The Pan-India Multi-Hub Advantage</h2>
<p>Enterprise roadshows are no longer confined to Delhi and Mumbai. Tier-1 and Tier-2 innovation hubs—including Hyderabad, Bengaluru, Pune, Ahmedabad, and Chennai—are commanding substantial regional budgets. Orchestrating synchronized brand activations across 6+ cities concurrently requires unified fabrication standards and flawless on-ground staging.</p>

<h2>Looking Ahead: The 2026 Strategic Playbook</h2>
<p>As marketing leaders prepare for upcoming fiscal cycles, investing in experiential demand engines offers unmatched competitive moat. By blending architectural fabrication with measurable digital tracking, brands solidify their category leadership while driving direct ROI.</p>`
      },
      {
        id: 'b2',
        title: 'Measuring High-Intent ROI at Pan-India Corporate Roadshows',
        author: 'EST Strategy Team',
        authorRole: 'B2B Demand & Analytics Practice',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        category: 'Strategy',
        date: '2026-02-28',
        readTime: '6 min read',
        views: '1,890',
        status: 'Published',
        isFeatured: false,
        coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
        excerpt: 'Frameworks for connecting delegate dwell times and experiential touchpoints directly to CRM revenue pipelines.',
        tags: ['ROI Attribution', 'Roadshows', 'B2B Marketing', 'CRM Pipeline'],
        content: `<h2>The ROI Attribution Challenge in B2B Events</h2>
<p>One of the most persistent questions facing CMOs and VP-level marketing directors is: <em>"How do we prove concrete revenue return on our corporate roadshows?"</em></p>

<p>Historically, event metrics were limited to registration counts and superficial attendee satisfaction scores. In this playbook, EST details the exact multi-touch attribution model we deploy for enterprise clients across India.</p>

<div class="article-callout">
  <i class="bi bi-graph-up-arrow"></i>
  <div>
    <strong>The Core Equation:</strong> Experiential ROI = (Pipeline Value Influenced + Closed-Won Direct Revenue) / Total Turnkey Event Investment.
  </div>
</div>

<h2>Core Metrics Every Event Marketer Must Track</h2>
<ul>
  <li><strong>High-Intent Intercept Ratio (HIIR):</strong> Percentage of delegates meeting ICP criteria who completed a 5+ minute guided demo.</li>
  <li><strong>Cost Per Qualified Executive Lead (CPQL):</strong> True fully-loaded cost (venue + fabrication + staging + media) divided by validated C-suite contacts.</li>
  <li><strong>First 14-Day Opportunity Velocity:</strong> Rate at which on-ground meetings convert to formal discovery calls or POC requests.</li>
</ul>

<h2>Connecting On-Ground Engagement to CRM Records</h2>
<p>By mapping NFC badge tap points and custom QR survey workflows directly to HubSpot or Salesforce, your sales development team can trigger automated, highly contextual follow-ups within 24 hours while interest is at its peak.</p>`
      },
      {
        id: 'b3',
        title: 'How AI & Interactive AR Stalls Transform Tech Exhibitions',
        author: 'Creative Tech Lab',
        authorRole: 'Experiential Tech & 3D Fabrication',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        category: 'Exhibitions',
        date: '2026-02-14',
        readTime: '4 min read',
        views: '3,150',
        status: 'Published',
        isFeatured: false,
        coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80',
        excerpt: 'Why traditional booths are losing out to spatial computing, interactive displays, and real-time badge analytics.',
        tags: ['AI Tech', 'AR Experience', 'Trade Shows', 'Stall Fabrication'],
        content: `<h2>The Death of the Static Exhibition Stall</h2>
<p>Trade show floors are sensory battlegrounds. With hundreds of competing exhibitors clamoring for attention, the standard 3x3 shell scheme with printed flex banners is virtually invisible to high-value delegates.</p>

<p>Leading enterprise brands are replacing static print with intelligent interactive environments that adapt dynamically to visitor profiles.</p>

<h2>Spatial Computing and Real-Time Holographic Demonstrations</h2>
<p>At recent industry pavilions, EST deployed interactive transparent OLED touchscreens combined with spatial sound cones. Delegates could virtually disassemble a complex enterprise cloud server rack or industrial machine using intuitive gesture controls.</p>

<blockquote>
  "When delegates physically interact with complex technical architectures, knowledge retention increases by 74% compared to verbal sales pitches."
</blockquote>

<h2>Key Takeaways for Your Next Trade Booth Build</h2>
<ul>
  <li>Incorporate interactive demo pods with self-guided journey flows.</li>
  <li>Use ambient curved LED surfaces for striking long-range perimeter visibility.</li>
  <li>Deploy automated gamified quizzes that qualify buyer persona before handing off to on-booth sales reps.</li>
</ul>`
      },
      {
        id: 'b4',
        title: 'Account-Based Experiential Marketing: Engaging the C-Suite',
        author: 'Satya Narayan',
        authorRole: 'Managing Director & Strategic Consultant',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        category: 'ABM & Growth',
        date: '2026-01-20',
        readTime: '7 min read',
        views: '1,420',
        status: 'Published',
        isFeatured: false,
        coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80',
        excerpt: 'Bespoke closed-door masterclasses and executive dinners that convert key target enterprise accounts.',
        tags: ['ABM', 'C-Suite', 'Executive Events', 'B2B Growth'],
        content: `<h2>Why C-Suite Executives Ignore Generic Invitations</h2>
<p>Enterprise CIOs, CISOs, and CMOs receive dozens of webinar invites and mass conference solicitations every week. To cut through the noise, enterprise growth teams need high-touch, ultra-exclusive experiential engagements tailored to target account lists (TAL).</p>

<h2>The Anatomy of a High-Conversion Executive Roundtable</h2>
<p>EST has perfected the executive dinner format across luxury venues in Gurgaon, Mumbai, and Bengaluru. Here are the core pillars:</p>

<ol>
  <li><strong>Peer-to-Peer Moderation:</strong> Position the session around unvarnished industry problem-solving rather than vendor product pitches.</li>
  <li><strong>Strict Tier-1 Exclusivity:</strong> Capping attendance at 12-15 verified C-level executives guarantees meaningful conversation.</li>
  <li><strong>Curated Sensory Environments:</strong> Private dining rooms with bespoke customized menus, ambient acoustic design, and personalized welcome kits.</li>
</ol>

<div class="article-callout">
  <i class="bi bi-shield-check"></i>
  <div>
    <strong>Strategic Result:</strong> 65% of target enterprise accounts engaged in bespoke roundtables initiate formal RFPs within 60 days of the dinner.
  </div>
</div>`
      },
      {
        id: 'b5',
        title: 'Sustainable Corporate Offsites & Event Logistics: The 2026 Playbook',
        author: 'EST Operations Team',
        authorRole: 'Turnkey Operations & Logistics',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        category: 'Corporate Travel',
        date: '2026-01-08',
        readTime: '5 min read',
        views: '2,110',
        status: 'Published',
        isFeatured: false,
        coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=80',
        excerpt: 'How leading MNCs in India are orchestrating zero-waste executive summits and green fabrication builds.',
        tags: ['Corporate Travel', 'Sustainability', 'MICE India', 'Offsites'],
        content: `<h2>The Rise of ESG in Enterprise Corporate Gatherings</h2>
<p>Environmental, Social, and Governance (ESG) mandates are transforming corporate retreats, partner conclaves, and annual offsites across India. Global enterprises now require comprehensive sustainability audits for their off-site gatherings.</p>

<h2>Zero-Waste Fabrication & Eco-Friendly Materials</h2>
<p>At our in-house fabrication hubs in Gurgaon and Mumbai, EST utilizes modular aluminum frameworks, water-based non-toxic inks, recycled fabric prints, and biodegradable timber staging elements that achieve up to 90% post-event reusability.</p>

<h2>Curating Responsible Luxury Itineraries</h2>
<p>From heritage eco-resorts in Goa and Kerala to solar-powered convention centers, corporate travel logistics can be both impeccably luxurious and environmentally conscious.</p>`
      }
    ],

    brands: [
      { id: 'br1', name: 'Samsung Galaxy Enterprise', tier: 'Strategic Partner', campaigns: 18, rep: 'Arun V.', status: 'Active' },
      { id: 'br2', name: 'HP Indigo & Workstations', tier: 'Enterprise Tier', campaigns: 12, rep: 'Megha S.', status: 'Active' },
      { id: 'br3', name: 'Cisco Catalyst World', tier: 'Platinum Tier', campaigns: 24, rep: 'Naveen K.', status: 'Active' },
      { id: 'br4', name: 'Dell Latitude Experience', tier: 'Enterprise Tier', campaigns: 10, rep: 'Vikrant D.', status: 'Active' },
      { id: 'br5', name: 'Intel AI Everywhere', tier: 'Innovation Partner', campaigns: 14, rep: 'Ritu G.', status: 'Active' }
    ],

    eventPages: [
      { id: 'ep1', title: 'EST Tech Connect India Summit 2026', slug: '/events/tech-connect-2026', city: 'Gurgaon', date: 'April 18, 2026', registrations: 340, status: 'Live' },
      { id: 'ep2', title: 'Pan-India BFSI Innovation Roadshow', slug: '/events/bfsi-roadshow', city: 'Mumbai / BLR / HYD', date: 'May 04-12, 2026', registrations: 520, status: 'Live' },
      { id: 'ep3', title: 'Global Retail Tech & Logistics Showcase', slug: '/events/retail-tech-mumbai', city: 'Mumbai', date: 'June 20, 2026', registrations: 180, status: 'Draft' }
    ],

    eventRegistrations: [
      { id: 'reg1', name: 'Rahul Sharma', email: 'rahul.s@hdfcbank.com', company: 'HDFC Bank', event: 'Pan-India BFSI Innovation Roadshow', ticketType: 'VIP Pass', checkIn: 'Confirmed', regDate: '2026-03-12' },
      { id: 'reg2', name: 'Ananya Patel', email: 'ananya.p@infosys.com', company: 'Infosys', event: 'EST Tech Connect India Summit 2026', ticketType: 'Executive', checkIn: 'Pending', regDate: '2026-03-11' },
      { id: 'reg3', name: 'Vikram Malhotra', email: 'v.malhotra@tatadigital.com', company: 'Tata Digital', event: 'EST Tech Connect India Summit 2026', ticketType: 'Speaker VIP', checkIn: 'Confirmed', regDate: '2026-03-10' },
      { id: 'reg4', name: 'Sneha Reddy', email: 'sneha.reddy@swiggy.in', company: 'Swiggy', event: 'Pan-India BFSI Innovation Roadshow', ticketType: 'Delegate', checkIn: 'Confirmed', regDate: '2026-03-09' },
      { id: 'reg5', name: 'Rohan Kapoor', email: 'rohan.k@airtel.in', company: 'Airtel Enterprise', event: 'Global Retail Tech & Logistics Showcase', ticketType: 'Delegate', checkIn: 'Pending', regDate: '2026-03-08' }
    ],

    events: [
      { id: 'ev1', title: 'EST Tech Connect India Summit', city: 'Gurgaon', venue: 'DLF CyberHub & Oberoi', date: '2026-04-18', delegates: '500+ C-Suite', status: 'Upcoming' },
      { id: 'ev2', title: 'Pan-India BFSI Innovation Roadshow', city: 'Mumbai, Bengaluru, Delhi', venue: 'Jio World Convention & Grand Hyatt', date: '2026-05-04', delegates: '1200+ Enterprise', status: 'Upcoming' },
      { id: 'ev3', title: 'Annual Corporate Partner Conclave', city: 'Goa', venue: 'Grand Hyatt Bambolim', date: '2026-02-15', delegates: '280 Partners', status: 'Completed' },
      { id: 'ev4', title: 'FinTech & AI Acceleration Forum', city: 'Hyderabad', venue: 'HICC Novotel', date: '2026-01-22', delegates: '450 Leaders', status: 'Completed' }
    ],

    galleries: [
      { id: 'g1', title: 'Cisco Connect Mega Showcase', event: 'Tech Summit 2026', photosCount: 38, coverUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80', status: 'Published' },
      { id: 'g2', title: 'Intel Innovation Pavilion & AR Experience', event: 'Trade Expo', photosCount: 24, coverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80', status: 'Published' },
      { id: 'g3', title: 'Dell Technologies Partner Summit', event: 'Corporate Offsite', photosCount: 42, coverUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80', status: 'Published' },
      { id: 'g4', title: 'HP Multi-City Roadshow Activations', event: 'BTL Campaign', photosCount: 56, coverUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop&q=80', status: 'Published' }
    ],

    videoGalleries: [
      { id: 'v1', title: 'EST Brand Services - Experiential Showreel 2026', duration: '2m 45s', views: '8,400', client: 'EST Agency', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80' },
      { id: 'v2', title: 'Pan-India Corporate Activation Recap - 8 Cities', duration: '3m 12s', views: '4,200', client: 'Cisco & HP', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80' },
      { id: 'v3', title: 'Exhibition Pavilion 3D Walkthrough & Build', duration: '1m 50s', views: '3,800', client: 'Intel India', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80' }
    ],

    clientFeedbacks: [
      {
            "id": "cf1",
            "clientName": "Himanshu Baruah",
            "company": "Light House Canton",
            "role": "Executive Director & Group CMO",
            "rating": 5,
            "quote": "Words are less do describe your commitment Satya , Congratulations to EST , God Bless you all and give all the success.",
            "status": "Approved",
            "date": "2026-03-01"
      },
      {
            "id": "cf2",
            "clientName": "Nupur Gupta",
            "company": "Noventiq India",
            "role": "Marketing Manager",
            "rating": 5,
            "quote": "Thanks for all your support from past 10 years, your support was instrumental in successful execution of all the events and all locations, Specially Satya & Anu – you have been proactive and always available whenever we had any query. We Thank you Team EST and appreciate all your contribution.",
            "status": "Approved",
            "date": "2026-02-28"
      },
      {
            "id": "cf3",
            "clientName": "Aparna Narayanan",
            "company": "Umbrella Info care",
            "role": "Head Marketing",
            "rating": 5,
            "quote": "Satya - The Rock Star you are who puts heart and soul in everything you do and ensures we as a client sit back and relax. Anu - The lady boss behind Team Est success, wonderful job. Wish you great success Satya/Anu and Team EST.",
            "status": "Approved",
            "date": "2026-02-25"
      },
      {
            "id": "cf4",
            "clientName": "Atul Ahuja",
            "company": "MEA, APAC Region",
            "role": "Global South Leader",
            "rating": 5,
            "quote": "Satya, your commitment to work and delivering results is truly amazing. Big congratulations to you and your team on this great success! It’s been a pleasure working with EST as our agency—you’ve taken so much off our shoulders and made the entire process stress-free. Grateful for the partnership!",
            "status": "Approved",
            "date": "2026-02-20"
      },
      {
            "id": "cf5",
            "clientName": "Madhusudan Kohli",
            "company": "ACPL SYSTEMS PVT LTD",
            "role": "Chief Business Officer",
            "rating": 5,
            "quote": "Our new collaboration with EST to handle all our marketing support has been a great experience so far. Satya, I must say—you’re amazing at understanding client briefs, offering the right solutions, and handling last-minute requirements with ease. You and your team have done a wonderful job. Wishing Team EST continued success ahead!",
            "status": "Approved",
            "date": "2026-02-15"
      },
      {
            "id": "cf6",
            "clientName": "Neha Kohli",
            "company": "BenQ",
            "role": "HR Director",
            "rating": 5,
            "quote": "Satya is someone who’s incredibly accommodating, with great leadership qualities and a deep understanding of our business needs. It’s been 6 years since we started our collaboration with Team EST, and I can confidently say they’ve consistently done a wonderful job. Wishing Satya and the entire EST team continued success ahead!",
            "status": "Approved",
            "date": "2026-02-10"
      },
      {
            "id": "cf7",
            "clientName": "Vinod Nair",
            "company": "Noventiq India",
            "role": "President",
            "rating": 5,
            "quote": "Not every event agency truly understands the client and their business—but Satya, you’ve always stood out. As a leader, you take the time to understand our needs, our goals, and how we work. That makes all the difference. Every single member of my India team has loved working with you. Congratulations to you and Team EST on everything you’ve achieved! We've been associated with you for 10 wonderful years—and here’s to many more.",
            "status": "Approved",
            "date": "2026-02-05"
      }
    ],

    employeeFeedbacks: [
      {
            "id": "ef1",
            "employeeName": "Samarth Singh",
            "department": "Client Servicing",
            "sentiment": "Positive",
            "message": "Working with EST Brand Services is always a wonderful experience. Under the guidance of Satya Sir, it’s not only a great learning opportunity but also a lot of fun.",
            "date": "2026-03-10"
      },
      {
            "id": "ef2",
            "employeeName": "Karmina Riba",
            "department": "Client Servicing",
            "sentiment": "Positive",
            "message": "Joining EST as a fresher, I had no idea what the events industry was all about. But working under Satya Sir made all the difference. He has a unique way of making work feel fun while teaching us to treat it like our own baby—with care, patience, and responsibility.",
            "date": "2026-03-08"
      },
      {
            "id": "ef3",
            "employeeName": "Vanshika Nama",
            "department": "Client Servicing",
            "sentiment": "Positive",
            "message": "Satya Sir, incredible human being, amazing personality I am glad and blessed worked under him.",
            "date": "2026-03-06"
      },
      {
            "id": "ef4",
            "employeeName": "Diana Anthony",
            "department": "Account Management",
            "sentiment": "Positive",
            "message": "Before joining EST, I knew Satya as a former colleague. When I was job hunting and we had a conversation, I didn’t have to think twice—I just knew I wanted to work with him again. I’m really proud of the years I spent at EST.",
            "date": "2026-03-04"
      },
      {
            "id": "ef5",
            "employeeName": "Vinod Joshi",
            "department": "Creative & 2D Services",
            "sentiment": "Positive",
            "message": "Satya and me we have started career together, I knew him when he was working in junior operation team, I always knew he will do wonder and he proved me right. I always love to work with him and now I am happy to be part of EST with wholehearted commitment to grow.",
            "date": "2026-03-02"
      },
      {
            "id": "ef6",
            "employeeName": "Asad Khan",
            "department": "Operations",
            "sentiment": "Positive",
            "message": "When I joined EST Brand I have no idea what event is , under the leadership of Satya Sir I am now enjoying my work , Thanks Sir for making me part of this team and making me grow.",
            "date": "2026-02-28"
      },
      {
            "id": "ef7",
            "employeeName": "Rajveer Grover",
            "department": "Client Servicing",
            "sentiment": "Positive",
            "message": "It’s always a pleasure working under Satya Sir. He consistently empowers me with the freedom to take ownership of my work and encourages continuous learning for my personal and professional growth.",
            "date": "2026-02-24"
      },
      {
            "id": "ef8",
            "employeeName": "Asmit Singh",
            "department": "MICE Operations",
            "sentiment": "Positive",
            "message": "A friend in need is a friend indeed — that’s exactly how it feels working with Satya. His constant support and guidance make every challenge easier. Proud to be part of the team!",
            "date": "2026-02-20"
      },
      {
            "id": "ef9",
            "employeeName": "Anu Shekhawat",
            "department": "Finance & Governance",
            "sentiment": "Positive",
            "message": "It wasn’t easy to leave a well-established job at Genpact, but life is all about taking bold decisions. Becoming part of EST Brands and supporting Satya as both a life and business partner has been a rewarding journey.",
            "date": "2026-02-15"
      }
    ],

    heroVideo: {
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
      badge: 'EST Experiential Events & Summits 2026',
      title: 'Crafting Unforgettable Corporate Experiences Across India',
      subtitle: 'From high-impact tech conclaves in Gurgaon to luxury partner offsites in Goa and pan-India multi-city roadshows.',
      ctaText: 'Plan Your Next Event',
      ctaLink: 'contact.html',
      status: 'Active',
      lastUpdated: '2026-03-15'
    },

    eventImages: [],

    caseStudies: [
      {
        id: 'cs1',
        client: 'Adobe Systems',
        industry: 'Technology & Design',
        title: 'Workspace Transformation & Experiential Innovation Zones',
        category: 'Corporate Branding',
        coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000',
        challenge: 'Re-energize 45,000+ sq. ft. of headquarters space with brand culture art without disrupting daily office operations.',
        strategy: 'Developed a 3D architectural plan with custom frosted glass manifestations, acoustic felt murals, and interactive team breakout spaces.',
        execution: '100% turnkey night installations across 3 floors within 14 business days.',
        resultsHtml: '<p>Delivered an award-winning workspace environment that increased workplace satisfaction scores by 42% while causing zero interruption to daily enterprise workflows.</p>',
        metric1Value: '45K+',
        metric1Label: 'Sq. Ft. Branded',
        metric2Value: 'Zero',
        metric2Label: 'Workday Downtime',
        status: 'Published',
        date: '2026-02-10'
      },
      {
        id: 'cs2',
        client: 'AMD',
        industry: 'Semiconductor & Enterprise Tech',
        title: 'High-Performance Developer Summit & Global Live Broadcast',
        category: 'Conferences & AV',
        coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',
        challenge: 'Deliver a flawless technical seminar for 850+ in-person CXOs and developers while streaming globally with zero audio/video lag.',
        strategy: 'Curved P2.6 LED stage backdrop, hot-standby audio/video matrix, Watchout media servers, and RFID delegate tracking.',
        execution: 'Turnkey stage production, green room management, and multi-cam broadcast in Bangalore.',
        resultsHtml: '<p>Orchestrated an end-to-end technical summit with 99.9% stream reliability and over 12,000 virtual attendees worldwide.</p>',
        metric1Value: '850+',
        metric1Label: 'CXO & Dev Attendees',
        metric2Value: '99.9%',
        metric2Label: 'Stream Uptime',
        status: 'Published',
        date: '2026-01-28'
      },
      {
        id: 'cs3',
        client: 'ACPL Systems',
        industry: 'Enterprise Cybersecurity',
        title: 'Account-Based Marketing & Executive CXO Dinner Series',
        category: 'Demand Generation',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
        challenge: 'Penetrate Tier-1 Enterprise CIOs and CISOs in Delhi NCR and Mumbai for cybersecurity advisory.',
        strategy: 'Integrated LinkedIn ABM messaging, personalized SDR cadences, and exclusive 5-star private executive roundtables.',
        execution: '3 closed-door roundtables hosted with 14 CISOs per city and direct account executive introductions.',
        resultsHtml: '<p>Successfully connected ACPL cybersecurity experts with 42 verified decision-makers resulting in 3.8x pipeline ROI within 90 days.</p>',
        metric1Value: '42',
        metric1Label: 'Qualified CXO Meetings',
        metric2Value: '3.8x',
        metric2Label: 'Pipeline ROI',
        status: 'Published',
        date: '2026-01-15'
      },
      {
        id: 'cs4',
        client: 'BenQ',
        industry: 'Display Technology',
        title: 'Immersive 3D Exhibition Pavilion & Live Color Labs',
        category: 'Exhibition Marketing',
        coverImage: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=1000',
        challenge: 'Stand out on a crowded trade show floor at Pragati Maidan and demonstrate professional color accuracy displays.',
        strategy: 'Built a raised double-height wooden and glass pavilion featuring interactive darkroom display testing pods and executive hospitality.',
        execution: 'Turnkey 3D CAD modeling, CNC fabrication, lighting calibration, and badge scan lead capture.',
        resultsHtml: '<p>Captured record footfall with 2,800+ trade visitors experiencing hands-on display demos, generating 340+ dealer inquiries.</p>',
        metric1Value: '2,800+',
        metric1Label: 'Trade Show Visitors',
        metric2Value: '340+',
        metric2Label: 'Dealer Inquiries',
        status: 'Published',
        date: '2025-12-14'
      },
      {
        id: 'cs5',
        client: 'National FMCG Brand',
        industry: 'CPG & Personal Care',
        title: '12-City Mall & Residential Society Direct Sampling Tour',
        category: 'BTL Activation',
        coverImage: 'https://images.unsplash.com/photo-1560523136-40743f800c87?q=80&w=1000',
        challenge: 'Accelerate consumer trial and regional brand recall for a new organic personal care line across North and West India.',
        strategy: 'Multi-city hydraulic mobile vans, mall kiosks, and weekend gated society carnivals with gamified interactive surveys.',
        execution: 'Synchronized rollout across Delhi NCR, Jaipur, Chandigarh, Lucknow, Mumbai, and Pune over 30 days.',
        resultsHtml: '<p>Achieved unprecedented sampling velocity with 120,000+ consumer interactions and a 94% verified trial rate.</p>',
        metric1Value: '120K+',
        metric1Label: 'Samples Disbursed',
        metric2Value: '94%',
        metric2Label: 'Consumer Trial Rate',
        status: 'Published',
        date: '2025-11-20'
      },
      {
        id: 'cs6',
        client: 'Brigade Group',
        industry: 'Real Estate & Infrastructure',
        title: 'Luxury Leadership Retreat & Strategic Investor Conclave',
        category: 'Corporate Travel',
        coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000',
        challenge: 'Host a private high-stakes investor conclave in Goa with VIP charter logistics, bespoke branding, and zero room for error.',
        strategy: 'End-to-end luxury itinerary planning, beachfront stage set, private chartered flight coordination, and security protocols.',
        execution: 'Curated 3-day experience for 120 high-net-worth investors with gala networking dinners and keynote presentations.',
        resultsHtml: '<p>Delivered a flawless luxury experience resulting in 98% attendee satisfaction and high investor confidence.</p>',
        metric1Value: '120',
        metric1Label: 'HNW Investors Hosted',
        metric2Value: '98%',
        metric2Label: 'Satisfaction Rating',
        status: 'Published',
        date: '2025-10-18'
      }
    ],

    insightClusters: [
      {
        id: 'ic1',
        title: 'Experiential Marketing',
        icon: 'bi-stars',
        category: 'Experiential',
        desc: 'Strategies for connecting brand values with sensory customer immersion.',
        articles: [
          { title: 'What Is Experiential Marketing?', url: 'services/experiential-marketing.html' },
          { title: 'Experiential vs Traditional Marketing', url: 'services/experiential-marketing.html#faq' },
          { title: 'How to Measure Experiential ROI', url: 'services/experiential-marketing.html#capabilities' },
          { title: 'Experiential Marketing Trends in India', url: 'services/experiential-marketing.html' }
        ],
        status: 'Active'
      },
      {
        id: 'ic2',
        title: 'B2B Demand Generation',
        icon: 'bi-funnel',
        category: 'Growth',
        desc: 'Frameworks for building predictable enterprise sales pipelines.',
        articles: [
          { title: 'What Is B2B Demand Generation?', url: 'services/demand-generation.html' },
          { title: 'Demand Gen vs Raw Lead Gen', url: 'services/demand-generation.html#faq' },
          { title: 'B2B Ideal Customer Profile (ICP) Framework', url: 'services/demand-generation.html#strategy' },
          { title: 'LinkedIn ABM Outreach Strategies', url: 'services/demand-generation.html' }
        ],
        status: 'Active'
      },
      {
        id: 'ic3',
        title: 'Corporate Events',
        icon: 'bi-calendar4-event',
        category: 'Events',
        desc: 'Best practices for planning zero-glitch conferences and product launches.',
        articles: [
          { title: 'Corporate Conference Planning Checklist', url: 'services/event-management.html' },
          { title: 'Product Launch Event Strategy', url: 'services/event-management.html#events-managed' },
          { title: 'Technical AV Redundancy Standards', url: 'services/event-management.html#faq' },
          { title: 'Measuring Corporate Event ROI', url: 'services/event-management.html' }
        ],
        status: 'Active'
      },
      {
        id: 'ic4',
        title: 'BTL & Brand Activations',
        icon: 'bi-megaphone',
        category: 'Experiential',
        desc: 'On-ground roadshows, direct sampling, and mall intercept playbooks.',
        articles: [
          { title: 'What Is Below-The-Line (BTL) Marketing?', url: 'services/btl-activation.html' },
          { title: 'ATL vs BTL vs TTL Marketing Guide', url: 'services/btl-activation.html#activation-types' },
          { title: 'How to Plan a Multi-City Brand Roadshow', url: 'services/btl-activation.html#activation-types' },
          { title: 'Promoter Management & Live Tracking', url: 'services/btl-activation.html#faq' }
        ],
        status: 'Active'
      },
      {
        id: 'ic5',
        title: 'Exhibition & Trade Shows',
        icon: 'bi-grid-1x2',
        category: 'Exhibitions',
        desc: 'Turning trade show booths into high-velocity lead generation assets.',
        articles: [
          { title: 'How to Generate Leads at Trade Shows', url: 'services/exhibition.html#three-phase' },
          { title: '3D Exhibition Stall Design Principles', url: 'services/exhibition.html' },
          { title: 'Trade Show Venue Approvals in India', url: 'services/exhibition.html#faq' },
          { title: 'Post-Exhibition Lead Nurturing Workflows', url: 'services/exhibition.html#three-phase' }
        ],
        status: 'Active'
      }
    ],

    eventVideos: [],

    eventVideosSection: {
      badge: 'Video Showreels',
      title: 'High-Energy Event Showcases',
      desc: 'Watch our end-to-end technical production, crowd energy, and multi-hub execution films.'
    },

    auth: {
      adminId: 'admin',
      email: 'admin@estbrandservices.com',
      password: 'admin',
      name: 'EST Admin',
      role: 'Master Admin'
    }
  };

  // State Management with LocalStorage persistence
  const STORAGE_KEY = 'EST_ADMIN_DB_V2';
  const AUTH_SESSION_KEY = 'EST_ADMIN_AUTH_ACTIVE';
  const AUTH_REMEMBER_KEY = 'EST_ADMIN_AUTH_REMEMBER';

  let DB = loadDatabase();

  // Helper: Strip raw camera prefixes/suffixes like " - DSC_2609" or "DSC_2609" from photo titles
  function sanitizePhotoTitle(title, fallback = '') {
    if (!title) return fallback || '';
    let cleaned = String(title).replace(/\s*[-–—|:]\s*(?:_?DSC|IMG|DJI|SAM|PXP|P|PHOTO|IMAGE)[_-]?\d+.*$/i, '').trim();
    if (/^(?:_?DSC|IMG|DJI|SAM|PXP|P|PHOTO|IMAGE)[_-]?\d+$/i.test(cleaned)) {
      return fallback || cleaned;
    }
    return cleaned || fallback || title;
  }

  function normalizeDb(parsed) {
    if (!parsed || typeof parsed !== 'object') {
      const init = JSON.parse(JSON.stringify(DEFAULT_DB));
      init._initialized = true;
      return init;
    }

    parsed._initialized = true;

    if (parsed.heroVideo === undefined) parsed.heroVideo = DEFAULT_DB.heroVideo;
    parsed.eventImages = Array.isArray(parsed.eventImages) ? parsed.eventImages : [];
    parsed.eventVideos = Array.isArray(parsed.eventVideos) ? parsed.eventVideos : [];
    if (parsed.eventVideosSection === undefined) parsed.eventVideosSection = DEFAULT_DB.eventVideosSection;
    parsed.events = Array.isArray(parsed.events) ? parsed.events : [];
    if (!Array.isArray(parsed.caseStudies)) {
      parsed.caseStudies = JSON.parse(JSON.stringify(DEFAULT_DB.caseStudies || []));
    }

    // Automatically strip any existing DSC_ or camera suffixes from event photo titles
    parsed.eventImages.forEach(img => {
      if (img && img.title) img.title = sanitizePhotoTitle(img.title, img.eventName);
    });

    parsed.galleries = Array.isArray(parsed.galleries) ? parsed.galleries : [];
    parsed.videoGalleries = Array.isArray(parsed.videoGalleries) ? parsed.videoGalleries : [];
    if (parsed.auth === undefined) parsed.auth = DEFAULT_DB.auth;
    if (parsed.insightClusters === undefined) parsed.insightClusters = DEFAULT_DB.insightClusters || [];
    if (parsed.blogPosts === undefined) parsed.blogPosts = DEFAULT_DB.blogPosts || [];
    if (parsed.services === undefined) parsed.services = DEFAULT_DB.services || [];
    if (!Array.isArray(parsed.clients) || parsed.clients.length === 0) {
      parsed.clients = JSON.parse(JSON.stringify(DEFAULT_DB.clients));
    } else {
      // Migrate old placeholder brand names or missing logoUrls from DEFAULT_DB
      const defMap = new Map(DEFAULT_DB.clients.map(c => [c.id, c]));
      parsed.clients.forEach(c => {
        const def = defMap.get(c.id);
        if (def) {
          if (!c.name || c.name.startsWith('Partner Brand') || c.name === 'ACPL' || c.name === 'BENQ') {
            c.name = def.name;
            c.category = def.category;
          }
          if (!c.logoUrl) {
            c.logoUrl = def.logoUrl;
          }
        }
      });
      // Ensure all 32 default enterprise brands exist
      const existingIds = new Set(parsed.clients.map(c => c.id));
      DEFAULT_DB.clients.forEach(def => {
        if (!existingIds.has(def.id)) {
          parsed.clients.push(JSON.parse(JSON.stringify(def)));
        }
      });
    }
    if (parsed.clientFeedbacks === undefined) parsed.clientFeedbacks = DEFAULT_DB.clientFeedbacks || [];
    if (parsed.employeeFeedbacks === undefined) parsed.employeeFeedbacks = DEFAULT_DB.employeeFeedbacks || [];
    parsed.eventRegistrations = Array.isArray(parsed.eventRegistrations) ? parsed.eventRegistrations : [];

    return parsed;
  }

  function loadDatabase() {
    try {
      if (window.ESTCloudSync && typeof window.ESTCloudSync.getDB === 'function') {
        const cloudDb = window.ESTCloudSync.getDB();
        if (cloudDb && typeof cloudDb === 'object') {
          return normalizeDb(cloudDb);
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normalizeDb(parsed);
      }
    } catch (e) {
      console.warn('Failed to parse database from LocalStorage:', e);
    }
    const initial = JSON.parse(JSON.stringify(DEFAULT_DB));
    saveDatabase(initial);
    return initial;
  }

  function saveDatabase(data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serialized);
      localStorage.setItem('EST_ADMIN_DB_SYNC_TS', Date.now().toString());

      // Save to Firebase Realtime Database & BroadcastChannel
      if (window.ESTCloudSync && typeof window.ESTCloudSync.saveDB === 'function') {
        window.ESTCloudSync.saveDB(data);
      }

      try {
        window.dispatchEvent(new CustomEvent('EST_DB_UPDATED', { detail: data }));
        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('est_admin_sync');
          bc.postMessage({ type: 'DB_UPDATE', data, timestamp: Date.now() });
          bc.close();
        }
      } catch (_) {}
      return true;
    } catch (e) {
      console.error('Failed to save database to LocalStorage:', e);
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        if (data.eventImages && data.eventImages.length > 25) {
          data.eventImages = data.eventImages.slice(0, 25);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            if (window.ESTCloudSync) window.ESTCloudSync.saveDB(data);
            showToast('Storage full: Automatically optimized to newest 25 albums.', 'warning');
            return true;
          } catch (e2) {
            showToast('Browser storage quota reached. Please delete some older items.', 'danger');
          }
        } else {
          showToast('Browser storage quota reached. Please delete some items.', 'danger');
        }
      }
      return false;
    }
  }

  // Client-Side Canvas Image Downscaling & Compression (reduces 10MB photo to ~70-120KB)
  function compressImageFile(file, maxWidth = 1280, maxHeight = 960, quality = 0.82) {
    return new Promise((resolve) => {
      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ dataUrl: e.target.result, size: file.size });
        reader.onerror = () => resolve({ dataUrl: '', size: 0 });
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (readerEvt) => {
        const img = new Image();
        img.onload = () => {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;

          if (w > maxWidth || h > maxHeight) {
            const ratio = Math.min(maxWidth / w, maxHeight / h);
            w = Math.max(1, Math.round(w * ratio));
            h = Math.max(1, Math.round(h * ratio));
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({
            dataUrl: dataUrl,
            size: Math.round(dataUrl.length * 0.75)
          });
        };
        img.onerror = () => {
          resolve({ dataUrl: readerEvt.target.result, size: file.size });
        };
        img.src = readerEvt.target.result;
      };
      reader.onerror = () => resolve({ dataUrl: '', size: 0 });
      reader.readAsDataURL(file);
    });
  }

  // Current Active Route State
  let currentView = 'dashboard';

  // =========================================================================
  // DOM INITIALIZATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initSignOutModal();
    initGenericModal();
    renderCurrentView();
  });

  // =========================================================================
  // NAVIGATION & ACCORDION SYSTEM
  // =========================================================================
  function initNavigation() {
    const navButtons = document.querySelectorAll('[data-view]');
    const accordions = document.querySelectorAll('.nav-parent');

    // View Switching
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = btn.getAttribute('data-view');
        if (!targetView) return;

        // Set active classes
        document.querySelectorAll('.sidebar-nav-item, .nav-link-btn, .submenu-link').forEach(el => el.classList.remove('active'));
        
        btn.classList.add('active');
        const parentItem = btn.closest('.sidebar-nav-item');
        if (parentItem) parentItem.classList.add('active');

        // Close mobile drawer if open
        const sidebar = document.getElementById('adminSidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');

        switchView(targetView);
      });
    });

    // Accordion Toggle
    accordions.forEach(acc => {
      acc.addEventListener('click', () => {
        acc.classList.toggle('open');
      });
    });
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('adminSidebar');

    if (menuBtn && sidebar) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }

  function switchView(viewName) {
    currentView = viewName;
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.adminApp = window.adminApp || {};
  window.adminApp.switchView = switchView;

  function renderCurrentView() {
    const mainArea = document.getElementById('adminMainContent');
    if (!mainArea) return;

    switch (currentView) {
      case 'dashboard':
        renderDashboard(mainArea);
        break;
      case 'our-works':
      case 'our-events':
        renderOurEventsManager(mainArea);
        break;
      case 'clients':
        renderClients(mainArea);
        break;
      case 'services':
        renderServices(mainArea);
        break;
      case 'case-studies':
        renderCaseStudies(mainArea);
        break;
      case 'insights':
        renderInsightClusters(mainArea);
        break;
      case 'brands':
        renderBrands(mainArea);
        break;
      case 'event-pages':
        renderEventPages(mainArea);
        break;
      case 'event-registrations':
        renderEventRegistrations(mainArea);
        break;
      case 'events':
        renderEvents(mainArea);
        break;
      case 'client-feedbacks':
        renderClientFeedbacks(mainArea);
        break;
      case 'employee-feedbacks':
        renderEmployeeFeedbacks(mainArea);
        break;
      default:
        renderDashboard(mainArea);
        break;
    }
  }

  // =========================================================================
  // VIEW: OUR WORKS MANAGER (Hero Video + Images + Videos)
  // =========================================================================
  function renderOurEventsManager(container) {
    const hero = DB.heroVideo || DEFAULT_DB.heroVideo;
    const images = Array.isArray(DB.eventImages) ? DB.eventImages : [];
    const videos = Array.isArray(DB.eventVideos) ? DB.eventVideos : [];
    const vSection = DB.eventVideosSection || DEFAULT_DB.eventVideosSection || {
      badge: 'Video Showreels',
      title: 'High-Energy Event Showcases',
      desc: 'Watch our end-to-end technical production, crowd energy, and multi-hub execution films.'
    };

    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Our Works Manager</h1>
            <p class="view-subtitle">Manage Full-Screen Hero Video, Photo Showcase, and Video Showreels for the Works Page</p>
          </div>
          <a href="our-works.html" target="_blank" class="header-btn header-btn-primary">
            <i class="bi bi-box-arrow-up-right"></i> View Public Works Page
          </a>
        </div>

        <!-- Tabs Navigation -->
        <div class="admin-tabs-nav">
          <button class="admin-tab-btn active" data-tab="tab-hero-video">
            <i class="bi bi-film"></i> Hero Full-Screen Video
          </button>
          <button class="admin-tab-btn" data-tab="tab-event-images">
            <i class="bi bi-images"></i> Work Images Section (${images.length})
          </button>
          <button class="admin-tab-btn" data-tab="tab-event-videos">
            <i class="bi bi-camera-video"></i> Work Videos Section (${videos.length})
          </button>
        </div>

        <!-- ================= TAB 1: HERO VIDEO ================= -->
        <div class="tab-pane active" id="tab-hero-video">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
            
            <!-- Left: Hero Video Live Preview -->
            <div class="data-card" style="padding: 20px;">
              <h3 style="font-size: 1.05rem; font-weight: 600; color: #fff; margin-bottom: 12px;">
                <i class="bi bi-eye-fill" style="color: var(--color-primary); margin-right: 6px;"></i> Live Hero Background Preview
              </h3>
              
              <div class="hero-video-preview-box">
                <video id="heroLiveVideoPlayer" autoplay loop muted playsinline src="${escapeHtml(hero.videoUrl)}"></video>
                <div class="hero-video-overlay-preview">
                  <span class="hero-badge-preview" id="prevHeroBadge">${escapeHtml(hero.badge)}</span>
                  <h2 class="hero-title-preview" id="prevHeroTitle">${escapeHtml(hero.title)}</h2>
                  <p class="hero-subtitle-preview" id="prevHeroSubtitle">${escapeHtml(hero.subtitle)}</p>
                </div>
              </div>

              <div style="display: flex; gap: 10px;">
                <button class="btn-outline" style="flex:1; justify-content: center;" id="btnToggleHeroMute">
                  <i class="bi bi-volume-mute-fill"></i> Toggle Audio Preview
                </button>
                <button class="btn-outline" style="flex:1; justify-content: center;" id="btnToggleHeroPlay">
                  <i class="bi bi-pause-fill"></i> Pause / Play
                </button>
              </div>
            </div>

            <!-- Right: Hero Video Settings Form -->
            <div class="data-card" style="padding: 24px;">
              <h3 style="font-size: 1.05rem; font-weight: 600; color: #fff; margin-bottom: 16px;">
                <i class="bi bi-gear-fill" style="color: var(--color-accent); margin-right: 6px;"></i> Hero Video Configuration
              </h3>

              <form id="heroVideoForm" style="display: flex; flex-direction: column; gap: 16px;">
                <div class="form-group">
                  <label class="form-label">Video Source URL (.mp4 / .webm)</label>
                  <input type="url" class="form-input" id="heroVideoUrlInput" value="${escapeHtml(hero.videoUrl)}" placeholder="https://example.com/video.mp4" required>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">Quick Video Presets</label>
                    <select class="form-select" id="heroPresetSelect">
                      <option value="">-- Choose High-Quality Preset --</option>
                      <option value="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4">Sunset Sky Horizon (Cinematic 1080p)</option>
                      <option value="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43527-large.mp4">Enterprise Tech / Workspace</option>
                      <option value="https://assets.mixkit.co/videos/preview/mixkit-corporate-team-working-in-a-modern-office-42408-large.mp4">Corporate Team & Innovation</option>
                      <option value="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-jumping-and-having-fun-44754-large.mp4">High-Energy Stage Crowd</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Or Upload Local Video File</label>
                    <input type="file" accept="video/mp4,video/webm" class="form-input" id="heroVideoFileInput" style="padding: 6px 10px;">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Hero Badge Text</label>
                  <input type="text" class="form-input" id="heroBadgeInput" value="${escapeHtml(hero.badge)}" placeholder="e.g. ✨ EST Experiential Events 2026">
                </div>

                <div class="form-group">
                  <label class="form-label">Main Heading (Title)</label>
                  <input type="text" class="form-input" id="heroTitleInput" value="${escapeHtml(hero.title)}" placeholder="Main headline">
                </div>

                <div class="form-group">
                  <label class="form-label">Subtitle Description</label>
                  <textarea class="form-textarea" id="heroSubtitleInput" placeholder="Compelling event subtitle...">${escapeHtml(hero.subtitle)}</textarea>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">CTA Button Text</label>
                    <input type="text" class="form-input" id="heroCtaTextInput" value="${escapeHtml(hero.ctaText || 'Plan Your Next Event')}">
                  </div>
                  <div class="form-group">
                    <label class="form-label">CTA Link URL</label>
                    <input type="text" class="form-input" id="heroCtaLinkInput" value="${escapeHtml(hero.ctaLink || 'contact.html')}">
                  </div>
                </div>

                <button type="submit" class="btn-add" style="justify-content: center; padding: 12px; font-size: 0.95rem;">
                  <i class="bi bi-cloud-arrow-up-fill"></i> Save & Publish Hero Video
                </button>
              </form>
            </div>

          </div>
        </div>

        <!-- ================= TAB 2: EVENT IMAGES SECTION ================= -->
        <div class="tab-pane" id="tab-event-images">
          <div class="table-toolbar">
            <div class="search-filter-group">
              <div class="search-box">
                <i class="bi bi-search"></i>
                <input type="text" class="search-input" id="imgSearchInput" placeholder="Search event photos...">
              </div>
              <select class="filter-select" id="imgCategoryFilter">
                <option value="ALL">All Categories</option>
                <option value="Conferences">Conferences</option>
                <option value="Exhibitions">Exhibitions</option>
                <option value="Brand Activations">Brand Activations</option>
                <option value="Roadshows">Roadshows</option>
                <option value="Offsites">Offsites</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button class="btn-outline" id="btnClearAllEventImages" style="color: var(--status-danger); border-color: rgba(239, 68, 68, 0.4);" ${images.length === 0 ? "disabled" : ""}>
                <i class="bi bi-trash-fill"></i> Delete All Photos (${images.length})
              </button>
              <button class="btn-add" id="btnAddEventImage">
                <i class="bi bi-images"></i> Add / Upload Multiple Photos
              </button>
            </div>
          </div>

          <div class="cards-grid" id="eventImagesGrid">
            ${renderEventImageCards(images)}
          </div>
        </div>

        <!-- ================= TAB 3: EVENT VIDEOS SECTION ================= -->
        <div class="tab-pane" id="tab-event-videos">
          <!-- Showcase Reel Section Header & Copy Settings -->
          <div class="data-card" style="padding: 18px 22px; margin-bottom: 24px; border: 1px solid var(--border-color); border-radius: 12px; background: rgba(255,255,255,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h3 style="font-size: 1rem; font-weight: 600; color: #fff; margin: 0;">
                  <i class="bi bi-pencil-square" style="color: var(--color-accent); margin-right: 6px;"></i> Showcase Reel Section Header &amp; Copy
                </h3>
                <p style="font-size: 0.825rem; color: var(--text-muted); margin: 2px 0 0;">
                  Customize the badge, title headline, and description displayed above the video showcase on the public works page.
                </p>
              </div>
              <button type="button" class="btn-outline" id="btnSaveVideoSectionHeader" style="padding: 6px 16px; font-size: 0.825rem; display: inline-flex; align-items: center; gap: 6px;">
                <i class="bi bi-check2-circle"></i> Save Header Copy
              </button>
            </div>
            <div class="form-row">
              <div class="form-group" style="flex: 1;">
                <label class="form-label" style="font-size: 0.775rem;">Section Badge Text</label>
                <input type="text" class="form-input" id="vSecBadge" value="${escapeHtml(vSection.badge || 'Video Showreels')}" placeholder="e.g. Video Showreels">
              </div>
              <div class="form-group" style="flex: 2;">
                <label class="form-label" style="font-size: 0.775rem;">Main Heading (Title)</label>
                <input type="text" class="form-input" id="vSecTitle" value="${escapeHtml(vSection.title || 'High-Energy Event Showcases')}" placeholder="e.g. High-Energy Event Showcases">
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 0.775rem;">Section Description (Subtitle)</label>
              <input type="text" class="form-input" id="vSecDesc" value="${escapeHtml(vSection.desc || vSection.subtitle || 'Watch our end-to-end technical production, crowd energy, and multi-hub execution films.')}" placeholder="e.g. Watch our end-to-end technical production, crowd energy, and multi-hub execution films.">
            </div>
          </div>

          <div class="table-toolbar">
            <div class="search-filter-group">
              <div class="search-box">
                <i class="bi bi-search"></i>
                <input type="text" class="search-input" id="vidSearchInput" placeholder="Search video showreels...">
              </div>
              <select class="filter-select" id="vidCategoryFilter">
                <option value="ALL">All Categories</option>
                <option value="Showreel">Showreel</option>
                <option value="Roadshows">Roadshows</option>
                <option value="Exhibitions">Exhibitions</option>
                <option value="Conferences">Conferences</option>
                <option value="Brand Activations">Brand Activations</option>
                <option value="Offsites">Corporate Offsites</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button class="btn-outline" id="btnClearAllEventVideos" style="color: var(--status-danger); border-color: rgba(239, 68, 68, 0.4);" ${videos.length === 0 ? "disabled" : ""}>
                <i class="bi bi-trash-fill"></i> Delete All Videos (${videos.length})
              </button>
              <button class="btn-add" id="btnAddEventVideo">
                <i class="bi bi-camera-video-fill"></i> Add Video Showreel
              </button>
            </div>
          </div>

          <div class="cards-grid" id="eventVideosGrid">
            ${renderEventVideoCards(videos)}
          </div>
        </div>

      </div>
    `;

    // --- Tab Switching Logic ---
    const tabBtns = container.querySelectorAll('.admin-tab-btn');
    const tabPanes = container.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetId)?.classList.add('active');
      });
    });

    // --- Live Video Preview Handlers ---
    const liveVideoPlayer = document.getElementById('heroLiveVideoPlayer');
    const urlInput = document.getElementById('heroVideoUrlInput');
    const presetSelect = document.getElementById('heroPresetSelect');
    const fileInput = document.getElementById('heroVideoFileInput');
    const badgeInput = document.getElementById('heroBadgeInput');
    const titleInput = document.getElementById('heroTitleInput');
    const subtitleInput = document.getElementById('heroSubtitleInput');

    const prevBadge = document.getElementById('prevHeroBadge');
    const prevTitle = document.getElementById('prevHeroTitle');
    const prevSubtitle = document.getElementById('prevHeroSubtitle');

    badgeInput?.addEventListener('input', () => { if (prevBadge) prevBadge.textContent = badgeInput.value; });
    titleInput?.addEventListener('input', () => { if (prevTitle) prevTitle.textContent = titleInput.value; });
    subtitleInput?.addEventListener('input', () => { if (prevSubtitle) prevSubtitle.textContent = subtitleInput.value; });

    urlInput?.addEventListener('input', () => {
      if (liveVideoPlayer && urlInput.value) {
        liveVideoPlayer.src = urlInput.value;
        liveVideoPlayer.play().catch(() => {});
      }
    });

    presetSelect?.addEventListener('change', () => {
      if (presetSelect.value) {
        urlInput.value = presetSelect.value;
        if (liveVideoPlayer) {
          liveVideoPlayer.src = presetSelect.value;
          liveVideoPlayer.play().catch(() => {});
        }
      }
    });

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const blobUrl = URL.createObjectURL(file);
        urlInput.value = blobUrl;
        if (liveVideoPlayer) {
          liveVideoPlayer.src = blobUrl;
          liveVideoPlayer.play().catch(() => {});
        }
        showToast(`Loaded local video file "${file.name}"`, 'info');
      }
    });

    // Audio / Pause Toggles for Preview
    document.getElementById('btnToggleHeroMute')?.addEventListener('click', () => {
      if (liveVideoPlayer) {
        liveVideoPlayer.muted = !liveVideoPlayer.muted;
        showToast(liveVideoPlayer.muted ? 'Audio Muted' : 'Audio Unmuted', 'info');
      }
    });

    document.getElementById('btnToggleHeroPlay')?.addEventListener('click', () => {
      if (liveVideoPlayer) {
        if (liveVideoPlayer.paused) liveVideoPlayer.play();
        else liveVideoPlayer.pause();
      }
    });

    // Save Hero Form
    document.getElementById('heroVideoForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedHero = {
        videoUrl: urlInput.value.trim(),
        badge: badgeInput.value.trim(),
        title: titleInput.value.trim(),
        subtitle: subtitleInput.value.trim(),
        ctaText: document.getElementById('heroCtaTextInput').value.trim() || 'Plan Your Event',
        ctaLink: document.getElementById('heroCtaLinkInput').value.trim() || 'contact.html',
        status: 'Active',
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      DB.heroVideo = updatedHero;
      saveDatabase(DB);
      showToast('Hero Background Video & Details Published Successfully!', 'success');
    });

    // --- Tab 2: Event Images Handlers ---
    initEventImagesTab(container);

    // --- Tab 3: Event Videos Handlers ---
    initEventVideosTab(container);
  }

  function renderEventImageCards(images) {
    if (!images || !images.length) {
      return `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No event photos uploaded yet.</p>`;
    }

    // Group images by Event Name
    const eventGroups = [];
    const eventMap = new Map();

    images.forEach(img => {
      const cleanTitle = sanitizePhotoTitle(img.title, img.eventName);
      const cleanEventName = sanitizePhotoTitle(img.eventName, 'EST Showcase');
      const key = (cleanEventName && cleanEventName.trim()) ? cleanEventName.trim() : (cleanTitle || 'EST Showcase');
      if (!eventMap.has(key)) {
        const newGroup = {
          eventName: key,
          category: img.category || 'Conferences',
          desc: img.desc || '',
          date: img.date || 'Recent',
          photos: []
        };
        eventMap.set(key, newGroup);
        eventGroups.push(newGroup);
      }
      eventMap.get(key).photos.push({
        ...img,
        title: cleanTitle,
        eventName: cleanEventName
      });
    });

    return eventGroups.map((group, groupIdx) => {
      const cardId = `admin_card_${groupIdx}`;
      const photosCount = group.photos.length;
      const hasMultiple = photosCount > 1;

      return `
        <div class="item-card" id="${cardId}">
          <div>
            ${hasMultiple ? `
              <div class="card-carousel-wrapper" style="height: 180px; border-radius: var(--radius-sm); margin-bottom: 12px;">
                <span class="card-carousel-counter" id="admin_counter_${cardId}">
                  <i class="bi bi-images"></i> 1 / ${photosCount}
                </span>

                <div class="card-carousel-track" id="admin_track_${cardId}">
                  ${group.photos.map(p => `
                    <div class="card-carousel-slide" data-action="preview-img" data-url="${escapeHtml(p.imgUrl)}" data-title="${escapeHtml(p.title)}">
                      <img src="${escapeHtml(p.imgUrl)}" alt="${escapeHtml(p.title)}">
                    </div>
                  `).join('')}
                </div>

                <button type="button" class="card-carousel-btn prev" onclick="event.stopPropagation(); window.slideAdminCarousel('${cardId}', -1, ${photosCount});">
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button type="button" class="card-carousel-btn next" onclick="event.stopPropagation(); window.slideAdminCarousel('${cardId}', 1, ${photosCount});">
                  <i class="bi bi-chevron-right"></i>
                </button>

                <div class="card-carousel-dots" id="admin_dots_${cardId}">
                  ${group.photos.map((_, dotIdx) => `
                    <button type="button" class="card-carousel-dot ${dotIdx === 0 ? 'active' : ''}" onclick="event.stopPropagation(); window.jumpAdminCarousel('${cardId}', ${dotIdx}, ${photosCount});"></button>
                  `).join('')}
                </div>
              </div>
            ` : `
              <img src="${escapeHtml(group.photos[0].imgUrl)}" alt="${escapeHtml(group.photos[0].title)}" class="item-card-img" style="height: 180px; margin-bottom: 12px;" data-action="preview-img" data-url="${escapeHtml(group.photos[0].imgUrl)}" data-title="${escapeHtml(group.photos[0].title)}">
            `}

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span class="badge badge-category">${escapeHtml(group.category)}</span>
              <span style="font-size: 0.75rem; color: var(--text-dim);">${escapeHtml(group.date)}</span>
            </div>

            <h3 class="item-card-title">${escapeHtml(group.eventName)}</h3>
            <p class="entity-info-sub" style="margin-bottom: 8px;">
              <strong>${photosCount} Photo(s) in this Album</strong>
            </p>
            <p class="item-card-desc">${escapeHtml(group.desc || group.photos[0].desc || '')}</p>
          </div>

          <div class="item-card-footer">
            <button class="btn-outline" style="font-size: 0.775rem; padding: 4px 10px;" data-action="preview-img" data-url="${escapeHtml(group.photos[0].imgUrl)}" data-title="${escapeHtml(group.eventName)}">
              <i class="bi bi-zoom-in"></i> View (${photosCount})
            </button>
            <div class="action-btns">
              <button class="btn-icon btn-delete" data-action="delete-event-album" data-event="${escapeHtml(group.eventName)}" title="Delete this album/event"><i class="bi bi-trash-fill"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  window.adminCarouselIndices = {};

  window.slideAdminCarousel = function (cardId, dir, total) {
    if (!window.adminCarouselIndices[cardId]) window.adminCarouselIndices[cardId] = 0;
    window.adminCarouselIndices[cardId] = (window.adminCarouselIndices[cardId] + dir + total) % total;
    updateAdminCarouselDOM(cardId, window.adminCarouselIndices[cardId], total);
  };

  window.jumpAdminCarousel = function (cardId, idx, total) {
    window.adminCarouselIndices[cardId] = idx;
    updateAdminCarouselDOM(cardId, idx, total);
  };

  function updateAdminCarouselDOM(cardId, currentIdx, total) {
    const track = document.getElementById(`admin_track_${cardId}`);
    const counter = document.getElementById(`admin_counter_${cardId}`);
    const dots = document.querySelectorAll(`#admin_dots_${cardId} .card-carousel-dot`);

    if (track) track.style.transform = `translateX(-${currentIdx * 100}%)`;
    if (counter) counter.innerHTML = `<i class="bi bi-images"></i> ${currentIdx + 1} / ${total}`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
  }

  function renderEventVideoCards(videos) {
    if (!videos || !videos.length) {
      return `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--border-color);">
          <i class="bi bi-camera-video" style="font-size: 2.8rem; color: var(--color-accent); margin-bottom: 12px; display: block;"></i>
          <h4 style="color: #fff; font-weight: 600; font-size: 1.1rem; margin-bottom: 6px;">No Video Showreels Uploaded Yet</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 440px; margin: 0 auto 18px;">
            Add client recap films, keynote highlights, and multi-hub brand activations to show on the public works page.
          </p>
          <button type="button" class="btn-add" onclick="document.getElementById('btnAddEventVideo')?.click();">
            <i class="bi bi-plus-lg"></i> Add First Video Showreel
          </button>
        </div>
      `;
    }

    return videos.map(vid => `
      <div class="item-card" data-video-id="${vid.id}">
        <div>
          <div style="position: relative; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 14px; background: #000;">
            <img src="${escapeHtml(vid.thumbUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80')}" alt="${escapeHtml(vid.title)}" class="item-card-img" style="height: 170px; margin-bottom: 0; object-fit: cover; width: 100%;">
            <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s;" data-action="play-event-vid" data-url="${escapeHtml(vid.videoUrl)}" data-title="${escapeHtml(vid.title)}">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(254,59,32,0.9); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem; box-shadow: 0 4px 12px rgba(254,59,32,0.4);">
                <i class="bi bi-play-fill" style="margin-left: 2px;"></i>
              </div>
            </div>
            <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.85); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
              ${escapeHtml(vid.duration || '2m 30s')}
            </span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span class="badge badge-category">${escapeHtml(vid.category || 'Showreel')}</span>
            <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 500;">Client: ${escapeHtml(vid.client || 'EST Client')}</span>
          </div>
          <h3 class="item-card-title">${escapeHtml(vid.title)}</h3>
          <p class="item-card-desc">${escapeHtml(vid.desc || 'No description provided.')}</p>
        </div>
        <div class="item-card-footer">
          <button class="btn-outline" style="font-size: 0.775rem; padding: 5px 12px;" data-action="play-event-vid" data-url="${escapeHtml(vid.videoUrl)}" data-title="${escapeHtml(vid.title)}">
            <i class="bi bi-play-fill" style="color: var(--color-primary);"></i> Watch
          </button>
          <div class="action-btns">
            <button class="btn-icon btn-edit" data-action="edit-event-vid" data-id="${vid.id}" title="Edit Video Showreel"><i class="bi bi-pencil-fill"></i></button>
            <button class="btn-icon btn-delete" data-action="delete-event-vid" data-id="${vid.id}" title="Delete Video Showreel"><i class="bi bi-trash-fill"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function initEventImagesTab(container) {
    const searchInput = container.querySelector('#imgSearchInput');
    const catFilter = container.querySelector('#imgCategoryFilter');
    const grid = container.querySelector('#eventImagesGrid');

    const updateGrid = () => {
      const q = searchInput?.value.toLowerCase().trim() || '';
      const cat = catFilter?.value || 'ALL';
      const filtered = (DB.eventImages || []).filter(img => {
        const matchesQ = (img.title || '').toLowerCase().includes(q) || (img.eventName || '').toLowerCase().includes(q);
        const matchesCat = cat === 'ALL' || img.category === cat;
        return matchesQ && matchesCat;
      });
      if (grid) {
        grid.innerHTML = renderEventImageCards(filtered);
            // Clear All Photos
    container.querySelector('#btnClearAllEventImages')?.addEventListener('click', () => {
      confirmDelete('Delete All Photos', 'Are you sure you want to permanently delete all event photos? This cannot be undone.', () => {
        DB.eventImages = [];
        saveDatabase(DB);
        renderOurEventsManager(document.getElementById('adminMainContent'));
        document.querySelector('[data-tab="tab-event-images"]')?.click();
        showToast('All event photos removed', 'danger');
      });
    });

    attachImageCardActions(container);
      }
    };

    searchInput?.addEventListener('input', updateGrid);
    catFilter?.addEventListener('change', updateGrid);

    // Multi-Image Upload Modal
    container.querySelector('#btnAddEventImage')?.addEventListener('click', () => {
      // In-memory array of selected files for this modal session
      let selectedFilesList = [];

      const formHtml = `
        <div class="batch-mode-toggle">
          <button type="button" class="batch-mode-btn active" id="btnModeFiles">
            <i class="bi bi-folder-plus"></i> Multiple Local Photos
          </button>
          <button type="button" class="batch-mode-btn" id="btnModeUrls">
            <i class="bi bi-link-45deg"></i> Multiple Image URLs
          </button>
        </div>

        <!-- Mode 1: Multiple Local Files -->
        <div id="m_filesSection">
          <div class="multi-upload-dropzone" id="m_dropzone">
            <i class="bi bi-cloud-arrow-up-fill"></i>
            <h4>Choose or Drag & Drop Multiple Photos</h4>
            <p>Select multiple JPG, PNG, WebP or SVG files from your device</p>
            <input type="file" accept="image/*" multiple id="m_multiImgFiles" style="display: none;">
          </div>

          <div id="m_multiPreviewWrapper" style="display: none;">
            <div class="multi-upload-status-bar">
              <strong id="m_multiCountBadge" style="color: var(--color-primary);"><i class="bi bi-images"></i> 0 photos selected</strong>
              <button type="button" class="btn-outline" style="font-size: 0.725rem; padding: 2px 10px;" id="m_btnClearAllFiles">
                <i class="bi bi-trash"></i> Clear All
              </button>
            </div>
            <div class="multi-preview-grid" id="m_multiPreviewGrid"></div>
          </div>
        </div>

        <!-- Mode 2: Batch Image URLs -->
        <div id="m_urlsSection" style="display: none;">
          <div class="form-group">
            <label class="form-label">Image URLs (One URL per line or single URL)</label>
            <textarea class="form-textarea" id="m_batchUrls" style="min-height: 110px; font-family: monospace; font-size: 0.8rem;" placeholder="https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&#10;https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&#10;https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900"></textarea>
            <span style="font-size: 0.75rem; color: var(--text-dim);">Paste one or more public image URLs. Each line will create a separate photo card.</span>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); margin: 6px 0 10px 0; padding-top: 12px;">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 12px;">
            <i class="bi bi-tag-fill" style="color: var(--color-primary); margin-right: 4px;"></i> Event Information & Categorization
          </h4>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-select" id="m_imgCat">
                <option value="Conferences">Conferences</option>
                <option value="Exhibitions">Exhibitions</option>
                <option value="Brand Activations">Brand Activations</option>
                <option value="Roadshows">Roadshows</option>
                <option value="Offsites">Offsites</option>
                <option value="Corporate Galas">Corporate Galas</option>
                <option value="Product Reveals">Product Reveals</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Event Name</label>
              <input type="text" class="form-input" id="m_imgEvent" placeholder="e.g. Cisco Connect 2026 / Tech Summit">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Base Title (Optional)</label>
              <input type="text" class="form-input" id="m_imgTitle" placeholder="e.g. Stage Setup & Delegate Arena">
            </div>
            <div class="form-group">
              <label class="form-label">Event Date</label>
              <input type="date" class="form-input" id="m_imgDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description / Highlights</label>
            <textarea class="form-textarea" id="m_imgDesc" style="min-height: 60px;" placeholder="Event setup details, fabrication specs, or highlights..."></textarea>
          </div>
        </div>
      `;

      openGenericModal({
        title: 'Add / Upload Multiple Photos to Event Gallery',
        body: formHtml,
        saveText: 'Add Photos to Gallery',
        onSave: () => {
          const category = document.getElementById('m_imgCat')?.value || 'Conferences';
          const eventName = document.getElementById('m_imgEvent')?.value.trim() || 'EST Corporate Event';
          const baseTitle = document.getElementById('m_imgTitle')?.value.trim();
          const eventDate = document.getElementById('m_imgDate')?.value || new Date().toISOString().split('T')[0];
          const desc = document.getElementById('m_imgDesc')?.value.trim() || '';

          const isUrlsMode = document.getElementById('btnModeUrls')?.classList.contains('active');

          let newPhotosToAdd = [];

          if (isUrlsMode) {
            const rawUrls = document.getElementById('m_batchUrls')?.value || '';
            const urls = rawUrls.split(/\r?\n/).map(u => u.trim()).filter(u => u.length > 0 && u.startsWith('http'));
            
            if (!urls.length) {
              showToast('Please enter at least one valid image URL (starting with http/https)', 'warning');
              return false;
            }

            urls.forEach((url, index) => {
              const photoTitle = baseTitle || (eventName ? eventName : 'Event Photo');
              newPhotosToAdd.push({
                id: 'ei_' + Date.now().toString().slice(-6) + '_' + Math.random().toString(36).substr(2, 4),
                title: photoTitle,
                category,
                eventName,
                imgUrl: url,
                desc,
                date: eventDate
              });
            });
          } else {
            if (!selectedFilesList.length) {
              showToast('Please select at least one image file to upload', 'warning');
              return false;
            }

            selectedFilesList.forEach((fileItem, index) => {
              // User requirement: Do NOT append raw camera suffixes like DSC_2609 to photo base title
              let photoTitle = baseTitle;
              if (!photoTitle) {
                const cleanFileName = fileItem.name.replace(/\.[^/.]+$/, "");
                const isCameraRaw = /^(?:_?DSC|IMG|DJI|SAM|PXP|P|PHOTO|IMAGE)[_-]?\d+$/i.test(cleanFileName);
                photoTitle = isCameraRaw ? (eventName || 'Event Photo') : cleanFileName;
              }
              newPhotosToAdd.push({
                id: 'ei_' + Date.now().toString().slice(-6) + '_' + Math.random().toString(36).substr(2, 4),
                title: photoTitle,
                category,
                eventName,
                imgUrl: fileItem.dataUrl,
                desc,
                date: eventDate
              });
            });
          }

          if (newPhotosToAdd.length > 0) {
            // Unshift all items to beginning of DB.eventImages
            DB.eventImages.unshift(...newPhotosToAdd);
            saveDatabase(DB);
            renderOurEventsManager(document.getElementById('adminMainContent'));
            showToast(`Successfully added ${newPhotosToAdd.length} photo(s) to Event Gallery!`, 'success');
            return true;
          }
          return false;
        }
      });

      // --- Interactive Multi-Upload Handlers ---
      const dropzone = document.getElementById('m_dropzone');
      const fileInput = document.getElementById('m_multiImgFiles');
      const previewWrapper = document.getElementById('m_multiPreviewWrapper');
      const previewGrid = document.getElementById('m_multiPreviewGrid');
      const countBadge = document.getElementById('m_multiCountBadge');
      const btnClearAll = document.getElementById('m_btnClearAllFiles');

      const btnModeFiles = document.getElementById('btnModeFiles');
      const btnModeUrls = document.getElementById('btnModeUrls');
      const filesSection = document.getElementById('m_filesSection');
      const urlsSection = document.getElementById('m_urlsSection');

      // Mode switching
      btnModeFiles?.addEventListener('click', () => {
        btnModeFiles.classList.add('active');
        btnModeUrls.classList.remove('active');
        if (filesSection) filesSection.style.display = 'block';
        if (urlsSection) urlsSection.style.display = 'none';
      });

      btnModeUrls?.addEventListener('click', () => {
        btnModeUrls.classList.add('active');
        btnModeFiles.classList.remove('active');
        if (urlsSection) urlsSection.style.display = 'block';
        if (filesSection) filesSection.style.display = 'none';
      });

      // Dropzone click & drag
      dropzone?.addEventListener('click', () => fileInput?.click());

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone?.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone?.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('dragover');
        });
      });

      dropzone?.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          handleIncomingFiles(dt.files);
        }
      });

      fileInput?.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleIncomingFiles(e.target.files);
        }
      });

      async function handleIncomingFiles(files) {
        const fileArr = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (!fileArr.length) {
          showToast('Please select valid image files (JPG, PNG, WebP, SVG)', 'warning');
          return;
        }

        showToast(`Processing & optimizing ${fileArr.length} photo(s)...`, 'info');

        for (const file of fileArr) {
          try {
            const compressed = await compressImageFile(file, 1280, 960, 0.82);
            if (compressed && compressed.dataUrl) {
              selectedFilesList.push({
                name: file.name,
                size: (compressed.size / 1024).toFixed(0) + ' KB',
                dataUrl: compressed.dataUrl
              });
            }
          } catch (err) {
            console.warn('Compression error for', file.name, err);
          }
        }

        renderMultiPreviews();
      }

      function renderMultiPreviews() {
        if (!previewWrapper || !previewGrid) return;

        if (selectedFilesList.length === 0) {
          previewWrapper.style.display = 'none';
          previewGrid.innerHTML = '';
          return;
        }

        previewWrapper.style.display = 'block';
        if (countBadge) {
          countBadge.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${selectedFilesList.length} photo(s) selected`;
        }

        previewGrid.innerHTML = selectedFilesList.map((item, idx) => `
          <div class="multi-preview-card" data-idx="${idx}">
            <img src="${item.dataUrl}" alt="${escapeHtml(item.name)}">
            <button type="button" class="multi-preview-remove" data-remove-idx="${idx}" title="Remove this photo">&times;</button>
            <div class="multi-preview-name">${escapeHtml(item.name)}</div>
          </div>
        `).join('');

        // Wire remove buttons
        previewGrid.querySelectorAll('[data-remove-idx]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const removeIdx = parseInt(btn.getAttribute('data-remove-idx'), 10);
            selectedFilesList.splice(removeIdx, 1);
            renderMultiPreviews();
          });
        });
      }

      btnClearAll?.addEventListener('click', () => {
        selectedFilesList = [];
        if (fileInput) fileInput.value = '';
        renderMultiPreviews();
      });
    });

    attachImageCardActions(container);
  }

  function attachImageCardActions(container) {
    // Lightbox preview
    container.querySelectorAll('[data-action="preview-img"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        const title = btn.getAttribute('data-title');
        openGenericModal({
          title: title,
          body: `<div style="text-align:center;"><img src="${escapeHtml(url)}" style="max-width:100%; max-height:60vh; border-radius:8px; object-fit:contain;"></div>`,
          saveText: 'Close',
          onSave: () => true
        });
      });
    });

    // Delete Single Photo
    container.querySelectorAll('[data-action="delete-event-img"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Photo', 'Are you sure you want to remove this photo from the event gallery?', () => {
          DB.eventImages = DB.eventImages.filter(img => img.id !== id);
          saveDatabase(DB);
          renderOurEventsManager(document.getElementById('adminMainContent'));
          showToast('Photo removed', 'danger');
        });
      });
    });

    // Delete Entire Event Album
    container.querySelectorAll('[data-action="delete-event-album"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const eventName = btn.getAttribute('data-event');
        confirmDelete('Delete Event Album', `Are you sure you want to remove all photos under "${eventName}"?`, () => {
          const target = String(eventName || '').trim().toLowerCase();
          DB.eventImages = (DB.eventImages || []).filter(img => {
            const cleanEvt = sanitizePhotoTitle(img.eventName || '', '').trim().toLowerCase();
            const cleanTit = sanitizePhotoTitle(img.title || '', '').trim().toLowerCase();
            const rawEvt = String(img.eventName || '').trim().toLowerCase();
            const rawTit = String(img.title || '').trim().toLowerCase();
            return cleanEvt !== target && cleanTit !== target && rawEvt !== target && rawTit !== target;
          });
          saveDatabase(DB);
          renderOurEventsManager(document.getElementById('adminMainContent'));
          document.querySelector('[data-tab="tab-event-images"]')?.click();
          showToast(`Removed album "${eventName}"`, 'danger');
        });
      });
    });
  }

  function formatAdminVideoEmbedHtml(url) {
    if (!url) return '';
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch) {
      return `<iframe src="https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width: 100%; height: 55vh; border: none; border-radius: 8px;"></iframe>`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/i);
    if (vimeoMatch) {
      return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="width: 100%; height: 55vh; border: none; border-radius: 8px;"></iframe>`;
    }
    return `<video controls autoplay style="width: 100%; max-height: 55vh; object-fit: contain; border-radius: 8px;" src="${escapeHtml(url)}"></video>`;
  }

  function initEventVideosTab(container) {
    // 1. Save Section Header Copy
    container.querySelector('#btnSaveVideoSectionHeader')?.addEventListener('click', () => {
      const badge = document.getElementById('vSecBadge')?.value.trim() || 'Video Showreels';
      const title = document.getElementById('vSecTitle')?.value.trim() || 'High-Energy Event Showcases';
      const desc = document.getElementById('vSecDesc')?.value.trim() || 'Watch our end-to-end technical production, crowd energy, and multi-hub execution films.';
      DB.eventVideosSection = { badge, title, desc };
      saveDatabase(DB);
      showToast('Showcase section header and subtitle copy saved!', 'success');
    });

    // 2. Search & Category Filter
    const vidSearchInput = container.querySelector('#vidSearchInput');
    const vidCategoryFilter = container.querySelector('#vidCategoryFilter');

    function applyVideoFilters() {
      const q = (vidSearchInput?.value || '').toLowerCase().trim();
      const cat = vidCategoryFilter?.value || 'ALL';
      const allVideos = Array.isArray(DB.eventVideos) ? DB.eventVideos : [];

      const filtered = allVideos.filter(v => {
        const matchQ = !q ||
          (v.title || '').toLowerCase().includes(q) ||
          (v.desc || '').toLowerCase().includes(q) ||
          (v.client || '').toLowerCase().includes(q);
        const matchCat = cat === 'ALL' || (v.category || '').toLowerCase() === cat.toLowerCase();
        return matchQ && matchCat;
      });

      const grid = container.querySelector('#eventVideosGrid');
      if (grid) {
        grid.innerHTML = renderEventVideoCards(filtered);
        attachVideoCardActions(container);
      }
    }

    vidSearchInput?.addEventListener('input', applyVideoFilters);
    vidCategoryFilter?.addEventListener('change', applyVideoFilters);

    // 3. Add Video Showreel Button
    container.querySelector('#btnAddEventVideo')?.addEventListener('click', () => {
      openVideoModal(null);
    });

    // 4. Unified Add / Edit Modal Helper
    function openVideoModal(videoToEdit) {
      const isEdit = !!videoToEdit;
      const currentTitle = isEdit ? (videoToEdit.title || '') : '';
      const currentCat = isEdit ? (videoToEdit.category || 'Showreel') : 'Showreel';
      const currentClient = isEdit ? (videoToEdit.client || '') : '';
      const currentDuration = isEdit ? (videoToEdit.duration || '2m 30s') : '2m 30s';
      const currentThumb = isEdit ? (videoToEdit.thumbUrl || '') : 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80';
      const currentUrl = isEdit ? (videoToEdit.videoUrl || '') : 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4';
      const currentDesc = isEdit ? (videoToEdit.desc || '') : '';

      const formHtml = `
        <div class="form-group">
          <label class="form-label">Video Title <span style="color:var(--status-danger);">*</span></label>
          <input type="text" class="form-input" id="m_vTitle" placeholder="e.g. Pan-India Roadshow Highlights" value="${escapeHtml(currentTitle)}" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-select" id="m_vCat">
              <option ${currentCat === 'Showreel' ? 'selected' : ''}>Showreel</option>
              <option ${currentCat === 'Roadshows' ? 'selected' : ''}>Roadshows</option>
              <option ${currentCat === 'Exhibitions' ? 'selected' : ''}>Exhibitions</option>
              <option ${currentCat === 'Conferences' ? 'selected' : ''}>Conferences</option>
              <option ${currentCat === 'Brand Activations' ? 'selected' : ''}>Brand Activations</option>
              <option ${currentCat === 'Offsites' ? 'selected' : ''}>Corporate Offsites</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Client / Brand</label>
            <input type="text" class="form-input" id="m_vClient" placeholder="e.g. Cisco &amp; HP, Intel India" value="${escapeHtml(currentClient)}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Duration</label>
            <input type="text" class="form-input" id="m_vDuration" placeholder="e.g. 2m 45s" value="${escapeHtml(currentDuration)}">
          </div>
          <div class="form-group">
            <label class="form-label">Quick Video Presets</label>
            <select class="form-select" id="m_vPreset">
              <option value="">-- Choose High-Quality Preset --</option>
              <option value="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4" data-thumb="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80">Sunset Sky Horizon (Cinematic 1080p)</option>
              <option value="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43527-large.mp4" data-thumb="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80">Enterprise Tech / Workspace</option>
              <option value="https://assets.mixkit.co/videos/preview/mixkit-corporate-team-working-in-a-modern-office-42408-large.mp4" data-thumb="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80">Corporate Team &amp; Innovation</option>
              <option value="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-jumping-and-having-fun-44754-large.mp4" data-thumb="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80">High-Energy Stage Crowd</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Video Source URL (MP4, WebM, YouTube link, Vimeo) <span style="color:var(--status-danger);">*</span></label>
          <input type="text" class="form-input" id="m_vUrl" placeholder="https://example.com/video.mp4 or YouTube URL" value="${escapeHtml(currentUrl)}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Or Upload Local Video File</label>
          <input type="file" accept="video/mp4,video/webm" class="form-input" id="m_vFileInput" style="padding: 6px 10px;">
          <span id="m_vFileStatus" style="font-size:0.75rem; color:var(--text-muted); margin-top:4px; display:block;"></span>
        </div>

        <div class="form-row">
          <div class="form-group" style="flex: 2;">
            <label class="form-label">Cover Thumbnail Image URL</label>
            <input type="url" class="form-input" id="m_vThumb" placeholder="https://images.unsplash.com/..." value="${escapeHtml(currentThumb)}">
          </div>
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Or Upload Thumbnail</label>
            <input type="file" accept="image/*" class="form-input" id="m_vThumbFile" style="padding: 6px 10px;">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Video Description <span style="color:var(--text-muted); font-size:0.8rem;">(Production details &amp; highlights)</span></label>
          <textarea class="form-textarea" id="m_vDesc" rows="3" placeholder="Key highlights, crowd size, AV execution, or client results...">${escapeHtml(currentDesc)}</textarea>
        </div>
      `;

      openGenericModal({
        title: isEdit ? 'Edit Video Showreel' : 'Add Video Showreel',
        body: formHtml,
        saveText: isEdit ? 'Save Changes' : 'Publish Video',
        onSave: () => {
          const title = document.getElementById('m_vTitle')?.value.trim();
          if (!title) {
            showToast('Video title is required', 'warning');
            return false;
          }
          const videoUrl = document.getElementById('m_vUrl')?.value.trim();
          if (!videoUrl) {
            showToast('Video source URL is required', 'warning');
            return false;
          }
          const category = document.getElementById('m_vCat')?.value || 'Showreel';
          const client = document.getElementById('m_vClient')?.value.trim() || 'EST Brand';
          const duration = document.getElementById('m_vDuration')?.value.trim() || '2m 30s';
          const thumbUrl = document.getElementById('m_vThumb')?.value.trim() || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80';
          const desc = document.getElementById('m_vDesc')?.value.trim();

          if (!Array.isArray(DB.eventVideos)) {
            DB.eventVideos = [];
          }

          if (isEdit) {
            const idx = DB.eventVideos.findIndex(v => v.id === videoToEdit.id);
            if (idx !== -1) {
              DB.eventVideos[idx] = {
                ...videoToEdit,
                title,
                category,
                client,
                duration,
                thumbUrl,
                videoUrl,
                desc,
                lastUpdated: new Date().toISOString().split('T')[0]
              };
            }
            showToast(`Updated video showreel "${title}"`, 'success');
          } else {
            DB.eventVideos.unshift({
              id: 'ev_' + Date.now().toString().slice(-6),
              title,
              category,
              client,
              duration,
              thumbUrl,
              videoUrl,
              desc,
              date: new Date().toISOString().split('T')[0]
            });
            showToast(`Published video showreel "${title}"`, 'success');
          }

          saveDatabase(DB);
          renderOurEventsManager(document.getElementById('adminMainContent'));
          document.querySelector('[data-tab="tab-event-videos"]')?.click();
          return true;
        }
      });

      // Hook modal inputs (presets, local files)
      setTimeout(() => {
        const presetEl = document.getElementById('m_vPreset');
        const urlInput = document.getElementById('m_vUrl');
        const thumbInput = document.getElementById('m_vThumb');
        const fileInput = document.getElementById('m_vFileInput');
        const thumbFileInput = document.getElementById('m_vThumbFile');
        const statusEl = document.getElementById('m_vFileStatus');

        presetEl?.addEventListener('change', () => {
          if (presetEl.value) {
            if (urlInput) urlInput.value = presetEl.value;
            const selectedOpt = presetEl.options[presetEl.selectedIndex];
            const thumb = selectedOpt?.getAttribute('data-thumb');
            if (thumb && thumbInput) thumbInput.value = thumb;
          }
        });

        fileInput?.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (file.size > 25 * 1024 * 1024) {
            const blobUrl = URL.createObjectURL(file);
            if (urlInput) urlInput.value = blobUrl;
            if (statusEl) statusEl.textContent = `Local video linked: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
          } else {
            const reader = new FileReader();
            reader.onload = (re) => {
              if (urlInput) urlInput.value = re.target.result;
              if (statusEl) statusEl.textContent = `Local video converted: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
            };
            reader.readAsDataURL(file);
          }
        });

        thumbFileInput?.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (re) => {
            if (thumbInput) thumbInput.value = re.target.result;
          };
          reader.readAsDataURL(file);
        });
      }, 50);
    }

    // 5. Attach Card Actions (Watch, Edit, Delete)
    attachVideoCardActions(container);

    // 6. Clear All Videos
    container.querySelector('#btnClearAllEventVideos')?.addEventListener('click', () => {
      confirmDelete('Delete All Videos', 'Are you sure you want to permanently delete all video showreels? This cannot be undone.', () => {
        DB.eventVideos = [];
        saveDatabase(DB);
        renderOurEventsManager(document.getElementById('adminMainContent'));
        document.querySelector('[data-tab="tab-event-videos"]')?.click();
        showToast('All event video showreels removed', 'danger');
      });
    });

    function attachVideoCardActions(parent) {
      // Play Video
      parent.querySelectorAll('[data-action="play-event-vid"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const url = btn.getAttribute('data-url');
          const title = btn.getAttribute('data-title');
          openGenericModal({
            title: title || 'Video Preview',
            body: `
              <div style="background:#000; border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                ${formatAdminVideoEmbedHtml(url)}
              </div>
            `,
            saveText: 'Close',
            onSave: () => true
          });
        });
      });

      // Edit Video
      parent.querySelectorAll('[data-action="edit-event-vid"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          const vid = (DB.eventVideos || []).find(v => v.id === id);
          if (vid) {
            openVideoModal(vid);
          }
        });
      });

      // Delete Video
      parent.querySelectorAll('[data-action="delete-event-vid"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          confirmDelete('Delete Video Showreel', 'Are you sure you want to remove this video showreel?', () => {
            DB.eventVideos = (DB.eventVideos || []).filter(v => v.id !== id);
            saveDatabase(DB);
            renderOurEventsManager(document.getElementById('adminMainContent'));
            document.querySelector('[data-tab="tab-event-videos"]')?.click();
            showToast('Video showreel removed', 'danger');
          });
        });
      });
    }
  }

  // =========================================================================
  // VIEW: DASHBOARD (Matching the user screenshot + live KPIs)
  // =========================================================================
  function renderDashboard(container) {
    const totalClients = DB.clients.length;
    const totalServices = DB.services.length;
    const totalCaseStudies = (DB.caseStudies || []).length;
    const totalInsights = (DB.insightClusters || []).length;
    const totalEvents = (DB.events || []).length;
    const upcomingEvents = (DB.events || []).filter(e => (e.status || '').toLowerCase() === 'upcoming').length;
    const totalRegs = (DB.eventRegistrations || []).length;
    const avgRating = ((DB.clientFeedbacks || []).reduce((acc, f) => acc + (f.rating || 5), 0) / (DB.clientFeedbacks?.length || 1)).toFixed(1);

    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Dashboard</h1>
            <p class="view-subtitle">EST Brand Services &bull; Enterprise Marketing & Activations CMS</p>
          </div>
        </div>

        <!-- Welcome Admin Banner Card (Exactly matching screenshot) -->
        <div class="welcome-card">
          <div class="welcome-profile-info">
            <div class="welcome-avatar">A</div>
            <div class="welcome-text">
              <h3>Welcome</h3>
              <p>Admin</p>
            </div>
          </div>
          <button class="btn-signout" id="btnSignOut">
            <i class="bi bi-box-arrow-right"></i> Sign out
          </button>
        </div>

        <!-- KPI Metrics Grid -->
        <div class="stats-grid">
          <div class="stat-card" onclick="window.adminApp.switchView('case-studies')">
            <div class="stat-info">
              <span class="stat-label">Case Studies</span>
              <span class="stat-value">${totalCaseStudies}</span>
              <span class="stat-trend trend-up"><i class="bi bi-briefcase-fill" style="color: var(--color-primary);"></i> Top Deployments</span>
            </div>
            <div class="stat-icon-wrapper">
              <i class="bi bi-briefcase-fill"></i>
            </div>
          </div>

          <div class="stat-card" onclick="window.adminApp.switchView('insights')">
            <div class="stat-info">
              <span class="stat-label">Insights Hubs</span>
              <span class="stat-value">${totalInsights}</span>
              <span class="stat-trend trend-up"><i class="bi bi-lightbulb-fill" style="color: #f59e0b;"></i> Strategy Clusters</span>
            </div>
            <div class="stat-icon-wrapper stat-icon-yellow">
              <i class="bi bi-lightbulb-fill"></i>
            </div>
          </div>

          <div class="stat-card" onclick="window.adminApp.switchView('clients')">
            <div class="stat-info">
              <span class="stat-label">Enterprise Clients</span>
              <span class="stat-value">${totalClients}</span>
              <span class="stat-trend trend-up"><i class="bi bi-arrow-up-short"></i> +3 new this quarter</span>
            </div>
            <div class="stat-icon-wrapper">
              <i class="bi bi-people-fill"></i>
            </div>
          </div>

          <div class="stat-card" onclick="window.adminApp.switchView('events')">
            <div class="stat-info">
              <span class="stat-label">Total Events</span>
              <span class="stat-value">${totalEvents}</span>
              <span class="stat-trend trend-up"><i class="bi bi-check2-circle"></i> ${upcomingEvents} Upcoming</span>
            </div>
            <div class="stat-icon-wrapper stat-icon-accent">
              <i class="bi bi-calendar2-event-fill"></i>
            </div>
          </div>

          <div class="stat-card" onclick="window.adminApp.switchView('client-feedbacks')">
            <div class="stat-info">
              <span class="stat-label">Client Satisfaction</span>
              <span class="stat-value">${avgRating} / 5.0</span>
              <span class="stat-trend trend-up"><i class="bi bi-star-fill" style="color:#f59e0b"></i> 100% Recommended</span>
            </div>
            <div class="stat-icon-wrapper stat-icon-yellow">
              <i class="bi bi-chat-heart-fill"></i>
            </div>
          </div>
        </div>

        <!-- Quick Activity & Modules Overview -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          <!-- Recent Registrations -->
          <div class="data-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <h3 style="font-size: 1.1rem; font-weight: 600; color: #fff;"><i class="bi bi-lightning-charge-fill" style="color: var(--color-primary); margin-right: 8px;"></i>Recent Event Registrations</h3>
              <button class="btn-outline" style="font-size: 0.75rem; padding: 4px 10px;" onclick="window.adminApp.switchView('event-registrations')">View All</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${DB.eventRegistrations.slice(0, 4).map(reg => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #0c101a; border-radius: 8px; border: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-weight: 600; color: #fff; font-size: 0.9rem;">${escapeHtml(reg.name)}</div>
                    <div style="font-size: 0.775rem; color: var(--text-muted);">${escapeHtml(reg.company)} &bull; ${escapeHtml(reg.ticketType)}</div>
                  </div>
                  <span class="badge ${reg.checkIn === 'Confirmed' ? 'badge-confirmed' : 'badge-pending'}">${escapeHtml(reg.checkIn)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Quick Navigation Shortcuts -->
          <div class="data-card" style="padding: 20px;">
            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 1.1rem; font-weight: 600; color: #fff;"><i class="bi bi-grid-fill" style="color: var(--color-accent); margin-right: 8px;"></i>Direct CMS Modules</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted);">Directly publish & manage live website content</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button class="header-btn" style="justify-content: flex-start; padding: 12px;" onclick="window.adminApp.switchView('case-studies')">
                <i class="bi bi-briefcase" style="color: var(--color-primary);"></i> Case Studies
              </button>
              <button class="header-btn" style="justify-content: flex-start; padding: 12px;" onclick="window.adminApp.switchView('insights')">
                <i class="bi bi-lightbulb" style="color: #f59e0b;"></i> Insights Hubs
              </button>
              <button class="header-btn" style="justify-content: flex-start; padding: 12px;" onclick="window.adminApp.switchView('clients')">
                <i class="bi bi-people" style="color: var(--status-info);"></i> Clients Directory
              </button>
              <button class="header-btn" style="justify-content: flex-start; padding: 12px;" onclick="window.adminApp.switchView('services')">
                <i class="bi bi-layers" style="color: var(--color-accent);"></i> Services CMS
              </button>
              <button class="header-btn" style="justify-content: flex-start; padding: 12px;" onclick="window.adminApp.switchView('our-works')">
                <i class="bi bi-briefcase-fill" style="color: #ec4899;"></i> Our Works Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnSignOut')?.addEventListener('click', () => {
      openSignOutModal();
    });
  }

  // =========================================================================
  // VIEW: OUR CLIENTS
  // =========================================================================
  const EXISTING_CLIENT_LOGOS = [
    { name: "ACPL Systems", url: "storage/clients/all-logos/01JZT7BZXA4VA77AJE5S3FGNK9.jpg" },
    { name: "Adobe", url: "storage/clients/all-logos/01JZT7DKZPCEVYQ49KXZ72W0DN.jpg" },
    { name: "AMD", url: "storage/clients/all-logos/01JZT7E9X8WE3FAG84PMENQYW7.jpg" },
    { name: "AVEDA", url: "storage/clients/all-logos/01JZT7FXEK89XNP9QHDRM9HDQA.jpg" },
    { name: "BenQ", url: "storage/clients/all-logos/01JZT7GHG1FG4GHCAY441MGQRE.jpg" },
    { name: "Brigade Group", url: "storage/clients/all-logos/01JZT7H8NRXQ34NZ7Y9NSCAM8T.jpg" },
    { name: "Builder.ai", url: "storage/clients/all-logos/01JZT7J7WDT0YFT6W8FJ9E0Z6V.jpg" },
    { name: "CAST Software", url: "storage/clients/all-logos/01JZT7K0CH1NW2F3CKBNRPW48D.jpg" },
    { name: "Croma", url: "storage/clients/all-logos/01JZT7KN0BE99VDQ32KKP195T0.jpg" },
    { name: "Elekore", url: "storage/clients/all-logos/01JZT7MBTFNKPYNB20TZKSPF1X.jpg" },
    { name: "Embee Software", url: "storage/clients/all-logos/01JZT7NEVMSY3JK82A65X5BMZF.jpg" },
    { name: "Eros Group", url: "storage/clients/all-logos/01JZT7P6KV6JCS3E7RBGDCRGPW.jpg" },
    { name: "Softline", url: "storage/clients/all-logos/01JZT7RWJABEVAZDF71CR2NDRG.jpg" },
    { name: "GAP", url: "storage/clients/all-logos/01JZT7SK5P2PMBT0KFRHYKK637.jpg" },
    { name: "Harvest Gold", url: "storage/clients/all-logos/01JZT7T80Y7H2JKCT170BH1AH9.jpg" },
    { name: "Moët Hennessy", url: "storage/clients/all-logos/01JZT7VQWBT95S84FXR88CTGFE.jpg" },
    { name: "Kingfisher", url: "storage/clients/all-logos/01JZT7WF76VXZHB4GG7P45V92M.jpg" },
    { name: "Lighthouse Canton", url: "storage/clients/all-logos/01JZT7YSVGN5FDXAH4GJ79FK3Z.jpg" },
    { name: "Mother Dairy", url: "storage/clients/all-logos/01JZT7ZNEHHZWXDKF4EKQ5RZ9C.jpg" },
    { name: "Neovantage Innovation Parks", url: "storage/clients/all-logos/01JZT80FCSTB105P5C67VAGXJW.jpg" },
    { name: "Noventiq", url: "storage/clients/all-logos/01JZT81GDVN0MCC8EA7CZEKTQ4.jpg" },
    { name: "Puravankara", url: "storage/clients/all-logos/01JZT827C4AVD8Y2AYD2BAXHFC.jpg" },
    { name: "Quess Corp", url: "storage/clients/all-logos/01JZT82YYDAQZB9Y6CDHQVC0DB.jpg" },
    { name: "Savex Technologies", url: "storage/clients/all-logos/01JZT83NV8Z8P2S3FEN4N3J56H.jpg" },
    { name: "Sephora", url: "storage/clients/all-logos/01JZT85CC1MZWCB0CNKGE7QKHT.jpg" },
    { name: "Shalimar Paints", url: "storage/clients/all-logos/01JZT865DQ6G2WK9FJH8E16RM7.jpg" },
    { name: "Siemens", url: "storage/clients/all-logos/01JZT86X7SDV30D6NGF4G42S4G.jpg" },
    { name: "Taylor & Francis Group", url: "storage/clients/all-logos/01JZT87JQVNA4D8MYQCKG8RT2V.jpg" },
    { name: "Tech Data", url: "storage/clients/all-logos/01JZT88F4AED61YS8PCWGDY9J6.jpg" },
    { name: "Umbrella Infocare", url: "storage/clients/all-logos/01JZT89479VPRSW9BFHX9DJETC.jpg" },
    { name: "Varchas Spirits", url: "storage/clients/all-logos/01JZT89SQHE0RJT87RK952PTD7.jpg" },
    { name: "Western Digital", url: "storage/clients/all-logos/01JZT8ADQ14TWK41XRBWP0KXTR.jpg" }
  ];

  function renderClients(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Our Clients</h1>
            <p class="view-subtitle">Manage enterprise brand partners, logos, and collaboration records across the website</p>
          </div>
          <button class="btn-add" id="btnAddClient"><i class="bi bi-plus-lg"></i> Add New Client</button>
        </div>

        <div class="table-toolbar">
          <div class="search-filter-group">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input type="text" class="search-input" id="clientSearch" placeholder="Search clients by name, category...">
            </div>
            <select class="filter-select" id="clientFilter">
              <option value="ALL">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Enterprise IT">Enterprise IT</option>
              <option value="Hardware & Print">Hardware & Print</option>
              <option value="Consumer & Retail">Consumer & Retail</option>
              <option value="Real Estate & Infrastructure">Real Estate & Infrastructure</option>
              <option value="BFSI">BFSI</option>
              <option value="FMCG & Beverages">FMCG & Beverages</option>
              <option value="Energy & Infrastructure">Energy & Infrastructure</option>
            </select>
          </div>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${DB.clients.length} Clients Registered</span>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Client Brand & Logo</th>
                  <th>Industry Category</th>
                  <th>Partner Since</th>
                  <th>Projects Executed</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody id="clientsTableBody">
                ${renderClientsRows(DB.clients)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Search and Filter Listeners
    const searchInput = document.getElementById('clientSearch');
    const filterSelect = document.getElementById('clientFilter');

    const updateFilter = () => {
      const q = searchInput.value.toLowerCase().trim();
      const cat = filterSelect.value;
      const filtered = DB.clients.filter(c => {
        const matchesQ = (c.name || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q);
        const matchesCat = cat === 'ALL' || c.category === cat;
        return matchesQ && matchesCat;
      });
      document.getElementById('clientsTableBody').innerHTML = renderClientsRows(filtered);
      attachClientActions();
    };

    searchInput?.addEventListener('input', updateFilter);
    filterSelect?.addEventListener('change', updateFilter);

    document.getElementById('btnAddClient')?.addEventListener('click', () => {
      openClientModal();
    });

    attachClientActions();
  }

  function renderClientsRows(clients) {
    if (clients.length === 0) {
      return `<tr><td colspan="6" style="text-align:center; padding: 32px; color: var(--text-muted);">No client records found.</td></tr>`;
    }
    return clients.map(c => `
      <tr data-id="${c.id}">
        <td>
          <div class="table-entity">
            <div class="table-avatar-fallback" style="background: rgba(255,255,255,0.06); width: 50px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
              ${c.logoUrl ? `<img src="${escapeHtml(c.logoUrl)}" alt="${escapeHtml(c.name)}" style="max-height: 28px; max-width: 42px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling ? this.nextElementSibling.style.display='block' : null;"><span style="display:none; font-size:0.75rem; font-weight:700;">${escapeHtml((c.name || 'CL').substring(0, 2).toUpperCase())}</span>` : `<span style="font-size:0.75rem; font-weight:700;">${escapeHtml((c.name || 'CL').substring(0, 2).toUpperCase())}</span>`}
            </div>
            <div>
              <div class="entity-info-primary">${escapeHtml(c.name)}</div>
              <div class="entity-info-sub">ID: ${escapeHtml(c.id)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-category">${escapeHtml(c.category || 'General')}</span></td>
        <td>${escapeHtml(c.partnershipYear || '2026')}</td>
        <td><strong>${escapeHtml((c.projectsCount || 0).toString())}</strong> activations</td>
        <td><span class="badge ${c.status === 'Active' ? 'badge-active' : 'badge-draft'}">${escapeHtml(c.status || 'Active')}</span></td>
        <td style="text-align: right;">
          <div class="action-btns" style="justify-content: flex-end;">
            <button class="btn-icon btn-edit" title="Edit Client" data-action="edit-client" data-id="${c.id}"><i class="bi bi-pencil-fill"></i></button>
            <button class="btn-icon btn-delete" title="Delete Client" data-action="delete-client" data-id="${c.id}"><i class="bi bi-trash-fill"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function attachClientActions() {
    document.querySelectorAll('[data-action="edit-client"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = DB.clients.find(c => c.id === id);
        if (item) openClientModal(item);
      });
    });

    document.querySelectorAll('[data-action="delete-client"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Client', 'Are you sure you want to delete this enterprise client from the database and public site?', () => {
          DB.clients = DB.clients.filter(c => c.id !== id);
          saveDatabase(DB);
          renderClients(document.getElementById('adminMainContent'));
          showToast('Client deleted successfully', 'danger');
        });
      });
    });
  }

  function openClientModal(client = null) {
    const isEdit = !!client;
    const currentLogo = isEdit ? (client.logoUrl || '') : '';
    const presetOptionsHtml = EXISTING_CLIENT_LOGOS.map(p => `
      <option value="${escapeHtml(p.url)}" ${currentLogo === p.url ? 'selected' : ''}>${escapeHtml(p.name)} (${escapeHtml(p.url.split('/').pop())})</option>
    `).join('');

    const formHtml = `
      <div class="form-group">
        <label class="form-label">Client / Brand Name <span style="color:var(--color-primary);">*</span></label>
        <input type="text" class="form-input" id="m_clientName" value="${isEdit ? escapeHtml(client.name) : ''}" placeholder="e.g. Adobe India" required>
      </div>

      <div class="form-group">
        <label class="form-label">Brand Logo</label>
        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
          <div id="m_clientLogoPreviewBox" style="width: 80px; height: 56px; border-radius: 8px; border: 1px solid var(--border-color); background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 4px;">
            ${currentLogo ? `<img src="${escapeHtml(currentLogo)}" style="max-height: 48px; max-width: 72px; object-fit: contain;">` : `<span style="font-size: 0.72rem; color: var(--text-muted);">No Logo</span>`}
          </div>
          <div style="flex: 1;">
            <input type="text" class="form-input" id="m_clientLogoUrl" value="${escapeHtml(currentLogo)}" placeholder="storage/clients/all-logos/... or https://..." style="margin-bottom: 6px;">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <label class="btn-secondary" style="cursor: pointer; font-size: 0.76rem; padding: 5px 10px; display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; margin: 0; background: rgba(255,255,255,0.06); border: 1px solid var(--border-color);">
                <i class="bi bi-upload"></i> Upload Logo
                <input type="file" id="m_clientLogoFile" accept="image/*" style="display: none;">
              </label>
              <select class="form-select" id="m_clientLogoPreset" style="font-size: 0.76rem; padding: 4px 8px; flex: 1; min-width: 170px;">
                <option value="">-- Or Choose Existing Logo --</option>
                ${presetOptionsHtml}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="m_clientCategory">
            <option ${isEdit && client.category === 'Technology' ? 'selected' : ''}>Technology</option>
            <option ${isEdit && client.category === 'Enterprise IT' ? 'selected' : ''}>Enterprise IT</option>
            <option ${isEdit && client.category === 'Hardware & Print' ? 'selected' : ''}>Hardware & Print</option>
            <option ${isEdit && client.category === 'Consumer & Retail' ? 'selected' : ''}>Consumer & Retail</option>
            <option ${isEdit && client.category === 'Real Estate & Infrastructure' ? 'selected' : ''}>Real Estate & Infrastructure</option>
            <option ${isEdit && client.category === 'BFSI' ? 'selected' : ''}>BFSI</option>
            <option ${isEdit && client.category === 'FMCG & Beverages' ? 'selected' : ''}>FMCG & Beverages</option>
            <option ${isEdit && client.category === 'Energy & Infrastructure' ? 'selected' : ''}>Energy & Infrastructure</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Partnership Year</label>
          <input type="text" class="form-input" id="m_clientYear" value="${isEdit ? escapeHtml(client.partnershipYear || '2026') : '2026'}" placeholder="2026">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Projects Executed</label>
          <input type="number" class="form-input" id="m_clientProjects" value="${isEdit ? (client.projectsCount || 1) : '1'}" min="0">
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-select" id="m_clientStatus">
            <option ${!isEdit || client.status === 'Active' ? 'selected' : ''}>Active</option>
            <option ${isEdit && client.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
      </div>
    `;

    openGenericModal({
      title: isEdit ? 'Edit Client Record' : 'Add New Client Brand',
      body: formHtml,
      saveText: isEdit ? 'Save Changes' : 'Create Client',
      onSave: () => {
        const name = document.getElementById('m_clientName').value.trim();
        if (!name) {
          showToast('Please enter a valid client name', 'warning');
          return false;
        }

        const logoUrl = document.getElementById('m_clientLogoUrl')?.value.trim() || '';
        const category = document.getElementById('m_clientCategory').value;
        const year = document.getElementById('m_clientYear').value || '2026';
        const projects = parseInt(document.getElementById('m_clientProjects').value || '1', 10);
        const status = document.getElementById('m_clientStatus').value;

        if (isEdit) {
          client.name = name;
          client.logoUrl = logoUrl;
          client.category = category;
          client.partnershipYear = year;
          client.projectsCount = projects;
          client.status = status;
          showToast(`Client "${name}" updated`, 'success');
        } else {
          const newId = 'c_' + Date.now().toString().slice(-5);
          DB.clients.unshift({
            id: newId,
            name,
            category,
            partnershipYear: year,
            logoUrl,
            projectsCount: projects,
            status
          });
          showToast(`New client "${name}" created`, 'success');
        }

        saveDatabase(DB);
        renderClients(document.getElementById('adminMainContent'));
        return true;
      }
    });

    // Wire up modal interactivity
    setTimeout(() => {
      const urlInput = document.getElementById('m_clientLogoUrl');
      const fileInput = document.getElementById('m_clientLogoFile');
      const presetSelect = document.getElementById('m_clientLogoPreset');
      const previewBox = document.getElementById('m_clientLogoPreviewBox');

      const updatePreview = (url) => {
        if (!previewBox) return;
        if (url && url.trim()) {
          previewBox.innerHTML = `<img src="${escapeHtml(url.trim())}" style="max-height: 48px; max-width: 72px; object-fit: contain;" onerror="this.parentElement.innerHTML='<span style=\\'font-size:0.7rem;color:var(--text-muted);\\'>Invalid</span>';">`;
        } else {
          previewBox.innerHTML = `<span style="font-size: 0.72rem; color: var(--text-muted);">No Logo</span>`;
        }
      };

      urlInput?.addEventListener('input', (e) => updatePreview(e.target.value));

      presetSelect?.addEventListener('change', (e) => {
        if (e.target.value) {
          if (urlInput) urlInput.value = e.target.value;
          updatePreview(e.target.value);
        }
      });

      fileInput?.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const res = await compressImageFile(file, 500, 250, 0.85);
          if (res && res.dataUrl) {
            if (urlInput) urlInput.value = res.dataUrl;
            updatePreview(res.dataUrl);
            showToast('Logo uploaded and compressed', 'success');
          }
        }
      });
    }, 40);
  }

  // =========================================================================
  // VIEW: SERVICES
  // =========================================================================
  function renderServices(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Services</h1>
            <p class="view-subtitle">Core B2B marketing & experiential solution offerings</p>
          </div>
          <button class="btn-add" id="btnAddService"><i class="bi bi-plus-lg"></i> Add New Service</button>
        </div>

        <div class="cards-grid">
          ${DB.services.map(s => `
            <div class="item-card">
              <div>
                <div class="item-card-header">
                  <div class="item-card-icon"><i class="bi ${s.icon}"></i></div>
                  <span class="badge ${s.status === 'Active' ? 'badge-active' : 'badge-draft'}">${s.status}</span>
                </div>
                <h3 class="item-card-title">${escapeHtml(s.title)}</h3>
                <p class="item-card-desc">${escapeHtml(s.desc)}</p>
                <div style="font-size: 0.775rem; color: var(--text-dim); margin-bottom: 12px;">
                  <i class="bi bi-link-45deg"></i> <code>services/${escapeHtml(s.slug)}</code>
                </div>
              </div>
              <div class="item-card-footer">
                <a href="services/${escapeHtml(s.slug)}" target="_blank" class="btn-outline" style="font-size: 0.775rem; padding: 4px 10px;">
                  <i class="bi bi-box-arrow-up-right"></i> View Page
                </a>
                <div class="action-btns">
                  <button class="btn-icon btn-edit" title="Edit" data-action="edit-service" data-id="${s.id}"><i class="bi bi-pencil-fill"></i></button>
                  <button class="btn-icon btn-delete" title="Delete" data-action="delete-service" data-id="${s.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('btnAddService')?.addEventListener('click', () => {
      openServiceModal();
    });

    document.querySelectorAll('[data-action="edit-service"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const s = DB.services.find(item => item.id === id);
        if (s) openServiceModal(s);
      });
    });

    document.querySelectorAll('[data-action="delete-service"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Service', 'Are you sure you want to remove this service offering?', () => {
          DB.services = DB.services.filter(s => s.id !== id);
          saveDatabase(DB);
          renderServices(document.getElementById('adminMainContent'));
          showToast('Service removed', 'danger');
        });
      });
    });
  }

  function openServiceModal(service = null) {
    const isEdit = !!service;
    const formHtml = `
      <div class="form-group">
        <label class="form-label">Service Title</label>
        <input type="text" class="form-input" id="m_servTitle" value="${isEdit ? escapeHtml(service.title) : ''}" placeholder="e.g. AI-Powered Experiential Zones" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" class="form-input" id="m_servCategory" value="${isEdit ? escapeHtml(service.category) : 'Experiential'}" placeholder="Category">
        </div>
        <div class="form-group">
          <label class="form-label">Bootstrap Icon Class</label>
          <input type="text" class="form-input" id="m_servIcon" value="${isEdit ? escapeHtml(service.icon) : 'bi-stars'}" placeholder="bi-stars">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">HTML File Name / Slug</label>
        <input type="text" class="form-input" id="m_servSlug" value="${isEdit ? escapeHtml(service.slug) : 'custom-service.html'}" placeholder="custom-service.html">
      </div>
      <div class="form-group">
        <label class="form-label">Short Description</label>
        <textarea class="form-textarea" id="m_servDesc" placeholder="Describe the service offering...">${isEdit ? escapeHtml(service.desc) : ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="m_servStatus">
          <option ${isEdit && service.status === 'Active' ? 'selected' : ''}>Active</option>
          <option ${isEdit && service.status === 'Draft' ? 'selected' : ''}>Draft</option>
        </select>
      </div>
    `;

    openGenericModal({
      title: isEdit ? 'Edit Service' : 'Add New Service Offering',
      body: formHtml,
      saveText: isEdit ? 'Save Service' : 'Create Service',
      onSave: () => {
        const title = document.getElementById('m_servTitle').value.trim();
        if (!title) {
          showToast('Service title is required', 'warning');
          return false;
        }
        const category = document.getElementById('m_servCategory').value.trim() || 'Experiential';
        const icon = document.getElementById('m_servIcon').value.trim() || 'bi-stars';
        const slug = document.getElementById('m_servSlug').value.trim() || 'service.html';
        const desc = document.getElementById('m_servDesc').value.trim();
        const status = document.getElementById('m_servStatus').value;

        if (isEdit) {
          service.title = title;
          service.category = category;
          service.icon = icon;
          service.slug = slug;
          service.desc = desc;
          service.status = status;
          showToast(`Service "${title}" updated`, 'success');
        } else {
          DB.services.push({
            id: 's_' + Date.now().toString().slice(-5),
            title,
            category,
            icon,
            slug,
            desc,
            status
          });
          showToast(`New service "${title}" created`, 'success');
        }

        saveDatabase(DB);
        renderServices(document.getElementById('adminMainContent'));
        return true;
      }
    });
  }

  // =========================================================================
  // VIEW: CASE STUDIES
  // =========================================================================
  function renderCaseStudies(container) {
    if (!Array.isArray(DB.caseStudies)) DB.caseStudies = [];

    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Featured Experiences & Case Studies</h1>
            <p class="view-subtitle">Manage homepage bento experiences, client success stories, strategy-execution breakdowns, and metrics live.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <a href="index.html#showcase" target="_blank" class="header-btn" style="background: rgba(0, 240, 255, 0.15); border-color: var(--color-accent); color: #fff;">
              <i class="bi bi-eye"></i> <span>View Homepage Bento</span>
            </a>
            <a href="case-studies.html" target="_blank" class="header-btn" style="background: rgba(254, 59, 32, 0.15); border-color: var(--color-primary); color: #fff;">
              <i class="bi bi-box-arrow-up-right"></i> <span>View Live Case Studies</span>
            </a>
            <button class="btn-outline" id="btnClearAllCaseStudies" style="color: var(--status-danger); border-color: rgba(239, 68, 68, 0.4);" ${DB.caseStudies.length === 0 ? "disabled" : ""}><i class="bi bi-trash-fill"></i> Delete All Experiences (${DB.caseStudies.length})</button>
            <button class="btn-add" id="btnAddCaseStudy"><i class="bi bi-plus-lg"></i> Add Experience</button>
          </div>
        </div>

        <div class="stats-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Deployments</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: #fff; margin-top: 4px;">${DB.caseStudies.length}</div>
          </div>
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Published Live</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: var(--status-success); margin-top: 4px;">${DB.caseStudies.filter(c => c.status === 'Published').length}</div>
          </div>
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Unique Categories</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: var(--color-accent); margin-top: 4px;">
              ${new Set(DB.caseStudies.map(c => c.category)).size}
            </div>
          </div>
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Draft Stories</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: #f59e0b; margin-top: 4px;">${DB.caseStudies.filter(c => c.status === 'Draft').length}</div>
          </div>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th style="width: 80px;">Cover</th>
                  <th>Client & Project Title</th>
                  <th>Category</th>
                  <th>Key Metrics</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${DB.caseStudies.map(c => `
                  <tr>
                    <td>
                      <div style="width: 70px; height: 48px; border-radius: 6px; overflow: hidden; background: #161b28; border: 1px solid var(--border-card);">
                        <img src="${escapeHtml(c.coverImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=300')}" alt="${escapeHtml(c.title)}" style="width: 100%; height: 100%; object-fit: cover;">
                      </div>
                    </td>
                    <td style="max-width: 300px;">
                      <div class="entity-info-primary" style="font-weight: 600; color: #fff;">
                        ${escapeHtml(c.client)} <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 400;">(${escapeHtml(c.industry || 'Technology')})</span>
                      </div>
                      <div class="entity-info-sub" style="font-size: 0.82rem; color: var(--text-muted); margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                        ${escapeHtml(c.title)}
                      </div>
                    </td>
                    <td><span class="badge badge-category">${escapeHtml(c.category)}</span></td>
                    <td>
                      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <span style="background: rgba(254, 59, 32, 0.12); color: var(--color-primary); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${escapeHtml(c.metric1Value || '-')} ${escapeHtml(c.metric1Label || '')}</span>
                        ${c.metric2Value ? `<span style="background: rgba(12, 188, 161, 0.12); color: var(--color-accent); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${escapeHtml(c.metric2Value)} ${escapeHtml(c.metric2Label || '')}</span>` : ''}
                      </div>
                    </td>
                    <td style="font-size: 0.85rem;">${escapeHtml(c.date || '-')}</td>
                    <td><span class="badge ${c.status === 'Published' ? 'badge-published' : 'badge-draft'}">${escapeHtml(c.status)}</span></td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <a href="case-studies.html#${c.id}" target="_blank" class="btn-icon" title="View Live" style="color: var(--color-accent);"><i class="bi bi-box-arrow-up-right"></i></a>
                        <button class="btn-icon btn-edit" title="Edit" data-action="edit-case-study" data-id="${c.id}"><i class="bi bi-pencil-fill"></i></button>
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-case-study" data-id="${c.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnAddCaseStudy')?.addEventListener('click', () => {
      openCaseStudyModal();
    });

    document.querySelectorAll('[data-action="edit-case-study"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const c = DB.caseStudies.find(item => item.id === id);
        if (c) openCaseStudyModal(c);
      });
    });

    document.querySelectorAll('[data-action="delete-case-study"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Case Study', 'Are you sure you want to remove this case study? It will be removed live from the website.', () => {
          DB.caseStudies = (DB.caseStudies || []).filter(c => c.id !== id);
          saveDatabase(DB);
          renderCaseStudies(document.getElementById('adminMainContent'));
          showToast('Case study removed successfully', 'danger');
        });
      });
    });

    document.getElementById('btnClearAllCaseStudies')?.addEventListener('click', () => {
      confirmDelete('Delete All Experiences', 'Are you sure you want to permanently delete all case studies and featured experiences? This cannot be undone.', () => {
        DB.caseStudies = [];
        saveDatabase(DB);
        renderCaseStudies(document.getElementById('adminMainContent'));
        showToast('All featured experiences removed', 'danger');
      });
    });
  }

  function openCaseStudyModal(study = null) {
    const isEdit = !!study;
    const defaultCover = study?.coverImage || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000';
    
    const formHtml = `
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Client Name <span style="color: var(--color-primary);">*</span></label>
          <input type="text" class="form-input" id="m_csClient" list="m_csClientDatalist" value="${isEdit ? escapeHtml(study.client) : ''}" placeholder="e.g. Adobe Systems" required>
          <datalist id="m_csClientDatalist">
            ${(DB.clients || []).map(cl => `<option value="${escapeHtml(cl.name)}">${escapeHtml(cl.category || '')}</option>`).join('')}
          </datalist>
        </div>
        <div class="form-group">
          <label class="form-label">Industry / Sector</label>
          <input type="text" class="form-input" id="m_csIndustry" value="${isEdit ? escapeHtml(study.industry || 'Technology & Design') : 'Technology & Design'}" placeholder="e.g. Technology & Design">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Case Study Title <span style="color: var(--color-primary);">*</span></label>
        <input type="text" class="form-input" id="m_csTitle" value="${isEdit ? escapeHtml(study.title) : ''}" placeholder="e.g. Workspace Transformation & Experiential Innovation Zones" required>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="m_csCategorySelect" onchange="if(this.value==='__custom__'){document.getElementById('m_csCategoryCustom').style.display='block';}else{document.getElementById('m_csCategoryCustom').style.display='none';document.getElementById('m_csCategoryCustom').value=this.value;}">
            <option value="Corporate Branding" ${isEdit && study.category === 'Corporate Branding' ? 'selected' : ''}>Corporate Branding</option>
            <option value="Conferences & AV" ${isEdit && study.category === 'Conferences & AV' ? 'selected' : ''}>Conferences & AV</option>
            <option value="Demand Generation" ${isEdit && study.category === 'Demand Generation' ? 'selected' : ''}>Demand Generation</option>
            <option value="Exhibition Marketing" ${isEdit && study.category === 'Exhibition Marketing' ? 'selected' : ''}>Exhibition Marketing</option>
            <option value="BTL Activation" ${isEdit && study.category === 'BTL Activation' ? 'selected' : ''}>BTL Activation</option>
            <option value="Corporate Travel" ${isEdit && study.category === 'Corporate Travel' ? 'selected' : ''}>Corporate Travel & MICE</option>
            <option value="__custom__" ${isEdit && !['Corporate Branding','Conferences & AV','Demand Generation','Exhibition Marketing','BTL Activation','Corporate Travel'].includes(study.category) ? 'selected' : ''}>+ Other / Custom Category</option>
          </select>
          <input type="text" class="form-input" id="m_csCategoryCustom" style="margin-top: 8px; display: ${isEdit && !['Corporate Branding','Conferences & AV','Demand Generation','Exhibition Marketing','BTL Activation','Corporate Travel'].includes(study.category) ? 'block' : 'none'};" value="${isEdit ? escapeHtml(study.category) : ''}" placeholder="Enter custom category name">
        </div>
        <div class="form-group">
          <label class="form-label">Deployment Date</label>
          <input type="date" class="form-input" id="m_csDate" value="${isEdit && study.date ? study.date : new Date().toISOString().split('T')[0]}">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Cover / Feature Photo</label>
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <input type="url" class="form-input" id="m_csCover" value="${escapeHtml(defaultCover)}" placeholder="https://images.unsplash.com/..." oninput="document.getElementById('m_csCoverPreview').src=this.value || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000';" style="flex: 1;">
          <label class="header-btn" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px; padding: 0.5rem 0.9rem; font-size: 0.82rem; white-space: nowrap;">
            <i class="bi bi-upload"></i> Upload Image
            <input type="file" id="m_csCoverFile" accept="image/*" style="display: none;">
          </label>
        </div>
        <div style="margin-top: 10px; width: 100%; height: 140px; border-radius: var(--radius-sm); overflow: hidden; background: #161b28; border: 1px solid var(--border-card);">
          <img id="m_csCoverPreview" src="${escapeHtml(defaultCover)}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000';">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Client Challenge <span style="color: var(--color-primary);">*</span></label>
        <textarea class="form-textarea" id="m_csChallenge" rows="2" placeholder="Describe the client's business objective or problem to solve..." required>${isEdit ? escapeHtml(study.challenge || '') : ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Strategic Solution / Framework <span style="color: var(--color-primary);">*</span></label>
        <textarea class="form-textarea" id="m_csStrategy" rows="2" placeholder="The strategic concept, design thinking, or tech stack deployed..." required>${isEdit ? escapeHtml(study.strategy || '') : ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Turnkey Execution <span style="color: var(--color-primary);">*</span></label>
        <textarea class="form-textarea" id="m_csExecution" rows="2" placeholder="On-ground deployment details, timeline, and city hubs involved..." required>${isEdit ? escapeHtml(study.execution || '') : ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Detailed Results & Business Impact (HTML / Text)</label>
        <textarea class="form-textarea" id="m_csResultsHtml" rows="3" placeholder="Explain the verified business outcome and ROI...">${isEdit ? escapeHtml(study.resultsHtml || '') : '<p>Delivered measurable business ROI with high-intent audience conversion and flawless turnkey execution.</p>'}</textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Metric 1 (Value & Label)</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" class="form-input" id="m_csM1Val" value="${isEdit ? escapeHtml(study.metric1Value || '45K+') : '45K+'}" placeholder="e.g. 45K+" style="width: 100px;">
            <input type="text" class="form-input" id="m_csM1Lab" value="${isEdit ? escapeHtml(study.metric1Label || 'Sq. Ft. Branded') : 'Sq. Ft. Branded'}" placeholder="e.g. Sq. Ft. Branded" style="flex: 1;">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Metric 2 (Value & Label)</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" class="form-input" id="m_csM2Val" value="${isEdit ? escapeHtml(study.metric2Value || 'Zero') : 'Zero'}" placeholder="e.g. Zero / 3.8x" style="width: 100px;">
            <input type="text" class="form-input" id="m_csM2Lab" value="${isEdit ? escapeHtml(study.metric2Label || 'Workday Downtime') : 'Workday Downtime'}" placeholder="e.g. Workday Downtime" style="flex: 1;">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="m_csStatus">
          <option value="Published" ${!isEdit || study.status === 'Published' ? 'selected' : ''}>Published</option>
          <option value="Draft" ${isEdit && study.status === 'Draft' ? 'selected' : ''}>Draft</option>
        </select>
      </div>
    `;

    openGenericModal({
      title: isEdit ? 'Edit Case Study' : 'Add New Client Case Study',
      body: formHtml,
      saveText: isEdit ? 'Update Case Study' : 'Publish Case Study',
      onSave: () => {
        const client = document.getElementById('m_csClient').value.trim();
        const title = document.getElementById('m_csTitle').value.trim();
        const challenge = document.getElementById('m_csChallenge').value.trim();
        const strategy = document.getElementById('m_csStrategy').value.trim();
        const execution = document.getElementById('m_csExecution').value.trim();

        if (!client || !title || !challenge || !strategy || !execution) {
          showToast('Please fill in Client, Title, Challenge, Strategy, and Execution fields.', 'warning');
          return false;
        }

        const industry = document.getElementById('m_csIndustry').value.trim() || 'Technology';
        const catSelect = document.getElementById('m_csCategorySelect').value;
        let category = catSelect;
        if (catSelect === '__custom__') {
          category = document.getElementById('m_csCategoryCustom').value.trim() || 'Corporate Work';
        }

        const date = document.getElementById('m_csDate').value || new Date().toISOString().split('T')[0];
        let coverImage = document.getElementById('m_csCover').value.trim() || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000';
        let resultsHtml = document.getElementById('m_csResultsHtml').value.trim();
        if (!resultsHtml) {
          resultsHtml = '<p>Delivered measurable business ROI with high-intent audience conversion.</p>';
        }

        const metric1Value = document.getElementById('m_csM1Val').value.trim() || '100%';
        const metric1Label = document.getElementById('m_csM1Lab').value.trim() || 'Execution Success';
        const metric2Value = document.getElementById('m_csM2Val').value.trim() || '';
        const metric2Label = document.getElementById('m_csM2Lab').value.trim() || '';
        const status = document.getElementById('m_csStatus').value || 'Published';

        if (isEdit) {
          study.client = client;
          study.industry = industry;
          study.title = title;
          study.category = category;
          study.date = date;
          study.coverImage = coverImage;
          study.challenge = challenge;
          study.strategy = strategy;
          study.execution = execution;
          study.resultsHtml = resultsHtml;
          study.metric1Value = metric1Value;
          study.metric1Label = metric1Label;
          study.metric2Value = metric2Value;
          study.metric2Label = metric2Label;
          study.status = status;
          showToast('Case study updated live!', 'success');
        } else {
          const newId = 'cs_' + Date.now().toString().slice(-6);
          DB.caseStudies.unshift({
            id: newId,
            client,
            industry,
            title,
            category,
            coverImage,
            challenge,
            strategy,
            execution,
            resultsHtml,
            metric1Value,
            metric1Label,
            metric2Value,
            metric2Label,
            status,
            date
          });
          showToast('New case study published live!', 'success');
        }

        saveDatabase(DB);
        renderCaseStudies(document.getElementById('adminMainContent'));
        return true;
      }
    });

    // File input compression listener
    const coverFileInput = document.getElementById('m_csCoverFile');
    if (coverFileInput) {
      coverFileInput.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          try {
            showToast('Compressing cover image...', 'info');
            const dataUrl = await compressImageFile(file, 1280, 800, 0.82);
            const coverInput = document.getElementById('m_csCover');
            const preview = document.getElementById('m_csCoverPreview');
            if (coverInput) coverInput.value = dataUrl;
            if (preview) preview.src = dataUrl;
            showToast('Cover image ready!', 'success');
          } catch (err) {
            console.error('Image compression error:', err);
            showToast('Could not process image.', 'danger');
          }
        }
      });
    }
  }

  // =========================================================================
  // VIEW: INSIGHT CLUSTERS (Knowledge Hubs & Strategy Clusters)
  // =========================================================================
  function renderInsightClusters(container) {
    if (!DB.insightClusters) DB.insightClusters = DEFAULT_DB.insightClusters;

    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Insights & Topic Hubs</h1>
            <p class="view-subtitle">Manage topical authority knowledge clusters, strategy guides, and SEO pillar hubs</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <a href="insights.html" target="_blank" class="header-btn" style="background: rgba(254, 59, 32, 0.15); border-color: var(--color-primary); color: #fff;">
              <i class="bi bi-box-arrow-up-right"></i> <span>View Live Insights Page</span>
            </a>
            <button class="btn-add" id="btnAddInsightCluster"><i class="bi bi-plus-lg"></i> Add Topic Hub</button>
          </div>
        </div>

        <div class="stats-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Knowledge Hubs</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: #fff; margin-top: 4px;">${DB.insightClusters.length}</div>
          </div>
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Active Clusters</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: var(--status-success); margin-top: 4px;">${DB.insightClusters.filter(ic => ic.status === 'Active').length}</div>
          </div>
          <div class="stat-mini-card" style="background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Pillar Guides Linked</div>
            <div style="font-size: 1.6rem; font-weight: 700; color: var(--color-accent); margin-top: 4px;">
              ${DB.insightClusters.reduce((acc, ic) => acc + (Array.isArray(ic.articles) ? ic.articles.length : 0), 0)}
            </div>
          </div>
        </div>

        <div class="cards-grid">
          ${DB.insightClusters.map(ic => `
            <div class="item-card">
              <div>
                <div class="item-card-header">
                  <div class="item-card-icon"><i class="bi ${escapeHtml(ic.icon || 'bi-stars')}"></i></div>
                  <span class="badge ${ic.status === 'Active' ? 'badge-active' : 'badge-draft'}">${escapeHtml(ic.status)}</span>
                </div>
                <h3 class="item-card-title">${escapeHtml(ic.title)}</h3>
                <p class="item-card-desc">${escapeHtml(ic.desc)}</p>
                
                <div style="margin-top: 14px; border-top: 1px solid var(--border-card); padding-top: 10px;">
                  <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">
                    Linked Guides (${(ic.articles || []).length}):
                  </div>
                  <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; display: flex; flex-direction: column; gap: 4px;">
                    ${(ic.articles || []).slice(0, 4).map(a => `
                      <li style="color: var(--text-main); display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        <i class="bi bi-chevron-right" style="color: var(--color-primary); font-size: 0.7rem;"></i>
                        <span style="overflow: hidden; text-overflow: ellipsis;">${escapeHtml(a.title)}</span>
                      </li>
                    `).join('')}
                    ${(ic.articles || []).length > 4 ? `<li style="color: var(--text-dim); font-size: 0.75rem;">+ ${(ic.articles.length - 4)} more guides</li>` : ''}
                  </ul>
                </div>
              </div>
              <div class="item-card-footer" style="margin-top: 16px;">
                <span class="badge badge-category">${escapeHtml(ic.category || 'Strategy')}</span>
                <div class="action-btns">
                  <button class="btn-icon btn-edit" title="Edit Hub" data-action="edit-insight-cluster" data-id="${ic.id}"><i class="bi bi-pencil-fill"></i></button>
                  <button class="btn-icon btn-delete" title="Delete Hub" data-action="delete-insight-cluster" data-id="${ic.id}"><i class="bi bi-trash-fill"></i></button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('btnAddInsightCluster')?.addEventListener('click', () => {
      openInsightClusterModal();
    });

    document.querySelectorAll('[data-action="edit-insight-cluster"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const ic = DB.insightClusters.find(item => item.id === id);
        if (ic) openInsightClusterModal(ic);
      });
    });

    document.querySelectorAll('[data-action="delete-insight-cluster"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Knowledge Hub', 'Are you sure you want to remove this topic cluster from the Insights page?', () => {
          DB.insightClusters = DB.insightClusters.filter(ic => ic.id !== id);
          saveDatabase(DB);
          renderInsightClusters(document.getElementById('adminMainContent'));
          showToast('Knowledge hub removed', 'danger');
        });
      });
    });
  }

  function openInsightClusterModal(cluster = null) {
    const isEdit = !!cluster;
    let articlesList = isEdit && Array.isArray(cluster.articles) 
      ? JSON.parse(JSON.stringify(cluster.articles))
      : [
          { title: 'Overview & Strategy Guide', url: 'services/experiential-marketing.html' },
          { title: 'Framework vs Traditional Execution', url: 'services/experiential-marketing.html#faq' }
        ];

    const renderArticleRows = () => {
      return articlesList.map((art, idx) => `
        <div class="cluster-article-row" data-row-idx="${idx}" style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center;">
          <input type="text" class="form-input row-art-title" value="${escapeHtml(art.title)}" placeholder="Guide Title (e.g. What is Experiential Marketing?)" style="flex: 1.2;" required>
          <input type="text" class="form-input row-art-url" value="${escapeHtml(art.url)}" placeholder="Target URL (e.g. services/experiential-marketing.html)" style="flex: 1;" required>
          <button type="button" class="btn-icon btn-delete row-art-del" data-del-idx="${idx}" title="Delete Guide" style="flex-shrink: 0;"><i class="bi bi-trash-fill"></i></button>
        </div>
      `).join('');
    };

    const formHtml = `
      <div class="form-group">
        <label class="form-label">Cluster / Hub Title <span style="color: var(--color-primary);">*</span></label>
        <input type="text" class="form-input" id="m_icTitle" value="${isEdit ? escapeHtml(cluster.title) : ''}" placeholder="e.g. Experiential Marketing" required>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category</label>
          <input type="text" class="form-input" id="m_icCategory" value="${isEdit ? escapeHtml(cluster.category || 'Experiential') : 'Experiential'}" placeholder="e.g. Experiential, Growth, Events">
        </div>
        <div class="form-group">
          <label class="form-label">Bootstrap Icon Class</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" class="form-input" id="m_icIcon" value="${isEdit ? escapeHtml(cluster.icon || 'bi-stars') : 'bi-stars'}" placeholder="bi-stars" oninput="document.getElementById('m_icIconPreview').className='bi ' + this.value;">
            <div style="width: 42px; height: 42px; background: var(--bg-card); border: 1px solid var(--border-card); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; color: var(--color-primary);">
              <i id="m_icIconPreview" class="bi ${isEdit ? escapeHtml(cluster.icon || 'bi-stars') : 'bi-stars'}"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Short Description</label>
        <textarea class="form-textarea" id="m_icDesc" rows="2" placeholder="Brief summary of what this knowledge hub covers...">${isEdit ? escapeHtml(cluster.desc || '') : ''}</textarea>
      </div>

      <div class="form-group">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <label class="form-label" style="margin-bottom: 0;">Cluster Sub-Articles & Deep-Dive Guides</label>
          <button type="button" class="header-btn" id="btnAddArticleRow" style="padding: 3px 8px; font-size: 0.75rem;">
            <i class="bi bi-plus"></i> Add Guide Link
          </button>
        </div>
        <div id="articlesContainer" style="background: var(--bg-card); border: 1px solid var(--border-card); padding: 12px; border-radius: var(--radius-sm);">
          ${renderArticleRows()}
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="m_icStatus">
          <option value="Active" ${!isEdit || cluster.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Draft" ${isEdit && cluster.status === 'Draft' ? 'selected' : ''}>Draft</option>
        </select>
      </div>
    `;

    openGenericModal({
      title: isEdit ? 'Edit Knowledge Hub' : 'Create New Knowledge Hub',
      body: formHtml,
      saveText: isEdit ? 'Update Hub' : 'Create Hub',
      onSave: () => {
        const title = document.getElementById('m_icTitle').value.trim();
        if (!title) {
          showToast('Hub Title is required', 'warning');
          return false;
        }

        const category = document.getElementById('m_icCategory').value.trim() || 'Strategy';
        const icon = document.getElementById('m_icIcon').value.trim() || 'bi-stars';
        const desc = document.getElementById('m_icDesc').value.trim();
        const status = document.getElementById('m_icStatus').value || 'Active';

        // Collect articles from rows
        const collectedArticles = [];
        const rows = document.querySelectorAll('#articlesContainer .cluster-article-row');
        rows.forEach(r => {
          const artTitle = r.querySelector('.row-art-title')?.value.trim();
          const artUrl = r.querySelector('.row-art-url')?.value.trim();
          if (artTitle && artUrl) {
            collectedArticles.push({ title: artTitle, url: artUrl });
          }
        });

        if (collectedArticles.length === 0) {
          collectedArticles.push({ title: 'Overview & Strategy Guide', url: 'services/marketing-consulting.html' });
        }

        if (isEdit) {
          cluster.title = title;
          cluster.category = category;
          cluster.icon = icon;
          cluster.desc = desc;
          cluster.articles = collectedArticles;
          cluster.status = status;
          showToast(`Knowledge hub "${title}" updated!`, 'success');
        } else {
          const newId = 'ic_' + Date.now().toString().slice(-6);
          DB.insightClusters.push({
            id: newId,
            title,
            category,
            icon,
            desc,
            articles: collectedArticles,
            status
          });
          showToast(`Knowledge hub "${title}" created!`, 'success');
        }

        saveDatabase(DB);
        renderInsightClusters(document.getElementById('adminMainContent'));
        return true;
      }
    });

    // Wire Add Guide Link button inside modal
    const attachRowEvents = () => {
      const container = document.getElementById('articlesContainer');
      if (!container) return;

      container.querySelectorAll('.row-art-del').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.getAttribute('data-del-idx'), 10);
          // Sync current inputs before splicing
          const currentRows = container.querySelectorAll('.cluster-article-row');
          articlesList = [];
          currentRows.forEach((r, i) => {
            if (i !== idx) {
              articlesList.push({
                title: r.querySelector('.row-art-title')?.value || '',
                url: r.querySelector('.row-art-url')?.value || ''
              });
            }
          });
          container.innerHTML = renderArticleRows();
          attachRowEvents();
        };
      });
    };

    document.getElementById('btnAddArticleRow')?.addEventListener('click', () => {
      const container = document.getElementById('articlesContainer');
      if (!container) return;
      // Sync current inputs
      const currentRows = container.querySelectorAll('.cluster-article-row');
      articlesList = [];
      currentRows.forEach(r => {
        articlesList.push({
          title: r.querySelector('.row-art-title')?.value || '',
          url: r.querySelector('.row-art-url')?.value || ''
        });
      });
      articlesList.push({ title: '', url: 'services/experiential-marketing.html' });
      container.innerHTML = renderArticleRows();
      attachRowEvents();
    });

    attachRowEvents();
  }

  // =========================================================================
  // VIEW: BRANDS
  // =========================================================================
  function renderBrands(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Brands</h1>
            <p class="view-subtitle">Active client brand activations and sponsor portfolios</p>
          </div>
          <button class="btn-add" id="btnAddBrand"><i class="bi bi-plus-lg"></i> Add Brand Portfolio</button>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Brand / Product Line</th>
                  <th>Partnership Tier</th>
                  <th>Campaigns Delivered</th>
                  <th>Key Representative</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${DB.brands.map(br => `
                  <tr>
                    <td><strong>${escapeHtml(br.name)}</strong></td>
                    <td><span class="badge badge-category">${escapeHtml(br.tier)}</span></td>
                    <td>${escapeHtml(br.campaigns.toString())} activations</td>
                    <td>${escapeHtml(br.rep)}</td>
                    <td><span class="badge ${br.status === 'Active' ? 'badge-active' : 'badge-draft'}">${escapeHtml(br.status)}</span></td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-brand" data-id="${br.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnAddBrand')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-group">
          <label class="form-label">Brand / Product Line Name</label>
          <input type="text" class="form-input" id="m_brandName" placeholder="e.g. AWS Cloud Catalyst" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tier</label>
            <input type="text" class="form-input" id="m_brandTier" value="Strategic Partner" placeholder="Tier">
          </div>
          <div class="form-group">
            <label class="form-label">Representative</label>
            <input type="text" class="form-input" id="m_brandRep" placeholder="Account manager">
          </div>
        </div>
      `;

      openGenericModal({
        title: 'Add Brand Portfolio',
        body: formHtml,
        saveText: 'Save Brand',
        onSave: () => {
          const name = document.getElementById('m_brandName').value.trim();
          if (!name) return false;
          const tier = document.getElementById('m_brandTier').value.trim() || 'Strategic Partner';
          const rep = document.getElementById('m_brandRep').value.trim() || 'EST Lead';

          DB.brands.push({
            id: 'br_' + Date.now().toString().slice(-5),
            name,
            tier,
            campaigns: 1,
            rep,
            status: 'Active'
          });
          saveDatabase(DB);
          renderBrands(document.getElementById('adminMainContent'));
          showToast('Brand added', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="delete-brand"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Brand', 'Remove this brand portfolio record?', () => {
          DB.brands = DB.brands.filter(b => b.id !== id);
          saveDatabase(DB);
          renderBrands(document.getElementById('adminMainContent'));
          showToast('Brand removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: EVENT PAGES
  // =========================================================================
  function renderEventPages(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Event Pages</h1>
            <p class="view-subtitle">Dedicated landing pages, agendas, and delegate registration portals</p>
          </div>
          <button class="btn-add" id="btnAddEventPage"><i class="bi bi-plus-lg"></i> Create Event Page</button>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Event Landing Page</th>
                  <th>City / Hub</th>
                  <th>Dates</th>
                  <th>Registrations Count</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${DB.eventPages.map(ep => `
                  <tr>
                    <td>
                      <div class="entity-info-primary">${escapeHtml(ep.title)}</div>
                      <div class="entity-info-sub"><code>${escapeHtml(ep.slug)}</code></div>
                    </td>
                    <td>${escapeHtml(ep.city)}</td>
                    <td>${escapeHtml(ep.date)}</td>
                    <td><strong>${escapeHtml(ep.registrations.toString())}</strong> delegates</td>
                    <td><span class="badge ${ep.status === 'Live' ? 'badge-active' : 'badge-draft'}">${escapeHtml(ep.status)}</span></td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-ep" data-id="${ep.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnAddEventPage')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-group">
          <label class="form-label">Event Page Title</label>
          <input type="text" class="form-input" id="m_epTitle" placeholder="e.g. Pan-India Cloud Conclave 2026" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">City Hub</label>
            <input type="text" class="form-input" id="m_epCity" placeholder="Gurgaon / Mumbai">
          </div>
          <div class="form-group">
            <label class="form-label">Dates</label>
            <input type="text" class="form-input" id="m_epDates" placeholder="May 15-16, 2026">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">URL Slug</label>
          <input type="text" class="form-input" id="m_epSlug" placeholder="/events/cloud-conclave">
        </div>
      `;

      openGenericModal({
        title: 'Create Event Landing Page',
        body: formHtml,
        saveText: 'Publish Event Page',
        onSave: () => {
          const title = document.getElementById('m_epTitle').value.trim();
          if (!title) return false;
          const city = document.getElementById('m_epCity').value.trim() || 'Delhi NCR';
          const date = document.getElementById('m_epDates').value.trim() || 'Upcoming';
          const slug = document.getElementById('m_epSlug').value.trim() || '/events/new';

          DB.eventPages.unshift({
            id: 'ep_' + Date.now().toString().slice(-5),
            title,
            city,
            date,
            slug,
            registrations: 0,
            status: 'Live'
          });

          saveDatabase(DB);
          renderEventPages(document.getElementById('adminMainContent'));
          showToast('Event landing page created', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="delete-ep"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Event Page', 'Delete this event landing page?', () => {
          DB.eventPages = DB.eventPages.filter(p => p.id !== id);
          saveDatabase(DB);
          renderEventPages(document.getElementById('adminMainContent'));
          showToast('Event page removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: EVENT REGISTRATIONS (with CSV Export)
  // =========================================================================
  function renderEventRegistrations(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Event Registrations</h1>
            <p class="view-subtitle">Real-time attendee list, check-in status, and registration export</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn-outline" id="btnExportCSV"><i class="bi bi-download"></i> Export CSV</button>
            <button class="btn-add" id="btnAddReg"><i class="bi bi-person-plus-fill"></i> Manual Registration</button>
          </div>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Delegate</th>
                  <th>Company</th>
                  <th>Event Name</th>
                  <th>Pass Type</th>
                  <th>Registered On</th>
                  <th>Check-In</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${DB.eventRegistrations.map(r => `
                  <tr>
                    <td>
                      <div class="entity-info-primary">${escapeHtml(r.name)}</div>
                      <div class="entity-info-sub">${escapeHtml(r.email)}</div>
                    </td>
                    <td><strong>${escapeHtml(r.company)}</strong></td>
                    <td style="max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(r.event)}</td>
                    <td><span class="badge badge-category">${escapeHtml(r.ticketType)}</span></td>
                    <td>${escapeHtml(r.regDate)}</td>
                    <td>
                      <button class="badge ${r.checkIn === 'Confirmed' ? 'badge-confirmed' : 'badge-pending'}" style="cursor:pointer; border:none;" data-action="toggle-checkin" data-id="${r.id}">
                        <i class="bi ${r.checkIn === 'Confirmed' ? 'bi-check-circle-fill' : 'bi-clock-fill'}"></i> ${escapeHtml(r.checkIn)}
                      </button>
                    </td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-reg" data-id="${r.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Export CSV
    document.getElementById('btnExportCSV')?.addEventListener('click', () => {
      exportToCSV('est-event-registrations.csv', DB.eventRegistrations);
    });

    // Add Registration Modal
    document.getElementById('btnAddReg')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" id="m_regName" placeholder="e.g. Arvind Mehta" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Work Email</label>
            <input type="email" class="form-input" id="m_regEmail" placeholder="arvind@company.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input" id="m_regCompany" placeholder="Company Name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Event</label>
            <select class="form-select" id="m_regEvent">
              ${DB.events.map(ev => `<option>${escapeHtml(ev.title)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Pass Type</label>
            <select class="form-select" id="m_regPass">
              <option>VIP Pass</option>
              <option>Delegate</option>
              <option>Speaker VIP</option>
              <option>Media</option>
            </select>
          </div>
        </div>
      `;

      openGenericModal({
        title: 'Register Delegate',
        body: formHtml,
        saveText: 'Confirm Registration',
        onSave: () => {
          const name = document.getElementById('m_regName').value.trim();
          const email = document.getElementById('m_regEmail').value.trim();
          if (!name || !email) {
            showToast('Name and email are required', 'warning');
            return false;
          }
          const company = document.getElementById('m_regCompany').value.trim() || 'Enterprise Delegate';
          const event = document.getElementById('m_regEvent').value;
          const ticketType = document.getElementById('m_regPass').value;

          DB.eventRegistrations.unshift({
            id: 'reg_' + Date.now().toString().slice(-5),
            name,
            email,
            company,
            event,
            ticketType,
            checkIn: 'Confirmed',
            regDate: new Date().toISOString().split('T')[0]
          });

          saveDatabase(DB);
          renderEventRegistrations(document.getElementById('adminMainContent'));
          showToast(`Delegate ${name} registered`, 'success');
          return true;
        }
      });
    });

    // Toggle Checkin
    document.querySelectorAll('[data-action="toggle-checkin"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const reg = DB.eventRegistrations.find(r => r.id === id);
        if (reg) {
          reg.checkIn = reg.checkIn === 'Confirmed' ? 'Pending' : 'Confirmed';
          saveDatabase(DB);
          renderEventRegistrations(document.getElementById('adminMainContent'));
          showToast(`Check-in status updated for ${reg.name}`, 'info');
        }
      });
    });

    // Delete Registration
    document.querySelectorAll('[data-action="delete-reg"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Remove Registration', 'Are you sure you want to remove this registration record?', () => {
          DB.eventRegistrations = DB.eventRegistrations.filter(r => r.id !== id);
          saveDatabase(DB);
          renderEventRegistrations(document.getElementById('adminMainContent'));
          showToast('Registration removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: EVENTS (Master Calendar)
  // =========================================================================
  function renderEvents(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Events</h1>
            <p class="view-subtitle">Corporate conferences, pan-India roadshows, and partner summits</p>
          </div>
          <button class="btn-add" id="btnAddEvent"><i class="bi bi-plus-lg"></i> Add New Event</button>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Hub / City</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Delegates</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${(DB.events && DB.events.length > 0) ? DB.events.map(ev => `
                  <tr>
                    <td><strong>${escapeHtml(ev.title)}</strong></td>
                    <td><span class="badge badge-category"><i class="bi bi-geo-alt-fill" style="color: var(--color-primary)"></i> ${escapeHtml(ev.city)}</span></td>
                    <td>${escapeHtml(ev.venue)}</td>
                    <td>${escapeHtml(ev.date)}</td>
                    <td>${escapeHtml(ev.delegates)}</td>
                    <td><span class="badge ${ev.status === 'Upcoming' ? 'badge-upcoming' : 'badge-confirmed'}">${escapeHtml(ev.status)}</span></td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-ev" data-id="${ev.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 40px 20px;">
                      <i class="bi bi-calendar-x" style="font-size: 2rem; color: #475569; display: block; margin-bottom: 8px;"></i>
                      No events currently scheduled. Click "+ Add New Event" above to create an event.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnAddEvent')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-group">
          <label class="form-label">Event Name</label>
          <input type="text" class="form-input" id="m_evTitle" placeholder="e.g. Pan-India B2B Expo" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">City Hub</label>
            <input type="text" class="form-input" id="m_evCity" placeholder="Gurgaon / Mumbai">
          </div>
          <div class="form-group">
            <label class="form-label">Venue</label>
            <input type="text" class="form-input" id="m_evVenue" placeholder="Jio World / CyberHub">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-input" id="m_evDate" value="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="form-group">
            <label class="form-label">Expected Capacity</label>
            <input type="text" class="form-input" id="m_evDelegates" placeholder="e.g. 500+ C-Suite">
          </div>
        </div>
      `;

      openGenericModal({
        title: 'Add Corporate Event',
        body: formHtml,
        saveText: 'Save Event',
        onSave: () => {
          const title = document.getElementById('m_evTitle').value.trim();
          if (!title) return false;
          const city = document.getElementById('m_evCity').value.trim() || 'Gurgaon';
          const venue = document.getElementById('m_evVenue').value.trim() || 'Standard Venue';
          const date = document.getElementById('m_evDate').value;
          const delegates = document.getElementById('m_evDelegates').value.trim() || '300+ Delegates';

          DB.events.unshift({
            id: 'ev_' + Date.now().toString().slice(-5),
            title,
            city,
            venue,
            date,
            delegates,
            status: 'Upcoming'
          });

          saveDatabase(DB);
          renderEvents(document.getElementById('adminMainContent'));
          showToast('Event added successfully', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="delete-ev"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Event', 'Are you sure you want to delete this event from the calendar?', () => {
          DB.events = DB.events.filter(e => e.id !== id);
          saveDatabase(DB);
          renderEvents(document.getElementById('adminMainContent'));
          showToast('Event removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: GALLERIES (Image Albums)
  // =========================================================================
  function renderGalleries(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Galleries</h1>
            <p class="view-subtitle">High-resolution event photography and fabrication showcases</p>
          </div>
          <button class="btn-add" id="btnAddGallery"><i class="bi bi-images"></i> Create Photo Album</button>
        </div>

        <div class="cards-grid">
          ${DB.galleries.map(g => `
            <div class="item-card">
              <div>
                <img src="${escapeHtml(g.coverUrl)}" alt="${escapeHtml(g.title)}" class="item-card-img">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                  <span class="badge badge-category"><i class="bi bi-camera-fill"></i> ${g.photosCount} Photos</span>
                  <span class="badge badge-published">${g.status}</span>
                </div>
                <h3 class="item-card-title">${escapeHtml(g.title)}</h3>
                <p class="entity-info-sub" style="margin-bottom: 12px;">Linked Event: ${escapeHtml(g.event)}</p>
              </div>
              <div class="item-card-footer">
                <a href="our-works.html" target="_blank" class="btn-outline" style="font-size: 0.775rem; padding: 4px 10px;">
                  <i class="bi bi-eye"></i> View on Our Works
                </a>
                <button class="btn-icon btn-delete" data-action="delete-gal" data-id="${g.id}"><i class="bi bi-trash-fill"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('btnAddGallery')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-group">
          <label class="form-label">Album Name</label>
          <input type="text" class="form-input" id="m_galTitle" placeholder="e.g. AWS Summit Experience Zone" required>
        </div>
        <div class="form-group">
          <label class="form-label">Associated Event</label>
          <input type="text" class="form-input" id="m_galEvent" placeholder="Tech Summit 2026">
        </div>
        <div class="form-group">
          <label class="form-label">Cover Image URL</label>
          <input type="url" class="form-input" id="m_galCover" value="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80">
        </div>
      `;

      openGenericModal({
        title: 'Create Photo Album',
        body: formHtml,
        saveText: 'Create Album',
        onSave: () => {
          const title = document.getElementById('m_galTitle').value.trim();
          if (!title) return false;
          const event = document.getElementById('m_galEvent').value.trim() || 'Corporate Event';
          const coverUrl = document.getElementById('m_galCover').value.trim();

          DB.galleries.unshift({
            id: 'g_' + Date.now().toString().slice(-5),
            title,
            event,
            photosCount: 12,
            coverUrl,
            status: 'Published'
          });

          saveDatabase(DB);
          renderGalleries(document.getElementById('adminMainContent'));
          showToast('Photo album created', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="delete-gal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Album', 'Delete this gallery album?', () => {
          DB.galleries = DB.galleries.filter(g => g.id !== id);
          saveDatabase(DB);
          renderGalleries(document.getElementById('adminMainContent'));
          showToast('Gallery album removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: VIDEO GALLERIES
  // =========================================================================
  function renderVideoGalleries(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Video Galleries</h1>
            <p class="view-subtitle">Corporate showreels, high-energy activation films, and keynote recordings</p>
          </div>
          <button class="btn-add" id="btnAddVideo"><i class="bi bi-camera-video-fill"></i> Add Video Reel</button>
        </div>

        <div class="cards-grid">
          ${DB.videoGalleries.map(v => `
            <div class="item-card">
              <div>
                <img src="${escapeHtml(v.thumbnail)}" alt="${escapeHtml(v.title)}" class="item-card-img">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                  <span class="badge badge-category"><i class="bi bi-play-circle-fill" style="color: var(--color-primary)"></i> ${v.duration}</span>
                  <span style="font-size: 0.775rem; color: var(--text-dim);"><i class="bi bi-eye"></i> ${v.views} views</span>
                </div>
                <h3 class="item-card-title">${escapeHtml(v.title)}</h3>
                <p class="entity-info-sub" style="margin-bottom: 12px;">Client: ${escapeHtml(v.client)}</p>
              </div>
              <div class="item-card-footer">
                <a href="our-works.html" target="_blank" class="btn-outline" style="font-size: 0.775rem; padding: 4px 10px;">
                  <i class="bi bi-play-fill"></i> View on Our Works
                </a>
                <button class="btn-icon btn-delete" data-action="delete-vid" data-id="${v.id}"><i class="bi bi-trash-fill"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('btnAddVideo')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-group">
          <label class="form-label">Video Title</label>
          <input type="text" class="form-input" id="m_vidTitle" placeholder="e.g. Cisco Live Experiential Reel" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Client Name</label>
            <input type="text" class="form-input" id="m_vidClient" placeholder="Cisco Systems">
          </div>
          <div class="form-group">
            <label class="form-label">Duration</label>
            <input type="text" class="form-input" id="m_vidDuration" value="2m 30s">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Thumbnail URL</label>
          <input type="url" class="form-input" id="m_vidThumb" value="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80">
        </div>
      `;

      openGenericModal({
        title: 'Add Video Showreel',
        body: formHtml,
        saveText: 'Save Video',
        onSave: () => {
          const title = document.getElementById('m_vidTitle').value.trim();
          if (!title) return false;
          const client = document.getElementById('m_vidClient').value.trim() || 'EST Client';
          const duration = document.getElementById('m_vidDuration').value.trim() || '2m 00s';
          const thumbnail = document.getElementById('m_vidThumb').value.trim();

          DB.videoGalleries.unshift({
            id: 'v_' + Date.now().toString().slice(-5),
            title,
            client,
            duration,
            views: '1',
            thumbnail,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          });

          saveDatabase(DB);
          renderVideoGalleries(document.getElementById('adminMainContent'));
          showToast('Video showreel added', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="delete-vid"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Video', 'Remove this video showreel?', () => {
          DB.videoGalleries = DB.videoGalleries.filter(v => v.id !== id);
          saveDatabase(DB);
          renderVideoGalleries(document.getElementById('adminMainContent'));
          showToast('Video removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: CLIENT FEEDBACKS
  // =========================================================================
  function renderClientFeedbacks(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Client Feedbacks</h1>
            <p class="view-subtitle">Testimonials, ratings, and endorsements from enterprise marketing heads</p>
          </div>
          <button class="btn-add" id="btnAddFeedback"><i class="bi bi-chat-left-quote-fill"></i> Add Testimonial</button>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Client & Company</th>
                  <th>Rating</th>
                  <th>Testimonial Quote</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${DB.clientFeedbacks.map(f => `
                  <tr>
                    <td>
                      <div class="entity-info-primary">${escapeHtml(f.clientName)}</div>
                      <div class="entity-info-sub">${escapeHtml(f.role)}, ${escapeHtml(f.company)}</div>
                    </td>
                    <td>
                      <div style="color: #f59e0b; font-size: 0.9rem;">
                        ${'<i class="bi bi-star-fill"></i>'.repeat(f.rating)}${'<i class="bi bi-star"></i>'.repeat(5 - f.rating)}
                      </div>
                    </td>
                    <td style="max-width: 320px; font-style: italic; color: #cbd5e1;">"${escapeHtml(f.quote)}"</td>
                    <td>${escapeHtml(f.date)}</td>
                    <td>
                      <button class="badge ${f.status === 'Approved' ? 'badge-approved' : 'badge-pending'}" style="cursor:pointer; border:none;" data-action="toggle-feedback" data-id="${f.id}">
                        ${escapeHtml(f.status)}
                      </button>
                    </td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-feedback" data-id="${f.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnAddFeedback')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Client Name</label>
            <input type="text" class="form-input" id="m_fbName" placeholder="e.g. Neha Kapoor" required>
          </div>
          <div class="form-group">
            <label class="form-label">Company</label>
            <input type="text" class="form-input" id="m_fbCompany" placeholder="e.g. Google Cloud">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Designation / Role</label>
            <input type="text" class="form-input" id="m_fbRole" placeholder="e.g. VP Marketing">
          </div>
          <div class="form-group">
            <label class="form-label">Rating (1 to 5)</label>
            <select class="form-select" id="m_fbRating">
              <option value="5" selected>5 Stars (Excellent)</option>
              <option value="4">4 Stars (Good)</option>
              <option value="3">3 Stars (Average)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Feedback Quote</label>
          <textarea class="form-textarea" id="m_fbQuote" placeholder="Client review quote..."></textarea>
        </div>
      `;

      openGenericModal({
        title: 'Add Client Testimonial',
        body: formHtml,
        saveText: 'Publish Feedback',
        onSave: () => {
          const clientName = document.getElementById('m_fbName').value.trim();
          if (!clientName) return false;
          const company = document.getElementById('m_fbCompany').value.trim() || 'Client Brand';
          const role = document.getElementById('m_fbRole').value.trim() || 'Marketing Leader';
          const rating = parseInt(document.getElementById('m_fbRating').value, 10);
          const quote = document.getElementById('m_fbQuote').value.trim() || 'Outstanding activation delivery.';

          DB.clientFeedbacks.unshift({
            id: 'cf_' + Date.now().toString().slice(-5),
            clientName,
            company,
            role,
            rating,
            quote,
            status: 'Approved',
            date: new Date().toISOString().split('T')[0]
          });

          saveDatabase(DB);
          renderClientFeedbacks(document.getElementById('adminMainContent'));
          showToast('Client feedback published', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="toggle-feedback"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const fb = DB.clientFeedbacks.find(f => f.id === id);
        if (fb) {
          fb.status = fb.status === 'Approved' ? 'Pending' : 'Approved';
          saveDatabase(DB);
          renderClientFeedbacks(document.getElementById('adminMainContent'));
          showToast(`Feedback status updated to ${fb.status}`, 'info');
        }
      });
    });

    document.querySelectorAll('[data-action="delete-feedback"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Feedback', 'Remove this client feedback testimonial?', () => {
          DB.clientFeedbacks = DB.clientFeedbacks.filter(f => f.id !== id);
          saveDatabase(DB);
          renderClientFeedbacks(document.getElementById('adminMainContent'));
          showToast('Feedback removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // VIEW: EMPLOYEE FEEDBACKS
  // =========================================================================
  function renderEmployeeFeedbacks(container) {
    container.innerHTML = `
      <div class="view-container active">
        <div class="view-header">
          <div>
            <h1 class="view-title">Employee Feedbacks</h1>
            <p class="view-subtitle">Internal ops reviews, fabrication updates, and workplace feedback</p>
          </div>
          <button class="btn-add" id="btnAddEmpFb"><i class="bi bi-chat-square-text"></i> Submit Team Note</button>
        </div>

        <div class="data-card">
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Team Member</th>
                  <th>Department</th>
                  <th>Feedback / Suggestion</th>
                  <th>Date</th>
                  <th>Sentiment</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${DB.employeeFeedbacks.map(ef => `
                  <tr>
                    <td><strong>${escapeHtml(ef.employeeName)}</strong></td>
                    <td><span class="badge badge-category">${escapeHtml(ef.department)}</span></td>
                    <td style="max-width: 360px;">${escapeHtml(ef.message)}</td>
                    <td>${escapeHtml(ef.date)}</td>
                    <td><span class="badge ${ef.sentiment === 'Positive' ? 'badge-confirmed' : 'badge-draft'}">${escapeHtml(ef.sentiment)}</span></td>
                    <td style="text-align: right;">
                      <div class="action-btns" style="justify-content: flex-end;">
                        <button class="btn-icon btn-delete" title="Delete" data-action="delete-emp-fb" data-id="${ef.id}"><i class="bi bi-trash-fill"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnAddEmpFb')?.addEventListener('click', () => {
      const formHtml = `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Employee Name</label>
            <input type="text" class="form-input" id="m_empName" placeholder="e.g. Vikas Sharma" required>
          </div>
          <div class="form-group">
            <label class="form-label">Department</label>
            <input type="text" class="form-input" id="m_empDept" value="Event Operations">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Message / Suggestion</label>
          <textarea class="form-textarea" id="m_empMsg" placeholder="Feedback..."></textarea>
        </div>
      `;

      openGenericModal({
        title: 'Submit Internal Feedback',
        body: formHtml,
        saveText: 'Submit Note',
        onSave: () => {
          const employeeName = document.getElementById('m_empName').value.trim();
          if (!employeeName) return false;
          const department = document.getElementById('m_empDept').value.trim() || 'General';
          const message = document.getElementById('m_empMsg').value.trim();

          DB.employeeFeedbacks.unshift({
            id: 'ef_' + Date.now().toString().slice(-5),
            employeeName,
            department,
            sentiment: 'Positive',
            message,
            date: new Date().toISOString().split('T')[0]
          });

          saveDatabase(DB);
          renderEmployeeFeedbacks(document.getElementById('adminMainContent'));
          showToast('Internal note submitted', 'success');
          return true;
        }
      });
    });

    document.querySelectorAll('[data-action="delete-emp-fb"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        confirmDelete('Delete Note', 'Remove this internal employee note?', () => {
          DB.employeeFeedbacks = DB.employeeFeedbacks.filter(e => e.id !== id);
          saveDatabase(DB);
          renderEmployeeFeedbacks(document.getElementById('adminMainContent'));
          showToast('Note removed', 'danger');
        });
      });
    });
  }

  // =========================================================================
  // MODAL UTILITIES
  // =========================================================================
  let currentModalSaveCallback = null;

  function initGenericModal() {
    const overlay = document.getElementById('genericModalOverlay');
    const closeBtn = document.getElementById('genericModalClose');
    const cancelBtn = document.getElementById('genericModalCancel');
    const saveBtn = document.getElementById('genericModalSave');

    const closeModal = () => {
      overlay?.classList.remove('open');
      currentModalSaveCallback = null;
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    saveBtn?.addEventListener('click', () => {
      if (currentModalSaveCallback) {
        const success = currentModalSaveCallback();
        if (success !== false) closeModal();
      }
    });
  }

  function openGenericModal({ title, body, saveText = 'Save', onSave }) {
    const overlay = document.getElementById('genericModalOverlay');
    const titleEl = document.getElementById('genericModalTitle');
    const bodyEl = document.getElementById('genericModalBody');
    const saveBtn = document.getElementById('genericModalSave');

    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.innerHTML = body;
    if (saveBtn) saveBtn.textContent = saveText;

    currentModalSaveCallback = onSave;
    overlay?.classList.add('open');
  }

  function confirmDelete(title, message, onConfirm) {
    openGenericModal({
      title: title || 'Confirm Deletion',
      body: `<p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">${escapeHtml(message)}</p>`,
      saveText: 'Yes, Delete',
      onSave: () => {
        onConfirm();
        return true;
      }
    });
    // Style save button as danger
    const saveBtn = document.getElementById('genericModalSave');
    if (saveBtn) {
      saveBtn.style.backgroundColor = '#ef4444';
      saveBtn.style.borderColor = '#ef4444';
    }
  }

  // =========================================================================
  // AUTHENTICATION & FORGOT PASSWORD CONTROLLER
  // =========================================================================
  function isUserAuthenticated() {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true' || localStorage.getItem(AUTH_REMEMBER_KEY) === 'true';
  }

  function setAuthenticated(remember = true) {
    sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    if (remember) {
      localStorage.setItem(AUTH_REMEMBER_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_REMEMBER_KEY);
    }
  }

  function clearAuthentication() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_REMEMBER_KEY);
  }

  function initAuthentication() {
    const authOverlay = document.getElementById('adminAuthOverlay');
    const signInCard = document.getElementById('signInCard');
    const forgotPassCard = document.getElementById('forgotPassCard');

    const loginForm = document.getElementById('adminLoginForm');
    const loginAdminId = document.getElementById('loginAdminId');
    const loginPassword = document.getElementById('loginPassword');
    const loginRememberMe = document.getElementById('loginRememberMe');
    const btnAutoFillDemo = document.getElementById('btnAutoFillDemo');
    const btnToggleLoginPass = document.getElementById('btnToggleLoginPass');

    const linkForgotPassword = document.getElementById('linkForgotPassword');
    const linkBackToSignIn = document.getElementById('linkBackToSignIn');

    const forgotFormStep1 = document.getElementById('forgotFormStep1');
    const forgotFormStep2 = document.getElementById('forgotFormStep2');
    const forgotStep1 = document.getElementById('forgotStep1');
    const forgotStep2 = document.getElementById('forgotStep2');
    const forgotAdminId = document.getElementById('forgotAdminId');
    const generatedOtpCode = document.getElementById('generatedOtpCode');
    const inputOtpCode = document.getElementById('inputOtpCode');
    const inputNewPassword = document.getElementById('inputNewPassword');
    const inputConfirmPassword = document.getElementById('inputConfirmPassword');
    const btnToggleNewPass = document.getElementById('btnToggleNewPass');

    let currentGeneratedOtp = '849201';

    // 1. Initial State Check
    if (isUserAuthenticated()) {
      authOverlay?.classList.add('hidden');
    } else {
      authOverlay?.classList.remove('hidden');
    }

    // 2. Auto Fill Demo Credentials
    btnAutoFillDemo?.addEventListener('click', () => {
      if (loginAdminId) loginAdminId.value = DB.auth.adminId || 'admin';
      if (loginPassword) loginPassword.value = DB.auth.password || 'admin';
      showToast('Loaded demo credentials: admin / ' + DB.auth.password, 'info');
    });

    // 3. Password Visibility Toggles
    btnToggleLoginPass?.addEventListener('click', () => {
      if (loginPassword) {
        const isPass = loginPassword.type === 'password';
        loginPassword.type = isPass ? 'text' : 'password';
        btnToggleLoginPass.innerHTML = isPass ? '<i class="bi bi-eye-slash-fill"></i>' : '<i class="bi bi-eye-fill"></i>';
      }
    });

    btnToggleNewPass?.addEventListener('click', () => {
      if (inputNewPassword) {
        const isPass = inputNewPassword.type === 'password';
        inputNewPassword.type = isPass ? 'text' : 'password';
        btnToggleNewPass.innerHTML = isPass ? '<i class="bi bi-eye-slash-fill"></i>' : '<i class="bi bi-eye-fill"></i>';
      }
    });

    // 4. Sign In Form Submission
    loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredId = loginAdminId.value.trim().toLowerCase();
      const enteredPass = loginPassword.value.trim();

      const validId = (DB.auth.adminId || 'admin').toLowerCase();
      const validEmail = (DB.auth.email || 'admin@estbrandservices.com').toLowerCase();
      const validPass = DB.auth.password || 'admin';

      if ((enteredId === validId || enteredId === validEmail) && enteredPass === validPass) {
        setAuthenticated(loginRememberMe.checked);
        authOverlay?.classList.add('hidden');
        showToast('Signed in successfully! Welcome, ' + (DB.auth.name || 'Admin'), 'success');
      } else {
        showToast('Invalid Admin ID or Password. Try default: admin / admin', 'danger');
        if (loginPassword) loginPassword.value = '';
      }
    });

    // 5. Navigate to Forgot Password
    linkForgotPassword?.addEventListener('click', () => {
      if (signInCard) signInCard.style.display = 'none';
      if (forgotPassCard) forgotPassCard.style.display = 'block';
      if (forgotStep1) forgotStep1.style.display = 'block';
      if (forgotStep2) forgotStep2.style.display = 'none';
    });

    // 6. Navigate back to Sign In
    linkBackToSignIn?.addEventListener('click', () => {
      if (forgotPassCard) forgotPassCard.style.display = 'none';
      if (signInCard) signInCard.style.display = 'block';
    });

    // 7. Forgot Password Step 1: Request OTP
    forgotFormStep1?.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredId = forgotAdminId.value.trim().toLowerCase();
      const validId = (DB.auth.adminId || 'admin').toLowerCase();
      const validEmail = (DB.auth.email || 'admin@estbrandservices.com').toLowerCase();

      if (enteredId === validId || enteredId === validEmail) {
        // Generate random 6-digit code
        currentGeneratedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        if (generatedOtpCode) generatedOtpCode.textContent = currentGeneratedOtp;
        if (inputOtpCode) inputOtpCode.value = currentGeneratedOtp; // Auto populate simulation for convenience

        if (forgotStep1) forgotStep1.style.display = 'none';
        if (forgotStep2) forgotStep2.style.display = 'block';

        showToast('Verification code generated: ' + currentGeneratedOtp, 'info');
      } else {
        showToast('Admin ID or Email not found in records.', 'warning');
      }
    });

    // 8. Forgot Password Step 2: Validate OTP & Set New Password
    forgotFormStep2?.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredOtp = inputOtpCode.value.trim();
      const newPass = inputNewPassword.value.trim();
      const confirmPass = inputConfirmPassword.value.trim();

      if (enteredOtp !== currentGeneratedOtp) {
        showToast('Invalid OTP verification code. Please check and try again.', 'danger');
        return;
      }

      if (newPass.length < 4) {
        showToast('Password must be at least 4 characters long.', 'warning');
        return;
      }

      if (newPass !== confirmPass) {
        showToast('New passwords do not match.', 'danger');
        return;
      }

      // Save new password
      DB.auth.password = newPass;
      saveDatabase(DB);

      showToast('Password reset successfully! Please sign in with your new password.', 'success');

      // Return to login screen
      if (loginAdminId) loginAdminId.value = DB.auth.adminId || 'admin';
      if (loginPassword) loginPassword.value = newPass;
      if (forgotPassCard) forgotPassCard.style.display = 'none';
      if (signInCard) signInCard.style.display = 'block';
    });

    // 9. Profile Avatar Click -> Account & Password Settings Modal
    document.querySelectorAll('.profile-avatar-circle').forEach(avatar => {
      avatar.addEventListener('click', () => {
        openProfileSettingsModal();
      });
    });
  }

  function openProfileSettingsModal() {
    const auth = DB.auth || DEFAULT_DB.auth;
    const formHtml = `
      <div class="form-group">
        <label class="form-label">Admin Name</label>
        <input type="text" class="form-input" id="profName" value="${escapeHtml(auth.name || 'EST Admin')}" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Admin ID (Login Username)</label>
          <input type="text" class="form-input" id="profId" value="${escapeHtml(auth.adminId || 'admin')}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Registered Email</label>
          <input type="email" class="form-input" id="profEmail" value="${escapeHtml(auth.email || 'admin@estbrandservices.com')}" required>
        </div>
      </div>
      <div class="form-group" style="margin-top: 10px;">
        <label class="form-label">Change Password</label>
        <input type="text" class="form-input" id="profPassword" value="${escapeHtml(auth.password || 'admin')}" placeholder="Enter new password">
      </div>
    `;

    openGenericModal({
      title: 'Admin Security & Account Settings',
      body: formHtml,
      saveText: 'Save Account Settings',
      onSave: () => {
        const name = document.getElementById('profName').value.trim();
        const adminId = document.getElementById('profId').value.trim();
        const email = document.getElementById('profEmail').value.trim();
        const password = document.getElementById('profPassword').value.trim();

        if (!adminId || !password) {
          showToast('Admin ID and Password cannot be empty.', 'warning');
          return false;
        }

        DB.auth = {
          ...DB.auth,
          name: name || 'EST Admin',
          adminId,
          email,
          password
        };

        saveDatabase(DB);
        showToast('Admin account & password updated successfully!', 'success');
        return true;
      }
    });
  }

  function initSignOutModal() {
    window.openSignOutModal = () => {
      confirmDelete('Sign Out', 'Are you sure you want to sign out of the Admin panel?', () => {
        clearAuthentication();
        const authOverlay = document.getElementById('adminAuthOverlay');
        const signInCard = document.getElementById('signInCard');
        const forgotPassCard = document.getElementById('forgotPassCard');
        const loginPassword = document.getElementById('loginPassword');

        if (forgotPassCard) forgotPassCard.style.display = 'none';
        if (signInCard) signInCard.style.display = 'block';
        if (loginPassword) loginPassword.value = '';

        authOverlay?.classList.remove('hidden');
        showToast('Signed out successfully', 'info');
      });
    };
  }

  // =========================================================================
  // TOAST NOTIFICATION SYSTEM
  // =========================================================================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'bi-check-circle-fill';
    if (type === 'danger') iconClass = 'bi-exclamation-triangle-fill';
    if (type === 'warning') iconClass = 'bi-exclamation-circle-fill';
    if (type === 'info') iconClass = 'bi-info-circle-fill';

    toast.innerHTML = `<i class="bi ${iconClass}"></i><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // =========================================================================
  // CSV EXPORTER
  // =========================================================================
  function exportToCSV(filename, rows) {
    if (!rows || !rows.length) {
      showToast('No data available to export', 'warning');
      return;
    }
    const keys = Object.keys(rows[0]);
    let csv = keys.join(',') + '\n';
    rows.forEach(row => {
      csv += keys.map(k => `"${(row[k] || '').toString().replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename} successfully`, 'success');
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // =========================================================================
  // CLOUD SYNC & FIREBASE REAL-TIME SYNCHRONIZATION CONTROLLER
  // =========================================================================
  function initCloudSyncManager() {
    const btnSync = document.getElementById('btnHeaderCloudSync');
    const syncLabel = document.getElementById('headerSyncLabel');

    if (window.ESTCloudSync && typeof window.ESTCloudSync.onSync === 'function') {
      window.ESTCloudSync.onSync((cloudData, source) => {
        if (source !== 'local_save') {
          DB = normalizeDb(cloudData);
          if (syncLabel) {
            syncLabel.textContent = 'Cloud Live: Updated';
            setTimeout(() => {
              if (syncLabel) syncLabel.textContent = 'Real-Time Cloud Sync';
            }, 3000);
          }
          renderCurrentView();
        }
      });
    }

    btnSync?.addEventListener('click', () => {
      openCloudSyncModal();
    });
  }

    function openCloudSyncModal() {
    const status = (window.ESTCloudSync && typeof window.ESTCloudSync.getStatus === 'function')
      ? window.ESTCloudSync.getStatus()
      : { cloudConnected: false, statusMessage: 'Offline', config: {} };

    const currentConfig = status.config || {};
    const isConnected = !!status.cloudConnected;

    const modalBody = `
      <div style="padding: 4px 0; display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Live Status Banner -->
        <div style="background: ${isConnected ? 'rgba(12, 188, 161, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; border: 1px solid ${isConnected ? 'rgba(12, 188, 161, 0.3)' : 'rgba(245, 158, 11, 0.3)'}; border-radius: 10px; padding: 14px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 12px; height: 12px; border-radius: 50%; background: ${isConnected ? '#0cbca1' : '#f59e0b'}; display: inline-block; box-shadow: 0 0 10px ${isConnected ? '#0cbca1' : '#f59e0b'};"></span>
            <div>
              <strong style="color: #fff; font-size: 0.95rem;">${isConnected ? 'Cloud Sync: Active & Live' : 'Cloud Sync: Awaiting Database URL'}</strong>
              <p style="color: #94a3b8; font-size: 0.8rem; margin: 2px 0 0 0;">${status.statusMessage || (isConnected ? 'Synchronizing across laptops, mobile devices, and worldwide visitors.' : 'Connect your Firebase Realtime Database to sync across all devices.')}</p>
            </div>
          </div>
          <span class="badge" style="background: ${isConnected ? 'rgba(12, 188, 161, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: ${isConnected ? '#0cbca1' : '#f59e0b'}; border: 1px solid ${isConnected ? '#0cbca1' : '#f59e0b'};">
            ${isConnected ? 'Live Connected' : 'Setup Required'}
          </span>
        </div>

        <!-- 3-Step Setup Instructions Card -->
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 14px;">
          <h4 style="color: #fff; font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i class="bi bi-info-circle" style="color: var(--color-accent);"></i> How to connect your Google Firebase Database (Free & Fast):
          </h4>
          <ol style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 0.82rem; line-height: 1.6;">
            <li>Go to <a href="https://console.firebase.google.com" target="_blank" style="color: var(--color-accent); text-decoration: underline;">console.firebase.google.com</a> and click <strong>Create a project</strong> (e.g. <em>est-brand-services</em>).</li>
            <li>In the left sidebar, click <strong>Build &gt; Realtime Database</strong> &gt; <strong>Create Database</strong> (choose US or closest region).</li>
            <li>In the <strong>Rules</strong> tab, set: <code>{ ".read": true, ".write": true }</code> and click <strong>Publish</strong>.</li>
            <li>Copy the Database URL (e.g. <code>https://your-project-default-rtdb.firebaseio.com</code>) and paste it below!</li>
          </ol>
        </div>

        <!-- Firebase Credentials Form -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div class="form-group">
            <label class="form-label" style="font-weight: 600;">Firebase Realtime Database URL <span style="color: var(--color-primary);">*</span></label>
            <input type="url" class="form-input" id="cf_dbUrl" value="${escapeHtml(currentConfig.databaseURL || '')}" placeholder="https://your-project-default-rtdb.firebaseio.com" required>
            <span style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px; display: block;">Found at the top of your Firebase Console > Realtime Database tab.</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Web API Key (Optional)</label>
              <input type="text" class="form-input" id="cf_apiKey" value="${escapeHtml(currentConfig.apiKey || '')}" placeholder="AIzaSy...">
            </div>
            <div class="form-group">
              <label class="form-label">Project ID (Optional)</label>
              <input type="text" class="form-input" id="cf_projectId" value="${escapeHtml(currentConfig.projectId || '')}" placeholder="est-brand-services">
            </div>
          </div>
        </div>

        <!-- Connection Test Feedback Box -->
        <div id="cf_testResult" style="display: none; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem;"></div>

        <!-- Action Buttons Row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <button type="button" class="btn-outline" id="btnTestCloudConnection" style="justify-content: center; padding: 9px;">
            <i class="bi bi-broadcast"></i> Test Database Connection
          </button>
          <button type="button" class="btn-outline" id="btnForcePushCloud" style="justify-content: center; padding: 9px;">
            <i class="bi bi-cloud-arrow-up-fill"></i> Push Current Data to Cloud
          </button>
        </div>

        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 4px 0;">

        <!-- Manual Backup & Slate Reset Controls -->
        <div style="display: flex; gap: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn-outline" id="btnExportJsonBackup" style="font-size: 0.8rem; padding: 6px 12px;" title="Export current database as a JSON backup file">
              <i class="bi bi-download"></i> Export JSON Backup
            </button>
            <label class="btn-outline" style="font-size: 0.8rem; padding: 6px 12px; cursor: pointer; margin: 0;" title="Import a JSON backup to restore database">
              <i class="bi bi-upload"></i> Import JSON Backup
              <input type="file" id="btnImportJsonBackup" accept=".json,application/json" style="display: none;">
            </label>
          </div>
          <button type="button" class="btn-outline" id="btnClearMediaSlate" style="font-size: 0.8rem; padding: 6px 12px; color: var(--status-danger); border-color: rgba(239, 68, 68, 0.4);" title="Clear all photos, videos, and case studies to start with a fresh dynamic slate">
            <i class="bi bi-stars"></i> Reset to Clean Empty State
          </button>
        </div>

      </div>
    `;

    openGenericModal({
      title: 'Real-Time Cross-Device Synchronization & Database Settings',
      body: modalBody,
      saveText: 'Save & Connect Cloud',
      onSave: () => {
        const dbUrl = document.getElementById('cf_dbUrl')?.value.trim();
        const apiKey = document.getElementById('cf_apiKey')?.value.trim();
        const projectId = document.getElementById('cf_projectId')?.value.trim();
        const authDomain = document.getElementById('cf_authDomain')?.value.trim();

        if (window.ESTCloudSync && typeof window.ESTCloudSync.setFirebaseConfig === 'function') {
          window.ESTCloudSync.setFirebaseConfig({
            databaseURL: dbUrl,
            apiKey: apiKey,
            projectId: projectId,
            authDomain: authDomain
          });
          showToast('Database configuration saved! Connecting live...', 'success');
          setTimeout(() => {
            if (window.ESTCloudSync && typeof window.ESTCloudSync.saveDB === 'function') {
              window.ESTCloudSync.saveDB(DB);
            }
          }, 1000);
        }
        return true;
      }
    });

    // Test Connection Handler
    document.getElementById('btnTestCloudConnection')?.addEventListener('click', async () => {
      const dbUrl = document.getElementById('cf_dbUrl')?.value.trim();
      const testBox = document.getElementById('cf_testResult');
      if (!testBox) return;

      testBox.style.display = 'block';
      testBox.style.background = 'rgba(255, 255, 255, 0.05)';
      testBox.style.color = '#fff';
      testBox.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Testing connection to ' + escapeHtml(dbUrl) + '...';

      if (!dbUrl) {
        testBox.style.background = 'rgba(239, 68, 68, 0.15)';
        testBox.style.color = '#ef4444';
        testBox.innerHTML = '<i class="bi bi-x-circle-fill"></i> Please enter your Firebase Realtime Database URL first.';
        return;
      }

      if (window.ESTCloudSync && typeof window.ESTCloudSync.testFirebaseConnection === 'function') {
        const res = await window.ESTCloudSync.testFirebaseConnection({ databaseURL: dbUrl });
        if (res.success) {
          testBox.style.background = 'rgba(12, 188, 161, 0.15)';
          testBox.style.color = '#0cbca1';
          testBox.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + escapeHtml(res.message);
          showToast('Firebase connection test succeeded!', 'success');
        } else {
          testBox.style.background = 'rgba(239, 68, 68, 0.15)';
          testBox.style.color = '#ef4444';
          testBox.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> ' + escapeHtml(res.message);
          showToast('Connection test failed. Check URL & Rules.', 'danger');
        }
      }
    });

    // Force Push Cloud Handler
    document.getElementById('btnForcePushCloud')?.addEventListener('click', () => {
      if (window.ESTCloudSync && typeof window.ESTCloudSync.saveDB === 'function') {
        window.ESTCloudSync.saveDB(DB);
        showToast('Pushed current database to Cloud successfully!', 'success');
      }
    });

    // Export JSON Backup
    document.getElementById('btnExportJsonBackup')?.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(DB, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute('href', dataStr);
      dlAnchor.setAttribute('download', 'est_database_backup_' + new Date().toISOString().split('T')[0] + '.json');
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Database backup exported!', 'success');
    });

    // Import JSON Backup
    document.getElementById('btnImportJsonBackup')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed && typeof parsed === 'object') {
            DB = normalizeDb(parsed);
            saveDatabase(DB);
            renderCurrentView();
            showToast('Database restored from backup successfully!', 'success');
          }
        } catch (err) {
          showToast('Invalid JSON backup file: ' + err.message, 'danger');
        }
      };
      reader.readAsText(file);
    });

    // Reset Clean Empty State
    document.getElementById('btnClearMediaSlate')?.addEventListener('click', () => {
      confirmDelete('Reset Media to Clean Empty State', 'Are you sure you want to clear all sample photos, videos, and case studies? You will have a completely clean slate where only what you add will show.', () => {
        DB.eventImages = [];
        DB.eventVideos = [];
        DB.caseStudies = [];
        saveDatabase(DB);
        renderCurrentView();
        showToast('All media cleared! You now have a 100% clean dynamic slate.', 'success');
      });
    });
  }

  // Expose global controller
  window.adminApp = {
    switchView,
    showToast,
    exportToCSV,
    openProfileSettingsModal,
    openCloudSyncModal
  };

  // Attach auth and cloud initialization
  initAuthentication();
  initCloudSyncManager();

})();

