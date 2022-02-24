import { motion } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMoviesDetail, getSearchDetail, getVideos } from "../../api";
import MovieDetail from "../Movie/MovieDetail";

interface IPostDetail {
    id: number;
    type: string;
    keyword: string;
}

const PostDetail = ({ id, type, keyword }: IPostDetail) => {
    const { data, isLoading } = useQuery(["SearchDetail", `${id}`], () => getSearchDetail(id + "", type));
    const { data: video, isLoading: videoLoading } = useQuery(["SearchVideo", `Video${id}`], () =>
        getVideos(id + "", type)
    );
    const loading = isLoading || videoLoading;
    if (loading) <div></div>;

    return <MovieDetail movieId={id + ""} unique="post" from="search" keyword={keyword} type={type}></MovieDetail>;
};

export default PostDetail;

const DetailBox = styled(motion.div)`
    position: fixed;
    background-color: ${(props) => props.theme.black.lighter};
    top: 5vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 60vw;
    height: 90vh;
`;
