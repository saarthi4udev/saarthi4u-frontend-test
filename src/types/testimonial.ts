export interface Testimonial {
	id: string;
	avatarUrl: string;
	quote: string;
	name: string;
	role: string;
	city?: string;
	rating: number;
}

export const DEMO_TESTIMONIALS: Testimonial[] = [
	{
		id: "1",
		avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
		quote:
			"Saarthi4u completely changed how I approached college admissions. The guidance was personalized, timely, and accurate. I got into my dream college on the first attempt.",
		name: "Kaustubh Patil",
		role: "Software Engineer",
		city: "Mumbai",
		rating: 5,
	},
	{
		id: "2",
		avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
		quote:
			"I was confused between multiple streams after class 12. The coaches helped me understand my strengths and pick the right course.",
		name: "Priya Sharma",
		role: "Medical Student",
		city: "Pune",
		rating: 5,
	},
	{
		id: "3",
		avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
		quote:
			"The scholarship discovery feature alone is worth it. I found scholarships I never knew existed and both matched my profile.",
		name: "Rahul Deshmukh",
		role: "B.Tech Student",
		city: "Nagpur",
		rating: 4,
	},
	{
		id: "4",
		avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
		quote:
			"Saarthi4u gave me a clear roadmap for NEET prep, colleges, and cutoffs. It saved me hours during results season.",
		name: "Anjali Verma",
		role: "MBBS Aspirant",
		city: "Delhi",
		rating: 5,
	},
	{
		id: "5",
		avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg",
		quote:
			"As a parent, I was overwhelmed by options. This platform made the full admission process transparent and stress-free.",
		name: "Suresh Mehta",
		role: "Parent",
		city: "Ahmedabad",
		rating: 5,
	},
	{
		id: "6",
		avatarUrl: "https://randomuser.me/api/portraits/women/90.jpg",
		quote:
			"One session on design colleges gave me a practical action plan for NID and NIFT applications.",
		name: "Kavya Reddy",
		role: "Design Aspirant",
		city: "Hyderabad",
		rating: 5,
	},
	{
		id: "7",
		avatarUrl: "https://randomuser.me/api/portraits/men/65.jpg",
		quote:
			"I found three matching scholarships within minutes. The platform is fast, clean, and genuinely useful.",
		name: "Arjun Nair",
		role: "Engineering Student",
		city: "Kochi",
		rating: 4,
	},
	{
		id: "8",
		avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
		quote:
			"The CLAT roadmap here was a game changer. I got into a National Law University with much better clarity and confidence.",
		name: "Riya Joshi",
		role: "Law Student",
		city: "Jaipur",
		rating: 5,
	},
	{
		id: "9",
		avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
		quote:
			"Clear cutoff data and admission routes for each college meant no more jumping between multiple websites.",
		name: "Siddharth Kulkarni",
		role: "Commerce Graduate",
		city: "Nashik",
		rating: 4,
	},
];
