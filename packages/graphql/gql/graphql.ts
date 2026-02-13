/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddToCartInput = {
  itemId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type AdminInvite = {
  __typename?: 'AdminInvite';
  companyId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Answer = {
  __typename?: 'Answer';
  correctAnswers?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['String']['output'];
  gapMatch?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isCorrect: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  question?: Maybe<Question>;
  settings?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  viewFormat?: Maybe<Scalars['String']['output']>;
};

export type AnswerInput = {
  ID?: InputMaybe<Scalars['String']['input']>;
  correctAnswers?: InputMaybe<Array<Scalars['String']['input']>>;
  gapMatch?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isCorrect: Scalars['Boolean']['input'];
  order: Scalars['Int']['input'];
  settings?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  updatedAt: Scalars['String']['input'];
  viewFormat?: InputMaybe<Scalars['String']['input']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  role: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['String']['output'];
  expiresAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};

export type CartItem = {
  __typename?: 'CartItem';
  cartId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inStock: Scalars['Boolean']['output'];
  item: CartItemDetails;
  itemId: Scalars['ID']['output'];
  itemType: ItemType;
  notes?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type CartItemDetails = Course | CourseBundle | SubscriptionPlan;

export type Category = {
  __typename?: 'Category';
  coursesCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Certificate = {
  __typename?: 'Certificate';
  course: Course;
  id: Scalars['ID']['output'];
  issuedAt: Scalars['String']['output'];
  template: CertificateTemplate;
  user: User;
};

export type CertificateTemplate = {
  __typename?: 'CertificateTemplate';
  background?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CertificateTemplateInput = {
  background?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CheckoutSession = {
  __typename?: 'CheckoutSession';
  clientSecret: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type Company = {
  __typename?: 'Company';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  setupIntentClientSecret?: Maybe<Scalars['String']['output']>;
  stripeId?: Maybe<Scalars['String']['output']>;
  subscriptions: Array<CompanySubscription>;
  taxId?: Maybe<Scalars['String']['output']>;
  taxName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type CompanyCourseProgressFilter = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchUser?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCourseProgressRow = {
  __typename?: 'CompanyCourseProgressRow';
  course: Course;
  progress: CourseProgress;
  user: User;
};

export type CompanyCourseProgressSummary = {
  __typename?: 'CompanyCourseProgressSummary';
  avgProgressPercentage: Scalars['Float']['output'];
  completedCount: Scalars['Int']['output'];
  course: Course;
  enrolledCount: Scalars['Int']['output'];
  startedCount: Scalars['Int']['output'];
};

export type CompanyCoursesFilter = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CourseStatus>;
  visibility?: InputMaybe<Visibility>;
};

export type CompanyInvite = {
  __typename?: 'CompanyInvite';
  codeId?: Maybe<Scalars['ID']['output']>;
  companyId?: Maybe<Scalars['ID']['output']>;
  companySubscriptionId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  expiresAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  redeemedByUserId?: Maybe<Scalars['ID']['output']>;
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CompanySubscription = {
  __typename?: 'CompanySubscription';
  activeSubscriptions: Array<UserSubscription>;
  company: Company;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  plan: SubscriptionPlan;
  quantity: Scalars['Int']['output'];
  setupIntentClientSecret?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  stripeSubscriptionId: Scalars['String']['output'];
  subscriptionCodes: Array<SubscriptionCode>;
  updatedAt: Scalars['String']['output'];
};

export type CompanyTeamStats = {
  __typename?: 'CompanyTeamStats';
  activeMembers: Scalars['Int']['output'];
  avgProgressPercentage: Scalars['Float']['output'];
  certificatesEarned: Scalars['Int']['output'];
  coursesCompleted: Scalars['Int']['output'];
  coursesInProgress: Scalars['Int']['output'];
  totalMembers: Scalars['Int']['output'];
};

export type Course = {
  __typename?: 'Course';
  category?: Maybe<Category>;
  certificates?: Maybe<Array<Certificate>>;
  createdAt: Scalars['String']['output'];
  creator?: Maybe<User>;
  creatorID?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountedPrice?: Maybe<Scalars['Float']['output']>;
  duration: Scalars['Int']['output'];
  enrollments?: Maybe<Array<Enrollment>>;
  extraSettings?: Maybe<Array<ExtraSettings>>;
  featuredImage: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instructors?: Maybe<Array<User>>;
  level?: Maybe<Level>;
  maxEnrollments?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<CourseMetadata>;
  price: Scalars['Float']['output'];
  pricingType?: Maybe<PricingType>;
  progress?: Maybe<CourseProgress>;
  promotionDuration?: Maybe<Scalars['Int']['output']>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Array<Review>>;
  scheduledPublishAt?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  status?: Maybe<CourseStatus>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  topics?: Maybe<Array<Topic>>;
  updatedAt: Scalars['String']['output'];
  video?: Maybe<Video>;
  visibility?: Maybe<Visibility>;
};

export type CourseBundle = {
  __typename?: 'CourseBundle';
  courses: Array<Maybe<Course>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountType?: Maybe<DiscountType>;
  discountValue?: Maybe<Scalars['Float']['output']>;
  featuredImage: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  subtotalRegularPrice?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CourseEnrollment = {
  __typename?: 'CourseEnrollment';
  course: Course;
  enrolledAt: Scalars['String']['output'];
  status: EnrollmentStatus;
};

export type CourseEnrollments = {
  __typename?: 'CourseEnrollments';
  courses: Array<CourseEnrollment>;
  id: Scalars['ID']['output'];
  user: User;
};

export type CourseMetadata = {
  __typename?: 'CourseMetadata';
  benefits?: Maybe<Scalars['String']['output']>;
  course: Course;
  id?: Maybe<Scalars['ID']['output']>;
  learnings?: Maybe<Scalars['String']['output']>;
  materialsIncluded?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Scalars['String']['output']>;
  targetAudience?: Maybe<Scalars['String']['output']>;
};

export type CourseMetadataInput = {
  benefits?: InputMaybe<Scalars['String']['input']>;
  learnings?: InputMaybe<Scalars['String']['input']>;
  materialsIncluded?: InputMaybe<Scalars['String']['input']>;
  requirementsInstructions?: InputMaybe<Scalars['String']['input']>;
  targetAudience?: InputMaybe<Scalars['String']['input']>;
};

export type CourseProgress = {
  __typename?: 'CourseProgress';
  averageCompletionTime?: Maybe<Scalars['Float']['output']>;
  averageScore?: Maybe<Scalars['Float']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  completedLessons?: Maybe<Scalars['Int']['output']>;
  completedQuizzes?: Maybe<Scalars['Int']['output']>;
  course: Course;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  progressPercentage: Scalars['Float']['output'];
  startedAt: Scalars['String']['output'];
  totalAssignments?: Maybe<Scalars['Int']['output']>;
  totalLessons?: Maybe<Scalars['Int']['output']>;
  totalQuizzes?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export enum CourseStatus {
  Draft = 'DRAFT',
  InPause = 'IN_PAUSE',
  Published = 'PUBLISHED'
}

export type CreateCertificateInput = {
  certificateTemplateId: Scalars['String']['input'];
  courseId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateCompanyInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCourseBundleInput = {
  courseIds: Array<Scalars['ID']['input']>;
  description: Scalars['String']['input'];
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  featuredImage: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  subtotalRegularPrice?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type CreateCourseInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  instructorIds: Array<Scalars['ID']['input']>;
  levelId?: InputMaybe<Scalars['ID']['input']>;
  metadata?: InputMaybe<CourseMetadataInput>;
  previews?: InputMaybe<VideoInput>;
  price: Scalars['Float']['input'];
  requirements?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateInitialCourseInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  levelId?: InputMaybe<Scalars['ID']['input']>;
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateLessonInput = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  content: Scalars['String']['input'];
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['Int']['input'];
  showPreview?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  topicId: Scalars['ID']['input'];
  video?: InputMaybe<VideoInput>;
};

export type CreateLevelOrCategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateLiveClassInput = {
  courseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endTime: Scalars['String']['input'];
  instructorId: Scalars['String']['input'];
  meetingLink: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export type CreateQuestionInput = {
  answerExplanation?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  questionMark?: InputMaybe<Scalars['Int']['input']>;
  questionOrder?: InputMaybe<Scalars['Int']['input']>;
  questionSettings?: InputMaybe<QuestionSettingsInput>;
  quizID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  type: QuestionType;
};

export type CreateQuizInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  passingGrade?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  timeUnit?: InputMaybe<Scalars['String']['input']>;
  timer?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  topicID: Scalars['ID']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateSubscriptionPlanInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  duration: Scalars['Int']['input'];
  planDescription?: InputMaybe<Scalars['String']['input']>;
  planName: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type CreateTopicInput = {
  courseID: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export enum DiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export type Enrollment = {
  __typename?: 'Enrollment';
  course: Course;
  enrolledAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: EnrollmentStatus;
  user: User;
};

export enum EnrollmentStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Dropped = 'DROPPED'
}

export type ExtraSettings = {
  __typename?: 'ExtraSettings';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ExtraSettingsInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Instructor = {
  __typename?: 'Instructor';
  assignedAt?: Maybe<Scalars['String']['output']>;
  courses: Array<Course>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type InviteAdminsInput = {
  companyId: Scalars['ID']['input'];
  emails: Array<Scalars['String']['input']>;
  mode: Scalars['String']['input'];
};

export type InviteAdminsResult = {
  __typename?: 'InviteAdminsResult';
  companyId: Scalars['ID']['output'];
  errors: Array<Scalars['String']['output']>;
  invited: Scalars['Int']['output'];
  invites: Array<AdminInvite>;
  skipped: Scalars['Int']['output'];
};

export type InviteData = {
  __typename?: 'InviteData';
  companyName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  invitedBy?: Maybe<Scalars['String']['output']>;
  planName?: Maybe<Scalars['String']['output']>;
};

export type InviteEmployeesInput = {
  companySubscriptionId?: InputMaybe<Scalars['ID']['input']>;
  emails: Array<Scalars['String']['input']>;
};

export type InviteEmployeesResult = {
  __typename?: 'InviteEmployeesResult';
  companySubscriptionId: Scalars['ID']['output'];
  errors: Array<Scalars['String']['output']>;
  invited: Scalars['Int']['output'];
  invites: Array<InviteSummary>;
  skipped: Scalars['Int']['output'];
};

export type InviteExpiredAndRenewed = {
  __typename?: 'InviteExpiredAndRenewed';
  newInvite: AdminInvite;
  oldInviteId: Scalars['ID']['output'];
};

export type InviteNotActiveError = {
  __typename?: 'InviteNotActiveError';
  message: Scalars['String']['output'];
};

export type InviteNotFoundError = {
  __typename?: 'InviteNotFoundError';
  message: Scalars['String']['output'];
};

export type InviteSummary = {
  __typename?: 'InviteSummary';
  codeId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export enum ItemType {
  Bundle = 'BUNDLE',
  Course = 'COURSE',
  Subscription = 'SUBSCRIPTION'
}

export type Lesson = {
  __typename?: 'Lesson';
  attachments?: Maybe<Array<Scalars['String']['output']>>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  featuredImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<LessonProgress>;
  showPreview?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
  topic?: Maybe<Topic>;
  updatedAt: Scalars['String']['output'];
  video?: Maybe<Video>;
};

export type LessonProgress = {
  __typename?: 'LessonProgress';
  completed: Scalars['Boolean']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lesson: Lesson;
  startedAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Level = {
  __typename?: 'Level';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type LiveClass = {
  __typename?: 'LiveClass';
  course: Course;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instructor: Instructor;
  meetingLink: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type Login = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type MarkLessonCompletedInput = {
  lessonId: Scalars['ID']['input'];
};

export type MatrixMatch = {
  __typename?: 'MatrixMatch';
  columnA: Scalars['String']['output'];
  columnB: Scalars['String']['output'];
};

export type MatrixMatchInput = {
  columnA: Scalars['String']['input'];
  columnB: Scalars['String']['input'];
};

export type Me = {
  __typename?: 'Me';
  authProvider?: Maybe<Scalars['String']['output']>;
  bundles?: Maybe<Array<CourseBundle>>;
  carts: Cart;
  company?: Maybe<Company>;
  courses: Array<Maybe<Course>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  customerId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  interests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  socialId?: Maybe<Scalars['String']['output']>;
  stripeId?: Maybe<Scalars['String']['output']>;
  subscription?: Maybe<UserSubscription>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateCompanySubscription: UserSubscription;
  activateSubscription: UserSubscription;
  addToCart: Cart;
  assignInstructor: Instructor;
  assignSubscriptionCode: SubscriptionCode;
  cancelUserSubscription: Scalars['Boolean']['output'];
  changePassword: Scalars['String']['output'];
  checkout: CheckoutSession;
  createBulkSubscriptionCodes: Array<SubscriptionCode>;
  createCategory: Category;
  createCertificate: Certificate;
  createCertificateTemplate: CertificateTemplate;
  createCompany: Company;
  createCourseBundle: CourseBundle;
  createEnrollment: Enrollment;
  createInitialCourse: Course;
  createLesson: Lesson;
  createLevel: Level;
  createLiveClass: LiveClass;
  createQuestion: Question;
  createQuiz: Quiz;
  createRole: Roles;
  createSubscriptionPlan: SubscriptionPlan;
  createTopic: Topic;
  createUser: Scalars['String']['output'];
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteCertificate?: Maybe<Scalars['Boolean']['output']>;
  deleteCertificateTemplate?: Maybe<Scalars['Boolean']['output']>;
  deleteCompany?: Maybe<Scalars['Boolean']['output']>;
  deleteCourse?: Maybe<Scalars['Boolean']['output']>;
  deleteCourseBundle: Scalars['Boolean']['output'];
  deleteEnrollment?: Maybe<Scalars['Boolean']['output']>;
  deleteLesson?: Maybe<Scalars['Boolean']['output']>;
  deleteLevel?: Maybe<Scalars['Boolean']['output']>;
  deleteLiveClass?: Maybe<Scalars['Boolean']['output']>;
  deleteQuestion?: Maybe<Scalars['Boolean']['output']>;
  deleteQuiz?: Maybe<Scalars['Boolean']['output']>;
  deleteRole?: Maybe<Scalars['Boolean']['output']>;
  deleteSubscriptionPlan: Scalars['Boolean']['output'];
  deleteTopic?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  inviteAdmins: InviteAdminsResult;
  inviteEmployees: InviteEmployeesResult;
  login: AuthResult;
  logout: Scalars['Boolean']['output'];
  markLessonCompleted?: Maybe<LessonProgress>;
  payCompanySubscription: PayCompanySubscriptionResult;
  refreshToken: Scalars['String']['output'];
  removeFromCart: Cart;
  requestSubscriptionCodes: CompanySubscription;
  resendAdminInvite: ResendAdminInviteResult;
  resendInvite: Scalars['Boolean']['output'];
  resetPassword: Scalars['String']['output'];
  startCourseProgress?: Maybe<CourseProgress>;
  submitQuizAttempt?: Maybe<QuizProgress>;
  subscribeUser: UserSubscription;
  toggleSubscriptionStatus: UserSubscription;
  unassignInstructor: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateCertificate: Certificate;
  updateCertificateTemplate: CertificateTemplate;
  updateCompany: Company;
  updateCourse: Course;
  updateCourseBundle: CourseBundle;
  updateCourseProgress?: Maybe<CourseProgress>;
  updateEnrollmentStatus: Enrollment;
  updateLesson: Lesson;
  updateLevel: Level;
  updateLiveClass: LiveClass;
  updateQuestion: Question;
  updateQuiz: Quiz;
  updateQuizProgress?: Maybe<QuizProgress>;
  updateRole: Roles;
  updateSubscriptionPlan: SubscriptionPlan;
  updateTopic: Topic;
  updateUser: User;
  updateUserPassword: Scalars['Boolean']['output'];
  updateUserProfile: UserProfile;
  validateUniqueUser: Scalars['Boolean']['output'];
};


export type MutationActivateCompanySubscriptionArgs = {
  token: Scalars['String']['input'];
};


export type MutationActivateSubscriptionArgs = {
  code: Scalars['String']['input'];
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationAssignInstructorArgs = {
  courseId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAssignSubscriptionCodeArgs = {
  codeId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
};


export type MutationCancelUserSubscriptionArgs = {
  subscriptionId: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCheckoutArgs = {
  cartId: Scalars['ID']['input'];
};


export type MutationCreateBulkSubscriptionCodesArgs = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  planId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  recurring: Scalars['Boolean']['input'];
};


export type MutationCreateCategoryArgs = {
  input: CreateLevelOrCategoryInput;
};


export type MutationCreateCertificateArgs = {
  input: CreateCertificateInput;
};


export type MutationCreateCertificateTemplateArgs = {
  input: CertificateTemplateInput;
};


export type MutationCreateCompanyArgs = {
  input?: InputMaybe<CreateCompanyInput>;
};


export type MutationCreateCourseBundleArgs = {
  input: CreateCourseBundleInput;
};


export type MutationCreateEnrollmentArgs = {
  courseId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateInitialCourseArgs = {
  input: CreateInitialCourseInput;
};


export type MutationCreateLessonArgs = {
  input: CreateLessonInput;
};


export type MutationCreateLevelArgs = {
  input: CreateLevelOrCategoryInput;
};


export type MutationCreateLiveClassArgs = {
  input: CreateLiveClassInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateQuizArgs = {
  input: CreateQuizInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateSubscriptionPlanArgs = {
  input: CreateSubscriptionPlanInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCertificateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCertificateTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCompanyArgs = {
  companyId: Scalars['ID']['input'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCourseBundleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEnrollmentArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type MutationDeleteLessonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLevelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLiveClassArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuizArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubscriptionPlanArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTopicArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInviteAdminsArgs = {
  input: InviteAdminsInput;
};


export type MutationInviteEmployeesArgs = {
  input: InviteEmployeesInput;
};


export type MutationLoginArgs = {
  input: Login;
};


export type MutationMarkLessonCompletedArgs = {
  input: MarkLessonCompletedInput;
};


export type MutationPayCompanySubscriptionArgs = {
  companySubscriptionId: Scalars['ID']['input'];
  paymentMethodId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRemoveFromCartArgs = {
  itemId: Scalars['ID']['input'];
};


export type MutationRequestSubscriptionCodesArgs = {
  companyId: Scalars['ID']['input'];
  planId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationResendAdminInviteArgs = {
  inviteId: Scalars['ID']['input'];
};


export type MutationResendInviteArgs = {
  companySubscriptionId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationStartCourseProgressArgs = {
  input: StartCourseProgressInput;
};


export type MutationSubmitQuizAttemptArgs = {
  input: SubmitQuizAttemptInput;
};


export type MutationSubscribeUserArgs = {
  input: SubscribeUserInput;
};


export type MutationToggleSubscriptionStatusArgs = {
  isActive: Scalars['Boolean']['input'];
  subscriptionId: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationUnassignInstructorArgs = {
  courseId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLevelOrCategoryInput;
};


export type MutationUpdateCertificateArgs = {
  input: UpdateCertificateInput;
};


export type MutationUpdateCertificateTemplateArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCertificateTemplateInput;
};


export type MutationUpdateCompanyArgs = {
  companyId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateCompanyInput>;
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateCourseInput>;
};


export type MutationUpdateCourseBundleArgs = {
  input: UpdateCourseBundleInput;
};


export type MutationUpdateCourseProgressArgs = {
  input: UpdateCourseProgressInput;
};


export type MutationUpdateEnrollmentStatusArgs = {
  enrollmentId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateLessonArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLessonInput;
};


export type MutationUpdateLevelArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLevelOrCategoryInput;
};


export type MutationUpdateLiveClassArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLiveClassInput;
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateQuestionInput;
};


export type MutationUpdateQuizArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateQuizInput>;
};


export type MutationUpdateQuizProgressArgs = {
  input: QuizProgressInput;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID']['input'];
  input: UpdateRoleInput;
};


export type MutationUpdateSubscriptionPlanArgs = {
  input: UpdateSubscriptionPlanInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<UpdateTopicInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationValidateUniqueUserArgs = {
  input: ValidateUniqueUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type PaginatedBundle = {
  __typename?: 'PaginatedBundle';
  bundle: Array<CourseBundle>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedCourse = {
  __typename?: 'PaginatedCourse';
  course: Array<Course>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PayCompanySubscriptionResult = CompanySubscription | SetupIntentRequired;

export enum PricingType {
  Custom = 'CUSTOM',
  Free = 'FREE',
  Paid = 'PAID'
}

export type Query = {
  __typename?: 'Query';
  activeUserSubscription?: Maybe<UserSubscription>;
  bundle: CourseBundle;
  bundles: PaginatedBundle;
  cart?: Maybe<Cart>;
  checkUserExists: UserExistsResult;
  companies: Array<Company>;
  company: Company;
  companyAdminInvites: Array<AdminInvite>;
  companyAdmins: Array<User>;
  companyCourseProgress: Array<CompanyCourseProgressRow>;
  companyCourseProgressSummary: Array<CompanyCourseProgressSummary>;
  companyCourses: Array<Course>;
  companyInvites: Array<CompanyInvite>;
  companySubscriptions: Array<CompanySubscription>;
  companyTeamMembers: TeamMembersResult;
  companyTeamStats: CompanyTeamStats;
  companyUsers: Array<User>;
  course: Course;
  courseIntroVideo?: Maybe<Video>;
  courses: PaginatedCourse;
  coursesForInstructor: Array<Course>;
  getCategories: Array<Category>;
  getCategory?: Maybe<Category>;
  getCertificateById?: Maybe<Certificate>;
  getCertificateTemplateById?: Maybe<CertificateTemplate>;
  getCertificateTemplates?: Maybe<Array<CertificateTemplate>>;
  getCertificateTemplatesByCourse?: Maybe<Array<CertificateTemplate>>;
  getCertificates?: Maybe<Array<Certificate>>;
  getCertificatesByCourse?: Maybe<Array<Certificate>>;
  getCertificatesByUser?: Maybe<Array<Certificate>>;
  getCourseEnrollments?: Maybe<Array<Enrollment>>;
  getCourseProgress?: Maybe<CourseProgress>;
  getEnrollmentById?: Maybe<Enrollment>;
  getEnrollments?: Maybe<Array<Enrollment>>;
  getLessonProgress?: Maybe<LessonProgress>;
  getLevel?: Maybe<Level>;
  getLevels: Array<Level>;
  getProfile?: Maybe<Me>;
  getQuizProgress?: Maybe<QuizProgress>;
  getRole?: Maybe<Roles>;
  getUser?: Maybe<User>;
  getUserEnrollments?: Maybe<Array<Enrollment>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  instructorBundles: PaginatedBundle;
  instructorCourses: PaginatedCourse;
  instructors: Array<Instructor>;
  internalUsers: Array<User>;
  lesson: Lesson;
  lessons: Array<Lesson>;
  lessonsByTopicId: Array<Lesson>;
  listRoles?: Maybe<Array<Maybe<Roles>>>;
  me?: Maybe<Me>;
  question: Question;
  questions: Array<Question>;
  questionsByQuizId: Array<Question>;
  quiz: Quiz;
  quizzes: Array<Quiz>;
  quizzesByTopicId: Array<Quiz>;
  subscriptionPlans: Array<SubscriptionPlan>;
  subscriptionReport: SubscriptionReport;
  topic: Topic;
  topics: Array<Topic>;
  topicsByCourseId: Array<Topic>;
  userSubscriptions: Array<UserSubscription>;
  validateInviteToken: ValidateInviteTokenResult;
};


export type QueryActiveUserSubscriptionArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryBundleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBundlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCheckUserExistsArgs = {
  email: Scalars['String']['input'];
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCompanyAdminInvitesArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryCompanyAdminsArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryCompanyCourseProgressArgs = {
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCourseProgressFilter>;
};


export type QueryCompanyCourseProgressSummaryArgs = {
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCourseProgressFilter>;
};


export type QueryCompanyCoursesArgs = {
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCoursesFilter>;
};


export type QueryCompanyInvitesArgs = {
  companySubscriptionId: Scalars['ID']['input'];
};


export type QueryCompanySubscriptionsArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryCompanyTeamMembersArgs = {
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<TeamMembersFilter>;
};


export type QueryCompanyTeamStatsArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryCompanyUsersArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCourseIntroVideoArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCoursesForInstructorArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetCertificateByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCertificateTemplateByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCertificateTemplatesByCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryGetCertificatesByCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryGetCertificatesByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetCourseEnrollmentsArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryGetCourseProgressArgs = {
  courseId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryGetEnrollmentByIdArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type QueryGetLessonProgressArgs = {
  lessonId: Scalars['ID']['input'];
};


export type QueryGetLevelArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetQuizProgressArgs = {
  quizId: Scalars['ID']['input'];
};


export type QueryGetRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInstructorBundlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInstructorCoursesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLessonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLessonsByTopicIdArgs = {
  topicId: Scalars['ID']['input'];
};


export type QueryQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuestionsByQuizIdArgs = {
  quizId: Scalars['ID']['input'];
};


export type QueryQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuizzesByTopicIdArgs = {
  topicId: Scalars['ID']['input'];
};


export type QuerySubscriptionReportArgs = {
  companyId: Scalars['ID']['input'];
  companySubscriptionId: Scalars['String']['input'];
};


export type QueryTopicArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopicsByCourseIdArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryUserSubscriptionsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryValidateInviteTokenArgs = {
  token: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  answerExplanation?: Maybe<Scalars['String']['output']>;
  answers?: Maybe<Array<Answer>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mark: Scalars['Float']['output'];
  media?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  quiz?: Maybe<Quiz>;
  settings?: Maybe<QuestionSettings>;
  title: Scalars['String']['output'];
  type: QuestionType;
  updatedAt: Scalars['String']['output'];
};

export type QuestionSettings = {
  __typename?: 'QuestionSettings';
  answerRequired?: Maybe<Scalars['Boolean']['output']>;
  correctAnswers?: Maybe<Array<Scalars['String']['output']>>;
  matrixMatches?: Maybe<Array<MatrixMatch>>;
  questionMark?: Maybe<Scalars['Int']['output']>;
  questionType?: Maybe<QuestionType>;
  randomizeQuestion?: Maybe<Scalars['Boolean']['output']>;
  showQuestionMark?: Maybe<Scalars['Boolean']['output']>;
  sortableItems?: Maybe<Array<Scalars['String']['output']>>;
};

export type QuestionSettingsInput = {
  answerRequired?: InputMaybe<Scalars['Boolean']['input']>;
  correctAnswers?: InputMaybe<Array<Scalars['String']['input']>>;
  matrixMatches?: InputMaybe<Array<MatrixMatchInput>>;
  questionMark?: InputMaybe<Scalars['Int']['input']>;
  questionType?: InputMaybe<QuestionType>;
  randomizeQuestion?: InputMaybe<Scalars['Boolean']['input']>;
  showQuestionMark?: InputMaybe<Scalars['Boolean']['input']>;
  sortableItems?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum QuestionType {
  Assessment = 'ASSESSMENT',
  Essay = 'ESSAY',
  FillInTheBlanks = 'FILL_IN_THE_BLANKS',
  FreeChoice = 'FREE_CHOICE',
  MatrixSorting = 'MATRIX_SORTING',
  MultipleChoice = 'MULTIPLE_CHOICE',
  SingleChoice = 'SINGLE_CHOICE',
  Sorting = 'SORTING',
  TrueFalse = 'TRUE_FALSE'
}

export type Quiz = {
  __typename?: 'Quiz';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxAttempts?: Maybe<Scalars['Int']['output']>;
  passingGrade: Scalars['Int']['output'];
  position?: Maybe<Scalars['Int']['output']>;
  progress?: Maybe<QuizProgress>;
  questions?: Maybe<Array<Question>>;
  timeUnit?: Maybe<Scalars['String']['output']>;
  timer?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  topic: Topic;
  updatedAt: Scalars['String']['output'];
};

export type QuizAttempts = {
  __typename?: 'QuizAttempts';
  attemptDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  quiz: Quiz;
  score: Scalars['Float']['output'];
  user: User;
};

export type QuizProgress = {
  __typename?: 'QuizProgress';
  completed: Scalars['Boolean']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  quiz: Quiz;
  score: Scalars['Float']['output'];
  startedAt: Scalars['String']['output'];
  user: User;
};

export type QuizProgressInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  quizId: Scalars['ID']['input'];
  score?: InputMaybe<Scalars['Float']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshTokenInput = {
  token: Scalars['String']['input'];
};

export type ResendAdminInviteResult = AdminInvite | InviteExpiredAndRenewed | InviteNotActiveError | InviteNotFoundError;

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Roles = {
  __typename?: 'Roles';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SetupIntentRequired = {
  __typename?: 'SetupIntentRequired';
  clientSecret: Scalars['String']['output'];
};

export type StartCourseProgressInput = {
  courseId: Scalars['ID']['input'];
};

export type SubmitQuizAttemptInput = {
  attemptDate?: InputMaybe<Scalars['String']['input']>;
  quizId: Scalars['ID']['input'];
  score?: InputMaybe<Scalars['Float']['input']>;
};

export type SubscribeUserInput = {
  planId: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type SubscriptionCode = {
  __typename?: 'SubscriptionCode';
  code: Scalars['String']['output'];
  company?: Maybe<Company>;
  companySubscription?: Maybe<CompanySubscription>;
  createdAt: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRedeemed: Scalars['Boolean']['output'];
  plan: SubscriptionPlan;
  redeemedBy?: Maybe<User>;
  status: Scalars['String']['output'];
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
};

export type SubscriptionPlan = {
  __typename?: 'SubscriptionPlan';
  category?: Maybe<Category>;
  createdAt: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  planDescription?: Maybe<Scalars['String']['output']>;
  planName: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stripePricePlanID: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SubscriptionReport = {
  __typename?: 'SubscriptionReport';
  activeSubscriptions: Scalars['Int']['output'];
  companySubscriptionId: Scalars['String']['output'];
  redeemedSubscriptions: Scalars['Int']['output'];
  totalSubscriptions: Scalars['Int']['output'];
  unredeemedSubscriptions: Scalars['Int']['output'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  avgProgress: Scalars['Float']['output'];
  certificatesEarned: Scalars['Int']['output'];
  coursesCompleted: Scalars['Int']['output'];
  coursesInProgress: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastActivityAt?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type TeamMembersFilter = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type TeamMembersResult = {
  __typename?: 'TeamMembersResult';
  members: Array<TeamMember>;
  total: Scalars['Int']['output'];
};

export type Topic = {
  __typename?: 'Topic';
  course: Course;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lessons?: Maybe<Array<Lesson>>;
  position?: Maybe<Scalars['Int']['output']>;
  quizzes?: Maybe<Array<Quiz>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type UpdateCertificateInput = {
  certificateTemplateId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  issuedAt?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCertificateTemplateInput = {
  background?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompanyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
  taxName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseBundleInput = {
  courseIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  subtotalRegularPrice?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  creatorId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountedPrice?: InputMaybe<Scalars['Float']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  extraSettings?: InputMaybe<Array<ExtraSettingsInput>>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  levelId?: InputMaybe<Scalars['ID']['input']>;
  maxEnrollments?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<CourseMetadataInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  pricingType?: InputMaybe<PricingType>;
  promotionDuration?: InputMaybe<Scalars['Int']['input']>;
  requirements?: InputMaybe<Scalars['String']['input']>;
  scheduledPublishAt?: InputMaybe<Scalars['DateTime']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CourseStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  video?: InputMaybe<VideoInput>;
  visibility?: InputMaybe<Visibility>;
};

export type UpdateCourseProgressInput = {
  averageCompletionTime?: InputMaybe<Scalars['Float']['input']>;
  averageScore?: InputMaybe<Scalars['Float']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  completedLessons?: InputMaybe<Scalars['Int']['input']>;
  completedQuizzes?: InputMaybe<Scalars['Int']['input']>;
  courseId: Scalars['ID']['input'];
  progressPercentage?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['ID']['input'];
};

export type UpdateLessonInput = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  content?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  showPreview?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<VideoInput>;
};

export type UpdateLevelOrCategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLiveClassInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  instructorId?: InputMaybe<Scalars['String']['input']>;
  meetingLink?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionInput = {
  answerExplanation?: InputMaybe<Scalars['String']['input']>;
  answers?: InputMaybe<Array<InputMaybe<AnswerInput>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Scalars['String']['input']>;
  questionMark?: InputMaybe<Scalars['Int']['input']>;
  questionOrder?: InputMaybe<Scalars['Int']['input']>;
  questionSettings?: InputMaybe<QuestionSettingsInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<QuestionType>;
};

export type UpdateQuizInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  passingGrade?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  timeUnit?: InputMaybe<Scalars['String']['input']>;
  timer?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubscriptionPlanInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  planDescription?: InputMaybe<Scalars['String']['input']>;
  planName?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateTopicInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateUserProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  interests?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  major?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  authProvider?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Company>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  interests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  socialId?: Maybe<Scalars['String']['output']>;
  stripeId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type UserCategoryAccess = {
  __typename?: 'UserCategoryAccess';
  category: Category;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  startDate: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type UserExistsResult = {
  __typename?: 'UserExistsResult';
  exists: Scalars['Boolean']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  major?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  company?: Maybe<Company>;
  companySubscription?: Maybe<CompanySubscription>;
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  plan: SubscriptionPlan;
  startDate: Scalars['String']['output'];
  stripeSubscriptionId: Scalars['String']['output'];
  user: User;
};

export type ValidateInviteTokenResult = {
  __typename?: 'ValidateInviteTokenResult';
  data?: Maybe<InviteData>;
  expired?: Maybe<Scalars['Boolean']['output']>;
  used?: Maybe<Scalars['Boolean']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type ValidateUniqueUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Video = {
  __typename?: 'Video';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  source?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  videoURL?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type VideoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
  videoURL?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export enum Visibility {
  PasswordProtected = 'PASSWORD_PROTECTED',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type LoginMutationVariables = Exact<{
  input: Login;
}>;


export type LoginMutation = { __typename: 'Mutation', login: { __typename: 'AuthResult', token: string, role: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename: 'Mutation', logout: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename: 'Mutation', changePassword: string };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename: 'Mutation', resetPassword: string };

export type ValidateInviteTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateInviteTokenQuery = { __typename: 'Query', validateInviteToken: { __typename: 'ValidateInviteTokenResult', valid: boolean, expired?: boolean | null, used?: boolean | null, data?: { __typename: 'InviteData', email?: string | null, companyName?: string | null, invitedBy?: string | null, planName?: string | null } | null } };

export type CheckUserExistsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckUserExistsQuery = { __typename: 'Query', checkUserExists: { __typename: 'UserExistsResult', exists: boolean, userId?: string | null } };

export type CreateCourseBundleMutationVariables = Exact<{
  input: CreateCourseBundleInput;
}>;


export type CreateCourseBundleMutation = { __typename: 'Mutation', createCourseBundle: { __typename: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename: 'Course', id: string, tags?: Array<string> | null, title: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, featuredImage: string, visibility?: Visibility | null } | null> } };

export type InstructorBundlesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InstructorBundlesQuery = { __typename: 'Query', instructorBundles: { __typename: 'PaginatedBundle', totalCount?: number | null, pageInfo: { __typename: 'PageInfo', page: number, limit: number, offset: number, hasNextPage: boolean }, bundle: Array<{ __typename: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, featuredImage: string, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, phoneNumber?: string | null, isActive?: boolean | null, userName: string }> | null } | null> }> } };

export type BundlesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BundlesQuery = { __typename: 'Query', bundles: { __typename: 'PaginatedBundle', totalCount?: number | null, pageInfo: { __typename: 'PageInfo', page: number, limit: number, offset: number, hasNextPage: boolean }, bundle: Array<{ __typename: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, featuredImage: string, visibility?: Visibility | null, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, phoneNumber?: string | null, isActive?: boolean | null, userName: string }> | null } | null> }> } };

export type BundleQueryVariables = Exact<{
  bundleId: Scalars['ID']['input'];
}>;


export type BundleQuery = { __typename: 'Query', bundle: { __typename: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename: 'Course', id: string, featuredImage: string, duration: number, description?: string | null, price: number, title: string, visibility?: Visibility | null, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string, userName: string, isActive?: boolean | null }> | null } | null> } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename: 'Query', getCategories: Array<{ __typename: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string }> };

export type GetCategoryQueryVariables = Exact<{
  getCategoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCategoryQuery = { __typename: 'Query', getCategory?: { __typename: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string } | null };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateLevelOrCategoryInput;
}>;


export type CreateCategoryMutation = { __typename: 'Mutation', createCategory: { __typename: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryId: Scalars['ID']['input'];
  input: UpdateLevelOrCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename: 'Mutation', updateCategory: { __typename: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename: 'Mutation', deleteCategory?: boolean | null };

export type CreateCompanyMutationVariables = Exact<{
  input?: InputMaybe<CreateCompanyInput>;
}>;


export type CreateCompanyMutation = { __typename: 'Mutation', createCompany: { __typename: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string } };

export type UpdateCompanyMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateCompanyInput>;
}>;


export type UpdateCompanyMutation = { __typename: 'Mutation', updateCompany: { __typename: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string } };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename: 'Query', companies: Array<{ __typename: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string }> };

export type CompanyQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyQuery = { __typename: 'Query', company: { __typename: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string } };

export type DeleteCompanyMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type DeleteCompanyMutation = { __typename: 'Mutation', deleteCompany?: boolean | null };

export type CompanyAdminsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyAdminsQuery = { __typename: 'Query', companyAdmins: Array<{ __typename: 'User', id: string, fullName: string, userName: string, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }> };

export type CompanyUsersQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyUsersQuery = { __typename: 'Query', companyUsers: Array<{ __typename: 'User', id: string, fullName: string, userName: string, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }> };

export type UserBasicInfoFragment = { __typename: 'User', id: string, fullName: string, userName: string, profilePicture?: string | null, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string };

export type BusinessDashboardPeopleQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type BusinessDashboardPeopleQuery = { __typename: 'Query', companyAdmins: Array<{ __typename: 'User', id: string, fullName: string, userName: string, profilePicture?: string | null, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }>, companyUsers: Array<{ __typename: 'User', id: string, fullName: string, userName: string, profilePicture?: string | null, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }> };

export type CompanyAdminInvitesQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyAdminInvitesQuery = { __typename: 'Query', companyAdminInvites: Array<{ __typename: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string }> };

export type InviteAdminsMutationVariables = Exact<{
  input: InviteAdminsInput;
}>;


export type InviteAdminsMutation = { __typename: 'Mutation', inviteAdmins: { __typename: 'InviteAdminsResult', companyId: string, invited: number, skipped: number, errors: Array<string>, invites: Array<{ __typename: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string }> } };

export type ResendAdminInviteMutationVariables = Exact<{
  inviteId: Scalars['ID']['input'];
}>;


export type ResendAdminInviteMutation = { __typename: 'Mutation', resendAdminInvite: { __typename: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string } | { __typename: 'InviteExpiredAndRenewed', oldInviteId: string, newInvite: { __typename: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string } } | { __typename: 'InviteNotActiveError', message: string } | { __typename: 'InviteNotFoundError', message: string } };

export type CompanyCoursesQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCoursesFilter>;
}>;


export type CompanyCoursesQuery = { __typename: 'Query', companyCourses: Array<{ __typename: 'Course', id: string, title: string, shortDescription?: string | null, featuredImage: string, status?: CourseStatus | null, visibility?: Visibility | null, updatedAt: string, createdAt: string, category?: { __typename: 'Category', id: string, name: string } | null }> };

export type CompanyCourseProgressSummaryQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCourseProgressFilter>;
}>;


export type CompanyCourseProgressSummaryQuery = { __typename: 'Query', companyCourseProgressSummary: Array<{ __typename: 'CompanyCourseProgressSummary', enrolledCount: number, startedCount: number, completedCount: number, avgProgressPercentage: number, course: { __typename: 'Course', id: string, title: string, featuredImage: string, category?: { __typename: 'Category', id: string, name: string } | null } }> };

export type CompanyCourseProgressQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCourseProgressFilter>;
}>;


export type CompanyCourseProgressQuery = { __typename: 'Query', companyCourseProgress: Array<{ __typename: 'CompanyCourseProgressRow', user: { __typename: 'User', id: string, fullName: string, email: string, profilePicture?: string | null }, course: { __typename: 'Course', id: string, title: string, featuredImage: string, category?: { __typename: 'Category', id: string, name: string } | null }, progress: { __typename: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageScore?: number | null, updatedAt: string } }> };

export type TeamDashboardQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<TeamMembersFilter>;
}>;


export type TeamDashboardQuery = { __typename: 'Query', companyTeamStats: { __typename: 'CompanyTeamStats', totalMembers: number, activeMembers: number, coursesInProgress: number, coursesCompleted: number, certificatesEarned: number, avgProgressPercentage: number }, companyTeamMembers: { __typename: 'TeamMembersResult', total: number, members: Array<{ __typename: 'TeamMember', id: string, fullName: string, email: string, role?: string | null, occupation?: string | null, profilePicture?: string | null, isActive?: boolean | null, coursesInProgress: number, coursesCompleted: number, certificatesEarned: number, avgProgress: number, lastActivityAt?: string | null }> } };

export type InstructorCoursesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InstructorCoursesQuery = { __typename: 'Query', instructorCourses: { __typename: 'PaginatedCourse', totalCount?: number | null, pageInfo: { __typename: 'PageInfo', page: number, limit: number, offset: number, hasNextPage: boolean }, course: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, pricingType?: PricingType | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, visibility?: Visibility | null, maxEnrollments?: number | null, scheduledPublishAt?: string | null, publishedAt?: string | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, tags?: Array<string> | null, description?: string | null, duration?: number | null } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename: 'Category', id: string, description?: string | null, name: string } | null, creator?: { __typename: 'User', fullName: string, userName: string, email: string, role?: string | null } | null, instructors?: Array<{ __typename: 'User', fullName: string, userName: string, email: string, role?: string | null, profilePicture?: string | null, phoneNumber?: string | null, id: string, isActive?: boolean | null }> | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, course: { __typename: 'Course', id: string } }> | null, extraSettings?: Array<{ __typename: 'ExtraSettings', key?: string | null, value?: string | null }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, enrollments?: Array<{ __typename: 'Enrollment', id: string, status: EnrollmentStatus, enrolledAt: string, user: { __typename: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, major?: string | null, occupation?: string | null, isActive?: boolean | null, userName: string, stripeId?: string | null } }> | null, certificates?: Array<{ __typename: 'Certificate', id: string, issuedAt: string, template: { __typename: 'CertificateTemplate', id: string, name: string, content: string, logoUrl?: string | null, background?: string | null }, user: { __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, phoneNumber?: string | null }, course: { __typename: 'Course', id: string, title: string } }> | null }> } };

export type CreateInitialCourseMutationVariables = Exact<{
  input: CreateInitialCourseInput;
}>;


export type CreateInitialCourseMutation = { __typename: 'Mutation', createInitialCourse: { __typename: 'Course', id: string, title: string, description?: string | null, pricingType?: PricingType | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string }> | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null } | null, creator?: { __typename: 'User', id: string, fullName: string, email: string } | null } };

export type CourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename: 'Query', course: { __typename: 'Course', id: string, title: string, shortDescription?: string | null, description?: string | null, duration: number, pricingType?: PricingType | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, maxEnrollments?: number | null, visibility?: Visibility | null, createdAt: string, updatedAt: string, scheduledPublishAt?: string | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, tags?: Array<string> | null, description?: string | null, duration?: number | null } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename: 'Category', id: string, description?: string | null, name: string } | null, creator?: { __typename: 'User', id: string, fullName: string, userName: string, email: string, role?: string | null } | null, instructors?: Array<{ __typename: 'User', id: string, fullName: string, userName: string, email: string, phoneNumber?: string | null, isActive?: boolean | null }> | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename: 'Course', id: string, title: string }, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, extraSettings?: Array<{ __typename: 'ExtraSettings', key?: string | null, value?: string | null }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null } };

export type UpdateCourseMutationVariables = Exact<{
  input?: InputMaybe<UpdateCourseInput>;
  updateCourseId: Scalars['ID']['input'];
}>;


export type UpdateCourseMutation = { __typename: 'Mutation', updateCourse: { __typename: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, pricingType?: PricingType | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, maxEnrollments?: number | null, scheduledPublishAt?: string | null, publishedAt?: string | null, visibility?: Visibility | null, instructors?: Array<{ __typename: 'User', fullName: string, email: string }> | null, video?: { __typename: 'Video', videoURL?: string | null, source?: string | null, type?: string | null, id: string, description?: string | null, format?: string | null, tags?: Array<string> | null, height?: number | null, width?: number | null, duration?: number | null } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null } | null, creator?: { __typename: 'User', id: string, fullName: string, email: string } | null, extraSettings?: Array<{ __typename: 'ExtraSettings', key?: string | null, value?: string | null }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, enrollments?: Array<{ __typename: 'Enrollment', id: string, status: EnrollmentStatus, enrolledAt: string, user: { __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, major?: string | null, occupation?: string | null, profilePicture?: string | null, stripeId?: string | null } }> | null } };

export type CourseIntroVideoQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CourseIntroVideoQuery = { __typename: 'Query', courseIntroVideo?: { __typename: 'Video', videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null } | null };

export type DeleteCourseMutationVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type DeleteCourseMutation = { __typename: 'Mutation', deleteCourse?: boolean | null };

export type GetEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnrollmentsQuery = { __typename: 'Query', getEnrollments?: Array<{ __typename: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, user: { __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, occupation?: string | null, phoneNumber?: string | null }, course: { __typename: 'Course', id: string, title: string, description?: string | null, status?: CourseStatus | null, price: number } }> | null };

export type GetEnrollmentByIdQueryVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;


export type GetEnrollmentByIdQuery = { __typename: 'Query', getEnrollmentById?: { __typename: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, user: { __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, occupation?: string | null, phoneNumber?: string | null }, course: { __typename: 'Course', id: string, title: string, description?: string | null, status?: CourseStatus | null, price: number } } | null };

export type CreateEnrollmentMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type CreateEnrollmentMutation = { __typename: 'Mutation', createEnrollment: { __typename: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, user: { __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, occupation?: string | null, phoneNumber?: string | null }, course: { __typename: 'Course', id: string, title: string, description?: string | null, status?: CourseStatus | null, price: number } } };

export type GetUserEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserEnrollmentsQuery = { __typename: 'Query', getUserEnrollments?: Array<{ __typename: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, course: { __typename: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, maxEnrollments?: number | null, visibility?: Visibility | null, scheduledPublishAt?: string | null, publishedAt?: string | null, createdAt: string, updatedAt: string, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, showPreview?: boolean | null, featuredImage?: string | null, content?: string | null, createdAt: string, attachments?: Array<string> | null, position?: number | null, updatedAt: string, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string }> | null }> | null, progress?: { __typename: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, totalAssignments?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageCompletionTime?: number | null, averageScore?: number | null, createdAt: string, updatedAt: string } | null, reviews?: Array<{ __typename: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null }> | null, certificates?: Array<{ __typename: 'Certificate', id: string, issuedAt: string, template: { __typename: 'CertificateTemplate', name: string, logoUrl?: string | null, id: string, content: string, background?: string | null } }> | null, extraSettings?: Array<{ __typename: 'ExtraSettings', key?: string | null, value?: string | null }> | null, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, userName: string }> | null } }> | null };

export type AssignInstructorMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type AssignInstructorMutation = { __typename: 'Mutation', assignInstructor: { __typename: 'Instructor', id: string, assignedAt?: string | null, user: { __typename: 'User', id: string, fullName: string, email: string }, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null }> } };

export type UnassignInstructorMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type UnassignInstructorMutation = { __typename: 'Mutation', unassignInstructor: boolean };

export type CreateLessonMutationVariables = Exact<{
  input: CreateLessonInput;
}>;


export type CreateLessonMutation = { __typename: 'Mutation', createLesson: { __typename: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, topic?: { __typename: 'Topic', id: string, title?: string | null, description?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } };

export type UpdateLessonMutationVariables = Exact<{
  lessonId: Scalars['ID']['input'];
  input: UpdateLessonInput;
}>;


export type UpdateLessonMutation = { __typename: 'Mutation', updateLesson: { __typename: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, showPreview?: boolean | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } };

export type DeleteLessonMutationVariables = Exact<{
  lessonId: Scalars['ID']['input'];
}>;


export type DeleteLessonMutation = { __typename: 'Mutation', deleteLesson?: boolean | null };

export type LessonQueryVariables = Exact<{
  lessonId: Scalars['ID']['input'];
}>;


export type LessonQuery = { __typename: 'Query', lesson: { __typename: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, topic?: { __typename: 'Topic', id: string } | null, video?: { __typename: 'Video', id: string, description?: string | null, videoURL?: string | null, source?: string | null, tags?: Array<string> | null, type?: string | null } | null } };

export type LessonsByTopicIdQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type LessonsByTopicIdQuery = { __typename: 'Query', lessonsByTopicId: Array<{ __typename: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, showPreview?: boolean | null, topic?: { __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null }> };

export type GetLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLevelsQuery = { __typename: 'Query', getLevels: Array<{ __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type GetLevelQueryVariables = Exact<{
  getLevelId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLevelQuery = { __typename: 'Query', getLevel?: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null };

export type CreateLevelMutationVariables = Exact<{
  input: CreateLevelOrCategoryInput;
}>;


export type CreateLevelMutation = { __typename: 'Mutation', createLevel: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } };

export type UpdateLevelMutationVariables = Exact<{
  updateLevelId: Scalars['ID']['input'];
  input: UpdateLevelOrCategoryInput;
}>;


export type UpdateLevelMutation = { __typename: 'Mutation', updateLevel: { __typename: 'Level', id: string, name: string, description?: string | null, updatedAt: string, createdAt: string } };

export type DeleteLevelMutationVariables = Exact<{
  deleteLevelId: Scalars['ID']['input'];
}>;


export type DeleteLevelMutation = { __typename: 'Mutation', deleteLevel?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me?: { __typename: 'Me', customerId: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, interests?: Array<string | null> | null, major?: string | null, occupation?: string | null, isActive?: boolean | null, stripeId?: string | null, updatedAt?: string | null, createdAt?: string | null, carts: { __typename: 'Cart', id: string, subtotal: number, tax: number, total: number, updatedAt: string, expiresAt: string, createdAt: string, items: Array<{ __typename: 'CartItem', id: string, inStock: boolean, cartId: string, itemId: string, itemType: ItemType, notes?: string | null, quantity: number, unitPrice: number, item: { __typename: 'Course', id: string, featuredImage: string, duration: number, discountedPrice?: number | null, description?: string | null, price: number, requirements?: string | null, status?: CourseStatus | null, title: string, tags?: Array<string> | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } | { __typename: 'CourseBundle', id: string, price: number, title: string, subtotalRegularPrice?: number | null, updatedAt: string, featuredImage: string, discountValue?: number | null, discountType?: DiscountType | null, description?: string | null, createdAt: string, courses: Array<{ __typename: 'Course', id: string, title: string, price: number, description?: string | null } | null> } | { __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } }> }, subscription?: { __typename: 'UserSubscription', id: string, startDate: string, endDate: string, user: { __typename: 'User', id: string, fullName: string, email: string }, plan: { __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } } | null, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename: 'Course', id: string, title: string }, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, media?: string | null, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename: 'Certificate', id: string, issuedAt: string, template: { __typename: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null, reviews?: Array<{ __typename: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename: 'Course', id: string, title: string } | null }> | null } | null>, bundles?: Array<{ __typename: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, reviews?: Array<{ __typename: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename: 'Course', id: string, title: string } | null }> | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, position?: number | null, description?: string | null, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename: 'Certificate', id: string, issuedAt: string, template: { __typename: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null } | null> }> | null, company?: { __typename: 'Company', id: string, email: string, name: string, isActive?: boolean | null, taxId?: string | null, taxName?: string | null, stripeId?: string | null, setupIntentClientSecret?: string | null, address?: string | null } | null } | null };

export type MarkLessonCompletedMutationVariables = Exact<{
  input: MarkLessonCompletedInput;
}>;


export type MarkLessonCompletedMutation = { __typename: 'Mutation', markLessonCompleted?: { __typename: 'LessonProgress', id: string, completed: boolean, startedAt?: string | null, completedAt?: string | null, updatedAt?: string | null, user: { __typename: 'User', id: string, fullName: string, email: string }, lesson: { __typename: 'Lesson', id: string, title: string } } | null };

export type SubmitQuizAttemptMutationVariables = Exact<{
  input: SubmitQuizAttemptInput;
}>;


export type SubmitQuizAttemptMutation = { __typename: 'Mutation', submitQuizAttempt?: { __typename: 'QuizProgress', id: string, score: number, completed: boolean, startedAt: string, completedAt?: string | null, user: { __typename: 'User', id: string, fullName: string, email: string }, quiz: { __typename: 'Quiz', id: string, title: string } } | null };

export type GetCourseProgressQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type GetCourseProgressQuery = { __typename: 'Query', getCourseProgress?: { __typename: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, totalAssignments?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageCompletionTime?: number | null, averageScore?: number | null, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, fullName: string, email: string }, course: { __typename: 'Course', id: string, title: string } } | null };

export type StartCourseProgressMutationVariables = Exact<{
  input: StartCourseProgressInput;
}>;


export type StartCourseProgressMutation = { __typename: 'Mutation', startCourseProgress?: { __typename: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, totalAssignments?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageCompletionTime?: number | null, averageScore?: number | null, createdAt: string, updatedAt: string, user: { __typename: 'User', id: string, fullName: string, email: string, userName: string }, course: { __typename: 'Course', id: string, title: string, category?: { __typename: 'Category', id: string, name: string } | null, level?: { __typename: 'Level', id: string, name: string } | null } } | null };

export type UpdateQuizProgressMutationVariables = Exact<{
  input: QuizProgressInput;
}>;


export type UpdateQuizProgressMutation = { __typename: 'Mutation', updateQuizProgress?: { __typename: 'QuizProgress', id: string, score: number, completed: boolean, startedAt: string, completedAt?: string | null, user: { __typename: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, userName: string, profilePicture?: string | null, phoneNumber?: string | null, occupation?: string | null }, quiz: { __typename: 'Quiz', id: string, title: string, timer?: number | null, timeUnit?: string | null, position?: number | null, passingGrade: number, maxAttempts?: number | null, content?: string | null, createdAt: string, updatedAt: string } } | null };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename: 'Mutation', createQuestion: { __typename: 'Question', id: string, title: string, media?: string | null, description?: string | null, type: QuestionType, mark: number, order: number, answerExplanation?: string | null, createdAt: string, updatedAt: string, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null, answers?: Array<{ __typename: 'Answer', id: string, type: string, title: string, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, order: number, correctAnswers?: Array<string> | null, createdAt: string, updatedAt: string }> | null } };

export type UpdateQuestionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  input: UpdateQuestionInput;
}>;


export type UpdateQuestionMutation = { __typename: 'Mutation', updateQuestion: { __typename: 'Question', id: string, title: string, type: QuestionType, media?: string | null, description?: string | null, order: number, mark: number, answerExplanation?: string | null, updatedAt: string, createdAt: string, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null, answers?: Array<{ __typename: 'Answer', id: string, type: string, title: string, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, order: number, correctAnswers?: Array<string> | null, createdAt: string, updatedAt: string }> | null } };

export type DeleteQuestionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
}>;


export type DeleteQuestionMutation = { __typename: 'Mutation', deleteQuestion?: boolean | null };

export type CreateQuizMutationVariables = Exact<{
  input: CreateQuizInput;
}>;


export type CreateQuizMutation = { __typename: 'Mutation', createQuiz: { __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename: 'Topic', id: string, description?: string | null, title?: string | null } } };

export type UpdateQuizMutationVariables = Exact<{
  updateQuizId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateQuizInput>;
}>;


export type UpdateQuizMutation = { __typename: 'Mutation', updateQuiz: { __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename: 'Topic', id: string } } };

export type QuizQueryVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type QuizQuery = { __typename: 'Query', quiz: { __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null }, questions?: Array<{ __typename: 'Question', id: string, title: string, description?: string | null, type: QuestionType, order: number, answerExplanation?: string | null, answers?: Array<{ __typename: 'Answer', id: string, title: string, type: string, order: number, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, correctAnswers?: Array<string> | null }> | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, score: number, completed: boolean, quiz: { __typename: 'Quiz', id: string }, user: { __typename: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, occupation?: string | null, isActive?: boolean | null } } | null } };

export type QuizzesByTopicIdQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type QuizzesByTopicIdQuery = { __typename: 'Query', quizzesByTopicId: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null }, questions?: Array<{ __typename: 'Question', id: string, title: string, media?: string | null, description?: string | null, type: QuestionType, order: number, mark: number, answerExplanation?: string | null, updatedAt: string, createdAt: string, answers?: Array<{ __typename: 'Answer', id: string, title: string, type: string, order: number, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, correctAnswers?: Array<string> | null }> | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, score: number, completed: boolean, quiz: { __typename: 'Quiz', id: string }, user: { __typename: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, occupation?: string | null, isActive?: boolean | null } } | null }> };

export type DeleteQuizMutationVariables = Exact<{
  deleteQuizId: Scalars['ID']['input'];
}>;


export type DeleteQuizMutation = { __typename: 'Mutation', deleteQuiz?: boolean | null };

export type CreateSubscriptionPlanMutationVariables = Exact<{
  input: CreateSubscriptionPlanInput;
}>;


export type CreateSubscriptionPlanMutation = { __typename: 'Mutation', createSubscriptionPlan: { __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string, category?: { __typename: 'Category', name: string, id: string, description?: string | null, createdAt: string, updatedAt: string } | null } };

export type UpdateSubscriptionPlanMutationVariables = Exact<{
  input: UpdateSubscriptionPlanInput;
}>;


export type UpdateSubscriptionPlanMutation = { __typename: 'Mutation', updateSubscriptionPlan: { __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string, category?: { __typename: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null } };

export type DeleteSubscriptionPlanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSubscriptionPlanMutation = { __typename: 'Mutation', deleteSubscriptionPlan: boolean };

export type SubscriptionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionPlansQuery = { __typename: 'Query', subscriptionPlans: Array<{ __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, stripePricePlanID: string, price: number, duration: number, createdAt: string, updatedAt: string, category?: { __typename: 'Category', id: string, name: string } | null }> };

export type CompanySubscriptionsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanySubscriptionsQuery = { __typename: 'Query', companySubscriptions: Array<{ __typename: 'CompanySubscription', id: string, quantity: number, status: string, stripeSubscriptionId: string, createdAt: string, updatedAt: string, plan: { __typename: 'SubscriptionPlan', id: string, planName: string, duration: number, price: number }, company: { __typename: 'Company', id: string, name: string, email: string } }> };

export type SubscriptionReportQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  companySubscriptionId: Scalars['String']['input'];
}>;


export type SubscriptionReportQuery = { __typename: 'Query', subscriptionReport: { __typename: 'SubscriptionReport', companySubscriptionId: string, totalSubscriptions: number, redeemedSubscriptions: number, unredeemedSubscriptions: number, activeSubscriptions: number } };

export type CompanyInvitesQueryVariables = Exact<{
  companySubscriptionId: Scalars['ID']['input'];
}>;


export type CompanyInvitesQuery = { __typename: 'Query', companyInvites: Array<{ __typename: 'CompanyInvite', id: string, email: string, type: string, codeId?: string | null, companyId?: string | null, companySubscriptionId: string, createdAt: string, expiresAt: string, status: string, redeemedByUserId?: string | null }> };

export type RequestSubscriptionCodesMutationVariables = Exact<{
  planId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type RequestSubscriptionCodesMutation = { __typename: 'Mutation', requestSubscriptionCodes: { __typename: 'CompanySubscription', id: string, status: string, quantity: number, createdAt: string, plan: { __typename: 'SubscriptionPlan', id: string, planName: string, price: number, duration: number }, company: { __typename: 'Company', id: string, name: string, email: string } } };

export type InviteEmployeesMutationVariables = Exact<{
  input: InviteEmployeesInput;
}>;


export type InviteEmployeesMutation = { __typename: 'Mutation', inviteEmployees: { __typename: 'InviteEmployeesResult', companySubscriptionId: string, invited: number, skipped: number, errors: Array<string>, invites: Array<{ __typename: 'InviteSummary', email: string, codeId: string, status: string }> } };

export type ResendInviteMutationVariables = Exact<{
  companySubscriptionId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type ResendInviteMutation = { __typename: 'Mutation', resendInvite: boolean };

export type PayCompanySubscriptionMutationVariables = Exact<{
  companySubscriptionId: Scalars['ID']['input'];
  paymentMethodId?: InputMaybe<Scalars['String']['input']>;
}>;


export type PayCompanySubscriptionMutation = { __typename: 'Mutation', payCompanySubscription: { __typename: 'CompanySubscription', id: string, status: string, stripeSubscriptionId: string, updatedAt: string } | { __typename: 'SetupIntentRequired', clientSecret: string } };

export type ActivateCompanySubscriptionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ActivateCompanySubscriptionMutation = { __typename: 'Mutation', activateCompanySubscription: { __typename: 'UserSubscription', id: string, stripeSubscriptionId: string, startDate: string, endDate: string, isActive: boolean, user: { __typename: 'User', id: string, fullName: string, email: string }, plan: { __typename: 'SubscriptionPlan', id: string, planName: string }, company?: { __typename: 'Company', id: string, name: string } | null, companySubscription?: { __typename: 'CompanySubscription', id: string, status: string } | null } };

export type CreateTopicMutationVariables = Exact<{
  input: CreateTopicInput;
}>;


export type CreateTopicMutation = { __typename: 'Mutation', createTopic: { __typename: 'Topic', id: string, position?: number | null, title?: string | null, description?: string | null, createdAt: string, updatedAt: string } };

export type TopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type TopicQuery = { __typename: 'Query', topic: { __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename: 'Course', id: string, title: string }, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null }> | null } };

export type TopicsByCourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type TopicsByCourseQuery = { __typename: 'Query', topicsByCourseId: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename: 'Course', id: string, title: string }, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, showPreview?: boolean | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, progress?: { __typename: 'LessonProgress', id: string, completed: boolean, startedAt?: string | null, completedAt?: string | null, createdAt?: string | null, updatedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, progress?: { __typename: 'QuizProgress', id: string, score: number, completed: boolean, startedAt: string, completedAt?: string | null } | null, questions?: Array<{ __typename: 'Question', id: string, title: string, description?: string | null, media?: string | null, type: QuestionType, mark: number, order: number, answerExplanation?: string | null, createdAt: string, updatedAt: string, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null, answers?: Array<{ __typename: 'Answer', id: string, type: string, title: string, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, order: number, correctAnswers?: Array<string> | null, createdAt: string, updatedAt: string }> | null }> | null }> | null }> };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename: 'Query', topics: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename: 'Course', id: string, title: string }, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null }> | null }> };

export type UpdateTopicMutationVariables = Exact<{
  topicId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateTopicInput>;
}>;


export type UpdateTopicMutation = { __typename: 'Mutation', updateTopic: { __typename: 'Topic', id: string, description?: string | null, title?: string | null, position?: number | null, updatedAt: string } };

export type DeleteTopicMutationVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type DeleteTopicMutation = { __typename: 'Mutation', deleteTopic?: boolean | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename: 'Query', getUsers?: Array<{ __typename: 'User', id: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, isActive?: boolean | null, stripeId?: string | null, occupation?: string | null, major?: string | null, interests?: Array<string | null> | null, createdAt: string, updatedAt: string } | null> | null };

export type InternalUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalUsersQuery = { __typename: 'Query', internalUsers: Array<{ __typename: 'User', id: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, isActive?: boolean | null, stripeId?: string | null, occupation?: string | null, major?: string | null, interests?: Array<string | null> | null, createdAt: string, updatedAt: string }> };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename: 'Mutation', updateUserProfile: { __typename: 'UserProfile', id: string, fullName?: string | null, userName?: string | null, email?: string | null, phoneNumber?: string | null, profilePicture?: string | null, major?: string | null, occupation?: string | null, interests?: Array<string | null> | null } };

export type UpdateUserPasswordMutationVariables = Exact<{
  input: UpdateUserPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename: 'Mutation', updateUserPassword: boolean };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename: 'Mutation', createUser: string };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename: 'Query', getProfile?: { __typename: 'Me', customerId: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, interests?: Array<string | null> | null, major?: string | null, occupation?: string | null, isActive?: boolean | null, stripeId?: string | null, updatedAt?: string | null, createdAt?: string | null, carts: { __typename: 'Cart', id: string, subtotal: number, tax: number, total: number, updatedAt: string, expiresAt: string, createdAt: string, items: Array<{ __typename: 'CartItem', id: string, inStock: boolean, cartId: string, itemId: string, itemType: ItemType, notes?: string | null, quantity: number, unitPrice: number, item: { __typename: 'Course', id: string, featuredImage: string, duration: number, discountedPrice?: number | null, description?: string | null, price: number, requirements?: string | null, status?: CourseStatus | null, title: string, tags?: Array<string> | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } | { __typename: 'CourseBundle', id: string, price: number, title: string, subtotalRegularPrice?: number | null, updatedAt: string, featuredImage: string, discountValue?: number | null, discountType?: DiscountType | null, description?: string | null, createdAt: string, courses: Array<{ __typename: 'Course', id: string, title: string, price: number, description?: string | null } | null> } | { __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } }> }, subscription?: { __typename: 'UserSubscription', id: string, startDate: string, endDate: string, user: { __typename: 'User', id: string, fullName: string, email: string }, plan: { __typename: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } } | null, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename: 'Course', id: string, title: string }, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, media?: string | null, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename: 'Certificate', id: string, issuedAt: string, template: { __typename: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null, reviews?: Array<{ __typename: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename: 'Course', id: string, title: string } | null }> | null } | null>, bundles?: Array<{ __typename: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename: 'Course', id: string, title: string, description?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, reviews?: Array<{ __typename: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename: 'Course', id: string, title: string } | null }> | null, topics?: Array<{ __typename: 'Topic', id: string, title?: string | null, position?: number | null, description?: string | null, lessons?: Array<{ __typename: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename: 'Certificate', id: string, issuedAt: string, template: { __typename: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null } | null> }> | null, company?: { __typename: 'Company', id: string, email: string, name: string, isActive?: boolean | null, taxId?: string | null, taxName?: string | null, stripeId?: string | null, setupIntentClientSecret?: string | null, address?: string | null } | null } | null };

