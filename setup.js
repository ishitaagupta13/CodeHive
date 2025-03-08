const sampleHackathons = [
    {
        title: "AI Innovation Hackathon",
        description: "Develop innovative AI solutions for real-world problems",
        image: "https://via.placeholder.com/300x150?text=AI+Hackathon",
        skills: ["python", "machine learning", "ai", "data science", "tensorflow"],
        date: "April 15-17, 2025",
        location: "Online",
        url: "https://example.com/ai-hackathon"
    },
    {
        title: "Web3 Developer Challenge",
        description: "Build decentralized applications on blockchain technology",
        image: "https://via.placeholder.com/300x150?text=Web3+Hackathon",
        skills: ["blockchain", "solidity", "javascript", "web3", "ethereum"],
        date: "May 5-7, 2025",
        location: "San Francisco, CA",
        url: "https://example.com/web3-hackathon"
    },
    {
        title: "Mobile App Showcase",
        description: "Create innovative mobile apps with focus on user experience",
        image: "https://via.placeholder.com/300x150?text=Mobile+Hackathon",
        skills: ["react native", "flutter", "swift", "kotlin", "ui design"],
        date: "June 10-12, 2025",
        location: "New York, NY",
        url: "https://example.com/mobile-hackathon"
    },
    {
        title: "Cloud Computing Challenge",
        description: "Leverage cloud services to build scalable applications",
        image: "https://via.placeholder.com/300x150?text=Cloud+Hackathon",
        skills: ["aws", "azure", "gcp", "serverless", "devops"],
        date: "July 20-22, 2025",
        location: "Online",
        url: "https://example.com/cloud-hackathon"
    },
    {
        title: "Sustainability Tech Hackathon",
        description: "Develop tech solutions for environmental challenges",
        image: "https://via.placeholder.com/300x150?text=Sustainability+Hackathon",
        skills: ["iot", "data visualization", "hardware", "embedded systems", "javascript"],
        date: "August 15-17, 2025",
        location: "Berlin, Germany",
        url: "https://example.com/sustainability-hackathon"
    },
    {
        title: "FinTech Innovation Challenge",
        description: "Create the next generation of financial technology solutions",
        image: "https://via.placeholder.com/300x150?text=FinTech+Hackathon",
        skills: ["javascript", "api integration", "node.js", "data analysis", "security"],
        date: "September 8-10, 2025",
        location: "London, UK",
        url: "https://example.com/fintech-hackathon"
    },
    {
        title: "HealthTech for All",
        description: "Design accessible healthcare technology solutions",
        image: "https://via.placeholder.com/300x150?text=HealthTech+Hackathon",
        skills: ["mobile development", "ui/ux", "data privacy", "api design", "accessibility"],
        date: "October 12-14, 2025",
        location: "Boston, MA",
        url: "https://example.com/healthtech-hackathon"
    },
    {
        title: "Game Development Jam",
        description: "Build innovative games in a weekend",
        image: "https://via.placeholder.com/300x150?text=GameDev+Hackathon",
        skills: ["unity", "c#", "game design", "3d modeling", "pixel art"],
        date: "November 18-20, 2025",
        location: "Tokyo, Japan",
        url: "https://example.com/gamedev-hackathon"
    }
];

// Add hackathons to Firestore
async function setupHackathonsDatabase() {
    try {
        const batch = db.batch();
        
        sampleHackathons.forEach(hackathon => {
            const hackathonRef = db.collection('hackathons').doc();
            batch.set(hackathonRef, {
                ...hackathon,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        await batch.commit();
        console.log('Sample hackathons have been added to the database!');
    } catch (error) {
        console.error('Error setting up hackathons database:', error);
    }
}
setupHackathonsDatabase();