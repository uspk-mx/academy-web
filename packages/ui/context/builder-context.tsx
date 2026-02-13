import type { VideoInput } from "gql-generated/generated/types";
import { Visibility } from "gql-generated/generated/types";
import type { Content } from "@tiptap/react";
import type { ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";
import { PricingType } from "gql-generated/gql/graphql";

export interface BuilderState {
  description: Content;
  date: Date | null;
  time: string | null;
  pricingModel: PricingType;
  tags: string[];
  selectedAuthor: string;
  selectedCategory: string;
  selectedLevel: string;
  coursePrice?: number | string | undefined;
  discountedPrice?: number | string | undefined;
  title: string;
  shortDescription?: string;
  maxEnrollments: number | undefined;
  visibility?: Visibility;
  characterCount: number;
  featuredImage: string;
  introVideo?: Partial<VideoInput>;
  extraSettings?: {
    key?: string;
    value?: string;
  }[];
  metadata?: {
    benefits?: string[];
    learnings?: string[];
    materialsIncluded?: string[];
    requirementsInstructions?: string[];
    targetAudience?: string[];
  };
  duration?: number;
}

type BuilderAction =
  | { type: "SET_DESCRIPTION"; payload: Content }
  | { type: "SET_DATE"; payload: Date | null }
  | { type: "SET_TIME"; payload: string | null }
  | { type: "SET_PRICING_MODEL"; payload: PricingType }
  | { type: "SET_TAGS"; payload: string[] }
  | { type: "SET_AUTHOR"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_LEVEL"; payload: string }
  | { type: "SET_COURSE_PRICE"; payload: number }
  | { type: "SET_DISCOUNTED_PRICE"; payload: number }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_SHORT_DESCRIPTION"; payload: string }
  | { type: "SET_MAX_ENROLLMENTS"; payload: number }
  | { type: "SET_CHARACTER_COUNT"; payload: number }
  | { type: "SET_VISIBILITY"; payload: Visibility }
  | {
      type: "SET_FEATURED_IMAGE";
      payload: Partial<BuilderState["featuredImage"]>;
    }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_METADATA"; payload: BuilderState["metadata"] }
  | { type: "SET_EXTRA_SETTINGS"; payload: BuilderState["extraSettings"] }
  | { type: "SET_INTRO_VIDEO"; payload: Partial<BuilderState["introVideo"]> };

const initialState: BuilderState = {
  description: "",
  date: null,
  time: null,
  pricingModel: PricingType.Free,
  tags: [],
  selectedAuthor: "",
  selectedCategory: "",
  selectedLevel: "",
  shortDescription: "",
  coursePrice: 0,
  discountedPrice: 0,
  maxEnrollments: undefined,
  title: "",
  characterCount: 0,
  visibility: Visibility.Public,
  featuredImage: "",
  introVideo: {
    description: "",
    duration: 0,
    format: "",
    height: 1920,
    source: "",
    tags: [""],
    type: "",
    videoURL: "",
    width: 1080,
  },
  metadata: {
    benefits: undefined,
    learnings: undefined,
    materialsIncluded: undefined,
    requirementsInstructions: undefined,
    targetAudience: undefined,
  },
  extraSettings: undefined,
  duration: undefined,
};

const builderReducer = (
  state: BuilderState,
  action: BuilderAction
): BuilderState => {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_PRICING_MODEL":
      return { ...state, pricingModel: action.payload };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_AUTHOR":
      return { ...state, selectedAuthor: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_LEVEL":
      return { ...state, selectedLevel: action.payload };
    case "SET_COURSE_PRICE":
      return { ...state, coursePrice: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_SHORT_DESCRIPTION":
      return { ...state, shortDescription: action.payload };
    case "SET_DISCOUNTED_PRICE":
      return { ...state, discountedPrice: action.payload };
    case "SET_VISIBILITY":
      return { ...state, visibility: action.payload };
    case "SET_MAX_ENROLLMENTS":
      return { ...state, maxEnrollments: action.payload };
    case "SET_CHARACTER_COUNT":
      return { ...state, characterCount: action.payload };
    case "SET_FEATURED_IMAGE":
      return {
        ...state,
        featuredImage: action.payload,
      };
    case "SET_INTRO_VIDEO":
      return {
        ...state,
        introVideo: { ...state.introVideo, ...action.payload },
      };
    case "SET_METADATA":
      return {
        ...state,
        metadata: { ...state.metadata, ...action.payload },
      };
    case "SET_EXTRA_SETTINGS":
      return {
        ...state,
        extraSettings: action.payload || [],
      };
    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload,
      };
    default:
      return state;
  }
};

const BuilderStateContext = createContext<BuilderState | undefined>(undefined);
const BuilderDispatchContext = createContext<
  React.ActionDispatch<[BuilderAction]> | undefined
>(undefined);

export function BuilderProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  return (
    <BuilderStateContext.Provider value={state}>
      <BuilderDispatchContext.Provider value={dispatch}>
        {children}
      </BuilderDispatchContext.Provider>
    </BuilderStateContext.Provider>
  );
}

export const useBuilderState = (): BuilderState => {
  const context = useContext(BuilderStateContext);
  if (context === undefined) {
    throw new Error(
      "useBuilderState must be used within a BuilderStateProvider"
    );
  }
  return context;
};

export const useBuilderDispatch = (): React.ActionDispatch<[BuilderAction]> => {
  const context = useContext(BuilderDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useBuilderDispatch must be used within a BuilderDispatchProvider"
    );
  }
  return context;
};
