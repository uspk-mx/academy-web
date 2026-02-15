import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResult', token: string, role: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: string };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type ValidateInviteTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateInviteTokenQuery = { __typename?: 'Query', validateInviteToken: { __typename?: 'ValidateInviteTokenResult', valid: boolean, expired?: boolean | null, used?: boolean | null, data?: { __typename?: 'InviteData', email?: string | null, companyName?: string | null, invitedBy?: string | null, planName?: string | null } | null } };

export type CheckUserExistsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckUserExistsQuery = { __typename?: 'Query', checkUserExists: { __typename?: 'UserExistsResult', exists: boolean, userId?: string | null } };

export type CreateCourseBundleMutationVariables = Exact<{
  input: CreateCourseBundleInput;
}>;


export type CreateCourseBundleMutation = { __typename?: 'Mutation', createCourseBundle: { __typename?: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename?: 'Course', id: string, tags?: Array<string> | null, title: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, featuredImage: string, visibility?: Visibility | null } | null> } };

export type InstructorBundlesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InstructorBundlesQuery = { __typename?: 'Query', instructorBundles: { __typename?: 'PaginatedBundle', totalCount?: number | null, pageInfo: { __typename?: 'PageInfo', page: number, limit: number, offset: number, hasNextPage: boolean }, bundle: Array<{ __typename?: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, featuredImage: string, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, phoneNumber?: string | null, isActive?: boolean | null, userName: string }> | null } | null> }> } };

export type BundlesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BundlesQuery = { __typename?: 'Query', bundles: { __typename?: 'PaginatedBundle', totalCount?: number | null, pageInfo: { __typename?: 'PageInfo', page: number, limit: number, offset: number, hasNextPage: boolean }, bundle: Array<{ __typename?: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, price: number, duration: number, discountedPrice?: number | null, featuredImage: string, visibility?: Visibility | null, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, phoneNumber?: string | null, isActive?: boolean | null, userName: string }> | null } | null> }> } };

export type BundleQueryVariables = Exact<{
  bundleId: Scalars['ID']['input'];
}>;


export type BundleQuery = { __typename?: 'Query', bundle: { __typename?: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename?: 'Course', id: string, featuredImage: string, duration: number, description?: string | null, price: number, title: string, visibility?: Visibility | null, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string, userName: string, isActive?: boolean | null }> | null } | null> } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string }> };

export type GetCategoryQueryVariables = Exact<{
  getCategoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string } | null };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateLevelOrCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryId: Scalars['ID']['input'];
  input: UpdateLevelOrCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: string, name: string, description?: string | null, coursesCount?: number | null, createdAt: string, updatedAt: string } };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: boolean | null };

export type CreateCompanyMutationVariables = Exact<{
  input?: InputMaybe<CreateCompanyInput>;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string } };

export type UpdateCompanyMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateCompanyInput>;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string } };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string }> };

export type CompanyQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, name: string, email: string, address?: string | null, taxId?: string | null, taxName?: string | null, isActive?: boolean | null, createdAt: string, updatedAt: string } };

export type DeleteCompanyMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany?: boolean | null };

export type CompanyAdminsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyAdminsQuery = { __typename?: 'Query', companyAdmins: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }> };

export type CompanyUsersQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyUsersQuery = { __typename?: 'Query', companyUsers: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }> };

export type UserBasicInfoFragment = { __typename?: 'User', id: string, fullName: string, userName: string, profilePicture?: string | null, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string };

export type BusinessDashboardPeopleQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type BusinessDashboardPeopleQuery = { __typename?: 'Query', companyAdmins: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, profilePicture?: string | null, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }>, companyUsers: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, profilePicture?: string | null, email: string, isVerified?: boolean | null, isActive?: boolean | null, createdAt: string }> };

export type CompanyAdminInvitesQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyAdminInvitesQuery = { __typename?: 'Query', companyAdminInvites: Array<{ __typename?: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string }> };

export type InviteAdminsMutationVariables = Exact<{
  input: InviteAdminsInput;
}>;


export type InviteAdminsMutation = { __typename?: 'Mutation', inviteAdmins: { __typename?: 'InviteAdminsResult', companyId: string, invited: number, skipped: number, errors: Array<string>, invites: Array<{ __typename?: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string }> } };

export type ResendAdminInviteMutationVariables = Exact<{
  inviteId: Scalars['ID']['input'];
}>;


export type ResendAdminInviteMutation = { __typename?: 'Mutation', resendAdminInvite: { __typename: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string } | { __typename: 'InviteExpiredAndRenewed', oldInviteId: string, newInvite: { __typename?: 'AdminInvite', id: string, email: string, companyId: string, type: string, createdAt: string, expiresAt?: string | null, status: string } } | { __typename: 'InviteNotActiveError', message: string } | { __typename: 'InviteNotFoundError', message: string } };

export type CompanyCoursesQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCoursesFilter>;
}>;


export type CompanyCoursesQuery = { __typename?: 'Query', companyCourses: Array<{ __typename?: 'Course', id: string, title: string, shortDescription?: string | null, featuredImage: string, status?: CourseStatus | null, visibility?: Visibility | null, updatedAt: string, createdAt: string, category?: { __typename?: 'Category', id: string, name: string } | null }> };

export type CompanyCourseProgressSummaryQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCourseProgressFilter>;
}>;


export type CompanyCourseProgressSummaryQuery = { __typename?: 'Query', companyCourseProgressSummary: Array<{ __typename?: 'CompanyCourseProgressSummary', enrolledCount: number, startedCount: number, completedCount: number, avgProgressPercentage: number, course: { __typename?: 'Course', id: string, title: string, featuredImage: string, category?: { __typename?: 'Category', id: string, name: string } | null } }> };

export type CompanyCourseProgressQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<CompanyCourseProgressFilter>;
}>;


export type CompanyCourseProgressQuery = { __typename?: 'Query', companyCourseProgress: Array<{ __typename?: 'CompanyCourseProgressRow', user: { __typename?: 'User', id: string, fullName: string, email: string, profilePicture?: string | null }, course: { __typename?: 'Course', id: string, title: string, featuredImage: string, category?: { __typename?: 'Category', id: string, name: string } | null }, progress: { __typename?: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageScore?: number | null, updatedAt: string } }> };

export type TeamDashboardQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  filter?: InputMaybe<TeamMembersFilter>;
}>;


export type TeamDashboardQuery = { __typename?: 'Query', companyTeamStats: { __typename?: 'CompanyTeamStats', totalMembers: number, activeMembers: number, coursesInProgress: number, coursesCompleted: number, certificatesEarned: number, avgProgressPercentage: number }, companyTeamMembers: { __typename?: 'TeamMembersResult', total: number, members: Array<{ __typename?: 'TeamMember', id: string, fullName: string, email: string, role?: string | null, occupation?: string | null, profilePicture?: string | null, isActive?: boolean | null, coursesInProgress: number, coursesCompleted: number, certificatesEarned: number, avgProgress: number, lastActivityAt?: string | null }> } };

export type InstructorCoursesQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InstructorCoursesQuery = { __typename?: 'Query', instructorCourses: { __typename?: 'PaginatedCourse', totalCount?: number | null, pageInfo: { __typename?: 'PageInfo', page: number, limit: number, offset: number, hasNextPage: boolean }, course: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, pricingType?: PricingType | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, visibility?: Visibility | null, maxEnrollments?: number | null, scheduledPublishAt?: string | null, publishedAt?: string | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, tags?: Array<string> | null, description?: string | null, duration?: number | null } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename?: 'Category', id: string, description?: string | null, name: string } | null, creator?: { __typename?: 'User', fullName: string, userName: string, email: string, role?: string | null } | null, instructors?: Array<{ __typename?: 'User', fullName: string, userName: string, email: string, role?: string | null, profilePicture?: string | null, phoneNumber?: string | null, id: string, isActive?: boolean | null }> | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, course: { __typename?: 'Course', id: string } }> | null, extraSettings?: Array<{ __typename?: 'ExtraSettings', key?: string | null, value?: string | null }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, enrollments?: Array<{ __typename?: 'Enrollment', id: string, status: EnrollmentStatus, enrolledAt: string, user: { __typename?: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, major?: string | null, occupation?: string | null, isActive?: boolean | null, userName: string, stripeId?: string | null } }> | null, certificates?: Array<{ __typename?: 'Certificate', id: string, issuedAt: string, template: { __typename?: 'CertificateTemplate', id: string, name: string, content: string, logoUrl?: string | null, background?: string | null }, user: { __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, phoneNumber?: string | null }, course: { __typename?: 'Course', id: string, title: string } }> | null }> } };

