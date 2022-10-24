import axios from 'axios'
import React, { createContext, useState } from 'react'
import { toastErrorNotify, toastSuccessNotify } from '../helper/helper';
// import { AuthContextProv } from './AuthContext';


export const BlogDataContext = createContext()

const url = "http://127.0.0.1:8000/"

const BlogContext = ({ children }) => {
    const [blogPosts, setBlogposts] = useState([])  //* for home  page
    const [blogDetail, setBlogDetail] = useState([]) //* for blogDetail page
    const [category, setCategory] = useState("")
    const [deatilLoading, setDeatilLoading] = useState(true) //* for blogDetail page
    const [loadingCategory, setLoadingCategory] = useState(true)
    const [page, setPage] = useState(6)
    // const { currentUser } = useContext(AuthContextProv)

    const getCategories = async () => {
        try {
            const res = await axios.get(`${url}blog/category/`)
            setCategory(res.data)
            sessionStorage.setItem("categories", JSON.stringify(res.data))
            // console.log(category)
            setLoadingCategory(false)
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const getBlogPosts = async () => {
        try {
            const res = await axios.get(`${url}blog/posts/?limit=${page}&offset=0`)
            setBlogposts(res.data.results)
            console.log(res.data);
            return res;
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }


    const getOneBlogPost = async (slug) => {
        const token = window.atob(sessionStorage.getItem('token'))
        try {
            let config = {
                method: 'get',
                url: `${url}blog/posts/${slug}`,
                headers: {
                    'Authorization': `Token ${token}`,
                }
            };
            const result = await axios(config);
            console.log('Bu işlem ile view sayısı bir artmış mı oldu?');
            setBlogDetail(result.data);
            console.log(result.data);
            setDeatilLoading(false);
        } catch (error) {
            toastErrorNotify(error.message)
        }
    }

    const createPost = async (blogData, navigate) => {
        const token = window.atob(sessionStorage.getItem('token'))
        try {
            // var data = JSON.stringify({
            //     "title": "Amazon Web Services",
            //     "category": 4,
            //     "content": "Amazon Web Services, ",
            //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/150px-Amazon_Web_Services_Logo.svg.png",
            //     "status": "p"
            // });
            const config = {
                method: 'post',
                url: `${url}blog/posts/`,
                headers: {
                    'Authorization': `Token ${token}`,
                },
                data: blogData
            };

            const res = await axios(config)
            // const res = await axios.post(`${url}blog/posts/`, blogData)
            if (res.status === 201) {
                getBlogPosts()
                navigate('/')
                toastSuccessNotify('Blog created successfully')
            }
            // navigate('/newblog')
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }

    const postLike = async (user_id, post_id) => {
        const token = window.atob(sessionStorage.getItem('token'))

        try {
            const data = {
                "user_id": user_id,
                "post": post_id
            };
            const config = {
                method: 'post',
                url: `${url}blog/like/`,
                headers: {
                    'Authorization': `Token ${token}`,
                }
            }
            const res = await axios.post(`${url}blog/like/`, data, config)
            if (res.status === 200 || res.status === 201) {
                console.log(res);
                toastSuccessNotify('Thanks a lot')
            }
        } catch (error) {
            toastErrorNotify(error.message);
        }
    }
    const setComments = async (slug, commendData) => {
        const token = window.atob(sessionStorage.getItem('token'));
        const commentUrl = url + `blog/posts/${slug}/add_comment/`;
        try {
            const data = {
                "content": commendData
            };
            var config = {
                method: 'post',
                url: commentUrl,
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config)
        } catch (error) {
            toastErrorNotify(error.message,)
        }
    }

    const value = {
        getCategories,
        category,
        loadingCategory,
        blogPosts,
        setBlogposts,
        getBlogPosts,
        blogDetail,
        deatilLoading,
        getOneBlogPost,
        postLike,
        setComments,
        createPost,
        setPage,
        page,
    }
    return (
        <BlogDataContext.Provider value={value}>
            {children}
        </BlogDataContext.Provider>
    )
}

export default BlogContext