export const UserBasicInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UserBasicInfoFragment, unknown>;
export const LoginDocument = {"__meta__":{"hash":"f7ce54c3c19cdf79c0da2c6d9b7845295974417a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Login"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"__meta__":{"hash":"f70e5fca72f6a023726bcbebe170ef78b7795a36"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ChangePasswordDocument = {"__meta__":{"hash":"09738e1a96d244c0afe3cc0e731c19b9736e502a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ResetPasswordDocument = {"__meta__":{"hash":"fb7746ec3c2a6a114d5eae2698732d467867cda7"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ValidateInviteTokenDocument = {"__meta__":{"hash":"a35cef6c2b6a02ddc2376407789dccb6810ba889"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateInviteToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"validateInviteToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"valid"}},{"kind":"Field","name":{"kind":"Name","value":"expired"}},{"kind":"Field","name":{"kind":"Name","value":"used"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"invitedBy"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateInviteTokenQuery, ValidateInviteTokenQueryVariables>;
export const CheckUserExistsDocument = {"__meta__":{"hash":"322ae243b89329fb5c14841baeb3e201c9799fec"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUserExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"checkUserExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CheckUserExistsQuery, CheckUserExistsQueryVariables>;
export const CreateCourseBundleDocument = {"__meta__":{"hash":"cb0eb75115a01cbc3f00af22ebb924101fa3fa6f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCourseBundle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCourseBundleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createCourseBundle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCourseBundleMutation, CreateCourseBundleMutationVariables>;
export const InstructorBundlesDocument = {"__meta__":{"hash":"aee8b61ad512c3555a8a70ac65f07e30cf4d1e82"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InstructorBundles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"instructorBundles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bundle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<InstructorBundlesQuery, InstructorBundlesQueryVariables>;
export const BundlesDocument = {"__meta__":{"hash":"8bc0ca722f79a5ecfcdc06fb4a73e1dd7cedb9f6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bundles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"bundles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bundle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<BundlesQuery, BundlesQueryVariables>;
export const BundleDocument = {"__meta__":{"hash":"956bf898e167c1fa14f133aa5ab0ec87a04af8cd"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bundle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bundleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"bundle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bundleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<BundleQuery, BundleQueryVariables>;
export const GetCategoriesDocument = {"__meta__":{"hash":"e658fd94b0f93d791a566659ffeaf1676299e0fd"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"__meta__":{"hash":"9216e6573dbdad45f7b794b5edaeb2aed88284a1"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getCategoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const CreateCategoryDocument = {"__meta__":{"hash":"efa67c3759a6a80dc7571d81a4ab4b70cd8b5d9f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLevelOrCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"__meta__":{"hash":"811444d1323dedfc6d2689d5cbf4a1221e23a4ae"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLevelOrCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCategoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"__meta__":{"hash":"9aaa8e02d730194cdcf411eb908c2120668537f6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteCategoryId"}}}]}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CreateCompanyDocument = {"__meta__":{"hash":"84c8d38f76cc0e13d440bd5d5638929924b5ca5e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCompanyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"taxName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UpdateCompanyDocument = {"__meta__":{"hash":"6109de300b42e34a4206683fe13dd7570a3997a7"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCompanyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"taxName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const CompaniesDocument = {"__meta__":{"hash":"9224ccc78bdca93fc6e0e36fee109540f8e24524"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"taxName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CompaniesQuery, CompaniesQueryVariables>;
export const CompanyDocument = {"__meta__":{"hash":"84d1c575dd9b12e2d50b836b03198024dc198063"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Company"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"taxName"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CompanyQuery, CompanyQueryVariables>;
export const DeleteCompanyDocument = {"__meta__":{"hash":"5994cd9a3f8aeacc4642594a78226230bf8af84f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}]}]}}]} as unknown as DocumentNode<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const CompanyAdminsDocument = {"__meta__":{"hash":"79b49ca80925a0199686e65ef5fb5027e8322095"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyAdmins"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyAdmins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CompanyAdminsQuery, CompanyAdminsQueryVariables>;
export const CompanyUsersDocument = {"__meta__":{"hash":"dfe006bf1d23d116d543855d0b3078ddb0884d81"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CompanyUsersQuery, CompanyUsersQueryVariables>;
export const BusinessDashboardPeopleDocument = {"__meta__":{"hash":"c3bed60ae3e3722f6a8265b814d4332a10aa6f6c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BusinessDashboardPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyAdmins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBasicInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBasicInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BusinessDashboardPeopleQuery, BusinessDashboardPeopleQueryVariables>;
export const CompanyAdminInvitesDocument = {"__meta__":{"hash":"7cbfe808532139359d0da3306e33dffe37ade943"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyAdminInvites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyAdminInvites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CompanyAdminInvitesQuery, CompanyAdminInvitesQueryVariables>;
export const InviteAdminsDocument = {"__meta__":{"hash":"e611202997c5a9c9619899379142ecb63252a658"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteAdmins"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InviteAdminsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"inviteAdmins"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"invited"}},{"kind":"Field","name":{"kind":"Name","value":"skipped"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"invites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<InviteAdminsMutation, InviteAdminsMutationVariables>;
export const ResendAdminInviteDocument = {"__meta__":{"hash":"fd254242a77443aca9cde8823ee62f71646fc3d8"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendAdminInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"resendAdminInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inviteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InviteExpiredAndRenewed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"oldInviteId"}},{"kind":"Field","name":{"kind":"Name","value":"newInvite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InviteNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InviteNotActiveError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ResendAdminInviteMutation, ResendAdminInviteMutationVariables>;
export const CompanyCoursesDocument = {"__meta__":{"hash":"75c6c3912be429f609103038b4ec73bbd9d34b60"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCoursesFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CompanyCoursesQuery, CompanyCoursesQueryVariables>;
export const CompanyCourseProgressSummaryDocument = {"__meta__":{"hash":"cd62d545200ed27664981fac170e362ffb402b9f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyCourseProgressSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCourseProgressFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyCourseProgressSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrolledCount"}},{"kind":"Field","name":{"kind":"Name","value":"startedCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"avgProgressPercentage"}}]}}]}}]} as unknown as DocumentNode<CompanyCourseProgressSummaryQuery, CompanyCourseProgressSummaryQueryVariables>;
export const CompanyCourseProgressDocument = {"__meta__":{"hash":"697aae58cce96df142df0b2e243e12666cfbd8de"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyCourseProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CompanyCourseProgressFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyCourseProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CompanyCourseProgressQuery, CompanyCourseProgressQueryVariables>;
export const TeamDashboardDocument = {"__meta__":{"hash":"ca50c5f35a65288719dec1b0956b779901b304a5"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TeamMembersFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyTeamStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"activeMembers"}},{"kind":"Field","name":{"kind":"Name","value":"coursesInProgress"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"certificatesEarned"}},{"kind":"Field","name":{"kind":"Name","value":"avgProgressPercentage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companyTeamMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"coursesInProgress"}},{"kind":"Field","name":{"kind":"Name","value":"coursesCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"certificatesEarned"}},{"kind":"Field","name":{"kind":"Name","value":"avgProgress"}},{"kind":"Field","name":{"kind":"Name","value":"lastActivityAt"}}]}}]}}]}}]} as unknown as DocumentNode<TeamDashboardQuery, TeamDashboardQueryVariables>;
export const InstructorCoursesDocument = {"__meta__":{"hash":"68b832098b0f2064c106ee897505db347bfbe272"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InstructorCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"instructorCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"pricingType"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"maxEnrollments"}},{"kind":"Field","name":{"kind":"Name","value":"extraSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduledPublishAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrolledAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"background"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<InstructorCoursesQuery, InstructorCoursesQueryVariables>;
export const CreateInitialCourseDocument = {"__meta__":{"hash":"71fa01a38057dde7205408c89674a3e78abfa2c6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInitialCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInitialCourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createInitialCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pricingType"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateInitialCourseMutation, CreateInitialCourseMutationVariables>;
export const CourseDocument = {"__meta__":{"hash":"3468084d0a5b0bd3c1537a608cbfd8c194b82a8f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Course"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"pricingType"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxEnrollments"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"extraSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledPublishAt"}}]}}]}}]} as unknown as DocumentNode<CourseQuery, CourseQueryVariables>;
export const UpdateCourseDocument = {"__meta__":{"hash":"b250045fd1eef81b795552c09e319db7741b7810"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCourseInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCourseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCourseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"pricingType"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"extraSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxEnrollments"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledPublishAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const CourseIntroVideoDocument = {"__meta__":{"hash":"b0b75a0e186cc3720e054534ebdeaecff45d55a9"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CourseIntroVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"courseIntroVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}}]}}]}}]} as unknown as DocumentNode<CourseIntroVideoQuery, CourseIntroVideoQueryVariables>;
export const DeleteCourseDocument = {"__meta__":{"hash":"56e40cb43c2ecc1000d612d4b72b20a29c64261c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}]}]}}]} as unknown as DocumentNode<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const GetEnrollmentsDocument = {"__meta__":{"hash":"f15257fbb22693fb494ea3e78b9de6220d4c0abc"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getEnrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrolledAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetEnrollmentsQuery, GetEnrollmentsQueryVariables>;
export const GetEnrollmentByIdDocument = {"__meta__":{"hash":"f1cab9b7e3dfacf7fb1ee6cca1d3c49a367b320e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrollmentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enrollmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getEnrollmentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"enrollmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enrollmentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrolledAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetEnrollmentByIdQuery, GetEnrollmentByIdQueryVariables>;
export const CreateEnrollmentDocument = {"__meta__":{"hash":"b78cae4d8b06dd5acbdf75a3998946bdbd4defde"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEnrollment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createEnrollment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrolledAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateEnrollmentMutation, CreateEnrollmentMutationVariables>;
export const GetUserEnrollmentsDocument = {"__meta__":{"hash":"0865fdbb6ccb2e5459c911a968591a23ff9d8381"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserEnrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getUserEnrollments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"showPreview"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"background"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxEnrollments"}},{"kind":"Field","name":{"kind":"Name","value":"extraSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledPublishAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrolledAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetUserEnrollmentsQuery, GetUserEnrollmentsQueryVariables>;
export const AssignInstructorDocument = {"__meta__":{"hash":"dccd067034ee28428542e570f099248e835983d8"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignInstructor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"assignInstructor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<AssignInstructorMutation, AssignInstructorMutationVariables>;
export const UnassignInstructorDocument = {"__meta__":{"hash":"37faefc4f10af5b88d7441ff4286aec8797d17b6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnassignInstructor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"unassignInstructor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}]}]}}]} as unknown as DocumentNode<UnassignInstructorMutation, UnassignInstructorMutationVariables>;
export const CreateLessonDocument = {"__meta__":{"hash":"ae2b4eef616d3bbd04531fc278c53a23608054cb"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLessonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLessonMutation, CreateLessonMutationVariables>;
export const UpdateLessonDocument = {"__meta__":{"hash":"76359fcd7153478bbb466fa0dd7779b6d2774ef4"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLessonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"showPreview"}}]}}]}}]} as unknown as DocumentNode<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const DeleteLessonDocument = {"__meta__":{"hash":"68c73d9fecf9f845a085f1cfb7ed3f31e7eef078"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}}]}]}}]} as unknown as DocumentNode<DeleteLessonMutation, DeleteLessonMutationVariables>;
export const LessonDocument = {"__meta__":{"hash":"d08242cb33406be08f99e54b44f0c4b04bf46a3c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Lesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<LessonQuery, LessonQueryVariables>;
export const LessonsByTopicIdDocument = {"__meta__":{"hash":"20d669de454f1954c3173085f551e3a114c5c49a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LessonsByTopicId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"lessonsByTopicId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"showPreview"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<LessonsByTopicIdQuery, LessonsByTopicIdQueryVariables>;
export const GetLevelsDocument = {"__meta__":{"hash":"f5e500287b0dc69cfce863c72fe316741c1c75b9"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getLevels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetLevelsQuery, GetLevelsQueryVariables>;
export const GetLevelDocument = {"__meta__":{"hash":"3cf2642dc79fbb30a0e670adab082244b4781935"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getLevelId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getLevelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetLevelQuery, GetLevelQueryVariables>;
export const CreateLevelDocument = {"__meta__":{"hash":"d5d64b54866402bfbe7cfa8c73426bb64ee800d4"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLevelOrCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateLevelMutation, CreateLevelMutationVariables>;
export const UpdateLevelDocument = {"__meta__":{"hash":"409dd0983670d70685a6af8d466d611561a379b2"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateLevelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLevelOrCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateLevelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateLevelMutation, UpdateLevelMutationVariables>;
export const DeleteLevelDocument = {"__meta__":{"hash":"7cba4ecae72f7ced993493062684cc728825c38b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLevel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteLevelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteLevel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteLevelId"}}}]}]}}]} as unknown as DocumentNode<DeleteLevelMutation, DeleteLevelMutationVariables>;
export const MeDocument = {"__meta__":{"hash":"2fa0824f86e46c564be74d5ce6e77529ab1249c7"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"authProvider"}},{"kind":"Field","name":{"kind":"Name","value":"socialId"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"carts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"inStock"}},{"kind":"Field","name":{"kind":"Name","value":"cartId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseBundle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"background"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bundles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"background"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"taxName"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}},{"kind":"Field","name":{"kind":"Name","value":"setupIntentClientSecret"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MarkLessonCompletedDocument = {"__meta__":{"hash":"9332a80edb8219479e8e35368d93cccabb5c486e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkLessonCompleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MarkLessonCompletedInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"markLessonCompleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<MarkLessonCompletedMutation, MarkLessonCompletedMutationVariables>;
export const SubmitQuizAttemptDocument = {"__meta__":{"hash":"25c9db31e5428c6b29a861604e50a46bd4129144"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitQuizAttempt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitQuizAttemptInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"submitQuizAttempt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>;
export const GetCourseProgressDocument = {"__meta__":{"hash":"56d5cee12209485010ceacbb5ffc955d4747428a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getCourseProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetCourseProgressQuery, GetCourseProgressQueryVariables>;
export const StartCourseProgressDocument = {"__meta__":{"hash":"d4a575de1e79ebdf6321021faaec7e142780af01"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartCourseProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartCourseProgressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"startCourseProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<StartCourseProgressMutation, StartCourseProgressMutationVariables>;
export const UpdateQuizProgressDocument = {"__meta__":{"hash":"bb9282e976420f1a0b8fdfd10bbdf28a1cc67c68"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuizProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QuizProgressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateQuizProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateQuizProgressMutation, UpdateQuizProgressMutationVariables>;
export const CreateQuestionDocument = {"__meta__":{"hash":"dfec0824e8367af813f7da05bcaff67ecfc1cc21"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"gapMatch"}},{"kind":"Field","name":{"kind":"Name","value":"viewFormat"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const UpdateQuestionDocument = {"__meta__":{"hash":"13c17f3cbe2c92d8de9db783c06bccd39f975059"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"gapMatch"}},{"kind":"Field","name":{"kind":"Name","value":"viewFormat"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const DeleteQuestionDocument = {"__meta__":{"hash":"ba5677f2c2dd7ae352e070a4dc2468b746b78c47"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}]}]}}]} as unknown as DocumentNode<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const CreateQuizDocument = {"__meta__":{"hash":"5a2e8f678db24c2c2a1d51e2ffcea9f6d859f6d8"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuizInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateQuizMutation, CreateQuizMutationVariables>;
export const UpdateQuizDocument = {"__meta__":{"hash":"47426f30ac5bed8f4fd1ef94f468416ea3b798f9"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateQuizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateQuizInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateQuizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const QuizDocument = {"__meta__":{"hash":"70980c9369c217c943133e5d2cae4b4d6489204e"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Quiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"gapMatch"}},{"kind":"Field","name":{"kind":"Name","value":"viewFormat"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QuizQuery, QuizQueryVariables>;
export const QuizzesByTopicIdDocument = {"__meta__":{"hash":"d490b79de27ea84fdcd58d50b6b09c1b1b8a0abf"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QuizzesByTopicId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"quizzesByTopicId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"gapMatch"}},{"kind":"Field","name":{"kind":"Name","value":"viewFormat"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"quiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QuizzesByTopicIdQuery, QuizzesByTopicIdQueryVariables>;
export const DeleteQuizDocument = {"__meta__":{"hash":"20cb84af1aa1cc6423fc2b8f7389aef01ce3d59a"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteQuizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteQuizId"}}}]}]}}]} as unknown as DocumentNode<DeleteQuizMutation, DeleteQuizMutationVariables>;
export const CreateSubscriptionPlanDocument = {"__meta__":{"hash":"c02fd77fb6d3d4710b3b5db88c7ce8bbfbc1c6b9"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscriptionPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriptionPlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createSubscriptionPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>;
export const UpdateSubscriptionPlanDocument = {"__meta__":{"hash":"d8aa12d43035d99f6eeb2c49ffbc4b3f5c6af43b"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubscriptionPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSubscriptionPlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateSubscriptionPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>;
export const DeleteSubscriptionPlanDocument = {"__meta__":{"hash":"67a49539a229d398d34dbb7ae30e12a1f71aee59"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubscriptionPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteSubscriptionPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>;
export const SubscriptionPlansDocument = {"__meta__":{"hash":"5c514b3265dda89263392cd956e9a978af038532"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubscriptionPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"stripePricePlanID"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>;
export const CompanySubscriptionsDocument = {"__meta__":{"hash":"e1a56a1973fa7964287c071179815b7955efd11c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanySubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companySubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CompanySubscriptionsQuery, CompanySubscriptionsQueryVariables>;
export const SubscriptionReportDocument = {"__meta__":{"hash":"50fbf4ac745fefb598034999646120c44fbe0124"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubscriptionReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companySubscriptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companySubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"totalSubscriptions"}},{"kind":"Field","name":{"kind":"Name","value":"redeemedSubscriptions"}},{"kind":"Field","name":{"kind":"Name","value":"unredeemedSubscriptions"}},{"kind":"Field","name":{"kind":"Name","value":"activeSubscriptions"}}]}}]}}]} as unknown as DocumentNode<SubscriptionReportQuery, SubscriptionReportQueryVariables>;
export const CompanyInvitesDocument = {"__meta__":{"hash":"40feaa6a4b0e7b73f5ea2287401484b37f4e1390"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyInvites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companyInvites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companySubscriptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"companySubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"redeemedByUserId"}}]}}]}}]} as unknown as DocumentNode<CompanyInvitesQuery, CompanyInvitesQueryVariables>;
export const RequestSubscriptionCodesDocument = {"__meta__":{"hash":"861e2a4ee2b2c46bd6206b83c3739f29abb11e55"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestSubscriptionCodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"requestSubscriptionCodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RequestSubscriptionCodesMutation, RequestSubscriptionCodesMutationVariables>;
export const InviteEmployeesDocument = {"__meta__":{"hash":"bfe9a465c88f893feece2ae9572ce8e5be2d0ad6"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteEmployees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InviteEmployeesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"inviteEmployees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"companySubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"invited"}},{"kind":"Field","name":{"kind":"Name","value":"skipped"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"invites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"codeId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<InviteEmployeesMutation, InviteEmployeesMutationVariables>;
export const ResendInviteDocument = {"__meta__":{"hash":"7b3753b5070c91f5a7f98f51db21cda88ad781f5"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"resendInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companySubscriptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ResendInviteMutation, ResendInviteMutationVariables>;
export const PayCompanySubscriptionDocument = {"__meta__":{"hash":"10c18f276f1e7be7868bc93778e6fec266a65c2f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayCompanySubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentMethodId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"payCompanySubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companySubscriptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companySubscriptionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"paymentMethodId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentMethodId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CompanySubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SetupIntentRequired"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]}}]} as unknown as DocumentNode<PayCompanySubscriptionMutation, PayCompanySubscriptionMutationVariables>;
export const ActivateCompanySubscriptionDocument = {"__meta__":{"hash":"4ae5fa2a66bca924e2412e066bf6ebf3763cf32f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateCompanySubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"activateCompanySubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companySubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<ActivateCompanySubscriptionMutation, ActivateCompanySubscriptionMutationVariables>;
export const CreateTopicDocument = {"__meta__":{"hash":"bc1c6b113827a01cdaa4217de86364b2d4969ee3"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTopicInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateTopicMutation, CreateTopicMutationVariables>;
export const TopicDocument = {"__meta__":{"hash":"1b7b428803f52976a2ed5230740e32368a8a019d"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Topic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"topic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TopicQuery, TopicQueryVariables>;
export const TopicsByCourseDocument = {"__meta__":{"hash":"f4438f05523955dd281bf1500f2dd24e233cb12c"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopicsByCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"topicsByCourseId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"showPreview"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"gapMatch"}},{"kind":"Field","name":{"kind":"Name","value":"viewFormat"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TopicsByCourseQuery, TopicsByCourseQueryVariables>;
export const TopicsDocument = {"__meta__":{"hash":"7a422a41fc6a9d33775c3d5a81ecf799f4a91106"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TopicsQuery, TopicsQueryVariables>;
export const UpdateTopicDocument = {"__meta__":{"hash":"a6101835762b4fbb4a60b2bf2ce44b3198d52363"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTopicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const DeleteTopicDocument = {"__meta__":{"hash":"a02de1c1aed12e5deda69cf7c47c541bb687a158"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"deleteTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}]}]}}]} as unknown as DocumentNode<DeleteTopicMutation, DeleteTopicMutationVariables>;
export const GetUsersDocument = {"__meta__":{"hash":"5c6b7ba9c6aae93b7ad53f1e49466c5bcddba7e3"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"authProvider"}},{"kind":"Field","name":{"kind":"Name","value":"socialId"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const InternalUsersDocument = {"__meta__":{"hash":"113f2c3a769dd8f0d6d6f74df24b3dd5eeaa8649"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InternalUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"internalUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"authProvider"}},{"kind":"Field","name":{"kind":"Name","value":"socialId"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<InternalUsersQuery, InternalUsersQueryVariables>;
export const UpdateUserProfileDocument = {"__meta__":{"hash":"bd89ab1127be7896046a89b6fbb9aa63c8d2c81d"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UpdateUserPasswordDocument = {"__meta__":{"hash":"8df6f838240974d2b383dab95a49385ededeb383"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const CreateUserDocument = {"__meta__":{"hash":"50560aa1e2d28fd71f9b48bf45a2c51ccaf3bb13"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetProfileDocument = {"__meta__":{"hash":"b2df5adf108a865ce0bf375d0bca43f3eeafd87f"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"getProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"authProvider"}},{"kind":"Field","name":{"kind":"Name","value":"socialId"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"occupation"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"carts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"inStock"}},{"kind":"Field","name":{"kind":"Name","value":"cartId"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CourseBundle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"planName"}},{"kind":"Field","name":{"kind":"Name","value":"planDescription"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"background"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bundles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalRegularPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"discountValue"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"instructors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"learnings"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"targetAudience"}},{"kind":"Field","name":{"kind":"Name","value":"materialsIncluded"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discountedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"promotionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"level"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorID"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"totalLessons"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssignments"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedQuizzes"}},{"kind":"Field","name":{"kind":"Name","value":"completedLessons"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"averageScore"}},{"kind":"Field","name":{"kind":"Name","value":"averageCompletionTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"format"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"quizzes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timer"}},{"kind":"Field","name":{"kind":"Name","value":"timeUnit"}},{"kind":"Field","name":{"kind":"Name","value":"passingGrade"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mark"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"questionMark"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"answerRequired"}},{"kind":"Field","name":{"kind":"Name","value":"showQuestionMark"}},{"kind":"Field","name":{"kind":"Name","value":"randomizeQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"sortableItems"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswers"}},{"kind":"Field","name":{"kind":"Name","value":"matrixMatches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"columnA"}},{"kind":"Field","name":{"kind":"Name","value":"columnB"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"answerExplanation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"background"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"taxId"}},{"kind":"Field","name":{"kind":"Name","value":"taxName"}},{"kind":"Field","name":{"kind":"Name","value":"stripeId"}},{"kind":"Field","name":{"kind":"Name","value":"setupIntentClientSecret"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;