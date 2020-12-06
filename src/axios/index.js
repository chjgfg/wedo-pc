import request from "./request";
import n_request from "./n_request";

//管理员登录
export const Admin = ({adminName,password}) => request('/auth/admin',{adminName,password},"POST");

//获取管理员姓名
export const AdminName = () => request('/auth/verify',{},"GET");


//图书相关
/* 获取所有分类 */
export const CategoryList = () => request('/book/category/list');

//修改分类
export const UpdateCategory = ({id, typeName, typeInfo, iconUrl}) => request(`/book/category`, {id,typeName,typeInfo,iconUrl}, "PUT");

//添加分类
export const AddCategory = ({id, typeName, typeInfo, iconUrl}) => request(`/book/category`, {id,typeName,typeInfo,iconUrl}, "POST");

//删除分类
export const DeleteCategory = ({id}) => request(`/book/category`, {id}, "DELETE");

//根据分类信息查询分类
export const FindCategory = ({cid}) => request('/book/category/cid/'+cid);

//根据分类获取书籍
export const BookList = ({cid, page, rows}) => request(`/book/books/pageByCid`, {cid, page, rows});


//根据分类和书名获取书籍
export const GetBookListByBookNameAndCid = ({title, cid, page, rows}) => request(`/book/books/page`, {title, cid,page,rows});


//图书相关
//添加图书
export const AddBooK = ({id,title,aId,image,creaDate,protagonist,state,cId,bookComment,intro}) => request(`/book/books`, {id,title,aId,image,creaDate,protagonist,state,cId,bookComment,intro}, "POST");

//删除图书
export const DeleteBook = ({id}) => request(`/book/books`, {id}, "DELETE");

//查找图书
export const FindBook = ({bid}) => request(`/book/books/bid/`+bid);

//修改图书
export const UpdateBooK = ({id,title,aId,image,creaDate,protagonist,state,cId,bookComment,intro}) => request(`/book/books`, {id,title,aId,image,creaDate,protagonist,state,cId,bookComment,intro}, "PUT");


//获取作者
export const GetAuthor = ({aId}) => request(`/book/author`, {aId});

//根据图书id获取章节
export const GetChapterList = ({bid, page, rows}) => request(`/book/chapter/page`, {bid, page, rows});

//根据章节id获取章节信息
export const GetChapter = ({cid}) => request(`/book/chapter/cid/`+ cid ,"GET");

//根据章节id,title,context修改章节
export const UpdateChapter = ({id,title,context}) => request(`/book/chapter` ,{id,title,context},"PUT");

//添加章节内容
export const AddChapter = ({bId,title,context,frontSequenceNum}) => request(`/book/chapter` ,{bId,title,context,frontSequenceNum},"POST");

//删除章节信息/chapter



//作者相关
//获取所有作者
export const AuthorList = ({page, rows}) => request(`/book/author/page`, {page, rows}, "GET");

//通过作者名查找
export const FindOne = ({name,page, rows}) => request(`/book/author/page`, {name,page, rows}, "GET");

//通过作者ID找到作者
export const FindById = ({aId}) => request(`/book/author`, {aId}, "GET");
//添加作者
export const AddOne = ({name,introduce, aPhoto}) => request(`/book/author`, {name,introduce, aPhoto}, "POST");

//修改作者
export const UpdateOne = ({id,name,introduce, aPhoto}) => request(`/book/author`, {id,name,introduce, aPhoto}, "PUT");

//删除作者
export const DeleteOne = ({id}) => request(`/book/author`, {id}, "DELETE");




//读者相关的
//获取读者
export const UserList = ({page, rows}) => request(`/user/info/page`, {page, rows}, "GET");


//删除用户
export const DeleteUser = ({id}) => request(`/user/info/delete`, {id}, "DELETE");


//管理员相关
//添加管理员
export const AddAdmin = ({adminName,password}) => request('/admin/addAdmin',{adminName,password},"POST");

//查询管理员
export const FindAdmin = ({adminName,page,rows}) => request('/admin/page',{adminName,page,rows},"GET");

//修改管理员密码
export const UpdateAdmin = ({id,password}) => request('/admin',{id,password},"PUT");

//删除管理员
export const DeleteAdmin = ({id}) => request('/admin',{id},"DELETE");



//评论
//查询评论
export const FindReview = ({bid,page,rows}) => n_request('/user/review/page',{bid,page,rows},"GET");

/*//添加评论
export const AddReview = ({bid,text}) => n_request('/user/review',{bid,text},"POST");*/

//删除评论
export const DeleteReview = ({id}) => request('/user/review',{id},"DELETE");