export type CreateInitialCourseMutationVariables = Exact<{
  input: CreateInitialCourseInput;
}>;


export type CreateInitialCourseMutation = { __typename?: 'Mutation', createInitialCourse: { __typename?: 'Course', id: string, title: string, description?: string | null, pricingType?: PricingType | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string }> | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null } | null, creator?: { __typename?: 'User', id: string, fullName: string, email: string } | null } };

export type CourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, title: string, shortDescription?: string | null, description?: string | null, duration: number, pricingType?: PricingType | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, maxEnrollments?: number | null, visibility?: Visibility | null, createdAt: string, updatedAt: string, scheduledPublishAt?: string | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, tags?: Array<string> | null, description?: string | null, duration?: number | null } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename?: 'Category', id: string, description?: string | null, name: string } | null, creator?: { __typename?: 'User', id: string, fullName: string, userName: string, email: string, role?: string | null } | null, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, email: string, phoneNumber?: string | null, isActive?: boolean | null }> | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename?: 'Course', id: string, title: string }, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, extraSettings?: Array<{ __typename?: 'ExtraSettings', key?: string | null, value?: string | null }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null } };

export type UpdateCourseMutationVariables = Exact<{
  input?: InputMaybe<UpdateCourseInput>;
  updateCourseId: Scalars['ID']['input'];
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, pricingType?: PricingType | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, maxEnrollments?: number | null, scheduledPublishAt?: string | null, publishedAt?: string | null, visibility?: Visibility | null, instructors?: Array<{ __typename?: 'User', fullName: string, email: string }> | null, video?: { __typename?: 'Video', videoURL?: string | null, source?: string | null, type?: string | null, id: string, description?: string | null, format?: string | null, tags?: Array<string> | null, height?: number | null, width?: number | null, duration?: number | null } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null } | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null } | null, creator?: { __typename?: 'User', id: string, fullName: string, email: string } | null, extraSettings?: Array<{ __typename?: 'ExtraSettings', key?: string | null, value?: string | null }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, enrollments?: Array<{ __typename?: 'Enrollment', id: string, status: EnrollmentStatus, enrolledAt: string, user: { __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, major?: string | null, occupation?: string | null, profilePicture?: string | null, stripeId?: string | null } }> | null } };

export type CourseIntroVideoQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CourseIntroVideoQuery = { __typename?: 'Query', courseIntroVideo?: { __typename?: 'Video', videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null } | null };

export type DeleteCourseMutationVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse?: boolean | null };

export type GetEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnrollmentsQuery = { __typename?: 'Query', getEnrollments?: Array<{ __typename?: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, user: { __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, occupation?: string | null, phoneNumber?: string | null }, course: { __typename?: 'Course', id: string, title: string, description?: string | null, status?: CourseStatus | null, price: number } }> | null };

export type GetEnrollmentByIdQueryVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;


export type GetEnrollmentByIdQuery = { __typename?: 'Query', getEnrollmentById?: { __typename?: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, user: { __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, occupation?: string | null, phoneNumber?: string | null }, course: { __typename?: 'Course', id: string, title: string, description?: string | null, status?: CourseStatus | null, price: number } } | null };

export type CreateEnrollmentMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type CreateEnrollmentMutation = { __typename?: 'Mutation', createEnrollment: { __typename?: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, user: { __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, profilePicture?: string | null, occupation?: string | null, phoneNumber?: string | null }, course: { __typename?: 'Course', id: string, title: string, description?: string | null, status?: CourseStatus | null, price: number } } };

export type GetUserEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserEnrollmentsQuery = { __typename?: 'Query', getUserEnrollments?: Array<{ __typename?: 'Enrollment', id: string, enrolledAt: string, status: EnrollmentStatus, course: { __typename?: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, maxEnrollments?: number | null, visibility?: Visibility | null, scheduledPublishAt?: string | null, publishedAt?: string | null, createdAt: string, updatedAt: string, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, showPreview?: boolean | null, featuredImage?: string | null, content?: string | null, createdAt: string, attachments?: Array<string> | null, position?: number | null, updatedAt: string, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, position?: number | null, progress?: { __typename?: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, progress?: { __typename?: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, totalAssignments?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageCompletionTime?: number | null, averageScore?: number | null, createdAt: string, updatedAt: string } | null, reviews?: Array<{ __typename?: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null }> | null, certificates?: Array<{ __typename?: 'Certificate', id: string, issuedAt: string, template: { __typename?: 'CertificateTemplate', name: string, logoUrl?: string | null, id: string, content: string, background?: string | null } }> | null, extraSettings?: Array<{ __typename?: 'ExtraSettings', key?: string | null, value?: string | null }> | null, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, userName: string }> | null } }> | null };

export type AssignInstructorMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type AssignInstructorMutation = { __typename?: 'Mutation', assignInstructor: { __typename?: 'Instructor', id: string, assignedAt?: string | null, user: { __typename?: 'User', id: string, fullName: string, email: string }, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null }> } };

export type UnassignInstructorMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type UnassignInstructorMutation = { __typename?: 'Mutation', unassignInstructor: boolean };

export type CreateLessonMutationVariables = Exact<{
  input: CreateLessonInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, topic?: { __typename?: 'Topic', id: string, title?: string | null, description?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } };

export type UpdateLessonMutationVariables = Exact<{
  lessonId: Scalars['ID']['input'];
  input: UpdateLessonInput;
}>;


export type UpdateLessonMutation = { __typename?: 'Mutation', updateLesson: { __typename?: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, showPreview?: boolean | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } };

export type DeleteLessonMutationVariables = Exact<{
  lessonId: Scalars['ID']['input'];
}>;


export type DeleteLessonMutation = { __typename?: 'Mutation', deleteLesson?: boolean | null };

export type LessonQueryVariables = Exact<{
  lessonId: Scalars['ID']['input'];
}>;


export type LessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, topic?: { __typename?: 'Topic', id: string } | null, video?: { __typename?: 'Video', id: string, description?: string | null, videoURL?: string | null, source?: string | null, tags?: Array<string> | null, type?: string | null } | null } };

