export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasPrevPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
};

export type BasePaginationMeta = {
  __typename?: 'BasePaginationMeta';
  itemCount: Scalars['Float'];
  totalItems: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalPages: Scalars['Float'];
  currentPage: Scalars['Float'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  nickname: Scalars['String'];
  intro?: Maybe<Scalars['String']>;
  googleId: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  isNew: Scalars['Boolean'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  department?: Maybe<UserDepartmentEnum>;
  position?: Maybe<UserPositionEnum>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** Node */
export type Node = {
  id: Scalars['Float'];
};

export enum UserDepartmentEnum {
  OS8 = 'OS8',
  OS1 = 'OS1',
  OS3 = 'OS3',
  OS10 = 'OS10',
  IC = 'IC',
  BOM = 'BOM',
  RECO = 'RECO',
  EZD = 'EZD',
}

export enum UserPositionEnum {
  DEV = 'DEV',
  COMTOR = 'COMTOR',
  CEO = 'CEO',
  BA = 'BA',
  PM = 'PM',
  TEAM_LEAD = 'TEAM_LEAD',
  DM = 'DM',
}

export type UserConnection = {
  __typename?: 'UserConnection';
  items?: Maybe<Array<User>>;
  meta: BasePaginationMeta;
};

export type Media = Node & {
  __typename?: 'Media';
  id: Scalars['Float'];
  fileSize?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  filePath?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  type: FileType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum FileType {
  FILE = 'FILE',
  DIR = 'DIR',
}

export type MediaConnection = {
  __typename?: 'MediaConnection';
  items?: Maybe<Array<Media>>;
  meta: BasePaginationMeta;
};

/** AuthConnection */
export type AuthConnection = {
  __typename?: 'AuthConnection';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  user: User;
};

export type Post = Node & {
  __typename?: 'Post';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  medias?: Maybe<Array<Scalars['Float']>>;
  caption?: Maybe<Scalars['String']>;
  rawCaption?: Maybe<Scalars['String']>;
  actualLike: Scalars['Float'];
  isPublic: Scalars['Boolean'];
  score: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  totalLike: Scalars['Float'];
  isLike: Scalars['Boolean'];
  mediasPath?: Maybe<Array<Media>>;
  creatorInfo?: Maybe<User>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  items?: Maybe<Array<Post>>;
  meta: BasePaginationMeta;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type PostCursorConnection = {
  __typename?: 'PostCursorConnection';
  edges?: Maybe<Array<PostEdge>>;
  nodes?: Maybe<Array<Post>>;
  totalCount: Scalars['Int'];
  pageInfo: PageInfo;
};

export type Comments = Node & {
  __typename?: 'Comments';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  postId: Scalars['Float'];
  parentId: Scalars['Float'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  creatorInfo: User;
};

export type CommentDeletePayload = {
  __typename?: 'CommentDeletePayload';
  id: Scalars['Float'];
  postId: Scalars['Float'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  items?: Maybe<Array<Comments>>;
  meta: BasePaginationMeta;
};

export type Like = Node & {
  __typename?: 'Like';
  id: Scalars['Float'];
  postId: Scalars['Float'];
  userId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  creatorInfo: User;
  postInfo: Post;
};

export type Report = Node & {
  __typename?: 'Report';
  id: Scalars['Float'];
  postId: Scalars['Float'];
  userId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  postInfo?: Maybe<Post>;
};

export type ReportPostConnection = {
  __typename?: 'ReportPostConnection';
  items?: Maybe<Array<Report>>;
  meta: BasePaginationMeta;
};

export type Notification = Node & {
  __typename?: 'Notification';
  id: Scalars['Float'];
  triggerId: Scalars['Float'];
  userId: Scalars['Float'];
  content: Scalars['String'];
  link: Scalars['String'];
  type: EvenEnum;
  resourceId: Scalars['String'];
  isSeen: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  triggerInfo: User;
};

export enum EvenEnum {
  LIKE = 'like',
  FOLLOW = 'follow',
  ACCEPTFOLLOW = 'acceptFollow',
  COMMENT = 'comment',
  TAG = 'tag',
}

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  items?: Maybe<Array<Notification>>;
  meta: BasePaginationMeta;
};

export type Chat = Node & {
  __typename?: 'Chat';
  id: Scalars['Float'];
  participants: Array<Scalars['Float']>;
  isTemp: Scalars['Boolean'];
  lastMessage?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  participantInfo: Array<User>;
  lastMessageData?: Maybe<Message>;
  unseenMessage: Scalars['Float'];
};

export type ChatConnection = {
  __typename?: 'ChatConnection';
  items?: Maybe<Array<Chat>>;
  meta: BasePaginationMeta;
};

export type Message = Node & {
  __typename?: 'Message';
  id: Scalars['Float'];
  sender: Scalars['Float'];
  chatId: Scalars['Float'];
  content?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  mediaType?: Maybe<MediaType>;
  sent: Scalars['Boolean'];
  tempId: Scalars['String'];
  received: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  senderInfo: User;
};

export enum MediaType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

export type MessageConnection = {
  __typename?: 'MessageConnection';
  items?: Maybe<Array<Message>>;
  meta: BasePaginationMeta;
};

export type SeenMessage = {
  __typename?: 'SeenMessage';
  chatId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type ReceivedMessage = {
  __typename?: 'ReceivedMessage';
  chatId: Scalars['Float'];
  userId: Scalars['Float'];
  message: Message;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  getUserInfo?: Maybe<User>;
  searchUser: UserConnection;
  medias?: Maybe<MediaConnection>;
  media?: Maybe<Media>;
  getNotification: NotificationConnection;
  countUnSeenNotification: Scalars['Float'];
  getUserLikePost: Array<User>;
  getPostComment: CommentConnection;
  test: PostCursorConnection;
  getPostDetail: Post;
  myPost: PostConnection;
  getUserPost: PostConnection;
  getReportedPost: ReportPostConnection;
  getChats: ChatConnection;
  getExistChat?: Maybe<Chat>;
  getChatHasUnseenMessage: Array<Scalars['Float']>;
  getMessage: MessageConnection;
};

export type QueryGetUserInfoArgs = {
  id: Scalars['Float'];
};

export type QuerySearchUserArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
  keyword: Scalars['String'];
};

export type QueryMediasArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['String']>;
};

export type QueryMediaArgs = {
  id: Scalars['Float'];
};

export type QueryGetNotificationArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type QueryGetUserLikePostArgs = {
  postId: Scalars['Float'];
};

export type QueryGetPostCommentArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
  postId: Scalars['Float'];
};

export type QueryTestArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  validateCursor?: Maybe<Scalars['Boolean']>;
  cursorKey: Scalars['String'];
};

export type QueryGetPostDetailArgs = {
  id: Scalars['Float'];
};

export type QueryMyPostArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type QueryGetUserPostArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
  userId: Scalars['Float'];
};

export type QueryGetReportedPostArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type QueryGetChatsArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type QueryGetExistChatArgs = {
  participants: Array<Scalars['Float']>;
};

export type QueryGetMessageArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
  chatId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUserInfo: User;
  test: User;
  uploadMedia: Media;
  uploadMediaToS3: Media;
  removeMedia: Media;
  updateMedia: Media;
  createDir: Media;
  loginWithSNS: AuthConnection;
  logout: Scalars['Boolean'];
  setSeenNotification: Scalars['Boolean'];
  createComment: Comments;
  updateComment: Comments;
  removeComment: Scalars['Boolean'];
  createPost: Post;
  updatePost: Post;
  removePost: Scalars['Boolean'];
  reactToPost: Scalars['Boolean'];
  reportPost: Scalars['Boolean'];
  removeReportedPost: Scalars['Boolean'];
  createChat: Chat;
  deleteChat: Scalars['Float'];
  sendMessage: Message;
  setSeenMessage: Scalars['Boolean'];
};

export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInput;
};

