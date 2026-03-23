export const CONTACT_NUMBER = "8409700152";
export const BUSINESS_NAME = "AS-Fitness";
export const ADDRESS = "Puraini Bhagalpur Bihar 812005, India";

export type Service = {
  key: string;
  title: string;
  description: string;
  iconKey: "dumbbell" | "user" | "target" | "apple";
};

export const SERVICES: Service[] = [
  {
    key: "gym-training",
    title: "Gym Training",
    description:
      "Guided strength training with proper form checks, progressive plans, and motivation.",
    iconKey: "dumbbell",
  },
  {
    key: "personal-training",
    title: "Personal Training",
    description:
      "1-on-1 coaching tailored to your goals—strength, posture, energy, and consistency.",
    iconKey: "user",
  },
  {
    key: "weight-loss",
    title: "Weight Loss Programs",
    description:
      "Fat-loss focused routines with weekly tracking and realistic, sustainable habits.",
    iconKey: "target",
  },
  {
    key: "diet-guidance",
    title: "Diet Guidance",
    description:
      "Simple nutrition plans that match your schedule, preferences, and budget.",
    iconKey: "apple",
  },
];

export type Testimonial = {
  name: string;
  tag: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahul S.",
    tag: "Muscle Gain",
    quote:
      "After 8 weeks, I finally felt stronger and more confident. The coach tracks everything and corrects my form.",
  },
  {
    name: "Priya K.",
    tag: "Weight Loss",
    quote:
      "The program is tough but practical. I lost weight without starving, and the diet guidance helped me stay consistent.",
  },
  {
    name: "Aman R.",
    tag: "Personal Training",
    quote:
      "My plan feels personal. Every session has a goal, and the motivation never drops.",
  },
];

export const TRAINER = {
  name: "Certified Trainer",
  title: "Strength, Fat Loss & Nutrition Coach",
  image:
    "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80",
  bio:
    "We focus on correct technique, progressive training, and habits you can follow long-term. Expect structured workouts and clear feedback at every step.",
  highlights: ["Form-first coaching", "Weekly progress checks", "Goal-based programming"],
};

export const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern gym interior with training machines",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80",
    alt: "Strength training setup with dumbbells",
  },
  {
    src: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1200&q=80",
    alt: "Personal training session in gym",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    alt: "Weight training transformation workout",
  },
  {
    src: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1200&q=80",
    alt: "High-energy cardio workout",
  },
  {
    src: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1200&q=80",
    alt: "Gym equipment and coaching environment",
  },
  {
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
    alt: "Motivated workout space",
  },
  {
    src: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=80",
    alt: "Fitness community training together",
  },
];

export const BEFORE_AFTER = {
  before: {
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=80",
    alt: "Before transformation fitness portrait",
  },
  after: {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    alt: "After transformation fitness portrait",
  },
  stats: [
    { label: "Program", value: "8 weeks" },
    { label: "Focus", value: "Strength + Fat Loss" },
    { label: "Coaching", value: "Weekly check-ins" },
  ],
};