export type LessonsByTopicIdQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type LessonsByTopicIdQuery = { __typename?: 'Query', lessonsByTopicId: Array<{ __typename?: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, showPreview?: boolean | null, topic?: { __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null }> };

export type GetLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLevelsQuery = { __typename?: 'Query', getLevels: Array<{ __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type GetLevelQueryVariables = Exact<{
  getLevelId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetLevelQuery = { __typename?: 'Query', getLevel?: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null };

export type CreateLevelMutationVariables = Exact<{
  input: CreateLevelOrCategoryInput;
}>;


export type CreateLevelMutation = { __typename?: 'Mutation', createLevel: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } };

export type UpdateLevelMutationVariables = Exact<{
  updateLevelId: Scalars['ID']['input'];
  input: UpdateLevelOrCategoryInput;
}>;


export type UpdateLevelMutation = { __typename?: 'Mutation', updateLevel: { __typename?: 'Level', id: string, name: string, description?: string | null, updatedAt: string, createdAt: string } };

export type DeleteLevelMutationVariables = Exact<{
  deleteLevelId: Scalars['ID']['input'];
}>;


export type DeleteLevelMutation = { __typename?: 'Mutation', deleteLevel?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Me', customerId: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, interests?: Array<string | null> | null, major?: string | null, occupation?: string | null, isActive?: boolean | null, stripeId?: string | null, updatedAt?: string | null, createdAt?: string | null, carts: { __typename?: 'Cart', id: string, subtotal: number, tax: number, total: number, updatedAt: string, expiresAt: string, createdAt: string, items: Array<{ __typename?: 'CartItem', id: string, inStock: boolean, cartId: string, itemId: string, itemType: ItemType, notes?: string | null, quantity: number, unitPrice: number, item: { __typename?: 'Course', id: string, featuredImage: string, duration: number, discountedPrice?: number | null, description?: string | null, price: number, requirements?: string | null, status?: CourseStatus | null, title: string, tags?: Array<string> | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } | { __typename?: 'CourseBundle', id: string, price: number, title: string, subtotalRegularPrice?: number | null, updatedAt: string, featuredImage: string, discountValue?: number | null, discountType?: DiscountType | null, description?: string | null, createdAt: string, courses: Array<{ __typename?: 'Course', id: string, title: string, price: number, description?: string | null } | null> } | { __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } }> }, subscription?: { __typename?: 'UserSubscription', id: string, startDate: string, endDate: string, user: { __typename?: 'User', id: string, fullName: string, email: string }, plan: { __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } } | null, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename?: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename?: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename?: 'Course', id: string, title: string }, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, media?: string | null, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename?: 'Certificate', id: string, issuedAt: string, template: { __typename?: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null, reviews?: Array<{ __typename?: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename?: 'Course', id: string, title: string } | null }> | null } | null>, bundles?: Array<{ __typename?: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename?: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename?: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, reviews?: Array<{ __typename?: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename?: 'Course', id: string, title: string } | null }> | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, position?: number | null, description?: string | null, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename?: 'Certificate', id: string, issuedAt: string, template: { __typename?: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null } | null> }> | null, company?: { __typename?: 'Company', id: string, email: string, name: string, isActive?: boolean | null, taxId?: string | null, taxName?: string | null, stripeId?: string | null, setupIntentClientSecret?: string | null, address?: string | null } | null } | null };

export type MarkLessonCompletedMutationVariables = Exact<{
  input: MarkLessonCompletedInput;
}>;


export type MarkLessonCompletedMutation = { __typename?: 'Mutation', markLessonCompleted?: { __typename?: 'LessonProgress', id: string, completed: boolean, startedAt?: string | null, completedAt?: string | null, updatedAt?: string | null, user: { __typename?: 'User', id: string, fullName: string, email: string }, lesson: { __typename?: 'Lesson', id: string, title: string } } | null };

export type SubmitQuizAttemptMutationVariables = Exact<{
  input: SubmitQuizAttemptInput;
}>;


export type SubmitQuizAttemptMutation = { __typename?: 'Mutation', submitQuizAttempt?: { __typename?: 'QuizProgress', id: string, score: number, completed: boolean, startedAt: string, completedAt?: string | null, user: { __typename?: 'User', id: string, fullName: string, email: string }, quiz: { __typename?: 'Quiz', id: string, title: string } } | null };

export type GetCourseProgressQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  courseId: Scalars['ID']['input'];
}>;


export type GetCourseProgressQuery = { __typename?: 'Query', getCourseProgress?: { __typename?: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, totalAssignments?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageCompletionTime?: number | null, averageScore?: number | null, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: string, fullName: string, email: string }, course: { __typename?: 'Course', id: string, title: string } } | null };

export type StartCourseProgressMutationVariables = Exact<{
  input: StartCourseProgressInput;
}>;


export type StartCourseProgressMutation = { __typename?: 'Mutation', startCourseProgress?: { __typename?: 'CourseProgress', id: string, completedLessons?: number | null, completedQuizzes?: number | null, totalLessons?: number | null, totalQuizzes?: number | null, totalAssignments?: number | null, progressPercentage: number, startedAt: string, completed?: boolean | null, completedAt?: string | null, averageCompletionTime?: number | null, averageScore?: number | null, createdAt: string, updatedAt: string, user: { __typename?: 'User', id: string, fullName: string, email: string, userName: string }, course: { __typename?: 'Course', id: string, title: string, category?: { __typename?: 'Category', id: string, name: string } | null, level?: { __typename?: 'Level', id: string, name: string } | null } } | null };

export type UpdateQuizProgressMutationVariables = Exact<{
  input: QuizProgressInput;
}>;


export type UpdateQuizProgressMutation = { __typename?: 'Mutation', updateQuizProgress?: { __typename?: 'QuizProgress', id: string, score: number, completed: boolean, startedAt: string, completedAt?: string | null, user: { __typename?: 'User', id: string, fullName: string, email: string, isActive?: boolean | null, userName: string, profilePicture?: string | null, phoneNumber?: string | null, occupation?: string | null }, quiz: { __typename?: 'Quiz', id: string, title: string, timer?: number | null, timeUnit?: string | null, position?: number | null, passingGrade: number, maxAttempts?: number | null, content?: string | null, createdAt: string, updatedAt: string } } | null };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: string, title: string, media?: string | null, description?: string | null, type: QuestionType, mark: number, order: number, answerExplanation?: string | null, createdAt: string, updatedAt: string, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null, answers?: Array<{ __typename?: 'Answer', id: string, type: string, title: string, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, order: number, correctAnswers?: Array<string> | null, createdAt: string, updatedAt: string }> | null } };

export type UpdateQuestionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
  input: UpdateQuestionInput;
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'Question', id: string, title: string, type: QuestionType, media?: string | null, description?: string | null, order: number, mark: number, answerExplanation?: string | null, updatedAt: string, createdAt: string, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null, answers?: Array<{ __typename?: 'Answer', id: string, type: string, title: string, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, order: number, correctAnswers?: Array<string> | null, createdAt: string, updatedAt: string }> | null } };

export type DeleteQuestionMutationVariables = Exact<{
  questionId: Scalars['ID']['input'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion?: boolean | null };

export type CreateQuizMutationVariables = Exact<{
  input: CreateQuizInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename?: 'Topic', id: string, description?: string | null, title?: string | null } } };

export type UpdateQuizMutationVariables = Exact<{
  updateQuizId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateQuizInput>;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz: { __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename?: 'Topic', id: string } } };

export type QuizQueryVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type QuizQuery = { __typename?: 'Query', quiz: { __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null }, questions?: Array<{ __typename?: 'Question', id: string, title: string, description?: string | null, type: QuestionType, order: number, answerExplanation?: string | null, answers?: Array<{ __typename?: 'Answer', id: string, title: string, type: string, order: number, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, correctAnswers?: Array<string> | null }> | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, score: number, completed: boolean, quiz: { __typename?: 'Quiz', id: string }, user: { __typename?: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, occupation?: string | null, isActive?: boolean | null } } | null } };

export type QuizzesByTopicIdQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type QuizzesByTopicIdQuery = { __typename?: 'Query', quizzesByTopicId: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, position?: number | null, maxAttempts?: number | null, passingGrade: number, createdAt: string, updatedAt: string, topic: { __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null }, questions?: Array<{ __typename?: 'Question', id: string, title: string, media?: string | null, description?: string | null, type: QuestionType, order: number, mark: number, answerExplanation?: string | null, updatedAt: string, createdAt: string, answers?: Array<{ __typename?: 'Answer', id: string, title: string, type: string, order: number, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, correctAnswers?: Array<string> | null }> | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, score: number, completed: boolean, quiz: { __typename?: 'Quiz', id: string }, user: { __typename?: 'User', id: string, fullName: string, email: string, profilePicture?: string | null, occupation?: string | null, isActive?: boolean | null } } | null }> };

export type DeleteQuizMutationVariables = Exact<{
  deleteQuizId: Scalars['ID']['input'];
}>;


export type DeleteQuizMutation = { __typename?: 'Mutation', deleteQuiz?: boolean | null };

export type CreateSubscriptionPlanMutationVariables = Exact<{
  input: CreateSubscriptionPlanInput;
}>;


export type CreateSubscriptionPlanMutation = { __typename?: 'Mutation', createSubscriptionPlan: { __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string, category?: { __typename?: 'Category', name: string, id: string, description?: string | null, createdAt: string, updatedAt: string } | null } };

export type UpdateSubscriptionPlanMutationVariables = Exact<{
  input: UpdateSubscriptionPlanInput;
}>;


