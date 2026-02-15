import type * as Types from './types';
import type { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const UserBasicInfoFragmentDoc = gql`
    fragment UserBasicInfo on User {
  id
  fullName
  userName
  profilePicture
  email
  isVerified
  isActive
  createdAt
}
    `;
export const LoginDocument = gql`
    mutation Login($input: Login!) {
  login(input: $input) {
    token
    role
  }
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password)
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!) {
  resetPassword(email: $email)
}
    `;
export const ValidateInviteTokenDocument = gql`
    query ValidateInviteToken($token: String!) {
  validateInviteToken(token: $token) {
    valid
    expired
    used
    data {
      email
      companyName
      invitedBy
      planName
    }
  }
}
    `;
export const CheckUserExistsDocument = gql`
    query CheckUserExists($email: String!) {
  checkUserExists(email: $email) {
    exists
    userId
  }
}
    `;
export const CreateCourseBundleDocument = gql`
    mutation CreateCourseBundle($input: CreateCourseBundleInput!) {
  createCourseBundle(input: $input) {
    id
    title
    description
    featuredImage
    price
    subtotalRegularPrice
    discountType
    discountValue
    courses {
      id
      tags
      title
      description
      price
      duration
      discountedPrice
      featuredImage
      visibility
    }
    createdAt
    updatedAt
  }
}
    `;
export const InstructorBundlesDocument = gql`
    query InstructorBundles($search: String, $sortBy: String, $sortOrder: String, $page: Int, $limit: Int) {
  instructorBundles(
    search: $search
    sortBy: $sortBy
    sortOrder: $sortOrder
    page: $page
    limit: $limit
  ) {
    totalCount
    pageInfo {
      page
      limit
      offset
      hasNextPage
    }
    bundle {
      id
      title
      description
      featuredImage
      price
      subtotalRegularPrice
      discountType
      discountValue
      courses {
        id
        title
        description
        price
        duration
        discountedPrice
        featuredImage
        instructors {
          id
          fullName
          email
          profilePicture
          phoneNumber
          isActive
          userName
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export const BundlesDocument = gql`
    query Bundles($search: String, $sortBy: String, $sortOrder: String, $page: Int, $limit: Int) {
  bundles(
    search: $search
    sortBy: $sortBy
    sortOrder: $sortOrder
    page: $page
    limit: $limit
  ) {
    totalCount
    pageInfo {
      page
      limit
      offset
      hasNextPage
    }
    bundle {
      id
      title
      description
      featuredImage
      price
      subtotalRegularPrice
      discountType
      discountValue
      courses {
        id
        title
        description
        price
        duration
        discountedPrice
        featuredImage
        visibility
        instructors {
          id
          fullName
          email
          profilePicture
          phoneNumber
          isActive
          userName
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export const BundleDocument = gql`
    query Bundle($bundleId: ID!) {
  bundle(id: $bundleId) {
    id
    title
    description
    featuredImage
    price
    subtotalRegularPrice
    discountType
    discountValue
    courses {
      id
      featuredImage
      duration
      description
      price
      title
      visibility
      instructors {
        id
        fullName
        email
        userName
        isActive
      }
    }
    createdAt
    updatedAt
  }
}
    `;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    description
    coursesCount
    createdAt
    updatedAt
  }
}
    `;
export const GetCategoryDocument = gql`
    query GetCategory($getCategoryId: ID) {
  getCategory(id: $getCategoryId) {
    id
    name
    description
    coursesCount
    createdAt
    updatedAt
  }
}
    `;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: CreateLevelOrCategoryInput!) {
  createCategory(input: $input) {
    id
    name
    description
    coursesCount
    createdAt
    updatedAt
  }
}
    `;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($updateCategoryId: ID!, $input: UpdateLevelOrCategoryInput!) {
  updateCategory(id: $updateCategoryId, input: $input) {
    id
    name
    description
    coursesCount
    createdAt
    updatedAt
  }
}
    `;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: ID!) {
  deleteCategory(id: $deleteCategoryId)
}
    `;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($input: CreateCompanyInput) {
  createCompany(input: $input) {
    id
    name
    email
    address
    taxId
    taxName
    isActive
    createdAt
    updatedAt
  }
}
    `;
export const UpdateCompanyDocument = gql`
    mutation UpdateCompany($companyId: ID!, $input: UpdateCompanyInput) {
  updateCompany(companyId: $companyId, input: $input) {
    id
    name
    email
    address
    taxId
    taxName
    isActive
    createdAt
    updatedAt
  }
}
    `;
export const CompaniesDocument = gql`
    query Companies {
  companies {
    id
    name
    email
    address
    taxId
    taxName
    isActive
    createdAt
    updatedAt
  }
}
    `;
export const CompanyDocument = gql`
    query Company($companyId: ID!) {
  company(id: $companyId) {
    id
    name
    email
    address
    taxId
    taxName
    isActive
    createdAt
    updatedAt
  }
}
    `;
export const DeleteCompanyDocument = gql`
    mutation DeleteCompany($companyId: ID!) {
  deleteCompany(companyId: $companyId)
}
    `;
export const CompanyAdminsDocument = gql`
    query CompanyAdmins($companyId: ID!) {
  companyAdmins(companyId: $companyId) {
    id
    fullName
    userName
    email
    isVerified
    isActive
    createdAt
  }
}
    `;
export const CompanyUsersDocument = gql`
    query CompanyUsers($companyId: ID!) {
  companyUsers(companyId: $companyId) {
    id
    fullName
    userName
    email
    isVerified
    isActive
    createdAt
  }
}
    `;
export const BusinessDashboardPeopleDocument = gql`
    query BusinessDashboardPeople($companyId: ID!) {
  companyAdmins(companyId: $companyId) {
    ...UserBasicInfo
  }
  companyUsers(companyId: $companyId) {
    ...UserBasicInfo
  }
}
    ${UserBasicInfoFragmentDoc}`;
export const CompanyAdminInvitesDocument = gql`
    query CompanyAdminInvites($companyId: ID!) {
  companyAdminInvites(companyId: $companyId) {
    id
    email
    companyId
    type
    createdAt
    expiresAt
    status
  }
}
    `;
export const InviteAdminsDocument = gql`
    mutation InviteAdmins($input: InviteAdminsInput!) {
  inviteAdmins(input: $input) {
    companyId
    invited
    skipped
    errors
    invites {
      id
      email
      companyId
      type
      createdAt
      expiresAt
      status
    }
  }
}
    `;
export const ResendAdminInviteDocument = gql`
    mutation ResendAdminInvite($inviteId: ID!) {
  resendAdminInvite(inviteId: $inviteId) {
    __typename
    ... on AdminInvite {
      id
      email
      companyId
      type
      createdAt
      expiresAt
      status
    }
    ... on InviteExpiredAndRenewed {
      oldInviteId
      newInvite {
        id
        email
        companyId
        type
        createdAt
        expiresAt
        status
      }
    }
    ... on InviteNotFoundError {
      message
    }
    ... on InviteNotActiveError {
      message
    }
  }
}
    `;
export const CompanyCoursesDocument = gql`
    query CompanyCourses($companyId: ID!, $filter: CompanyCoursesFilter) {
  companyCourses(companyId: $companyId, filter: $filter) {
    id
    title
    shortDescription
    featuredImage
    status
    visibility
    category {
      id
      name
    }
    updatedAt
    createdAt
  }
}
    `;
export const CompanyCourseProgressSummaryDocument = gql`
    query CompanyCourseProgressSummary($companyId: ID!, $filter: CompanyCourseProgressFilter) {
  companyCourseProgressSummary(companyId: $companyId, filter: $filter) {
    course {
      id
      title
      featuredImage
      category {
        id
        name
      }
    }
    enrolledCount
    startedCount
    completedCount
    avgProgressPercentage
  }
}
    `;
export const CompanyCourseProgressDocument = gql`
    query CompanyCourseProgress($companyId: ID!, $filter: CompanyCourseProgressFilter) {
  companyCourseProgress(companyId: $companyId, filter: $filter) {
    user {
      id
      fullName
      email
      profilePicture
    }
    course {
      id
      title
      featuredImage
      category {
        id
        name
      }
    }
    progress {
      id
      completedLessons
      completedQuizzes
      totalLessons
      totalQuizzes
      progressPercentage
      startedAt
      completed
      completedAt
      averageScore
      updatedAt
    }
  }
}
    `;
export const TeamDashboardDocument = gql`
    query TeamDashboard($companyId: ID!, $filter: TeamMembersFilter) {
  companyTeamStats(companyId: $companyId) {
    totalMembers
    activeMembers
    coursesInProgress
    coursesCompleted
    certificatesEarned
    avgProgressPercentage
  }
  companyTeamMembers(companyId: $companyId, filter: $filter) {
    total
    members {
      id
      fullName
      email
      role
      occupation
      profilePicture
      isActive
      coursesInProgress
      coursesCompleted
      certificatesEarned
      avgProgress
      lastActivityAt
    }
  }
}
    `;
export const InstructorCoursesDocument = gql`
    query InstructorCourses($search: String, $sortBy: String, $sortOrder: String, $page: Int, $limit: Int) {
  instructorCourses(
    search: $search
    sortBy: $sortBy
    sortOrder: $sortOrder
    page: $page
    limit: $limit
  ) {
    totalCount
    pageInfo {
      page
      limit
      offset
      hasNextPage
    }
    course {
      id
      title
      description
      shortDescription
      pricingType
      video {
        id
        videoURL
        source
        tags
        description
        duration
      }
      tags
      featuredImage
      price
      discountedPrice
      promotionDuration
      level {
        id
        name
        description
      }
      duration
      requirements
      status
      category {
        id
        description
        name
      }
      creatorID
      creator {
        fullName
        userName
        email
        role
      }
      instructors {
        fullName
        userName
        email
        role
        profilePicture
        phoneNumber
        id
      }
      topics {
        id
        course {
          id
        }
        title
        description
      }
      createdAt
      updatedAt
      visibility
      maxEnrollments
      extraSettings {
        key
        value
      }
      scheduledPublishAt
      publishedAt
      metadata {
        id
        learnings
        benefits
        targetAudience
        materialsIncluded
        requirements
      }
      instructors {
        isActive
        fullName
        email
      }
      enrollments {
        id
        status
        user {
          id
          fullName
          email
          profilePicture
          major
          occupation
          isActive
          userName
          stripeId
        }
        enrolledAt
      }
      certificates {
        id
        issuedAt
        template {
          id
          name
          content
          logoUrl
          background
        }
        user {
          id
          fullName
          email
          isActive
          profilePicture
          phoneNumber
        }
        course {
          id
          title
        }
      }
    }
  }
}
    `;
export const CreateInitialCourseDocument = gql`
    mutation CreateInitialCourse($input: CreateInitialCourseInput!) {
  createInitialCourse(input: $input) {
    id
    title
    description
    pricingType
    instructors {
      id
      fullName
      email
    }
    featuredImage
    price
    discountedPrice
    promotionDuration
    level {
      id
      name
      description
    }
    duration
    requirements
    status
    category {
      id
      name
      description
    }
    creatorID
    creator {
      id
      fullName
      email
    }
    createdAt
    updatedAt
  }
}
    `;
export const CourseDocument = gql`
    query Course($courseId: ID!) {
  course(id: $courseId) {
    id
    title
    shortDescription
    description
    duration
    pricingType
    video {
      id
      videoURL
      source
      tags
      description
      duration
    }
    tags
    featuredImage
    price
    discountedPrice
    promotionDuration
    level {
      id
      name
      description
    }
    requirements
    status
    category {
      id
      description
      name
    }
    creatorID
    creator {
      id
      fullName
      userName
      email
      role
    }
    instructors {
      id
      fullName
      userName
      email
      phoneNumber
      isActive
    }
    topics {
      id
      course {
        id
        title
      }
      title
      description
      position
      lessons {
        id
        title
        position
        featuredImage
        content
        attachments
        video {
          id
          source
          videoURL
          type
          tags
          width
          height
          format
          duration
          description
        }
        progress {
          id
          completed
          completedAt
          startedAt
        }
      }
      quizzes {
        id
        title
        content
        timer
        timeUnit
        passingGrade
        position
        maxAttempts
        questions {
          id
          mark
          order
          title
          type
          settings {
            questionMark
            questionType
            answerRequired
            showQuestionMark
            randomizeQuestion
            sortableItems
            correctAnswers
            matrixMatches {
              columnA
              columnB
            }
          }
          description
          answerExplanation
        }
        progress {
          id
          completed
          score
          startedAt
          completedAt
        }
      }
      createdAt
      updatedAt
    }
    maxEnrollments
    visibility
    extraSettings {
      key
      value
    }
    metadata {
      id
      learnings
      benefits
      targetAudience
      materialsIncluded
      requirements
    }
    createdAt
    updatedAt
    scheduledPublishAt
  }
}
    `;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($input: UpdateCourseInput, $updateCourseId: ID!) {
  updateCourse(input: $input, id: $updateCourseId) {
    id
    title
    description
    shortDescription
    pricingType
    instructors {
      fullName
      email
    }
    video {
      videoURL
      source
      type
      id
      description
      format
      tags
      height
      width
      duration
    }
    tags
    featuredImage
    price
    discountedPrice
    promotionDuration
    level {
      id
      name
      description
    }
    duration
    requirements
    status
    category {
      id
      name
      description
    }
    creatorID
    creator {
      id
      fullName
      email
    }
    createdAt
    updatedAt
    extraSettings {
      key
      value
    }
    maxEnrollments
    scheduledPublishAt
    publishedAt
    visibility
    metadata {
      id
      learnings
      benefits
      targetAudience
      materialsIncluded
      requirements
    }
    enrollments {
      id
      status
      enrolledAt
      user {
        id
        fullName
        email
        isActive
        major
        occupation
        profilePicture
        stripeId
      }
    }
  }
}
    `;
export const CourseIntroVideoDocument = gql`
    query CourseIntroVideo($courseId: ID!) {
  courseIntroVideo(courseId: $courseId) {
    videoURL
    source
    type
    duration
    description
    tags
    width
    height
    format
  }
}
    `;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($courseId: ID!) {
  deleteCourse(id: $courseId)
}
    `;
export const GetEnrollmentsDocument = gql`
    query GetEnrollments {
  getEnrollments {
    id
    user {
      id
      fullName
      email
      isActive
      profilePicture
      occupation
      phoneNumber
    }
    course {
      id
      title
      description
      status
      price
    }
    enrolledAt
    status
  }
}
    `;
export const GetEnrollmentByIdDocument = gql`
    query GetEnrollmentById($enrollmentId: ID!) {
  getEnrollmentById(enrollmentId: $enrollmentId) {
    id
    user {
      id
      fullName
      email
      isActive
      profilePicture
      occupation
      phoneNumber
    }
    course {
      id
      title
      description
      status
      price
    }
    enrolledAt
    status
  }
}
    `;
export const CreateEnrollmentDocument = gql`
    mutation CreateEnrollment($userId: ID!, $courseId: ID!) {
  createEnrollment(userId: $userId, courseId: $courseId) {
    id
    user {
      id
      fullName
      email
      isActive
      profilePicture
      occupation
      phoneNumber
    }
    course {
      id
      title
      description
      status
      price
    }
    enrolledAt
    status
  }
}
    `;
export const GetUserEnrollmentsDocument = gql`
    query GetUserEnrollments {
  getUserEnrollments {
    id
    course {
      id
      title
      description
      shortDescription
      metadata {
        id
        learnings
        benefits
        targetAudience
        materialsIncluded
        requirements
      }
      video {
        id
        videoURL
        source
        type
        duration
        description
        tags
        width
        height
        format
        createdAt
        updatedAt
      }
      tags
      featuredImage
      price
      discountedPrice
      promotionDuration
      level {
        id
        name
        description
        createdAt
        updatedAt
      }
      duration
      requirements
      status
      creatorID
      topics {
        id
        title
        description
        position
        lessons {
          id
          title
          video {
            id
            videoURL
            source
            type
            duration
            description
            tags
            width
            height
            format
            createdAt
            updatedAt
          }
          showPreview
          featuredImage
          content
          createdAt
          attachments
          position
          updatedAt
          progress {
            id
            completed
            completedAt
            startedAt
          }
        }
        quizzes {
          id
          title
          position
          progress {
            id
            completed
            score
            startedAt
            completedAt
          }
        }
      }
      progress {
        id
        completedLessons
        completedQuizzes
        totalLessons
        totalQuizzes
        totalAssignments
        progressPercentage
        startedAt
        completed
        completedAt
        averageCompletionTime
        averageScore
        createdAt
        updatedAt
      }
      reviews {
        id
        comment
        rating
        likes
        createdAt
        updatedAt
      }
      certificates {
        id
        issuedAt
        template {
          name
          logoUrl
          id
          content
          background
        }
      }
      maxEnrollments
      extraSettings {
        key
        value
      }
      visibility
      scheduledPublishAt
      publishedAt
      createdAt
      updatedAt
      instructors {
        id
        fullName
        email
        isActive
        userName
      }
    }
    enrolledAt
    status
  }
}
    `;
export const AssignInstructorDocument = gql`
    mutation AssignInstructor($userId: ID!, $courseId: ID!) {
  assignInstructor(userId: $userId, courseId: $courseId) {
    id
    assignedAt
    user {
      id
      fullName
      email
    }
    courses {
      id
      title
      description
    }
  }
}
    `;
export const UnassignInstructorDocument = gql`
    mutation UnassignInstructor($userId: ID!, $courseId: ID!) {
  unassignInstructor(userId: $userId, courseId: $courseId)
}
    `;
export const CreateLessonDocument = gql`
    mutation CreateLesson($input: CreateLessonInput!) {
  createLesson(input: $input) {
    id
    topic {
      id
      title
      description
    }
    title
    content
    position
    createdAt
    updatedAt
    featuredImage
    attachments
    video {
      id
      videoURL
      source
      type
      duration
      description
      tags
      width
      height
      format
      createdAt
      updatedAt
    }
  }
}
    `;
export const UpdateLessonDocument = gql`
    mutation UpdateLesson($lessonId: ID!, $input: UpdateLessonInput!) {
  updateLesson(id: $lessonId, input: $input) {
    id
    title
    content
    position
    createdAt
    updatedAt
    featuredImage
    attachments
    video {
      id
      videoURL
      source
      type
      duration
      description
      tags
      width
      height
      format
      createdAt
      updatedAt
    }
    showPreview
  }
}
    `;
export const DeleteLessonDocument = gql`
    mutation DeleteLesson($lessonId: ID!) {
  deleteLesson(id: $lessonId)
}
    `;
export const LessonDocument = gql`
    query Lesson($lessonId: ID!) {
  lesson(id: $lessonId) {
    id
    topic {
      id
    }
    title
    content
    position
    createdAt
    updatedAt
    featuredImage
    attachments
    video {
      id
      description
      videoURL
      source
      tags
      type
    }
  }
}
    `;
export const LessonsByTopicIdDocument = gql`
    query LessonsByTopicId($topicId: ID!) {
  lessonsByTopicId(topicId: $topicId) {
    id
    topic {
      id
      title
      description
      position
    }
    title
    content
    position
    createdAt
    updatedAt
    featuredImage
    attachments
    showPreview
    video {
      id
      videoURL
      source
      type
      duration
      description
      tags
      width
      height
      format
      createdAt
      updatedAt
    }
  }
}
    `;
export const GetLevelsDocument = gql`
    query GetLevels {
  getLevels {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;
export const GetLevelDocument = gql`
    query GetLevel($getLevelId: ID) {
  getLevel(id: $getLevelId) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;
export const CreateLevelDocument = gql`
    mutation CreateLevel($input: CreateLevelOrCategoryInput!) {
  createLevel(input: $input) {
    id
    name
    description
    createdAt
    updatedAt
  }
}
    `;
export const UpdateLevelDocument = gql`
    mutation UpdateLevel($updateLevelId: ID!, $input: UpdateLevelOrCategoryInput!) {
  updateLevel(id: $updateLevelId, input: $input) {
    id
    name
    description
    updatedAt
    createdAt
  }
}
    `;
export const DeleteLevelDocument = gql`
    mutation DeleteLevel($deleteLevelId: ID!) {
  deleteLevel(id: $deleteLevelId)
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    customerId
    fullName
    userName
    email
    role
    authProvider
    socialId
    phoneNumber
    isVerified
    profilePicture
    interests
    major
    occupation
    isActive
    stripeId
    updatedAt
    createdAt
    carts {
      id
      subtotal
      tax
      total
      updatedAt
      expiresAt
      createdAt
      items {
        id
        inStock
        cartId
        itemId
        itemType
        notes
        quantity
        unitPrice
        item {
          ... on Course {
            id
            featuredImage
            duration
            discountedPrice
            description
            category {
              id
              name
              description
            }
            level {
              id
              name
              description
            }
            price
            requirements
            status
            title
            tags
            video {
              id
              videoURL
              source
              type
              duration
              description
              tags
              width
              height
              format
              createdAt
              updatedAt
            }
          }
          ... on CourseBundle {
            id
            price
            title
            subtotalRegularPrice
            updatedAt
            featuredImage
            discountValue
            discountType
            description
            createdAt
            courses {
              id
              title
              price
              description
            }
          }
          ... on SubscriptionPlan {
            id
            planName
            planDescription
            price
            duration
            createdAt
            updatedAt
          }
        }
      }
    }
    subscription {
      id
      user {
        id
        fullName
        email
      }
      plan {
        id
        planName
        planDescription
        price
        duration
        createdAt
        updatedAt
      }
      startDate
      endDate
    }
    courses {
      id
      title
      description
      instructors {
        id
        fullName
        email
      }
      metadata {
        id
        learnings
        benefits
        targetAudience
        materialsIncluded
        requirements
      }
      video {
        id
        videoURL
        source
        type
        duration
        description
        tags
        width
        height
        format
        createdAt
        updatedAt
      }
      tags
      featuredImage
      price
      discountedPrice
      promotionDuration
      level {
        id
        name
        description
        createdAt
        updatedAt
      }
      duration
      requirements
      status
      category {
        id
        name
        description
        createdAt
        updatedAt
      }
      creatorID
      creator {
        id
        fullName
        email
      }
      progress {
        id
        updatedAt
        totalQuizzes
        totalLessons
        totalAssignments
        startedAt
        progressPercentage
        createdAt
        completedQuizzes
        completedLessons
        completedAt
        completed
        averageScore
        averageCompletionTime
      }
      topics {
        id
        course {
          id
          title
        }
        title
        description
        position
        lessons {
          id
          title
          position
          featuredImage
          content
          attachments
          video {
            id
            source
            videoURL
            type
            tags
            width
            height
            format
            duration
            description
          }
          progress {
            id
            completed
            completedAt
            startedAt
          }
        }
        quizzes {
          id
          title
          content
          timer
          timeUnit
          passingGrade
          position
          maxAttempts
          questions {
            id
            media
            mark
            order
            title
            type
            settings {
              questionMark
              questionType
              answerRequired
              showQuestionMark
              randomizeQuestion
              sortableItems
              correctAnswers
              matrixMatches {
                columnA
                columnB
              }
            }
            description
            answerExplanation
          }
          progress {
            id
            completed
            score
            startedAt
            completedAt
          }
        }
        createdAt
        updatedAt
      }
      certificates {
        id
        issuedAt
        template {
          id
          name
          logoUrl
          content
          background
        }
      }
      createdAt
      updatedAt
      reviews {
        id
        comment
        rating
        course {
          id
          title
        }
        likes
        createdAt
        updatedAt
      }
    }
    bundles {
      id
      title
      description
      featuredImage
      price
      subtotalRegularPrice
      discountType
      discountValue
      courses {
        id
        title
        description
        instructors {
          id
          fullName
          email
        }
        metadata {
          id
          learnings
          benefits
          targetAudience
          materialsIncluded
          requirements
        }
        video {
          id
          videoURL
          source
          type
          duration
          description
          tags
          width
          height
          format
          createdAt
          updatedAt
        }
        tags
        featuredImage
        price
        discountedPrice
        promotionDuration
        level {
          id
          name
          description
          createdAt
          updatedAt
        }
        duration
        requirements
        status
        category {
          id
          name
          description
          createdAt
          updatedAt
        }
        creatorID
        creator {
          id
          fullName
          email
        }
        progress {
          id
          updatedAt
          totalQuizzes
          totalLessons
          totalAssignments
          startedAt
          progressPercentage
          createdAt
          completedQuizzes
          completedLessons
          completedAt
          completed
          averageScore
          averageCompletionTime
        }
        reviews {
          id
          comment
          rating
          course {
            id
            title
          }
          likes
          createdAt
          updatedAt
        }
        topics {
          id
          title
          position
          description
          lessons {
            id
            title
            position
            featuredImage
            content
            attachments
            video {
              id
              source
              videoURL
              type
              tags
              width
              height
              format
              duration
              description
            }
            progress {
              id
              completed
              completedAt
              startedAt
            }
          }
          quizzes {
            id
            title
            content
            timer
            timeUnit
            passingGrade
            position
            maxAttempts
            questions {
              id
              mark
              order
              title
              type
              settings {
                questionMark
                questionType
                answerRequired
                showQuestionMark
                randomizeQuestion
                sortableItems
                correctAnswers
                matrixMatches {
                  columnA
                  columnB
                }
              }
              description
              answerExplanation
            }
            progress {
              id
              completed
              score
              startedAt
              completedAt
            }
          }
        }
        certificates {
          id
          issuedAt
          template {
            id
            name
            logoUrl
            content
            background
          }
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    company {
      id
      email
      name
      isActive
      taxId
      taxName
      stripeId
      setupIntentClientSecret
      address
    }
  }
}
    `;
export const MarkLessonCompletedDocument = gql`
    mutation MarkLessonCompleted($input: MarkLessonCompletedInput!) {
  markLessonCompleted(input: $input) {
    id
    completed
    startedAt
    completedAt
    updatedAt
    user {
      id
      fullName
      email
    }
    lesson {
      id
      title
    }
  }
}
    `;
export const SubmitQuizAttemptDocument = gql`
    mutation SubmitQuizAttempt($input: SubmitQuizAttemptInput!) {
  submitQuizAttempt(input: $input) {
    id
    score
    completed
    startedAt
    completedAt
    user {
      id
      fullName
      email
    }
    quiz {
      id
      title
    }
  }
}
    `;
export const GetCourseProgressDocument = gql`
    query GetCourseProgress($userId: ID!, $courseId: ID!) {
  getCourseProgress(userId: $userId, courseId: $courseId) {
    id
    completedLessons
    completedQuizzes
    totalLessons
    totalQuizzes
    totalAssignments
    progressPercentage
    startedAt
    completed
    completedAt
    averageCompletionTime
    averageScore
    createdAt
    updatedAt
    user {
      id
      fullName
      email
    }
    course {
      id
      title
    }
  }
}
    `;
export const StartCourseProgressDocument = gql`
    mutation StartCourseProgress($input: StartCourseProgressInput!) {
  startCourseProgress(input: $input) {
    id
    user {
      id
      fullName
      email
      userName
    }
    course {
      id
      title
      category {
        id
        name
      }
      level {
        id
        name
      }
    }
    completedLessons
    completedQuizzes
    totalLessons
    totalQuizzes
    totalAssignments
    progressPercentage
    startedAt
    completed
    completedAt
    averageCompletionTime
    averageScore
    createdAt
    updatedAt
  }
}
    `;
export const UpdateQuizProgressDocument = gql`
    mutation UpdateQuizProgress($input: QuizProgressInput!) {
  updateQuizProgress(input: $input) {
    id
    user {
      id
      fullName
      email
      isActive
      userName
      profilePicture
      phoneNumber
      occupation
    }
    quiz {
      id
      title
      timer
      timeUnit
      position
      passingGrade
      maxAttempts
      content
      createdAt
      updatedAt
    }
    score
    completed
    startedAt
    completedAt
  }
}
    `;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
    title
    media
    description
    type
    mark
    settings {
      questionMark
      questionType
      answerRequired
      showQuestionMark
      randomizeQuestion
      sortableItems
      correctAnswers
      matrixMatches {
        columnA
        columnB
      }
    }
    order
    answerExplanation
    answers {
      id
      type
      title
      isCorrect
      image
      gapMatch
      viewFormat
      settings
      order
      correctAnswers
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($questionId: ID!, $input: UpdateQuestionInput!) {
  updateQuestion(id: $questionId, input: $input) {
    id
    title
    type
    media
    description
    order
    mark
    answerExplanation
    settings {
      questionMark
      questionType
      answerRequired
      showQuestionMark
      randomizeQuestion
      sortableItems
      correctAnswers
      matrixMatches {
        columnA
        columnB
      }
    }
    answers {
      id
      type
      title
      isCorrect
      image
      gapMatch
      viewFormat
      settings
      order
      correctAnswers
      createdAt
      updatedAt
    }
    updatedAt
    createdAt
  }
}
    `;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($questionId: ID!) {
  deleteQuestion(id: $questionId)
}
    `;
export const CreateQuizDocument = gql`
    mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
    id
    topic {
      id
      description
      title
    }
    title
    content
    timer
    timeUnit
    position
    maxAttempts
    passingGrade
    createdAt
    updatedAt
  }
}
    `;
export const UpdateQuizDocument = gql`
    mutation UpdateQuiz($updateQuizId: ID!, $input: UpdateQuizInput) {
  updateQuiz(id: $updateQuizId, input: $input) {
    id
    topic {
      id
    }
    title
    content
    timer
    timeUnit
    position
    maxAttempts
    passingGrade
    createdAt
    updatedAt
  }
}
    `;
export const QuizDocument = gql`
    query Quiz($quizId: ID!) {
  quiz(id: $quizId) {
    id
    topic {
      id
      title
      description
      position
    }
    title
    content
    timer
    timeUnit
    position
    maxAttempts
    passingGrade
    createdAt
    updatedAt
    questions {
      id
      title
      description
      type
      order
      answers {
        id
        title
        type
        order
        isCorrect
        image
        gapMatch
        viewFormat
        settings
        correctAnswers
      }
      settings {
        questionMark
        questionType
        answerRequired
        showQuestionMark
        randomizeQuestion
        sortableItems
        correctAnswers
        matrixMatches {
          columnA
          columnB
        }
      }
      answerExplanation
    }
    progress {
      id
      score
      quiz {
        id
      }
      completed
      user {
        id
        fullName
        email
        profilePicture
        occupation
        isActive
      }
    }
  }
}
    `;
export const QuizzesByTopicIdDocument = gql`
    query QuizzesByTopicId($topicId: ID!) {
  quizzesByTopicId(topicId: $topicId) {
    id
    topic {
      id
      title
      description
      position
    }
    title
    content
    timer
    timeUnit
    position
    maxAttempts
    passingGrade
    createdAt
    updatedAt
    questions {
      id
      title
      media
      description
      type
      order
      mark
      answers {
        id
        title
        type
        order
        isCorrect
        image
        gapMatch
        viewFormat
        settings
        correctAnswers
      }
      settings {
        questionMark
        questionType
        answerRequired
        showQuestionMark
        randomizeQuestion
        sortableItems
        correctAnswers
        matrixMatches {
          columnA
          columnB
        }
      }
      answerExplanation
      updatedAt
      createdAt
    }
    progress {
      id
      score
      quiz {
        id
      }
      completed
      user {
        id
        fullName
        email
        profilePicture
        occupation
        isActive
      }
    }
  }
}
    `;
export const DeleteQuizDocument = gql`
    mutation DeleteQuiz($deleteQuizId: ID!) {
  deleteQuiz(id: $deleteQuizId)
}
    `;
export const CreateSubscriptionPlanDocument = gql`
    mutation CreateSubscriptionPlan($input: CreateSubscriptionPlanInput!) {
  createSubscriptionPlan(input: $input) {
    id
    planName
    planDescription
    price
    duration
    category {
      name
      id
      description
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const UpdateSubscriptionPlanDocument = gql`
    mutation UpdateSubscriptionPlan($input: UpdateSubscriptionPlanInput!) {
  updateSubscriptionPlan(input: $input) {
    id
    planName
    planDescription
    price
    duration
    category {
      id
      name
      description
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export const DeleteSubscriptionPlanDocument = gql`
    mutation DeleteSubscriptionPlan($id: ID!) {
  deleteSubscriptionPlan(id: $id)
}
    `;
export const SubscriptionPlansDocument = gql`
    query SubscriptionPlans {
  subscriptionPlans {
    id
    planName
    planDescription
    stripePricePlanID
    price
    duration
    category {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export const CompanySubscriptionsDocument = gql`
    query CompanySubscriptions($companyId: ID!) {
  companySubscriptions(companyId: $companyId) {
    id
    quantity
    status
    stripeSubscriptionId
    createdAt
    updatedAt
    plan {
      id
      planName
      duration
      price
    }
    company {
      id
      name
      email
    }
  }
}
    `;
export const SubscriptionReportDocument = gql`
    query SubscriptionReport($companyId: ID!, $companySubscriptionId: String!) {
  subscriptionReport(
    companyId: $companyId
    companySubscriptionId: $companySubscriptionId
  ) {
    companySubscriptionId
    totalSubscriptions
    redeemedSubscriptions
    unredeemedSubscriptions
    activeSubscriptions
  }
}
    `;
export const CompanyInvitesDocument = gql`
    query CompanyInvites($companySubscriptionId: ID!) {
  companyInvites(companySubscriptionId: $companySubscriptionId) {
    id
    email
    type
    codeId
    companyId
    companySubscriptionId
    createdAt
    expiresAt
    status
    redeemedByUserId
  }
}
    `;
export const RequestSubscriptionCodesDocument = gql`
    mutation RequestSubscriptionCodes($planId: ID!, $companyId: ID!, $quantity: Int!) {
  requestSubscriptionCodes(
    planId: $planId
    companyId: $companyId
    quantity: $quantity
  ) {
    id
    status
    quantity
    createdAt
    plan {
      id
      planName
      price
      duration
    }
    company {
      id
      name
      email
    }
  }
}
    `;
export const InviteEmployeesDocument = gql`
    mutation InviteEmployees($input: InviteEmployeesInput!) {
  inviteEmployees(input: $input) {
    companySubscriptionId
    invited
    skipped
    errors
    invites {
      email
      codeId
      status
    }
  }
}
    `;
export const ResendInviteDocument = gql`
    mutation ResendInvite($companySubscriptionId: ID!, $email: String!) {
  resendInvite(companySubscriptionId: $companySubscriptionId, email: $email)
}
    `;
export const PayCompanySubscriptionDocument = gql`
    mutation PayCompanySubscription($companySubscriptionId: ID!, $paymentMethodId: String) {
  payCompanySubscription(
    companySubscriptionId: $companySubscriptionId
    paymentMethodId: $paymentMethodId
  ) {
    __typename
    ... on CompanySubscription {
      id
      status
      stripeSubscriptionId
      updatedAt
    }
    ... on SetupIntentRequired {
      clientSecret
    }
  }
}
    `;
export const ActivateCompanySubscriptionDocument = gql`
    mutation ActivateCompanySubscription($token: String!) {
  activateCompanySubscription(token: $token) {
    id
    user {
      id
      fullName
      email
    }
    plan {
      id
      planName
    }
    company {
      id
      name
    }
    companySubscription {
      id
      status
    }
    stripeSubscriptionId
    startDate
    endDate
    isActive
  }
}
    `;
export const CreateTopicDocument = gql`
    mutation CreateTopic($input: CreateTopicInput!) {
  createTopic(input: $input) {
    id
    position
    title
    description
    createdAt
    updatedAt
  }
}
    `;
export const TopicDocument = gql`
    query Topic($topicId: ID!) {
  topic(id: $topicId) {
    id
    course {
      id
      title
    }
    title
    description
    position
    lessons {
      id
      title
      position
      featuredImage
      content
      attachments
      video {
        id
        source
        videoURL
        type
        tags
        width
        height
        format
        duration
        description
      }
    }
    quizzes {
      id
      title
      content
      timer
      timeUnit
      passingGrade
      position
      maxAttempts
      questions {
        id
        mark
        order
        title
        type
        settings {
          questionMark
          questionType
          answerRequired
          showQuestionMark
          randomizeQuestion
          sortableItems
          correctAnswers
          matrixMatches {
            columnA
            columnB
          }
        }
        description
        answerExplanation
      }
    }
    createdAt
    updatedAt
  }
}
    `;
export const TopicsByCourseDocument = gql`
    query TopicsByCourse($courseId: ID!) {
  topicsByCourseId(courseId: $courseId) {
    id
    course {
      id
      title
    }
    title
    description
    position
    lessons {
      id
      title
      content
      position
      createdAt
      updatedAt
      featuredImage
      attachments
      showPreview
      video {
        id
        videoURL
        source
        type
        duration
        description
        tags
        width
        height
        format
        createdAt
        updatedAt
      }
      progress {
        id
        completed
        startedAt
        completedAt
        createdAt
        updatedAt
      }
    }
    quizzes {
      id
      title
      content
      timer
      timeUnit
      passingGrade
      position
      maxAttempts
      progress {
        id
        score
        completed
        startedAt
        completedAt
      }
      questions {
        id
        title
        description
        media
        type
        mark
        settings {
          questionMark
          questionType
          answerRequired
          showQuestionMark
          randomizeQuestion
          sortableItems
          correctAnswers
          matrixMatches {
            columnA
            columnB
          }
        }
        order
        answerExplanation
        answers {
          id
          type
          title
          isCorrect
          image
          gapMatch
          viewFormat
          settings
          order
          correctAnswers
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
    createdAt
    updatedAt
  }
}
    `;
export const TopicsDocument = gql`
    query Topics {
  topics {
    id
    course {
      id
      title
    }
    title
    description
    position
    lessons {
      id
      title
      position
      featuredImage
      content
      attachments
      video {
        id
        source
        videoURL
        type
        tags
        width
        height
        format
        duration
        description
      }
    }
    quizzes {
      id
      title
      content
      timer
      timeUnit
      passingGrade
      position
      maxAttempts
      questions {
        id
        mark
        order
        title
        type
        settings {
          questionMark
          questionType
          answerRequired
          showQuestionMark
          randomizeQuestion
          sortableItems
          correctAnswers
          matrixMatches {
            columnA
            columnB
          }
        }
        description
        answerExplanation
      }
    }
    createdAt
    updatedAt
  }
}
    `;
export const UpdateTopicDocument = gql`
    mutation UpdateTopic($topicId: ID!, $input: UpdateTopicInput) {
  updateTopic(id: $topicId, input: $input) {
    id
    description
    title
    position
    updatedAt
  }
}
    `;
export const DeleteTopicDocument = gql`
    mutation DeleteTopic($topicId: ID!) {
  deleteTopic(id: $topicId)
}
    `;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    fullName
    userName
    email
    role
    authProvider
    socialId
    phoneNumber
    isVerified
    profilePicture
    isActive
    stripeId
    occupation
    major
    interests
    createdAt
    updatedAt
  }
}
    `;
export const InternalUsersDocument = gql`
    query InternalUsers {
  internalUsers {
    id
    fullName
    userName
    email
    role
    authProvider
    socialId
    phoneNumber
    isVerified
    profilePicture
    isActive
    stripeId
    occupation
    major
    interests
    createdAt
    updatedAt
  }
}
    `;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
  updateUserProfile(input: $input) {
    id
    fullName
    userName
    email
    phoneNumber
    profilePicture
    major
    occupation
    interests
  }
}
    `;
export const UpdateUserPasswordDocument = gql`
    mutation UpdateUserPassword($input: UpdateUserPasswordInput!) {
  updateUserPassword(input: $input)
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input)
}
    `;
export const GetProfileDocument = gql`
    query GetProfile {
  getProfile {
    customerId
    fullName
    userName
    email
    role
    authProvider
    socialId
    phoneNumber
    isVerified
    profilePicture
    interests
    major
    occupation
    isActive
    stripeId
    updatedAt
    createdAt
    carts {
      id
      subtotal
      tax
      total
      updatedAt
      expiresAt
      createdAt
      items {
        id
        inStock
        cartId
        itemId
        itemType
        notes
        quantity
        unitPrice
        item {
          ... on Course {
            id
            featuredImage
            duration
            discountedPrice
            description
            category {
              id
              name
              description
            }
            level {
              id
              name
              description
            }
            price
            requirements
            status
            title
            tags
            video {
              id
              videoURL
              source
              type
              duration
              description
              tags
              width
              height
              format
              createdAt
              updatedAt
            }
          }
          ... on CourseBundle {
            id
            price
            title
            subtotalRegularPrice
            updatedAt
            featuredImage
            discountValue
            discountType
            description
            createdAt
            courses {
              id
              title
              price
              description
            }
          }
          ... on SubscriptionPlan {
            id
            planName
            planDescription
            price
            duration
            createdAt
            updatedAt
          }
        }
      }
    }
    subscription {
      id
      user {
        id
        fullName
        email
      }
      plan {
        id
        planName
        planDescription
        price
        duration
        createdAt
        updatedAt
      }
      startDate
      endDate
    }
    courses {
      id
      title
      description
      shortDescription
      instructors {
        id
        fullName
        email
      }
      metadata {
        id
        learnings
        benefits
        targetAudience
        materialsIncluded
        requirements
      }
      video {
        id
        videoURL
        source
        type
        duration
        description
        tags
        width
        height
        format
        createdAt
        updatedAt
      }
      tags
      featuredImage
      price
      discountedPrice
      promotionDuration
      level {
        id
        name
        description
        createdAt
        updatedAt
      }
      duration
      requirements
      status
      category {
        id
        name
        description
        createdAt
        updatedAt
      }
      creatorID
      creator {
        id
        fullName
        email
      }
      progress {
        id
        updatedAt
        totalQuizzes
        totalLessons
        totalAssignments
        startedAt
        progressPercentage
        createdAt
        completedQuizzes
        completedLessons
        completedAt
        completed
        averageScore
        averageCompletionTime
      }
      topics {
        id
        course {
          id
          title
        }
        title
        description
        position
        lessons {
          id
          title
          position
          featuredImage
          content
          attachments
          video {
            id
            source
            videoURL
            type
            tags
            width
            height
            format
            duration
            description
          }
          progress {
            id
            completed
            completedAt
            startedAt
          }
        }
        quizzes {
          id
          title
          content
          timer
          timeUnit
          passingGrade
          position
          maxAttempts
          questions {
            id
            media
            mark
            order
            title
            type
            settings {
              questionMark
              questionType
              answerRequired
              showQuestionMark
              randomizeQuestion
              sortableItems
              correctAnswers
              matrixMatches {
                columnA
                columnB
              }
            }
            description
            answerExplanation
          }
          progress {
            id
            completed
            score
            startedAt
            completedAt
          }
        }
        createdAt
        updatedAt
      }
      certificates {
        id
        issuedAt
        template {
          id
          name
          logoUrl
          content
          background
        }
      }
      createdAt
      updatedAt
      reviews {
        id
        comment
        rating
        course {
          id
          title
        }
        likes
        createdAt
        updatedAt
      }
    }
    bundles {
      id
      title
      description
      featuredImage
      price
      subtotalRegularPrice
      discountType
      discountValue
      courses {
        id
        title
        description
        instructors {
          id
          fullName
          email
        }
        metadata {
          id
          learnings
          benefits
          targetAudience
          materialsIncluded
          requirements
        }
        video {
          id
          videoURL
          source
          type
          duration
          description
          tags
          width
          height
          format
          createdAt
          updatedAt
        }
        tags
        featuredImage
        price
        discountedPrice
        promotionDuration
        level {
          id
          name
          description
          createdAt
          updatedAt
        }
        duration
        requirements
        status
        category {
          id
          name
          description
          createdAt
          updatedAt
        }
        creatorID
        creator {
          id
          fullName
          email
        }
        progress {
          id
          updatedAt
          totalQuizzes
          totalLessons
          totalAssignments
          startedAt
          progressPercentage
          createdAt
          completedQuizzes
          completedLessons
          completedAt
          completed
          averageScore
          averageCompletionTime
        }
        reviews {
          id
          comment
          rating
          course {
            id
            title
          }
          likes
          createdAt
          updatedAt
        }
        topics {
          id
          title
          position
          description
          lessons {
            id
            title
            position
            featuredImage
            content
            attachments
            video {
              id
              source
              videoURL
              type
              tags
              width
              height
              format
              duration
              description
            }
            progress {
              id
              completed
              completedAt
              startedAt
            }
          }
          quizzes {
            id
            title
            content
            timer
            timeUnit
            passingGrade
            position
            maxAttempts
            questions {
              id
              mark
              order
              title
              type
              settings {
                questionMark
                questionType
                answerRequired
                showQuestionMark
                randomizeQuestion
                sortableItems
                correctAnswers
                matrixMatches {
                  columnA
                  columnB
                }
              }
              description
              answerExplanation
            }
            progress {
              id
              completed
              score
              startedAt
              completedAt
            }
          }
        }
        certificates {
          id
          issuedAt
          template {
            id
            name
            logoUrl
            content
            background
          }
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    company {
      id
      email
      name
      isActive
      taxId
      taxName
      stripeId
      setupIntentClientSecret
      address
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Login(variables: Types.LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.LoginMutation>({ document: LoginDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Login', 'mutation', variables);
    },
    Logout(variables?: Types.LogoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.LogoutMutation>({ document: LogoutDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Logout', 'mutation', variables);
    },
    ChangePassword(variables: Types.ChangePasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.ChangePasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ChangePasswordMutation>({ document: ChangePasswordDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ChangePassword', 'mutation', variables);
    },
    ResetPassword(variables: Types.ResetPasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ResetPasswordMutation>({ document: ResetPasswordDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResetPassword', 'mutation', variables);
    },
    ValidateInviteToken(variables: Types.ValidateInviteTokenQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.ValidateInviteTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ValidateInviteTokenQuery>({ document: ValidateInviteTokenDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ValidateInviteToken', 'query', variables);
    },
    CheckUserExists(variables: Types.CheckUserExistsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CheckUserExistsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CheckUserExistsQuery>({ document: CheckUserExistsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CheckUserExists', 'query', variables);
    },
    CreateCourseBundle(variables: Types.CreateCourseBundleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateCourseBundleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateCourseBundleMutation>({ document: CreateCourseBundleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateCourseBundle', 'mutation', variables);
    },
    InstructorBundles(variables?: Types.InstructorBundlesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.InstructorBundlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.InstructorBundlesQuery>({ document: InstructorBundlesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InstructorBundles', 'query', variables);
    },
    Bundles(variables?: Types.BundlesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.BundlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.BundlesQuery>({ document: BundlesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Bundles', 'query', variables);
    },
    Bundle(variables: Types.BundleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.BundleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.BundleQuery>({ document: BundleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Bundle', 'query', variables);
    },
    GetCategories(variables?: Types.GetCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCategoriesQuery>({ document: GetCategoriesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetCategories', 'query', variables);
    },
    GetCategory(variables?: Types.GetCategoryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetCategoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCategoryQuery>({ document: GetCategoryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetCategory', 'query', variables);
    },
    CreateCategory(variables: Types.CreateCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateCategoryMutation>({ document: CreateCategoryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateCategory', 'mutation', variables);
    },
    UpdateCategory(variables: Types.UpdateCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateCategoryMutation>({ document: UpdateCategoryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateCategory', 'mutation', variables);
    },
    DeleteCategory(variables: Types.DeleteCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteCategoryMutation>({ document: DeleteCategoryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteCategory', 'mutation', variables);
    },
    CreateCompany(variables?: Types.CreateCompanyMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateCompanyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateCompanyMutation>({ document: CreateCompanyDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateCompany', 'mutation', variables);
    },
    UpdateCompany(variables: Types.UpdateCompanyMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateCompanyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateCompanyMutation>({ document: UpdateCompanyDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateCompany', 'mutation', variables);
    },
    Companies(variables?: Types.CompaniesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompaniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompaniesQuery>({ document: CompaniesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Companies', 'query', variables);
    },
    Company(variables: Types.CompanyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyQuery>({ document: CompanyDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Company', 'query', variables);
    },
    DeleteCompany(variables: Types.DeleteCompanyMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteCompanyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteCompanyMutation>({ document: DeleteCompanyDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteCompany', 'mutation', variables);
    },
    CompanyAdmins(variables: Types.CompanyAdminsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyAdminsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyAdminsQuery>({ document: CompanyAdminsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyAdmins', 'query', variables);
    },
    CompanyUsers(variables: Types.CompanyUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyUsersQuery>({ document: CompanyUsersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyUsers', 'query', variables);
    },
    BusinessDashboardPeople(variables: Types.BusinessDashboardPeopleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.BusinessDashboardPeopleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.BusinessDashboardPeopleQuery>({ document: BusinessDashboardPeopleDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'BusinessDashboardPeople', 'query', variables);
    },
    CompanyAdminInvites(variables: Types.CompanyAdminInvitesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyAdminInvitesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyAdminInvitesQuery>({ document: CompanyAdminInvitesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyAdminInvites', 'query', variables);
    },
    InviteAdmins(variables: Types.InviteAdminsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.InviteAdminsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.InviteAdminsMutation>({ document: InviteAdminsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InviteAdmins', 'mutation', variables);
    },
    ResendAdminInvite(variables: Types.ResendAdminInviteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.ResendAdminInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ResendAdminInviteMutation>({ document: ResendAdminInviteDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResendAdminInvite', 'mutation', variables);
    },
    CompanyCourses(variables: Types.CompanyCoursesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyCoursesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyCoursesQuery>({ document: CompanyCoursesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyCourses', 'query', variables);
    },
    CompanyCourseProgressSummary(variables: Types.CompanyCourseProgressSummaryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyCourseProgressSummaryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyCourseProgressSummaryQuery>({ document: CompanyCourseProgressSummaryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyCourseProgressSummary', 'query', variables);
    },
    CompanyCourseProgress(variables: Types.CompanyCourseProgressQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyCourseProgressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyCourseProgressQuery>({ document: CompanyCourseProgressDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyCourseProgress', 'query', variables);
    },
    TeamDashboard(variables: Types.TeamDashboardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.TeamDashboardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.TeamDashboardQuery>({ document: TeamDashboardDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'TeamDashboard', 'query', variables);
    },
    InstructorCourses(variables?: Types.InstructorCoursesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.InstructorCoursesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.InstructorCoursesQuery>({ document: InstructorCoursesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InstructorCourses', 'query', variables);
    },
    CreateInitialCourse(variables: Types.CreateInitialCourseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateInitialCourseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateInitialCourseMutation>({ document: CreateInitialCourseDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateInitialCourse', 'mutation', variables);
    },
    Course(variables: Types.CourseQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CourseQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CourseQuery>({ document: CourseDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Course', 'query', variables);
    },
    UpdateCourse(variables: Types.UpdateCourseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateCourseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateCourseMutation>({ document: UpdateCourseDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateCourse', 'mutation', variables);
    },
    CourseIntroVideo(variables: Types.CourseIntroVideoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CourseIntroVideoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CourseIntroVideoQuery>({ document: CourseIntroVideoDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CourseIntroVideo', 'query', variables);
    },
    DeleteCourse(variables: Types.DeleteCourseMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteCourseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteCourseMutation>({ document: DeleteCourseDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteCourse', 'mutation', variables);
    },
    GetEnrollments(variables?: Types.GetEnrollmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetEnrollmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetEnrollmentsQuery>({ document: GetEnrollmentsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetEnrollments', 'query', variables);
    },
    GetEnrollmentById(variables: Types.GetEnrollmentByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetEnrollmentByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetEnrollmentByIdQuery>({ document: GetEnrollmentByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetEnrollmentById', 'query', variables);
    },
    CreateEnrollment(variables: Types.CreateEnrollmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateEnrollmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateEnrollmentMutation>({ document: CreateEnrollmentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateEnrollment', 'mutation', variables);
    },
    GetUserEnrollments(variables?: Types.GetUserEnrollmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetUserEnrollmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetUserEnrollmentsQuery>({ document: GetUserEnrollmentsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUserEnrollments', 'query', variables);
    },
    AssignInstructor(variables: Types.AssignInstructorMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.AssignInstructorMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.AssignInstructorMutation>({ document: AssignInstructorDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AssignInstructor', 'mutation', variables);
    },
    UnassignInstructor(variables: Types.UnassignInstructorMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UnassignInstructorMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UnassignInstructorMutation>({ document: UnassignInstructorDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UnassignInstructor', 'mutation', variables);
    },
    CreateLesson(variables: Types.CreateLessonMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateLessonMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateLessonMutation>({ document: CreateLessonDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateLesson', 'mutation', variables);
    },
    UpdateLesson(variables: Types.UpdateLessonMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateLessonMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateLessonMutation>({ document: UpdateLessonDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateLesson', 'mutation', variables);
    },
    DeleteLesson(variables: Types.DeleteLessonMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteLessonMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteLessonMutation>({ document: DeleteLessonDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteLesson', 'mutation', variables);
    },
    Lesson(variables: Types.LessonQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.LessonQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.LessonQuery>({ document: LessonDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Lesson', 'query', variables);
    },
    LessonsByTopicId(variables: Types.LessonsByTopicIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.LessonsByTopicIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.LessonsByTopicIdQuery>({ document: LessonsByTopicIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LessonsByTopicId', 'query', variables);
    },
    GetLevels(variables?: Types.GetLevelsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetLevelsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetLevelsQuery>({ document: GetLevelsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetLevels', 'query', variables);
    },
    GetLevel(variables?: Types.GetLevelQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetLevelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetLevelQuery>({ document: GetLevelDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetLevel', 'query', variables);
    },
    CreateLevel(variables: Types.CreateLevelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateLevelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateLevelMutation>({ document: CreateLevelDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateLevel', 'mutation', variables);
    },
    UpdateLevel(variables: Types.UpdateLevelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateLevelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateLevelMutation>({ document: UpdateLevelDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateLevel', 'mutation', variables);
    },
    DeleteLevel(variables: Types.DeleteLevelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteLevelMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteLevelMutation>({ document: DeleteLevelDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteLevel', 'mutation', variables);
    },
    Me(variables?: Types.MeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.MeQuery>({ document: MeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Me', 'query', variables);
    },
    MarkLessonCompleted(variables: Types.MarkLessonCompletedMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.MarkLessonCompletedMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.MarkLessonCompletedMutation>({ document: MarkLessonCompletedDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'MarkLessonCompleted', 'mutation', variables);
    },
    SubmitQuizAttempt(variables: Types.SubmitQuizAttemptMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.SubmitQuizAttemptMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.SubmitQuizAttemptMutation>({ document: SubmitQuizAttemptDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SubmitQuizAttempt', 'mutation', variables);
    },
    GetCourseProgress(variables: Types.GetCourseProgressQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetCourseProgressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetCourseProgressQuery>({ document: GetCourseProgressDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetCourseProgress', 'query', variables);
    },
    StartCourseProgress(variables: Types.StartCourseProgressMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.StartCourseProgressMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.StartCourseProgressMutation>({ document: StartCourseProgressDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'StartCourseProgress', 'mutation', variables);
    },
    UpdateQuizProgress(variables: Types.UpdateQuizProgressMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateQuizProgressMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateQuizProgressMutation>({ document: UpdateQuizProgressDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateQuizProgress', 'mutation', variables);
    },
    CreateQuestion(variables: Types.CreateQuestionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateQuestionMutation>({ document: CreateQuestionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateQuestion', 'mutation', variables);
    },
    UpdateQuestion(variables: Types.UpdateQuestionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateQuestionMutation>({ document: UpdateQuestionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateQuestion', 'mutation', variables);
    },
    DeleteQuestion(variables: Types.DeleteQuestionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteQuestionMutation>({ document: DeleteQuestionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteQuestion', 'mutation', variables);
    },
    CreateQuiz(variables: Types.CreateQuizMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateQuizMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateQuizMutation>({ document: CreateQuizDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateQuiz', 'mutation', variables);
    },
    UpdateQuiz(variables: Types.UpdateQuizMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateQuizMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateQuizMutation>({ document: UpdateQuizDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateQuiz', 'mutation', variables);
    },
    Quiz(variables: Types.QuizQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.QuizQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.QuizQuery>({ document: QuizDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Quiz', 'query', variables);
    },
    QuizzesByTopicId(variables: Types.QuizzesByTopicIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.QuizzesByTopicIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.QuizzesByTopicIdQuery>({ document: QuizzesByTopicIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'QuizzesByTopicId', 'query', variables);
    },
    DeleteQuiz(variables: Types.DeleteQuizMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteQuizMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteQuizMutation>({ document: DeleteQuizDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteQuiz', 'mutation', variables);
    },
    CreateSubscriptionPlan(variables: Types.CreateSubscriptionPlanMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateSubscriptionPlanMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateSubscriptionPlanMutation>({ document: CreateSubscriptionPlanDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateSubscriptionPlan', 'mutation', variables);
    },
    UpdateSubscriptionPlan(variables: Types.UpdateSubscriptionPlanMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateSubscriptionPlanMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateSubscriptionPlanMutation>({ document: UpdateSubscriptionPlanDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateSubscriptionPlan', 'mutation', variables);
    },
    DeleteSubscriptionPlan(variables: Types.DeleteSubscriptionPlanMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteSubscriptionPlanMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteSubscriptionPlanMutation>({ document: DeleteSubscriptionPlanDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteSubscriptionPlan', 'mutation', variables);
    },
    SubscriptionPlans(variables?: Types.SubscriptionPlansQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.SubscriptionPlansQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.SubscriptionPlansQuery>({ document: SubscriptionPlansDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SubscriptionPlans', 'query', variables);
    },
    CompanySubscriptions(variables: Types.CompanySubscriptionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanySubscriptionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanySubscriptionsQuery>({ document: CompanySubscriptionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanySubscriptions', 'query', variables);
    },
    SubscriptionReport(variables: Types.SubscriptionReportQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.SubscriptionReportQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.SubscriptionReportQuery>({ document: SubscriptionReportDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SubscriptionReport', 'query', variables);
    },
    CompanyInvites(variables: Types.CompanyInvitesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CompanyInvitesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CompanyInvitesQuery>({ document: CompanyInvitesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CompanyInvites', 'query', variables);
    },
    RequestSubscriptionCodes(variables: Types.RequestSubscriptionCodesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.RequestSubscriptionCodesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.RequestSubscriptionCodesMutation>({ document: RequestSubscriptionCodesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RequestSubscriptionCodes', 'mutation', variables);
    },
    InviteEmployees(variables: Types.InviteEmployeesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.InviteEmployeesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.InviteEmployeesMutation>({ document: InviteEmployeesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InviteEmployees', 'mutation', variables);
    },
    ResendInvite(variables: Types.ResendInviteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.ResendInviteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ResendInviteMutation>({ document: ResendInviteDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResendInvite', 'mutation', variables);
    },
    PayCompanySubscription(variables: Types.PayCompanySubscriptionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.PayCompanySubscriptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.PayCompanySubscriptionMutation>({ document: PayCompanySubscriptionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PayCompanySubscription', 'mutation', variables);
    },
    ActivateCompanySubscription(variables: Types.ActivateCompanySubscriptionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.ActivateCompanySubscriptionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ActivateCompanySubscriptionMutation>({ document: ActivateCompanySubscriptionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ActivateCompanySubscription', 'mutation', variables);
    },
    CreateTopic(variables: Types.CreateTopicMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateTopicMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateTopicMutation>({ document: CreateTopicDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateTopic', 'mutation', variables);
    },
    Topic(variables: Types.TopicQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.TopicQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.TopicQuery>({ document: TopicDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Topic', 'query', variables);
    },
    TopicsByCourse(variables: Types.TopicsByCourseQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.TopicsByCourseQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.TopicsByCourseQuery>({ document: TopicsByCourseDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'TopicsByCourse', 'query', variables);
    },
    Topics(variables?: Types.TopicsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.TopicsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.TopicsQuery>({ document: TopicsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Topics', 'query', variables);
    },
    UpdateTopic(variables: Types.UpdateTopicMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateTopicMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateTopicMutation>({ document: UpdateTopicDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateTopic', 'mutation', variables);
    },
    DeleteTopic(variables: Types.DeleteTopicMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.DeleteTopicMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteTopicMutation>({ document: DeleteTopicDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteTopic', 'mutation', variables);
    },
    GetUsers(variables?: Types.GetUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetUsersQuery>({ document: GetUsersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUsers', 'query', variables);
    },
    InternalUsers(variables?: Types.InternalUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.InternalUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.InternalUsersQuery>({ document: InternalUsersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'InternalUsers', 'query', variables);
    },
    UpdateUserProfile(variables: Types.UpdateUserProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateUserProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateUserProfileMutation>({ document: UpdateUserProfileDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateUserProfile', 'mutation', variables);
    },
    UpdateUserPassword(variables: Types.UpdateUserPasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.UpdateUserPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateUserPasswordMutation>({ document: UpdateUserPasswordDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateUserPassword', 'mutation', variables);
    },
    CreateUser(variables: Types.CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateUserMutation>({ document: CreateUserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateUser', 'mutation', variables);
    },
    GetProfile(variables?: Types.GetProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<Types.GetProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetProfileQuery>({ document: GetProfileDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetProfile', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;