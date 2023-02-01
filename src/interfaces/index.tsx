export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone_no: string;
  referrer: string;
}

export interface IFilterRequest {
  page: number;
  size: number;
  sortBy: string;
  sortDir: string;
  search: string;
  last: string;
  tags: string;
  category: string;
  status: string;
  access_token: string;
}

export interface IPaginationResponse {
  total_item: number;
  total_page: number;
  limit: number;
}

export interface ICoursePagination {
  pagination_response: IPaginationResponse;
  data: ICourse[];
}

export interface IInvoicePagination {
  pagination_response: IPaginationResponse;
  data: IInvoice[];
}

export interface IUserCoursePagination {
  pagination_response: IPaginationResponse;
  data: IUserCourse[];
}

export interface IUserBookmarkPagination {
  pagination_response: IPaginationResponse;
  data: IUserBookmark[];
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  role_id: number;
  fullname: string;
  address: string;
  phone_no: string;
  level_id: number;
  referral_code: string;
  referrer: string;
  level: ILevel;
}

export interface ILevel {
  id: number;
  name: string;
  discount_percent: number;
  max_transaction: number;
}

export interface ICourse {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  status: string;
  price: number;
  summary_desc: string;
  img_thumbnail: string;
  img_url: string;
  author_name: string;
  tag: ITag[];
  stats: ICourseStats;
  category: ICategory;
  created_at: string;
  updated_at: string;
}

export interface ICourseStats {
  total_bookmarked: number;
  total_finished: number;
}

export interface IUserCourse {
  course: ICourse;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  course_id: number;
  status: string;
}

export interface IUserBookmark {
  course: ICourse;
  last_bookmark_date: string;
  status: string;
  id: number;
}
export interface IUserCourseRequest {
  access_token: string;
  id: number | undefined;
}

export interface ICourseRequest {
  access_token: string;
  slug: string | undefined;
}

export interface ICartItem {
  id: number;
  cart_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  course: ICourse;
}

export interface ICourseDetail {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  content: string;
  img_url: string;
  status: string;
  price: number;
  summary_desc: string;
  img_thumbnail: string;
  author_name: string;
  tag: ITag[];
  stats: ICourseStats;
  category: ICategory;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface ITransaction {
  id: number;
  invoice_id: number;
  course_id: number;
  price: number;
  course: ICourse;
}

export interface IInvoice {
  id: number;
  user_id: number;
  total: number;
  status: string;
  voucher_code: string;
  benefit_discount: number;
  payment_date: string;
  transactions: ITransaction[];
  voucher: IVoucher;
  created_at: string;
  updated_at: string;
}

export interface IVoucher {
  voucher_code: string;
  name: string;
  status: string;
  amount: number;
  min_purchase: number;
  created_at: string;
  updated_at: string;
}

export interface IUserVoucher {
  id: number;
  user_id: number;
  voucher_code: string;
  voucher: IVoucher;
  expired_at: string;
  created_at: string;
  updated_at: string;
}