export type UpdateSubscriptionPlanMutation = { __typename?: 'Mutation', updateSubscriptionPlan: { __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null } };

export type DeleteSubscriptionPlanMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSubscriptionPlanMutation = { __typename?: 'Mutation', deleteSubscriptionPlan: boolean };

export type SubscriptionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionPlansQuery = { __typename?: 'Query', subscriptionPlans: Array<{ __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, stripePricePlanID: string, price: number, duration: number, createdAt: string, updatedAt: string, category?: { __typename?: 'Category', id: string, name: string } | null }> };

export type CompanySubscriptionsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanySubscriptionsQuery = { __typename?: 'Query', companySubscriptions: Array<{ __typename?: 'CompanySubscription', id: string, quantity: number, status: string, stripeSubscriptionId: string, createdAt: string, updatedAt: string, plan: { __typename?: 'SubscriptionPlan', id: string, planName: string, duration: number, price: number }, company: { __typename?: 'Company', id: string, name: string, email: string } }> };

export type SubscriptionReportQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  companySubscriptionId: Scalars['String']['input'];
}>;


export type SubscriptionReportQuery = { __typename?: 'Query', subscriptionReport: { __typename?: 'SubscriptionReport', companySubscriptionId: string, totalSubscriptions: number, redeemedSubscriptions: number, unredeemedSubscriptions: number, activeSubscriptions: number } };

export type CompanyInvitesQueryVariables = Exact<{
  companySubscriptionId: Scalars['ID']['input'];
}>;


export type CompanyInvitesQuery = { __typename?: 'Query', companyInvites: Array<{ __typename?: 'CompanyInvite', id: string, email: string, type: string, codeId?: string | null, companyId?: string | null, companySubscriptionId: string, createdAt: string, expiresAt: string, status: string, redeemedByUserId?: string | null }> };

export type RequestSubscriptionCodesMutationVariables = Exact<{
  planId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type RequestSubscriptionCodesMutation = { __typename?: 'Mutation', requestSubscriptionCodes: { __typename?: 'CompanySubscription', id: string, status: string, quantity: number, createdAt: string, plan: { __typename?: 'SubscriptionPlan', id: string, planName: string, price: number, duration: number }, company: { __typename?: 'Company', id: string, name: string, email: string } } };

export type InviteEmployeesMutationVariables = Exact<{
  input: InviteEmployeesInput;
}>;


export type InviteEmployeesMutation = { __typename?: 'Mutation', inviteEmployees: { __typename?: 'InviteEmployeesResult', companySubscriptionId: string, invited: number, skipped: number, errors: Array<string>, invites: Array<{ __typename?: 'InviteSummary', email: string, codeId: string, status: string }> } };

export type ResendInviteMutationVariables = Exact<{
  companySubscriptionId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type ResendInviteMutation = { __typename?: 'Mutation', resendInvite: boolean };

export type PayCompanySubscriptionMutationVariables = Exact<{
  companySubscriptionId: Scalars['ID']['input'];
  paymentMethodId?: InputMaybe<Scalars['String']['input']>;
}>;


export type PayCompanySubscriptionMutation = { __typename?: 'Mutation', payCompanySubscription: { __typename: 'CompanySubscription', id: string, status: string, stripeSubscriptionId: string, updatedAt: string } | { __typename: 'SetupIntentRequired', clientSecret: string } };

export type ActivateCompanySubscriptionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ActivateCompanySubscriptionMutation = { __typename?: 'Mutation', activateCompanySubscription: { __typename?: 'UserSubscription', id: string, stripeSubscriptionId: string, startDate: string, endDate: string, isActive: boolean, user: { __typename?: 'User', id: string, fullName: string, email: string }, plan: { __typename?: 'SubscriptionPlan', id: string, planName: string }, company?: { __typename?: 'Company', id: string, name: string } | null, companySubscription?: { __typename?: 'CompanySubscription', id: string, status: string } | null } };

export type CreateTopicMutationVariables = Exact<{
  input: CreateTopicInput;
}>;


export type CreateTopicMutation = { __typename?: 'Mutation', createTopic: { __typename?: 'Topic', id: string, position?: number | null, title?: string | null, description?: string | null, createdAt: string, updatedAt: string } };

export type TopicQueryVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type TopicQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename?: 'Course', id: string, title: string }, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null }> | null } };

export type TopicsByCourseQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type TopicsByCourseQuery = { __typename?: 'Query', topicsByCourseId: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename?: 'Course', id: string, title: string }, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, content?: string | null, position?: number | null, createdAt: string, updatedAt: string, featuredImage?: string | null, attachments?: Array<string> | null, showPreview?: boolean | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, startedAt?: string | null, completedAt?: string | null, createdAt?: string | null, updatedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, progress?: { __typename?: 'QuizProgress', id: string, score: number, completed: boolean, startedAt: string, completedAt?: string | null } | null, questions?: Array<{ __typename?: 'Question', id: string, title: string, description?: string | null, media?: string | null, type: QuestionType, mark: number, order: number, answerExplanation?: string | null, createdAt: string, updatedAt: string, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null, answers?: Array<{ __typename?: 'Answer', id: string, type: string, title: string, isCorrect: boolean, image?: string | null, gapMatch?: string | null, viewFormat?: string | null, settings?: string | null, order: number, correctAnswers?: Array<string> | null, createdAt: string, updatedAt: string }> | null }> | null }> | null }> };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename?: 'Course', id: string, title: string }, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null }> | null }> };

export type UpdateTopicMutationVariables = Exact<{
  topicId: Scalars['ID']['input'];
  input?: InputMaybe<UpdateTopicInput>;
}>;


export type UpdateTopicMutation = { __typename?: 'Mutation', updateTopic: { __typename?: 'Topic', id: string, description?: string | null, title?: string | null, position?: number | null, updatedAt: string } };

export type DeleteTopicMutationVariables = Exact<{
  topicId: Scalars['ID']['input'];
}>;


export type DeleteTopicMutation = { __typename?: 'Mutation', deleteTopic?: boolean | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, isActive?: boolean | null, stripeId?: string | null, occupation?: string | null, major?: string | null, interests?: Array<string | null> | null, createdAt: string, updatedAt: string } | null> | null };

export type InternalUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type InternalUsersQuery = { __typename?: 'Query', internalUsers: Array<{ __typename?: 'User', id: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, isActive?: boolean | null, stripeId?: string | null, occupation?: string | null, major?: string | null, interests?: Array<string | null> | null, createdAt: string, updatedAt: string }> };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'UserProfile', id: string, fullName?: string | null, userName?: string | null, email?: string | null, phoneNumber?: string | null, profilePicture?: string | null, major?: string | null, occupation?: string | null, interests?: Array<string | null> | null } };

