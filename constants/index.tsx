import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut, IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2
} from "@tabler/icons-react";

export const menuItems = [
    {
        title: "Home",
        href: "/",
        description: "Landing page sections",
        icon: "home",
        sublinks: [
            {
                title: "Overview",
                href: "/#overview",
                description: "High-level snapshot of our product and value proposition",
            },
            {
                title: "Features",
                href: "/#features",
                description: "Key capabilities that set us apart",
            },
            {
                title: "Pricing",
                href: "/#pricing",
                description: "Current plans, tiers, and costs",
            },
        ],
    },
    {
        title: "About",
        href: "/about",
        description: "Company information",
        icon: "info",
        sublinks: [
            {
                title: "Our Story",
                href: "/about#story",
                description: "How and why the company was founded",
            },
            {
                title: "Team",
                href: "/about#team",
                description: "People behind the product",
            },
            {
                title: "Careers",
                href: "/about#careers",
                description: "Open roles and hiring process",
            },
        ],
    },
    {
        title: "Services",
        href: "/services",
        description: "What we offer",
        icon: "cog",
        sublinks: [
            {
                title: "Web Development",
                href: "/services/web-development",
                description: "Custom websites and web apps",
            },
            {
                title: "Mobile Apps",
                href: "/services/mobile-apps",
                description: "iOS and Android native or cross-platform apps",
            },
            {
                title: "Consulting",
                href: "/services/consulting",
                description: "Architecture reviews and technical strategy",
            },
        ],
    },
    {
        title: "Contact",
        href: "/contact",
        description: "Get in touch",
        icon: "envelope",
        sublinks: [
            {
                title: "Support",
                href: "/contact#support",
                description: "Help center, tickets, and documentation",
            },
            {
                title: "Sales",
                href: "/contact#sales",
                description: "Talk to our sales team about pricing or demos",
            },
            {
                title: "FAQ",
                href: "/contact#faq",
                description: "Frequently asked questions and answers",
            },
        ],
    },
    {
        title: "Blog",
        href: "/blog",
        description: "Articles & news",
        icon: "blog",
        sublinks: [
            {
                title: "Latest Posts",
                href: "/blog#latest",
                description: "Most recent articles and announcements",
            },
            {
                title: "Tutorials",
                href: "/blog/tutorials",
                description: "Step-by-step guides and how-tos",
            },
            {
                title: "Case Studies",
                href: "/blog/case-studies",
                description: "In-depth looks at real-world projects",
            },
        ],
    },
] as const;

export const iconScroll = [
    {
        href: "/scroll/logo1.svg",
        quote: "Recognized for exceptional developer experience and tooling.",
        name: "Forbes",
        title: "Cloud 100 – 2025",
    },
    {
        href: "/scroll/logo2.svg",
        quote: "Awarded for innovation in frontend infrastructure.",
        name: "Fast Company",
        title: "Innovation by Design – 2025",
    },
    {
        href: "/scroll/logo3.svg",
        quote: "Highlighted as a rising tech leader in CI/CD automation.",
        name: "Gartner",
        title: "Cool Vendor – DevOps 2024",
    },
    {
        href: "/scroll/logo4.svg",
        quote: "Celebrated for excellence in UX and accessibility.",
        name: "Red Dot",
        title: "Best UI Design – 2024",
    },]
const features = [
    {
        title: "Built for developers",
        description:
            "Built for engineers, developers, dreamers, thinkers and doers.",
        icon: <IconTerminal2 />,
    },
    {
        title: "Ease of use",
        description:
            "It's as easy as using an Apple, and as expensive as buying one.",
        icon: <IconEaseInOut />,
    },
    {
        title: "Pricing like no other",
        description:
            "Our prices are best in the market. No cap, no lock, no credit card required.",
        icon: <IconCurrencyDollar />,
    },
    {
        title: "100% Uptime guarantee",
        description: "We just cannot be taken down by anyone.",
        icon: <IconCloud />,
    },
    {
        title: "Multi-tenant Architecture",
        description: "You can simply share passwords instead of buying new seats",
        icon: <IconRouteAltLeft />,
    },
    {
        title: "24/7 Customer Support",
        description:
            "We are available a 100% of the time. Atleast our AI Agents are.",
        icon: <IconHelp />,
    },
    {
        title: "Money back guarantee",
        description:
            "If you donot like EveryAI, we will convince you to like us.",
        icon: <IconAdjustmentsBolt />,
    },
    {
        title: "And everything else",
        description: "I just ran out of copy ideas. Accept my sincere apologies",
        icon: <IconHeart />,
    },
];
export const featuresConsts = [
    {
        title: "Built for developers",
        description:
            "Built for engineers, developers, dreamers, thinkers and doers.",
        icon: <IconTerminal2 />,
    },
    {
        title: "Ease of use",
        description:
            "It's as easy as using an Apple, and as expensive as buying one.",
        icon: <IconEaseInOut />,
    },
    {
        title: "Pricing like no other",
        description:
            "Our prices are best in the market. No cap, no lock, no credit card required.",
        icon: <IconCurrencyDollar />,
    },
    {
        title: "100% Uptime guarantee",
        description: "We just cannot be taken down by anyone.",
        icon: <IconCloud />,
    },
    {
        title: "Multi-tenant Architecture",
        description: "You can simply share passwords instead of buying new seats",
        icon: <IconRouteAltLeft />,
    },
    {
        title: "24/7 Customer Support",
        description:
            "We are available a 100% of the time. Atleast our AI Agents are.",
        icon: <IconHelp />,
    },
    {
        title: "Money back guarantee",
        description:
            "If you donot like EveryAI, we will convince you to like us.",
        icon: <IconAdjustmentsBolt />,
    },
    {
        title: "And everything else",
        description: "I just ran out of copy ideas. Accept my sincere apologies",
        icon: <IconHeart />,
    },
];

export const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Docs", href: "#" },
            { name: "Blog", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Press", href: "#" },
            { name: "Partners", href: "#" },
        ],
    },
    {
        title: "Support",
        links: [
            { name: "Help Center", href: "#" },
            { name: "Community", href: "#" },
            { name: "Status", href: "#" },
            { name: "Contact Support", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Terms", href: "#" },
            { name: "Privacy", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "Security", href: "#" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "API Reference", href: "#" },
            { name: "Open Source", href: "#" },
            { name: "Changelog", href: "#" },
            { name: "SDKs", href: "#" },
        ],
    },
];
