import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ISearch, Result } from "../../Routes/Search";
import { makeImage } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import PostDetail from "./PostDetail";

interface IPoster {
    data: Result;
    id: string | null;
    keyword: string | null;
}

const Poster = ({ data, keyword, id }: IPoster) => {
    const title = data.original_title || data.name || data.title;
    const history = useNavigate();
    const PostClick = (id: number) => {
        history(`/search?keyword=${keyword}&id=${id}`);
    };
    const SelectClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        history(`/search?keyword=${keyword}`);
    };
    return (
        <AnimatePresence>
            <PostImage
                onClick={() => PostClick(data.id)}
                whileHover={{ scale: 1.2, zIndex: 1 }}
                bgimage={makeImage(data.poster_path, "w500")}
            >
                <PostName>{title}</PostName>
            </PostImage>
            {id === data.id + "" ? (
                <SelectPost onClick={SelectClick}>
                    <PostDetail id={data.id} keyword={keyword!} type={data.media_type}></PostDetail>
                </SelectPost>
            ) : null}
        </AnimatePresence>
    );
};

export default Poster;

const PostImage = styled(motion.div)<{ bgimage: string }>`
    width: 15vw;
    position: relative;
    height: 50vh;
    background-image: url(${(props) => props.bgimage});
    background-position-x: center;
    background-size: cover;
    &:nth-child(6n + 1) {
        transform-origin: center left;
    }
    &:nth-child(6n) {
        transform-origin: center right;
    }
`;

const PostName = styled(motion.div)`
    position: absolute;
    font-weight: bold;
    font-size: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5vh;
    bottom: 0;
    background-color: rgba(24, 24, 24, 0.5);
`;

const SelectPost = styled(motion.div)`
    position: fixed;
    z-index: 10;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
`;