export type MutationUploadMediaArgs = {
  provider?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  file: Scalars['Upload'];
};

export type MutationUploadMediaToS3Args = {
  parentId?: Maybe<Scalars['ID']>;
  file: Scalars['Upload'];
};

export type MutationRemoveMediaArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type MutationUpdateMediaArgs = {
  input: UpdateMediaInput;
};

export type MutationCreateDirArgs = {
  parentId?: Maybe<Scalars['ID']>;
  dirName: Scalars['String'];
};

export type MutationLoginWithSnsArgs = {
  input: LoginSnsInput;
};

export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};

export type MutationRemoveCommentArgs = {
  postId: Scalars['Float'];
  id: Scalars['Float'];
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type MutationRemovePostArgs = {
  id: Scalars['Float'];
};

export type MutationReactToPostArgs = {
  postId: Scalars['Float'];
};

export type MutationReportPostArgs = {
  postId: Scalars['Float'];
};

export type MutationRemoveReportedPostArgs = {
  id: Scalars['Float'];
};

export type MutationCreateChatArgs = {
  participants: Array<Scalars['Float']>;
};

export type MutationDeleteChatArgs = {
  id: Scalars['Float'];
};

export type MutationSendMessageArgs = {
  input: NewMessageInput;
};

export type MutationSetSeenMessageArgs = {
  chatId: Scalars['Float'];
};

export type UpdateUserInput = {
  avatar?: Maybe<Scalars['String']>;
  intro?: Maybe<Scalars['String']>;
  department?: Maybe<UserDepartmentEnum>;
  position?: Maybe<UserPositionEnum>;
};

export type UpdateMediaInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginSnsInput = {
  token: Scalars['String'];
};

export type CreateCommentInput = {
  content: Scalars['String'];
  parentId?: Maybe<Scalars['Float']>;
  postId: Scalars['Float'];
};

export type UpdateCommentInput = {
  content: Scalars['String'];
  parentId?: Maybe<Scalars['Float']>;
  postId: Scalars['Float'];
  id: Scalars['Float'];
};

export type CreatePostInput = {
  medias?: Maybe<Array<Scalars['Float']>>;
  caption?: Maybe<Scalars['String']>;
  rawCaption?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type UpdatePostInput = {
  medias?: Maybe<Array<Scalars['Float']>>;
  caption?: Maybe<Scalars['String']>;
  rawCaption?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
};

export type NewMessageInput = {
  content?: Maybe<Scalars['String']>;
  chatId: Scalars['Float'];
  media?: Maybe<Scalars['String']>;
  mediaType?: Maybe<MediaType>;
  tempId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewNotification: Notification;
  onLikePost: Like;
  onUnLikePost: Like;
  onCreateComment: Comments;
  onDeleteComment: CommentDeletePayload;
  onNewMessage: Message;
  onSeenMessage: SeenMessage;
  onReceiveMessage: ReceivedMessage;
};

export type SubscriptionOnNewNotificationArgs = {
  userId: Scalars['Float'];
};

export type SubscriptionOnLikePostArgs = {
  postId: Scalars['Float'];
};

export type SubscriptionOnUnLikePostArgs = {
  postId: Scalars['Float'];
};

export type SubscriptionOnCreateCommentArgs = {
  postId: Scalars['Float'];
};

export type SubscriptionOnDeleteCommentArgs = {
  postId: Scalars['Float'];
};

export type SubscriptionOnNewMessageArgs = {
  chatId: Scalars['Float'];
};

export type SubscriptionOnSeenMessageArgs = {
  chatId: Scalars['Float'];
};

export type SubscriptionOnReceiveMessageArgs = {
  userId: Scalars['Float'];
};
