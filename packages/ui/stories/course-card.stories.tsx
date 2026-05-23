import type { Meta, StoryObj } from "@storybook/react-vite";

import { CourseCard } from "../components/courses/course-card";
import { TooltipProvider } from "ui/components/tooltip";
import { MOCK_COMMENTS } from "ui/components/comments/constants";
import { Route, MemoryRouter, Router, Routes } from "react-router";
import { Provider } from "urql";

const withRouteParams = (path: string, initialEntry: string) => (Story) => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <Routes>
      <Route path={path} element={<Story />} />
    </Routes>
  </MemoryRouter>
);

 const mockClient = {
    executeQuery: () => {},
    executeMutation: ()=> {},
    executeSubscription: () => {},
  };
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Particles/CourseCard",
  component: CourseCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    withRouteParams("/", ""),
    (Story) => (
      <Provider value={mockClient}>
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof CourseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultCourseData = {
  title: "dude",
  createdAt: "",
  duration: 1000,
  featuredImage: "",
  id: "1218299dne2d9e3nd3",
  price: 777,
  updatedAt: "",
  isUnlocked: true,
  progress: {
    completed: false,
    id: "",
    course: {
      __typename: undefined,
      category: undefined,
      certificates: undefined,
      createdAt: "",
      creator: undefined,
      creatorID: undefined,
      description: undefined,
      discountedPrice: undefined,
      duration: 0,
      enrollments: undefined,
      extraSettings: undefined,
      featuredImage: "",
      id: "",
      instructors: undefined,
      isUnlocked: undefined,
      learningPaths: undefined,
      level: undefined,
      maxEnrollments: undefined,
      metadata: undefined,
      prerequisites: undefined,
      price: 0,
      pricingType: undefined,
      progress: undefined,
      promotionDuration: undefined,
      publishedAt: undefined,
      requirements: undefined,
      reviews: undefined,
      scheduledPublishAt: undefined,
      shortDescription: undefined,
      status: undefined,
      tags: undefined,
      title: "",
      topics: undefined,
      updatedAt: "",
      video: undefined,
      visibility: undefined,
    },
    createdAt: "",
    progressPercentage: 0,
    startedAt: "",
    updatedAt: "",
    user: {
      __typename: undefined,
      authProvider: undefined,
      company: undefined,
      createdAt: "",
      email: "",
      fullName: "",
      id: "",
      interests: undefined,
      isActive: undefined,
      isVerified: undefined,
      major: undefined,
      occupation: undefined,
      phoneNumber: undefined,
      profilePicture: undefined,
      role: undefined,
      socialId: undefined,
      stripeId: undefined,
      updatedAt: "",
      userName: "",
    },
  },
};

export const Primary: Story = {
  args: {
    course: defaultCourseData,
  },
};


export const Locked: Story = {
  args: {
    course: {
      ...defaultCourseData,
      isUnlocked: false,
      prerequisites: [{
          title: "dude perron", id: "2",
          createdAt: "",
          duration: 0,
          featuredImage: "",
          price: 0,
          updatedAt: ""
      }],
    },
  },
};