export type UpdateUserPasswordMutationVariables = Exact<{
  input: UpdateUserPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: boolean };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'Me', customerId: string, fullName: string, userName: string, email: string, role?: string | null, authProvider?: string | null, socialId?: string | null, phoneNumber?: string | null, isVerified?: boolean | null, profilePicture?: string | null, interests?: Array<string | null> | null, major?: string | null, occupation?: string | null, isActive?: boolean | null, stripeId?: string | null, updatedAt?: string | null, createdAt?: string | null, carts: { __typename?: 'Cart', id: string, subtotal: number, tax: number, total: number, updatedAt: string, expiresAt: string, createdAt: string, items: Array<{ __typename?: 'CartItem', id: string, inStock: boolean, cartId: string, itemId: string, itemType: ItemType, notes?: string | null, quantity: number, unitPrice: number, item: { __typename?: 'Course', id: string, featuredImage: string, duration: number, discountedPrice?: number | null, description?: string | null, price: number, requirements?: string | null, status?: CourseStatus | null, title: string, tags?: Array<string> | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null } | { __typename?: 'CourseBundle', id: string, price: number, title: string, subtotalRegularPrice?: number | null, updatedAt: string, featuredImage: string, discountValue?: number | null, discountType?: DiscountType | null, description?: string | null, createdAt: string, courses: Array<{ __typename?: 'Course', id: string, title: string, price: number, description?: string | null } | null> } | { __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } }> }, subscription?: { __typename?: 'UserSubscription', id: string, startDate: string, endDate: string, user: { __typename?: 'User', id: string, fullName: string, email: string }, plan: { __typename?: 'SubscriptionPlan', id: string, planName: string, planDescription?: string | null, price: number, duration: number, createdAt: string, updatedAt: string } } | null, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, shortDescription?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename?: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename?: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, description?: string | null, position?: number | null, createdAt: string, updatedAt: string, course: { __typename?: 'Course', id: string, title: string }, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, media?: string | null, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename?: 'Certificate', id: string, issuedAt: string, template: { __typename?: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null, reviews?: Array<{ __typename?: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename?: 'Course', id: string, title: string } | null }> | null } | null>, bundles?: Array<{ __typename?: 'CourseBundle', id: string, title: string, description?: string | null, featuredImage: string, price: number, subtotalRegularPrice?: number | null, discountType?: DiscountType | null, discountValue?: number | null, createdAt: string, updatedAt: string, courses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, tags?: Array<string> | null, featuredImage: string, price: number, discountedPrice?: number | null, promotionDuration?: number | null, duration: number, requirements?: string | null, status?: CourseStatus | null, creatorID?: string | null, createdAt: string, updatedAt: string, instructors?: Array<{ __typename?: 'User', id: string, fullName: string, email: string }> | null, metadata?: { __typename?: 'CourseMetadata', id?: string | null, learnings?: string | null, benefits?: string | null, targetAudience?: string | null, materialsIncluded?: string | null, requirements?: string | null } | null, video?: { __typename?: 'Video', id: string, videoURL?: string | null, source?: string | null, type?: string | null, duration?: number | null, description?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, createdAt: string, updatedAt: string } | null, level?: { __typename?: 'Level', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, category?: { __typename?: 'Category', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string } | null, creator?: { __typename?: 'User', id: string, fullName: string, email: string } | null, progress?: { __typename?: 'CourseProgress', id: string, updatedAt: string, totalQuizzes?: number | null, totalLessons?: number | null, totalAssignments?: number | null, startedAt: string, progressPercentage: number, createdAt: string, completedQuizzes?: number | null, completedLessons?: number | null, completedAt?: string | null, completed?: boolean | null, averageScore?: number | null, averageCompletionTime?: number | null } | null, reviews?: Array<{ __typename?: 'Review', id: string, comment?: string | null, rating?: number | null, likes?: number | null, createdAt?: string | null, updatedAt?: string | null, course?: { __typename?: 'Course', id: string, title: string } | null }> | null, topics?: Array<{ __typename?: 'Topic', id: string, title?: string | null, position?: number | null, description?: string | null, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string, position?: number | null, featuredImage?: string | null, content?: string | null, attachments?: Array<string> | null, video?: { __typename?: 'Video', id: string, source?: string | null, videoURL?: string | null, type?: string | null, tags?: Array<string> | null, width?: number | null, height?: number | null, format?: string | null, duration?: number | null, description?: string | null } | null, progress?: { __typename?: 'LessonProgress', id: string, completed: boolean, completedAt?: string | null, startedAt?: string | null } | null }> | null, quizzes?: Array<{ __typename?: 'Quiz', id: string, title: string, content?: string | null, timer?: number | null, timeUnit?: string | null, passingGrade: number, position?: number | null, maxAttempts?: number | null, questions?: Array<{ __typename?: 'Question', id: string, mark: number, order: number, title: string, type: QuestionType, description?: string | null, answerExplanation?: string | null, settings?: { __typename?: 'QuestionSettings', questionMark?: number | null, questionType?: QuestionType | null, answerRequired?: boolean | null, showQuestionMark?: boolean | null, randomizeQuestion?: boolean | null, sortableItems?: Array<string> | null, correctAnswers?: Array<string> | null, matrixMatches?: Array<{ __typename?: 'MatrixMatch', columnA: string, columnB: string }> | null } | null }> | null, progress?: { __typename?: 'QuizProgress', id: string, completed: boolean, score: number, startedAt: string, completedAt?: string | null } | null }> | null }> | null, certificates?: Array<{ __typename?: 'Certificate', id: string, issuedAt: string, template: { __typename?: 'CertificateTemplate', id: string, name: string, logoUrl?: string | null, content: string, background?: string | null } }> | null } | null> }> | null, company?: { __typename?: 'Company', id: string, email: string, name: string, isActive?: boolean | null, taxId?: string | null, taxName?: string | null, stripeId?: string | null, setupIntentClientSecret?: string | null, address?: string | null } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLoginMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { login }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockLoginMutation = (resolver: GraphQLResponseResolver<LoginMutation, LoginMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<LoginMutation, LoginMutationVariables>(
    'Login',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLogoutMutation(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { logout }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockLogoutMutation = (resolver: GraphQLResponseResolver<LogoutMutation, LogoutMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<LogoutMutation, LogoutMutationVariables>(
    'Logout',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockChangePasswordMutation(
 *   ({ query, variables }) => {
 *     const { token, password } = variables;
 *     return HttpResponse.json({
 *       data: { changePassword }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockChangePasswordMutation = (resolver: GraphQLResponseResolver<ChangePasswordMutation, ChangePasswordMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    'ChangePassword',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockResetPasswordMutation(
 *   ({ query, variables }) => {
 *     const { email } = variables;
 *     return HttpResponse.json({
 *       data: { resetPassword }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockResetPasswordMutation = (resolver: GraphQLResponseResolver<ResetPasswordMutation, ResetPasswordMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    'ResetPassword',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockValidateInviteTokenQuery(
 *   ({ query, variables }) => {
 *     const { token } = variables;
 *     return HttpResponse.json({
 *       data: { validateInviteToken }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockValidateInviteTokenQuery = (resolver: GraphQLResponseResolver<ValidateInviteTokenQuery, ValidateInviteTokenQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<ValidateInviteTokenQuery, ValidateInviteTokenQueryVariables>(
    'ValidateInviteToken',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCheckUserExistsQuery(
 *   ({ query, variables }) => {
 *     const { email } = variables;
 *     return HttpResponse.json({
 *       data: { checkUserExists }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCheckUserExistsQuery = (resolver: GraphQLResponseResolver<CheckUserExistsQuery, CheckUserExistsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CheckUserExistsQuery, CheckUserExistsQueryVariables>(
    'CheckUserExists',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateCourseBundleMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createCourseBundle }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateCourseBundleMutation = (resolver: GraphQLResponseResolver<CreateCourseBundleMutation, CreateCourseBundleMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateCourseBundleMutation, CreateCourseBundleMutationVariables>(
    'CreateCourseBundle',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstructorBundlesQuery(
 *   ({ query, variables }) => {
 *     const { search, sortBy, sortOrder, page, limit } = variables;
 *     return HttpResponse.json({
 *       data: { instructorBundles }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInstructorBundlesQuery = (resolver: GraphQLResponseResolver<InstructorBundlesQuery, InstructorBundlesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<InstructorBundlesQuery, InstructorBundlesQueryVariables>(
    'InstructorBundles',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBundlesQuery(
 *   ({ query, variables }) => {
 *     const { search, sortBy, sortOrder, page, limit } = variables;
 *     return HttpResponse.json({
 *       data: { bundles }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockBundlesQuery = (resolver: GraphQLResponseResolver<BundlesQuery, BundlesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<BundlesQuery, BundlesQueryVariables>(
    'Bundles',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBundleQuery(
 *   ({ query, variables }) => {
 *     const { bundleId } = variables;
 *     return HttpResponse.json({
 *       data: { bundle }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockBundleQuery = (resolver: GraphQLResponseResolver<BundleQuery, BundleQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<BundleQuery, BundleQueryVariables>(
    'Bundle',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCategoriesQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getCategories }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetCategoriesQuery = (resolver: GraphQLResponseResolver<GetCategoriesQuery, GetCategoriesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetCategoriesQuery, GetCategoriesQueryVariables>(
    'GetCategories',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCategoryQuery(
 *   ({ query, variables }) => {
 *     const { getCategoryId } = variables;
 *     return HttpResponse.json({
 *       data: { getCategory }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetCategoryQuery = (resolver: GraphQLResponseResolver<GetCategoryQuery, GetCategoryQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetCategoryQuery, GetCategoryQueryVariables>(
    'GetCategory',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateCategoryMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createCategory }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateCategoryMutation = (resolver: GraphQLResponseResolver<CreateCategoryMutation, CreateCategoryMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    'CreateCategory',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCategoryMutation(
 *   ({ query, variables }) => {
 *     const { updateCategoryId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateCategory }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateCategoryMutation = (resolver: GraphQLResponseResolver<UpdateCategoryMutation, UpdateCategoryMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
    'UpdateCategory',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteCategoryMutation(
 *   ({ query, variables }) => {
 *     const { deleteCategoryId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteCategory }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteCategoryMutation = (resolver: GraphQLResponseResolver<DeleteCategoryMutation, DeleteCategoryMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    'DeleteCategory',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateCompanyMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createCompany }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateCompanyMutation = (resolver: GraphQLResponseResolver<CreateCompanyMutation, CreateCompanyMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateCompanyMutation, CreateCompanyMutationVariables>(
    'CreateCompany',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCompanyMutation(
 *   ({ query, variables }) => {
 *     const { companyId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateCompany }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateCompanyMutation = (resolver: GraphQLResponseResolver<UpdateCompanyMutation, UpdateCompanyMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(
    'UpdateCompany',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompaniesQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { companies }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompaniesQuery = (resolver: GraphQLResponseResolver<CompaniesQuery, CompaniesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompaniesQuery, CompaniesQueryVariables>(
    'Companies',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyQuery(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { company }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyQuery = (resolver: GraphQLResponseResolver<CompanyQuery, CompanyQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyQuery, CompanyQueryVariables>(
    'Company',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteCompanyMutation(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteCompany }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteCompanyMutation = (resolver: GraphQLResponseResolver<DeleteCompanyMutation, DeleteCompanyMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(
    'DeleteCompany',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyAdminsQuery(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { companyAdmins }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyAdminsQuery = (resolver: GraphQLResponseResolver<CompanyAdminsQuery, CompanyAdminsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyAdminsQuery, CompanyAdminsQueryVariables>(
    'CompanyAdmins',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyUsersQuery(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { companyUsers }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyUsersQuery = (resolver: GraphQLResponseResolver<CompanyUsersQuery, CompanyUsersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyUsersQuery, CompanyUsersQueryVariables>(
    'CompanyUsers',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockBusinessDashboardPeopleQuery(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { companyAdmins, companyUsers }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockBusinessDashboardPeopleQuery = (resolver: GraphQLResponseResolver<BusinessDashboardPeopleQuery, BusinessDashboardPeopleQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<BusinessDashboardPeopleQuery, BusinessDashboardPeopleQueryVariables>(
    'BusinessDashboardPeople',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyAdminInvitesQuery(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { companyAdminInvites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyAdminInvitesQuery = (resolver: GraphQLResponseResolver<CompanyAdminInvitesQuery, CompanyAdminInvitesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyAdminInvitesQuery, CompanyAdminInvitesQueryVariables>(
    'CompanyAdminInvites',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInviteAdminsMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { inviteAdmins }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInviteAdminsMutation = (resolver: GraphQLResponseResolver<InviteAdminsMutation, InviteAdminsMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<InviteAdminsMutation, InviteAdminsMutationVariables>(
    'InviteAdmins',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockResendAdminInviteMutation(
 *   ({ query, variables }) => {
 *     const { inviteId } = variables;
 *     return HttpResponse.json({
 *       data: { resendAdminInvite }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockResendAdminInviteMutation = (resolver: GraphQLResponseResolver<ResendAdminInviteMutation, ResendAdminInviteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<ResendAdminInviteMutation, ResendAdminInviteMutationVariables>(
    'ResendAdminInvite',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyCoursesQuery(
 *   ({ query, variables }) => {
 *     const { companyId, filter } = variables;
 *     return HttpResponse.json({
 *       data: { companyCourses }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyCoursesQuery = (resolver: GraphQLResponseResolver<CompanyCoursesQuery, CompanyCoursesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyCoursesQuery, CompanyCoursesQueryVariables>(
    'CompanyCourses',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyCourseProgressSummaryQuery(
 *   ({ query, variables }) => {
 *     const { companyId, filter } = variables;
 *     return HttpResponse.json({
 *       data: { companyCourseProgressSummary }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyCourseProgressSummaryQuery = (resolver: GraphQLResponseResolver<CompanyCourseProgressSummaryQuery, CompanyCourseProgressSummaryQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyCourseProgressSummaryQuery, CompanyCourseProgressSummaryQueryVariables>(
    'CompanyCourseProgressSummary',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyCourseProgressQuery(
 *   ({ query, variables }) => {
 *     const { companyId, filter } = variables;
 *     return HttpResponse.json({
 *       data: { companyCourseProgress }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyCourseProgressQuery = (resolver: GraphQLResponseResolver<CompanyCourseProgressQuery, CompanyCourseProgressQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyCourseProgressQuery, CompanyCourseProgressQueryVariables>(
    'CompanyCourseProgress',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTeamDashboardQuery(
 *   ({ query, variables }) => {
 *     const { companyId, filter } = variables;
 *     return HttpResponse.json({
 *       data: { companyTeamStats, companyTeamMembers }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTeamDashboardQuery = (resolver: GraphQLResponseResolver<TeamDashboardQuery, TeamDashboardQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TeamDashboardQuery, TeamDashboardQueryVariables>(
    'TeamDashboard',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInstructorCoursesQuery(
 *   ({ query, variables }) => {
 *     const { search, sortBy, sortOrder, page, limit } = variables;
 *     return HttpResponse.json({
 *       data: { instructorCourses }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInstructorCoursesQuery = (resolver: GraphQLResponseResolver<InstructorCoursesQuery, InstructorCoursesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<InstructorCoursesQuery, InstructorCoursesQueryVariables>(
    'InstructorCourses',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateInitialCourseMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createInitialCourse }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateInitialCourseMutation = (resolver: GraphQLResponseResolver<CreateInitialCourseMutation, CreateInitialCourseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateInitialCourseMutation, CreateInitialCourseMutationVariables>(
    'CreateInitialCourse',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCourseQuery(
 *   ({ query, variables }) => {
 *     const { courseId } = variables;
 *     return HttpResponse.json({
 *       data: { course }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCourseQuery = (resolver: GraphQLResponseResolver<CourseQuery, CourseQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CourseQuery, CourseQueryVariables>(
    'Course',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateCourseMutation(
 *   ({ query, variables }) => {
 *     const { input, updateCourseId } = variables;
 *     return HttpResponse.json({
 *       data: { updateCourse }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateCourseMutation = (resolver: GraphQLResponseResolver<UpdateCourseMutation, UpdateCourseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateCourseMutation, UpdateCourseMutationVariables>(
    'UpdateCourse',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCourseIntroVideoQuery(
 *   ({ query, variables }) => {
 *     const { courseId } = variables;
 *     return HttpResponse.json({
 *       data: { courseIntroVideo }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCourseIntroVideoQuery = (resolver: GraphQLResponseResolver<CourseIntroVideoQuery, CourseIntroVideoQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CourseIntroVideoQuery, CourseIntroVideoQueryVariables>(
    'CourseIntroVideo',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteCourseMutation(
 *   ({ query, variables }) => {
 *     const { courseId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteCourse }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteCourseMutation = (resolver: GraphQLResponseResolver<DeleteCourseMutation, DeleteCourseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteCourseMutation, DeleteCourseMutationVariables>(
    'DeleteCourse',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEnrollmentsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getEnrollments }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetEnrollmentsQuery = (resolver: GraphQLResponseResolver<GetEnrollmentsQuery, GetEnrollmentsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetEnrollmentsQuery, GetEnrollmentsQueryVariables>(
    'GetEnrollments',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetEnrollmentByIdQuery(
 *   ({ query, variables }) => {
 *     const { enrollmentId } = variables;
 *     return HttpResponse.json({
 *       data: { getEnrollmentById }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetEnrollmentByIdQuery = (resolver: GraphQLResponseResolver<GetEnrollmentByIdQuery, GetEnrollmentByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetEnrollmentByIdQuery, GetEnrollmentByIdQueryVariables>(
    'GetEnrollmentById',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateEnrollmentMutation(
 *   ({ query, variables }) => {
 *     const { userId, courseId } = variables;
 *     return HttpResponse.json({
 *       data: { createEnrollment }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateEnrollmentMutation = (resolver: GraphQLResponseResolver<CreateEnrollmentMutation, CreateEnrollmentMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateEnrollmentMutation, CreateEnrollmentMutationVariables>(
    'CreateEnrollment',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUserEnrollmentsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getUserEnrollments }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetUserEnrollmentsQuery = (resolver: GraphQLResponseResolver<GetUserEnrollmentsQuery, GetUserEnrollmentsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetUserEnrollmentsQuery, GetUserEnrollmentsQueryVariables>(
    'GetUserEnrollments',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAssignInstructorMutation(
 *   ({ query, variables }) => {
 *     const { userId, courseId } = variables;
 *     return HttpResponse.json({
 *       data: { assignInstructor }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAssignInstructorMutation = (resolver: GraphQLResponseResolver<AssignInstructorMutation, AssignInstructorMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AssignInstructorMutation, AssignInstructorMutationVariables>(
    'AssignInstructor',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUnassignInstructorMutation(
 *   ({ query, variables }) => {
 *     const { userId, courseId } = variables;
 *     return HttpResponse.json({
 *       data: { unassignInstructor }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUnassignInstructorMutation = (resolver: GraphQLResponseResolver<UnassignInstructorMutation, UnassignInstructorMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UnassignInstructorMutation, UnassignInstructorMutationVariables>(
    'UnassignInstructor',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateLessonMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createLesson }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateLessonMutation = (resolver: GraphQLResponseResolver<CreateLessonMutation, CreateLessonMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateLessonMutation, CreateLessonMutationVariables>(
    'CreateLesson',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateLessonMutation(
 *   ({ query, variables }) => {
 *     const { lessonId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateLesson }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateLessonMutation = (resolver: GraphQLResponseResolver<UpdateLessonMutation, UpdateLessonMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateLessonMutation, UpdateLessonMutationVariables>(
    'UpdateLesson',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteLessonMutation(
 *   ({ query, variables }) => {
 *     const { lessonId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteLesson }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteLessonMutation = (resolver: GraphQLResponseResolver<DeleteLessonMutation, DeleteLessonMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteLessonMutation, DeleteLessonMutationVariables>(
    'DeleteLesson',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLessonQuery(
 *   ({ query, variables }) => {
 *     const { lessonId } = variables;
 *     return HttpResponse.json({
 *       data: { lesson }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockLessonQuery = (resolver: GraphQLResponseResolver<LessonQuery, LessonQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<LessonQuery, LessonQueryVariables>(
    'Lesson',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLessonsByTopicIdQuery(
 *   ({ query, variables }) => {
 *     const { topicId } = variables;
 *     return HttpResponse.json({
 *       data: { lessonsByTopicId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockLessonsByTopicIdQuery = (resolver: GraphQLResponseResolver<LessonsByTopicIdQuery, LessonsByTopicIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<LessonsByTopicIdQuery, LessonsByTopicIdQueryVariables>(
    'LessonsByTopicId',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetLevelsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getLevels }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetLevelsQuery = (resolver: GraphQLResponseResolver<GetLevelsQuery, GetLevelsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetLevelsQuery, GetLevelsQueryVariables>(
    'GetLevels',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetLevelQuery(
 *   ({ query, variables }) => {
 *     const { getLevelId } = variables;
 *     return HttpResponse.json({
 *       data: { getLevel }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetLevelQuery = (resolver: GraphQLResponseResolver<GetLevelQuery, GetLevelQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetLevelQuery, GetLevelQueryVariables>(
    'GetLevel',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateLevelMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createLevel }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateLevelMutation = (resolver: GraphQLResponseResolver<CreateLevelMutation, CreateLevelMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateLevelMutation, CreateLevelMutationVariables>(
    'CreateLevel',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateLevelMutation(
 *   ({ query, variables }) => {
 *     const { updateLevelId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateLevel }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateLevelMutation = (resolver: GraphQLResponseResolver<UpdateLevelMutation, UpdateLevelMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateLevelMutation, UpdateLevelMutationVariables>(
    'UpdateLevel',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteLevelMutation(
 *   ({ query, variables }) => {
 *     const { deleteLevelId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteLevel }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteLevelMutation = (resolver: GraphQLResponseResolver<DeleteLevelMutation, DeleteLevelMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteLevelMutation, DeleteLevelMutationVariables>(
    'DeleteLevel',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMeQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockMeQuery = (resolver: GraphQLResponseResolver<MeQuery, MeQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<MeQuery, MeQueryVariables>(
    'Me',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMarkLessonCompletedMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { markLessonCompleted }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockMarkLessonCompletedMutation = (resolver: GraphQLResponseResolver<MarkLessonCompletedMutation, MarkLessonCompletedMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<MarkLessonCompletedMutation, MarkLessonCompletedMutationVariables>(
    'MarkLessonCompleted',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSubmitQuizAttemptMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { submitQuizAttempt }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSubmitQuizAttemptMutation = (resolver: GraphQLResponseResolver<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>(
    'SubmitQuizAttempt',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetCourseProgressQuery(
 *   ({ query, variables }) => {
 *     const { userId, courseId } = variables;
 *     return HttpResponse.json({
 *       data: { getCourseProgress }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetCourseProgressQuery = (resolver: GraphQLResponseResolver<GetCourseProgressQuery, GetCourseProgressQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetCourseProgressQuery, GetCourseProgressQueryVariables>(
    'GetCourseProgress',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStartCourseProgressMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { startCourseProgress }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockStartCourseProgressMutation = (resolver: GraphQLResponseResolver<StartCourseProgressMutation, StartCourseProgressMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<StartCourseProgressMutation, StartCourseProgressMutationVariables>(
    'StartCourseProgress',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateQuizProgressMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateQuizProgress }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateQuizProgressMutation = (resolver: GraphQLResponseResolver<UpdateQuizProgressMutation, UpdateQuizProgressMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateQuizProgressMutation, UpdateQuizProgressMutationVariables>(
    'UpdateQuizProgress',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateQuestionMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createQuestion }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateQuestionMutation = (resolver: GraphQLResponseResolver<CreateQuestionMutation, CreateQuestionMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateQuestionMutation, CreateQuestionMutationVariables>(
    'CreateQuestion',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateQuestionMutation(
 *   ({ query, variables }) => {
 *     const { questionId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateQuestion }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateQuestionMutation = (resolver: GraphQLResponseResolver<UpdateQuestionMutation, UpdateQuestionMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(
    'UpdateQuestion',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteQuestionMutation(
 *   ({ query, variables }) => {
 *     const { questionId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteQuestion }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteQuestionMutation = (resolver: GraphQLResponseResolver<DeleteQuestionMutation, DeleteQuestionMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(
    'DeleteQuestion',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateQuizMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createQuiz }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateQuizMutation = (resolver: GraphQLResponseResolver<CreateQuizMutation, CreateQuizMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateQuizMutation, CreateQuizMutationVariables>(
    'CreateQuiz',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateQuizMutation(
 *   ({ query, variables }) => {
 *     const { updateQuizId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateQuiz }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateQuizMutation = (resolver: GraphQLResponseResolver<UpdateQuizMutation, UpdateQuizMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateQuizMutation, UpdateQuizMutationVariables>(
    'UpdateQuiz',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockQuizQuery(
 *   ({ query, variables }) => {
 *     const { quizId } = variables;
 *     return HttpResponse.json({
 *       data: { quiz }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockQuizQuery = (resolver: GraphQLResponseResolver<QuizQuery, QuizQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<QuizQuery, QuizQueryVariables>(
    'Quiz',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockQuizzesByTopicIdQuery(
 *   ({ query, variables }) => {
 *     const { topicId } = variables;
 *     return HttpResponse.json({
 *       data: { quizzesByTopicId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockQuizzesByTopicIdQuery = (resolver: GraphQLResponseResolver<QuizzesByTopicIdQuery, QuizzesByTopicIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<QuizzesByTopicIdQuery, QuizzesByTopicIdQueryVariables>(
    'QuizzesByTopicId',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteQuizMutation(
 *   ({ query, variables }) => {
 *     const { deleteQuizId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteQuiz }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteQuizMutation = (resolver: GraphQLResponseResolver<DeleteQuizMutation, DeleteQuizMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteQuizMutation, DeleteQuizMutationVariables>(
    'DeleteQuiz',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateSubscriptionPlanMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createSubscriptionPlan }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateSubscriptionPlanMutation = (resolver: GraphQLResponseResolver<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateSubscriptionPlanMutation, CreateSubscriptionPlanMutationVariables>(
    'CreateSubscriptionPlan',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateSubscriptionPlanMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateSubscriptionPlan }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateSubscriptionPlanMutation = (resolver: GraphQLResponseResolver<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateSubscriptionPlanMutation, UpdateSubscriptionPlanMutationVariables>(
    'UpdateSubscriptionPlan',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteSubscriptionPlanMutation(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { deleteSubscriptionPlan }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteSubscriptionPlanMutation = (resolver: GraphQLResponseResolver<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteSubscriptionPlanMutation, DeleteSubscriptionPlanMutationVariables>(
    'DeleteSubscriptionPlan',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSubscriptionPlansQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { subscriptionPlans }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSubscriptionPlansQuery = (resolver: GraphQLResponseResolver<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>(
    'SubscriptionPlans',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanySubscriptionsQuery(
 *   ({ query, variables }) => {
 *     const { companyId } = variables;
 *     return HttpResponse.json({
 *       data: { companySubscriptions }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanySubscriptionsQuery = (resolver: GraphQLResponseResolver<CompanySubscriptionsQuery, CompanySubscriptionsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanySubscriptionsQuery, CompanySubscriptionsQueryVariables>(
    'CompanySubscriptions',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSubscriptionReportQuery(
 *   ({ query, variables }) => {
 *     const { companyId, companySubscriptionId } = variables;
 *     return HttpResponse.json({
 *       data: { subscriptionReport }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSubscriptionReportQuery = (resolver: GraphQLResponseResolver<SubscriptionReportQuery, SubscriptionReportQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SubscriptionReportQuery, SubscriptionReportQueryVariables>(
    'SubscriptionReport',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCompanyInvitesQuery(
 *   ({ query, variables }) => {
 *     const { companySubscriptionId } = variables;
 *     return HttpResponse.json({
 *       data: { companyInvites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCompanyInvitesQuery = (resolver: GraphQLResponseResolver<CompanyInvitesQuery, CompanyInvitesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CompanyInvitesQuery, CompanyInvitesQueryVariables>(
    'CompanyInvites',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRequestSubscriptionCodesMutation(
 *   ({ query, variables }) => {
 *     const { planId, companyId, quantity } = variables;
 *     return HttpResponse.json({
 *       data: { requestSubscriptionCodes }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRequestSubscriptionCodesMutation = (resolver: GraphQLResponseResolver<RequestSubscriptionCodesMutation, RequestSubscriptionCodesMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<RequestSubscriptionCodesMutation, RequestSubscriptionCodesMutationVariables>(
    'RequestSubscriptionCodes',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInviteEmployeesMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { inviteEmployees }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInviteEmployeesMutation = (resolver: GraphQLResponseResolver<InviteEmployeesMutation, InviteEmployeesMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<InviteEmployeesMutation, InviteEmployeesMutationVariables>(
    'InviteEmployees',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockResendInviteMutation(
 *   ({ query, variables }) => {
 *     const { companySubscriptionId, email } = variables;
 *     return HttpResponse.json({
 *       data: { resendInvite }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockResendInviteMutation = (resolver: GraphQLResponseResolver<ResendInviteMutation, ResendInviteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<ResendInviteMutation, ResendInviteMutationVariables>(
    'ResendInvite',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPayCompanySubscriptionMutation(
 *   ({ query, variables }) => {
 *     const { companySubscriptionId, paymentMethodId } = variables;
 *     return HttpResponse.json({
 *       data: { payCompanySubscription }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPayCompanySubscriptionMutation = (resolver: GraphQLResponseResolver<PayCompanySubscriptionMutation, PayCompanySubscriptionMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<PayCompanySubscriptionMutation, PayCompanySubscriptionMutationVariables>(
    'PayCompanySubscription',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockActivateCompanySubscriptionMutation(
 *   ({ query, variables }) => {
 *     const { token } = variables;
 *     return HttpResponse.json({
 *       data: { activateCompanySubscription }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockActivateCompanySubscriptionMutation = (resolver: GraphQLResponseResolver<ActivateCompanySubscriptionMutation, ActivateCompanySubscriptionMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<ActivateCompanySubscriptionMutation, ActivateCompanySubscriptionMutationVariables>(
    'ActivateCompanySubscription',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateTopicMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createTopic }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateTopicMutation = (resolver: GraphQLResponseResolver<CreateTopicMutation, CreateTopicMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateTopicMutation, CreateTopicMutationVariables>(
    'CreateTopic',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTopicQuery(
 *   ({ query, variables }) => {
 *     const { topicId } = variables;
 *     return HttpResponse.json({
 *       data: { topic }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTopicQuery = (resolver: GraphQLResponseResolver<TopicQuery, TopicQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TopicQuery, TopicQueryVariables>(
    'Topic',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTopicsByCourseQuery(
 *   ({ query, variables }) => {
 *     const { courseId } = variables;
 *     return HttpResponse.json({
 *       data: { topicsByCourseId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTopicsByCourseQuery = (resolver: GraphQLResponseResolver<TopicsByCourseQuery, TopicsByCourseQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TopicsByCourseQuery, TopicsByCourseQueryVariables>(
    'TopicsByCourse',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTopicsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { topics }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTopicsQuery = (resolver: GraphQLResponseResolver<TopicsQuery, TopicsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TopicsQuery, TopicsQueryVariables>(
    'Topics',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateTopicMutation(
 *   ({ query, variables }) => {
 *     const { topicId, input } = variables;
 *     return HttpResponse.json({
 *       data: { updateTopic }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateTopicMutation = (resolver: GraphQLResponseResolver<UpdateTopicMutation, UpdateTopicMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateTopicMutation, UpdateTopicMutationVariables>(
    'UpdateTopic',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteTopicMutation(
 *   ({ query, variables }) => {
 *     const { topicId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteTopic }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteTopicMutation = (resolver: GraphQLResponseResolver<DeleteTopicMutation, DeleteTopicMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeleteTopicMutation, DeleteTopicMutationVariables>(
    'DeleteTopic',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetUsersQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getUsers }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetUsersQuery = (resolver: GraphQLResponseResolver<GetUsersQuery, GetUsersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetUsersQuery, GetUsersQueryVariables>(
    'GetUsers',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockInternalUsersQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { internalUsers }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInternalUsersQuery = (resolver: GraphQLResponseResolver<InternalUsersQuery, InternalUsersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<InternalUsersQuery, InternalUsersQueryVariables>(
    'InternalUsers',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserProfileMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateUserProfile }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateUserProfileMutation = (resolver: GraphQLResponseResolver<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
    'UpdateUserProfile',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserPasswordMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateUserPassword }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateUserPasswordMutation = (resolver: GraphQLResponseResolver<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(
    'UpdateUserPassword',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUserMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateUserMutation = (resolver: GraphQLResponseResolver<CreateUserMutation, CreateUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateUserMutation, CreateUserMutationVariables>(
    'CreateUser',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetProfileQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getProfile }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetProfileQuery = (resolver: GraphQLResponseResolver<GetProfileQuery, GetProfileQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetProfileQuery, GetProfileQueryVariables>(
    'GetProfile',
    resolver,
    options
  )
