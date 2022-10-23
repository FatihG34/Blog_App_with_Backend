import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useLocation } from 'react-router-dom';
import { BlogDataContext } from '../context/BlogContext';
import { AuthContextProv } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import Loading from '../assets/loading.gif'


const BlogDetails = () => {
    const { currentUser } = useContext(AuthContextProv)
    const { blogDetail, getOneBlogPost, deatilLoading, postLike } = useContext(BlogDataContext)
    const { state } = useLocation();
    const { slug } = state

    console.log("burda neler oluyor");
    console.log(blogDetail);

    const handleLike = (user_id, blog_id) => {
        postLike(user_id, blog_id)
    }



    useEffect(() => {
        getOneBlogPost(slug)
        console.log("buraya giriyor mu")
    }, [])

    console.log(blogDetail);
    if (deatilLoading) {
        return (
            <div style={{ backgroundColor: 'black', height: '93.35vh', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <img src={Loading} alt="Loading..." width={'800'} />
            </div>
        )
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 20 }}>
            <Card sx={{ maxWidth: 1000, width: 700, height: 600, position: "relative" }}>
                <div>
                    <CardMedia
                        component="img"
                        height="300"
                        image={blogDetail.image}
                        alt={blogDetail.title}
                    />
                    <CardContent sx={{ bgcolor: '#81abc2', height: 120 }}>
                        <Typography variant='h6'>{blogDetail.title}</Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '4',
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {blogDetail.content}
                        </Typography>
                    </CardContent>
                </div>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500] }} aria-label="blog">
                            {((blogDetail.author).slice(0, 1)).toUpperCase()}
                        </Avatar>
                    }
                    title={blogDetail.author.toUpperCase()}
                    subheader={(new Date(blogDetail.published_date).toUTCString()).slice(0, 16)}
                />
                <CardActions disableSpacing sx={{ position: "absolute", bottom: "5px", left: "5px" }}>
                    <IconButton aria-label="like" onClick={() => handleLike(currentUser.id, blogDetail.id)}>
                        <FavoriteIcon />
                        <Typography sx={{ ml: 1 }}>
                            {blogDetail.like_count}
                        </Typography>
                    </IconButton>
                    <IconButton aria-label="view">
                        <VisibilityTwoToneIcon />
                        <Typography sx={{ ml: 1 }}>
                            {blogDetail.post_view_count}
                        </Typography>
                    </IconButton>
                    <IconButton aria-label="comment">
                        <ChatBubbleOutlineOutlinedIcon />
                        <Typography sx={{ ml: 1 }}>
                            {blogDetail.comment_count}
                        </Typography>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default BlogDetails