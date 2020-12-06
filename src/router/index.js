import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import("../views/Index");
const Mains = () => import("../views/main/Main");
const LookCategory = () => import("../views/category/Category");

const Book = () => import("../views/book/Book");
const BookInfo = () => import("../views/book/BookInfo");
const AddAndUpdateBook =()=> import("../views/book/AddAndUpdateBook");
const Chapter = () => import("../views/book/Chapter");
const Author = () => import("../views/author/Author");
const Comment = () => import("../views/comment/Comment");
const Reader = () => import("../views/reader/Reader");
const AddChapter = () => import("../views/book/AddChapter");
const Sysop = () => import("../views/sysop/Sysop");



const Login = () => import("../views/log/Login");

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    component: Index,
    children: [
      {
        path: "/",
        redirect: "login"
      },
      {
        path: "login",
        component: Login
      },
      {
        path: "mains",
        component: Mains,
        meta: {
          requireAuth: true//拦截
        },
        children: [
          {
            path: "category",
            component: LookCategory,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "book",
            component: Book,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "author",
            component: Author,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "comment",
            component: Comment,
            meta: {
              requireAuth: true//拦截
            },

          },
          {
            path: "reader",
            component: Reader,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "bookInfo",
            component: BookInfo,
            meta: {
              requireAuth: true//拦截
            },

          },
          {
            path: "chapter",
            component: Chapter,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "addchapter",
            component: AddChapter,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "sysop",
            component: Sysop,
            meta: {
              requireAuth: true//拦截
            },
          },
          {
            path: "addAndUpdateBook",
            component: AddAndUpdateBook,
            meta: {
              requireAuth: true//拦截
            },
          },

        ]
      }
    ]
  },


];

const router = new VueRouter({
  routes,
  mode: "history"
});


export default router

